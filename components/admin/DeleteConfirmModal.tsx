"use client";

import { useEffect, useState } from "react";
import { X, AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { ProjectEntity } from "@/types/database.types";

interface DeleteConfirmModalProps {
  project: ProjectEntity | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

export default function DeleteConfirmModal({ project, isOpen, isDeleting, onClose, onConfirm }: DeleteConfirmModalProps) {
  const [show, setShow] = useState(false);

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
      <div className={`relative w-full max-w-md bg-[#0b121f] border-2 border-rose-500/40 rounded-[2rem] p-6 shadow-[0_0_40px_rgba(244,63,94,0.15)] transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-rose-500/20 transition-colors z-10 disabled:opacity-50 disabled:pointer-events-none"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center pt-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
            <AlertTriangle size={32} />
          </div>
          
          <h2 className="font-mono text-lg tracking-widest text-white uppercase font-bold mb-2">Confirm Purge Data</h2>
          <p className="text-xs font-mono text-gray-400 mb-6 px-4">
            Are you absolutely sure you want to delete <br/>
            <span className="text-rose-400 font-bold uppercase block mt-2">"{project?.title}"</span> 
            <br/> This action cannot be undone and will permanently remove the timeline node.
          </p>

          <div className="flex gap-4 w-full">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 bg-[#0d1527] text-gray-400 font-mono text-xs uppercase tracking-widest py-3 rounded-xl font-bold hover:bg-white/5 hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => project?.id && onConfirm(project.id)}
              disabled={isDeleting}
              className="flex-1 bg-gradient-to-r from-rose-600 to-rose-800 text-white font-mono text-xs uppercase tracking-widest py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-rose-500 hover:to-rose-700 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 shadow-[0_4px_20px_rgba(225,29,72,0.15)] hover:shadow-[0_4px_25px_rgba(225,29,72,0.3)]"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={14} className="animate-spin text-white" /> PURGING...
                </>
              ) : (
                <>
                  <Trash2 size={14} /> PURGE DATA
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
