"use client";

import { useState, useRef, useEffect } from "react";
import { createProject, updateProject } from "@/services/projectService";
import { toast } from "@/services/toastService";
import { ProjectEntity } from "@/types/database.types";

export function useProjectForm(initialProject?: ProjectEntity | null, onSuccess?: () => void) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("website");
    const [description, setDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");
    const [techInput, setTechInput] = useState("");
    const [link, setLink] = useState("");
    const [status, setStatus] = useState("completed");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialProject) {
            setTitle(initialProject.title || "");
            setCategory(initialProject.category || "website");
            setDescription(initialProject.description || "");
            setFullDescription(initialProject.full_description || "");
            
            // Convert array back to comma separated string
            if (initialProject.tech_stack) {
                const stack = Array.isArray(initialProject.tech_stack) 
                    ? initialProject.tech_stack 
                    : typeof initialProject.tech_stack === 'string' 
                        ? JSON.parse(initialProject.tech_stack) 
                        : [];
                setTechInput(stack.join(", "));
            } else {
                setTechInput("");
            }
            
            setLink(initialProject.link || "");
            setStatus(initialProject.status || "completed");
            setImagePreview(initialProject.image_src || null);
        }
    }, [initialProject]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setErrors((prev) => ({ ...prev, image: "Format gambar harus JPEG, PNG, atau WEBP!" }));
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, image: "Ukuran gambar maksimal adalah 2MB." }));
            return;
        }

        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, image: "" }));
    };

    const removeSelectedImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!title.trim()) newErrors.title = "Project Title wajib diisi.";
        if (!description.trim()) newErrors.description = "Brief Description wajib diisi.";
        if (!fullDescription.trim()) newErrors.fullDescription = "Full Description wajib diisi.";
        if (!techInput.trim()) newErrors.techInput = "Tech Stack wajib diisi.";
        if (!link.trim()) newErrors.link = "External Deployment Link wajib diisi.";
        if (!selectedFile && !imagePreview) {
             newErrors.image = "Foto Interface Proyek mutlak wajib diunggah.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error("VALIDATION ERROR", "Sistem mendeteksi kolom kosong atau data tidak valid.");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("full_description", fullDescription);
            formData.append("tech_stack", techInput);
            formData.append("link", link);
            formData.append("status", status);

            if (initialProject?.image_src) {
                formData.append("existing_image_src", initialProject.image_src);
            }
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            let response;
            if (initialProject?.id) {
                // Update
                response = await updateProject(initialProject.id, formData);
            } else {
                // Create
                response = await createProject(formData);
            }

            if (response.success) {
                const actionText = initialProject?.id ? "UPDATED" : "PUBLISHED";
                const actionWord = initialProject?.id ? "updated" : "initialized";
                toast.success(`PROJECT ${actionText}`, `Node '${title.toUpperCase()}' safely ${actionWord}.`);
                
                if (!initialProject?.id) {
                    // Clear form only on create
                    setTitle(""); setDescription(""); setFullDescription(""); setTechInput(""); setLink("");
                    removeSelectedImage();
                }
                
                if (onSuccess) onSuccess();
            } else {
                toast.error(initialProject?.id ? "UPDATE FAILED" : "DEPLOYMENT FAILED", response.error || "Unknown error");
            }
        } catch (error: any) {
            toast.error("RUNTIME FAILURE", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        states: { title, category, description, fullDescription, techInput, link, status, imagePreview, isSubmitting, errors },
        setters: { setTitle, setCategory, setDescription, setFullDescription, setTechInput, setLink, setStatus, setErrors },
        refs: { fileInputRef },
        handlers: { handleImageChange, removeSelectedImage, handlePublish }
    };
}