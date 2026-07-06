"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * MilkBlobs — a cluster of gooey milk droplets. At rest they overlap into a
 * single organic blob (SVG "goo" filter merges them); as `progress` rises the
 * blobs explode outward into separate droplets. Drives entirely on transforms.
 */

type BlobCfg = {
  angle: number; // radians, direction it flies out
  dist: number; // how far (in viewBox units) at full explosion
  r: number; // radius
  delay: number; // 0..1 fraction offset so they don't all move identically
  float: number; // idle bob amount
};

const CENTER = 100;

const BLOBS: BlobCfg[] = [
  { angle: -Math.PI / 2, dist: 62, r: 20, delay: 0, float: 3 },
  { angle: -Math.PI / 6, dist: 74, r: 15, delay: 0.05, float: 4 },
  { angle: Math.PI / 5, dist: 66, r: 17, delay: 0.02, float: 3.5 },
  { angle: (Math.PI * 2) / 3, dist: 78, r: 13, delay: 0.08, float: 5 },
  { angle: Math.PI * 0.92, dist: 70, r: 16, delay: 0.04, float: 4 },
  { angle: Math.PI * 1.25, dist: 58, r: 12, delay: 0.06, float: 4.5 },
  { angle: Math.PI * 1.62, dist: 80, r: 14, delay: 0.03, float: 3 },
];

function Blob({ cfg, progress }: { cfg: BlobCfg; progress: MotionValue<number> }) {
  // Phase 1 (0 → 0.5): explode outward from centre into separate droplets.
  const cx = useTransform(progress, [0, 0.5], [CENTER, CENTER + Math.cos(cfg.angle) * cfg.dist]);
  const cy = useTransform(progress, [0, 0.5], [CENTER, CENTER + Math.sin(cfg.angle) * cfg.dist]);
  // Radius: hold as droplets through the explosion, then bloat huge (phase 2)
  // so every bubble swells and the goo filter merges them into one milk mass
  // that fills the whole frame.
  const r = useTransform(
    progress,
    [0, 0.5, 0.72, 1],
    [cfg.r * 1.15, cfg.r, cfg.r * 2.2, cfg.r * 9],
  );

  return <motion.circle cx={cx} cy={cy} r={r} fill="url(#milkGrad)" />;
}

export function MilkBlobs({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const highlightOpacity = useTransform(progress, [0, 0.3], [0.8, 0]);

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <radialGradient id="milkGrad" cx="42%" cy="38%" r="72%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="var(--color-milk)" />
          {/* Edge matches the milk surface exactly → no darker ring/arc when the
              bubbles bloat and merge into the full-screen fill. */}
          <stop offset="100%" stopColor="var(--color-milk)" />
        </radialGradient>
        {/* Gooey metaball filter: blur then sharpen alpha to merge nearby blobs */}
        <filter id="milkGoo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>

      <g filter="url(#milkGoo)">
        {BLOBS.map((cfg, i) => (
          <Blob key={i} cfg={cfg} progress={progress} />
        ))}
      </g>

      {/* Subtle specular highlight on the central mass while merged */}
      <motion.ellipse cx="90" cy="86" rx="10" ry="14" fill="#ffffff" style={{ opacity: highlightOpacity }} />
    </svg>
  );
}
