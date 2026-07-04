"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FolderPlus, ArrowLeft, Image as ImageIcon, Plus, X, Terminal, Cpu } from "lucide-react";
import Image from "next/image";

export default function NewProjectPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("SHELL");
  const [status, setStatus] = useState("COMPLETED");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [techInput, setTechInput] = useState("");
  const [link, setLink] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const statusColor = status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" : "bg-cyan-500/10 text-cyan-400 ring-cyan-500/20";

    const payload = {
      title: title.toUpperCase(),
      category: category.toUpperCase(),
      status,
      statusColor,
      description,
      fullDescription,
      techStack: techInput
        .split(",")
        .map((t) => t.trim().toUpperCase())
        .filter(Boolean),
      link: link || "#",
      imageSrc: imagePreview,
    };

    console.log("Saving payload:", payload);
    alert("Project workspace created successfully!");
    router.push("/admin/projects");
  };

  return (
    <div className="w-full space-y-6 animate-fade-in pb-12">
      <button onClick={() => router.push("/admin/projects")} className="flex items-center gap-2 font-mono text-[11px] text-gray-400 hover:text-cyan-400 transition-colors group px-1">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        BACK TO WORKSPACE
      </button>

      <form onSubmit={handlePublish} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 w-full">
          <div
            className="p-8 md:p-10 rounded-3xl bg-[#081328]/70 border border-transparent shadow-2xl space-y-6 w-full"
            style={{
              backgroundImage: "linear-gradient(#081328, #040814), linear-gradient(to bottom, #22d3ee, #a855f7)",
              backgroundClip: "padding-box, border-box",
              backgroundOrigin: "border-box",
            }}
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <FolderPlus className="text-cyan-400" size={20} />
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-white font-bold">Deploy Artifact Data</h3>
                <p className="font-mono text-[10px] text-gray-500 mt-0.5">Configure core engine specification structure</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Project Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. REKAP ABSENSI DIGITAL & HRIS"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-cyan-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase flex items-center gap-1">
                    <Terminal size={10} /> Shell // Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-cyan-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white focus:outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="SHELL">SHELL</option>
                    <option value="SOFTWARE">SOFTWARE</option>
                    <option value="WEB APP">WEB APP</option>
                    <option value="FINTECH">FINTECH</option>
                    <option value="CORE ENGINE">CORE ENGINE</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Deploy Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[#030712]/60 border border-white/5 focus:border-cyan-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white focus:outline-none transition-all cursor-pointer appearance-none"
                  >
                    <option value="COMPLETED">COMPLETED (Green Glow)</option>
                    <option value="STABLE">STABLE (Cyan Glow)</option>
                    <option value="PRODUCTION">PRODUCTION</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Brief Description (Workspace List View)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Sistem otomasi manajemen pangkalan data perusahaan..."
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-cyan-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Full Overview Description (Pop-Up Detail View)</label>
                <textarea
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="An advanced, comprehensive Human Resource Information System engineered to handle complex enterprise operational workflows..."
                  rows={5}
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-cyan-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase flex items-center gap-1">
                  <Cpu size={10} /> Engine // Infrastructure Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="LARAVEL, POSTGRESQL, TAILWIND CSS, DOCKER"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-cyan-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all uppercase"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Platform Live Target URL (Optional)</label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://github.com/yourusername/project"
                  className="w-full bg-[#030712]/60 border border-white/5 focus:border-purple-500/40 rounded-xl px-4 py-3 font-mono text-xs text-white placeholder-gray-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-4 text-xs font-mono font-bold tracking-widest text-white hover:opacity-90 transition-all shadow-xl shadow-purple-500/10"
              >
                INITIALIZE & PUBLISH DATA WORKSPACE
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4 w-full">
          <div className="p-1 px-2 font-mono text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
            <ImageIcon size={12} /> Media Interface Target
          </div>

          <div className="relative h-64 lg:h-[520px] w-full rounded-3xl bg-[#02060d] border border-white/5 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-300 group hover:border-cyan-500/30 shadow-inner">
            {imagePreview ? (
              <>
                <Image src={imagePreview} alt="Live preview mockup" fill className="object-cover opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050c18] via-transparent to-transparent opacity-90" />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute bottom-4 right-4 z-20 p-2 rounded-xl bg-black/60 border border-white/10 text-rose-400 hover:text-rose-300 backdrop-blur-md text-xs font-mono flex items-center gap-1 transition-all"
                >
                  <X size={12} /> PURGE IMAGE
                </button>
              </>
            ) : (
              <div className="p-8 text-center space-y-3 relative z-10 w-full">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mx-auto text-gray-500 group-hover:text-cyan-400 transition-colors">
                  <Plus size={20} />
                </div>
                <div>
                  <p className="font-mono text-xs text-gray-300">Upload Interface Image</p>
                  <p className="font-mono text-[10px] text-gray-500 mt-1">Recommended aspect ratio 4:3 or Portrait</p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-[#081328] border border-white/5 text-gray-400 hover:text-white font-mono text-[10px] tracking-wider transition-all"
                >
                  BROWSE FILE
                </button>
              </div>
            )}

            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
          </div>
        </div>
      </form>
    </div>
  );
}
