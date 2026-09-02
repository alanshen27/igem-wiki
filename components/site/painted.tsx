"use client";

import { Art } from "@/components/viz/art";
import type { ArtId } from "@/lib/art";
import { cn } from "@/lib/utils";

const STAMP_POS = {
  tr: "right-[-10px] top-[-18px]",
  tl: "left-[-10px] top-[-18px]",
  br: "right-[-8px] bottom-[-14px]",
  bl: "left-[-8px] bottom-[-14px]",
} as const;

/**
 * A page of the picture-book: irregular paper, ink edge, optional sticker.
 * Diagrams and copy sit on these so the wiki reads as painted, not chrome.
 */
export function Painted({
  className,
  children,
  stamp,
  stampSize = 72,
  stampAt = "tr",
}: {
  className?: string;
  children: React.ReactNode;
  stamp?: ArtId;
  stampSize?: number;
  stampAt?: keyof typeof STAMP_POS;
}) {
  return (
    <div className={cn("painted relative", className)}>
      {stamp && (
        <div className={cn("pointer-events-none absolute z-10", STAMP_POS[stampAt])}>
          <Art id={stamp} size={stampSize} motion="bob" />
        </div>
      )}
      {children}
    </div>
  );
}
