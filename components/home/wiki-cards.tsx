import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { WikiNavCard } from "@/components/site/wiki-nav-card";
import type { Accent } from "@/components/ui/badge";

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
      {CARDS.map((c) => (
        <StaggerItem key={c.href} className={c.span ? "sm:col-span-2 lg:col-span-1" : ""}>
          <Tilt max={7} scale={1.02} className="group h-full">
            <WikiNavCard {...c} className="h-full" />
          </Tilt>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
