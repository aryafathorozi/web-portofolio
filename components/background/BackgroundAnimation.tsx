"use client";

import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  const codeSnippets = [
    "<div>",
    "const danu = () => {}",
    "import { motion } from 'framer-motion'",
    "return <Portfolio />",
    "$.ajax()",
    "Laravel",
    "Next.js",
    "SELECT * FROM",
    "api/v1/disbursement",
    "backdrop-blur",
    "const [hover, setHover]",
    "git push origin main",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute right-[-5%] top-[12%] select-none pointer-events-none tracking-tighter font-black text-[10vw] md:text-[14vw] uppercase italic text-white/[0.015] leading-none font-sans mix-blend-screen">
        Precision
      </div>

      <div className="absolute left-[-2%] top-[55%] select-none pointer-events-none tracking-tighter font-black text-[10vw] md:text-[12vw] uppercase italic text-white/[0.012] leading-none font-sans mix-blend-screen">
        Craftsmanship
      </div>
      <div className="absolute inset-0 hidden lg:block select-none opacity-[0.02]">
        {codeSnippets.map((snippet, index) => {
          const randomLeft = `${(index * 9) % 100}%`;
          const randomTop = `${(index * 7 + 10) % 90}%`;
          const randomDuration = 15 + (index % 5) * 5; 

          return (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                left: randomLeft,
                top: randomTop,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                ease: "linear",
              }}
              className="font-mono text-xs text-cyan-400 tracking-wider whitespace-nowrap"
            >
              {snippet}
            </motion.div>
          );
        })}
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] rounded-full bg-blue-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45rem] h-[45rem] rounded-full bg-purple-500/[0.02] blur-[140px] pointer-events-none" />
    </div>
  );
}
