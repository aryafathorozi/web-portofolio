"use server"

import { supabaseServer } from "@/lib/supabaseServer";
import { ExperienceEntity } from "@/types/database.types";
import { revalidatePath } from "next/cache";

interface ActionResponse {
    success: boolean;
    data?: ExperienceEntity;
    error?: string;
}

export async function getAllExperiences(): Promise<ExperienceEntity[]> {
    try {
        const { data, error } = await supabaseServer
            .from('experiences')
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

export async function createExperience(formData: FormData): Promise<ActionResponse> {
    try {
        const role = formData.get('role') as string;
        const periode = formData.get('periode') as string;
        const yearBackground = formData.get('year_background') as string;
        const description = formData.get('description') as string;
        const techStack = formData.get('tech_stack') as string;

        const techStackArray = techStack
            ? techStack.split(',').map(item => item.trim()).filter(item => item !== "")
            : [];

        const newExperience: Omit<ExperienceEntity, 'id' | 'created_at'> = {
            role,
            periode,
            year_background: yearBackground,
            description,
            tech_stack: techStackArray
        };

        const { data: experienceData, error: dbError } = await supabaseServer
            .from('experiences')
            .insert([newExperience])
            .select()
            .single();

        if (dbError) return { success: false, error: `Database Error: ${dbError.message}` };

        revalidatePath('/admin/experience');
        return { success: true, data: experienceData };
    } catch (err: any) {
        return { success: false, error: err.message || "Internal Server Error" };
    }
}