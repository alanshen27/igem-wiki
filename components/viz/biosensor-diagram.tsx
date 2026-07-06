"use client";

import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Droplet, ScanSearch, Zap, Eye } from "lucide-react";

type Stage = {
  icon: LucideIcon;
  label: string;
  desc: string;
  iconColor: string;
  glow: string;
};

const STAGES: Stage[] = [
  {
    icon: Droplet,
    label: "Input",
    desc: "Milk sample & biomarker",
    iconColor: "var(--color-milk)",
    glow: "var(--color-orange)",
  },
  {
    icon: ScanSearch,
    label: "Recognition",
    desc: "Biological sensing element binds target",
    iconColor: "var(--color-signal)",
    glow: "var(--color-signal)",
  },
  {
    icon: Zap,
    label: "Amplification",
    desc: "Genetic circuit boosts the signal",
    iconColor: "var(--color-butter)",
    glow: "var(--color-butter)",
  },
  {
    icon: Eye,
    label: "Output",
    desc: "Colour / fluorescence readout",
    iconColor: "var(--color-pink)",
    glow: "var(--color-pink)",
  },
];

const CYCLE = 4;
const STEP = CYCLE / STAGES.length;
const PULSE = STEP * 1.35;

const pulseTransition = (index: number) => ({
  duration: PULSE,
  delay: index * STEP,
  repeat: Infinity,
  repeatDelay: CYCLE - PULSE,
  ease: "easeInOut" as const,
});

const dotTravelTransition = (index: number) => ({
  duration: STEP,
  delay: index * STEP,
  repeat: Infinity,
  repeatDelay: CYCLE - STEP,
  ease: "easeInOut" as const,
});

const nodeTransition = (index: number) => ({
  duration: PULSE,
  delay: index * STEP,
  repeat: Infinity,
  repeatDelay: CYCLE - PULSE,
  ease: "easeInOut" as const,
});

/** One card in the biosensor pipeline — shared template, per-stage accent. */
function StageCard({ stage, index, reduce }: { stage: Stage; index: number; reduce: boolean }) {
  const Icon = stage.icon;

  return (
    <motion.div
      className="relative h-full rounded-2xl border border-milk/12 bg-ink-3 p-5"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={{
          background: `radial-gradient(ellipse 90% 80% at 18% 8%, color-mix(in srgb, ${stage.glow} 55%, transparent), transparent 68%)`,
        }}
        animate={reduce ? undefined : { opacity: [0, 0.95, 0] }}
        transition={reduce ? undefined : pulseTransition(index)}
        aria-hidden
      />

      <div className="relative">
        <Icon className="mb-4 h-6 w-6" style={{ color: stage.iconColor }} aria-hidden />
        <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-milk/40">
          0{index + 1}
        </p>
        <p className="mt-1 font-display text-xl text-milk">{stage.label}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-milk/55">{stage.desc}</p>
      </div>
    </motion.div>
  );
}

/** Standalone timeline above the cards: a node per stage + a dot travelling between them. */
function SignalTimeline({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative mb-6 hidden h-3 grid-cols-4 gap-4 lg:grid" aria-hidden>
      {STAGES.map((stage, i) => (
        <div key={stage.label} className="relative flex items-center justify-center">
          {/* Segment from this node's centre to the next node's centre */}
          {i < STAGES.length - 1 && (
            <div
              className="absolute left-1/2 top-1/2 -translate-y-1/2"
              style={{ width: "calc(100% + 1rem)" }}
            >
              <div className="h-px w-full bg-milk/15" />
              {!reduce && (
                <motion.span
                  className="absolute top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: stage.glow, boxShadow: `0 0 8px ${stage.glow}` }}
                  animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  transition={dotTravelTransition(i)}
                />
              )}
            </div>
          )}

          {/* Node marker, sits above its card and lights on its step */}
          <motion.span
            className="relative z-10 h-3 w-3 rounded-full border-2"
            style={{ borderColor: stage.glow, background: "var(--color-ink-3)" }}
            animate={
              reduce
                ? undefined
                : {
                    backgroundColor: ["var(--color-ink-3)", stage.glow, "var(--color-ink-3)"],
                    boxShadow: [
                      `0 0 0 0 transparent`,
                      `0 0 10px 1px ${stage.glow}`,
                      `0 0 0 0 transparent`,
                    ],
                  }
            }
            transition={reduce ? undefined : nodeTransition(i)}
          />
        </div>
      ))}
    </div>
  );
}

/** BiosensorDiagram — one component, four stages. Signal lights each card in turn. */
export function BiosensorDiagram() {
  const reduce = useReducedMotion();

  return (
    <div>
      <SignalTimeline reduce={!!reduce} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((stage, i) => (
          <StageCard key={stage.label} stage={stage} index={i} reduce={!!reduce} />
        ))}
      </div>
    </div>
  );
}
