"use client";

import { CountUp } from "@/components/motion/count-up";
import { ACCENT_HEX, type Accent } from "@/components/ui/badge";
import type { Stat } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Kinetic stat card with count-up on view. */
export function StatCard({ stat, onDark = false }: { stat: Stat; onDark?: boolean }) {
  const hex = ACCENT_HEX[stat.accent as Accent];
  // Special-case the non-numeric displays so they still read cleanly.
  const isRange = stat.value.includes("–");
  const isRatio = stat.value.includes("in");

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-card)] border p-6 transition-all duration-300 hover:-translate-y-1",
        onDark ? "border-milk/12 bg-ink-3/60" : "border-ink/10 bg-milk/70",
      )}
    >
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-xl transition-opacity group-hover:opacity-40"
        style={{ background: hex }}
        aria-hidden
      />
      <div
        className="mb-4 h-1 w-10 rounded-full"
        style={{ background: hex }}
        aria-hidden
      />
      <div className={cn("font-display text-5xl tracking-tight", onDark ? "text-milk" : "text-ink")}>
        {isRange || isRatio ? (
          <span>{stat.value}</span>
        ) : (
          <CountUp
            to={stat.to}
            prefix={stat.prefix}
            suffix={stat.suffix}
            decimals={stat.decimals ?? 0}
          />
        )}
      </div>
      <p className={cn("mt-3 font-medium", onDark ? "text-milk" : "text-ink")}>{stat.label}</p>
      <p className={cn("mt-1.5 text-sm leading-relaxed", onDark ? "text-milk/55" : "text-ink-55")}>
        {stat.sub}
      </p>
    </div>
  );
}
