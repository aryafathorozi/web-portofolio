"use client";

import React from "react";
import { Image as ImageIcon, Trash2 } from "lucide-react";

interface MediaUploaderProps {
  imagePreview: string | null;
  error?: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export function MediaUploader({ imagePreview, error, fileInputRef, onImageChange, onRemoveImage }: MediaUploaderProps) {
  return (
    <div className="space-y-4 w-full relative">
      <div className="p-1 px-2 font-mono text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
        <ImageIcon size={12} /> Media Interface Target
      </div>

      <div
        className={`relative h-64 lg:h-[520px] w-full rounded-3xl bg-[#02060d] border border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-300 group shadow-inner ${
          error ? "border-rose-500/60 bg-rose-950/5" : "border-white/5 hover:border-cyan-500/30"
        }`}
      >
        <input type="file" ref={fileInputRef} onChange={onImageChange} accept="image/*" className="hidden" id="image-uploader" />

        {imagePreview ? (
          <div className="relative w-full h-full group/preview">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-2xl text-xs font-mono">
                Change Media
              </button>
              <button type="button" onClick={onRemoveImage} className="p-3 bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/30 text-rose-400 rounded-2xl">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ) : (
          <label htmlFor="image-uploader" className="cursor-pointer flex flex-col items-center justify-center p-8 text-center space-y-3 w-full h-full">
            <div className="p-4 bg-[#090d16] border border-white/5 rounded-2xl group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-all">
              <ImageIcon size={22} className="text-gray-500 group-hover:text-cyan-400" />
            </div>
            <div className="space-y-1">
              <p className="font-mono text-xs text-gray-300">Inject high-res viewport mockup</p>
              <p className="font-mono text-[10px] text-gray-600">Supports PNG, JPEG or WEBP up to 2MB</p>
            </div>
          </label>
        )}
      </div>

      {error && <p className="font-mono text-[10px] text-rose-400 text-center bg-rose-950/10 border border-rose-900/30 p-2.5 rounded-xl animate-shake">⚠️ {error}</p>}
    </div>
  );
}
