"use client";

import { motion } from "framer-motion";
import { MonitorX, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function MobileNotSupported() {
  return (
    <div className="h-full min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 bg-[#030712] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] mix-blend-screen" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-sm"
      >
        <div className="relative mb-8">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"
          />
          <div className="relative w-24 h-24 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center backdrop-blur-sm">
            <MonitorX size={40} className="text-red-400" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#030712] border border-red-500/30 flex items-center justify-center">
              <ShieldAlert size={18} className="text-red-500" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-black tracking-tight text-white mb-3 uppercase">
          Akses <span className="text-red-500">Ditolak</span>
        </h1>
        
        <p className="text-sm text-gray-400 leading-relaxed mb-10 font-mono">
          <span className="text-red-400 font-bold block mb-2">ERR: MOBILE_RESTRICTED</span>
          Halaman Administrator hanya dirancang dan dapat diakses menggunakan perangkat Desktop atau Laptop.
        </p>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-6 py-3 text-xs font-mono font-bold tracking-wider text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-xl"
          >
            <ArrowLeft size={16} className="text-gray-400" />
            KEMBALI KE LANDING PAGE
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
