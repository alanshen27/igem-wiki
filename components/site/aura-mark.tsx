import { cn } from "@/lib/utils";

/** The AURA logomark: a milk droplet cradiating a pink→cyan aura. */
export function AuraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn(className)} fill="none" aria-hidden>
      <circle cx="20" cy="22" r="16" fill="url(#markAura)" />
      <path
        d="M20 6 C24 13 29 17 29 23 A9 9 0 1 1 11 23 C11 17 16 13 20 6 Z"
        fill="var(--color-ink)"
      />
      <circle cx="17" cy="22" r="3" fill="url(#markSig)" />
      <defs>
        <radialGradient id="markAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-pink)" stopOpacity="0.9" />
          <stop offset="55%" stopColor="var(--color-orange)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-signal)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="markSig" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-signal)" />
          <stop offset="100%" stopColor="var(--color-milk)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
