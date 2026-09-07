import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import Map, { MapRef, Marker, NavigationControl } from "react-map-gl/maplibre";
import { Target, X } from "lucide-react";
import { ClassificationBadge } from "@/components/ClassificationBadge";
import { thermalEvents, type Classification, type ThermalEvent } from "@/lib/mockData";

type Facility = { id: string; lat: number; lng: number };

const facilities: Facility[] = [
  { id: "FAC-001", lat: 22.3503, lng: 69.961 },
  { id: "FAC-002", lat: 22.3275, lng: 69.7547 },
  { id: "FAC-003", lat: 22.8256, lng: 69.5428 },
];

const statusColors: Record<Classification, string> = {
  "Industrial Fire": "#ef4444",
  "Persistent Industrial Thermal Source": "#57b8c6",
  "Natural/Forest Fire": "#10b981",
  "Agricultural Burning": "#eab308",
  Unclassified: "#71717a",
};

const mapStyle = {
  version: 8 as const,
  sources: {
    "raster-tiles": {
      type: "raster" as const,
      tiles: ["https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    },
  },
  layers: [{ id: "simple-tiles", type: "raster" as const, source: "raster-tiles", minzoom: 0, maxzoom: 22 }],
};

export default function SihMap() {
  const mapRef = useRef<MapRef>(null);
  const [selectedEvent, setSelectedEvent] = useState<ThermalEvent | null>(null);

  useEffect(() => {
    if (selectedEvent) mapRef.current?.flyTo({ center: [selectedEvent.longitude, selectedEvent.latitude], zoom: 5, duration: 1500 });
  }, [selectedEvent]);

  return (
    <div className="relative -mx-5 -mt-2 h-[calc(100vh-142px)] min-h-[700px] overflow-hidden border border-[#274653] bg-black lg:-mx-8 lg:-mt-2">
      <Map ref={mapRef} initialViewState={{ longitude: 18, latitude: 15, zoom: 2.35, pitch: 0, bearing: 0 }} mapStyle={mapStyle} interactiveLayerIds={[]}>
        <NavigationControl position="bottom-right" />
        {facilities.map((facility) => (
          <Marker key={facility.id} longitude={facility.lng} latitude={facility.lat}>
            <div className="flex h-4 w-4 cursor-pointer items-center justify-center border-2 border-zinc-600 bg-[#09090b]/80 transition-transform hover:scale-110">
              <div className="h-1 w-1 bg-zinc-400" />
            </div>
          </Marker>
        ))}
        {thermalEvents.map((event) => {
          const color = statusColors[event.classification];
          const isSelected = selectedEvent?.id === event.id;
          return (
            <Marker key={event.id} longitude={event.longitude} latitude={event.latitude} onClick={(mapEvent) => { mapEvent.originalEvent.stopPropagation(); setSelectedEvent(event); }}>
              <div className={`group relative flex cursor-pointer items-center justify-center ${isSelected ? "h-8 w-8" : "h-4 w-4"}`}>
                {isSelected ? <><Target className="absolute z-20 h-8 w-8 animate-[spin_4s_linear_infinite]" style={{ color }} strokeWidth={1} /><div className="z-30 h-2 w-2" style={{ backgroundColor: color }} /></> : <div className="z-20 h-3 w-3 border border-[#09090b] transition-transform group-hover:scale-125" style={{ backgroundColor: color, opacity: 0.9 }} />}
              </div>
            </Marker>
          );
        })}
      </Map>
      {selectedEvent && (
        <aside className="absolute bottom-3 right-3 top-3 z-10 flex w-[min(390px,calc(100%-24px))] flex-col overflow-hidden rounded-[4px] border border-[#3c5964] bg-[#0b171f]/96 shadow-[0_24px_70px_rgba(0,0,0,0.48)] backdrop-blur-xl lg:bottom-4 lg:right-4 lg:top-4">
          <div className="flex items-start justify-between gap-4 border-b border-[#24404c] px-5 py-4">
            <div><p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#d49e4a]">Event intelligence / selected</p><h2 className="mt-1 font-display text-[17px] font-semibold text-[#e0edef]">{selectedEvent.location}</h2><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#72909a]">{selectedEvent.id} · {selectedEvent.country}</p></div>
            <button type="button" onClick={() => setSelectedEvent(null)} className="rounded-[3px] border border-[#2c4a56] p-2 text-[#88a1a9] transition hover:border-[#72b8be] hover:text-white" aria-label="Close event intelligence panel"><X size={15} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <ClassificationBadge classification={selectedEvent.classification} compact />
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
              {[["Confidence", `${selectedEvent.confidence}%`], ["Detection time", selectedEvent.detectedAt.split(" · ")[1]], ["Latitude", `${selectedEvent.latitude.toFixed(3)}°`], ["Longitude", `${selectedEvent.longitude.toFixed(3)}°`], ["FRP", `${selectedEvent.frp} MW`], ["Brightness temp.", `${selectedEvent.brightness} K`], ["Satellite", selectedEvent.satellite], ["Status", selectedEvent.status]].map(([label, value]) => <div key={label} className="border-l border-[#bd8c42] pl-3"><p className="font-mono text-[8px] uppercase tracking-[0.11em] text-[#66838d]">{label}</p><p className="mt-1 font-mono text-[11px] text-[#d5e5e7]">{value}</p></div>)}
            </div>
            <div className="mt-5 border-t border-[#1e3844] pt-4"><p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#6e8992]">Analyst synthesis</p><p className="mt-2 text-[11px] leading-relaxed text-[#93a9af]">{selectedEvent.description}</p></div>
          </div>
        </aside>
      )}
    </div>
  );
}
