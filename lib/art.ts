import { NAV } from "@/lib/nav";

/**
 * The bitmap cast in /public/art/gen — one consistent clip-art hand, generated
 * by scripts/gen-cast.mjs. Only cows live here; every other prop is an SVG
 * mark in components/viz/marks.tsx so it stays crisp and on-style.
 */
export const ART = {
  cow: { file: "cow-grazing.png", alt: "A plump dairy cow", px: 640 },
  cowSick: { file: "cow-sick.png", alt: "The same dairy cow, unwell with mastitis", px: 640 },
  mascot: { file: "mascot-scientist.png", alt: "Cow scientist holding a flask of pink liquid", px: 640 },
  reader: { file: "cow-reading.png", alt: "Cow reading a pink book", px: 640 },
} as const;

export type ArtId = keyof typeof ART;
export type ArtScene = "project" | "wetlab" | "drylab" | "engagement" | "team";
export type ArtMotion = "none" | "breathe" | "bob" | "sway" | "float";
export type ArtGlow = "pink" | "signal" | "butter";

export type PlacedArt = {
  id: ArtId;
  /** CSS `left` — pin is centered on this point. */
  x: string;
  /** CSS `top`. */
  y: string;
  size: number;
  motion?: ArtMotion;
  /** Pointer / parallax depth. 0 = still, 1.4 = eager. */
  depth?: number;
  rotate?: number;
  flip?: boolean;
  delay?: number;
  glow?: ArtGlow;
  opacity?: number;
  hide?: "mobile" | "desktop";
};

const SCENE_BY_GROUP: Record<string, ArtScene> = {
  Project: "project",
  "Wet Lab": "wetlab",
  "Dry Lab": "drylab",
  Engagement: "engagement",
  Team: "team",
};

/** Which living illustration a wiki page should stage. */
export function sceneFor(href: string): ArtScene {
  for (const g of NAV) {
    if (g.links.some((l) => l.href === href)) return SCENE_BY_GROUP[g.label] ?? "project";
  }
  return "project";
}

/**
 * Cast for the page-hero diorama. Cows only appear where they mean cows:
 * the lab pages get the scientist mascot, everything else gets a drawn prop
 * from the mark kit (see HeroDiorama).
 */
export const HERO_CAST: Record<ArtScene, PlacedArt[]> = {
  project: [],
  wetlab: [{ id: "mascot", x: "58%", y: "56%", size: 240, motion: "breathe", depth: 0.35, glow: "pink" }],
  drylab: [],
  engagement: [],
  team: [{ id: "reader", x: "58%", y: "56%", size: 200, motion: "breathe", depth: 0.3 }],
};

export type HeroProp = "pail" | "flask" | "drop" | "none";

export const HERO_PROP: Record<ArtScene, HeroProp> = {
  project: "pail",
  wetlab: "none",
  drylab: "flask",
  engagement: "drop",
  team: "none",
};
