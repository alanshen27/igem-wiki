"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { FloatingCellBackground } from "./floating-cells";
import { cn } from "@/lib/utils";

/**
 * AuraDroplet — the hero centrepiece. A circular microscope/petri field holding milk.
 * On scroll it "focuses": the aura bloom intensifies, hidden cells and a signal ring
 * emerge, and a droplet falls. Milk looks clean; biology reveals itself.
 */
export function AuraDroplet({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bloomScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.12, 1.24]);
  const bloomOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.75, 1, 0.95]);
  const cellsOpacity = useTransform(scrollYProgress, [0.1, 0.45], [0.35, 1]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const dropletY = useTransform(scrollYProgress, [0, 0.4], [-24, 4]);

  return (
    <div ref={ref} className={cn("relative aspect-square w-full", className)}>
      {/* Cyan counter-bloom, offset for depth */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { scale: bloomScale, opacity: bloomOpacity }}
        className="absolute inset-[14%] aura-bloom-cyan opacity-40"
      />
      {/* The AURA bloom (pink → orange → butter) */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { scale: bloomScale, opacity: bloomOpacity }}
        className="absolute inset-[8%] aura-bloom animate-aura"
      />

      {/* Microscope field ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        style={reduce ? undefined : { rotate: ringRotate }}
        aria-hidden
      >
        <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-milk)" strokeOpacity="0.12" strokeWidth="0.6" />
        <circle
          cx="100"
          cy="100"
          r="76"
          fill="none"
          stroke="var(--color-signal)"
          strokeOpacity="0.5"
          strokeWidth="0.8"
          strokeDasharray="2 6"
        />
        {/* focus ticks */}
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const r1 = 88;
          const r2 = i % 4 === 0 ? 82 : 85;
          // toFixed keeps server/client trig output identical (hydration-safe)
          return (
            <line
              key={i}
              x1={(100 + Math.cos(a) * r1).toFixed(3)}
              y1={(100 + Math.sin(a) * r1).toFixed(3)}
              x2={(100 + Math.cos(a) * r2).toFixed(3)}
              y2={(100 + Math.sin(a) * r2).toFixed(3)}
              stroke="var(--color-milk)"
              strokeOpacity="0.18"
              strokeWidth="0.6"
            />
          );
        })}
      </motion.svg>

      {/* Hidden biology, revealed on scroll */}
      <motion.div
        aria-hidden
        style={reduce ? { opacity: 1 } : { opacity: cellsOpacity }}
        className="absolute inset-[10%] overflow-hidden rounded-full"
      >
        <FloatingCellBackground density={26} tone="ink" seed={31} />
      </motion.div>

      {/* Falling droplet */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        style={reduce ? undefined : { y: dropletY }}
        aria-hidden
      >
        <path
          d="M100 30 C112 54 126 68 126 86 A26 26 0 1 1 74 86 C74 68 88 54 100 30 Z"
          fill="url(#dropGrad)"
          opacity="0.9"
        />
        <ellipse cx="92" cy="82" rx="6" ry="9" fill="var(--color-milk)" opacity="0.7" />
        <defs>
          <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-milk)" />
            <stop offset="100%" stopColor="#eadfca" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
