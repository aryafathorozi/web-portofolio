"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function HeroImage() {
  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative flex-shrink-0 group pb-12">
      <motion.div
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-400 blur-2xl opacity-70"
      ></motion.div>

      <div className="relative rounded-2xl bg-[#030712] p-2 ring-1 ring-white/10 overflow-hidden">
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4, ease: "easeOut" }} className="relative overflow-hidden rounded-xl">
          <Image src="/foto-profil.jpg" alt="Muhammad Arya Fathorozi" width={360} height={360} priority className="object-cover" />
        </motion.div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="rounded-xl bg-[#081122]/90 backdrop-blur-sm p-3 ring-1 ring-white/10 shadow-xl">
            <p className="text-sm font-bold tracking-tight text-white/95">MUHAMMAD ARYA FATHOROZI</p>
            <p className="text-[10px] text-blue-400 font-mono mt-0.5 tracking-wider">• WEB DEVELOPER</p>
          </div>
        </div>
      </div>

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-4 z-10"
      >
        <div className="rounded-xl bg-[#081122]/95 backdrop-blur-md px-4 py-2.5 ring-1 ring-white/10 shadow-2xl flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>

          <div className="font-mono text-left">
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider leading-none">STATUS</p>
            <p className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wide mt-0.5 leading-none">FULLSTACK WEB DEVELOPER</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
