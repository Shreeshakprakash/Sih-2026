import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[3px] border font-mono text-[10px] font-semibold uppercase tracking-[0.16em] transition duration-150 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.97] focus-visible:ring-1 focus-visible:ring-[#7fc8ce] disabled:pointer-events-none disabled:opacity-40",
        variant === "primary" && "border-[#e3ad4d] bg-[#d99837] text-[#111820] shadow-[0_0_22px_rgba(217,152,55,0.16)] hover:bg-[#edb357]",
        variant === "secondary" && "border-[#28485a] bg-[#162632] text-[#d7e7ed] hover:border-[#4c8ea1] hover:bg-[#1b3341]",
        variant === "ghost" && "border-transparent bg-transparent text-[#8da1ad] hover:border-[#294653] hover:bg-[#16242d] hover:text-[#dcebef]",
        variant === "outline" && "border-[#355365] bg-transparent text-[#b7c9d0] hover:border-[#70b7c4] hover:text-[#e3f3f4]",
        variant === "danger" && "border-[#7f3e39] bg-[#572b2b] text-[#ffc2ae] hover:bg-[#71312e]",
        size === "sm" && "h-8 px-3",
        size === "md" && "h-10 px-4",
        size === "lg" && "h-11 px-5",
        size === "icon" && "h-9 w-9 px-0",
        className,
      )}
      {...props}
    />
  );
});
