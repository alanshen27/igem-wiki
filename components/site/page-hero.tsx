import { Container } from "@/components/ui/container";
import { Badge, type Accent } from "@/components/ui/badge";
import { FloatingCellBackground } from "@/components/viz/floating-cells";
import { cn } from "@/lib/utils";

/** PageHero — the dark cinematic band that opens every inner wiki page. */
export function PageHero({
  kicker,
  title,
  lede,
  accent = "signal",
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: string;
  accent?: Accent;
  children?: React.ReactNode;
}) {
  return (
    <section className="section-dark relative overflow-hidden">
      <FloatingCellBackground density={16} tone="ink" seed={19} className="opacity-60" />
      <div
        className={cn(
          "pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] opacity-40",
          accent === "pink" || accent === "coral" ? "aura-bloom" : "aura-bloom-cyan",
        )}
        aria-hidden
      />
      <Container className="relative py-20 sm:py-28">
        <Badge accent={accent} className="border-milk/20 bg-milk/10 text-milk">
          {kicker}
        </Badge>
        <h1 className="mt-5 max-w-3xl font-display text-balance text-milk display-1">{title}</h1>
        {lede && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-milk/70 text-pretty">{lede}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
