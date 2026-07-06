import Link from "next/link";
import { HomeHero } from "@/components/home/home-hero";
import { WikiCards } from "@/components/home/wiki-cards";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/site/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { Tilt } from "@/components/motion/tilt";
import { Floaty, AuraDrift } from "@/components/motion/float";
import { BiosensorDiagram } from "@/components/viz/biosensor-diagram";
import { FarmToLabPipeline } from "@/components/viz/farm-to-lab";
import { DbtlWheel } from "@/components/viz/dbtl-wheel";
import { StakeholderMap } from "@/components/viz/stakeholder-map";
import { SignalRevealGraph } from "@/components/viz/signal-graph";
import { FloatingCellBackground } from "@/components/viz/floating-cells";
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
        {/* Faint aura still glowing behind the content — a soft centred halo that
            slowly breathes, picking up where the hero's bloom left off. */}
        <Parallax speed={90} className="pointer-events-none absolute left-1/2 top-[8vh] h-[70vh] w-[95vw] max-w-5xl -translate-x-1/2">
          <AuraDrift className="h-full w-full aura-bloom opacity-[0.14] blur-[80px]" duration={20} drift={40} />
        </Parallax>
        {/* A couple of drifting cell motes for depth on the quiet side. */}
        <Floaty className="pointer-events-none absolute left-[6%] top-[22%] h-3 w-3 rounded-full bg-coral/25 blur-[1px]" amount={22} duration={9} />
        <Floaty className="pointer-events-none absolute right-[10%] top-[62%] h-2 w-2 rounded-full bg-signal/30 blur-[1px]" amount={16} duration={11} delay={1.5} />
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
                <Tilt max={6} scale={1.015} className="group">
                  <div className="rounded-[var(--radius-card)] border border-ink/10 bg-cream/50 p-8 shadow-[0_24px_80px_-40px_rgba(7,5,16,0.4)]">
                    <SignalRevealGraph className="text-ink" />
                    <p className="mt-4 text-center text-sm text-ink-55">
                      Signal rises through the subclinical window — the goal is to read it while there
                      is still time to act.
                    </p>
                  </div>
                </Tilt>
              </Reveal>
            </Parallax>
          </div>
        </Container>
      </section>

      {/* 2 — Small signal, massive cost */}
      <section className="relative overflow-hidden bg-cream/40 py-20 sm:py-28">
        <AuraDrift
          className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full opacity-[0.12] blur-3xl"
          style={{ background: "var(--color-coral)" }}
          duration={18}
          drift={30}
        />
        <Container className="relative">
          <SectionHeader
            kicker="Small signal, massive cost"
            accent="coral"
            title="A quiet problem with a very loud bill"
            lede="Mastitis is one of the most economically significant diseases in dairy — and most of the cost never shows up on a treatment invoice."
          />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT_STATS.map((stat, i) => (
              <StaggerItem key={stat.label}>
                {/* Alternate cards drift at slightly different rates for a
                    living, layered grid rather than a static row. */}
                <Parallax speed={i % 2 === 0 ? 18 : 34} className="h-full">
                  <Tilt max={9} scale={1.03} className="group h-full">
                    <StatCard stat={stat} />
                  </Tilt>
                </Parallax>
              </StaggerItem>
            ))}
          </Stagger>
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
      <section className="section-dark relative overflow-hidden py-24">
        <AuraDrift className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 aura-bloom opacity-30" duration={14} drift={36} />
        <AuraDrift className="pointer-events-none absolute left-[12%] top-[16%] h-64 w-64 aura-bloom-cyan opacity-25 blur-2xl" duration={19} delay={2} drift={44} />
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
            <Parallax speed={24}>
              <BiosensorDiagram />
            </Parallax>
          </Reveal>
          <Reveal className="mt-16">
            <Tilt max={4} scale={1.008} className="group">
              <div className="rounded-[var(--radius-card)] border border-ink/10 bg-cream/40 p-8 transition-shadow duration-300 group-hover:shadow-[0_30px_90px_-50px_rgba(7,5,16,0.5)]">
                <p className="mb-8 text-center font-mono text-[0.7rem] uppercase tracking-widest text-ink-40">
                  Farm-to-lab pipeline
                </p>
                <FarmToLabPipeline />
              </div>
            </Tilt>
          </Reveal>
        </Container>
      </section>

      {/* 6 — Design, Build, Test, Learn */}
      <section className="relative overflow-hidden bg-cream/50 py-20 sm:py-28">
        <AuraDrift
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-[0.1] blur-3xl"
          style={{ background: "var(--color-butter)" }}
          duration={17}
          drift={28}
        />
        <Container className="relative">
          <SectionHeader
            kicker="Engineering"
            accent="butter"
            title="Design, Build, Test, Learn — on repeat"
            lede="AURA's engineering story runs through five iterative cycles. Each loop turns a question into a design, a design into a build, and a result into the next question."
          />
          <Parallax speed={26} className="mt-14 flex justify-center">
            <DbtlWheel />
          </Parallax>
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
      <section className="section-dark relative overflow-hidden py-24">
        <AuraDrift className="pointer-events-none absolute -left-24 top-10 h-80 w-80 aura-bloom-cyan opacity-30" duration={15} drift={40} />
        <AuraDrift className="pointer-events-none absolute -right-16 bottom-6 h-72 w-72 aura-bloom opacity-20 blur-2xl" duration={21} delay={1.5} drift={32} />
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
