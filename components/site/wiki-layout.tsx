import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageToc, type TocItem } from "./page-toc";
import { ALL_PAGES } from "@/lib/nav";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Section block that also serves as a TOC scroll target. */
export function WikiSection({
  id,
  title,
  kicker,
  children,
  className,
}: {
  id: string;
  title?: string;
  kicker?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-10 first:pt-0", className)}>
      {kicker && <p className="kicker mb-2 text-pink-deep">{kicker}</p>}
      {title && <h2 className="mb-5 font-display text-ink display-2">{title}</h2>}
      <div className="space-y-4 text-ink-70 leading-relaxed [&_p]:text-pretty">{children}</div>
    </section>
  );
}

function PrevNext({ current }: { current: string }) {
  const idx = ALL_PAGES.findIndex((p) => p.href === current);
  const prev = idx > 0 ? ALL_PAGES[idx - 1] : null;
  const next = idx >= 0 && idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null;
  if (!prev && !next) return null;
  return (
    <div className="mt-16 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="group rounded-2xl border border-ink/10 p-5 transition-colors hover:border-ink/30">
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-40">
            <ArrowLeft className="h-3.5 w-3.5" /> Previous
          </span>
          <span className="mt-1 block font-display text-lg text-ink group-hover:text-pink-deep">{prev.label}</span>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link href={next.href} className="group rounded-2xl border border-ink/10 p-5 text-right transition-colors hover:border-ink/30">
          <span className="flex items-center justify-end gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-40">
            Next <ArrowRight className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 block font-display text-lg text-ink group-hover:text-pink-deep">{next.label}</span>
        </Link>
      )}
    </div>
  );
}

/** Two-column wiki body: content + sticky TOC, with prev/next footer. */
export function WikiLayout({
  toc,
  current,
  children,
}: {
  toc: TocItem[];
  current: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0 max-w-3xl">
          {children}
          <PrevNext current={current} />
        </div>
        <PageToc items={toc} />
      </div>
    </Container>
  );
}
