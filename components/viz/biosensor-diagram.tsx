"use client";

import { motion } from "motion/react";
import { Droplet, ScanSearch, Zap, Eye } from "lucide-react";

const STAGES = [
  { icon: Droplet, label: "Input", desc: "Milk sample & biomarker", accent: "var(--color-milk)" },
  { icon: ScanSearch, label: "Recognition", desc: "Biological sensing element binds target", accent: "var(--color-signal)" },
  { icon: Zap, label: "Amplification", desc: "Genetic circuit boosts the signal", accent: "var(--color-butter)" },
  { icon: Eye, label: "Output", desc: "Colour / fluorescence readout", accent: "var(--color-pink)" },
];

/** BiosensorDiagram — input → recognition → amplification → output. */
export function BiosensorDiagram() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STAGES.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            className="relative rounded-2xl border border-milk/12 bg-ink-3/70 p-5"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div
              className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ background: `color-mix(in srgb, ${s.accent} 18%, transparent)` }}
            >
              <Icon className="h-5 w-5" style={{ color: s.accent }} aria-hidden />
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-milk/40">
              0{i + 1}
            </p>
            <p className="mt-1 font-display text-xl text-milk">{s.label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-milk/55">{s.desc}</p>
            {i < STAGES.length - 1 && (
              <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-signal">→</div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
