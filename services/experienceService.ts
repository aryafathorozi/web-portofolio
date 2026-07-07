"use server"

import { supabaseServer } from "@/lib/supabaseServer";
import { ExperienceEntity } from "@/types/database.types";

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