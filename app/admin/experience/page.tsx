"use client";

import { useEffect, useState } from "react";
import { Briefcase, Plus, Trash2, Edit3, Calendar, Layers, Terminal, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useExperienceForm } from "@/hooks/useExperienceForm";
import SkeletonLoader from "@/components/admin/SkeletonLoader";
import DeleteExperienceConfirmModal from "@/components/admin/DeleteExperienceConfirmModal";

// supabase
import { ExperienceEntity } from "@/types/database.types";
import { getAllExperiences, deleteExperience } from "@/services/experienceService";
import { toast } from "@/services/toastService";

const getTechArray = (rawTech: any): string[] => {
  if (!rawTech) return [];
  if (Array.isArray(rawTech)) return rawTech;
  if (typeof rawTech === "string") {
    try {
      return JSON.parse(rawTech);
    } catch (e) {
      return [rawTech];
    }
  }
  return [];
};

interface ExperienceItem {
  id: string;
  role: string;
  period: string;
  yearBackground?: string;
  description: string;
  tags: string[];
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const [editingExperience, setEditingExperience] = useState<ExperienceEntity | null>(null);

  const [experienceToDelete, setExperienceToDelete] = useState<ExperienceEntity | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await getAllExperiences();
      setExperiences(data);
    } catch (error) {
      console.error("Gagal sinkronisasi data proyek:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const { states, setters, refs, handlers } = useExperienceForm(editingExperience, async () => {
    await fetchExperiences();
    setEditingExperience(null);
  });
  
  const visibleExperiences = isExpanded ? experiences : experiences.slice(0, 2);

  const openDeleteModal = (exp: ExperienceEntity) => {
    setExperienceToDelete(exp);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
        const res = await deleteExperience(id);
        if (res.success) {
            toast.success("EXPERIENCE DELETED", "Timeline node successfully purged from database.");
            setExperiences(experiences.filter((exp) => exp.id !== id));
            setIsDeleteModalOpen(false);
        } else {
            toast.error("DELETE FAILED", res.error || "Unknown error occurred.");
        }
    } catch (error: any) {
        toast.error("RUNTIME ERROR", error.message);
    } finally {
        setIsDeleting(false);
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
            onSubmit={handlers.handlePublish}
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
                <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold">{editingExperience ? "Modify Record" : "Initialize Record"}</h3>
                <p className="font-mono text-[9px] text-gray-500">Inject career parameters node</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Input 1: Role / Position */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Role / Position</label>
                <input
                  type="text"
                  value={states.role}
                  onChange={(e) => {
                    setters.setRole(e.target.value);
                    if (states.errors.role) setters.setErrors((prev) => ({ ...prev, role: "" }));
                  }}
                  placeholder="e.g. JUNIOR WEB DEVELOPER"
                  className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all uppercase ${
                    states.errors.role ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                  }`}
                />
                {states.errors.role && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.role}</p>}
              </div>

              {/* Input 2: Period Matrix */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase flex items-center gap-1">
                  <Calendar size={10} /> Period Matrix
                </label>
                <input
                  type="text"
                  value={states.periode}
                  onChange={(e) => {
                    setters.setPeriode(e.target.value); // 🛠️ Perbaikan: Sebelumnya setRole
                    if (states.errors.periode) setters.setErrors((prev) => ({ ...prev, periode: "" }));
                  }}
                  placeholder="e.g. 03.2 2023 – 2024"
                  className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all uppercase ${
                    states.errors.periode ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                  }`}
                />
                {states.errors.periode && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.periode}</p>}
              </div>

              {/* Input 3: Year Background (Tambahan Penting Wajib Diisi) */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Year Background</label>
                <input
                  type="text"
                  value={states.yearBackground}
                  onChange={(e) => {
                    setters.setYearBackground(e.target.value);
                    if (states.errors.yearBackground) setters.setErrors((prev) => ({ ...prev, yearBackground: "" }));
                  }}
                  placeholder="e.g. 2024"
                  className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all uppercase ${
                    states.errors.yearBackground ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                  }`}
                />
                {states.errors.yearBackground && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.yearBackground}</p>}
              </div>

              {/* Input 4: Task Description Overview */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Task Description Overview</label>
                <textarea
                  rows={4}
                  value={states.description}
                  onChange={(e) => {
                    setters.setDescription(e.target.value); // 🛠️ Perbaikan: Sebelumnya setRole
                    if (states.errors.description) setters.setErrors((prev) => ({ ...prev, description: "" }));
                  }}
                  placeholder="Developed and maintained full-stack digital attendance systems..."
                  className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none ${
                    states.errors.description ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                  }`}
                />
                {states.errors.description && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.description}</p>}
              </div>

              {/* Input 5: Core Tech Stack */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase flex items-center gap-1">
                  <Terminal size={10} /> Core Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={states.techInput}
                  onChange={(e) => {
                    setters.setTechInput(e.target.value);
                    if (states.errors.techInput) setters.setErrors((prev) => ({ ...prev, techInput: "" }));
                  }}
                  placeholder="Laravel, CodeIgniter 4, MySQL, Bootstrap"
                  className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all ${
                    states.errors.techInput ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                  }`}
                />
                {states.errors.techInput && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.techInput}</p>}
              </div>
            </div>

            {/* Form Footer Action Buttons */}
            <div className="pt-2 flex gap-2">
              {editingExperience && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingExperience(null);
                  }}
                  className="px-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-mono text-xs hover:text-white transition-all"
                >
                  CANCEL
                </button>
              )}
              <button
                type="submit"
                disabled={states.isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-3.5 text-xs font-mono font-bold tracking-widest text-white hover:opacity-90 transition-all shadow-lg shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {states.isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-white" /> COMPILING TIMELINE NODE...
                  </>
                ) : (
                  <>
                    <Plus size={14} /> {editingExperience ? "SAVE MODIFICATION" : "PUBLISH TIMELINE NODE"}
                  </>
                )}
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
            <span className="font-mono text-[10px] text-gray-500">{loading ? "Scanning core experiences..." : `Showing ${visibleExperiences.length} of ${experiences.length} Nodes`}</span>
          </div>

          {loading ? (
            <div className="w-full flex items-center justify-center min-h-[300px] border border-white/5 bg-[#070d19]/10 rounded-2xl">
              <SkeletonLoader variant="spinner" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3">
                {visibleExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="group flex flex-col md:flex-row md:items-start justify-between p-5 rounded-2xl bg-[#070d19]/30 border border-white/5 hover:border-blue-500/20 transition-all duration-300 gap-4 relative overflow-hidden"
                  >
                    {exp.year_background && (
                      <div className="absolute right-4 bottom-[-15px] font-sans font-black text-7xl text-white/[0.01] select-none pointer-events-none group-hover:text-white/[0.02] transition-colors duration-300">
                        {exp.year_background}
                      </div>
                    )}

                    <div className="space-y-2 max-w-xl relative z-10">
                      <span className="font-mono text-[9px] tracking-widest text-blue-400 font-bold">{exp.periode}</span>
                      <h5 className="text-sm font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors uppercase">{exp.role}</h5>
                      <p className="font-sans text-xs text-gray-400 leading-relaxed text-justify">{exp.description}</p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {getTechArray(exp.tech_stack).map((tech, tIdx) => (
                          <span key={tIdx} className="font-mono text-[9px] text-cyan-400 bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-start relative z-10">
                      <button
                        onClick={() => setEditingExperience(exp)}
                        className="p-2.5 rounded-xl border border-white/5 bg-[#070d19]/60 text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200"
                        title="Update Data Workspace"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(exp)}
                        className="p-2.5 rounded-xl border border-white/5 bg-[#070d19]/60 text-gray-400 hover:text-rose-400 hover:border-rose-500/30 transition-all duration-200"
                        title="Purge From Database"
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
            </>
          )}
        </div>
      </div>

      <DeleteExperienceConfirmModal
        experience={experienceToDelete}
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={() => {
            setIsDeleteModalOpen(false);
            setExperienceToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
