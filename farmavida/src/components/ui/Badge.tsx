import type { ReactNode } from "react";

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "amber" | "forest" | "danger" }) {
  const toneClasses = {
    neutral: "bg-line/60 text-ink/70",
    amber: "bg-amber-50 text-amber-600",
    forest: "bg-forest-50 text-forest-700",
    danger: "bg-[#F5DCDC] text-[#A94442]",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses}`}>
      {children}
    </span>
  );
}
