"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, UserRound, X, Search } from "lucide-react";
import { cn } from "../lib/cn";
import { useHeaderScroll } from "../hooks/use-header-scroll";

export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
  external?: boolean;
}

interface SiteHeaderProps {
  brand?: "groupe" | "construction" | "assistance";
  /** Logo principal gauche — passer avec imgClassName grande (× 2). */
  logo: React.ReactNode;
  /**
   * Logo badge affiché SOUS la barre de navigation, uniquement à l'état "top"
   * (header transparent). Disparaît au scroll. Penser à passer × 3 de taille.
   */
  badgeLogo?: React.ReactNode;
  nav: NavItem[];
  /** CTA amber affiché uniquement en état "scrolled" (glassmorphism activé). */
  rightSlotScrolled?: React.ReactNode;
  scrolledThreshold?: number;
  hideThreshold?: number;
  className?: string;
}

/**
 * SiteHeader SICA — 4 états premium.
 *
 * "top"      : transparent, texte blanc sur hero sombre, badge logo visible sous la barre.
 * "scrolled" : pill glassmorphism flottant (backdrop-blur + bg-white/80 + rounded-[1.75rem]).
 * "hidden"   : translateY(-100%) scroll-down rapide.
 * re-show    : retour immédiat scroll-up.
 *
 * Toggle langue FR/EN intégré. Barre de recherche expansible.
 */
export function SiteHeader({
  brand: _brand = "groupe",
  logo,
  badgeLogo,
  nav,
  rightSlotScrolled,
  scrolledThreshold = 80,
  hideThreshold = 480,
  className,
}: SiteHeaderProps) {
  const state = useHeaderScroll({ scrolledThreshold, hideThreshold });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [lang, setLang] = React.useState<"fr" | "en">("fr");
  const searchRef = React.useRef<HTMLInputElement>(null);

  const isTop = state === "top";
  const isHidden = state === "hidden";
  const isScrolled = state === "scrolled";

  React.useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => searchRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [searchOpen]);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const h = (e: MediaQueryListEvent) => { if (e.matches) setMobileOpen(false); };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HEADER FIXE
      ══════════════════════════════════════════════════════════ */}
      <motion.header
        initial={false}
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] }}
        className={cn("fixed inset-x-0 top-0 z-50", className)}
        data-state={state}
      >
        {/* a11y */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-royal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Aller au contenu principal
        </a>

        {/* ── PILL MORPHING ──────────────────────────────────────
            État "top"      → margin 0, border-radius 0, transparent
            État "scrolled" → margin 10-12px, border-radius 28px, glassmorphism
        ───────────────────────────────────────────────────────── */}
        <motion.div
          initial={false}
          animate={{
            marginLeft:   isScrolled ? 12 : 0,
            marginRight:  isScrolled ? 12 : 0,
            marginTop:    isScrolled ? 10 : 0,
            borderRadius: isScrolled ? 28 : 0,
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "overflow-hidden",
            /* Toutes les transitions à 250ms — sinon il y a une fenêtre où
               le texte blanc devient bleu AVANT que le fond blanc soit en
               place (ou inversement), créant un effet invisible. */
            "transition-[background-color,box-shadow] duration-[250ms]",
            isScrolled
              ? "bg-white shadow-[0_4px_32px_rgba(30,47,138,0.10)]"
              : "bg-transparent shadow-none",
          )}
        >
          <div className="mx-auto flex h-[4.75rem] max-w-[1440px] items-center gap-2 px-5 lg:h-[5.25rem] lg:gap-4 xl:px-8">

            {/* ══ MOBILE : pill [burger | logo] — lg:hidden ══
                Toujours fond blanc : flotte sur le hero sombre (top)
                et se fond dans le header blanc (scrolled).
                drop-shadow au lieu de box-shadow → non clipé par overflow:hidden. */}
            <div
              className={cn(
                "flex items-center rounded-2xl bg-white lg:hidden",
                "transition-[filter] duration-300",
                isTop
                  ? "[filter:drop-shadow(0_4px_20px_rgba(0,0,0,0.22))]"
                  : "[filter:drop-shadow(0_0px_0px_transparent)]",
              )}
            >
              <button
                type="button"
                aria-label="Ouvrir le menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                onClick={() => setMobileOpen(true)}
                className="inline-flex size-11 items-center justify-center text-slate-600 transition-colors duration-150 hover:bg-slate-50"
              >
                <Menu className="size-[1.125rem]" aria-hidden />
              </button>
              <div className="h-5 w-px shrink-0 bg-gray-200" />
              {/* Taille logo mobile :
                  - Repos (isTop)     → h-[60px] (×0.75 vs scroll) : pill compacte sur le hero
                  - Scroll (isScrolled) → h-20 (80px) : logo visible dans le header flottant */}
              <div className={cn(
                "flex items-center px-3",
                isTop
                  ? "[&_img]:!h-[60px] [&_img]:!w-auto"
                  : "[&_img]:!h-20 [&_img]:!w-auto",
              )}>
                {logo}
              </div>
            </div>

            {/* ══ DESKTOP : logo seul (hidden sur mobile) ══ */}
            <div
              className={cn(
                "hidden lg:block shrink-0 transition-[filter] duration-300",
                isTop && "[filter:drop-shadow(0_2px_16px_rgba(0,0,0,0.55))]",
              )}
            >
              {logo}
            </div>

            {/* ── Navigation desktop ── */}
            <nav aria-label="Navigation principale" className="hidden flex-1 lg:block">
              <ul className="flex items-center">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={cn(
                        "group relative inline-flex items-center px-3 py-2.5 xl:px-3.5",
                        "text-[0.6875rem] font-black tracking-[0.09em] uppercase",
                        "transition-colors duration-200",
                        isTop
                          ? "text-white/90 hover:text-white"
                          : "text-brand-royal hover:text-brand-royal",
                        /* Indicateur amber — glisse depuis la gauche */
                        "after:absolute after:bottom-1.5 after:left-3 after:right-3 xl:after:left-3.5 xl:after:right-3.5",
                        "after:h-[2px] after:rounded-full after:bg-brand-amber",
                        "after:origin-left after:transition-transform after:duration-250 after:ease-out",
                        item.current ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Zone droite ── */}
            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">

              {/* Toggle langue FR / EN */}
              <div
                className={cn(
                  "hidden sm:flex items-center gap-0.5 rounded-full border p-0.5",
                  "transition-[border-color] duration-300",
                  isTop ? "border-white/25" : "border-brand-royal/15",
                )}
              >
                {(["fr", "en"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    aria-label={l === "fr" ? "Version française" : "English version"}
                    aria-pressed={lang === l}
                    onClick={() => setLang(l)}
                    className={cn(
                      "rounded-full px-2.5 py-[0.3125rem] text-[0.5625rem] font-black tracking-[0.1em] uppercase",
                      "transition-all duration-200",
                      lang === l
                        ? "bg-brand-amber text-white shadow-sm"
                        : isTop
                          ? "text-white/60 hover:text-white"
                          : "text-slate/50 hover:text-brand-royal",
                    )}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Recherche expansible */}
              <div className="relative flex items-center">
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      key="search-box"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 152, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <input
                        ref={searchRef}
                        type="search"
                        placeholder="Rechercher…"
                        aria-label="Rechercher"
                        className={cn(
                          "w-full rounded-full border py-[0.4375rem] pl-4 pr-2",
                          "text-[0.8125rem] outline-none transition-all duration-200",
                          isTop
                            ? "border-white/30 bg-white/15 text-white placeholder:text-white/50 focus:bg-white/25 backdrop-blur-sm"
                            : "border-gray-200 bg-gray-50 text-ink placeholder:text-slate/50 focus:border-brand-royal focus:bg-white focus:ring-2 focus:ring-brand-royal/10",
                        )}
                        onKeyDown={(e) => { if (e.key === "Escape") setSearchOpen(false); }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  aria-label={searchOpen ? "Fermer la recherche" : "Rechercher"}
                  aria-expanded={searchOpen}
                  onClick={() => setSearchOpen((v) => !v)}
                  className={cn(
                    "inline-flex size-9 items-center justify-center rounded-full transition-all duration-200",
                    isTop
                      ? cn("text-white/90 hover:bg-white/15 hover:text-white", searchOpen && "bg-white/20 text-white")
                      : cn("text-brand-royal hover:bg-brand-royal hover:text-white", searchOpen && "bg-brand-royal text-white"),
                  )}
                >
                  {searchOpen
                    ? <X className="size-[1.0625rem]" aria-hidden />
                    : <Search className="size-[1.0625rem]" aria-hidden />
                  }
                </button>
              </div>

              {/* Espace client
                  Mobile  : icône seule (universel, compact)
                  Desktop : pill avec texte + bordure */}
              <a
                href="/espace-client"
                className={cn(
                  "inline-flex items-center gap-1.5 transition-all duration-200",
                  "text-[0.6875rem] font-black tracking-[0.07em] uppercase",
                  "lg:rounded-full lg:border lg:px-3.5 lg:py-[0.4375rem] xl:px-4",
                  isTop
                    ? "text-white lg:border-white/30 lg:hover:bg-white/15 lg:hover:border-white/50"
                    : "text-brand-royal lg:border-brand-royal/20 lg:hover:border-brand-royal lg:hover:bg-brand-royal lg:hover:text-white",
                )}
              >
                <UserRound className="size-[1.0625rem] shrink-0" aria-hidden />
                <span className="hidden lg:inline">Espace client</span>
              </a>
              {/* Burger : déplacé dans la pill gauche (mobile) — plus besoin ici */}
            </div>
          </div>
        </motion.div>

      </motion.header>

      {/* ══════════════════════════════════════════════════════════
          DRAWER MOBILE
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-brand-royal-900/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-0 top-0 flex h-full w-full max-w-[320px] flex-col bg-white shadow-2xl"
            >
              {/* Header drawer */}
              <div className="flex h-[4.75rem] shrink-0 items-center justify-between border-b border-gray-100 px-5">
                <div className="shrink-0">{logo}</div>
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex size-9 items-center justify-center rounded-full text-brand-royal transition-all duration-200 hover:bg-brand-royal hover:text-white"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>

              {/* Contenu */}
              <nav aria-label="Navigation principale (mobile)" className="flex-1 overflow-y-auto px-4 py-5">
                <ul className="flex flex-col gap-1">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center rounded-xl px-4 py-3.5",
                          "text-[0.75rem] font-black tracking-[0.07em] uppercase",
                          "text-brand-royal transition-all duration-200 hover:bg-brand-royal hover:text-white",
                          item.current && "bg-brand-royal/8",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Langue toggle mobile */}
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <p className="mb-3 px-1 text-[0.625rem] font-black uppercase tracking-[0.14em] text-slate/40">Langue</p>
                  <div className="flex gap-2 px-1">
                    {(["fr", "en"] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setLang(l)}
                        className={cn(
                          "rounded-full px-5 py-2 text-[0.75rem] font-black uppercase tracking-[0.06em]",
                          "transition-all duration-200",
                          lang === l
                            ? "bg-brand-amber text-white shadow-sm"
                            : "border border-brand-royal/20 text-slate/60 hover:text-brand-royal",
                        )}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Espace client */}
                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href="/espace-client"
                    className="flex items-center gap-2 rounded-xl border border-brand-royal/20 px-4 py-3.5 text-[0.75rem] font-black uppercase tracking-[0.07em] text-brand-royal transition-all duration-200 hover:bg-brand-royal hover:text-white"
                  >
                    <UserRound className="size-4" aria-hidden />
                    Espace client
                  </a>
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
