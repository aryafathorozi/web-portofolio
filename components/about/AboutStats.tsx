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
    },
    {
      value: "10+",
      title: "Professional Certs",
      desc: "Continuous mastery of the latest industry standards.",
      hoverStyle: "hover:bg-gradient-to-br hover:from-purple-600/10 hover:to-transparent hover:ring-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5",
      icon: <Award size={20} className="text-purple-400" />,
    },
  ];

  return (
    <div className="w-full md:w-[380px] flex flex-col gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -4 }}
          transition={{
            type: "tween",
            ease: [0.25, 1, 0.5, 1],
            duration: 0.4,
          }}
          className={`rounded-2xl bg-[#081122]/40 backdrop-blur-md p-6 ring-1 ring-white/5 flex flex-col justify-between relative overflow-hidden group min-h-[162px] will-change-transform transform-gpu transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${card.hoverStyle}`}
        >
          <div className="flex justify-between items-start">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
              {card.value}
            </span>
            <div className="p-2 rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:scale-110 group-hover:bg-white/10 transition duration-500">{card.icon}</div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-bold text-white tracking-wide group-hover:text-blue-400/90 transition-colors duration-500">{card.title}</h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{card.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
