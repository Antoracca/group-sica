"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Menu, Search, UserRound, X } from "lucide-react";
import { cn } from "../lib/cn";
import { useHeaderScroll } from "../hooks/use-header-scroll";

export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
  external?: boolean;
}

interface SiteHeaderProps {
  /** Visual brand variant (affects subtle tone, not core palette). */
  brand?: "groupe" | "construction" | "assistance";
  /** Logo node — typically <Logo brand=... /> from the same package. */
  logo: React.ReactNode;
  /** Main nav items. 5–7 max recommended. */
  nav: NavItem[];
  /** Right slot shown on the transparent (top-of-page) state. e.g. affiliation logos. */
  rightSlotInitial?: React.ReactNode;
  /** Right slot shown on the solid (scrolled) state. e.g. a primary CTA. */
  rightSlotScrolled?: React.ReactNode;
  /** Distance before switching to "scrolled". */
  scrolledThreshold?: number;
  /** Distance after which scroll-down hides the header. */
  hideThreshold?: number;
  className?: string;
}

/**
 * SiteHeader — Vinci-class 4-state header.
 *   - top      : transparent overlay on hero, in document flow visually.
 *   - scrolled : fixed top-0, royal solid background, drop shadow, CTA morph.
 *   - hidden   : translated off-screen when scrolling down beyond hideThreshold.
 *   - scrolled (re-show) : returns instantly as soon as the user scrolls up.
 *
 * Honors prefers-reduced-motion (no hide-on-scroll).
 */
export function SiteHeader({
  brand: _brand = "groupe",
  logo,
  nav,
  rightSlotInitial,
  rightSlotScrolled,
  scrolledThreshold = 80,
  hideThreshold = 480,
  className,
}: SiteHeaderProps) {
  const state = useHeaderScroll({ scrolledThreshold, hideThreshold });
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isTop = state === "top";
  const isHidden = state === "hidden";

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between",
          "h-header-height lg:h-header-height-lg px-gutter",
          "transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out",
          isTop
            ? "bg-transparent text-white shadow-none"
            : "bg-brand-royal text-white shadow-header backdrop-blur-md supports-[backdrop-filter]:bg-brand-royal/95",
          className,
        )}
        data-state={state}
      >
        {/* Skip-to-content (a11y) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
        >
          Aller au contenu principal
        </a>

        <div className="flex items-center gap-4 lg:gap-10">
          <div className="shrink-0">{logo}</div>
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    {...(item.external ? { target: "_blank", rel: "noopener" } : null)}
                    className={cn(
                      "relative inline-flex items-center px-3 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors",
                      "text-white/90 hover:text-white",
                      "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-brand-amber after:opacity-0 after:transition-opacity",
                      item.current && "after:opacity-100",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <button
            type="button"
            aria-label="Rechercher"
            className="hidden lg:inline-flex size-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Search className="size-5" aria-hidden />
          </button>
          <div className="hidden lg:block">{isTop ? rightSlotInitial : rightSlotScrolled}</div>
          <button
            type="button"
            aria-label="Espace client"
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white lg:px-4"
          >
            <UserRound className="size-5" aria-hidden />
            <span className="hidden sm:inline">Espace client</span>
          </button>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] lg:hidden"
        >
          <div
            className="absolute inset-0 bg-brand-royal-900/80"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-brand-royal text-white shadow-2xl">
            <div className="flex h-header-height items-center justify-between px-gutter">
              <div className="shrink-0">{logo}</div>
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-6" aria-hidden />
              </button>
            </div>
            <nav aria-label="Navigation principale (mobile)" className="flex-1 overflow-y-auto px-gutter pb-8">
              <ul className="flex flex-col gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white",
                        item.current && "bg-white/10 text-white",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              {rightSlotScrolled ? <div className="mt-6">{rightSlotScrolled}</div> : null}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
