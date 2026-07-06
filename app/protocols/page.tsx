import type { Metadata } from "next";
import Content from "@/content/wet-lab/protocols.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Protocols",
  description: "Reproducible bench methods for milk prep, binding screens, expression, and strip readout.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "milk", label: "Milk prep" },
  { id: "binding", label: "Binding screen" },
  { id: "expression", label: "Expression" },
  { id: "strip", label: "Strip readout" },
  { id: "waste", label: "Waste" },
];

export default function Page() {
  return (
    <WikiMdxShell
      kicker="Wet Lab · Protocols"
      accent="signal"
      title="Reproducible methods"
      lede="Step-by-step protocols with controls, matrix considerations, and waste handling."
      current="/protocols"
      toc={TOC}
    >
      <Content />
    </WikiMdxShell>
  );
}
