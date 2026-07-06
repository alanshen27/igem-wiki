"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PenLine, Hammer, FlaskConical, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const PHASES = [
  { key: "design", label: "Design", icon: PenLine, accent: "var(--color-signal)", blurb: "Define the target signal and the biological logic that could read it." },
  { key: "build", label: "Build", icon: Hammer, accent: "var(--color-butter)", blurb: "Assemble constructs, select parts, and prepare the assay." },
  { key: "test", label: "Test", icon: FlaskConical, accent: "var(--color-bio)", blurb: "Characterise behaviour against controls and expected outputs." },
  { key: "learn", label: "Learn", icon: Lightbulb, accent: "var(--color-pink)", blurb: "Interpret results, then feed insight back into the next design." },
];

/** DBTL wheel — four phases arranged in a circle; hover/tap to focus one. */
export function DbtlWheel({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const radius = 96;

  return (
    <div className={cn("flex flex-col items-center gap-8 lg:flex-row lg:gap-12", className)}>
      <div className="relative h-[280px] w-[280px] shrink-0">
        {/* Rotating connective ring */}
        <svg viewBox="0 0 280 280" className="absolute inset-0 h-full w-full">
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="var(--color-ink)"
            strokeOpacity="0.12"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <motion.circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke={PHASES[active].accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * radius}
            animate={{ strokeDashoffset: 2 * Math.PI * radius * (1 - (active + 1) / 4) }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            transform="rotate(-90 140 140)"
          />
        </svg>

        {PHASES.map((p, i) => {
          const angle = (i / PHASES.length) * Math.PI * 2 - Math.PI / 2;
          const x = 140 + Math.cos(angle) * radius;
          const y = 140 + Math.sin(angle) * radius;
          const Icon = p.icon;
          const isActive = i === active;
          return (
            <button
              key={p.key}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`${p.label} phase`}
              aria-pressed={isActive}
              className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-300"
              style={{
                left: x,
                top: y,
                background: isActive ? p.accent : "var(--color-milk)",
                borderColor: isActive ? p.accent : "color-mix(in srgb, var(--color-ink) 15%, transparent)",
                transform: `translate(-50%, -50%) scale(${isActive ? 1.12 : 1})`,
              }}
            >
              <Icon className="h-6 w-6" style={{ color: isActive ? "var(--color-ink)" : "var(--color-ink)" }} aria-hidden />
            </button>
          );
        })}

        {/* Center label */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="kicker text-ink-40">cycle</p>
          <p className="font-display text-2xl text-ink">DBTL</p>
        </div>
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-sm"
      >
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.68rem] uppercase tracking-widest"
          style={{ background: `color-mix(in srgb, ${PHASES[active].accent} 18%, transparent)`, color: "var(--color-ink)" }}
        >
          Phase {active + 1} / 4
        </div>
        <h4 className="font-display text-3xl text-ink">{PHASES[active].label}</h4>
        <p className="mt-2 text-ink-70 leading-relaxed">{PHASES[active].blurb}</p>
      </motion.div>
    </div>
  );
}
