import { cn } from "@/lib/utils";

/** Milk drop with a dusty rose blush — no cyan halo. */
export function AuraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("bg-transparent", className)} fill="none" aria-hidden>
      <circle cx="20" cy="22" r="15" fill="var(--color-pink)" opacity="0.22" />
      <path
        d="M20 7 C24 14 29 18 29 24 A9 9 0 1 1 11 24 C11 18 16 14 20 7 Z"
        fill="var(--color-ink)"
      />
      <ellipse cx="17" cy="23" rx="3" ry="4" fill="var(--color-cream)" opacity="0.7" />
    </svg>
  );
}
