import type { Metadata } from "next";
import Content from "@/content/team/references.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "References",
  description: "Sources and further reading cited across the AURA wiki.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "list", label: "Bibliography" },
  { id: "further", label: "Further reading" },
];

export default function Page() {
  return (
    <WikiMdxShell
      kicker="Team · References"
      accent="ink"
      title="Sources & further reading"
      lede="Bibliography for mastitis biology, economics, detection, and biosensor context."
      current="/references"
      toc={TOC}
    >
      <Content />
    </WikiMdxShell>
  );
}
