"use client";

import { Briefcase, GraduationCap, Users, Eye, Plus, ArrowUpRight, GraduationCapIcon } from "lucide-react";
import StatCard from "@/components/admin/StatCard";

const recentActivities = [
  { id: 1, action: "Project 'AI Dashboard' updated", status: "PUBLISHED", category: "SOFTWARE", time: "2h ago" },
  { id: 2, action: "New Certification added", status: "DRAFT", category: "CLOUD", time: "5h ago" },
  { id: 3, action: "Profile 'About Me' updated", status: "PUBLISHED", category: "GENERAL", time: "1d ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div
        className="p-8 rounded-3xl bg-[#081328]/70 border border-transparent relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] group/hero"
        style={{
          backgroundImage: "linear-gradient(#081328, #040814), linear-gradient(to right, #22d3ee, #3b82f6, #a855f7)",
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "border-box",
        }}
      >
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-cyan-500/[0.08] blur-[60px] pointer-events-none mix-blend-screen transition-all duration-500 group-hover/hero:scale-110" />
        <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-purple-500/[0.06] blur-[60px] pointer-events-none mix-blend-screen" />
        <div className="absolute right-6 top-6 text-cyan-400/30 group-hover/hero:text-cyan-400/60 group-hover/hero:rotate-45 transition-all duration-700 pointer-events-none">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="animate-pulse">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Good evening, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Arya</span>.
            </h2>
            <p className="font-mono text-xs text-gray-400 max-w-xl leading-relaxed">
              Your creative ecosystem is performing optimally. You have <span className="text-cyan-400 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">3 new certification requests</span> and 2
              project updates pending review.
            </p>
          </div>

          <div className="hidden md:block border-l border-white/5 pl-6 py-2">
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">System Status</div>
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE_SECURE
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Total Projects" value={12} badge="+12%" Icon={Briefcase} />
        <StatCard title="Certifications" value={8} badge="NEW" Icon={GraduationCap} />
        <StatCard title="Total Visitors" value="2.4k" badge="+2.4k" Icon={Users} />
        <StatCard title="Profile Views" value={850} badge="STABLE" Icon={Eye} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#070d19]/30 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">Recent Activity</h4>
            <button className="font-mono text-[11px] text-cyan-400 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-white/10 transition-colors">
                <div className="space-y-1">
                  <p className="text-xs font-mono text-gray-200">{act.action}</p>
                  <span className="inline-block font-mono text-[9px] text-gray-500">{act.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[9px] px-2 py-0.5 rounded ${
                      act.status === "PUBLISHED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {act.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold px-1">Quick Actions</h4>

          {/* Action 1: Upload New Project */}
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-[#070d19]/40 border border-white/5 hover:border-cyan-500/30 font-mono text-xs text-left text-gray-300 hover:text-white transition-all group">
            <div className="flex items-center gap-3">
              <Plus size={16} className="text-cyan-400" />
              Upload New Project
            </div>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Action 2: Upload New Certificate (BARU) */}
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-[#070d19]/40 border border-white/5 hover:border-blue-500/30 font-mono text-xs text-left text-gray-300 hover:text-white transition-all group">
            <div className="flex items-center gap-3">
              <GraduationCapIcon size={16} className="text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
              Upload New Certificate
            </div>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Action 3: Update About Me */}
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-[#070d19]/40 border border-white/5 hover:border-purple-500/30 font-mono text-xs text-left text-gray-300 hover:text-white transition-all group">
            <div className="flex items-center gap-3">
              <Plus size={16} className="text-purple-400" />
              Update About Me
            </div>
            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
