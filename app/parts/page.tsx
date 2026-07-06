import type { Metadata } from "next";
import Content from "@/content/wet-lab/parts.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Parts",
  description: "BioBricks and composite parts for AURA biosensor screening and reporter expression.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "basic", label: "Basic parts" },
  { id: "composite", label: "Composites" },
  { id: "measurement", label: "Measurement" },
  { id: "contribution", label: "For future teams" },
];

export default function Page() {
  return (
    <WikiMdxShell
      kicker="Wet Lab · Parts"
      accent="butter"
      title="Registry parts & constructs"
      lede="Sequences, intended use, and characterisation status for every part we submit."
      current="/parts"
      toc={TOC}
    >
      <Content />
    </WikiMdxShell>
  );
}
