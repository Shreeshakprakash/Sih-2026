import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Modal({ isOpen, onClose, title, eyebrow, children, className }: { isOpen: boolean; onClose: () => void; title: string; eyebrow?: string; children: ReactNode; className?: string }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="absolute inset-0 cursor-default bg-[#050b10]/80 backdrop-blur-sm" aria-label="Close modal" onClick={onClose} />
      <div className={cn("relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[4px] border border-[#35596a] bg-[#101b24] shadow-[0_25px_90px_rgba(0,0,0,0.5)]", className)}>
        <div className="flex items-start justify-between gap-4 border-b border-[#234150] px-6 py-5">
          <div>
            {eyebrow && <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#7a9aa5]">{eyebrow}</p>}
            <h2 className="font-display text-xl font-semibold text-[#e4eff0]">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-[3px] border border-[#294452] p-2 text-[#8ca3ac] transition hover:border-[#6a9aa4] hover:text-[#e0f0f0]" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
