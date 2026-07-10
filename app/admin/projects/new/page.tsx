"use client";

import Link from "next/link";
import { ArrowLeft, Loader2, Plus, LayoutGrid, FileText, Link2, Info, Settings } from "lucide-react";
import { useProjectForm } from "@/hooks/useProjectForm";
import { MediaUploader } from "@/components/admin/MediaUploader";

export default function NewProjectPage() {
  const { states, setters, refs, handlers } = useProjectForm();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-4 pb-2">
        <Link href="/admin/projects" className="p-2.5 bg-[#0d1527] rounded-xl border border-white/5 hover:bg-white/5 transition duration-200">
          <ArrowLeft size={16} className="text-gray-400 hover:text-white" />
        </Link>
        <div>
          <h1 className="font-mono text-sm tracking-widest text-cyan-400 uppercase font-bold">System Integration</h1>
          <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider">Deploy new archive node to the public matrix</p>
        </div>
      </div>

      <div className="bg-[#0b121f] border-2 border-blue-500/40 rounded-[2rem] p-6 lg:p-10 shadow-[0_0_40px_rgba(37,99,235,0.05)]">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
            <LayoutGrid size={20} />
          </div>
          <div>
            <h2 className="font-mono text-base tracking-widest text-white uppercase font-bold">INITIALIZE PROJECT RECORD</h2>
            <p className="text-[11px] font-mono text-gray-400">Inject project architecture parameters node</p>
          </div>
        </div>

        <form id="project-main-form" onSubmit={handlers.handlePublish} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all uppercase ${
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
                  className="w-full bg-[#050911] border border-white/5 rounded-xl px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
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
                  className="w-full bg-[#050911] border border-white/5 rounded-xl px-4 py-3.5 font-mono text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
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
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all ${
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
                rows={5}
                value={states.fullDescription}
                onChange={(e) => {
                  setters.setFullDescription(e.target.value);
                  if (states.errors.fullDescription) setters.setErrors((prev) => ({ ...prev, fullDescription: "" }));
                }}
                placeholder="Developed and maintained full-stack system architecture details..."
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none ${
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
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all ${
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
                className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all ${
                  states.errors.link ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                }`}
              />
              {states.errors.link && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.link}</p>}
            </div>

            {/* Button Publish Gradasi Biru-Ungu Lebar Penuh */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={states.isSubmitting}
                className="w-full bg-gradient-to-r from-[#2164f3] to-[#9626fa] text-white font-mono text-xs uppercase tracking-widest py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:from-[#1b52ce] hover:to-[#7c1ed4] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 shadow-[0_4px_20px_rgba(150,38,250,0.15)] hover:shadow-[0_4px_25px_rgba(33,100,243,0.3)]"
              >
                {states.isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-white" /> COMPILING TIMELINE NODE...
                  </>
                ) : (
                  <>
                    <Plus size={14} /> PUBLISH TIMELINE NODE
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
