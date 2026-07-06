import type { Metadata } from "next";
import Content from "@/content/engagement/safety.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Safety",
  description: "Containment, responsible use, and iGEM safety compliance for AURA.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "commitments", label: "Commitments" },
  { id: "organisms", label: "Organisms" },
  { id: "release", label: "Release" },
  { id: "dual-use", label: "Dual use" },
  { id: "igem", label: "iGEM" },
];

export default function Page() {
  return (
    <WikiMdxShell
      kicker="Engagement · Safety"
      accent="coral"
      title="Containment & responsible use"
      lede="In-vitro by design, no environmental release, and claims matched to validation."
      current="/safety"
      toc={TOC}
    >
      <Content />
    </WikiMdxShell>
  );
}
