"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit3, Layers, Eye, ChevronDown, ChevronUp, Code } from "lucide-react";
import ProjectDetailModal from "@/components/admin/ProjectDetailModal";
import SkeletonLoader from "@/components/admin/SkeletonLoader";

// supabase
import { ProjectEntity } from "@/types/database.types";
import { getAllProjects } from "@/services/projectService";

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

export default function AdminProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectEntity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getAllProjects();

        setProjects(data);
      } catch (error) {
        console.error("Gagal sinkronisasi data proyek:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const visibleProjects = isExpanded ? projects : projects.slice(0, 3);

  const openDetailModal = (project: ProjectEntity) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this repository project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div
        className="p-8 rounded-3xl bg-[#081328]/70 border border-transparent relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] group/hero"
        style={{
          backgroundImage: "linear-gradient(#081328, #040814), linear-gradient(to right, #22d3ee, #3b82f6, #a855f7)",
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "border-box",
        }}
      >
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-cyan-500/[0.08] blur-[60px] pointer-events-none mix-blend-screen transition-all duration-500 group-hover/hero:scale-110" />
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-purple-500/10 blur-[40px] pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Project <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Workspace</span>
            </h2>
            <p className="font-mono text-xs text-gray-400 max-w-xl leading-relaxed">Manage, expand, and structure your collection of system artifacts and deployment pipelines.</p>
          </div>

          <button
            onClick={() => router.push("/admin/projects/new")}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-5 py-3 text-xs font-mono font-bold tracking-widest text-white shadow-lg shadow-cyan-500/10 hover:opacity-90 transition-all self-start sm:self-center group/btn"
          >
            <Plus size={14} className="group-hover/btn:rotate-90 transition-transform duration-300" />
            ADD NEW PROJECT
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Layers className="text-purple-400" size={18} />
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">Project Repositories</h4>
          </div>
          <span className="font-mono text-[10px] text-gray-500">
            {loading ? "Scanning core sync..." : `Showing ${visibleProjects.length} of ${projects.length} artifacts`}
          </span>
        </div>

        {loading ? (
          <div className="w-full flex items-center justify-center min-h-[300px] border border-white/5 bg-[#070d19]/10 rounded-2xl">
            <SkeletonLoader variant="spinner" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3">
              {visibleProjects.map((project) => (
                <div
                  key={project.id}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-[#070d19]/30 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 tracking-wider font-bold uppercase">{project.category}</span>
                      {project.status && (
                        <span className="font-mono text-[9px] text-gray-500 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-gray-500" />
                          {project.status}
                        </span>
                      )}
                    </div>
                    <h5 className="text-sm font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors">{project.title}</h5>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {getTechArray(project.tech_stack).map((tag, tIdx) => (
                        <span key={tIdx} className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-mono tracking-wider text-gray-400 ring-1 ring-white/10 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center self-end">
                    <button
                      onClick={() => openDetailModal(project)}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/5 bg-[#070d19]/50 font-mono text-[10px] tracking-wider text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                      title="View Deep Interface Detail"
                    >
                      <Eye size={13} />
                    </button>

                    <button
                      onClick={() => router.push(`/admin/projects/edit/${project.id}`)}
                      className="p-2.5 rounded-xl border border-white/5 bg-[#070d19]/50 text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-all duration-200"
                      title="Update Data Workspace"
                    >
                      <Edit3 size={13} />
                    </button>

                    <button
                      onClick={() => handleDelete(project.id!)}
                      className="p-2.5 rounded-xl border border-white/5 bg-[#070d19]/50 text-gray-400 hover:text-rose-400 hover:border-rose-500/30 transition-all duration-200"
                      title="Purge From Database"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <div className="text-center p-12 rounded-2xl bg-[#070d19]/10 border border-white/5 border-dashed">
                  <Code className="mx-auto text-gray-600 mb-2" size={24} />
                  <p className="font-mono text-xs text-gray-500">No core workspace repository detected.</p>
                </div>
              )}
            </div>

            {projects.length > 3 && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/5 bg-[#070d19]/40 hover:bg-[#070d19]/80 text-gray-400 hover:text-cyan-400 font-mono text-xs tracking-wider transition-all duration-300"
                >
                  {isExpanded ? (
                    <>
                      SHOW LESS <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      VIEW ALL PROJECTS ({projects.length - 3} MORE) <ChevronDown size={14} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
}
