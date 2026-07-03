"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { KeyRound, Mail, ArrowRight } from "lucide-react";
import BackgroundAuth from "@/components/admin/BackgroundAuth"; // Sesuaikan alias path '@/' proyek Anda

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Di Sini Tempat Mengaitkan Backend (Supabase Auth / API Endpoint Anda)
    try {
      console.log("Submitting login info:", { email, password, rememberMe });
    } catch (error) {
      console.error("Authentication process failed:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030712] flex items-center justify-center p-4 overflow-hidden select-none">
      {/* Panggil Komponen Latar Belakang */}
      <BackgroundAuth />

      {/* CORE AUTHORIZATION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
        className="relative w-full max-w-[420px] rounded-3xl bg-[#081122]/50 backdrop-blur-xl p-8 md:p-10 
                   ring-1 ring-white/10 shadow-2xl transition-all duration-300 group/card z-10
                   hover:ring-cyan-500/30 hover:shadow-[0_0_50px_rgba(34,211,238,0.08)]"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-500/10 to-purple-500/10 opacity-50 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header Title */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="font-sans text-2xl font-black tracking-widest text-white uppercase">
            KAMN.<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">DANU</span>
          </h1>
          <p className="font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase mt-1.5">Admin Authorization</p>
        </div>

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="block font-mono text-[11px] tracking-wider text-gray-400 uppercase">Username / Email</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors duration-300">
                <Mail size={16} strokeWidth={2} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@kinetic.os"
                className="w-full bg-[#030712]/60 text-white placeholder-gray-600 font-mono text-xs rounded-xl pl-12 pr-4 py-3.5 ring-1 ring-white/5 group-hover:ring-white/10 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] tracking-wider text-gray-400 uppercase">Password</label>
              <a href="#" className="font-mono text-[10px] tracking-wide text-cyan-400/80 hover:text-cyan-400 hover:underline transition-colors duration-200">
                Forgot Password?
              </a>
            </div>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors duration-300">
                <KeyRound size={16} strokeWidth={2} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#030712]/60 text-white placeholder-gray-600 font-mono text-xs rounded-xl pl-12 pr-4 py-3.5 ring-1 ring-white/5 group-hover:ring-white/10 focus:ring-1 focus:ring-purple-500/50 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="sr-only" />
                <div className={`w-8 h-4.5 rounded-full transition-colors duration-300 ${rememberMe ? "bg-cyan-500/30 ring-1 ring-cyan-400/30" : "bg-white/5 ring-1 ring-white/10"}`} />
                <div
                  className={`absolute top-[3px] left-[3px] w-2.5 h-2.5 rounded-full bg-gray-400 transition-all duration-300 ${rememberMe ? "transform translate-x-3.5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : ""}`}
                />
              </div>
              <span className="font-mono text-[10px] tracking-wide text-gray-400 group-hover:text-gray-300 transition-colors duration-200">Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            className="group relative w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-3.5 text-xs font-mono font-bold tracking-widest text-white shadow-xl shadow-purple-500/10 hover:shadow-cyan-500/20 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:animate-[shine_0.8s_ease-in-out]" />
            INITIALIZE SESSION
            <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
