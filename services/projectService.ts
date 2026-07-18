"use server";

import { supabaseServer } from '@/lib/supabaseServer';
import { ProjectEntity } from '@/types/database.types';
import { revalidatePath } from 'next/cache';

interface ActionResponse {
    success: boolean;
    data?: ProjectEntity;
    error?: string;
}

export async function getAllProjects(): Promise<ProjectEntity[]> {
    try {
        const { data, error } = await supabaseServer
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }
        return data || [];
    } catch (err: any) {
        throw new Error(err.message || "Internal Server Error");
    }
}

export async function createProject(formData: FormData): Promise<ActionResponse> {
    try {
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const fullDescription = formData.get('full_description') as string;
        const rawTechStack = formData.get('tech_stack') as string;
        const link = formData.get('link') as string;
        const status = formData.get('status') as string;
        const imageFile = formData.get('image') as File | null;

        let imageUrl = '';

        if (imageFile && imageFile.size > 0) {
            const fileExt = imageFile.name.split('.').pop() || 'jpg';
            const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
            const filePath = `projects/${uniqueFileName}`;

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

        const techStackArray = rawTechStack
            ? rawTechStack.split(',').map(item => item.trim()).filter(item => item !== "")
            : [];

        const newProject: Omit<ProjectEntity, 'id' | 'created_at'> = {
            title,
            category,
            description,
            full_description: fullDescription,
            tech_stack: techStackArray,
            link,
            status,
            image_src: imageUrl || null
        };

        const { data: projectData, error: dbError } = await supabaseServer
            .from('projects')
            .insert([newProject])
            .select()
            .single();

        if (dbError) return { success: false, error: `Database Error: ${dbError.message}` };

        revalidatePath('/admin/projects');
        return { success: true, data: projectData };

    } catch (err: any) {
        return { success: false, error: err.message || "Internal Server Error" };
    }
}

export async function updateProject(id: string, formData: FormData): Promise<ActionResponse> {
    try {
        const title = formData.get('title') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const fullDescription = formData.get('full_description') as string;
        const rawTechStack = formData.get('tech_stack') as string;
        const link = formData.get('link') as string;
        const status = formData.get('status') as string;
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
            const filePath = `projects/${uniqueFileName}`;

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

        const techStackArray = rawTechStack
            ? rawTechStack.split(',').map(item => item.trim()).filter(item => item !== "")
            : [];

        const updatedProject: Partial<ProjectEntity> = {
            title,
            category,
            description,
            full_description: fullDescription,
            tech_stack: techStackArray,
            link,
            status,
            ...(imageUrl ? { image_src: imageUrl } : {})
        };

        const { data: projectData, error: dbError } = await supabaseServer
            .from('projects')
            .update(updatedProject)
            .eq('id', id)
            .select()
            .single();

        if (dbError) return { success: false, error: `Database Error: ${dbError.message}` };

        revalidatePath('/admin/projects');
        return { success: true, data: projectData };

    } catch (err: any) {
        return { success: false, error: err.message || "Internal Server Error" };
    }
}

export async function deleteProject(id: string): Promise<ActionResponse> {
    try {
        const { data: project, error: fetchError } = await supabaseServer
            .from('projects')
            .select('image_src')
            .eq('id', id)
            .single();

        if (!fetchError && project?.image_src) {
            const oldFilePath = project.image_src.split('/web-portofolio-images/')[1];
            if (oldFilePath) {
                await supabaseServer.storage.from('web-portofolio-images').remove([oldFilePath]);
            }
        }

        const { error: dbError } = await supabaseServer
            .from('projects')
            .delete()
            .eq('id', id);

        if (dbError) return { success: false, error: `Database Error: ${dbError.message}` };

        revalidatePath('/admin/projects');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message || "Internal Server Error" };
    }
}