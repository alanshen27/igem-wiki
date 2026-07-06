import type { Metadata } from "next";
import Content from "@/content/engagement/education.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Education",
  description: "Synthetic biology and mastitis explained without prerequisites.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "glossary", label: "Glossary" },
  { id: "biosensor", label: "Biosensors" },
  { id: "mastitis", label: "Mastitis" },
  { id: "events", label: "Events" },
];

export default function Page() {
  return (
    <WikiMdxShell
      kicker="Engagement · Education"
      accent="butter"
      title="SynBio, explained plainly"
      lede="Glossary, analogies, and outreach materials for people new to synthetic biology."
      current="/education"
      toc={TOC}
    >
      <Content />
    </WikiMdxShell>
  );
}
