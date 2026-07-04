"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderPlus, ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("SOFTWARE");
  const [techInput, setTechInput] = useState("");
  const [link, setLink] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Project saved successfully!");
    router.push("/admin/projects");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <button onClick={() => router.push("/admin/projects")} className="flex items-center gap-2 font-mono text-[11px] text-gray-400 hover:text-cyan-400 transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        BACK TO WORKSACE
      </button>

      <div
        className="p-8 rounded-3xl bg-[#081328]/70 border border-transparent shadow-2xl"
        style={{
          backgroundImage: "linear-gradient(#081328, #040814), linear-gradient(to bottom, #22d3ee, #a855f7)",
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "border-box",
        }}
      >
        <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
          <FolderPlus className="text-cyan-400" size={20} />
          <div>
            <h3 className="font-mono text-sm uppercase tracking-widest text-white font-bold">Create Repository</h3>
            <p className="font-mono text-[10px] text-gray-500 mt-0.5">Register a new development artifact to the portal</p>
          </div>
        </div>

        <form onSubmit={handlePublish} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sharia Cooperative Accounting System"
              className="w-full bg-[#030712]/60 border border-white/5 focus:border-cyan-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#030712]/60 border border-white/5 focus:border-cyan-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white focus:outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="SOFTWARE">SOFTWARE</option>
              <option value="WEB APP">WEB APP</option>
              <option value="MOBILE">MOBILE</option>
              <option value="UI/UX DESIGN">UI/UX DESIGN</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Laravel 11, Livewire, PostgreSQL"
              className="w-full bg-[#030712]/60 border border-white/5 focus:border-cyan-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Project URL (Optional)</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://github.com/yourusername/project"
              className="w-full bg-[#030712]/60 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-3.5 text-xs font-mono font-bold tracking-widest text-white hover:opacity-90 transition-all shadow-xl shadow-purple-500/20 mt-4"
          >
            CONFIRM & PUBLISH DATA
          </button>
        </form>
      </div>
    </div>
  );
}
