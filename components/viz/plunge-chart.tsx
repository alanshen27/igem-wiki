"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

// A jagged, downward "market crash" trace with a few dead-cat bounces.
const LINE = "M6 22 L20 30 L32 24 L46 40 L58 34 L72 58 L86 50 L100 74 L114 66 L128 96 L142 88 L154 112";
const AREA = `${LINE} L154 128 L6 128 Z`;

/**
 * PlungeChart — a coral "market crash" line. Its trace draws itself, its area
 * bleeds in, and the falling arrow lands, all scrubbed by the `progress`
 * MotionValue (the row's scroll position), so it reveals as you scroll.
 */
export function PlungeChart({
  className,
  progress,
}: {
  className?: string;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const start = reduce ? 1 : 0;
  const pathLength = useTransform(progress, [0.1, 0.9], [start, 1]);
  const areaOpacity = useTransform(progress, [0.45, 0.95], [start, 1]);
  const arrowOpacity = useTransform(progress, [0.82, 1], [start, 1]);

  return (
    <svg viewBox="0 0 160 128" className={cn("w-full overflow-visible", className)} aria-hidden>
      <defs>
        <linearGradient id="plungeArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-coral)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="var(--color-coral)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[26, 52, 78, 104].map((y) => (
        <line key={y} x1="6" y1={y} x2="154" y2={y} stroke="currentColor" strokeOpacity="0.08" />
      ))}

      <motion.path d={AREA} fill="url(#plungeArea)" style={{ opacity: areaOpacity }} />
      <motion.path
        d={LINE}
        fill="none"
        stroke="var(--color-coral)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength }}
      />
      <motion.g style={{ opacity: arrowOpacity }}>
        <path d="M154 112 l-7 -3 M154 112 l1 -7.5" stroke="var(--color-coral)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="154" cy="112" r="3.5" fill="var(--color-coral)" />
      </motion.g>
    </svg>
  );
}
