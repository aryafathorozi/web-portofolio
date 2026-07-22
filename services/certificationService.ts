"use server"

import { supabaseServer } from "@/lib/supabaseServer";
import { CertificationEntity } from "@/types/database.types";
import { revalidatePath } from "next/cache";

interface ActionResponse {
    success: boolean;
    data?: CertificationEntity;
    error?: string;
}

export async function getAllCertifications(): Promise<CertificationEntity[]> {
    try {
        const { data, error } = await supabaseServer
            .from('certifications')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            console.error("Server Action Error:", error.message);
            throw new Error(error.message);
        }
        return data || [];
    } catch (err: any) {
        throw new Error(err.message || "Internal Server Error");
    }
}

export async function createCertification(formData: FormData): Promise<ActionResponse> {
    try {
        const title = formData.get('title') as string;
        const company = formData.get('company') as string;
        const year = formData.get('year') as string;
        const link = formData.get('link') as string;
        const imageFile = formData.get('image') as File | null;

        let imageUrl = '';

        if (imageFile && imageFile.size > 0) {
            const fileExt = imageFile.name.split('.').pop() || 'jpg';
            const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
            const filePath = `certicates/${uniqueFileName}`;

            const arrayBuffer = await imageFile.arrayBuffer();
            const imageBuffer = Buffer.from(arrayBuffer);

            const { error: uploadError } = await supabaseServer.storage
                .from('web-portofolio-images')
                .upload(filePath, imageBuffer, {
                    contentType: imageFile.type || `image/${fileExt}`,
                    upsert: true
                });

            if (uploadError) return { success: false, error: `Upload Error: ${uploadError.message}` };

            const { data: { publicUrl } } = supabaseServer.storage
                .from('web-portofolio-images')
                .getPublicUrl(filePath);

            imageUrl = publicUrl;
        }

        const newCertification: Omit<CertificationEntity, 'id' | 'created_at'> = {
            title,
            company,
            year,
            link,
            image_src: imageUrl || null
        };

        const { data: certificationData, error: dbError } = await supabaseServer
            .from('certifications')
            .insert([newCertification])
            .select()
            .single();

        if (dbError) return { success: false, error: `Database Error: ${dbError.message}` };

        revalidatePath('/admin/certifications');
        return { success: true, data: certificationData };
    } catch (err: any) {
        return { success: false, error: err.message || "Internal Server Error" };
    }
}

export async function updateCertification(id: string, formData: FormData): Promise<ActionResponse> {
    try {
        const title = formData.get('title') as string;
        const company = formData.get('company') as string;
        const year = formData.get('year') as string;
        const link = formData.get('link') as string;
        const imageFile = formData.get('image') as File | null;
        const existingImageSrc = formData.get('existing_image_src') as string;

        let imageUrl = existingImageSrc;

        if (imageFile && imageFile.size > 0) {
            if (existingImageSrc) {
                const oldFilePath = existingImageSrc.split('/web-portofolio-images/')[1];
                if (oldFilePath) {
                    await supabaseServer.storage.from('web-portofolio-images').remove([oldFilePath]);
                }
            }

            const fileExt = imageFile.name.split('.').pop() || 'jpg';
            const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
            const filePath = `certicates/${uniqueFileName}`;

            const arrayBuffer = await imageFile.arrayBuffer();
            const imageBuffer = Buffer.from(arrayBuffer);

            const { error: uploadError } = await supabaseServer.storage
                .from('web-portofolio-images')
                .upload(filePath, imageBuffer, {
                    contentType: imageFile.type || `image/${fileExt}`,
                    upsert: true
                });

            if (uploadError) return { success: false, error: `Upload Error: ${uploadError.message}` };

            const { data: { publicUrl } } = supabaseServer.storage
                .from('web-portofolio-images')
                .getPublicUrl(filePath);

            imageUrl = publicUrl;
        }

        const updatedCertification: Partial<CertificationEntity> = {
            title,
            company,
            year,
            link,
            ...(imageUrl ? { image_src: imageUrl } : {})
        };

        const { data: certificationData, error: dbError } = await supabaseServer
            .from('certifications')
            .update(updatedCertification)
            .eq('id', id)
            .select()
            .single();

        if (dbError) return { success: false, error: `Database Error: ${dbError.message}` };

        revalidatePath('/admin/certifications');
        return { success: true, data: certificationData };
    } catch (err: any) {
        return { success: false, error: err.message || "Internal Server Error" };
    }
}

export async function deleteCertification(id: string): Promise<ActionResponse> {
    try {
        const { data: cert, error: fetchError } = await supabaseServer
            .from('certifications')
            .select('image_src')
            .eq('id', id)
            .single();

        if (!fetchError && cert?.image_src) {
            const oldFilePath = cert.image_src.split('/web-portofolio-images/')[1];
            if (oldFilePath) {
                await supabaseServer.storage.from('web-portofolio-images').remove([oldFilePath]);
            }
        }

        const { error: dbError } = await supabaseServer
            .from('certifications')
            .delete()
            .eq('id', id);

        if (dbError) return { success: false, error: `Database Error: ${dbError.message}` };

        revalidatePath('/admin/certifications');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message || "Internal Server Error" };
    }
}
