import type { Metadata } from "next";
import Content from "@/content/team/members.mdx";
import { WikiMdxShell } from "@/components/site/wiki-mdx-shell";

export const metadata: Metadata = {
  title: "Members",
  description: "The students behind AURA — wet lab, dry lab, human practices, and design.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "members", label: "Members" },
  { id: "advisors", label: "Advisors" },
  { id: "contact", label: "Contact" },
];

export default function Page() {
  return (
    <WikiMdxShell
      kicker="Team · Members"
      accent="signal"
      title="The people behind AURA"
      lede="Student team spanning bench work, modeling, hardware, engagement, and this wiki."
      current="/team"
      toc={TOC}
    >
      <Content />
    </WikiMdxShell>
  );
}
