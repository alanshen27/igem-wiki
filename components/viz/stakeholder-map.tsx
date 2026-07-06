"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { STAKEHOLDERS } from "@/lib/content";
import { ACCENT_HEX } from "@/components/ui/badge";
import { Tractor, Stethoscope, Factory, Landmark, Users, GraduationCap } from "lucide-react";

const ICONS: Record<string, typeof Tractor> = {
  farmer: Tractor,
  vet: Stethoscope,
  processor: Factory,
  regulator: Landmark,
  consumer: Users,
  team: GraduationCap,
};

/**
 * StakeholderMap — AURA at the centre, stakeholders orbiting.
 * Nodes pulse; selecting one reveals "what we heard" and "how it changed our design".
 */
export function StakeholderMap() {
  const [active, setActive] = useState(STAKEHOLDERS[0].id);
  const current = STAKEHOLDERS.find((s) => s.id === active)!;
  const radius = 120;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
      <div className="relative mx-auto h-[320px] w-[320px]">
        {/* orbit rings */}
        <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="160" cy="160" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.1" />
          <circle cx="160" cy="160" r={radius - 40} fill="none" stroke="currentColor" strokeOpacity="0.06" />
        </svg>

        {/* center: AURA */}
        <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-ink text-milk shadow-lg">
          <span className="font-display text-lg tracking-tight">AURA</span>
          <span className="font-mono text-[0.55rem] uppercase tracking-widest text-milk/50">core</span>
        </div>

        {STAKEHOLDERS.map((s, i) => {
          const angle = (i / STAKEHOLDERS.length) * Math.PI * 2 - Math.PI / 2;
          const x = 160 + Math.cos(angle) * radius;
          const y = 160 + Math.sin(angle) * radius;
          const Icon = ICONS[s.id];
          const isActive = s.id === active;
          const hex = ACCENT_HEX[s.accent];
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              onMouseEnter={() => setActive(s.id)}
              aria-pressed={isActive}
              aria-label={s.role}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ left: x, top: y }}
            >
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full border bg-milk transition-transform duration-300 group-hover:scale-110"
                style={{ borderColor: isActive ? hex : "color-mix(in srgb, var(--color-ink) 15%, transparent)" }}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: `0 0 0 4px color-mix(in srgb, ${hex} 25%, transparent)` }}
                  />
                )}
                <Icon className="h-6 w-6" style={{ color: hex }} aria-hidden />
              </span>
              <span className="whitespace-nowrap text-[0.7rem] font-medium text-ink-70">{s.role}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="rounded-[var(--radius-card)] border border-ink/10 bg-milk/70 p-6"
        >
          <h4 className="font-display text-2xl text-ink">{current.role}</h4>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest" style={{ color: ACCENT_HEX[current.accent] }}>
                What we heard
              </p>
              <p className="mt-1 text-ink-70 leading-relaxed">{current.heard}</p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest" style={{ color: ACCENT_HEX[current.accent] }}>
                How it changed our design
              </p>
              <p className="mt-1 text-ink-70 leading-relaxed">{current.changed}</p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-ink-40">Remaining concern</p>
              <p className="mt-1 text-ink-55 leading-relaxed">{current.concern}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
