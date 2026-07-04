"use client";

import { useState } from "react";
import { Briefcase, Plus, Trash2, Edit3, Calendar, Layers, Terminal, ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  period: string;
  yearBackground?: string;
  description: string;
  tags: string[];
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: "1",
      role: "JUNIOR WEB DEVELOPER",
      period: "03.2 2023 – 2024",
      yearBackground: "2023",
      description: "Developed and maintained full-stack digital attendance systems, HRIS apps, and automated PDF builders using modern frameworks like Laravel and CodeIgniter.",
      tags: ["CodeIgniter 4", "MySQL", "Bootstrap", "JavaScript"],
    },
    {
      id: "2",
      role: "FULL-STACK DEVELOPER (FREELANCE)",
      period: "05.1 2024 – 2025",
      yearBackground: "2024",
      description: "Engineered multi-server relational database architectures with complex data stitching and integrated secure payment gateways like Midtrans and Duitku APIs.",
      tags: ["Laravel 11", "PostgreSQL", "Next.js", "Midtrans API"],
    },
    {
      id: "3",
      role: "SHARIA ACCOUNTING SYSTEM BUILDER",
      period: "03.1 2026 – PRESENT",
      yearBackground: "2026",
      description: "Architected financial statement modules and ledger journals for Sharia-compliant cooperative automated ecosystems.",
      tags: ["Laravel 12", "Livewire", "Alpine.js", "MySQL"],
    },
    {
      id: "4",
      role: "CORE ENGINE INTEGRATOR",
      period: "12.2 2025 – 2026",
      yearBackground: "2025",
      description: "Implemented optical character recognition pipelines utilizing Google Cloud Vision API for processing KTP identity document extraction layouts.",
      tags: ["Laravel 10", "Cloud Vision API", "Tailwind CSS"],
    },
    {
      id: "5",
      role: "UI/UX & COPYWRITING COMPOSER",
      period: "01.3 2025 – 2025",
      yearBackground: "2025",
      description: "Crafted interfaces and optimized copy structures for high-performance tour & travel destination hub web architectures.",
      tags: ["React", "Next.js", "Framer Motion", "Tailwind"],
    },
  ]);

  const [role, setRole] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const visibleExperiences = isExpanded ? experiences : experiences.slice(0, 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const yearMatch = period.match(/\d{4}/);
    const inferredYear = yearMatch ? yearMatch[0] : "";

    if (editingId) {
      setExperiences(experiences.map((exp) => (exp.id === editingId ? { ...exp, role: role.toUpperCase(), period, description, tags: formattedTags, yearBackground: inferredYear } : exp)));
      setEditingId(null);
      alert("Record updated.");
    } else {
      const newExp: ExperienceItem = {
        id: Date.now().toString(),
        role: role.toUpperCase(),
        period,
        yearBackground: inferredYear,
        description,
        tags: formattedTags,
      };
      setExperiences([newExp, ...experiences]);
      alert("Node created.");
    }

    setRole("");
    setPeriod("");
    setDescription("");
    setTagsInput("");
  };

  const startEdit = (item: ExperienceItem) => {
    setEditingId(item.id);
    setRole(item.role);
    setPeriod(item.period);
    setDescription(item.description);
    setTagsInput(item.tags.join(", "));
  };

  const handleDelete = (id: string) => {
    if (confirm("Purge this record?")) {
      setExperiences(experiences.filter((exp) => exp.id !== id));
    }
  };

  return (
    <div className="w-full space-y-8 animate-fade-in pb-12">
      <div
        className="p-8 rounded-3xl bg-[#081328]/70 border border-transparent relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.05)]"
        style={{
          backgroundImage: "linear-gradient(#081328, #040814), linear-gradient(to right, #3b82f6, #8b5cf6)",
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "border-box",
        }}
      >
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-500/[0.06] blur-[60px] pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Experience <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Timeline</span>
          </h2>
          <p className="font-mono text-xs text-gray-400 max-w-xl leading-relaxed">Configure your professional career milestones and engineering record logs.</p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 w-full">
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-3xl bg-[#081328]/70 border border-transparent shadow-2xl space-y-5"
            style={{
              backgroundImage: "linear-gradient(#081328, #040814), linear-gradient(to bottom, #3b82f6, #8b5cf6)",
              backgroundClip: "padding-box, border-box",
              backgroundOrigin: "border-box",
            }}
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Briefcase className="text-blue-400" size={18} />
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold">{editingId ? "Modify Record" : "Initialize Record"}</h3>
                <p className="font-mono text-[9px] text-gray-500">Inject career parameters node</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Role / Position</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. JUNIOR WEB DEVELOPER"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-blue-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all uppercase"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase flex items-center gap-1">
                  <Calendar size={10} /> Period Matrix
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="e.g. 03.2 2023 – 2024"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-blue-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Task Description Overview</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Developed and maintained full-stack digital attendance systems..."
                  rows={4}
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-blue-500/40 rounded-xl px-4 py-3 font-sans text-xs text-white placeholder-gray-600 focus:outline-none transition-all resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase flex items-center gap-1">
                  <Terminal size={10} /> Core Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Laravel, CodeIgniter 4, MySQL, Bootstrap"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-blue-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setRole("");
                    setPeriod("");
                    setDescription("");
                    setTagsInput("");
                  }}
                  className="px-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-mono text-xs hover:text-white transition-all"
                >
                  CANCEL
                </button>
              )}
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-3.5 text-xs font-mono font-bold tracking-widest text-white hover:opacity-90 transition-all shadow-lg shadow-blue-500/10"
              >
                <Plus size={14} />
                {editingId ? "SAVE MODIFICATION" : "PUBLISH TIMELINE NODE"}
              </button>
            </div>
          </form>
        </div>

        <div className="lg:col-span-7 w-full space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Layers className="text-blue-400" size={16} />
              <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">Active Timeline Records</h4>
            </div>
            <span className="font-mono text-[10px] text-gray-500">
              Showing {visibleExperiences.length} of {experiences.length} Nodes
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {visibleExperiences.map((exp) => (
              <div
                key={exp.id}
                className="group flex flex-col md:flex-row md:items-start justify-between p-5 rounded-2xl bg-[#070d19]/30 border border-white/5 hover:border-blue-500/20 transition-all duration-300 gap-4 relative overflow-hidden"
              >
                {exp.yearBackground && (
                  <div className="absolute right-4 bottom-[-15px] font-sans font-black text-7xl text-white/[0.01] select-none pointer-events-none group-hover:text-white/[0.02] transition-colors duration-300">
                    {exp.yearBackground}
                  </div>
                )}

                <div className="space-y-2 max-w-xl relative z-10">
                  <span className="font-mono text-[9px] tracking-widest text-blue-400 font-bold">{exp.period}</span>
                  <h5 className="text-sm font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors uppercase">{exp.role}</h5>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed text-justify">{exp.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="font-mono text-[9px] text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-start relative z-10">
                  <button
                    onClick={() => startEdit(exp)}
                    className="p-2.5 rounded-xl border border-white/5 bg-[#070d19]/60 text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200"
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2.5 rounded-xl border border-white/5 bg-[#070d19]/60 text-gray-400 hover:text-rose-400 hover:border-rose-500/30 transition-all duration-200"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {experiences.length > 2 && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/5 bg-[#070d19]/40 hover:bg-[#070d19]/80 text-gray-400 hover:text-blue-400 font-mono text-xs tracking-wider transition-all duration-300"
              >
                {isExpanded ? (
                  <>
                    SHOW LESS <ChevronUp size={14} />
                  </>
                ) : (
                  <>
                    VIEW ALL EXPERIENCE ({experiences.length - 2} MORE) <ChevronDown size={14} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
