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