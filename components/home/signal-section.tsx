"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { EyeOff } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/site/section-header";
import { SignalRevealGraph } from "@/components/viz/signal-graph";

/**
 * SignalSection — pins while you scroll so the graph draws itself. Text stays
 * put through most of the pin so it doesn't vanish early.
 */
export function SignalSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.05], [reduce ? 1 : 0, 1]);

  // Hold text/graph near centre for most of the pin — only drift at the edges.
  const textY = useTransform(scrollYProgress, [0, 0.1, 0.88, 1], [reduce ? 0 : 20, 0, 0, reduce ? 0 : -12]);
  const graphY = useTransform(scrollYProgress, [0, 0.1, 0.88, 1], [reduce ? 0 : 24, 0, 0, reduce ? 0 : -8]);

  // Graph draws in the first ~60% of scroll, then holds while you keep reading.
  const graphProgress = useTransform(scrollYProgress, [0.05, 0.20, 0.9, 1], [0, 1, 1, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.05, 0.32, 0.9, 1], [0, 1, 1, 0]);


  return (
    <section ref={ref} className="relative h-[300vh] bg-milk">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center py-24 sm:py-28">
        <motion.div style={{ opacity: contentOpacity }} className="w-full flex-1 flex items-center">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div style={{ y: textY }}>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-ink/3 px-3 py-1">
                  <EyeOff className="h-4 w-4 text-coral" />
                  <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-ink-70">
                    Subclinical mastitis
                  </span>
                </div>
                <SectionHeader
                  accent="coral"
                  title="Where the signal hides"
                  lede="Before a cow shows clinical signs — swelling, clots, a drop in yield — inflammation is already underway inside the udder. Somatic cell counts climb and milk quality quietly slips, yet the milk can still look completely normal."
                />
                <p className="mt-4 max-w-xl leading-relaxed text-ink-70">
                  By the time symptoms are obvious, treatment is harder, welfare has suffered, and
                  the loss is already spreading through the tank. The interesting window is the quiet
                  one — before anything looks wrong.
                </p>
              </motion.div>

              <motion.div style={{ y: graphY }}>
                <SignalRevealGraph progress={graphProgress} className="text-ink-70" />
                <motion.p
                  style={{ opacity: captionOpacity }}
                  className="mt-3 text-center text-sm text-ink-55"
                >
                  Signal rises through the subclinical window — the goal is to read it while there
                  is still time to act.
                </motion.p>
              </motion.div>
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
