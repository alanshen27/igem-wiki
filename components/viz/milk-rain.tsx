"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { asset } from "@/lib/utils";

function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
}

type Drop = { x: number; delay: number; dur: number; size: number; drift: number; tilt: number };

/** Scroll-gated milk rain — generated drop sprites fall over the dark hero,
 *  then the cream flood covers them. */
export function MilkRain({
  progress,
  count = 34,
}: {
  progress: MotionValue<number>;
  count?: number;
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, [0.02, 0.1, 0.6, 0.72], [0, 1, 1, 0]);

  const drops = useMemo<Drop[]>(() => {
    const rand = seeded(21);
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      delay: rand() * 2.4,
      dur: 1.6 + rand() * 1.8,
      size: 18 + rand() * 42,
      drift: (rand() - 0.5) * 60,
      tilt: (rand() - 0.5) * 24,
    }));
  }, [count]);

  if (reduce) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {drops.map((d, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={asset("/art/gen/milk-drop.png")}
          alt=""
          width={128}
          height={128}
          draggable={false}
          className="absolute top-0 select-none"
          style={{
            left: `${d.x}%`,
            width: d.size,
            height: d.size,
            opacity: 0.55 + (d.size / 60) * 0.45,
            rotate: `${d.tilt}deg`,
            animation: `milk-fall ${d.dur}s linear ${d.delay}s infinite`,
            ["--drift" as string]: `${d.drift}px`,
          }}
        />
      ))}
    </motion.div>
  );
}
