"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/site/section-header";
import { SignalRevealGraph } from "@/components/viz/signal-graph";
import { QualityPlungeGraph } from "@/components/viz/quality-graph";
import { Art } from "@/components/viz/art";
import { CurdMark, DropMark, PailMark } from "@/components/viz/marks";

export function SignalSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.06], [reduce ? 1 : 0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [reduce ? 0 : 20, 0, 0, reduce ? 0 : -12]);
  const flush = useTransform(scrollYProgress, [0.12, 0.38], [reduce ? 0.55 : 0, 0.55]);
  const curd = useTransform(scrollYProgress, [0.22, 0.42], [reduce ? 1 : 0, 1]);
  const dropY = useTransform(scrollYProgress, [0.08, 0.32], [reduce ? 72 : 0, 72]);
  const dropOp = useTransform(scrollYProgress, [0.08, 0.16, 0.34], [reduce ? 0 : 0, 1, 0]);
  const graphProgress = useTransform(scrollYProgress, [0.42, 0.78], [0, 1]);

  return (
    <section ref={ref} className="relative h-[200vh] bg-milk">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden py-16 sm:py-24">
        <motion.div style={{ opacity: contentOpacity }} className="relative w-full">
          <Container>
            <motion.div style={{ y: textY }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink/40 bg-pink/8 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-pink" />
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-pink-deep">
                  Subclinical mastitis
                </span>
              </div>
              <SectionHeader
                accent="coral"
                title="Where the signal hides"
                lede="Before a cow shows clinical signs — swelling, clots in the milk, a drop in yield — inflammation is already underway inside the udder."
              />
            </motion.div>

            <div className="relative mx-auto mt-10 flex h-[280px] max-w-lg items-end justify-center sm:h-[320px]">
              <motion.div
                className="absolute left-[8%] top-[18%] w-[88px] sm:w-[110px]"
                animate={reduce ? undefined : { rotate: [-6, -10, -6] }}
                transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <PailMark className="h-auto w-full" />
              </motion.div>

              <motion.div style={{ y: dropY, opacity: dropOp }} className="absolute left-[18%] top-[8%] w-8">
                <DropMark className="h-auto w-full" />
              </motion.div>

              <div className="relative">
                <Art id="cow" size={260} motion="breathe" decorative={false} alt="A dairy cow" />
                <motion.div
                  style={{ opacity: flush }}
                  className="pointer-events-none absolute inset-[12%] rounded-full"
                  aria-hidden
                >
                  <div className="h-full w-full rounded-full bg-pink/45 blur-2xl" />
                </motion.div>
              </div>

              <motion.div style={{ opacity: curd }} className="absolute bottom-[8%] right-[10%] w-[72px]">
                <CurdMark className="h-auto w-full" />
              </motion.div>
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center leading-relaxed text-ink-70">
              Somatic cell counts climb and milk quality quietly slips, yet the milk can still look
              completely normal.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <SignalRevealGraph progress={graphProgress} className="relative text-ink-70" />
              <QualityPlungeGraph progress={graphProgress} className="relative text-ink-70" />
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
