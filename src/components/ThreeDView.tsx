import React, { useEffect, useRef } from 'react';
import Map, { MapRef, NavigationControl, Source, Layer } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import { X, Box } from 'lucide-react';
import { ThermalAnomaly, IndustrialFacility } from '../types';
import { mockFacilities, getStatusColor } from '../data/mockData';

interface ThreeDViewProps {
  event: ThermalAnomaly;
  onClose: () => void;
}

export const ThreeDView: React.FC<ThreeDViewProps> = ({ event, onClose }) => {
  const mapRef = useRef<MapRef>(null);
  const facility = mockFacilities.find(f => event.distanceToIndustrial < 1000) || mockFacilities[0];
  const color = getStatusColor(event.classification);

  const facilityGeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { height: 30, base_height: 0, color: '#27272a' }, // zinc-800
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [facility.lng - 0.005, facility.lat - 0.005],
            [facility.lng + 0.005, facility.lat - 0.005],
            [facility.lng + 0.005, facility.lat + 0.005],
            [facility.lng - 0.005, facility.lat + 0.005],
            [facility.lng - 0.005, facility.lat - 0.005]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: { height: 15, base_height: 0, color: '#3f3f46' }, // zinc-700
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [facility.lng - 0.002, facility.lat + 0.002],
            [facility.lng - 0.001, facility.lat + 0.002],
            [facility.lng - 0.001, facility.lat + 0.003],
            [facility.lng - 0.002, facility.lat + 0.003],
            [facility.lng - 0.002, facility.lat + 0.002]
          ]]
        }
      }
    ]
  };

  const anomalySize = 0.0005;
  const anomalyHeight = (event.frp / 200) * 100;
  
  const anomalyGeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { height: anomalyHeight, color: color },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [event.lng - anomalySize, event.lat - anomalySize],
            [event.lng + anomalySize, event.lat - anomalySize],
            [event.lng + anomalySize, event.lat + anomalySize],
            [event.lng - anomalySize, event.lat + anomalySize],
            [event.lng - anomalySize, event.lat - anomalySize]
          ]]
        }
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000] flex flex-col">
      <div className="flex justify-between items-center px-5 py-3 bg-[#09090b] border-b border-zinc-800 text-zinc-100 shadow-sm z-10">
        <h2 className="text-xs font-mono uppercase tracking-widest flex items-center gap-2">
          <Box className="w-4 h-4 text-zinc-500" />
          3D Analysis: {facility.name}
        </h2>
        <button onClick={onClose} className="p-1.5 hover:bg-zinc-800 transition-colors flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-zinc-400">
          <X className="w-3.5 h-3.5" />
          Close
        </button>
      </div>
      
      <div className="flex-1 relative">
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: event.lng,
            latitude: event.lat - 0.005,
            zoom: 15,
            pitch: 60,
            bearing: 0
          }}
          mapStyle={{
            version: 8,
            sources: {
              'raster-tiles': {
                type: 'raster',
                tiles: ['https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'],
                tileSize: 256
              }
            },
            layers: [{ id: 'simple-tiles', type: 'raster', source: 'raster-tiles', minzoom: 0, maxzoom: 22 }]
          }}
          interactiveLayerIds={[]}
        >
          <NavigationControl position="bottom-right" visualizePitch={true} />
          
          <Source id="facility-extrusion" type="geojson" data={facilityGeoJSON as any}>
            <Layer 
              id="facility-3d" 
              type="fill-extrusion" 
              paint={{
                'fill-extrusion-color': ['get', 'color'],
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-base': ['get', 'base_height'],
                'fill-extrusion-opacity': 0.8
              }} 
            />
          </Source>

          <Source id="anomaly-extrusion" type="geojson" data={anomalyGeoJSON as any}>
            <Layer 
              id="anomaly-3d" 
              type="fill-extrusion" 
              paint={{
                'fill-extrusion-color': ['get', 'color'],
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-opacity': 0.9,
                'fill-extrusion-vertical-gradient': true
              }} 
            />
          </Source>
        </Map>

        <div className="absolute bottom-8 left-8 bg-[#09090b] border border-zinc-800 p-4 w-80 shadow-2xl">
          <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-mono">Visualizing</div>
          <div className="text-sm font-semibold text-zinc-100 mb-3 uppercase tracking-wide" style={{ color }}>{event.classification}</div>
          <div className="space-y-1.5 text-[11px] font-mono text-zinc-400">
            <div className="flex justify-between"><span>Intensity (Height)</span><span className="text-zinc-200">{event.frp} MW</span></div>
            <div className="flex justify-between"><span>Offset Distance</span><span className="text-zinc-200">{event.distanceToIndustrial} m</span></div>
          </div>
          <p className="text-[10px] text-zinc-600 mt-4 font-mono uppercase tracking-widest">
            // Rendered via simulated footprint data //
          </p>
        </div>
      </div>
    </div>
  );
};
