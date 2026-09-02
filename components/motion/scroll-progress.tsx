"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ART } from "@/lib/art";
import { asset } from "@/lib/utils";

const SPRING = { stiffness: 120, damping: 30, restDelta: 0.001 };

/** Pink rail under the nav — the herd cow stands on the bar and lays the line. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, SPRING);
  const left = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-16 z-60 overflow-visible"
    >
      <motion.div style={{ scaleX: progress }} className="h-1 origin-left bg-pink" />
      <motion.div style={{ left }} className="absolute top-0">
        {/* Flip lives on a wrapper — motion `y` would otherwise overwrite scaleX. */}
        <div className="relative -translate-x-[28%] -translate-y-[56%]">
          <span className="absolute left-[28%] top-[58%] z-0 h-2 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink" />
          <div className="-scale-x-100">
            <motion.img
              src={asset(`/art/gen/${ART.cow.file}`)}
              alt=""
              width={ART.cow.px}
              height={ART.cow.px}
              draggable={false}
              className="block h-16 w-16 select-none object-contain drop-shadow-[0_1px_0_rgba(28,20,15,0.35)] sm:h-[4.5rem] sm:w-[4.5rem]"
              animate={reduce ? undefined : { y: [0, -2, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
