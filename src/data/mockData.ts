import { IndustrialFacility, ThermalAnomaly, Classification } from '../types';

export const mockFacilities: IndustrialFacility[] = [
  {
    id: 'FAC-001',
    name: 'Jamnagar Refinery Complex',
    type: 'Oil Refinery',
    lat: 22.3503,
    lng: 69.9610,
    normalThermalRange: [50, 80],
    currentThermalOutput: 184,
    status: 'ABNORMAL',
    nearbyEventsCount: 8,
  },
  {
    id: 'FAC-002',
    name: 'Nayara Energy Refinery',
    type: 'Oil Refinery',
    lat: 22.3275,
    lng: 69.7547,
    normalThermalRange: [30, 60],
    currentThermalOutput: 45,
    status: 'NORMAL',
    nearbyEventsCount: 2,
  },
  {
    id: 'FAC-003',
    name: 'Mundra Thermal Power Station',
    type: 'Power Plant',
    lat: 22.8256,
    lng: 69.5428,
    normalThermalRange: [100, 150],
    currentThermalOutput: 120,
    status: 'NORMAL',
    nearbyEventsCount: 5,
  }
];

export const mockAnomalies: ThermalAnomaly[] = [
  {
    id: 'TG-1042',
    lat: 22.3510,
    lng: 69.9620,
    frp: 184,
    brightness: 345.2,
    confidence: 92,
    timestamp: new Date().toISOString(),
    satellite: 'VIIRS',
    distanceToIndustrial: 180,
    persistenceHours: 4.2,
    spatialSpreadIndex: 'Low',
    historicalFrpDeviation: 143,
    recurrenceScore: 2,
    landUse: 'Industrial',
    classification: 'Industrial Fire',
    classificationConfidence: 94,
    priority: 'HIGH',
    probabilities: {
      'Industrial Fire': 94,
      'Persistent Industrial Thermal Source': 4,
      'Natural / Wildfire': 1,
      'Agricultural Fire': 0,
      'Other / Uncertain': 1,
    }
  },
  {
    id: 'TG-1043',
    lat: 22.3260,
    lng: 69.7550,
    frp: 45,
    brightness: 310.5,
    confidence: 85,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    satellite: 'MODIS',
    distanceToIndustrial: 150,
    persistenceHours: 72,
    spatialSpreadIndex: 'Low',
    historicalFrpDeviation: 5,
    recurrenceScore: 9,
    landUse: 'Industrial',
    classification: 'Persistent Industrial Thermal Source',
    classificationConfidence: 98,
    priority: 'LOW',
    probabilities: {
      'Industrial Fire': 1,
      'Persistent Industrial Thermal Source': 98,
      'Natural / Wildfire': 0,
      'Agricultural Fire': 0,
      'Other / Uncertain': 1,
    }
  },
  {
    id: 'TG-1044',
    lat: 21.1645,
    lng: 70.8035, // Gir Forest
    frp: 210,
    brightness: 355.1,
    confidence: 100,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    satellite: 'VIIRS',
    distanceToIndustrial: 45000,
    persistenceHours: 12,
    spatialSpreadIndex: 'High',
    historicalFrpDeviation: 0,
    recurrenceScore: 1,
    landUse: 'Forest',
    classification: 'Natural / Wildfire',
    classificationConfidence: 99,
    priority: 'CRITICAL',
    probabilities: {
      'Industrial Fire': 0,
      'Persistent Industrial Thermal Source': 0,
      'Natural / Wildfire': 99,
      'Agricultural Fire': 0,
      'Other / Uncertain': 1,
    }
  },
  {
    id: 'TG-1045',
    lat: 22.5000,
    lng: 70.1000,
    frp: 35,
    brightness: 305.2,
    confidence: 70,
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    satellite: 'MODIS',
    distanceToIndustrial: 12000,
    persistenceHours: 1.5,
    spatialSpreadIndex: 'Medium',
    historicalFrpDeviation: 0,
    recurrenceScore: 3,
    landUse: 'Agriculture',
    classification: 'Agricultural Fire',
    classificationConfidence: 88,
    priority: 'LOW',
    probabilities: {
      'Industrial Fire': 0,
      'Persistent Industrial Thermal Source': 0,
      'Natural / Wildfire': 5,
      'Agricultural Fire': 88,
      'Other / Uncertain': 7,
    }
  }
];

export const getStatusColor = (classification?: Classification): string => {
  switch (classification) {
    case 'Industrial Fire': return '#ef4444'; // Red
    case 'Persistent Industrial Thermal Source': return '#f97316'; // Orange
    case 'Natural / Wildfire': return '#10b981'; // Emerald
    case 'Agricultural Fire': return '#eab308'; // Yellow
    default: return '#71717a'; // Zinc
  }
};
