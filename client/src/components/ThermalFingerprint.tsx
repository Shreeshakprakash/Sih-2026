import { Activity, Flame, Radio, Satellite, TrendingUp, Waves } from "lucide-react";
import type { ThermalFingerprint as Fingerprint } from "@/services/thermaguardService";

const icons = [Flame, Waves, Activity, Radio, TrendingUp, Satellite];
const toneClass = { coral: "border-[#673d38] bg-[#30201f] text-[#f28b77]", amber: "border-[#6c552e] bg-[#332a1b] text-[#e0ad5b]", cyan: "border-[#2d6267] bg-[#173438] text-[#6dc7ca]", gold: "border-[#655c31] bg-[#32301d] text-[#d5c16b]", muted: "border-[#344b54] bg-[#1a2a31] text-[#94abb0]" };

export function ThermalFingerprint({ items }: { items: Fingerprint }) {
  return <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{items.map((item, index) => { const Icon = icons[index] ?? Activity; return <div key={item.label} className={`rounded-[3px] border p-3 ${toneClass[item.tone]}`}><div className="flex items-center justify-between gap-2"><Icon size={14} /><span className="font-mono text-[8px] uppercase tracking-[0.12em] opacity-70">{String(index + 1).padStart(2, "0")}</span></div><p className="mt-4 font-mono text-[8px] uppercase tracking-[0.12em] opacity-70">{item.label}</p><p className="mt-1 font-display text-[14px] font-semibold">{item.value}</p></div>; })}</div>;
}
