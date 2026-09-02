"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { AuraLogo } from "./aura-logo";
import { MobileNav } from "./mobile-nav";
import { WikiNavCard } from "./wiki-nav-card";

export function SiteNav() {
  const pathname = usePathname();
  const [onDarkHero, setOnDarkHero] = useState(pathname === "/");
  const [menuState, setMenuState] = useState<{ pathname: string; openGroup: string | null }>({
    pathname,
    openGroup: null,
  });
  const openGroup = menuState.pathname === pathname ? menuState.openGroup : null;
  const setOpenGroup = (group: string | null) => setMenuState({ pathname, openGroup: group });
  const dark = onDarkHero && !openGroup;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOnDarkHero(pathname === "/" && y < window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        !dark
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
          <AuraLogo />
          <span
            className={cn(
              "font-display text-2xl font-semibold tracking-tight transition-colors",
              dark ? "text-milk" : "text-ink",
            )}
          >
            AURA
          </span>
          <span
            className={cn(
              "hidden text-[0.7rem] sm:inline",
              dark ? "text-milk/45" : "text-ink-40",
            )}
          >
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
                    dark
                      ? isActiveGroup || isOpen
                        ? "text-milk"
                        : "text-milk/70 hover:text-milk"
                      : isActiveGroup || isOpen
                        ? "text-ink"
                        : "text-ink-70 hover:text-ink",
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
            className={cn(
              "hidden rounded-full px-5 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5 sm:inline-flex",
              dark
                ? "border border-milk/30 bg-milk/10 text-milk hover:bg-milk hover:text-ink"
                : "bg-ink text-milk",
            )}
          >
            Explore the Project
          </Link>
          <MobileNav onDark={dark} />
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
