"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { AuraMark } from "./aura-mark";
import { MobileNav } from "./mobile-nav";
import { WikiNavCard } from "./wiki-nav-card";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<{ pathname: string; openGroup: string | null }>({
    pathname,
    openGroup: null,
  });
  const openGroup = menuState.pathname === pathname ? menuState.openGroup : null;
  const setOpenGroup = (group: string | null) => setMenuState({ pathname, openGroup: group });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink/10 bg-milk/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
      onMouseLeave={() => setOpenGroup(null)}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none"
          aria-label="AURA home"
        >
          <AuraMark className="h-8 w-8" />
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            AURA
          </span>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-40 sm:inline">
            iGEM 2025
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((group) => {
            const isOpen = openGroup === group.label;
            const isActiveGroup = group.links.some((l) => pathname.startsWith(l.href) && l.href !== "/");
            return (
              <div key={group.label} onMouseEnter={() => setOpenGroup(group.label)}>
                <button
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActiveGroup ? "text-ink" : "text-ink-70 hover:text-ink",
                    isOpen && "text-ink",
                  )}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(isOpen ? null : group.label)}
                  onFocus={() => setOpenGroup(group.label)}
                >
                  {group.label}
                </button>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/description"
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-medium text-milk transition-transform hover:-translate-y-0.5 sm:inline-flex lg:inline-flex"
          >
            Explore the Project
          </Link>
          <MobileNav />
        </div>
      </div>

      {/* Mega menu panel */}
      <AnimatePresence>
        {openGroup && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-16 hidden border-b border-ink/10 bg-milk lg:block"
          >
            <div className="mx-auto max-w-7xl px-8 py-8">
              {NAV.filter((g) => g.label === openGroup).map((group) => (
                <div key={group.label}>
                  <p className="mb-5 max-w-md text-sm text-ink-55">{group.intro}</p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
                    {group.links.map((link) => (
                      <WikiNavCard
                        key={link.href}
                        href={link.href}
                        label={link.label}
                        desc={link.desc}
                        accent={link.accent}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
