import { asset, cn } from "@/lib/utils";

/** Four-tile AURA lockup, cut out on transparent. */
export function AuraLogo({ className }: { className?: string }) {
  return (
    <img
      src={asset("/logo.png")}
      alt=""
      className={cn("h-9 w-auto", className)}
      aria-hidden
    />
  );
}
