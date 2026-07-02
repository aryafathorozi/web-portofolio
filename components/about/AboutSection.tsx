"use client";

import { motion } from "framer-motion";
import AboutDescription from "./AboutDescription";
import AboutStats from "./AboutStats";

export default function AboutSection() {
  return (
    <section id="about" className="container mx-auto px-6 py-24 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="font-mono text-xs text-blue-500 uppercase tracking-[.3em] mb-2">01 // ABOUT ME</p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">
          ABOUT <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">ME</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-6 items-stretch"
      >
        <AboutDescription />
        <AboutStats />
      </motion.div>
    </section>
  );
}
