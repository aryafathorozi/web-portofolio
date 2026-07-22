"use client";

import { useEffect, useState } from "react";
import { Award, Plus, Trash2, Edit3, Calendar, Layers, Link2, ChevronDown, ChevronUp, Loader2, Image as ImageIcon, UploadCloud, X } from "lucide-react";
import { useCertificationForm } from "@/hooks/useCertificationForm";
import SkeletonLoader from "@/components/admin/SkeletonLoader";
import DeleteCertificationConfirmModal from "@/components/admin/DeleteCertificationConfirmModal";

// supabase
import { CertificationEntity } from "@/types/database.types";
import { getAllCertifications, deleteCertification } from "@/services/certificationService";
import { toast } from "@/services/toastService";

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<CertificationEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const [editingCertification, setEditingCertification] = useState<CertificationEntity | null>(null);

  const [certificationToDelete, setCertificationToDelete] = useState<CertificationEntity | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const data = await getAllCertifications();
      setCertifications(data);
    } catch (error) {
      console.error("Gagal sinkronisasi data sertifikasi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const { states, setters, refs, handlers } = useCertificationForm(editingCertification, async () => {
    await fetchCertifications();
    setEditingCertification(null);
  });
  
  const visibleCertifications = isExpanded ? certifications : certifications.slice(0, 2);

  const openDeleteModal = (cert: CertificationEntity) => {
    setCertificationToDelete(cert);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
        const res = await deleteCertification(id);
        if (res.success) {
            toast.success("CERTIFICATION DELETED", "Timeline node successfully purged from database.");
            setCertifications(certifications.filter((cert) => cert.id !== id));
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
            Certifications <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Timeline</span>
          </h2>
          <p className="font-mono text-xs text-gray-400 max-w-xl leading-relaxed">Configure your professional certifications and achievements record logs.</p>
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
              <Award className="text-blue-400" size={18} />
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold">{editingCertification ? "Modify Record" : "Initialize Record"}</h3>
                <p className="font-mono text-[9px] text-gray-500">Inject certification parameters node</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Input 1: Title */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Certification Title</label>
                <input
                  type="text"
                  value={states.title}
                  onChange={(e) => {
                    setters.setTitle(e.target.value);
                    if (states.errors.title) setters.setErrors((prev) => ({ ...prev, title: "" }));
                  }}
                  placeholder="e.g. AWS CERTIFIED SOLUTIONS ARCHITECT"
                  className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all uppercase ${
                    states.errors.title ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                  }`}
                />
                {states.errors.title && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.title}</p>}
              </div>

              {/* Input 2: Company/Organization */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase">Issuing Organization</label>
                <input
                  type="text"
                  value={states.company}
                  onChange={(e) => {
                    setters.setCompany(e.target.value);
                    if (states.errors.company) setters.setErrors((prev) => ({ ...prev, company: "" }));
                  }}
                  placeholder="e.g. AMAZON WEB SERVICES"
                  className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all uppercase ${
                    states.errors.company ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                  }`}
                />
                {states.errors.company && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.company}</p>}
              </div>

              {/* Input 3: Year */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase flex items-center gap-1">
                  <Calendar size={10} /> Year
                </label>
                <input
                  type="text"
                  value={states.year}
                  onChange={(e) => {
                    setters.setYear(e.target.value);
                    if (states.errors.year) setters.setErrors((prev) => ({ ...prev, year: "" }));
                  }}
                  placeholder="e.g. 2024"
                  className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all uppercase ${
                    states.errors.year ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                  }`}
                />
                {states.errors.year && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.year}</p>}
              </div>

              {/* Input 4: Credential Link */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase flex items-center gap-1">
                  <Link2 size={10} /> Credential Link
                </label>
                <input
                  type="text"
                  value={states.link}
                  onChange={(e) => {
                    setters.setLink(e.target.value);
                    if (states.errors.link) setters.setErrors((prev) => ({ ...prev, link: "" }));
                  }}
                  placeholder="https://..."
                  className={`w-full bg-[#050911] border rounded-xl px-4 py-3.5 font-mono text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all ${
                    states.errors.link ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/5"
                  }`}
                />
                {states.errors.link && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.link}</p>}
              </div>

              {/* Input 5: Image Upload */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] tracking-wider text-gray-400 uppercase flex items-center gap-1">
                  <ImageIcon size={10} /> Certificate Image
                </label>
                
                {states.imagePreview ? (
                  <div className="relative w-full h-40 sm:h-48 rounded-xl border border-white/10 overflow-hidden group">
                    <img src={states.imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#040814]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={handlers.removeSelectedImage}
                        className="bg-rose-500/80 hover:bg-rose-500 text-white p-2 rounded-full transition-colors shadow-lg shadow-rose-500/20"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className={`flex flex-col items-center justify-center w-full h-32 rounded-xl border border-dashed cursor-pointer transition-all ${
                    states.errors.image ? "border-rose-500/50 bg-rose-950/5 text-rose-200" : "border-white/10 bg-[#050911] hover:border-blue-500/50 hover:bg-blue-500/5"
                  }`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud size={24} className={states.errors.image ? "text-rose-400 mb-2" : "text-gray-500 mb-2"} />
                      <p className="font-mono text-[10px] text-gray-400"><span className="font-bold text-blue-400">Click to upload</span> or drag and drop</p>
                      <p className="font-mono text-[9px] text-gray-600 mt-1">PNG, JPG, WEBP (MAX. 2MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/jpeg,image/png,image/webp" 
                      onChange={handlers.handleImageChange}
                      ref={refs.fileInputRef}
                    />
                  </label>
                )}
                {states.errors.image && <p className="font-mono text-[10px] text-rose-400 pl-1">⚠️ {states.errors.image}</p>}
              </div>
            </div>

            {/* Form Footer Action Buttons */}
            <div className="pt-2 flex gap-2">
              {editingCertification && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCertification(null);
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
                    <Plus size={14} /> {editingCertification ? "SAVE MODIFICATION" : "PUBLISH TIMELINE NODE"}
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
            <span className="font-mono text-[10px] text-gray-500">{loading ? "Scanning core certifications..." : `Showing ${visibleCertifications.length} of ${certifications.length} Nodes`}</span>
          </div>

          {loading ? (
            <div className="w-full flex items-center justify-center min-h-[300px] border border-white/5 bg-[#070d19]/10 rounded-2xl">
              <SkeletonLoader variant="spinner" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3">
                {visibleCertifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="group flex flex-col md:flex-row md:items-start justify-between p-5 rounded-2xl bg-[#070d19]/30 border border-white/5 hover:border-blue-500/20 transition-all duration-300 gap-4 relative overflow-hidden"
                  >
                    {cert.year && (
                      <div className="absolute right-4 bottom-[-15px] font-sans font-black text-7xl text-white/[0.01] select-none pointer-events-none group-hover:text-white/[0.02] transition-colors duration-300">
                        {cert.year}
                      </div>
                    )}

                    <div className="space-y-2 max-w-xl relative z-10">
                      <span className="font-mono text-[9px] tracking-widest text-blue-400 font-bold uppercase">{cert.company}</span>
                      <h5 className="text-sm font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors uppercase">{cert.title}</h5>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-gray-500 hover:text-cyan-400 truncate max-w-sm block">
                        {cert.link}
                      </a>
                      {cert.image_src && (
                        <div className="mt-2 w-24 h-16 rounded-md overflow-hidden border border-white/10 group-hover:border-blue-500/30 transition-colors">
                          <img src={cert.image_src} alt={cert.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-start relative z-10">
                      <button
                        onClick={() => setEditingCertification(cert)}
                        className="p-2.5 rounded-xl border border-white/5 bg-[#070d19]/60 text-gray-400 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-200"
                        title="Update Data Workspace"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(cert)}
                        className="p-2.5 rounded-xl border border-white/5 bg-[#070d19]/60 text-gray-400 hover:text-rose-400 hover:border-rose-500/30 transition-all duration-200"
                        title="Purge From Database"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {certifications.length > 2 && (
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
                        VIEW ALL CERTIFICATIONS ({certifications.length - 2} MORE) <ChevronDown size={14} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <DeleteCertificationConfirmModal
        certification={certificationToDelete}
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={() => {
            setIsDeleteModalOpen(false);
            setCertificationToDelete(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
