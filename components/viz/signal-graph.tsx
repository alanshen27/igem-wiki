"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * SignalRevealGraph — baseline → threshold → detection.
 * The trace animates in; once it crosses the dashed threshold it turns pink.
 */
export function SignalRevealGraph({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 400 220" className={cn("w-full", className)} role="img" aria-label="Signal intensity rising above a detection threshold over time">
      {/* Axes */}
      <line x1="40" y1="20" x2="40" y2="184" stroke="currentColor" strokeOpacity="0.2" />
      <line x1="40" y1="184" x2="384" y2="184" stroke="currentColor" strokeOpacity="0.2" />
      <text x="20" y="110" fontSize="9" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.5" transform="rotate(-90 20 110)">signal</text>
      <text x="360" y="200" fontSize="9" fontFamily="var(--font-mono)" fill="currentColor" opacity="0.5">time</text>

      {/* Threshold line */}
      <line x1="40" y1="96" x2="384" y2="96" stroke="var(--color-coral)" strokeOpacity="0.7" strokeDasharray="5 5" />
      <text x="300" y="90" fontSize="9" fontFamily="var(--font-mono)" fill="var(--color-coral)">detection threshold</text>

      {/* Baseline portion */}
      <motion.path
        d="M40 168 C90 166 130 164 170 158 C210 150 240 120 270 84 C300 48 340 40 384 34"
        fill="none"
        stroke="url(#sig)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Detection marker where it crosses */}
      <motion.circle
        cx="252"
        cy="96"
        r="6"
        fill="var(--color-pink)"
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: reduce ? 0 : 1.3, type: "spring", stiffness: 260 }}
      />

      <defs>
        <linearGradient id="sig" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-signal)" />
          <stop offset="60%" stopColor="var(--color-signal)" />
          <stop offset="70%" stopColor="var(--color-pink)" />
          <stop offset="100%" stopColor="var(--color-pink)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
