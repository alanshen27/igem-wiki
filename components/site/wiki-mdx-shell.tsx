import { PageHero } from "@/components/site/page-hero";
import { WikiLayout } from "@/components/site/wiki-layout";
import type { TocItem } from "@/components/site/page-toc";
import type { Accent } from "@/components/ui/badge";

/** Wraps MDX project pages with the standard hero + two-column wiki layout. */
export function WikiMdxShell({
  kicker,
  title,
  lede,
  accent = "signal",
  current,
  toc,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: string;
  accent?: Accent;
  current: string;
  toc: TocItem[];
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero kicker={kicker} accent={accent} title={title} lede={lede} />
      <WikiLayout toc={toc} current={current}>
        <div className="space-y-4 [&>section]:scroll-mt-24">{children}</div>
      </WikiLayout>
    </>
  );
}
