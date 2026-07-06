"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { FloatingCellBackground } from "@/components/viz/floating-cells";
import { MilkBlobs } from "@/components/viz/milk-blobs";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

/**
 * Cinematic hero. At rest: the big headline + description sit together over a
 * soft milk-aura bloom. As you scroll, the two halves separate — the title
 * lifts up and off, the description drops down and off — while the aura bloom
 * swells to fill the screen and carry you into the next (dark) section.
 */
export function HomeHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) return <StaticHero />;

  return (
    <section ref={ref} className="section-dark relative h-[250vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <CinematicField progress={scrollYProgress} />
      </div>
    </section>
  );
}

function CinematicField({ progress }: { progress: MotionValue<number> }) {
  // Ambient cells drift slowly (parallax depth).
  const ambientY = useTransform(progress, [0, 1], [0, -180]);

  // NOTE: every transform that must stay put after its move includes an explicit
  // terminal keyframe at progress 1 (e.g. [...0.8, 1] → [...v, v]). Without the
  // held endpoint the value drifts back down through the tail of the pin, which
  // is what re-opened the dark radial corners at the seam.

  // The milk-aura bloom swells while the text is on screen, then fades fully
  // out before the milk flood arrives — leaving no warm ring at the seam.
  const bloomScale = useTransform(progress, [0, 0.7, 1], [0.9, 3.2, 3.2]);
  const bloomOpacity = useTransform(progress, [0, 0.45, 0.68, 1], [0.7, 0.55, 0, 0]);

  // A microscope focus ring blooms in briefly around the midpoint.
  const ringScale = useTransform(progress, [0, 0.7, 1], [0.6, 3.2, 3.2]);
  const ringOpacity = useTransform(progress, [0.05, 0.25, 0.55, 1], [0, 0.6, 0, 0]);

  // Milk blob: hidden at rest, scales in as the text separates, explodes into
  // droplets, then bloats and merges into one milk mass. Crucially it FADES to
  // zero as the flat flood takes over so its goo-filtered soft edge never
  // re-emerges as a dark ring once the screen is meant to be solid.
  const blobScale = useTransform(progress, [0.06, 0.16, 0.55, 0.8, 1], [0, 1, 1.6, 4.4, 4.4]);
  const blobFieldOpacity = useTransform(progress, [0.56, 0.74, 1], [1, 0, 0]);

  // Content splits apart and exits the frame (transform-driven → reliable,
  // and stays fully visible at rest since no scroll-opacity is applied).
  const titleY = useTransform(progress, [0, 0.5, 1], [0, -1000, -1000]);
  const descY = useTransform(progress, [0, 0.5, 1], [0, 1000, 1000]);
  const scrollHint = useTransform(progress, [0, 0.06], [1, 0]);
  const scrollHintY = useTransform(progress, [0, 0.1], [0, 160]);

  // The dark legibility vignette is only needed while the text is on screen —
  // fade it out before the milk fills so it doesn't leave a grey edge/box.
  const vignetteOpacity = useTransform(progress, [0, 0.32, 0.5, 1], [1, 1, 0, 0]);

  // Milk flood: a solid ivory layer that fades in over the blob merge and then
  // HOLDS at full opacity through the end of the pin (explicit 1→1 tail). Because
  // it is the topmost background layer and reaches 1 while the blob is still
  // fading, the screen resolves to flat `--color-milk` — the exact surface of
  // the next section, so the handoff is seamless (no dark→light seam, no ring).
  const floodOpacity = useTransform(progress, [0.58, 0.74, 1], [0, 1, 1]);

  return (
    <>
      {/* Ambient parallax cells + hairline grid */}
      <motion.div style={{ y: ambientY }} className="absolute inset-0">
        <FloatingCellBackground density={24} tone="ink" seed={5} />
      </motion.div>
      <div className="bg-grid pointer-events-none absolute inset-0 text-milk/60 opacity-[0.08]" aria-hidden />

      {/* Swelling milk-aura bloom */}
      <motion.div
        style={{ scale: bloomScale, opacity: bloomOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(70vw,540px)] -translate-x-1/2 -translate-y-1/2 aura-bloom"
        aria-hidden
      />
      {/* Microscope focus ring */}
      <motion.svg
        viewBox="0 0 200 200"
        style={{ scale: ringScale, opacity: ringOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(60vw,460px)] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <circle cx="100" cy="100" r="94" fill="none" stroke="var(--color-milk)" strokeOpacity="0.15" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-signal)" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="1.5 6" />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const r2 = i % 5 === 0 ? 86 : 90;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 94}
              y1={100 + Math.sin(a) * 94}
              x2={100 + Math.cos(a) * r2}
              y2={100 + Math.sin(a) * r2}
              stroke="var(--color-milk)"
              strokeOpacity="0.2"
              strokeWidth="0.4"
            />
          );
        })}
      </motion.svg>

      {/* The milk blob — appears as the text separates, then explodes to fill
          the screen, its droplets flying to the edges to back the next section */}
      <motion.div
        style={{ scale: blobScale, opacity: blobFieldOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(48vw,340px)] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <MilkBlobs progress={progress} className="h-full w-full" />
      </motion.div>

      {/* Legibility vignette — fades out before the milk fills so it leaves no
          grey box edge around the pinned viewport */}
      <motion.div
        style={{
          opacity: vignetteOpacity,
          background: "radial-gradient(120% 90% at 50% 50%, transparent 45%, var(--color-ink) 92%)",
        }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* Milk flood — fills to ivory at the end, blending into the light section.
          Radial from a bright centre (matching the blob's specular) out to SOLID
          milk by 55%, so every corner is fully covered while the merge reads as
          the milk itself swelling to fill the frame. */}
      <motion.div
        style={{
          opacity: floodOpacity,
          background:
            "radial-gradient(120% 120% at 50% 44%, #ffffff 0%, var(--color-milk) 55%, var(--color-milk) 100%)",
        }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* Hero content — title + description together, split on scroll */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <motion.div style={{ y: titleY }}>
            <p className="mb-6 font-mono text-[0.66rem] uppercase tracking-[0.4em] text-milk/40">
              Team AURA · iGEM 2025
            </p>
            <h1 className="font-display text-milk display-hero text-balance drop-shadow-[0_6px_40px_rgba(7,5,16,0.85)]">
              <span className="block">Milk is quiet.</span>
              <span className="block text-aura">Infection is not.</span>
            </h1>
          </motion.div>

          <motion.div style={{ y: descY }} className="flex flex-col items-center">
            <p className="mt-7 max-w-xl text-base leading-relaxed text-milk/75 text-pretty sm:text-lg">
              Mastitis can begin before obvious symptoms appear — affecting cow welfare, milk
              quality, and farm economics. AURA explores a synthetic biology approach to earlier
              detection.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild variant="pink" size="lg">
                <Link href="/description">
                  Explore the Project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="onDark" size="lg">
                <Link href="/engineering">See the Engineering</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div style={{ opacity: scrollHint, y: scrollHintY }} className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-milk/35"
        >
          <span className="font-mono text-[0.58rem] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </>
  );
}

function StaticHero() {
  return (
    <section className="section-dark relative overflow-hidden">
      <FloatingCellBackground density={18} tone="ink" seed={5} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 aura-bloom opacity-40" aria-hidden />
      <div className="relative mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-6 font-mono text-[0.66rem] uppercase tracking-[0.4em] text-milk/40">
          Team AURA · iGEM 2025
        </p>
        <h1 className="font-display text-milk display-hero text-balance">
          <span className="block">Milk is quiet.</span>
          <span className="block text-aura">Infection is not.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-milk/75">
          Mastitis can begin before obvious symptoms appear — affecting cow welfare, milk quality,
          and farm economics. AURA explores a synthetic biology approach to earlier detection.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild variant="pink" size="lg">
            <Link href="/description">
              Explore the Project <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="onDark" size="lg">
            <Link href="/engineering">See the Engineering</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
