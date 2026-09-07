import React, { useState } from 'react';
import { ThermalAnomaly } from '../types';
import { getStatusColor } from '../data/mockData';
import { Activity, Map, X } from 'lucide-react';
import { BehaviourAnalysis } from './BehaviourAnalysis';

interface EventPanelProps {
  event: ThermalAnomaly;
  onClose: () => void;
  onOpen3D: () => void;
}

export const EventPanel: React.FC<EventPanelProps> = ({ event, onClose, onOpen3D }) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const color = getStatusColor(event.classification);

  return (
    <>
      <div className="absolute top-16 right-4 w-80 bg-[#09090b] border border-zinc-800 shadow-2xl text-zinc-200 z-10 flex flex-col max-h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="p-3 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-[#09090b]">
          <h2 className="text-xs font-mono tracking-wider text-zinc-100 flex items-center gap-2">
            <span className="w-2 h-2 inline-block" style={{ backgroundColor: color }} />
            ID: {event.id}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-zinc-800 transition-colors">
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        <div className="p-4 space-y-5">
          <div className="space-y-1">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Classification</div>
            <div 
              className="text-sm font-semibold p-2.5 bg-zinc-900 border-l-2"
              style={{ borderLeftColor: color }}
            >
              {event.classification || 'Awaiting Classification...'}
            </div>
          </div>

          <div className="grid grid-cols-2 border border-zinc-800 bg-zinc-900/50">
            <div className="p-2 border-r border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Confidence</div>
              <div className="text-lg font-mono text-zinc-100">{event.classificationConfidence}%</div>
            </div>
            <div className="p-2">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Priority</div>
              <div className={`text-lg font-mono ${event.priority === 'HIGH' || event.priority === 'CRITICAL' ? 'text-red-500' : 'text-zinc-200'}`}>
                {event.priority}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold border-b border-zinc-800 pb-1.5">Fused Evidence</div>
            <ul className="text-xs divide-y divide-zinc-800/60 font-mono">
              <li className="flex justify-between items-center py-1.5">
                <span className="text-zinc-400">Dist. to facility</span>
                <span className="text-zinc-200">{event.distanceToIndustrial} m</span>
              </li>
              <li className="flex justify-between items-center py-1.5">
                <span className="text-zinc-400">FRP Intensity</span>
                <span className="text-zinc-200">{event.frp} MW</span>
              </li>
              <li className="flex justify-between items-center py-1.5">
                <span className="text-zinc-400">FIRMS Conf.</span>
                <span className="text-zinc-200">{event.confidence}%</span>
              </li>
              <li className="flex justify-between items-center py-1.5">
                <span className="text-zinc-400">Persistence</span>
                <span className="text-zinc-200">{event.persistenceHours} hrs</span>
              </li>
              <li className="flex justify-between items-center py-1.5">
                <span className="text-zinc-400">FRP Deviation</span>
                <span className="text-red-400">+{event.historicalFrpDeviation}%</span>
              </li>
              <li className="flex justify-between items-center py-1.5">
                <span className="text-zinc-400">Land use</span>
                <span className="text-zinc-200">{event.landUse}</span>
              </li>
            </ul>
          </div>

          {event.probabilities && (
            <div className="space-y-2">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold border-b border-zinc-800 pb-1.5">Probabilities</div>
              <div className="space-y-1.5 pt-1">
                {Object.entries(event.probabilities)
                  .sort((a, b) => (b[1] as number) - (a[1] as number))
                  .map(([label, prob]) => (
                    <div key={label} className="flex items-center text-[10px] font-mono">
                      <div className="w-32 truncate text-zinc-400">{label}</div>
                      <div className="flex-1 mx-2 h-1 bg-zinc-800">
                        <div 
                          className="h-full" 
                          style={{ width: `${prob}%`, backgroundColor: getStatusColor(label as any) }}
                        />
                      </div>
                      <div className="w-6 text-right text-zinc-300">{prob}%</div>
                    </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <button 
              onClick={() => setShowAnalysis(true)}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 font-mono text-[10px] uppercase tracking-wider border border-zinc-700 transition-colors flex justify-center items-center gap-2"
            >
              <Activity className="w-3 h-3" />
              Behaviour Analysis
            </button>
            <button 
              onClick={onOpen3D}
              className="w-full py-2 bg-zinc-200 hover:bg-white text-zinc-950 font-mono text-[10px] uppercase tracking-wider transition-colors flex justify-center items-center gap-2"
            >
              <Map className="w-3 h-3" />
              3D Context View
            </button>
          </div>
        </div>
      </div>
      
      {showAnalysis && (
        <BehaviourAnalysis event={event} onClose={() => setShowAnalysis(false)} />
      )}
    </>
  );
};
