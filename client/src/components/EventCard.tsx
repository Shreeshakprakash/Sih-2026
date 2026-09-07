import { ArrowUpRight, Clock3, MapPin, Satellite, Zap } from "lucide-react";
import type { ThermalEvent } from "@/lib/mockData";
import { ClassificationBadge } from "@/components/ClassificationBadge";
import { cn } from "@/lib/utils";

export function EventCard({ event, onSelect, compact = false }: { event: ThermalEvent; onSelect?: (event: ThermalEvent) => void; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(event)}
      className={cn("group w-full text-left transition duration-200", compact ? "rounded-[3px]" : "rounded-[4px] border border-[#203746] bg-[#111d26] p-4 hover:-translate-y-0.5 hover:border-[#3c6773] hover:bg-[#14232c]")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#738994]">
            <span className="text-[#c08d3c]">{event.id.replace("FRM-2026-0906-", "#")}</span>
            <span className="h-1 w-1 rounded-full bg-[#395662]" />
            <span>{event.status}</span>
          </div>
          <h3 className="truncate font-display text-[14px] font-semibold text-[#dce9eb]">{event.location}</h3>
          <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-[#748994]"><MapPin size={11} />{event.country} · {event.region}</p>
        </div>
        <ArrowUpRight size={16} className="shrink-0 text-[#58737e] transition duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#a8d2d4]" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <ClassificationBadge classification={event.classification} compact />
        <span className="flex items-center gap-1 font-mono text-[9px] text-[#afc0c6]"><Zap size={11} className="text-[#dca249]" /> {event.frp} MW</span>
      </div>
      {!compact && (
        <div className="mt-4 flex items-center justify-between border-t border-[#1c323e] pt-3 font-mono text-[9px] text-[#627984]">
          <span className="flex items-center gap-1.5"><Clock3 size={11} /> {event.detectedAt.split(" · ")[1]}</span>
          <span className="flex items-center gap-1.5"><Satellite size={11} /> {event.satellite.split(" / ")[0]}</span>
        </div>
      )}
    </button>
  );
}
