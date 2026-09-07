import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  direction?: "up" | "down" | "flat";
  note: string;
  accent?: "amber" | "coral" | "gold" | "cyan";
  icon?: ReactNode;
};

export function StatCard({ label, value, delta, direction = "flat", note, accent = "cyan", icon }: StatCardProps) {
  const accentClass = {
    amber: "text-[#e1aa4c]",
    coral: "text-[#eb765e]",
    gold: "text-[#c7b766]",
    cyan: "text-[#63bfca]",
  }[accent];

  return (
    <article className="group relative min-h-[138px] overflow-hidden rounded-[4px] border border-[#203746] bg-[#111d26]/90 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#376173] hover:bg-[#13232d]">
      <div className="flex items-start justify-between gap-3">
        <p className="max-w-[160px] font-mono text-[9px] uppercase leading-[1.45] tracking-[0.16em] text-[#7d929d]">{label}</p>
        {icon && <span className={cn("opacity-75", accentClass)}>{icon}</span>}
      </div>
      <div className="mt-5 flex items-end justify-between gap-2">
        <p className="font-display text-[30px] font-semibold leading-none tracking-[-0.04em] text-[#e7f1f1]">{value}</p>
        <span className={cn("flex items-center gap-0.5 font-mono text-[10px] font-semibold", accentClass)}>
          {direction === "up" ? <ArrowUpRight size={13} /> : direction === "down" ? <ArrowDownRight size={13} /> : <Minus size={13} />}
          {delta}
        </span>
      </div>
      <p className="mt-3 font-mono text-[9px] tracking-[0.08em] text-[#627883]">{note}</p>
      <span className={cn("absolute bottom-0 left-0 h-[2px] w-1/3 opacity-80", accent === "amber" && "bg-[#d99837]", accent === "coral" && "bg-[#e36a58]", accent === "gold" && "bg-[#b7a556]", accent === "cyan" && "bg-[#50aebb]")} />
    </article>
  );
}
