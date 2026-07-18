"use client";

import { useEffect, useState } from "react";
import { X, Loader2, Edit3, LayoutGrid } from "lucide-react";
import { ProjectEntity } from "@/types/database.types";
import { useProjectForm } from "@/hooks/useProjectForm";
import { MediaUploader } from "@/components/admin/MediaUploader";

interface UpdateProjectModalProps {
  project: ProjectEntity | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateProjectModal({ project, isOpen, onClose, onSuccess }: UpdateProjectModalProps) {
  const [show, setShow] = useState(false);

  const handleSuccess = () => {
      onSuccess();
      onClose();
  };

  const { states, setters, refs, handlers } = useProjectForm(project, handleSuccess);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setShow(false), 300);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#040814]/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Box */}
      <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0b121f] border-2 border-purple-500/40 rounded-[2rem] p-6 lg:p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-rose-500/20 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
          <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
            <Edit3 size={20} />
          </div>
          <div>
            <h2 className="font-mono text-base tracking-widest text-white uppercase font-bold">UPDATE PROJECT RECORD</h2>
            <p className="text-[11px] font-mono text-gray-400">Modify existing architecture parameters node</p>
          </div>
        </div>

        <form onSubmit={handlers.handlePublish} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6 w-full">
            {/* Input 1: Project Title */}
            <div className="space-y-2">
              <label className="font-mono text-[11px] uppercase tracking-widest text-gray-400 font-bold block">Project Title / Name</label>
              <input
                type="text"
                name="title"
                value={states.title}
                onChange={(e) => {
                  setters.setTitle(e.target.value);
                  if (states.errors.title) setters.setErrors((prev) => ({ ...prev, title: "" }));
                }}
                placeholder="E.G. JUNIOR WEB DEVELOPER"
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all uppercase ${
                  states.errors.title ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                }`}
              />
              {states.errors.title && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.title}</p>}
            </div>

            {/* Grid Row: Category Target & Lifecycle Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input 2: Category Target */}
              <div className="space-y-2">
                <label className="font-mono text-[11px] uppercase tracking-widest text-gray-400 font-bold block">Category Target</label>
                <select
                  name="category"
                  value={states.category}
                  onChange={(e) => setters.setCategory(e.target.value)}
                  className="w-full bg-[#050911] border border-white/5 rounded-xl px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="website" className="bg-[#0b121f]">
                    WEBSITE ARCHITECTURE
                  </option>
                  <option value="mobile" className="bg-[#0b121f]">
                    MOBILE APPLICATION
                  </option>
                </select>
              </div>

              {/* Input 3: Lifecycle Status */}
              <div className="space-y-2">
                <label className="font-mono text-[11px] uppercase tracking-widest text-gray-400 font-bold block">Lifecycle Status</label>
                <select
                  name="status"
                  value={states.status}
                  onChange={(e) => setters.setStatus(e.target.value)}
                  className="w-full bg-[#050911] border border-white/5 rounded-xl px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="COMPLETED" className="bg-[#0b121f]">
                    COMPLETED / STABLE
                  </option>
                  <option value="DEPLOYMENT" className="bg-[#0b121f]">
                    STAGE DEPLOYMENT
                  </option>
                  <option value="PRODUCTION" className="bg-[#0b121f]">
                    PRODUCTION LIVE
                  </option>
                </select>
              </div>
            </div>

            {/* Input 4: Brief Description */}
            <div className="space-y-2">
              <label className="font-mono text-[11px] uppercase tracking-widest text-gray-400 font-bold block">Brief Description</label>
              <input
                type="text"
                name="description"
                value={states.description}
                onChange={(e) => {
                  setters.setDescription(e.target.value);
                  if (states.errors.description) setters.setErrors((prev) => ({ ...prev, description: "" }));
                }}
                placeholder="Short pitch summarizing the project node"
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all ${
                  states.errors.description ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                }`}
              />
              {states.errors.description && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.description}</p>}
            </div>

            {/* Input 5: Full Overview Description */}
            <div className="space-y-2">
              <label className="font-mono text-[11px] uppercase tracking-widest text-gray-400 font-bold block">Full Overview Description</label>
              <textarea
                name="full_description"
                rows={4}
                value={states.fullDescription}
                onChange={(e) => {
                  setters.setFullDescription(e.target.value);
                  if (states.errors.fullDescription) setters.setErrors((prev) => ({ ...prev, fullDescription: "" }));
                }}
                placeholder="Developed and maintained full-stack system architecture details..."
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none ${
                  states.errors.fullDescription ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                }`}
              />
              {states.errors.fullDescription && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.fullDescription}</p>}
            </div>

            {/* Input 6: Infrastructure / Tech Stack */}
            <div className="space-y-2">
              <label className="font-mono text-[11px] uppercase tracking-widest text-gray-400 font-bold block">&gt;_ Core Tech Stack (Comma Separated)</label>
              <input
                type="text"
                name="tech_stack"
                value={states.techInput}
                onChange={(e) => {
                  setters.setTechInput(e.target.value);
                  if (states.errors.techInput) setters.setErrors((prev) => ({ ...prev, techInput: "" }));
                }}
                placeholder="Laravel, CodeIgniter 4, MySQL, Bootstrap"
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all ${
                  states.errors.techInput ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                }`}
              />
              {states.errors.techInput && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.techInput}</p>}
            </div>

            {/* Input 7: Live Deployment Link */}
            <div className="space-y-2">
              <label className="font-mono text-[11px] uppercase tracking-widest text-gray-400 font-bold block">Live Deployment Link</label>
              <input
                type="url"
                name="link"
                value={states.link}
                onChange={(e) => {
                  setters.setLink(e.target.value);
                  if (states.errors.link) setters.setErrors((prev) => ({ ...prev, link: "" }));
                }}
                placeholder="https://your-live-project.com"
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all ${
                  states.errors.link ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                }`}
              />
              {states.errors.link && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.link}</p>}
            </div>

            {/* Button Publish Gradasi Biru-Ungu Lebar Penuh */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 bg-[#0d1527] text-gray-400 font-mono text-xs uppercase tracking-widest py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-all duration-300"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={states.isSubmitting}
                className="w-2/3 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white font-mono text-xs uppercase tracking-widest py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-[#7c3aed] hover:to-[#c026d3] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 shadow-[0_4px_20px_rgba(217,70,239,0.15)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.3)]"
              >
                {states.isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-white" /> UPDATING TIMELINE NODE...
                  </>
                ) : (
                  <>
                    <Edit3 size={14} /> UPDATE TIMELINE NODE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Media/Gambar Portofolio */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-6">
            <MediaUploader
              imagePreview={states.imagePreview}
              error={states.errors.image}
              fileInputRef={refs.fileInputRef}
              onImageChange={handlers.handleImageChange}
              onRemoveImage={handlers.removeSelectedImage}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
