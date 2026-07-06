"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Milk, TestTube, Cpu, LineChart, CheckCircle2 } from "lucide-react";
import { CowGlyph } from "./cow-herd";

type PipelineStep = {
  label: string;
  sub: string;
  accent: string;
  icon?: LucideIcon;
  cow?: boolean;
};

const STEPS: PipelineStep[] = [
  { label: "Cow", sub: "Welfare first", accent: "var(--color-ink)", cow: true },
  { label: "Milk sample", sub: "Taken at milking", icon: Milk, accent: "var(--color-orange)" },
  { label: "Biosensor", sub: "Recognition → signal", icon: TestTube, accent: "var(--color-signal)" },
  { label: "Readout", sub: "Colour / fluorescence", icon: Cpu, accent: "var(--color-butter)" },
  { label: "Data", sub: "Trend over time", icon: LineChart, accent: "var(--color-pink)" },
  { label: "Decision", sub: "Act earlier", icon: CheckCircle2, accent: "var(--color-bio)" },
];

/** FarmToLabPipeline — cow → milk → biosensor → readout → data → decision. */
export function FarmToLabPipeline() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-6 sm:gap-x-1">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            className="flex items-start gap-1 sm:gap-2"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <div className="flex w-[4.5rem] flex-col items-center gap-1.5 text-center sm:w-20">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink/10 sm:h-14 sm:w-14"
                style={{ background: `color-mix(in srgb, ${s.accent} 14%, var(--color-milk))` }}
              >
                {s.cow ? (
                  <CowGlyph className="h-7 w-7 text-ink-70 sm:h-8 sm:w-8" />
                ) : Icon ? (
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: s.accent }} aria-hidden />
                ) : null}
              </div>
              <div>
                <p className="text-xs font-semibold text-ink sm:text-sm">{s.label}</p>
                <p className="text-[0.65rem] leading-snug text-ink-55 sm:text-xs">{s.sub}</p>
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <span className="mt-5 hidden text-ink-40 sm:block" aria-hidden>
                →
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
