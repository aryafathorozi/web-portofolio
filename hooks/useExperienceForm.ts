"use client"

import React, { useState, useRef, useEffect } from "react";
import { createExperience, updateExperience } from "@/services/experienceService";
import { toast } from "@/services/toastService";
import { ExperienceEntity } from "@/types/database.types";

export function useExperienceForm(initialExperience?: ExperienceEntity | null, onSuccessCallback?: () => Promise<void> | void) {

    const [role, setRole] = useState("");
    const [periode, setPeriode] = useState("");
    const [yearBackground, setYearBackground] = useState("");
    const [description, setDescription] = useState("");
    const [techInput, setTechInput] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialExperience) {
            setRole(initialExperience.role || "");
            setPeriode(initialExperience.periode || "");
            setYearBackground(initialExperience.year_background || "");
            setDescription(initialExperience.description || "");

            if (initialExperience.tech_stack) {
                const stack = Array.isArray(initialExperience.tech_stack)
                    ? initialExperience.tech_stack
                    : typeof initialExperience.tech_stack === 'string'
                        ? JSON.parse(initialExperience.tech_stack)
                        : [];
                setTechInput(stack.join(", "));
            } else {
                setTechInput("");
            }
        } else {
            setRole("");
            setPeriode("");
            setYearBackground("");
            setDescription("");
            setTechInput("");
        }
    }, [initialExperience]);

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!role.trim()) newErrors.role = "Role wajib diisi.";
        if (!periode.trim()) newErrors.periode = "Periode wajib diisi.";
        if (!yearBackground.trim()) newErrors.yearBackground = "Year Background wajib diisi.";
        if (!description.trim()) newErrors.description = "Description wajib diisi.";
        if (!techInput.trim()) newErrors.techInput = "Tech Stack wajib diisi.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("VALIDATION ERROR", "Sistem mendeteksi kolom kosong atau data tidak valid.");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("role", role);
            formData.append("periode", periode);
            formData.append("year_background", yearBackground);
            formData.append("description", description);
            formData.append("tech_stack", techInput);

            let response;
            if (initialExperience?.id) {
                response = await updateExperience(initialExperience.id, formData);
            } else {
                response = await createExperience(formData);
            }

            if (response.success) {
                const actionText = initialExperience?.id ? "UPDATED" : "PUBLISHED";
                const actionWord = initialExperience?.id ? "updated" : "initialized";
                toast.success(`EXPERIENCE ${actionText}`, `Node '${role.toUpperCase()}' safely ${actionWord}.`);

                if (!initialExperience?.id) {
                    setRole(""); setPeriode(""); setYearBackground(""); setDescription(""); setTechInput("");
                }

                if (onSuccessCallback) {
                    await onSuccessCallback();
                }
            } else {
                toast.error(initialExperience?.id ? "UPDATE FAILED" : "DEPLOYMENT FAILED", response.error || "Unknown error");
            }
        } catch (error: any) {
            toast.error("RUNTIME FAILURE", error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        states: { role, periode, yearBackground, description, techInput, isSubmitting, errors },
        setters: { setRole, setPeriode, setYearBackground, setDescription, setTechInput, setErrors },
        refs: { fileInputRef },
        handlers: { handlePublish }
    }
}