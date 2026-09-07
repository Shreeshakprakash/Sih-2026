import { useMemo, useRef, useState } from "react";
import { Maximize2, Minus, Plus, RotateCcw, ZoomIn } from "lucide-react";
import { Button } from "@/components/Button";
import type { ThermalEvent } from "@/lib/mockData";
import { formatUtcTimestamp } from "@/lib/time";

const landPaths = [
  "M72 118 L86 93 L122 82 L160 87 L183 105 L177 129 L153 143 L130 162 L107 151 L91 157 L78 145 Z",
  "M202 184 L229 174 L252 185 L263 214 L255 243 L238 266 L226 300 L211 327 L195 316 L201 286 L193 260 L181 238 L182 212 Z",
  "M337 93 L366 78 L408 82 L438 101 L475 105 L511 120 L549 108 L582 123 L616 117 L661 127 L699 143 L736 149 L767 169 L755 188 L723 190 L706 206 L675 201 L646 210 L613 203 L582 216 L557 208 L530 216 L507 201 L473 203 L455 188 L423 193 L394 176 L362 165 L342 143 Z",
  "M523 231 L551 218 L582 224 L601 248 L588 277 L567 294 L554 325 L529 351 L504 331 L498 302 L507 277 Z",
  "M706 254 L729 243 L753 254 L766 277 L752 293 L729 290 L711 278 Z",
  "M785 158 L808 147 L826 157 L818 173 L796 180 Z",
  "M839 300 L857 292 L873 301 L869 319 L850 326 L837 316 Z",
];

function project(latitude: number, longitude: number) {
  const x = 24 + ((longitude + 180) / 360) * 852;
  const y = 46 + ((90 - latitude) / 180) * 330;
  return { x, y };
}

export function WorldMap({ events, selectedId, onSelect, compact = false }: { events: ThermalEvent[]; selectedId?: string; onSelect?: (event: ThermalEvent) => void; compact?: boolean }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const dots = useMemo(() => events.map((event) => ({ event, point: project(event.latitude, event.longitude) })), [events]);
  return (
    <div ref={mapRef} className={`relative overflow-hidden rounded-[3px] border border-[#254452] bg-[#0c1c25] ${compact ? "h-[296px]" : "h-[470px]"}`}>
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(87,157,169,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(87,157,169,0.09) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_53%_46%,rgba(41,110,125,0.17),transparent_37%),linear-gradient(135deg,rgba(5,12,17,0.8),transparent_45%,rgba(5,12,17,0.4))]" />
      <svg viewBox="0 0 900 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full transition-transform duration-200" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
        <g fill="#183844" stroke="#2f6572" strokeWidth="1.2" opacity="0.93">
          {landPaths.map((path) => <path key={path} d={path} />)}
        </g>
        <g fill="none" stroke="#397786" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.45">
          <path d="M0 116 C220 105 640 111 900 103" /><path d="M0 191 C251 184 662 204 900 177" /><path d="M0 270 C233 249 639 284 900 248" /><path d="M0 334 C266 313 669 355 900 315" />
          <path d="M160 0 C135 121 166 268 142 400" /><path d="M344 0 C367 129 350 286 371 400" /><path d="M540 0 C516 120 553 278 525 400" /><path d="M725 0 C744 123 718 271 749 400" />
        </g>
        <g>
          {dots.map(({ event, point }) => {
            const color = event.classification === "Natural/Forest Fire" ? "#f4a64d" : event.classification === "Industrial Fire" ? "#ef6b57" : event.classification === "Agricultural Burning" ? "#c7b766" : event.classification === "Persistent Industrial Thermal Source" ? "#57b8c6" : "#a7b5bd";
            const selected = event.id === selectedId;
            return <g key={event.id} onClick={() => onSelect?.(event)} className={onSelect ? "cursor-pointer" : ""}>
              <circle cx={point.x} cy={point.y} r={selected ? 11 : 7} fill={color} opacity="0.12" />
              <circle cx={point.x} cy={point.y} r={selected ? 4.5 : 3} fill={color} stroke="#071118" strokeWidth="1.5" />
              {selected && <circle cx={point.x} cy={point.y} r="8" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" />}
            </g>;
          })}
        </g>
      </svg>
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-[3px] border border-[#294b58] bg-[#0d1b23]/85 px-3 py-2 backdrop-blur-sm"><span className="h-1.5 w-1.5 rounded-full bg-[#e5ab4b] shadow-[0_0_8px_#e5ab4b]" /><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#adc2c6]">Global thermal activity</span></div>
      <div className="absolute bottom-4 left-4 font-mono text-[8px] uppercase tracking-[0.12em] text-[#6d8992]">Equidistant cylindrical · {formatUtcTimestamp()} UTC</div>
      <div className="absolute right-4 top-4 flex flex-col gap-1 rounded-[3px] border border-[#294b58] bg-[#0d1b23]/85 p-1 backdrop-blur-sm">
        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Zoom in" onClick={() => setZoom((value) => Math.min(1.5, value + 0.1))}><Plus size={13} /></Button><Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Zoom out" onClick={() => setZoom((value) => Math.max(0.85, value - 0.1))}><Minus size={13} /></Button><Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Reset map" onClick={() => setZoom(1)}><RotateCcw size={12} /></Button>
      </div>
      <div className="absolute bottom-4 right-4 flex gap-1"><Button variant="secondary" size="sm" onClick={() => setZoom((value) => Math.min(1.5, value + 0.2))}><ZoomIn size={12} /> Explore</Button><Button variant="ghost" size="icon" aria-label="Fullscreen" onClick={() => { if (!document.fullscreenElement) mapRef.current?.requestFullscreen?.(); else document.exitFullscreen?.(); }}><Maximize2 size={13} /></Button></div>
    </div>
  );
}
