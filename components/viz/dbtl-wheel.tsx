"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import { PenLine, Hammer, FlaskConical, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const PHASES = [
  { key: "design", label: "Design", icon: PenLine, accent: "var(--color-signal)", blurb: "Define the target signal and the biological logic that could read it." },
  { key: "build", label: "Build", icon: Hammer, accent: "var(--color-butter)", blurb: "Assemble constructs, select parts, and prepare the assay." },
  { key: "test", label: "Test", icon: FlaskConical, accent: "var(--color-bio)", blurb: "Characterise behaviour against controls and expected outputs." },
  { key: "learn", label: "Learn", icon: Lightbulb, accent: "var(--color-pink)", blurb: "Interpret results, then feed insight back into the next design." },
];

const SIZE = 280;
const CENTER = SIZE / 2;
const RADIUS = 96;
const RING = 2 * Math.PI * RADIUS;

/**
 * DbtlWheel — pins while you scroll through four phases. Intro copy lives inside
 * the sticky frame so there isn't a huge dead zone above the wheel.
 */
export function DbtlWheel({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(3, Math.floor(v * 4)));
  });

  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const wheelY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 24, reduce ? 0 : -24]);
  const textY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -16, reduce ? 0 : 16]);

  return (
    <div ref={ref} className={cn("relative h-[165vh]", className)}>
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-16 sm:gap-10 sm:py-20">
        <div className="max-w-2xl text-center">
          <span className="kicker text-butter">Engineering</span>
          <p className="mt-3 text-sm leading-relaxed text-ink-70 sm:text-base">
            Five iterative cycles — each loop turns a question into a design, a build into a test,
            and a result into the next question.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          <motion.div style={{ y: wheelY }} className="relative h-[280px] w-[280px] shrink-0">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
              <motion.circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke="var(--color-ink)"
                strokeOpacity="0.12"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                style={{ transformOrigin: `${CENTER}px ${CENTER}px`, rotate: ringRotate }}
              />
              <motion.circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke={PHASES[active].accent}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={RING}
                animate={{ strokeDashoffset: RING * (1 - (active + 1) / 4) }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
              />
            </svg>

            {PHASES.map((p, i) => {
              const angle = (i / PHASES.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;
              const Icon = p.icon;
              const isActive = i === active;
              return (
                <motion.div
                  key={p.key}
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-full border"
                  style={{
                    marginLeft: -32,
                    marginTop: -32,
                    x,
                    y,
                    background: isActive ? p.accent : "var(--color-milk)",
                    borderColor: isActive ? p.accent : "color-mix(in srgb, var(--color-ink) 15%, transparent)",
                    scale: isActive ? 1.14 : 1,
                  }}
                  aria-hidden
                >
                  <Icon className="h-6 w-6 text-ink" />
                </motion.div>
              );
            })}

            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="kicker text-ink-40">cycle</p>
              <p className="font-display text-2xl text-ink">DBTL</p>
            </div>
          </motion.div>

          <motion.div style={{ y: textY }} className="max-w-sm px-2 text-center lg:text-left">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div
                className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest"
                style={{
                  background: `color-mix(in srgb, ${PHASES[active].accent} 18%, transparent)`,
                  color: "var(--color-ink)",
                }}
              >
                Phase {active + 1} / 4
              </div>
              <h4 className="font-display text-3xl text-ink">{PHASES[active].label}</h4>
              <p className="mt-2 leading-relaxed text-ink-70">{PHASES[active].blurb}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
