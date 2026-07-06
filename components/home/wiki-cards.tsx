import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ACCENT_HEX, type Accent } from "@/components/ui/badge";

const CARDS: {
  href: string;
  label: string;
  desc: string;
  accent: Accent;
  span?: boolean;
}[] = [
  { href: "/description", label: "Description", desc: "The abstract, the inspiration, and AURA's synthetic biology approach.", accent: "signal", span: true },
  { href: "/engineering", label: "Engineering", desc: "Five Design–Build–Test–Learn cycles, from target selection to readout.", accent: "butter" },
  { href: "/human-practices", label: "Human Practices", desc: "Built with farmers, vets, processors, regulators and consumers.", accent: "pink" },
  { href: "/safety", label: "Safety", desc: "Containment, responsible use, and iGEM compliance.", accent: "coral" },
  { href: "/notebook", label: "Notebook", desc: "A dated record of wet lab, dry lab, and engagement work.", accent: "bio" },
  { href: "/team", label: "Team", desc: "The students behind AURA — and everyone who helped.", accent: "signal" },
];

export function WikiCards() {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CARDS.map((c) => {
        const hex = ACCENT_HEX[c.accent];
        return (
          <StaggerItem key={c.href} className={c.span ? "sm:col-span-2 lg:col-span-1" : ""}>
            <Link
              href={c.href}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-ink/10 bg-milk/70 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/5"
            >
              <div
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-15 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-40"
                style={{ background: hex }}
                aria-hidden
              />
              <div className="relative">
                <span className="h-1 w-8 rounded-full" style={{ background: hex, display: "block" }} aria-hidden />
                <h3 className="mt-4 font-display text-2xl text-ink">{c.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-70">{c.desc}</p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink group-hover:text-pink-deep">
                Open page
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
