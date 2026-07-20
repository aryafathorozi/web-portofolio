"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  status: string;
  statusColor: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  imageSrc: string;
  link?: string;
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  currentIndex: number;
  totalProjects: number;
  onClickCard: () => void;
  onClickExplore: () => void;
}

export default function ProjectCard({ project, index, currentIndex, totalProjects, onClickCard, onClickExplore }: ProjectCardProps) {
  let offset = index - currentIndex;

  if (offset < -1 && currentIndex >= totalProjects - 2) offset += totalProjects;
  if (offset > 1 && currentIndex <= 1) offset -= totalProjects;

  const isVisible = offset >= -1 && offset <= 1;
  if (!isVisible) return null;

  const isActive = offset === 0;

  const xPosition = offset * 360;
  const rotateY = offset * -22;
  const zPosition = isActive ? 0 : -200;

  const smoothBezier = [0.25, 1, 0.5, 1] as const;

  return (
    <motion.div
      initial={false}
      animate={{
        x: xPosition,
        rotateY: rotateY,
        z: zPosition,
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.35,
        zIndex: isActive ? 30 : 10,
      }}
      transition={{ duration: 0.65, ease: [...smoothBezier] }}
      style={{ transformStyle: "preserve-3d" }}
      className="absolute w-full max-w-[340px] md:max-w-[380px] h-[450px] cursor-pointer origin-center"
      onClick={onClickCard}
    >
      <div
        className={`group h-full relative overflow-hidden rounded-2xl p-6 ring-1 transition-all duration-500 flex flex-col justify-between ${
          isActive ? "bg-[#09152a]/70 ring-cyan-500/30 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl" : "bg-[#081122]/40 ring-white/5 backdrop-blur-md pointer-events-none md:pointer-events-auto"
        }`}
      >
        <div>
          <div className="relative w-full h-40 rounded-xl overflow-hidden mb-5 bg-[#040a16] border border-white/5">
            <span
              className={`absolute top-2.5 right-2.5 z-20 inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-medium font-mono tracking-wider ring-1 ring-inset backdrop-blur-md ${project.statusColor}`}
            >
              {project.status}
            </span>

            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              sizes="(max-w-768px) 100vw, 33vw"
              className="object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
              priority={isActive}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081122] via-transparent to-transparent opacity-60" />
          </div>
          <h3 className="text-base font-bold tracking-wide uppercase text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{project.title}</h3>
          <p className="text-xs leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">{project.description}</p>
        </div>

        <div>
          <div className="w-full h-[1px] bg-white/5 mb-4" />
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag, tIdx) => (
              <span key={tIdx} className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-mono tracking-wider text-gray-400 ring-1 ring-white/10">
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClickExplore();
            }}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2 text-[10px] font-mono font-bold tracking-wider text-gray-300 border border-white/5 group-hover:bg-cyan-500/10 group-hover:text-white group-hover:border-cyan-500/20 transition-all duration-300"
          >
            VIEW SITE <ExternalLink size={10} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
