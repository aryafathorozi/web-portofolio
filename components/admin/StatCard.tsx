import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  badge?: string;
  Icon: LucideIcon;
}

export default function StatCard({ title, value, badge, Icon }: StatCardProps) {
  return (
    <div className="bg-[#070d19]/40 border border-white/5 p-6 rounded-2xl hover:border-cyan-500/20 shadow-xl transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 group-hover:text-cyan-400 transition-colors">
          <Icon size={18} />
        </div>
        {badge && <span className="font-mono text-[10px] tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20">{badge}</span>}
      </div>
      <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black font-sans mt-1 text-white">{value}</h3>
    </div>
  );
}
