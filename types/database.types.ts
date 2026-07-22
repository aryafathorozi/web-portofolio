export interface ProjectEntity {
    id?: string;
    title: string;
    category: string;
    description: string;
    full_description: string;
    tech_stack: string[] | any[] | null;
    link: string;
    image_src?: string | null;
    status: string;
    created_at?: string;
}

export interface ExperienceEntity {
    id?: string;
    role: string;
    periode: string;
    year_background?: string;
    description: string;
    tech_stack: string[] | any[] | null;
    created_at?: string;
}

export interface CertificationEntity {
    id?: string;
    title: string;
    company: string;
    year: string;
    link: string;
    image_src?: string | null;
    created_at?: string;
}