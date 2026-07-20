"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, GraduationCap, Code2, Settings, LogOut } from "lucide-react";

const menuItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Experience", href: "/admin/experience", icon: Code2 },
  { name: "Certifications", href: "/admin/certifications", icon: GraduationCap },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#070d19]/80 backdrop-blur-xl border-r border-white/5 flex flex-col justify-between p-6 h-screen sticky top-0 z-20">
      <div className="space-y-8">
        <div className="px-2">
          <Link href="/" target="_blank" className="block cursor-pointer group">
            <h1 className="font-sans text-xl font-black tracking-wider text-white uppercase transition-colors group-hover:text-cyan-50">
              KAMN.<span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">DANU</span>
            </h1>
            <p className="font-mono text-[9px] tracking-widest text-cyan-400/80 uppercase mt-0.5 group-hover:text-cyan-400 transition-colors">Creative Technologist</p>
          </Link>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs tracking-wide transition-all duration-300 group ${
                  isActive ? "text-white bg-white/[0.03] ring-1 ring-white/10" : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-cyan-400 to-purple-600 rounded-r-full shadow-[0_0_10px_#22d3ee]" />}
                <item.icon size={16} className={isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400/80 transition-colors"} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs tracking-wide text-gray-500 hover:text-rose-400 hover:bg-rose-500/[0.02] transition-all duration-300">
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}
