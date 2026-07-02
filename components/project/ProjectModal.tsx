"use client";

import { motion } from "framer-motion";
import { X, Cpu, Layers, CheckCircle2, ExternalLink, Terminal, Code2 } from "lucide-react";
import Image from "next/image";
import { ProjectItem } from "./ProjectCard";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 overflow-y-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-2xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", damping: 28, stiffness: 200 }}
        className="relative w-full max-w-5xl rounded-3xl bg-[#050c18] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col lg:flex-row my-auto max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible"
      >
        <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-black/60 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-md group"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="relative w-full lg:w-[55%] h-64 lg:h-auto min-h-[300px] lg:min-h-[520px] bg-black overflow-hidden">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            sizes="(max-w-1024px) 100vw, 55vw"
            className="object-cover opacity-85 hover:scale-[1.02] transition-transform duration-1000 ease-out"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050c18] via-transparent to-transparent opacity-90" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050c18] to-transparent lg:hidden" />
        </div>

        <div className="w-full lg:w-[45%] p-6 md:p-10 flex flex-col justify-between bg-gradient-to-b from-[#081326] to-[#040914] border-t lg:border-t-0 lg:border-l border-white/5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold font-mono tracking-wider ring-1 ring-inset ${project.statusColor} shadow-inner`}>
                <CheckCircle2 size={11} /> {project.status}
              </span>
              <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase mb-5 leading-none bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text">{project.title}</h3>

            <div className="mb-6 space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase flex items-center gap-1.5">
                <Terminal size={11} /> Shell // Project Overview
              </span>
              <p className="text-xs md:text-sm leading-relaxed text-gray-300 font-normal">{project.fullDescription || project.description}</p>
            </div>

            <div className="mb-8 space-y-2.5">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                <Cpu size={11} /> Engine // Core Infrastructure
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tIdx) => (
                  <div
                    key={tIdx}
                    className="flex items-center gap-1.5 rounded-lg bg-white/[0.03] border border-white/10 px-3 py-1.5 text-[10px] font-mono font-medium text-gray-300 hover:border-cyan-500/30 transition-all"
                  >
                    <Layers size={10} className="text-cyan-500/60" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <a
              href={project.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-xs font-mono font-bold tracking-wider text-white hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_4px_30px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_35px_rgba(6,182,212,0.35)]"
            >
              LAUNCH INTERFACE <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
