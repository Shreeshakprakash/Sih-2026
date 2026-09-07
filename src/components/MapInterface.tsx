import React, { useRef, useEffect } from 'react';
import Map, { Source, Layer, MapRef, Marker, NavigationControl } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ThermalAnomaly, IndustrialFacility } from '../types';
import { mockFacilities, mockAnomalies, getStatusColor } from '../data/mockData';
import { Target } from 'lucide-react';

interface MapInterfaceProps {
  onSelectAnomaly: (anomaly: ThermalAnomaly) => void;
  onSelectFacility: (facility: IndustrialFacility) => void;
  selectedAnomalyId?: string;
  selectedFacilityId?: string;
}

export const MapInterface: React.FC<MapInterfaceProps> = ({ 
  onSelectAnomaly, 
  onSelectFacility,
  selectedAnomalyId,
  selectedFacilityId
}) => {
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (selectedAnomalyId && mapRef.current) {
      const anomaly = mockAnomalies.find(a => a.id === selectedAnomalyId);
      if (anomaly) {
        mapRef.current.flyTo({ center: [anomaly.lng, anomaly.lat], zoom: 14, duration: 1500 });
      }
    }
  }, [selectedAnomalyId]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#000]">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 69.8,
          latitude: 22.1,
          zoom: 8,
          pitch: 0,
          bearing: 0
        }}
        mapStyle={{
          version: 8,
          sources: {
            'raster-tiles': {
              type: 'raster',
              tiles: [
                'https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
            }
          },
          layers: [
            {
              id: 'simple-tiles',
              type: 'raster',
              source: 'raster-tiles',
              minzoom: 0,
              maxzoom: 22
            }
          ]
        }}
        interactiveLayerIds={[]}
      >
        <NavigationControl position="bottom-right" />
        
        {/* Render Industrial Facilities */}
        {mockFacilities.map(facility => (
          <Marker 
            key={facility.id} 
            longitude={facility.lng} 
            latitude={facility.lat}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onSelectFacility(facility);
              mapRef.current?.flyTo({ center: [facility.lng, facility.lat], zoom: 14 });
            }}
          >
            <div 
              className={`w-4 h-4 border-2 bg-[#09090b]/80 cursor-pointer transition-transform hover:scale-110 flex items-center justify-center ${
                selectedFacilityId === facility.id ? 'border-zinc-300 z-20 scale-125' : 'border-zinc-600 z-10'
              }`}
            >
              <div className="w-1 h-1 bg-zinc-400" />
            </div>
          </Marker>
        ))}

        {/* Render Thermal Anomalies */}
        {mockAnomalies.map(anomaly => {
          const color = getStatusColor(anomaly.classification);
          const isSelected = selectedAnomalyId === anomaly.id;
          
          return (
            <Marker 
              key={anomaly.id} 
              longitude={anomaly.lng} 
              latitude={anomaly.lat}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                onSelectAnomaly(anomaly);
              }}
            >
              <div className={`relative cursor-pointer group flex items-center justify-center ${isSelected ? 'w-8 h-8' : 'w-4 h-4'}`}>
                {isSelected ? (
                  <>
                    {/* Targeting reticle for selected */}
                    <Target className="absolute w-8 h-8 z-20 animate-[spin_4s_linear_infinite]" style={{ color }} strokeWidth={1} />
                    <div className="w-2 h-2 z-30" style={{ backgroundColor: color }} />
                  </>
                ) : (
                  /* Standard square marker for unselected */
                  <div 
                    className="w-3 h-3 border border-[#09090b] transition-transform group-hover:scale-125 z-20"
                    style={{ backgroundColor: color, opacity: 0.9 }}
                  />
                )}
              </div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
};
