import React, { useState } from 'react';
import { Header } from './Header';
import { MapInterface } from './MapInterface';
import { EventPanel } from './EventPanel';
import { FacilityPanel } from './FacilityPanel';
import { ThreeDView } from './ThreeDView';
import { ThermalAnomaly, IndustrialFacility } from '../types';
import { mockAnomalies, mockFacilities } from '../data/mockData';
import { Play } from 'lucide-react';
import { classifyAnomaly } from '../utils/ml';

export const Dashboard: React.FC = () => {
  const [selectedAnomaly, setSelectedAnomaly] = useState<ThermalAnomaly | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<IndustrialFacility | null>(null);
  const [show3D, setShow3D] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  const handleSelectAnomaly = (anomaly: ThermalAnomaly) => {
    setSelectedAnomaly(anomaly);
    setSelectedFacility(null);
  };

  const handleSelectFacility = (facility: IndustrialFacility) => {
    setSelectedFacility(facility);
    setSelectedAnomaly(null);
  };

  const runDemo = async () => {
    setIsDemoRunning(true);
    // 1. Reset
    setSelectedAnomaly(null);
    setSelectedFacility(null);
    
    // 2. Select demo event after short delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const demoEventBase = mockAnomalies.find(a => a.id === 'TG-1042');
    if (!demoEventBase) return;
    
    // Show event without classification first
    const unclassifiedEvent = { ...demoEventBase, classification: undefined, probabilities: undefined };
    setSelectedAnomaly(unclassifiedEvent);
    
    // 3. Simulate processing time
    await classifyAnomaly(unclassifiedEvent.id);
    
    // 4. Update with classification
    setSelectedAnomaly(demoEventBase);
    setIsDemoRunning(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-950 font-sans">
      <Header />
      
      <main className="flex-1 relative">
        <MapInterface 
          onSelectAnomaly={handleSelectAnomaly}
          onSelectFacility={handleSelectFacility}
          selectedAnomalyId={selectedAnomaly?.id}
          selectedFacilityId={selectedFacility?.id}
        />

        {/* Demo Button */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <button 
            onClick={runDemo}
            disabled={isDemoRunning}
            className={`flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-widest shadow-xl transition-all border ${
              isDemoRunning 
                ? 'bg-zinc-900 text-zinc-500 border-zinc-800 cursor-not-allowed' 
                : 'bg-zinc-100 hover:bg-white text-zinc-950 border-zinc-200'
            }`}
          >
            {isDemoRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Demo Sequence
              </>
            )}
          </button>
        </div>

        {/* Panels */}
        {selectedAnomaly && (
          <EventPanel 
            event={selectedAnomaly} 
            onClose={() => setSelectedAnomaly(null)}
            onOpen3D={() => setShow3D(true)}
          />
        )}
        
        {selectedFacility && (
          <FacilityPanel 
            facility={selectedFacility} 
            onClose={() => setSelectedFacility(null)} 
          />
        )}
        
      </main>

      {/* 3D Overlay */}
      {show3D && selectedAnomaly && (
        <ThreeDView event={selectedAnomaly} onClose={() => setShow3D(false)} />
      )}
    </div>
  );
};
