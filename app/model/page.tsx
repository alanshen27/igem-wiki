import type { Metadata } from "next";
import Content from "@/content/dry-lab/model.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Model",
  description: "Kinetics, sensitivity analysis, and decision thresholds for AURA biosensor design.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "kinetics", label: "Kinetics" },
  { id: "sensitivity", label: "Sensitivity" },
  { id: "thresholds", label: "Thresholds" },
  { id: "limits", label: "Limits" },
];

export default function Page() {
  return (
    <WikiMdxShell
      kicker="Dry Lab · Model"
      accent="signal"
      title="Kinetics, sensitivity & thresholds"
      lede="Dry-lab models that guide bench priorities — explicitly theoretical until calibrated."
      current="/model"
      toc={TOC}
    >
      <Content />
    </WikiMdxShell>
  );
}
