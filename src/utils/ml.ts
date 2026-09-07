import { ThermalAnomaly } from '../types';
import { mockAnomalies } from '../data/mockData';

// Simulated ML prediction function
export const classifyAnomaly = async (anomalyId: string): Promise<ThermalAnomaly | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const anomaly = mockAnomalies.find(a => a.id === anomalyId);
      if (anomaly) {
        resolve(anomaly);
      } else {
        resolve(null);
      }
    }, 1500); // Simulate network/processing delay
  });
};
