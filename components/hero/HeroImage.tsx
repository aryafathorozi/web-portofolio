"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroImage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative flex-shrink-0 group pb-12 select-none">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-400 blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
      <div className="relative rounded-2xl bg-[#030712] p-[1px] bg-white/10 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500 overflow-hidden shadow-2xl">
        <div className="bg-[#030712] p-2 rounded-[15px] overflow-hidden">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/photo_profiles.jpeg"
              alt="Muhammad Arya Fathorozi"
              width={360}
              height={360}
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-103 group-hover:brightness-105"
            />
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="rounded-xl bg-[#081122]/80 backdrop-blur-md p-3 ring-1 ring-white/10 shadow-xl border border-white/5 transition-colors duration-500 group-hover:border-blue-500/20">
              <p className="text-sm font-bold tracking-tight text-white/95">MUHAMMAD ARYA FATHOROZI</p>
              <p className="text-[10px] text-blue-400 font-mono mt-0.5 tracking-wider">• WEB DEVELOPER</p>
            </div>
          </div>
        </div>
      </div>

      <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-2 right-0 z-10">
        <div className="rounded-xl bg-[#081122]/95 backdrop-blur-md px-4 py-2.5 ring-1 ring-white/10 shadow-2xl flex items-center gap-3 border border-white/5 group-hover:border-cyan-500/30 transition-colors duration-500">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
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
