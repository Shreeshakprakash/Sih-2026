import React from 'react';
import { Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-[#09090b] border-b border-zinc-800 text-zinc-100 z-10 relative shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-2.5 h-2.5 bg-red-600" />
        <div>
          <h1 className="text-sm font-semibold tracking-wide uppercase text-zinc-100">ThermoGuard</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-6 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 bg-emerald-500"></div>
          <span className="text-zinc-400 uppercase tracking-widest">Sys_Active</span>
        </div>
        
        <div className="flex items-center space-x-2 bg-zinc-900 px-3 py-1 border border-zinc-800">
          <Activity className="w-3 h-3 text-orange-500" />
          <span className="text-zinc-500 uppercase tracking-wider">Priority Events:</span>
          <span className="text-zinc-100 font-bold">2</span>
        </div>
      </div>
    </header>
  );
};
