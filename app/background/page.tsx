import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { WikiLayout, WikiSection } from "@/components/site/wiki-layout";
import { CowSilhouette } from "@/components/viz/cow-silhouette";
import { StatCard } from "@/components/ui/stat-card";
import { Callout } from "@/components/ui/callout";
import { IMPACT_STATS } from "@/lib/content";
import { sceneFor } from "@/lib/art";

export const metadata: Metadata = {
  title: "Background",
  description: "The biology of the udder, somatic cells, and the pathogens behind bovine mastitis.",
};

const TOC = [
  { id: "udder", label: "The udder" },
  { id: "pathogens", label: "Pathogens" },
  { id: "scc", label: "Somatic cell count" },
  { id: "markers", label: "Biomarkers" },
  { id: "economics", label: "The economics" },
];

const PATHOGENS = [
  ["Contagious", "Staphylococcus aureus, Streptococcus agalactiae — spread cow-to-cow, often at milking."],
  ["Environmental", "E. coli, Streptococcus uberis, Klebsiella — from bedding, soil and manure."],
  ["Opportunistic", "Coagulase-negative staphylococci — common, usually milder, but persistent."],
];

export default function BackgroundPage() {
  return (
    <>
      <PageHero
        kicker="Project · Background"
        accent="butter"
        scene={sceneFor("/background")}
        name="Background"
        title="The biology behind the bill"
        lede="To detect mastitis earlier, it helps to understand where it starts: the udder, the immune response, and the markers that rise before anything looks wrong."
      />
      <WikiLayout toc={TOC} current="/background">
        <WikiSection id="udder" title="The udder as a system" kicker="01">
          <div className="not-prose mb-6 flex justify-center rounded-[var(--radius-card)] border border-ink/10 bg-cream/40 p-8">
            <CowSilhouette className="max-w-md" />
          </div>
          <p>
            The mammary gland is a remarkable, and vulnerable, piece of biology. Milk is synthesised
            in the alveoli and drains through ducts to the teat, whose canal is the main route for
            bacteria to enter. When pathogens breach that barrier, the immune system floods the
            tissue with white blood cells — the beginning of mastitis.
          </p>
        </WikiSection>

        <WikiSection id="pathogens" title="What causes it" kicker="02">
          <p>Mastitis-causing organisms are usually grouped by how they spread:</p>
          <div className="not-prose mt-4 space-y-3">
            {PATHOGENS.map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-ink/10 bg-milk/60 p-5">
                <p className="font-medium text-ink">{k}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-70">{v}</p>
              </div>
            ))}
          </div>
          <Callout variant="note" title="Why this matters for design" className="mt-6">
            <p>
              A single marker rarely captures every pathogen and stage. AURA focuses on
              host-response signals of inflammation, which are more general than any one organism —
              a design choice shaped directly by this biology.
            </p>
          </Callout>
        </WikiSection>

        <WikiSection id="scc" title="Somatic cell count, explained" kicker="03">
          <p>
            The somatic cell count (SCC) is the concentration of cells — mostly immune cells — in
            milk. A healthy quarter sits low; as infection triggers an immune response, SCC climbs.
            It is the closest thing the industry has to a standard early indicator, which is exactly
            why it is central to how we think about a readable signal.
          </p>
        </WikiSection>

        <WikiSection id="markers" title="Biomarkers we can read" kicker="04">
          <p>
            Beyond somatic cells, inflammation changes the molecular composition of milk: enzymes
            and acute-phase proteins shift, ratios change. These host-response biomarkers are
            attractive targets because they tend to move early and are not tied to a single
            pathogen. Selecting a specific, tractable marker is the subject of AURA&apos;s first
            engineering cycle.
          </p>
        </WikiSection>

        <WikiSection id="economics" title="The economics, in four numbers" kicker="05">
          <div className="not-prose mt-2 grid gap-4 sm:grid-cols-2">
            {IMPACT_STATS.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>
        </WikiSection>
      </WikiLayout>
    </>
  );
}
