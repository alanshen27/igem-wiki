"use client";

import { motion } from "motion/react";
import { Milk, TestTube, Cpu, LineChart, CheckCircle2 } from "lucide-react";
import { CowSilhouette } from "./cow-silhouette";

const STEPS = [
  { label: "Cow", sub: "Welfare first", node: "cow" },
  { label: "Milk sample", sub: "Taken at milking", icon: Milk, accent: "var(--color-milk)" },
  { label: "Biosensor", sub: "Recognition → signal", icon: TestTube, accent: "var(--color-signal)" },
  { label: "Readout", sub: "Colour / fluorescence", icon: Cpu, accent: "var(--color-butter)" },
  { label: "Data", sub: "Trend over time", icon: LineChart, accent: "var(--color-pink)" },
  { label: "Decision", sub: "Act earlier", icon: CheckCircle2, accent: "var(--color-bio)" },
];

/** FarmToLabPipeline — cow → milk → biosensor → readout → data → decision. */
export function FarmToLabPipeline() {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
      {STEPS.map((s, i) => (
        <motion.div
          key={s.label}
          className="flex items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="flex w-28 flex-col items-center gap-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-ink/10 bg-milk">
              {s.node === "cow" ? (
                <CowSilhouette className="w-12" glow={false} />
              ) : (
                s.icon && <s.icon className="h-7 w-7" style={{ color: s.accent }} aria-hidden />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{s.label}</p>
              <p className="text-xs text-ink-55">{s.sub}</p>
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <span className="hidden text-ink-40 sm:block" aria-hidden>
              →
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
