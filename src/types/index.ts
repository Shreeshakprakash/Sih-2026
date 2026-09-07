export type Classification = 
  | 'Industrial Fire'
  | 'Natural / Wildfire'
  | 'Agricultural Fire'
  | 'Persistent Industrial Thermal Source'
  | 'Other / Uncertain';

export type StatusColor = 'red' | 'orange' | 'green' | 'yellow' | 'gray';

export interface ThermalAnomaly {
  id: string;
  lat: number;
  lng: number;
  frp: number; // Fire Radiative Power (MW)
  brightness: number; // Brightness Temperature (K)
  confidence: number; // FIRMS confidence (0-100)
  timestamp: string; // ISO string
  satellite: 'VIIRS' | 'MODIS';
  
  // Enriched features
  distanceToIndustrial: number; // meters
  persistenceHours: number;
  spatialSpreadIndex: 'Low' | 'Medium' | 'High';
  historicalFrpDeviation: number; // percentage
  recurrenceScore: number; // 0-10
  landUse: string;
  
  // Classification output
  classification?: Classification;
  classificationConfidence?: number;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  probabilities?: Record<Classification, number>;
}

export interface IndustrialFacility {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  normalThermalRange: [number, number]; // [min, max] FRP
  currentThermalOutput: number;
  status: 'NORMAL' | 'ABNORMAL';
  nearbyEventsCount: number;
}
