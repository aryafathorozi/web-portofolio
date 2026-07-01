"use client";

import { motion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import HeroImage from "@/components/hero/HeroImage";
import HeroText from "@/components/hero/HeroText";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import BackgroundAnimation from "@/components/background/BackgroundAnimation";

export default function Page() {
  const activeSection = useActiveSection(["home", "about", "experience"]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Journey" },
  ];

  return (
    <div className="relative min-h-screen bg-[#030712] text-white overflow-x-hidden selection:bg-blue-600 selection:text-white">
      <BackgroundAnimation />

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/60 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-lg font-bold tracking-tight text-white flex items-center gap-1 cursor-pointer select-none">
            <span className="text-blue-500 font-mono font-medium">$</span> KAMN<span className="text-purple-500">.</span>DANU
          </div>

          <nav className="hidden md:flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-gray-400">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-5 py-2.5 rounded-xl transition-all duration-300 hover:text-white ${isActive ? "text-white font-semibold" : "text-gray-400"}`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-blue-600 to-purple-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    >
                      <span className="block h-full w-full rounded-[11px] bg-[#030712]/80 backdrop-blur-sm" />
                    </motion.span>
                  )}
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-xs font-semibold tracking-wide text-white hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            CONTACT ME
          </a>
        </div>
      </header>

      <section id="home" className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 pt-24 pb-12">
        <HeroImage />
        <HeroText />
      </section>

      <div id="about" className="relative z-10">
        <AboutSection />
      </div>

      <div id="experience" className="relative z-10">
        <ExperienceSection />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#030712]/90 backdrop-blur-sm border-t border-white/5 py-4 z-40">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-3">
            {["github", "linkedin", "instagram"].map((platform, index) => (
              <a
                key={index}
                href={`https://${platform}.com`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 transition ring-1 ring-white/10 text-xs font-mono font-bold text-gray-400"
              >
                {platform.charAt(0)}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest text-center sm:text-right uppercase">YES! THINK CREATIVELY & MAKE YOUR OWN IDEA.</p>
        </div>
      </div>
    </div>
  );
}
