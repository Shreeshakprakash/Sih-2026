import React from 'react';
import { ThermalAnomaly } from '../types';
import { X, Activity } from 'lucide-react';
import { mockFacilities } from '../data/mockData';

interface BehaviourAnalysisProps {
  event: ThermalAnomaly;
  onClose: () => void;
}

export const BehaviourAnalysis: React.FC<BehaviourAnalysisProps> = ({ event, onClose }) => {
  const facility = mockFacilities.find(f => event.distanceToIndustrial < 1000) || mockFacilities[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#09090b] border border-zinc-800 shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden text-zinc-200">
        
        <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-[#09090b]">
          <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-400" />
            Behaviour Analysis Report
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Persistence */}
            <div className="bg-zinc-900/50 p-4 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Temporal Persistence</h3>
                <span className="font-mono text-xs text-orange-500">CRITICAL</span>
              </div>
              <div className="text-3xl font-mono text-zinc-100 mb-2">{event.persistenceHours} <span className="text-sm text-zinc-500">HRS</span></div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">Continuous thermal signature detected without significant cooling.</p>
              
              <div className="mt-4 border-t border-zinc-800/60 pt-3">
                <div className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Timeline</div>
                <div className="flex justify-between items-center font-mono text-xs text-zinc-400 bg-zinc-950 p-2 border border-zinc-800/60">
                  <span>-4h <span className="text-orange-500/50">■</span></span>
                  <span>-3h <span className="text-orange-500/70">■</span></span>
                  <span>-2h <span className="text-orange-500/80">■</span></span>
                  <span>-1h <span className="text-orange-500">■</span></span>
                  <span>Now <span className="text-red-500 animate-pulse">■</span></span>
                </div>
              </div>
            </div>

            {/* Historical Deviation */}
            <div className="bg-zinc-900/50 p-4 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Intensity Deviation</h3>
                <span className="font-mono text-xs text-red-500">+{event.historicalFrpDeviation}%</span>
              </div>
              
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Current FRP</div>
                  <div className="text-3xl font-mono text-zinc-100">{event.frp} <span className="text-sm text-zinc-500">MW</span></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
                  <span>Baseline ({facility.name})</span>
                  <span>{facility.normalThermalRange[0]} - {facility.normalThermalRange[1]} MW</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-950 flex border border-zinc-800/60">
                  <div className="h-full bg-emerald-500/50 w-1/3 border-r border-zinc-800/60"></div>
                  <div className="h-full bg-red-500 w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Spatial Spread */}
            <div className="bg-zinc-900/50 p-4 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Spatial Spread</h3>
              </div>
              <div className="text-xl font-mono text-zinc-100 mb-2 uppercase tracking-wide">{event.spatialSpreadIndex}</div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {event.spatialSpreadIndex === 'Low' 
                  ? 'Signature remains concentrated within facility bounds (localized industrial event).'
                  : 'Signature is spreading across adjacent pixels (propagating fire front).'}
              </p>
            </div>

            {/* Recurrence */}
            <div className="bg-zinc-900/50 p-4 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Recurrence</h3>
              </div>
              <div className="text-xl font-mono text-zinc-100 mb-2 uppercase tracking-wide">IDX: {event.recurrenceScore}/10</div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {event.recurrenceScore < 3 
                  ? 'Rare thermal event for this location. Indicates abnormal activity.'
                  : 'High recurrence indicates a likely persistent industrial source.'}
              </p>
            </div>

          </div>

          <div className="bg-zinc-950 p-3 border border-zinc-800">
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono text-center">
              // Classification based on fused thermal, spatial and temporal evidence //
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};
