"use client";

import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

export default function AboutDescription() {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
      className="flex-1 rounded-2xl bg-[#081122]/40 backdrop-blur-md p-8 ring-1 ring-white/5 flex flex-col justify-between min-h-[360px] will-change-transform transform-gpu transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-gradient-to-b hover:from-[#0a162d]/60 hover:to-[#081122]/40 hover:ring-cyan-500/20 hover:shadow-2xl hover:shadow-cyan-500/5 group"
    >
      <div className="relative flex-1 text-sm md:text-base leading-relaxed text-gray-400">
        <div className="space-y-4">
          <p className="text-gray-300 font-mono text-xs tracking-wider uppercase">WHO AM I ??</p>

          <div className="blur-[1.5px] group-hover:blur-none opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out space-y-4">
            <p className="transition-colors duration-300 group-hover:text-gray-300">
              Hi there! I am a <strong className="text-white font-semibold group-hover:text-cyan-400 transition-colors duration-300">Full-Stack Web Developer</strong> and Informatics Management
              graduate from <strong className="text-white">Politeknik Negeri Jember</strong>. Over the past 1–2 years, I’ve been crafting various IT solutions, which currently includes building and
              managing web systems for a hospital environment.
            </p>
            <p className="transition-colors duration-300 group-hover:text-gray-300">
              I have a huge passion for data-driven projects—basically, I love building applications that can turn complex, raw data into clear, useful information. Since technology evolves so fast,
              I’m always eager to learn and push my limits, ensuring I always deliver high-performance web experiences that fit your needs perfectly.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8 relative z-20">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-xs font-mono tracking-wider text-gray-300 ring-1 ring-white/10 hover:bg-blue-600/20 hover:text-white hover:ring-blue-500/30 transition duration-300"
        >
          <Link2 size={14} className="text-blue-400" /> LINKEDIN
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-xs font-mono tracking-wider text-gray-300 ring-1 ring-white/10 hover:bg-purple-600/20 hover:text-white hover:ring-purple-500/30 transition duration-300"
        >
          <svg className="text-purple-400 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
          GITHUB
        </a>
      </div>
    </motion.div>
  );
}
