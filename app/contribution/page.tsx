import type { Metadata } from "next";
import Contribution from "@/content/project/contribution.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Contribution",
  description:
    "Parts, protocols, design frameworks, and lessons AURA leaves for future iGEM teams and researchers.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "parts", label: "Parts" },
  { id: "protocols", label: "Protocols" },
  { id: "framework", label: "Design framework" },
  { id: "software", label: "Software" },
  { id: "hp", label: "Human practices" },
  { id: "lessons", label: "Lessons" },
  { id: "collaboration", label: "Collaboration" },
];

export default function ContributionPage() {
  return (
    <WikiMdxShell
      kicker="Project · Contribution"
      accent="signal"
      title="What we leave for the next team"
      lede="Registry parts, reproducible methods, stakeholder-informed design frameworks, and the dead ends we documented so you do not have to hit them."
      current="/contribution"
      toc={TOC}
    >
      <Contribution />
    </WikiMdxShell>
  );
}
