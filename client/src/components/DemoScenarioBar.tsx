import { FlaskConical, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { demoScenarios, type DemoScenario } from "@/services/thermaguardService";

export function DemoScenarioBar({ onSelect }: { onSelect?: (scenario: DemoScenario) => void }) {
  const [active, setActive] = useState(demoScenarios[0].id);
  const select = (scenario: DemoScenario) => { setActive(scenario.id); onSelect?.(scenario); };
  return <section className="rounded-[4px] border border-[#34555d] bg-gradient-to-r from-[#112b31] via-[#10212a] to-[#121c24] p-4 shadow-[0_12px_34px_rgba(0,0,0,0.18)]"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex items-start gap-3"><div className="rounded-[3px] border border-[#4b777a] bg-[#1a3d42] p-2 text-[#7bd0cf]"><FlaskConical size={16} /></div><div><p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#dca14c]">Demo mode / mock inference services</p><p className="mt-1 text-[12px] leading-relaxed text-[#b8ced0]">Load a scenario to trace the same anomaly through map, classification, fingerprint, context, and risk views.</p></div></div><div className="flex flex-wrap gap-2">{demoScenarios.map((scenario) => <Button key={scenario.id} variant={active === scenario.id ? "primary" : "secondary"} size="sm" onClick={() => select(scenario)}><Play size={11} />{scenario.label}</Button>)}</div></div></section>;
}
