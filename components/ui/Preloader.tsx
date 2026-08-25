"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const duration = 2800; // Total loading time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      // Ease out cubic function for smooth deceleration at the end
      const progressRatio = currentStep / steps;
      const easeOutProgress = 1 - Math.pow(1 - progressRatio, 3);
      
      const currentProgress = Math.min(100, Math.floor(easeOutProgress * 100));
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "unset";
        }, 500); // Pause at 100% before exit
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.05,
            transition: { duration: 1.2, ease: [0.45, 0, 0.55, 1], delay: 0.3 } 
          }}
        >
          {/* Ambient Glowing Orbs */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] md:w-[600px] md:h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] md:w-[400px] md:h-[400px] bg-purple-600/10 rounded-full blur-[90px] mix-blend-screen pointer-events-none"
            animate={{ 
              scale: [1.2, 1, 1.2], 
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          />

          {/* Huge Background Counter Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <motion.span 
              className="text-[35vw] font-black text-white/[0.015] tracking-tighter"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {progress}
            </motion.span>
          </div>

          {/* Main Interface */}
          <motion.div 
            className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center"
            // The content fades out and moves up BEFORE the doors open
            exit={{ 
              y: -40, 
              opacity: 0, 
              filter: "blur(10px)", 
              transition: { duration: 0.6, ease: "circIn" } 
            }}
          >
            {/* Logo Sequence */}
            <div className="overflow-hidden mb-16">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-1 font-sans"
              >
                <span className="text-blue-500 font-mono font-medium mr-2">$</span>
                <span className="text-white">KAMN</span>
                <span className="text-purple-500">.</span>
                <span className="text-gray-300">DANU</span>
              </motion.div>
            </div>

            {/* Ultra-minimal Loading Line */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-visible rounded-full">
              {/* Active Progress */}
              <motion.div 
                className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
              {/* Glowing Head */}
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1),0_0_30px_rgba(34,211,238,0.8)]"
                initial={{ left: "0%" }}
                animate={{ left: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
                style={{ translateX: "-50%" }}
              />
            </div>

            {/* Status Footer */}
            <div className="w-full flex justify-between mt-8 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
              <div className="flex flex-col overflow-hidden h-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={progress === 100 ? "ready" : "loading"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={progress === 100 ? "text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-gray-400"}
                  >
                    {progress === 100 ? "Launch Sequence Initiated" : "Authenticating Connection"}
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white font-medium"
              >
                {progress}%
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
