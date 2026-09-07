import { thermalEvents, type ThermalEvent } from "@/lib/mockData";

export type GuardClassification =
  | "Industrial Fire"
  | "Persistent Industrial Heat"
  | "Agricultural / Vegetation Fire"
  | "Other / Uncertain";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type DemoScenario = {
  id: "industrial" | "persistent" | "agricultural";
  label: string;
  description: string;
  eventId: string;
};

export type RiskAssessment = {
  score: number;
  level: RiskLevel;
  factors: { label: string; value: number; max: number }[];
  disclaimer: string;
};

export type ThermalFingerprint = {
  label: string;
  value: string;
  tone: "coral" | "amber" | "cyan" | "gold" | "muted";
}[];

export type AlertItem = {
  id: string;
  severity: RiskLevel;
  title: string;
  time: string;
  location: string;
  classification: GuardClassification;
  reason: string;
  eventId: string;
};

export const demoScenarios: DemoScenario[] = [
  { id: "industrial", label: "Industrial Fire", description: "High-intensity anomaly adjacent to a mapped steel complex.", eventId: "FRM-2026-0906-004" },
  { id: "persistent", label: "Persistent Industrial Heat Source", description: "Recurring nighttime activity aligned with the Sohar refinery corridor.", eventId: "FRM-2026-0906-001" },
  { id: "agricultural", label: "Agricultural / Vegetation Fire", description: "Low-intensity repeated detections across cultivated parcels.", eventId: "FRM-2026-0906-003" },
];

const classificationFor = (event: ThermalEvent): GuardClassification => {
  if (event.classification === "Industrial Fire") return "Industrial Fire";
  if (event.classification === "Persistent Industrial Thermal Source") return "Persistent Industrial Heat";
  if (event.classification === "Agricultural Burning" || event.classification === "Natural/Forest Fire") return "Agricultural / Vegetation Fire";
  return "Other / Uncertain";
};

export function getEventById(id?: string) {
  return thermalEvents.find((event) => event.id === id) ?? thermalEvents[3];
}

export function getGuardClassification(event: ThermalEvent) {
  return classificationFor(event);
}

export function getRiskAssessment(event: ThermalEvent): RiskAssessment {
  const industrial = event.classification.includes("Industrial") ? 20 : 8;
  const thermal = Math.min(25, Math.round(event.frp * 0.72));
  const exposure = event.classification.includes("Industrial") ? 16 : event.classification.includes("Agricultural") ? 9 : 11;
  const critical = event.classification.includes("Industrial") ? 11 : 6;
  const temporal = event.classification.includes("Persistent") ? 10 : event.confidence > 90 ? 8 : 5;
  const satellite = Math.min(10, Math.round(event.confidence / 10));
  const score = thermal + industrial + exposure + critical + temporal + satellite;
  const level: RiskLevel = score >= 81 ? "CRITICAL" : score >= 61 ? "HIGH" : score >= 31 ? "MEDIUM" : "LOW";
  return {
    score,
    level,
    factors: [
      { label: "Thermal intensity", value: thermal, max: 25 },
      { label: "Industrial exposure", value: industrial, max: 20 },
      { label: "Population exposure", value: exposure, max: 20 },
      { label: "Critical facilities", value: critical, max: 15 },
      { label: "Temporal escalation", value: temporal, max: 10 },
      { label: "Satellite confidence", value: satellite, max: 10 },
    ],
    disclaimer: "Prototype risk-prioritization score for decision support; not an official emergency-service assessment.",
  };
}

export function getThermalFingerprint(event: ThermalEvent): ThermalFingerprint {
  const persistent = event.classification.includes("Persistent");
  const industrial = event.classification.includes("Industrial");
  return [
    { label: "Intensity", value: event.frp > 35 ? "HIGH" : event.frp > 20 ? "ELEVATED" : "MODERATE", tone: event.frp > 35 ? "coral" : "amber" },
    { label: "Persistence", value: persistent ? "VERY HIGH" : industrial ? "LOW" : "MEDIUM", tone: persistent ? "cyan" : "muted" },
    { label: "Industrial proximity", value: industrial ? "VERY HIGH" : "LOW", tone: industrial ? "coral" : "muted" },
    { label: "Population exposure", value: industrial ? "MEDIUM" : "LOW", tone: "gold" },
    { label: "Temporal trend", value: persistent ? "RECURRING" : event.confidence > 90 ? "RISING" : "STABLE", tone: "amber" },
    { label: "Satellite confidence", value: event.confidence > 90 ? "HIGH" : "MODERATE", tone: "cyan" },
  ];
}

export function getAlerts(): AlertItem[] {
  return [
    { id: "ALT-1042", severity: "CRITICAL", title: "Industrial fire detected near steel complex", time: "2 min ago", location: "Taranto Steel Complex · Italy", classification: "Industrial Fire", reason: "High FRP and rapid intensity increase within mapped industrial infrastructure.", eventId: "FRM-2026-0906-004" },
    { id: "ALT-1039", severity: "HIGH", title: "Persistent thermal signature confirmed", time: "8 min ago", location: "Sohar Industrial Port · Oman", classification: "Persistent Industrial Heat", reason: "Recurring nighttime activity across 18 cross-pass observations.", eventId: "FRM-2026-0906-001" },
    { id: "ALT-1034", severity: "MEDIUM", title: "Agricultural burn cluster under review", time: "23 min ago", location: "Al-Jouf Agricultural Belt · Saudi Arabia", classification: "Agricultural / Vegetation Fire", reason: "Repeated low-intensity detections adjacent to cultivated parcels.", eventId: "FRM-2026-0906-003" },
    { id: "ALT-1028", severity: "LOW", title: "Low-confidence anomaly awaiting confirmation", time: "41 min ago", location: "Pampas del Heath · Peru", classification: "Other / Uncertain", reason: "Single-pass detection with limited contextual evidence.", eventId: "FRM-2026-0906-006" },
  ];
}

export function getHistoricalData(days: number) {
  const base = days === 1 ? 0.16 : days === 7 ? 0.62 : days === 30 ? 1 : 1.35;
  return ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"].map((label, index) => ({
    label,
    anomalies: Math.round([72, 88, 106, 126, 158, 149, 135][index] * base),
    frp: Number(([18.2, 21.4, 28.6, 34.8, 42.1, 37.5, 31.8][index] * (0.86 + base * 0.14)).toFixed(1)),
    industrial: Math.round([8, 11, 15, 21, 29, 26, 23][index] * base),
    persistent: Math.round([14, 18, 22, 27, 35, 33, 30][index] * base),
    highRisk: Math.round([4, 6, 9, 12, 18, 16, 13][index] * base),
  }));
}

export function getStatistics(days: number) {
  const factor = days === 1 ? 1 : days === 7 ? 4.4 : days === 30 ? 18.5 : 24;
  return {
    total: Math.round(127 * factor),
    highRisk: Math.round(18 * factor),
    industrial: Math.round(11 * factor),
    persistent: Math.round(34 * factor),
    averageFrp: Number((27.4 * (0.9 + Math.min(factor, 18.5) * 0.012)).toFixed(1)),
    confidence: Math.round(82 + Math.min(factor, 18.5) * 0.32),
  };
}

export const infrastructureContext = [
  { label: "Chemical manufacturing plant", distance: "180 m", tone: "coral" },
  { label: "Highway / logistics corridor", distance: "250 m", tone: "amber" },
  { label: "Residential area", distance: "420 m", tone: "gold" },
  { label: "Hospital", distance: "1.4 km", tone: "cyan" },
  { label: "School", distance: "2.1 km", tone: "cyan" },
  { label: "Water body", distance: "3.8 km", tone: "muted" },
] as const;
