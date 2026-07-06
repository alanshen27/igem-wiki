import Link from "next/link";
import { NAV } from "@/lib/nav";
import { Container } from "@/components/ui/container";
import { AuraMark } from "./aura-mark";

export function SiteFooter() {
  return (
    <footer className="section-dark relative">
      <div
        className="pointer-events-none absolute right-[22%] top-[-10%] h-80 w-80 aura-bloom opacity-[0.16] blur-2xl"
        aria-hidden
      />
      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <AuraMark className="h-9 w-9" />
              <span className="font-display text-3xl font-semibold text-milk">AURA</span>
            </Link>
            <p className="mt-4 max-w-sm font-display text-xl leading-snug text-milk/80">
              Milk is quiet. Infection is not.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-milk/50">
              A student-led iGEM 2025 project exploring a synthetic biology approach to earlier,
              more accessible bovine mastitis detection. A diagnostic-support concept — not a
              replacement for veterinary diagnosis.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {NAV.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-milk/40">
                  {group.label}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-milk/70 transition-colors hover:text-signal"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-milk/10 pt-6 text-xs text-milk/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AURA · iGEM 2025. Built by students.</p>
          <p className="font-mono">
            Content on this wiki reflects a proof-of-concept in progress. Pending data is marked as such.
          </p>
        </div>
      </Container>
    </footer>
  );
}
