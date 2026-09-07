import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  noPadding?: boolean;
  accent?: "cyan" | "amber" | "coral" | "none";
};

export function Panel({ children, className, title, eyebrow, action, noPadding = false, accent = "none" }: PanelProps) {
  return (
    <section
      className={cn(
        "group relative overflow-hidden rounded-[4px] border border-[#203746] bg-[#101b24]/90 shadow-[0_14px_44px_rgba(0,0,0,0.22)] transition duration-200 ease-out hover:border-[#2b5360] hover:shadow-[0_16px_48px_rgba(0,0,0,0.27)]",
        accent === "cyan" && "border-[#245565]",
        accent === "amber" && "border-[#554629]",
        accent === "coral" && "border-[#59372f]",
        className,
      )}
    >
      {(title || eyebrow || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-[#1e3442] px-5 py-4">
          <div>
            {eyebrow && <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#728996]">{eyebrow}</p>}
            {title && <h2 className="font-display text-[15px] font-semibold tracking-[0.01em] text-[#dbe9ec]">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      <div className={cn(!noPadding && "p-5")}>{children}</div>
      <span className="pointer-events-none absolute right-0 top-0 h-[1px] w-20 bg-gradient-to-l from-transparent via-[#4a8998] to-transparent opacity-70" />
    </section>
  );
}
