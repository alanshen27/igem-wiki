import Link from "next/link";
import { HomeHero } from "@/components/home/home-hero";
import { SignalSection } from "@/components/home/signal-section";
import { WikiCards } from "@/components/home/wiki-cards";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/site/section-header";
import { ImpactStats } from "@/components/home/impact-stats";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { Floaty, AuraDrift } from "@/components/motion/float";
import { BiosensorDiagram } from "@/components/viz/biosensor-diagram";
import { DbtlWheel } from "@/components/viz/dbtl-wheel";
import { StakeholderMap } from "@/components/viz/stakeholder-map";
import { FloatingCellBackground } from "@/components/viz/floating-cells";
import { ArrowRight, Microscope, FlaskConical } from "lucide-react";

const DETECTION = [
  { name: "Somatic cell count (SCC)", limit: "Reflects inflammation, but often measured periodically — a spike can be missed between tests." },
  { name: "Electrical conductivity", limit: "Cheap and fast, yet noisy and affected by many non-mastitis factors." },
  { name: "Bacterial culture", limit: "Informative for the pathogen, but slow — results can take a day or more." },
  { name: "PCR / molecular", limit: "Sensitive and specific, but equipment-heavy and hard to deploy on every farm." },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      <SignalSection />

      {/* 2 — Small signal, massive cost */}
      <section className="relative bg-gradient-to-b from-milk via-milk to-cream/40 py-20 sm:py-28">
        <Container className="relative">
          <SectionHeader
            kicker="Small signal, massive cost"
            accent="coral"
            title="A quiet problem with a very loud bill"
            lede="Mastitis is one of the most economically significant diseases in dairy — and most of the cost never shows up on a treatment invoice."
          />
          <div className="mt-12">
            <ImpactStats />
          </div>
        </Container>
      </section>

      {/* 3 — Current detection is not enough */}
      <section className="relative overflow-hidden bg-cream/50 py-20 sm:py-28">
        <Floaty className="pointer-events-none absolute right-[8%] top-[14%] text-butter/30" amount={18} duration={10} rotate={8}>
          <Microscope className="h-10 w-10" aria-hidden />
        </Floaty>
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Parallax speed={28}>
              <SectionHeader
                kicker="Current detection"
                accent="butter"
                title="Good tools — but rarely early, cheap, and everywhere at once"
                lede="Each existing method trades away something: speed, cost, sensitivity, or how easily it deploys on a working farm."
              />
            </Parallax>
            <Stagger className="space-y-3">
              {DETECTION.map((d) => (
                <StaggerItem key={d.name}>
                  <div className="group flex gap-4 rounded-2xl border border-ink/10 bg-milk/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/30 hover:bg-milk hover:shadow-[0_16px_40px_-28px_rgba(8,145,168,0.6)]">
                    <Microscope className="mt-0.5 h-5 w-5 shrink-0 text-signal-deep transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" aria-hidden />
                    <div>
                      <p className="font-medium text-ink">{d.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-70">{d.limit}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* 4 — Our idea */}
      <section className="section-dark relative py-24">
        {/* Bleed the cream section above into the dark surface */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-20 h-20 bg-gradient-to-b from-cream/50 to-transparent"
          aria-hidden
        />
        <FloatingCellBackground density={16} tone="milk" seed={11} />
        <Container className="relative text-center">
          <Reveal>
            <span className="kicker text-signal">Our idea</span>
            <Parallax speed={30}>
              <p className="mx-auto mt-6 max-w-4xl font-display text-milk display-1 text-balance">
                What if a biosensor could make the biological signs of mastitis{" "}
                <span className="text-aura">easier to detect earlier</span>?
              </p>
            </Parallax>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-milk/70">
              Synthetic biology lets us turn biological recognition into readable signals. AURA is
              designed as a diagnostic-support concept that could help decisions happen earlier —
              not a replacement for veterinary diagnosis.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="signal">
                <Link href="/description">
                  Read the full approach <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 5 — From milk to signal */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            align="center"
            kicker="From milk to signal"
            accent="signal"
            title="How a sample becomes something you can read"
            lede="A milk sample carries a biological marker. An engineered sensing system recognises it, amplifies the response, and turns it into a colour or fluorescence you can interpret."
          />
          <Reveal className="mt-14">
            <BiosensorDiagram />
          </Reveal>
        </Container>
      </section>

      {/* 6 — Design, Build, Test, Learn */}
      <section className="relative bg-cream/50">
        <DbtlWheel />
        <Container className="pb-20 sm:pb-28">
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/engineering">
                Walk through all five cycles <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* 7 — Built with the people who use it */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <AuraDrift
          className="pointer-events-none absolute right-[6%] top-[8%] h-64 w-64 rounded-full opacity-[0.1] blur-3xl"
          style={{ background: "var(--color-pink)" }}
          duration={16}
          drift={34}
        />
        <Container className="relative">
          <SectionHeader
            kicker="Human practices"
            accent="pink"
            title="Designed with farms, not just labs"
            lede="AURA only matters if the people who'd use it would trust it. We spoke with farmers, vets, processors, regulators and consumers — and let what we heard change the design."
          />
          <Reveal className="mt-12">
            <Parallax speed={22}>
              <StakeholderMap />
            </Parallax>
          </Reveal>
          <div className="mt-10">
            <Button asChild variant="pink">
              <Link href="/human-practices">
                See how they shaped AURA <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* 8 — Explore the wiki */}
      <section className="section-dark relative py-24">
        <AuraDrift
          className="pointer-events-none absolute right-[20%] top-[-4%] h-72 w-72 aura-bloom opacity-[0.18] blur-2xl"
          duration={21}
          delay={1.5}
          drift={24}
        />
        <FloatingCellBackground density={14} tone="milk" seed={23} />
        <Container className="relative">
          <SectionHeader
            onDark
            align="center"
            kicker="Explore the wiki"
            accent="signal"
            title="The whole story, page by page"
          />
          <div className="mt-12">
            {/* Cards live on a light card surface for contrast */}
            <WikiCards />
          </div>
          <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-milk/50">
            <FlaskConical className="h-4 w-4" />
            AURA is a proof-of-concept in progress. Where wet-lab data is pending, we say so.
          </p>
        </Container>
      </section>
    </>
  );
}
