"use client";

export interface SkeletonLoaderProps {
  variant?: "card" | "table" | "text" | "spinner";
  count?: number;
}

export default function SkeletonLoader({ variant = "card", count = 1 }: SkeletonLoaderProps) {
  if (variant === "spinner") {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12 animate-fade-in">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin" />

          <div className="absolute inset-1.5 rounded-full border-2 border-purple-500/10 border-b-purple-400 animate-[spin_1s_linear_infinite_reverse]" />

          <div className="absolute inset-[18px] rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.5)] animate-pulse" />
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 animate-pulse">Synchronizing Artifacts...</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="w-full max-w-[340px] md:max-w-[380px] h-[450px] rounded-2xl p-6 bg-[#081122]/40 ring-1 ring-white/5 backdrop-blur-md flex flex-col justify-between animate-pulse">
        <div className="space-y-5">
          <div className="relative w-full h-40 rounded-xl bg-white/[0.02] border border-white/5" />
          <div className="h-5 w-2/3 rounded-lg bg-white/[0.04]" />
        </div>
        <div className="h-9 w-full rounded-xl bg-white/[0.03]" />
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-10 w-full rounded-xl bg-white/[0.02]" />
      ))}
    </div>
  );
}
