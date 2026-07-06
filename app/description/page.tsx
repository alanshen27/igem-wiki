import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { WikiLayout, WikiSection } from "@/components/site/wiki-layout";
import { Callout } from "@/components/ui/callout";
import { BiosensorDiagram } from "@/components/viz/biosensor-diagram";
import { ReferenceList } from "@/components/ui/reference-list";
import { REFERENCES } from "@/lib/content";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Description",
  description:
    "AURA aims to explore a synthetic biology biosensor approach to earlier bovine mastitis detection — a diagnostic-support concept, not a replacement for veterinary diagnosis.",
};

const TOC = [
  { id: "abstract", label: "Abstract" },
  { id: "inspiration", label: "Inspiration" },
  { id: "what", label: "What is mastitis?" },
  { id: "why", label: "Why it matters" },
  { id: "difficult", label: "Why early detection is hard" },
  { id: "current", label: "Current solutions" },
  { id: "approach", label: "Our approach" },
  { id: "principles", label: "Design principles" },
  { id: "impact", label: "Expected impact" },
  { id: "references", label: "References" },
];

const PRINCIPLES = [
  ["Earlier, not louder", "Prioritise catching the subclinical signal over adding another late-stage alarm."],
  ["Honest about scope", "A screen that supports decisions and points to confirmatory testing — never a diagnosis on its own."],
  ["Deployable", "Designed with farm realities in mind: minimal equipment, readable output, sensible cost."],
  ["Contained by design", "In-vitro use, no environmental release, safety considered from the first sketch."],
];

export default function DescriptionPage() {
  return (
    <>
      <PageHero
        kicker="Project · Description"
        accent="signal"
        title="A synthetic biology approach to earlier mastitis detection"
        lede="AURA aims to explore whether biological recognition can be turned into a readable signal that flags mastitis-related changes in milk sooner — supporting the people who care for dairy cattle."
      />
      <WikiLayout toc={TOC} current="/description">
        <WikiSection id="abstract" title="Abstract" kicker="01">
          <p>
            Bovine mastitis — inflammation of the mammary gland, usually from infection — is among
            the most costly diseases in dairy farming. Much of its burden is <em>subclinical</em>:
            the milk looks normal while inflammation and immune response are already underway.
            Existing detection methods each trade away speed, cost, sensitivity, or ease of
            deployment.
          </p>
          <p>
            AURA is designed as a diagnostic-support concept that explores a synthetic biology
            biosensor for mastitis-associated biological signals in milk. The system could support
            earlier decision-making by making a relevant signal easier to read closer to the animal.
            AURA is not intended to replace veterinary diagnosis, and we do not claim to cure
            mastitis or to have clinically validated the system.
          </p>
          <Callout variant="note" title="How to read this page">
            <p>
              Where wet-lab results are still pending, we mark them explicitly rather than implying
              outcomes. This page describes intent, design, and rationale.
            </p>
          </Callout>
        </WikiSection>

        <WikiSection id="inspiration" title="Inspiration" kicker="02">
          <p>
            The project began with a simple observation from talking to people around dairy: by the
            time mastitis is obvious, it is often already expensive — for the cow, the farmer, and
            the milk. The interesting window is the quiet one, before symptoms.
          </p>
          <p>
            Synthetic biology is unusually well suited to that window. If a biological marker rises
            during early inflammation or infection, an engineered system can be designed to
            recognise it and convert that recognition into something a person can see. That is the
            core bet behind AURA: <strong>look for the signal before the symptom.</strong>
          </p>
        </WikiSection>

        <WikiSection id="what" title="What is mastitis?" kicker="03">
          <p>
            Mastitis is inflammation of the udder, most often triggered by bacterial infection. It
            ranges from <em>clinical</em> (visible changes to the udder or milk, systemic illness)
            to <em>subclinical</em> (no visible signs, but measurable changes such as a rising
            somatic cell count). The subclinical form is the more common and the more insidious,
            because it spreads cost and welfare impact without an obvious trigger to act on.
          </p>
        </WikiSection>

        <WikiSection id="why" title="Why mastitis matters" kicker="04">
          <p>
            Roughly one in three dairy cows experience mastitis, with reported annual herd
            incidence spanning 47–65%. The estimated global economic burden reaches around €30
            billion per year. Critically, direct treatment is less than 15% of that total — the rest
            is discarded milk, reduced yield, culling, labour, and quality penalties. Behind the
            economics sits animal welfare and the quality of a staple food.
          </p>
        </WikiSection>

        <WikiSection id="difficult" title="Why early detection is difficult" kicker="05">
          <p>
            Early signals are subtle and noisy. Somatic cell counts fluctuate and are often measured
            periodically, so a spike can pass unseen between tests. Conductivity is cheap but easily
            confounded. Culture is informative but slow. Molecular methods are sensitive but
            equipment-heavy. The practical challenge is not whether mastitis <em>can</em> be
            detected, but whether it can be detected early, affordably, and everywhere at once.
          </p>
        </WikiSection>

        <WikiSection id="current" title="Current solutions and limitations" kicker="06">
          <p>
            The mainstays — somatic cell count, electrical conductivity, bacterial culture, and
            PCR/molecular diagnostics — form a capable toolkit. But each is optimised for a
            different setting: the lab, the parlour, the reference facility. None yet delivers an
            early, low-cost, deploy-anywhere screen. AURA explores that gap rather than competing
            head-on with confirmatory diagnostics.
          </p>
        </WikiSection>

        <WikiSection id="approach" title="Our synthetic biology approach" kicker="07">
          <p>
            AURA is built around a sensing pipeline: a biological recognition element detects a
            mastitis-associated marker; a genetic circuit amplifies that recognition; and a reporter
            converts it into a colorimetric or fluorescent output. The intent is a readout that a
            non-specialist could interpret, produced with minimal equipment.
          </p>
          <div className="not-prose my-6 rounded-[var(--radius-card)] border border-ink/10 bg-ink p-6">
            <BiosensorDiagram />
          </div>
          <Callout variant="safety" title="Scope and claims">
            <p>
              AURA is a diagnostic-support concept. It could support earlier decision-making and
              point toward confirmatory testing. It does not diagnose, cure, or eliminate the need
              for antibiotics or veterinary care.
            </p>
          </Callout>
        </WikiSection>

        <WikiSection id="principles" title="Design principles" kicker="08">
          <div className="not-prose grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-ink/10 bg-milk/60 p-5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-bio" />
                  <p className="font-medium text-ink">{title}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-70">{body}</p>
              </div>
            ))}
          </div>
        </WikiSection>

        <WikiSection id="impact" title="Expected impact" kicker="09">
          <p>
            If realised, an earlier and more accessible screen could shift mastitis management from
            reactive to proactive: fewer cows progressing to clinical disease, better-targeted use
            of veterinary resources, protected milk quality, and improved welfare. We frame these as
            <em> possibilities the design is oriented toward</em>, contingent on validation that is
            beyond a single competition season.
          </p>
        </WikiSection>

        <WikiSection id="references" title="References" kicker="10">
          <ReferenceList references={REFERENCES.slice(0, 6)} />
        </WikiSection>
      </WikiLayout>
    </>
  );
}
