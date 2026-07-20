"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectCard, { ProjectItem } from "./ProjectCard";
import { getAllProjects } from "@/services/projectService";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getAllProjects();
        const mappedProjects: ProjectItem[] = data.map((item) => {
          const status = item.status?.toUpperCase() || "COMPLETED";
          let statusColor = "text-blue-400 ring-blue-500/30 bg-blue-500/10";
          if (status === "COMPLETED") statusColor = "text-emerald-400 ring-emerald-500/30 bg-emerald-500/10";
          else if (status === "IN PROGRESS") statusColor = "text-purple-400 ring-purple-500/30 bg-purple-500/10";

          return {
            id: item.id || Math.random().toString(),
            title: item.title,
            status: item.status,
            statusColor: statusColor,
            description: item.description,
            fullDescription: item.full_description,
            tags: Array.isArray(item.tech_stack) ? item.tech_stack : [],
            imageSrc: item.image_src || "/images/placeholder.jpg",
            link: item.link
          };
        });
        setProjects(mappedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject || projects.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, selectedProject, projects]);

  const handleNext = () => {
    if (projects.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const handlePrev = () => {
    if (projects.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  if (loading) {
    return (
      <section id="project" className="container mx-auto px-4 py-24 relative z-10 overflow-hidden flex items-center justify-center min-h-[800px]">
        <div className="text-cyan-400 animate-pulse font-mono tracking-widest text-sm">LOADING PROJECTS...</div>
      </section>
    );
  }

  return (
    <section id="project" className="container mx-auto px-4 py-24 relative z-10 overflow-hidden">
      <div className="mb-16 text-center">
        <span className="text-blue-500 font-mono text-xs tracking-widest uppercase block mb-2">04 / Portofolio</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-white">
          Featured <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-gray-500 text-xs md:text-sm max-w-xl mx-auto mt-4 leading-relaxed">
          Exploring the intersection of high-performance engineering through a three-dimensional interactive card carousel.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto flex items-center justify-center h-[520px]" style={{ perspective: "1200px" }}>
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-8 z-40 p-3 rounded-full bg-[#081122]/80 border border-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 backdrop-blur-md transition-all duration-300 group shadow-xl"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              currentIndex={currentIndex}
              totalProjects={projects.length}
              onClickCard={() => {
                if (index === currentIndex) setSelectedProject(project);
                else setCurrentIndex(index);
              }}
              onClickExplore={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-2 md:right-8 z-40 p-3 rounded-full bg-[#081122]/80 border border-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 backdrop-blur-md transition-all duration-300 group shadow-xl"
        >
          <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform duration-300" />
        </button>
      </div>

      <div className="flex justify-center gap-2 -mt-4">
        {projects.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className={`h-1 rounded-full transition-all duration-500 ${index === currentIndex ? "w-6 bg-cyan-400" : "w-1.5 bg-white/20"}`} />
        ))}
      </div>

      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </section>
  );
}
