"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { getAllExperiences } from "@/services/experienceService";
import { ExperienceEntity } from "@/types/database.types";

interface ExperienceItem {
  id?: string;
  number: string;
  period: string;
  rolePrefix: string;
  description: string;
  yearWatermark: string;
  skills: string[];
  isCurrent?: boolean;
}

export default function ExperienceSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const INITIAL_DISPLAY_COUNT = 2;

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getAllExperiences();
        const formattedData: ExperienceItem[] = data.map((exp, index) => ({
          id: exp.id,
          number: `03.${index + 1}`,
          period: exp.periode,
          rolePrefix: exp.role,
          description: exp.description,
          yearWatermark: exp.year_background || "",
          skills: Array.isArray(exp.tech_stack) ? exp.tech_stack : typeof exp.tech_stack === "string" ? JSON.parse(exp.tech_stack) : [],
          isCurrent: index === 0,
        }));
        setExperiences(formattedData);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const primaryExperiences = experiences.slice(0, INITIAL_DISPLAY_COUNT);
  const secondaryExperiences = experiences.slice(INITIAL_DISPLAY_COUNT);

  const smoothBezier = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="experience" className="container mx-auto px-6 py-24 relative z-10">
      <div className="mb-16">
        <span className="text-blue-500 font-mono text-xs tracking-widest uppercase block mb-2">02 / Journey</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white uppercase">
          Professional <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto pl-8 md:pl-16">
        <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-50 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />

        <div className="space-y-12">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
            </div>
          ) : (
            primaryExperiences.map((exp) => (
              <ExperienceCard key={exp.id || exp.number} exp={exp} />
            ))
          )}
        </div>

        <div className="overflow-hidden">
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="accordion-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.6, ease: smoothBezier },
                  opacity: { duration: 0.4, delay: 0.05 },
                }}
              >
                <div className="space-y-12 pt-12 pb-2">
                  {secondaryExperiences.map((exp) => (
                    <motion.div key={exp.id || exp.number} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 15, opacity: 0 }} transition={{ duration: 0.4, ease: smoothBezier }}>
                      <ExperienceCard exp={exp} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-14 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-2.5 text-xs font-mono tracking-wider text-gray-300 ring-1 ring-white/10 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-white hover:ring-cyan-500/30 transition-all duration-300 shadow-xl"
          >
            {isExpanded ? (
              <>
                SHOW LESS <ChevronUp size={14} className="text-gray-400 group-hover:text-cyan-400 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </>
            ) : (
              <>
                VIEW ALL JOURNEY ({experiences.length}) <ChevronDown size={14} className="text-gray-400 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
function ExperienceCard({ exp }: { exp: ExperienceItem }) {
  return (
    <div className="relative group cursor-pointer">
      <div
        className={`absolute -left-[37px] md:-left-[69px] top-7 w-[10px] h-[10px] rounded-full transition-all duration-500 z-10 ${
          exp.isCurrent ? "bg-cyan-400 shadow-[0_0_12px_#22d3ee,0_0_20px_#22d3ee]" : "bg-purple-500 group-hover:bg-cyan-400 shadow-[0_0_8px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_12px_#22d3ee]"
        }`}
      />

      <div className="relative overflow-hidden rounded-2xl bg-[#081122]/30 backdrop-blur-md p-6 md:p-8 ring-1 ring-white/5 transition-all duration-500 hover:bg-gradient-to-b hover:from-[#0a162d]/50 hover:to-[#081122]/30 hover:ring-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/5">
        <div className="absolute right-4 bottom-[-10px] md:bottom-[-20px] text-6xl md:text-8xl font-black text-white/[0.02] group-hover:text-cyan-500/[0.03] select-none font-mono tracking-tighter transition-colors duration-500 pointer-events-none hidden sm:block">
          {exp.yearWatermark}
        </div>

        <div className="absolute right-6 top-8 text-gray-500 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cyan-400 transition-all duration-300 hidden sm:block">
          <ArrowRight size={18} />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
          <span className="text-gray-500 font-mono text-xs tracking-wider">{exp.number}</span>
          <span className="text-blue-400 font-mono text-xs tracking-widest font-semibold uppercase">{exp.period}</span>
        </div>
        <h3 className="text-base md:text-xl font-bold tracking-wide uppercase text-white mb-3 pr-8">{exp.rolePrefix}</h3>
        <p className="text-xs md:text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors duration-300 max-w-2xl">{exp.description}</p>
        <div className="max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-6 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden">
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {exp.skills.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-mono tracking-wider text-gray-400 ring-1 ring-white/10 group-hover:text-cyan-400 group-hover:ring-cyan-500/20 group-hover:bg-cyan-500/5 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
