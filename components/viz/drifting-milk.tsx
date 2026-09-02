"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * DriftingMilk — an ambient decorative layer of small, soft milk/pink
 * droplets that slowly wander around behind a section. Purely
 * decorative and subtle. Drop it as the first child of a `relative`
 * section (it is absolutely positioned + non-blocking).
 * ------------------------------------------------------------------ */

function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
}

type Blob = { x: number; y: number; r: number; dx: number; dy: number; dur: number; delay: number };

const SUPER_LIGHT_PINK = "#ffe6f2";

export function DriftingMilk({
  className,
  count = 6,
  seed = 7,
  opacity = 0.5,
  tint = SUPER_LIGHT_PINK,
}: {
  className?: string;
  /** Number of droplets. */
  count?: number;
  seed?: number;
  opacity?: number;
  /** Droplet colour. Defaults to a super-light pink. */
  tint?: string;
}) {
  const reduce = useReducedMotion();

  const blobs = useMemo<Blob[]>(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, () => ({
      x: 6 + rand() * 88,
      y: 6 + rand() * 88,
      r: 1.6 + rand() * 3,
      dx: (rand() - 0.5) * 16,
      dy: (rand() - 0.5) * 12,
      dur: 16 + rand() * 18,
      delay: rand() * 8,
    }));
  }, [count, seed]);

  const gradId = `milkdrift-${seed}`;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity }}
      >
        <defs>
          <radialGradient id={gradId} cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor={`color-mix(in srgb, ${tint} 40%, white)`} />
            <stop offset="100%" stopColor={tint} />
          </radialGradient>
        </defs>

        {blobs.map((b, i) => (
          <motion.circle
            key={i}
            cx={b.x}
            cy={b.y}
            r={b.r}
            fill={`url(#${gradId})`}
            animate={
              reduce
                ? undefined
                : {
                    cx: [b.x, b.x + b.dx, b.x - b.dx * 0.6, b.x],
                    cy: [b.y, b.y - b.dy, b.y + b.dy * 0.7, b.y],
                    opacity: [0.55, 1, 0.7, 0.55],
                  }
            }
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}
