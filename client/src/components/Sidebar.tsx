import { Crosshair, Database, Layers3, MapPinned, Radar, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { classificationMeta, type Classification } from "@/lib/mockData";
import { formatUtcClock } from "@/lib/time";

const layers: { label: string; detail: string; color: string }[] = [
  { label: "Thermal detections", detail: "127 active", color: "#e4a844" },
  { label: "Industrial context", detail: "87 zones", color: "#5fbec5" },
  { label: "Protected areas", detail: "Global overlay", color: "#758f70" },
  { label: "Cloud mask", detail: "12.8% coverage", color: "#778b98" },
];

export function Sidebar({ activeLayer = "Thermal detections" }: { activeLayer?: string }) {
  const [selectedLayer, setSelectedLayer] = useState(activeLayer);
  const [focusMode, setFocusMode] = useState(false);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside className="hidden w-[226px] shrink-0 space-y-4 lg:block">
      <div className="rounded-[4px] border border-[#203746] bg-[#0e1921]/90 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2"><Radar size={15} className="text-[#dba249]" /><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c5d6d9]">Sensor layers</span></div>
          <SlidersHorizontal size={13} className="text-[#637d87]" />
        </div>
        <div className="space-y-1">
          {layers.map((layer) => (
            <button key={layer.label} type="button" onClick={() => setSelectedLayer(layer.label)} className={`flex w-full items-center justify-between gap-2 rounded-[3px] px-2 py-2.5 text-left transition ${selectedLayer === layer.label ? "bg-[#182d37]" : "hover:bg-[#13242d]"}`}>
              <span className="flex min-w-0 items-center gap-2.5"><span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: layer.color, boxShadow: `0 0 8px ${layer.color}` }} /><span className="truncate font-mono text-[9px] uppercase tracking-[0.08em] text-[#9ab1b8]">{layer.label}</span></span>
              {selectedLayer === layer.label && <span className="h-1.5 w-1.5 rounded-full bg-[#dba249]" />}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[4px] border border-[#203746] bg-[#0e1921]/90 p-4">
        <div className="mb-4 flex items-center gap-2"><Layers3 size={15} className="text-[#65bdc5]" /><span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c5d6d9]">Classification</span></div>
        <div className="space-y-3">
          {(Object.keys(classificationMeta) as Classification[]).map((classification) => <div key={classification} className="flex items-center gap-2.5"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: classificationMeta[classification].color }} /><span className="font-mono text-[9px] uppercase leading-tight tracking-[0.06em] text-[#8198a0]">{classificationMeta[classification].label}</span></div>)}
        </div>
      </div>

      <div className="rounded-[4px] border border-[#203746] bg-gradient-to-br from-[#10232d] to-[#101921] p-4">
        <div className="mb-3 flex items-center gap-2"><Database size={14} className="text-[#ddaa4e]" /><span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-[#c5d6d9]">Data provenance</span></div>
        <p className="font-mono text-[9px] leading-[1.65] text-[#718892]">NASA FIRMS near-real-time fire detections. VIIRS 375m active fire product.</p>
        <div className="mt-4 flex items-center justify-between border-t border-[#203743] pt-3 font-mono text-[9px] uppercase tracking-[0.08em]"><span className="text-[#647d86]">Last sync</span><span className="text-[#a5c0c4]">{formatUtcClock(now)} UTC</span></div>
      </div>

      <Button variant={focusMode ? "primary" : "outline"} size="sm" className="w-full" onClick={() => setFocusMode((mode) => !mode)}><Crosshair size={13} /> {focusMode ? "Focus mode active" : "Enable focus mode"}</Button>
      <div className="flex items-center gap-2 px-1 font-mono text-[8px] uppercase tracking-[0.12em] text-[#526b75]"><MapPinned size={11} />Global coverage · 82°N to 60°S</div>
    </aside>
  );
}
