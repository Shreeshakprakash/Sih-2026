import React from 'react';
import { IndustrialFacility } from '../types';
import { X } from 'lucide-react';

interface FacilityPanelProps {
  facility: IndustrialFacility;
  onClose: () => void;
}

export const FacilityPanel: React.FC<FacilityPanelProps> = ({ facility, onClose }) => {
  return (
    <div className="absolute top-16 left-4 w-72 bg-[#09090b] border border-zinc-800 shadow-2xl text-zinc-200 z-10 flex flex-col">
      <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-[#09090b]">
        <h2 className="text-xs font-mono tracking-wider text-zinc-100 flex items-center gap-2 uppercase">
          Facility Context
        </h2>
        <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors">
          <X className="w-4 h-4 text-zinc-400" />
        </button>
      </div>

      <div className="p-4 space-y-5">
        <div>
          <div className="text-sm font-semibold text-zinc-100 mb-0.5 uppercase tracking-wide">{facility.name}</div>
          <div className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">{facility.type}</div>
        </div>

        <div className="grid grid-cols-2 border border-zinc-800 bg-zinc-900/50">
          <div className="p-2 border-r border-zinc-800">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Status</div>
            <div className={`font-mono text-sm ${facility.status === 'ABNORMAL' ? 'text-red-500' : 'text-emerald-500'}`}>
              {facility.status}
            </div>
          </div>
          <div className="p-2">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Nearby Events</div>
            <div className="font-mono text-sm text-zinc-100">{facility.nearbyEventsCount}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold border-b border-zinc-800 pb-1.5">Thermal Baseline</div>
          <div className="flex justify-between items-center text-xs font-mono py-1">
            <span className="text-zinc-400">Normal Range</span>
            <span className="text-zinc-200">{facility.normalThermalRange[0]} - {facility.normalThermalRange[1]} MW</span>
          </div>
          <div className="flex justify-between items-center text-xs font-mono py-1">
            <span className="text-zinc-400">Current Output</span>
            <span className={`font-bold ${facility.currentThermalOutput > facility.normalThermalRange[1] ? 'text-red-500' : 'text-emerald-500'}`}>
              {facility.currentThermalOutput} MW
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold border-b border-zinc-800 pb-1.5">OSM Infrastructure Data</div>
          <ul className="text-xs space-y-1.5 text-zinc-400 font-mono">
            <li>+ Refinery units</li>
            <li>+ Storage tank farm</li>
            <li>+ Crude pipeline</li>
            <li>+ NH-15 Highway (2km)</li>
            <li>+ Admin buildings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
