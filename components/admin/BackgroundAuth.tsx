"use client";

import { motion } from "framer-motion";
import { Code2, Database, Terminal, Cpu, Blocks, Globe, LucideIcon } from "lucide-react";

interface FloatingIconProps {
  Icon: LucideIcon;
  top: string;
  left: string;
  delay: number;
  duration: number;
  colorClass: string;
  glowClass: string;
  size?: number;
}

function FloatingIcon({ Icon, top, left, delay, duration, colorClass, glowClass, size = 32 }: FloatingIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.6, 0.9, 0.6],
        y: [0, -12, 12, 0],
        x: [0, 8, -8, 0],
        scale: [1, 1.03, 0.97, 1],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ top, left }}
      className={`absolute p-3 rounded-2xl bg-[#070d19]/60 border border-white/10 ${colorClass} ${glowClass} hidden sm:block pointer-events-none select-none z-0`}
    >
      <Icon size={size} strokeWidth={2} />
    </motion.div>
  );
}

export default function BackgroundAuth() {
  const backgroundIcons = [
    { Icon: Code2, top: "22%", left: "32%", delay: 0, duration: 5.5, colorClass: "text-cyan-400", glowClass: "shadow-[0_0_25px_rgba(34,211,238,0.4)] border-cyan-400/30", size: 34 },
    { Icon: Database, top: "62%", left: "30%", delay: 1.5, duration: 6.5, colorClass: "text-purple-400", glowClass: "shadow-[0_0_25px_rgba(168,85,247,0.35)] border-purple-400/20", size: 32 },
    { Icon: Terminal, top: "25%", left: "62%", delay: 0.5, duration: 5, colorClass: "text-purple-400", glowClass: "shadow-[0_0_25px_rgba(168,85,247,0.4)] border-purple-400/30", size: 34 },
    { Icon: Cpu, top: "58%", left: "64%", delay: 2, duration: 6, colorClass: "text-cyan-400", glowClass: "shadow-[0_0_25px_rgba(34,211,238,0.35)] border-cyan-400/20", size: 36 },
    { Icon: Blocks, top: "15%", left: "48%", delay: 1, duration: 7, colorClass: "text-purple-400", glowClass: "shadow-[0_0_20px_rgba(168,85,247,0.3)] border-purple-400/20", size: 32 },
    { Icon: Globe, top: "78%", left: "46%", delay: 2.5, duration: 5.8, colorClass: "text-cyan-400", glowClass: "shadow-[0_0_20px_rgba(34,211,238,0.3)] border-cyan-400/20", size: 32 },
  ];

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 pointer-events-none z-0" />

      <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-cyan-500/[0.03] blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] rounded-full bg-purple-500/[0.03] blur-[140px] pointer-events-none z-0" />

      {backgroundIcons.map((iconProps, index) => (
        <FloatingIcon key={index} {...iconProps} />
      ))}
    </>
  );
}
