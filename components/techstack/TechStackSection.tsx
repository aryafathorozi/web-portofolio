"use client";

import { motion, Variants } from "framer-motion";
import { SiJavascript, SiNextdotjs, SiTailwindcss, SiBootstrap, SiPhp, SiPostgresql, SiMysql, SiFirebase, SiFigma, SiGit } from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
}

export default function TechStackSection() {
  const row1: TechItem[] = [
    { name: "NEXT.JS", icon: SiNextdotjs, colorClass: "group-hover:text-white" },
    { name: "JAVASCRIPT", icon: SiJavascript, colorClass: "group-hover:text-yellow-400" },
    { name: "TAILWIND CSS", icon: SiTailwindcss, colorClass: "group-hover:text-sky-400" },
    { name: "BOOTSTRAP", icon: SiBootstrap, colorClass: "group-hover:text-purple-500" },
    { name: "FIGMA", icon: SiFigma, colorClass: "group-hover:text-pink-400" },
  ];

  const row2: TechItem[] = [
    { name: "PHP", icon: SiPhp, colorClass: "group-hover:text-indigo-400" },
    { name: "POSTGRESQL", icon: SiPostgresql, colorClass: "group-hover:text-blue-400" },
    { name: "MYSQL", icon: SiMysql, colorClass: "group-hover:text-amber-500" },
    { name: "FIREBASE", icon: SiFirebase, colorClass: "group-hover:text-orange-400" },
    { name: "GIT", icon: SiGit, colorClass: "group-hover:text-orange-600" },
  ];

  const marqueeVariants = (direction: "left" | "right"): Variants => ({
    animate: {
      x: direction === "left" ? [0, -1000] : [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 22,
          ease: "linear",
        },
      },
    },
  });

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden z-10 w-full bg-gradient-to-b from-transparent via-[#030712]/40 to-transparent">
      <div className="container mx-auto px-6 mb-16 text-center">
        <span className="text-blue-500 font-mono text-xs tracking-widest uppercase block mb-3">03 / Tech Stack</span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase text-white mb-4">
          Skills & <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Technologies</span>
        </h2>
        <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          A curated assembly of high-performance tools and languages powering the next generation of digital architecture.
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-[100vw] overflow-hidden select-none pointer-events-auto">
        <div className="flex w-max gap-4 overflow-hidden mask-gradient">
          <motion.div variants={marqueeVariants("left")} animate="animate" className="flex gap-4 pr-4">
            {[...row1, ...row1, ...row1, ...row1].map((tech, idx) => (
              <TechCard key={`r1-${idx}`} tech={tech} />
            ))}
          </motion.div>
        </div>

        <div className="flex w-max gap-4 overflow-hidden mask-gradient">
          <motion.div variants={marqueeVariants("right")} animate="animate" className="flex gap-4 pr-4">
            {[...row2, ...row2, ...row2, ...row2].map((tech, idx) => (
              <TechCard key={`r2-${idx}`} tech={tech} />
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }
      `}</style>
    </section>
  );
}

function TechCard({ tech }: { tech: TechItem }) {
  const Icon = tech.icon;

  return (
    <div className="group flex items-center gap-3.5 bg-[#081122]/40 backdrop-blur-md px-6 py-4 rounded-xl ring-1 ring-white/5 transition-all duration-500 hover:bg-[#0a162d]/60 hover:ring-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/5 min-w-[180px] md:min-w-[210px] justify-center cursor-default">
      <Icon className={`w-5 h-5 md:w-6 md:h-6 text-gray-500 transition-colors duration-500 ${tech.colorClass}`} />
      <span className="text-gray-400 text-xs md:text-sm font-bold tracking-wider font-mono group-hover:text-white transition-colors duration-300">{tech.name}</span>
    </div>
  );
}
