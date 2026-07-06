"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { CountUp } from "@/components/motion/count-up";
import { PlungeChart } from "@/components/viz/plunge-chart";
import { CowHerd } from "@/components/viz/cow-herd";
import { ACCENT_HEX } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RowProps = {
  side: "left" | "right";
  accent: string;
  value: (countProgress: MotionValue<number>) => React.ReactNode;
  label: string;
  sub: string;
  viz: (progress: MotionValue<number>) => React.ReactNode;
};

function ImpactRow({ side, accent, value, label, sub, viz }: RowProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Wider window: animation runs while the row travels from entering the viewport
  // to sitting near centre — finishes before you've scrolled past.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const countProgress = useTransform(scrollYProgress, [0.12, 0.72], [0, 1]);

  // Graphic and copy parallax in opposite directions for depth.
  const vizY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 56, reduce ? 0 : -36]);
  const textY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 36, reduce ? 0 : -20]);
  const fromX = side === "left" ? 48 : -48;
  const textX = useTransform(scrollYProgress, [0, 0.55], [reduce ? 0 : fromX, 0]);
  const rowOpacity = useTransform(scrollYProgress, [0, 0.2], [reduce ? 1 : 0.15, 1]);

  const vizCol = side === "left" ? "lg:order-1" : "lg:order-2";
  const textCol = side === "left" ? "lg:order-2" : "lg:order-1";

  return (
    <motion.div
      ref={ref}
      style={{ opacity: rowOpacity }}
      className="grid items-center gap-8 border-t border-ink/10 py-12 first:border-t-0 lg:grid-cols-2 lg:gap-16 lg:py-16"
    >
      <motion.div
        style={{ y: vizY }}
        className={cn("relative flex min-h-[180px] items-center justify-center", vizCol)}
      >
        <div
          className="pointer-events-none absolute h-56 w-56 rounded-full opacity-[0.06] blur-3xl"
          style={{ background: accent }}
          aria-hidden
        />
        <div className="relative w-full max-w-md">{viz(scrollYProgress)}</div>
      </motion.div>

      <motion.div style={{ x: textX, y: textY }} className={cn(textCol)}>
        <div className="mb-4 h-1 w-10 rounded-full" style={{ background: accent }} aria-hidden />
        <div className="font-display text-6xl tracking-tight text-ink lg:text-7xl">
          {value(countProgress)}
        </div>
        <p className="mt-4 text-lg font-medium text-ink">{label}</p>
        <p className="mt-2 max-w-md leading-relaxed text-ink-70">{sub}</p>
      </motion.div>
    </motion.div>
  );
}

/** Graphical impact stats — scroll-revealed left/right rows with counting numbers. */
export function ImpactStats() {
  return (
    <div className="mx-auto max-w-5xl">
      <ImpactRow
        side="left"
        accent={ACCENT_HEX.coral}
        viz={(p) => <PlungeChart progress={p} className="h-44" />}
        value={(p) => <CountUp to={30} prefix="€" suffix="B" progress={p} />}
        label="Annual industry losses"
        sub="Estimated global economic burden of mastitis on the dairy sector each year — and most of it never shows up on a treatment invoice."
      />

      <ImpactRow
        side="right"
        accent={ACCENT_HEX.pink}
        viz={(p) => (
          <CowHerd
            total={3}
            highlightIndices={[1]}
            progress={p}
            color={ACCENT_HEX.pink}
            className="items-end justify-center gap-4"
            cowClassName="h-28 w-24"
          />
        )}
        value={(p) => (
          <span>
            <CountUp to={1} progress={p} /> in 3
          </span>
        )}
        label="Cows affected"
        sub="Roughly one-third of dairy cows experience mastitis over a given period."
      />

      <ImpactRow
        side="left"
        accent={ACCENT_HEX.butter}
        viz={(p) => (
          <CowHerd
            total={40}
            highlight={23}
            columns={10}
            progress={p}
            color={ACCENT_HEX.butter}
            className="gap-x-2 gap-y-1"
            cowClassName="h-7"
          />
        )}
        value={(p) => (
          <span>
            47–<CountUp from={47} to={65} progress={p} suffix="%" />
          </span>
        )}
        label="Annual infection rate"
        sub="Reported herd-level incidence ranges widely across dairy systems and regions."
      />

      <ImpactRow
        side="right"
        accent={ACCENT_HEX.signal}
        viz={(p) => (
          <CowHerd
            total={40}
            highlight={5}
            columns={10}
            progress={p}
            color={ACCENT_HEX.signal}
            className="gap-x-2 gap-y-1"
            cowClassName="h-7"
          />
        )}
        value={(p) => (
          <span>
            &lt;<CountUp to={15} progress={p} suffix="%" />
          </span>
        )}
        label="From treatment alone"
        sub="Direct treatment is a small slice of the total cost — most of the loss is hidden in yield, culling, and discarded milk."
      />
    </div>
  );
}
