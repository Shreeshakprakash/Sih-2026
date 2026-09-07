import { Satellite, Signal, Target } from "lucide-react";
import type { ThermalEvent } from "@/lib/mockData";

const landMasses = [
  "M64 112 C82 89 112 78 145 90 L174 115 L169 139 L147 153 L132 181 L107 170 L95 148 L72 145 Z",
  "M198 193 C216 178 244 182 254 210 L252 240 L235 267 L224 309 L205 336 L191 314 L198 281 L184 250 L181 220 Z",
  "M325 89 C360 66 407 76 437 97 L477 103 L513 121 L553 111 L591 123 L629 117 L675 131 L710 145 L759 169 L750 192 L713 194 L687 211 L648 207 L615 219 L579 211 L543 221 L509 207 L467 209 L436 191 L396 186 L362 165 L337 139 Z",
  "M517 229 C541 216 575 223 592 245 L583 276 L564 296 L552 328 L530 352 L507 326 L500 293 L508 264 Z",
  "M708 255 L732 246 L756 260 L765 282 L747 297 L722 288 Z",
  "M789 155 L815 146 L829 159 L817 177 L795 181 Z",
  "M844 297 L863 291 L878 304 L868 322 L849 326 Z",
];

const latitudes = [70, 130, 190, 250, 310];
const longitudes = [130, 250, 370, 490, 610, 730];

function project(latitude: number, longitude: number) {
  return { x: 24 + ((longitude + 180) / 360) * 852, y: 42 + ((90 - latitude) / 180) * 330 };
}

export function OrbitalGlobe({ events }: { events: ThermalEvent[] }) {
  const points = events.map((event) => ({ event, point: project(event.latitude, event.longitude) }));
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[4px] border border-[#315b68] bg-[#08151d] shadow-[0_28px_80px_rgba(0,0,0,0.32)] lg:min-h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_47%,rgba(56,142,155,0.2),transparent_30%),radial-gradient(circle_at_70%_16%,rgba(219,157,63,0.13),transparent_23%),linear-gradient(135deg,#071017,#0b1e28_52%,#09131a)]" />
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(86,170,180,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(86,170,180,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="mission-float absolute left-[9%] top-[13%] z-20 flex items-center gap-2 rounded-[3px] border border-[#3b6973] bg-[#0d2028]/90 px-3 py-2 backdrop-blur-sm"><span className="h-1.5 w-1.5 rounded-full bg-[#75d0d0] shadow-[0_0_8px_#75d0d0]" /><span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#a9cdd0]">Orbital pass / nominal</span></div>
      <div className="absolute right-[8%] top-[12%] z-20 hidden text-right sm:block"><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#dca44f]">SUOMI NPP · VIIRS</p><p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#66838d]">375 m active fire product</p></div>

      <svg viewBox="0 0 900 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[78%] w-full lg:h-[82%]">
        <g className="globe-grid" fill="none" stroke="#4a9aa6" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.33">
          {latitudes.map((y) => <path key={y} d={`M0 ${y} C230 ${y - 13} 670 ${y + 16} 900 ${y - 2}`} />)}
          {longitudes.map((x) => <path key={x} d={`M${x} 0 C${x - 32} 130 ${x + 32} 260 ${x} 400`} />)}
        </g>
        <g fill="#163b48" stroke="#3d7f8a" strokeWidth="1.1" opacity="0.98">
          {landMasses.map((path) => <path key={path} d={path} />)}
        </g>
        <g fill="none" stroke="#79c4c5" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.42">
          <path d="M80 214 C280 119 565 152 826 215" />
          <path d="M92 281 C325 193 601 214 834 289" />
        </g>
        <g>
          {points.map(({ event, point }, index) => {
            const color = event.classification === "Natural/Forest Fire" ? "#f4a64d" : event.classification === "Industrial Fire" ? "#ef6b57" : event.classification === "Agricultural Burning" ? "#c7b766" : event.classification === "Persistent Industrial Thermal Source" ? "#63c5c9" : "#9daeb4";
            return <g key={event.id} className="signal-pulse" style={{ animationDelay: `${index * 240}ms` }}>
              <circle cx={point.x} cy={point.y} r="15" fill={color} opacity="0.08" />
              <circle cx={point.x} cy={point.y} r="8" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.8" />
              <circle cx={point.x} cy={point.y} r="3.5" fill={color} stroke="#061219" strokeWidth="1.5" />
            </g>;
          })}
        </g>
        <g className="orbit-sweep" fill="none" stroke="#d69c45" strokeWidth="1.3" strokeDasharray="6 12" opacity="0.72">
          <ellipse cx="515" cy="198" rx="397" ry="90" transform="rotate(-11 515 198)" />
        </g>
        <g transform="translate(754 62)" className="mission-float">
          <path d="M-18 2 L17 2 L8 12 L-7 12 Z" fill="#d9a049" opacity="0.9" /><path d="M-7 -4 L7 16" stroke="#d9a049" strokeWidth="1.5" /><path d="M-2 0 L-22 -12 L-28 -8 L-11 7 Z" fill="#557b84" /><path d="M8 0 L28 -12 L34 -8 L17 7 Z" fill="#557b84" /><circle cx="0" cy="6" r="3" fill="#76c8ca" />
        </g>
      </svg>

      <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 rounded-[3px] border border-[#294d59] bg-[#0c1a22]/88 px-3 py-2 backdrop-blur-sm"><Signal size={13} className="text-[#75c8ca]" /><span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#a7bec2]">Live thermal layer</span></div>
      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-[#6d8a94]"><Target size={12} className="text-[#d9a049]" /> 1,284 active points</div>
      <div className="absolute left-1/2 top-[38%] h-48 w-48 -translate-x-1/2 rounded-full border border-[#66bfc4]/10 shadow-[0_0_80px_rgba(66,182,190,0.12)] lg:h-64 lg:w-64" />
      <Satellite className="absolute right-[11%] top-[18%] text-[#d8a14b] opacity-70" size={15} />
    </div>
  );
}
