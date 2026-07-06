import type { Metadata } from "next";
import Content from "@/content/dry-lab/software.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Software",
  description: "Analysis scripts, wiki tooling, and optional readout assistance for AURA.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "analysis", label: "Analysis" },
  { id: "wiki", label: "Wiki" },
  { id: "reader-app", label: "Reader app" },
  { id: "license", label: "Licence" },
];

export default function Page() {
  return (
    <WikiMdxShell
      kicker="Dry Lab · Software"
      accent="pink"
      title="Readout & analysis tooling"
      lede="Scripts for dose–response analysis, this static wiki, and optional strip archiving."
      current="/software"
      toc={TOC}
    >
      <Content />
    </WikiMdxShell>
  );
}
