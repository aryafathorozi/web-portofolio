"use client"

import React, { useState, useEffect, useRef } from "react";
import { createCertification, updateCertification } from "@/services/certificationService";
import { toast } from "@/services/toastService";
import { CertificationEntity } from "@/types/database.types";

export function useCertificationForm(initialCertification?: CertificationEntity | null, onSuccessCallback?: () => Promise<void> | void) {

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [year, setYear] = useState("");
    const [link, setLink] = useState("");

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (initialCertification) {
            setTitle(initialCertification.title || "");
            setCompany(initialCertification.company || "");
            setYear(initialCertification.year || "");
            setLink(initialCertification.link || "");
            setImagePreview(initialCertification.image_src || null);
        } else {
            setTitle("");
            setCompany("");
            setYear("");
            setLink("");
            setImagePreview(null);
            setSelectedFile(null);
        }
    }, [initialCertification]);

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
        if (!title.trim()) newErrors.title = "Title wajib diisi.";
        if (!company.trim()) newErrors.company = "Company/Organization wajib diisi.";
        if (!year.trim()) newErrors.year = "Year wajib diisi.";
        if (!link.trim()) newErrors.link = "Credential Link wajib diisi.";
        if (!selectedFile && !imagePreview) {
             newErrors.image = "Foto Certificate mutlak wajib diunggah.";
        }

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
            formData.append("title", title);
            formData.append("company", company);
            formData.append("year", year);
            formData.append("link", link);

            if (initialCertification?.image_src) {
                formData.append("existing_image_src", initialCertification.image_src);
            }
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            let response;
            if (initialCertification?.id) {
                response = await updateCertification(initialCertification.id, formData);
            } else {
                response = await createCertification(formData);
            }

            if (response.success) {
                const actionText = initialCertification?.id ? "UPDATED" : "PUBLISHED";
                const actionWord = initialCertification?.id ? "updated" : "initialized";
                toast.success(`CERTIFICATION ${actionText}`, `Node '${title.toUpperCase()}' safely ${actionWord}.`);

                if (!initialCertification?.id) {
                    setTitle(""); setCompany(""); setYear(""); setLink("");
                    removeSelectedImage();
                }

                if (onSuccessCallback) {
                    await onSuccessCallback();
                }
            } else {
                toast.error(initialCertification?.id ? "UPDATE FAILED" : "DEPLOYMENT FAILED", response.error || "Unknown error");
            }
        } catch (error: any) {
            toast.error("RUNTIME FAILURE", error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        states: { title, company, year, link, imagePreview, isSubmitting, errors },
        setters: { setTitle, setCompany, setYear, setLink, setErrors },
        refs: { fileInputRef },
        handlers: { handleImageChange, removeSelectedImage, handlePublish }
    }
}
