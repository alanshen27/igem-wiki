import { cn } from "@/lib/utils";

/**
 * MilkRibbonDivider — flowing milk ribbon used to wipe between major sections.
 * `flip` mirrors it; `tone` sets the fill to milk or ink for section transitions.
 */
export function MilkRibbonDivider({
  className,
  flip = false,
  tone = "milk",
}: {
  className?: string;
  flip?: boolean;
  tone?: "milk" | "ink" | "cream";
}) {
  const fill =
    tone === "ink" ? "var(--color-ink)" : tone === "cream" ? "var(--color-cream)" : "var(--color-milk)";
  return (
    <div className={cn("relative w-full leading-[0]", flip && "rotate-180", className)} aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        className="block h-[60px] w-full sm:h-[90px]"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C240,120 480,0 720,40 C960,80 1200,120 1440,56 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.55"
        />
        <path
          d="M0,80 C260,30 520,110 780,70 C1040,30 1240,90 1440,72 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
