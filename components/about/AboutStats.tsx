"use client";

import { motion } from "framer-motion";
import { Rocket, Award } from "lucide-react";

export default function AboutStats() {
  const cards = [
    {
      value: "25+",
      title: "Projects Completed",
      desc: "Delivering high-end digital solutions with uncompromising quality.",
      hoverStyle: "hover:bg-gradient-to-br hover:from-blue-600/10 hover:to-transparent hover:ring-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5",
      icon: <Rocket size={20} className="text-blue-400" />,
      mobileShimmer: "via-blue-400/10",
      mobileTitle: "text-blue-400",
      desktopHoverTitle: "md:group-hover:text-blue-400/90",
    },
    {
      value: "10+",
      title: "Professional Certs",
      desc: "Continuous mastery of the latest industry standards.",
      hoverStyle: "hover:bg-gradient-to-br hover:from-purple-600/10 hover:to-transparent hover:ring-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5",
      icon: <Award size={20} className="text-purple-400" />,
      mobileShimmer: "via-purple-400/10",
      mobileTitle: "text-purple-400",
      desktopHoverTitle: "md:group-hover:text-purple-400/90",
    },
  ];

  return (
    <div className="w-full md:w-[380px] flex flex-col gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "tween",
            ease: [0.25, 1, 0.5, 1],
            duration: 0.4,
          }}
          className={`rounded-2xl bg-[#081122]/40 backdrop-blur-md p-6 ring-1 ring-white/5 flex flex-col justify-between relative overflow-hidden group min-h-[162px] will-change-transform transform-gpu transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${card.hoverStyle}`}
        >
          <motion.div 
            className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent ${card.mobileShimmer} to-transparent md:hidden pointer-events-none z-0`}
            whileInView={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 + (index * 0.2) }}
            viewport={{ once: false }}
          />

          <div className="flex justify-between items-start relative z-10">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 md:text-white md:group-hover:text-transparent md:group-hover:bg-clip-text md:group-hover:bg-gradient-to-r md:group-hover:from-white md:group-hover:to-gray-400 transition-all duration-500">
              {card.value}
            </span>
            <div className="p-2 rounded-xl bg-white/10 scale-110 md:scale-100 md:bg-white/5 ring-1 ring-white/10 md:group-hover:scale-110 md:group-hover:bg-white/10 transition duration-500">{card.icon}</div>
          </div>

          <div className="mt-4 relative z-10">
            <h4 className={`text-sm font-bold ${card.mobileTitle} md:text-white tracking-wide ${card.desktopHoverTitle} transition-colors duration-500`}>{card.title}</h4>
            <p className="text-xs text-gray-300 md:text-gray-400 mt-1 leading-relaxed">{card.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
