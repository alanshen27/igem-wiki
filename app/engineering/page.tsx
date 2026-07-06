import type { Metadata } from "next";
import Engineering from "@/content/project/engineering.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Five Design–Build–Test–Learn cycles: from biomarker selection through recognition, genetic circuit, readout, and integration.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "cycle-1", label: "Cycle 1 — Target" },
  { id: "cycle-2", label: "Cycle 2 — Recognition" },
  { id: "cycle-3", label: "Cycle 3 — Circuit" },
  { id: "cycle-4", label: "Cycle 4 — Readout" },
  { id: "cycle-5", label: "Cycle 5 — Integration" },
  { id: "dbtl", label: "DBTL wheel" },
  { id: "pipeline", label: "Pipeline" },
];

export default function EngineeringPage() {
  return (
    <WikiMdxShell
      kicker="Project · Engineering"
      accent="butter"
      title="Five cycles from target to test strip"
      lede="AURA's engineering runs through Design–Build–Test–Learn: each loop turns a question into a construct, a construct into data, and data into the next design."
      current="/engineering"
      toc={TOC}
    >
      <Engineering />
    </WikiMdxShell>
  );
}
