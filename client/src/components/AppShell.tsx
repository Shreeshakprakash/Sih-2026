import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { formatUtcTimestamp } from "@/lib/time";

const pageMeta: Record<string, { eyebrow: string; title: string; description: string }> = {
  "/dashboard": { eyebrow: "Thermaguard / live monitoring", title: "Live monitoring dashboard", description: "Global operating picture for active thermal anomalies, risk, and classification signals." },
  "/events": { eyebrow: "Thermaguard / anomaly registry", title: "Thermal anomaly events", description: "Review, triage, and classify detections from the latest satellite passes." },
  "/map": { eyebrow: "Thermaguard / geospatial operations", title: "Thermal anomaly map", description: "Explore thermal activity, geographic context, and persistent source signatures." },
  "/history": { eyebrow: "Thermaguard / temporal intelligence", title: "Historical analysis", description: "Compare anomaly volume, intensity, persistence, and risk across observation windows." },
  "/risk-alerts": { eyebrow: "Thermaguard / early warning", title: "Risk & alerts", description: "Prioritize analyst attention with transparent prototype risk intelligence." },
  "/osm-context": { eyebrow: "Thermaguard / geographic context", title: "OSM context intelligence", description: "Use mapped infrastructure and land-use context to strengthen anomaly classification." },
  "/classification": { eyebrow: "Thermaguard / explainable AI", title: "Classification intelligence", description: "Understand how multiple evidence sources combine into an AI-assisted result." },
  "/about": { eyebrow: "Thermaguard / system methodology", title: "About THERMAGUARD AI", description: "A clear operating picture for teams turning thermal observations into decisions." },
};

export function AppShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const meta = location.startsWith("/event/")
    ? { eyebrow: "Thermaguard / selected anomaly", title: "Anomaly intelligence", description: "Explainable thermal, spatial, temporal, satellite, and GIS evidence for one selected anomaly." }
    : pageMeta[location] ?? pageMeta["/dashboard"];
  return <div className="min-h-screen bg-[#081118] text-[#d7e5e7]"><Navbar /><div className="mx-auto flex max-w-[1440px] gap-5 px-5 py-6 lg:gap-7 lg:px-8 lg:py-8"><Sidebar activeLayer={location === "/map" ? "Thermal detections" : undefined} /><main className="min-w-0 flex-1"><div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#1d3542] pb-6 sm:flex-row sm:items-end"><div><p className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#7c9aa4]">{meta.eyebrow}</p><h1 className="font-display text-[28px] font-semibold tracking-[-0.035em] text-[#e8f2f2] sm:text-[32px]">{meta.title}</h1><p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#77909a]">{meta.description}</p></div><div className="flex shrink-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#68828c]"><span className="text-[#c59749]">UTC</span><span>{formatUtcTimestamp(now)}</span></div></div>{children}</main></div></div>;
}
