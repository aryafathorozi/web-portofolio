"use client";

import { SiJavascript, SiNextdotjs, SiTailwindcss, SiBootstrap, SiLaravel, SiPhp, SiPostgresql, SiMysql, SiFirebase, SiFigma, SiGit } from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
}

export default function TechStackSection() {
  const row1: TechItem[] = [
    { name: "NEXT.JS", icon: SiNextdotjs, colorClass: "text-white md:text-gray-500 md:group-hover:text-white" },
    { name: "JAVASCRIPT", icon: SiJavascript, colorClass: "text-yellow-400 md:text-gray-500 md:group-hover:text-yellow-400" },
    { name: "TAILWIND CSS", icon: SiTailwindcss, colorClass: "text-sky-400 md:text-gray-500 md:group-hover:text-sky-400" },
    { name: "BOOTSTRAP", icon: SiBootstrap, colorClass: "text-purple-500 md:text-gray-500 md:group-hover:text-purple-500" },
    { name: "FIGMA", icon: SiFigma, colorClass: "text-pink-400 md:text-gray-500 md:group-hover:text-pink-400" },
  ];

  const row2: TechItem[] = [
    { name: "LARAVEL", icon: SiLaravel, colorClass: "text-red-500 md:text-gray-500 md:group-hover:text-red-500" },
    { name: "PHP", icon: SiPhp, colorClass: "text-indigo-400 md:text-gray-500 md:group-hover:text-indigo-400" },
    { name: "POSTGRESQL", icon: SiPostgresql, colorClass: "text-blue-400 md:text-gray-500 md:group-hover:text-blue-400" },
    { name: "MYSQL", icon: SiMysql, colorClass: "text-amber-500 md:text-gray-500 md:group-hover:text-amber-500" },
    { name: "FIREBASE", icon: SiFirebase, colorClass: "text-orange-400 md:text-gray-500 md:group-hover:text-orange-400" },
    { name: "GIT", icon: SiGit, colorClass: "text-orange-600 md:text-gray-500 md:group-hover:text-orange-600" },
  ];

  const MarqueeRow = ({ row, direction }: { row: TechItem[], direction: 'left' | 'right' }) => {
    const items = [...row, ...row];
    
    return (
      <div 
        className={`flex w-max ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
      >
        <div className="flex gap-4 pr-4">
          {items.map((tech, idx) => (
            <TechCard key={`set1-${idx}`} tech={tech} />
          ))}
        </div>
        <div className="flex gap-4 pr-4">
          {items.map((tech, idx) => (
            <TechCard key={`set2-${idx}`} tech={tech} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="techstack" className="py-24 relative overflow-hidden z-10 w-full bg-gradient-to-b from-transparent via-[#030712]/40 to-transparent">
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
        <div className="flex w-max overflow-hidden mask-gradient">
          <MarqueeRow row={row1} direction="left" />
        </div>

        <div className="flex w-max overflow-hidden mask-gradient">
          <MarqueeRow row={row2} direction="right" />
        </div>
      </div>

      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 15%, white 85%, transparent);
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

function TechCard({ tech }: { tech: TechItem }) {
  const Icon = tech.icon;

  return (
    <div className="group flex items-center gap-3.5 bg-[#081122]/40 backdrop-blur-md px-6 py-4 rounded-xl ring-1 ring-white/5 transition-all duration-500 md:hover:bg-[#0a162d]/60 md:hover:ring-cyan-500/20 md:hover:shadow-lg md:hover:shadow-cyan-500/5 min-w-[180px] md:min-w-[210px] justify-center">
      <Icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${tech.colorClass}`} />
      <span className="text-white md:text-gray-400 text-xs md:text-sm font-bold tracking-wider font-mono md:group-hover:text-white transition-colors duration-300">{tech.name}</span>
    </div>
  );
}
