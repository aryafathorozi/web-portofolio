"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], threshold = 0.6) {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const observers = sectionIds.map((id) => {
            const element = document.getElementById(id);
            if (!element) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                {
                    threshold,
                    rootMargin: "-80px 0px 0px 0px",
                }
            );

            observer.observe(element);
            return { observer, element };
        });

        return () => {
            observers.forEach((obs) => {
                if (obs) obs.observer.unobserve(obs.element);
            });
        };
    }, [sectionIds, threshold]);

    return activeSection;
}