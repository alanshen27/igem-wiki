import Link from "next/link";
import { HomeHero } from "@/components/home/home-hero";
import { WikiCards } from "@/components/home/wiki-cards";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/site/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { BiosensorDiagram } from "@/components/viz/biosensor-diagram";
import { FarmToLabPipeline } from "@/components/viz/farm-to-lab";
import { DbtlWheel } from "@/components/viz/dbtl-wheel";
import { StakeholderMap } from "@/components/viz/stakeholder-map";
import { SignalRevealGraph } from "@/components/viz/signal-graph";
import { IMPACT_STATS } from "@/lib/content";
import { ArrowRight, EyeOff, Microscope, FlaskConical } from "lucide-react";

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

      {/* 1 — The hidden infection (light — the milk flood from the hero lands here) */}
      <section className="relative overflow-hidden bg-milk pb-24 pt-28">
        {/* Faint aura still glowing behind the content — a soft centred halo,
            not a hard band at the seam. */}
        <Parallax speed={90} className="pointer-events-none absolute left-1/2 top-[8vh] h-[70vh] w-[95vw] max-w-5xl -translate-x-1/2 aura-bloom opacity-[0.14] blur-[80px]">
          <></>
        </Parallax>
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-ink/[0.03] px-3 py-1">
                <EyeOff className="h-4 w-4 text-coral" />
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-ink-70">
                  Subclinical mastitis
                </span>
              </div>
              <SectionHeader
                accent="coral"
                title="Where the signal hides"
                lede="Before a cow shows clinical signs — swelling, clots, a drop in yield — inflammation is already underway inside the udder. Somatic cell counts climb and milk quality quietly slips, yet the milk can still look completely normal."
              />
              <p className="mt-4 max-w-xl leading-relaxed text-ink-70">
                By the time symptoms are obvious, treatment is harder, welfare has suffered, and
                the loss is already spreading through the tank. The interesting window is the quiet
                one — before anything looks wrong.
              </p>
            </Reveal>
            <Parallax speed={46}>
              <Reveal delay={0.1}>
                <div className="rounded-[var(--radius-card)] border border-ink/10 bg-cream/50 p-8">
                  <SignalRevealGraph className="text-ink" />
                  <p className="mt-4 text-center text-sm text-ink-55">
                    Signal rises through the subclinical window — the goal is to read it while there
                    is still time to act.
                  </p>
                </div>
              </Reveal>
            </Parallax>
          </div>
        </Container>
      </section>

      {/* 2 — Small signal, massive cost */}
      <section className="bg-cream/40 py-20 sm:py-28">
        <Container>
          <SectionHeader
            kicker="Small signal, massive cost"
            accent="coral"
            title="A quiet problem with a very loud bill"
            lede="Mastitis is one of the most economically significant diseases in dairy — and most of the cost never shows up on a treatment invoice."
          />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT_STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <StatCard stat={stat} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* 3 — Current detection is not enough */}
      <section className="bg-cream/50 py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              kicker="Current detection"
              accent="butter"
              title="Good tools — but rarely early, cheap, and everywhere at once"
              lede="Each existing method trades away something: speed, cost, sensitivity, or how easily it deploys on a working farm."
            />
            <Stagger className="space-y-3">
              {DETECTION.map((d) => (
                <StaggerItem key={d.name}>
                  <div className="flex gap-4 rounded-2xl border border-ink/10 bg-milk/70 p-5">
                    <Microscope className="mt-0.5 h-5 w-5 shrink-0 text-signal-deep" aria-hidden />
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
      <section className="section-dark relative overflow-hidden py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 aura-bloom opacity-30" aria-hidden />
        <Container className="relative text-center">
          <Reveal>
            <span className="kicker text-signal">Our idea</span>
            <p className="mx-auto mt-6 max-w-4xl font-display text-milk display-1 text-balance">
              What if a biosensor could make the biological signs of mastitis{" "}
              <span className="text-aura">easier to detect earlier</span>?
            </p>
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
          <div className="mt-14">
            <BiosensorDiagram />
          </div>
          <Reveal className="mt-16">
            <div className="rounded-[var(--radius-card)] border border-ink/10 bg-cream/40 p-8">
              <p className="mb-8 text-center font-mono text-[0.7rem] uppercase tracking-widest text-ink-40">
                Farm-to-lab pipeline
              </p>
              <FarmToLabPipeline />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6 — Design, Build, Test, Learn */}
      <section className="bg-cream/50 py-20 sm:py-28">
        <Container>
          <SectionHeader
            kicker="Engineering"
            accent="butter"
            title="Design, Build, Test, Learn — on repeat"
            lede="AURA's engineering story runs through five iterative cycles. Each loop turns a question into a design, a design into a build, and a result into the next question."
          />
          <div className="mt-14 flex justify-center">
            <DbtlWheel />
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/engineering">
                Walk through all five cycles <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* 7 — Built with the people who use it */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            kicker="Human practices"
            accent="pink"
            title="Designed with farms, not just labs"
            lede="AURA only matters if the people who'd use it would trust it. We spoke with farmers, vets, processors, regulators and consumers — and let what we heard change the design."
          />
          <div className="mt-12">
            <StakeholderMap />
          </div>
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
      <section className="section-dark relative overflow-hidden py-24">
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 aura-bloom-cyan opacity-30" aria-hidden />
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
