"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Cell = {
  cx: number;
  cy: number;
  r: number;
  kind: "cell" | "signal" | "bacteria";
  delay: number;
  dur: number;
};

function createRand(seed: number) {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

function generateCells(density: number, seed: number): Cell[] {
  const rand = createRand(seed);
  const kinds: Cell["kind"][] = ["cell", "cell", "signal", "bacteria", "cell"];
  return Array.from({ length: density }, () => ({
    cx: rand() * 100,
    cy: rand() * 100,
    r: 0.4 + rand() * 2.2,
    kind: kinds[Math.floor(rand() * kinds.length)],
    delay: rand() * 6,
    dur: 6 + rand() * 8,
  }));
}

const COLORS = {
  cell: "var(--color-milk)",
  signal: "var(--color-signal)",
  bacteria: "var(--color-pink)",
};

/**
 * FloatingCellBackground — low-opacity ambient field of somatic cells,
 * signal dots and bacteria-like rods. Purely decorative.
 */
export function FloatingCellBackground({
  className,
  density = 20,
  seed = 7,
  tone = "milk",
}: {
  className?: string;
  density?: number;
  seed?: number;
  tone?: "milk" | "ink";
}) {
  const reduce = useReducedMotion();

  const cells = useMemo(() => generateCells(density, seed), [density, seed]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: tone === "ink" ? 0.5 : 0.35 }}
      >
        {cells.map((c, i) =>
          c.kind === "bacteria" ? (
            <motion.rect
              key={i}
              x={c.cx}
              y={c.cy}
              width={c.r * 2.4}
              height={c.r}
              rx={c.r / 2}
              fill={COLORS[c.kind]}
              opacity={0.5}
              initial={false}
              animate={reduce ? undefined : { y: [c.cy, c.cy - 3, c.cy], x: [c.cx, c.cx + 1.5, c.cx] }}
              transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <motion.circle
              key={i}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill={COLORS[c.kind]}
              opacity={c.kind === "signal" ? 0.85 : 0.4}
              initial={false}
              animate={reduce ? undefined : { cy: [c.cy, c.cy - 4, c.cy], opacity: c.kind === "signal" ? [0.3, 0.9, 0.3] : [0.25, 0.5, 0.25] }}
              transition={{ duration: c.dur, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ),
        )}
      </svg>
    </div>
  );
}
