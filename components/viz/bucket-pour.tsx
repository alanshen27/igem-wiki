"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { PailMark } from "@/components/viz/marks";
import { asset } from "@/lib/utils";

const MENISCUS =
  "M0 48 C 160 4, 320 88, 500 28 C 680 -8, 860 92, 1040 20 C 1220 -4, 1340 72, 1440 36 L 1440 120 L 0 120 Z";

/**
 * Scroll-driven pour.
 *
 * At rest the Fal clip is a small pail in the middle of the hero. As the
 * title and lede peel away it grows and the stream plays. The cream pool
 * that fills the viewport is CSS so the last frame is exactly `--color-milk`.
 *
 * If no source can play, the CSS pail + stream take over.
 */

const GROW: [number, number] = [0.3, 0.48];
const CLIP_START = 0.32;
const CLIP_END = 0.88;

export function BucketPour({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {videoFailed ? (
        <CssPail progress={progress} />
      ) : (
        <ClipPail progress={progress} onFail={() => setVideoFailed(true)} />
      )}
      <Pool progress={progress} />
    </div>
  );
}

/* ------------------------------------------------------------------ clip */

function ClipPail({ progress, onFail }: { progress: MotionValue<number>; onFail: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const duration = useRef(0);
  const pending = useRef<number | null>(null);

  const seek = (p: number) => {
    const v = ref.current;
    if (!v || !duration.current) return;
    const t = ((p - CLIP_START) / (CLIP_END - CLIP_START)) * duration.current;
    const clamped = Math.min(Math.max(t, 0), duration.current - 0.04);
    if (pending.current !== null) return;
    pending.current = requestAnimationFrame(() => {
      pending.current = null;
      if (!ref.current) return;
      if (Math.abs(ref.current.currentTime - clamped) > 0.02) ref.current.currentTime = clamped;
    });
  };

  useMotionValueEvent(progress, "change", seek);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onMeta = () => {
      duration.current = v.duration || 0;
      v.pause();
      seek(progress.get());
    };
    v.addEventListener("loadedmetadata", onMeta);
    const onError = () => onFail();
    v.addEventListener("error", onError);
    if (v.readyState >= 1) onMeta();
    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("error", onError);
      if (pending.current !== null) cancelAnimationFrame(pending.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Origin sits on the pail so it stays in the middle of the stage while
   * the stream grows downward. Scale is 1 at the end of GROW. */
  const scale = useTransform(progress, GROW, [0.22, 1.05]);
  /* stay gone until the title and lede have actually peeled apart */
  const opacity = useTransform(progress, [0, 0.3, 0.36, 1], [0, 0, 1, 1]);

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute left-1/2 top-[48%] z-0 h-[130svh] origin-[50%_16%] -translate-x-1/2 -translate-y-[16%]"
    >
      <video
        ref={ref}
        muted
        playsInline
        preload="auto"
        poster={asset("/art/video/pour-poster.png")}
        className="h-full w-auto max-w-none"
        onError={(e) => {
          if (e.currentTarget.error) onFail();
        }}
      >
        <source src={asset("/art/video/pour.mov")} type='video/quicktime; codecs="hvc1"' />
        <source src={asset("/art/video/pour.webm")} type='video/webm; codecs="vp9"' />
      </video>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ pool */

function Pool({ progress }: { progress: MotionValue<number> }) {
  /* Height, not scaleY — scaling flattened the meniscus into a straight line. */
  const poolH = useTransform(progress, [0.7, 0.88, 1], [0, 36, 128]);
  const height = useTransform(poolH, (v) => `${v}%`);
  const splash = useTransform(progress, [0.7, 0.82, 0.96], [0, 1, 0.3]);

  return (
    <motion.div style={{ height }} className="absolute inset-x-0 bottom-0 z-1">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-28 w-full sm:h-32">
        <path fill="var(--color-milk)" d={MENISCUS} />
      </svg>
      <motion.div
        style={{ opacity: splash, scale: splash }}
        className="absolute left-[50%] top-6 h-14 w-36 origin-center -translate-x-1/2 rounded-[100%] bg-cream"
      />
      <div className="absolute inset-x-0 top-20 bottom-0 bg-milk sm:top-24" />
    </motion.div>
  );
}

/* --------------------------------------------------------- css fallback */

function CssPail({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, GROW, [0.28, 1.1]);
  const bucketRotate = useTransform(progress, [0.36, 0.46, 0.82], [8, -52, -54]);
  const bucketOpacity = useTransform(progress, [0, 0.3, 0.36, 1], [0, 0, 1, 1]);

  const streamUnrotate = useTransform(bucketRotate, (r) => -r);
  const streamH = useTransform(progress, [0.38, 0.5, 0.78, 0.9], ["0vh", "92vh", "42vh", "0vh"]);
  const streamW = useTransform(progress, [0.38, 0.52, 0.76], [72, 128, 168]);
  const streamOp = useTransform(progress, [0.38, 0.42, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ scale, rotate: bucketRotate, opacity: bucketOpacity }}
      className="absolute left-1/2 top-[48%] z-0 w-[min(22vh,200px)] origin-[50%_28%] -translate-x-1/2 -translate-y-[28%]"
    >
      <motion.div
        style={{ rotate: streamUnrotate, height: streamH, width: streamW, opacity: streamOp }}
        className="absolute left-[24%] top-[27%] origin-top -translate-x-1/2"
      >
        <svg viewBox="0 0 80 900" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          <path
            fill="var(--color-cream)"
            d="M28 6 C 18 28, 12 90, 10 200 C 6 420, 8 680, 16 900 L 64 900 C 72 680, 74 420, 68 200 C 64 90, 58 28, 50 6 Z"
          />
          <path
            fill="var(--color-milk)"
            d="M32 4 C 24 26, 18 88, 16 200 C 14 420, 16 680, 22 900 L 56 900 C 64 680, 66 420, 62 200 C 58 88, 52 26, 46 4 Z"
          />
          <ellipse cx="39" cy="8" rx="18" ry="8" fill="var(--color-milk)" />
        </svg>
      </motion.div>
      <PailMark className="relative z-10 h-auto w-full" />
    </motion.div>
  );
}
