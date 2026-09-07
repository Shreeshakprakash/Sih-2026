export type Classification =
  | "Industrial Fire"
  | "Natural/Forest Fire"
  | "Agricultural Burning"
  | "Persistent Industrial Thermal Source"
  | "Unclassified";

export type EventStatus = "Investigating" | "Confirmed" | "Monitoring";

export type ThermalEvent = {
  id: string;
  location: string;
  country: string;
  region: string;
  classification: Classification;
  status: EventStatus;
  confidence: number;
  frp: number;
  brightness: number;
  detectedAt: string;
  satellite: string;
  coordinates: string;
  latitude: number;
  longitude: number;
  description: string;
};

export const classificationMeta: Record<Classification, { label: string; color: string; short: string }> = {
  "Industrial Fire": { label: "Industrial Fire", color: "#ef6b57", short: "IND" },
  "Natural/Forest Fire": { label: "Agricultural / Vegetation Fire", color: "#f4a64d", short: "NAT" },
  "Agricultural Burning": { label: "Agricultural Burning", color: "#c7b766", short: "AGR" },
  "Persistent Industrial Thermal Source": { label: "Persistent Industrial Heat", color: "#57b8c6", short: "PIS" },
  Unclassified: { label: "Other / Uncertain", color: "#8793a5", short: "UNK" },
};

export const thermalEvents: ThermalEvent[] = [
  {
    id: "FRM-2026-0906-001",
    location: "Sohar Industrial Port",
    country: "Oman",
    region: "Middle East",
    classification: "Persistent Industrial Thermal Source",
    status: "Monitoring",
    confidence: 98,
    frp: 42.8,
    brightness: 367.4,
    detectedAt: "06 Sep 2026 · 03:42 UTC",
    satellite: "Suomi NPP / VIIRS",
    coordinates: "24.348° N, 56.721° E",
    latitude: 24.348,
    longitude: 56.721,
    description: "Recurring high-confidence thermal signature aligned with the port's refining and export corridor.",
  },
  {
    id: "FRM-2026-0906-002",
    location: "Sierra de la Macarena",
    country: "Colombia",
    region: "South America",
    classification: "Natural/Forest Fire",
    status: "Investigating",
    confidence: 93,
    frp: 31.6,
    brightness: 343.8,
    detectedAt: "06 Sep 2026 · 03:27 UTC",
    satellite: "NOAA-20 / VIIRS",
    coordinates: "2.992° N, 73.943° W",
    latitude: 2.992,
    longitude: -73.943,
    description: "Clustered detections on a forest edge with wind-aligned spread vector and elevated persistence.",
  },
  {
    id: "FRM-2026-0906-003",
    location: "Al-Jouf Agricultural Belt",
    country: "Saudi Arabia",
    region: "Middle East",
    classification: "Agricultural Burning",
    status: "Confirmed",
    confidence: 89,
    frp: 19.4,
    brightness: 326.1,
    detectedAt: "06 Sep 2026 · 03:12 UTC",
    satellite: "Suomi NPP / VIIRS",
    coordinates: "29.883° N, 39.912° E",
    latitude: 29.883,
    longitude: 39.912,
    description: "Low-intensity, repeated detections adjacent to cultivated parcels and harvest staging areas.",
  },
  {
    id: "FRM-2026-0906-004",
    location: "Taranto Steel Complex",
    country: "Italy",
    region: "Europe",
    classification: "Industrial Fire",
    status: "Investigating",
    confidence: 91,
    frp: 27.1,
    brightness: 351.8,
    detectedAt: "06 Sep 2026 · 02:58 UTC",
    satellite: "NOAA-20 / VIIRS",
    coordinates: "40.471° N, 17.234° E",
    latitude: 40.471,
    longitude: 17.234,
    description: "Single-pass high-temperature anomaly proximal to heavy industrial infrastructure.",
  },
  {
    id: "FRM-2026-0906-005",
    location: "Central Kalimantan",
    country: "Indonesia",
    region: "Southeast Asia",
    classification: "Natural/Forest Fire",
    status: "Monitoring",
    confidence: 91,
    frp: 36.7,
    brightness: 338.9,
    detectedAt: "06 Sep 2026 · 02:41 UTC",
    satellite: "Suomi NPP / VIIRS",
    coordinates: "1.904° S, 113.488° E",
    latitude: -1.904,
    longitude: 113.488,
    description: "Peatland-adjacent thermal cluster with diffuse plume geometry and overnight recurrence.",
  },
  {
    id: "FRM-2026-0906-006",
    location: "Pampas del Heath",
    country: "Peru",
    region: "South America",
    classification: "Unclassified",
    status: "Investigating",
    confidence: 64,
    frp: 11.3,
    brightness: 309.2,
    detectedAt: "06 Sep 2026 · 02:25 UTC",
    satellite: "NOAA-20 / VIIRS",
    coordinates: "12.761° S, 69.493° W",
    latitude: -12.761,
    longitude: -69.493,
    description: "Isolated low-confidence detection; awaiting cross-pass confirmation and land-use context.",
  },
];

export const dashboardStats = [
  { label: "Active thermal anomalies", value: "1,284", delta: "+12.6%", direction: "up" as const, note: "vs. previous 24h", accent: "amber" as const },
  { label: "High-confidence industrial", value: "216", delta: "+4.8%", direction: "up" as const, note: "confidence ≥ 85%", accent: "coral" as const },
  { label: "Natural fire clusters", value: "743", delta: "−3.1%", direction: "down" as const, note: "clustered detections", accent: "gold" as const },
  { label: "Mean revisit latency", value: "11.4m", delta: "−18.2%", direction: "down" as const, note: "target < 15m", accent: "cyan" as const },
];

export const hourlyTrend = [
  { time: "00:00", industrial: 28, natural: 62, ag: 18 },
  { time: "04:00", industrial: 34, natural: 54, ag: 22 },
  { time: "08:00", industrial: 42, natural: 49, ag: 28 },
  { time: "12:00", industrial: 58, natural: 71, ag: 41 },
  { time: "16:00", industrial: 76, natural: 86, ag: 53 },
  { time: "20:00", industrial: 68, natural: 79, ag: 47 },
  { time: "24:00", industrial: 61, natural: 73, ag: 38 },
];

export const weeklyTrend = [
  { day: "29 Aug", total: 874, highConfidence: 121 },
  { day: "30 Aug", total: 962, highConfidence: 144 },
  { day: "31 Aug", total: 1044, highConfidence: 161 },
  { day: "01 Sep", total: 1102, highConfidence: 177 },
  { day: "02 Sep", total: 1186, highConfidence: 184 },
  { day: "03 Sep", total: 1140, highConfidence: 201 },
  { day: "06 Sep", total: 1284, highConfidence: 216 },
];

export const classificationBreakdown = [
  { name: "Natural / Forest", value: 743, color: "#f4a64d" },
  { name: "Persistent industrial", value: 216, color: "#57b8c6" },
  { name: "Industrial fire", value: 142, color: "#ef6b57" },
  { name: "Agricultural", value: 129, color: "#c7b766" },
  { name: "Unclassified", value: 54, color: "#8793a5" },
];

export const regionBreakdown = [
  { region: "South America", count: 382, share: 30 },
  { region: "Southeast Asia", count: 294, share: 23 },
  { region: "Sub-Saharan Africa", count: 244, share: 19 },
  { region: "Middle East", count: 186, share: 14 },
  { region: "North America", count: 104, share: 8 },
  { region: "Other monitored", count: 74, share: 6 },
];

export const telemetryItems = [
  { label: "VIIRS NPP", value: "Nominal", detail: "2.1 min ago", tone: "cyan" },
  { label: "VIIRS NOAA-20", value: "Nominal", detail: "6.8 min ago", tone: "cyan" },
  { label: "Geolocation engine", value: "Nominal", detail: "0.4s latency", tone: "cyan" },
  { label: "Classifier queue", value: "Degraded", detail: "37 pending", tone: "amber" },
];
