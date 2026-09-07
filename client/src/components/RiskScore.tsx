import { ShieldAlert } from "lucide-react";
import type { RiskAssessment } from "@/services/thermaguardService";

const levelClass: Record<RiskAssessment["level"], string> = {
  LOW: "text-[#74c7a1] border-[#2b6656] bg-[#17352f]",
  MEDIUM: "text-[#e0c467] border-[#725e2e] bg-[#3d341d]",
  HIGH: "text-[#f0a05c] border-[#7b4a2d] bg-[#452b21]",
  CRITICAL: "text-[#ff8576] border-[#7b3938] bg-[#492526]",
};

export function RiskScore({ assessment, compact = false }: { assessment: RiskAssessment; compact?: boolean }) {
  return <div className={compact ? "flex items-center gap-3" : "space-y-4"}>
    <div className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 ${levelClass[assessment.level]}`} style={{ background: `conic-gradient(currentColor ${assessment.score * 3.6}deg, rgba(111,139,148,.12) 0deg)` }}>
      <div className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-full bg-[#0c1921]"><span className="font-display text-[22px] font-semibold leading-none text-[#e5efef]">{assessment.score}</span><span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#708992]">/ 100</span></div>
    </div>
    <div><div className="flex items-center gap-2"><ShieldAlert size={14} className="text-[#df9f4b]" /><span className={`rounded-[3px] border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${levelClass[assessment.level]}`}>{assessment.level}</span></div>{!compact && <p className="mt-2 max-w-sm text-[11px] leading-relaxed text-[#8da5ab]">{assessment.disclaimer}</p>}</div>
  </div>;
}
