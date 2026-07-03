import { Search, Bell, Grid } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 border-b border-white/5 bg-[#030712]/40 backdrop-blur-md px-6 md:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="relative w-full max-w-md group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={16} />
        <input
          type="text"
          placeholder="Quick search..."
          className="w-full bg-[#070d19]/50 border border-white/5 focus:border-cyan-500/30 rounded-xl pl-11 pr-4 py-2.5 font-mono text-xs text-white placeholder-gray-500 focus:outline-none transition-all duration-300"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 rounded-xl border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-all bg-[#070d19]/30">
          <Bell size={16} />
        </button>
        <button className="p-2.5 rounded-xl border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-all bg-[#070d19]/30">
          <Grid size={16} />
        </button>
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
          <div className="w-full h-full rounded-[11px] bg-[#030712] flex items-center justify-center font-mono text-xs font-bold text-white">A</div>
        </div>
      </div>
    </header>
  );
}
