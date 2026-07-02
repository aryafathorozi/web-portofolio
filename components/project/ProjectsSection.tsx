"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectCard, { ProjectItem } from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: "REKAP ABSENSI DIGITAL & HRIS",
      status: "COMPLETED",
      statusColor: "text-emerald-400 ring-emerald-500/30 bg-emerald-500/10",
      description: "Automated digital attendance calculations, shift scheduling logic, multi-level approval workflows, and automated PDF report generation.",
      fullDescription:
        "An advanced, comprehensive Human Resource Information System engineered to handle complex enterprise operational workflows. Implements real-time digital attendance tracking via precise geo-location boundaries, high-flexibility operational shift rotation scheduling matrices, multi-tiered hierarchy management approval structures, and automated daily-to-monthly cryptographic PDF rekap report generation built for standard auditing workflows.",
      tags: ["LARAVEL", "POSTGRESQL", "TAILWIND CSS", "TCPDF MODULE"],
      imageSrc: "/images/project-nova.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "SHARIA COOPERATIVE ACCOUNTING",
      status: "COMPLETED",
      statusColor: "text-emerald-400 ring-emerald-500/30 bg-emerald-500/10",
      description: "Financial management modules for Sharia cooperatives, focusing on automated ledger entries, balance sheets, and SHU distribution logic.",
      fullDescription:
        "Custom-tailored sharia banking and cooperative core platform focused on strict automated microfinance ledger compliance. Features zero-delay automated journal balancing logs, automated real-time dynamic balance sheets, granular multi-account profit/loss reports, and complex automated Sisa Hasil Usaha (SHU) logic arrays distributed symmetrically based on member contribution shares.",
      tags: ["PHP", "MYSQL", "BOOTSTRAP 5", "DATATABLES CORE"],
      imageSrc: "/images/project-neo.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "GATEWAY INTEGRATION ENGINE",
      status: "COMPLETED",
      statusColor: "text-emerald-400 ring-emerald-500/30 bg-emerald-500/10",
      description: "Payment integration core built to handle high-frequency webhooks, automated callbacks, and direct disbursements using Midtrans and Duitku.",
      fullDescription:
        "A bulletproof web service core built to handle high-concurrency payment streams with automated asynchronous transaction validation pipelines. Features secure multi-tenant API token hashing systems, instantaneous webhook handler execution blocks with fallback retry logic, and programmatic multi-channel direct disbursement nodes integrating Midtrans (Snap, Pop, Iris) and Duitku engine parameters.",
      tags: ["NEXT.JS", "NODE.JS", "MIDTRANS API", "DUITKU SDK"],
      imageSrc: "/images/project-aether.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "TOUR & TRAVEL PORTFOLIO",
      status: "IN PROGRESS",
      statusColor: "text-purple-400 ring-purple-500/30 bg-purple-500/10",
      description: "A highly interactive destination portfolio website featuring multi-route itinerary planning and performance-optimized asset loading.",
      fullDescription:
        "A highly immersive presentation platform designed for tourist hubs and cross-border itinerary handling. Delivers high-performance asset loading chains utilizing advanced edge caching, a dynamic multi-day trip route construction module, responsive booking configuration pathways, and silky-smooth layout transitions optimized across all screen formats.",
      tags: ["NEXT.JS", "REACT 18", "FRAMER MOTION", "TAILWIND CSS"],
      imageSrc: "/images/project-travel.jpg",
      link: "#",
    },
  ];

  useEffect(() => {
    if (selectedProject) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, selectedProject]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

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
