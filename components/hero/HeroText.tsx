"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function HeroText() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const renderInteractiveText = (text: string, baseColorClass: string) => {
    return text.split("").map((char, index) => {
      if (char === " ") return <span key={index}>&nbsp;</span>;

      return (
        <motion.span
          key={index}
          className={`inline-block cursor-default select-none transition-all duration-300 ease-out ${baseColorClass} 
            hover:text-white hover:scale-110`}
          style={{
            transformOrigin: "center font-baseline",
          }}
          whileHover={{
            textShadow: [
              "0 0 4px rgba(34, 211, 238, 0.8)", // Cyan (Sharp)
              "0 0 12px rgba(147, 51, 234, 0.6)", // Purple (Medium)
              "0 0 20px rgba(37, 99, 235, 0.4)", // Blue (Wide)
            ].join(", "),
          }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-grow max-w-2xl text-center md:text-left">
      <motion.p variants={itemVariants} className="font-mono text-xs text-blue-500 uppercase tracking-[.3em] mb-4">
        I&apos;M // FULLSTACK WEB DEVELOPER
      </motion.p>

      <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 whitespace-nowrap">
        <div className="block">{renderInteractiveText("MUHAMMAD", "text-gray-500")}</div>
        <div className="block">{renderInteractiveText("ARYA", "text-gray-300")}</div>
        <div className="block">{renderInteractiveText("FATHOROZI", "bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent hover:bg-none")}</div>
      </motion.h1>

      <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-400 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
        Specializing on backend and creative interface developer using modern techniques — building bridges between imagination and interactive reality.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href="#contact"
          className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200"
        >
          View More <ArrowRight size={16} />
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.98 }}
          href="/cv.pdf"
          download
          className="inline-flex items-center gap-2.5 rounded-full bg-white/5 px-8 py-3.5 text-sm font-medium text-gray-200 ring-1 ring-white/10 transition duration-200"
        >
          Contact Me <Download size={16} className="text-gray-400" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
