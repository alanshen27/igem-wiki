import type { Metadata } from "next";
import Content from "@/content/dry-lab/hardware.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Hardware",
  description: "The AURA diagnostic strip and optional fluorescence reader for parlour-friendly readout.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "strip", label: "Strip" },
  { id: "reader", label: "Reader" },
  { id: "env", label: "Robustness" },
  { id: "integration", label: "Workflow" },
];

export default function Page() {
  return (
    <WikiMdxShell
      kicker="Dry Lab · Hardware"
      accent="butter"
      title="Strip & reader"
      lede="Physical prototypes designed for milking-parlour constraints — clear bands, minimal equipment."
      current="/hardware"
      toc={TOC}
    >
      <Content />
    </WikiMdxShell>
  );
}
