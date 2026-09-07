import { Factory, Flame, Leaf, Radio, ScanSearch } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Classification } from "@/lib/mockData";

const icons: Record<Classification, ReactNode> = {
  "Industrial Fire": <Factory size={12} />,
  "Natural/Forest Fire": <Flame size={12} />,
  "Agricultural Burning": <Leaf size={12} />,
  "Persistent Industrial Thermal Source": <Radio size={12} />,
  Unclassified: <ScanSearch size={12} />,
};

const styles: Record<Classification, string> = {
  "Industrial Fire": "border-[#733e36] bg-[#412826] text-[#f59a7e]",
  "Natural/Forest Fire": "border-[#76542f] bg-[#443522] text-[#f1b564]",
  "Agricultural Burning": "border-[#6b6332] bg-[#403e24] text-[#d4c36d]",
  "Persistent Industrial Thermal Source": "border-[#2e6873] bg-[#193a43] text-[#76d0d5]",
  Unclassified: "border-[#3b4b58] bg-[#27323a] text-[#a9bbc2]",
};

export function ClassificationBadge({ classification, compact = false }: { classification: Classification; compact?: boolean }) {
  return (
    <span className={cn("inline-flex max-w-full items-center gap-1.5 rounded-[3px] border font-mono text-[9px] font-semibold uppercase tracking-[0.1em]", styles[classification], compact ? "px-2 py-1" : "px-2.5 py-1.5")}>
      {icons[classification]}
      <span className="truncate">{compact ? classification === "Persistent Industrial Thermal Source" ? "PERSISTENT SOURCE" : classification.toUpperCase() : classification.replace("/", " / ")}</span>
    </span>
  );
}
