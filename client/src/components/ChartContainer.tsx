import type { ReactNode } from "react";
import { Panel } from "@/components/Panel";

export function ChartContainer({ title, eyebrow, action, children, className }: { title: string; eyebrow?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <Panel title={title} eyebrow={eyebrow} action={action} className={className}>{children}</Panel>;
}
