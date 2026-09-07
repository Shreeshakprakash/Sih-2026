import { ArrowRight, CheckCircle2, ChevronRight, Clock3, Flame, Globe2, Layers3, Radar, Radio, Satellite, ShieldAlert, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/Button";
import { ClassificationBadge } from "@/components/ClassificationBadge";
import { DemoScenarioBar } from "@/components/DemoScenarioBar";
import { Modal } from "@/components/Modal";
import { OrbitalGlobe } from "@/components/OrbitalGlobe";
import { Panel } from "@/components/Panel";
import { StatCard } from "@/components/StatCard";
import { classificationBreakdown, dashboardStats, hourlyTrend, thermalEvents, type ThermalEvent } from "@/lib/mockData";
import { getEventById, getStatistics } from "@/services/thermaguardService";

const workflow = [
  { number: "01", label: "NASA FIRMS", detail: "Near-real-time orbital sensor feed", icon: Satellite, tone: "cyan" },
  { number: "02", label: "Thermal Anomaly", detail: "Brightness and FRP signal extraction", icon: Flame, tone: "amber" },
  { number: "03", label: "OSM Context", detail: "Land use and infrastructure context", icon: Layers3, tone: "gold" },
  { number: "04", label: "Satellite Evidence", detail: "Cross-pass and sensor corroboration", icon: Radar, tone: "cyan" },
  { number: "05", label: "Spatial + Temporal", detail: "Persistence, clustering, and proximity", icon: Globe2, tone: "amber" },
  { number: "06", label: "AI Classification", detail: "Confidence-weighted anomaly label", icon: Sparkles, tone: "gold" },
  { number: "07", label: "GIS Visualization", detail: "Analyst-ready operating picture", icon: CheckCircle2, tone: "cyan" },
] as const;

function priorityFor(event: ThermalEvent) {
  if (event.confidence >= 95 || event.frp >= 35) return { label: "High", className: "border-[#803f38] bg-[#492826] text-[#ff9c81]" };
  if (event.confidence >= 85) return { label: "Elevated", className: "border-[#75542e] bg-[#40331f] text-[#ebba67]" };
  return { label: "Routine", className: "border-[#3d5660] bg-[#26343a] text-[#a8bec3]" };
}

export default function Dashboard() {
  const [selectedEvent, setSelectedEvent] = useState<ThermalEvent | null>(null);
  const heroEvents = thermalEvents.slice(0, 6);
  const liveStats = getStatistics(1);
  const stats = [
    { label: "Active Thermal Events", value: liveStats.total.toLocaleString(), delta: "+12.6%", direction: "up" as const, note: "detected in the last 24h", accent: "amber" as const, icon: <Flame size={15} /> },
    { label: "Industrial Sources", value: liveStats.industrial.toLocaleString(), delta: "+4.8%", direction: "up" as const, note: "AI-assisted industrial class", accent: "cyan" as const, icon: <Satellite size={15} /> },
    { label: "Persistent Sources", value: liveStats.persistent.toLocaleString(), delta: "+6.2%", direction: "up" as const, note: "recurring coordinates", accent: "gold" as const, icon: <Radio size={15} /> },
    { label: "High Priority Events", value: liveStats.highRisk.toLocaleString(), delta: "+7.4%", direction: "up" as const, note: "requiring analyst attention", accent: "coral" as const, icon: <ShieldAlert size={15} /> },
  ];

  return <div className="space-y-8 pb-8">
    <DemoScenarioBar onSelect={(scenario) => setSelectedEvent(getEventById(scenario.eventId))} />
    <section className="mission-hero reveal-up grid gap-5 xl:grid-cols-[minmax(380px,0.9fr)_minmax(0,1.1fr)]">
      <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[4px] border border-[#304e5a] bg-[radial-gradient(circle_at_8%_12%,rgba(217,155,62,0.12),transparent_26%),linear-gradient(145deg,#0d1c25,#0b151d_62%,#11242b)] p-7 lg:min-h-[520px] lg:p-9">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d19a47]/20 bg-[radial-gradient(circle,rgba(205,150,63,0.13),transparent_64%)]" />
        <div className="relative"><div className="mb-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#d7a14b]"><span className="h-1.5 w-1.5 rounded-full bg-[#dca44f] shadow-[0_0_9px_#dca44f]" />Mission brief / 06 Sep 2026</div><h2 className="max-w-[520px] font-display text-[48px] font-semibold leading-[0.93] tracking-[-0.06em] text-[#eaf3f2] sm:text-[58px] lg:text-[60px] xl:text-[62px]">THERMAL<br /><span className="text-[#dda44a]">INTELLIGENCE</span></h2><p className="mt-7 max-w-[470px] text-[14px] leading-[1.7] text-[#9bb2b7]">AI-powered classification of satellite-detected thermal anomalies using spatial, temporal and geospatial evidence.</p></div>
        <div className="relative mt-10 flex flex-wrap gap-3"><Link href="/map"><Button size="lg"><Globe2 size={14} /> Explore live map <ArrowRight size={14} /></Button></Link><Link href="/events"><Button variant="outline" size="lg"><Radar size={14} /> View thermal events</Button></Link></div>
        <div className="relative mt-10 grid grid-cols-2 gap-3 border-t border-[#27424e] pt-5 sm:grid-cols-3"><div><p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#68838d]">Coverage</p><p className="mt-1 font-display text-[16px] font-semibold text-[#dcebed]">Global</p></div><div><p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#68838d]">Resolution</p><p className="mt-1 font-display text-[16px] font-semibold text-[#dcebed]">375 m</p></div><div className="col-span-2 sm:col-span-1"><p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#68838d]">Model confidence</p><p className="mt-1 font-display text-[16px] font-semibold text-[#72c6c8]">94.2%</p></div></div>
      </div>
      <OrbitalGlobe events={heroEvents} />
    </section>

    <section className="reveal-up delay-1 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
    </section>

    <section className="reveal-up delay-2 grid gap-5 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)]">
      <Panel title="Live Thermal Activity" eyebrow="Recent high-signal events / auto-ranked" action={<Link href="/events" className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#73b9bf] transition hover:text-white">View all events <ArrowRight className="ml-1 inline" size={12} /></Link>}>
        <div className="space-y-1">{heroEvents.slice(0, 4).map((event) => { const priority = priorityFor(event); return <button key={event.id} type="button" onClick={() => setSelectedEvent(event)} className="group grid w-full gap-3 border-b border-[#1d3540] py-4 text-left transition last:border-0 hover:bg-[#14252e] sm:grid-cols-[minmax(150px,1.25fr)_110px_80px_150px_70px] sm:items-center sm:px-3"><div className="min-w-0"><p className="truncate font-display text-[13px] font-semibold text-[#dcebed] transition group-hover:text-white">{event.location}</p><p className="mt-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-[#718b94]"><Clock3 size={10} /> {event.detectedAt.split(" · ")[1]} · {event.country}</p></div><div><p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#617c86]">FRP</p><p className="mt-1 font-mono text-[11px] text-[#d9a34b]">{event.frp} MW</p></div><div><p className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#617c86]">Conf.</p><p className="mt-1 font-mono text-[11px] text-[#8acfd0]">{event.confidence}%</p></div><div className="min-w-0"><ClassificationBadge classification={event.classification} compact /></div><div><span className={`inline-flex rounded-[3px] border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] ${priority.className}`}>{priority.label}</span></div></button>; })}</div>
        <div className="mt-4 flex items-center gap-2 border-t border-[#1f3945] pt-4 font-mono text-[9px] uppercase tracking-[0.12em] text-[#6f8992]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6bc8c8]" /> Stream updated 42 seconds ago <ChevronRight size={12} className="text-[#d9a34b]" /></div>
      </Panel>
      <Panel title="Activity pulse" eyebrow="Current orbital window" action={<Link href="/analytics" className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#73b9bf] hover:text-white">Analytics <ArrowRight className="ml-1 inline" size={12} /></Link>}>
        <div className="h-[215px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={hourlyTrend} margin={{ top: 6, right: 0, left: -24, bottom: 0 }}><defs><linearGradient id="heroPulse" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5eb9bf" stopOpacity={0.34} /><stop offset="100%" stopColor="#5eb9bf" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fill: "#6b858f", fontSize: 9, fontFamily: "IBM Plex Mono" }} dy={8} /><YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b858f", fontSize: 9, fontFamily: "IBM Plex Mono" }} /><Tooltip contentStyle={{ background: "#12222c", border: "1px solid #315666", borderRadius: 3, fontFamily: "IBM Plex Mono", fontSize: 10 }} /><Area type="monotone" dataKey="natural" name="Natural fires" stroke="#5eb9bf" fill="url(#heroPulse)" strokeWidth={2} /><Area type="monotone" dataKey="industrial" name="Industrial" stroke="#dfa04b" fill="transparent" strokeWidth={1.6} /></AreaChart></ResponsiveContainer></div>
        <div className="grid grid-cols-2 gap-2 border-t border-[#1d3540] pt-4">{classificationBreakdown.slice(0, 2).map((item) => <div key={item.name} className="rounded-[3px] border border-[#213d49] bg-[#0d1921] p-3"><div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} /><span className="font-mono text-[8px] uppercase tracking-[0.08em] text-[#759099]">{item.name}</span></div><p className="mt-2 font-display text-xl font-semibold text-[#dcebed]">{item.value}</p></div>)}</div>
      </Panel>
    </section>

    <section className="reveal-up delay-3"><div className="mb-5 flex items-end justify-between gap-4"><div><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d8a04a]">The intelligence pipeline</p><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-[#e0edef]">How intelligence works</h2></div><p className="hidden max-w-sm text-right text-[11px] leading-relaxed text-[#708991] md:block">From orbital observation to a confident, spatially-aware classification.</p></div><div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">{workflow.map(({ number, label, detail, icon: Icon, tone }, index) => <div key={label} className="relative rounded-[4px] border border-[#203746] bg-[#0e1a22] p-4 transition duration-200 hover:-translate-y-1 hover:border-[#3c6c75] hover:bg-[#12252e]"><div className="flex items-start justify-between"><span className={`flex h-8 w-8 items-center justify-center rounded-[3px] border ${tone === "amber" ? "border-[#805d2d] bg-[#382b1b] text-[#dfa34b]" : tone === "gold" ? "border-[#716635] bg-[#39351f] text-[#cec168]" : "border-[#2d6871] bg-[#173a40] text-[#73c9cb]"}`}><Icon size={15} /></span><span className="font-mono text-[9px] text-[#617d86]">{number}</span></div><p className="mt-4 font-display text-[13px] font-semibold text-[#dcebed]">{label}</p><p className="mt-2 text-[10px] leading-relaxed text-[#738c95]">{detail}</p>{index < workflow.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden translate-x-1/2 text-[#527783] xl:block">→</span>}</div>)}</div></section>

    <Modal isOpen={Boolean(selectedEvent)} onClose={() => setSelectedEvent(null)} title={selectedEvent?.location ?? "Thermal event"} eyebrow={selectedEvent?.id}>{selectedEvent && <div className="space-y-5"><div className="flex flex-wrap items-center gap-2"><ClassificationBadge classification={selectedEvent.classification} /><span className={`rounded-[3px] border px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] ${priorityFor(selectedEvent).className}`}>{priorityFor(selectedEvent).label} priority</span></div><p className="text-[14px] leading-relaxed text-[#a9bdc2]">{selectedEvent.description}</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[["Detection time", selectedEvent.detectedAt], ["FRP", `${selectedEvent.frp} MW`], ["Confidence", `${selectedEvent.confidence}%`], ["Coordinates", selectedEvent.coordinates]].map(([label, value]) => <div key={label} className="rounded-[3px] border border-[#254452] bg-[#0d1a22] p-3"><p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#6f8993]">{label}</p><p className="mt-2 font-display text-[12px] font-semibold leading-snug text-[#dcebed]">{value}</p></div>)}</div><div className="flex flex-wrap gap-2"><Link href={`/event/${selectedEvent.id}`}><Button size="sm">View full analysis <ArrowRight size={12} /></Button></Link><Link href="/map"><Button variant="outline" size="sm"><Globe2 size={12} /> Open live map</Button></Link></div></div>}</Modal>
  </div>;
}
