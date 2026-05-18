"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  List,
  X,
  MagnifyingGlass,
  UserCircle,
  CaretDown,
  ArrowRight,
  Translate,
  Briefcase,
  Compass,
  Buildings,
  EnvelopeSimple,
  ArrowSquareOut,
  Globe,
  Handshake,
  HardHat,
  Phone,
  Calculator,
  Trophy,
} from "@phosphor-icons/react";
import { cn } from "../lib/cn";
import { useHeaderScroll } from "../hooks/use-header-scroll";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
  external?: boolean;
  tagline?: string;
  children?: NavSubItem[];
}

export type TopNavIcon =
  | "briefcase"
  | "compass"
  | "building"
  | "phone"
  | "mail"
  | "users"
  | "construction"
  | "assistance"
  | "realisations";

export interface TopNavItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: TopNavIcon;
}

const TOP_ICONS: Record<
  TopNavIcon,
  React.ComponentType<{ size?: number; weight?: "thin" | "light" | "regular" | "bold"; className?: string }>
> = {
  briefcase: Briefcase,
  compass: Compass,
  building: Buildings,
  phone: Phone,
  mail: EnvelopeSimple,
  users: Handshake,
  construction: HardHat,
  assistance: Calculator,
  realisations: Trophy,
};

interface SiteHeaderProps {
  brand?: "groupe" | "construction" | "assistance";
  logo: React.ReactNode;
  badgeLogo?: React.ReactNode;
  nav: NavItem[];
  topNav?: TopNavItem[];
  rightSlotScrolled?: React.ReactNode;
  scrolledThreshold?: number;
  hideThreshold?: number;
  className?: string;
  /** Force le rendu "scrolled" (fond blanc, texte foncé) dès le chargement.
   *  À activer sur les pages SANS hero vidéo plein écran — sinon la nav
   *  blanche reste invisible sur un fond blanc. */
  forceScrolled?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SiteHeader({
  brand: _brand = "groupe",
  logo,
  badgeLogo: _badgeLogo,
  nav,
  topNav,
  rightSlotScrolled: _rightSlotScrolled,
  scrolledThreshold = 80,
  hideThreshold = 480,
  className,
  forceScrolled = false,
}: SiteHeaderProps) {
  const state = useHeaderScroll({ scrolledThreshold, hideThreshold });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [desktopOpenLabel, setDesktopOpenLabel] = React.useState<string | null>(null);
  const [lang, setLang] = React.useState<"fr" | "en">("fr");
  const searchRef = React.useRef<HTMLInputElement>(null);
  const closeMenuTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── États d'apparence — surchargés par forceScrolled (pages sans hero) ──
  const isTop = !forceScrolled && state === "top";
  const isHidden = state === "hidden";
  const isScrolled = forceScrolled || state === "scrolled";

  // ── Search focus ──
  React.useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => searchRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [searchOpen]);

  // ── Close mobile drawer on lg breakpoint ──
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const h = (e: MediaQueryListEvent) => {
      if (e.matches) { setMobileOpen(false); setMobileExpanded(null); }
    };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // ── SCROLL LOCK : bloque tout défilement quand le drawer mobile est ouvert ──
  // Technique "position:fixed" — préserve la position de scroll au retour
  React.useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  // ── Desktop dropdown timer cleanup ──
  React.useEffect(() => {
    return () => { if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current); };
  }, []);

  // ── SCROLL LOCK desktop : bloque le défilement en fond quand le mega-menu est ouvert ──
  React.useEffect(() => {
    if (!desktopOpenLabel) return;
    const scrollY = window.scrollY;
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [desktopOpenLabel]);

  const desktopOpenItem = React.useMemo(
    () => nav.find((item) => item.label === desktopOpenLabel && item.children?.length),
    [desktopOpenLabel, nav],
  );

  const openDesktopMenu = (label: string) => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    setDesktopOpenLabel(label);
  };
  const closeDesktopMenu = () => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    closeMenuTimer.current = setTimeout(() => setDesktopOpenLabel(null), 140);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] }}
        className={cn("fixed inset-x-0 top-0 z-50", className)}
        data-state={state}
        /* Fond blanc garanti sur les pages sans hero vidéo.
           Style inline = priorité maximale, impossible à écraser
           par Tailwind ou Framer Motion. */
        style={
          forceScrolled
            ? { backgroundColor: "#1E2F8A", boxShadow: "0 2px 24px rgba(7,20,74,0.28)" }
            : undefined
        }
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-royal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
          Aller au contenu principal
        </a>

        {/* ══════════════════════════════════════════════════════════════
            TOP UTILITY BAR — desktop uniquement
            Fond blanc avec nuance de bleu aux extrémités (subtil, premium)
            Icônes Phosphor light + séparateurs pipe + icône Translate langue
        ══════════════════════════════════════════════════════════════ */}
        {topNav && topNav.length > 0 ? (
          <div className="relative hidden lg:block overflow-hidden border-b border-slate-100">
            {/* Base blanche */}
            <div className="absolute inset-0 bg-white" />
            {/* Nuance dégradée bleu — très subtile, juste un soufflé de couleur aux bords */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, rgba(30,47,138,0.045) 0%, rgba(30,47,138,0.01) 22%, rgba(255,255,255,0) 50%, rgba(30,47,138,0.008) 78%, rgba(30,47,138,0.038) 100%)",
              }}
            />

            <div className="relative mx-auto max-w-[1440px] px-5 xl:px-8">
              <div className="flex h-[2.5rem] items-center justify-end">
                {topNav.map((item, idx) => {
                  const Icon = item.icon ? TOP_ICONS[item.icon] : null;
                  return (
                    <React.Fragment key={item.label}>
                      {idx > 0 ? (
                        <span aria-hidden className="mx-4 select-none text-[0.85rem] font-light text-slate-300">
                          |
                        </span>
                      ) : null}
                      <a
                        href={item.href}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group inline-flex items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.015em] text-slate-600 transition-colors duration-200 hover:text-brand-royal"
                      >
                        {Icon ? (
                          <Icon size={13} weight="light" className="text-brand-royal/50 transition-colors duration-200 group-hover:text-brand-royal" />
                        ) : null}
                        {item.label}
                        {item.external ? (
                          <ArrowSquareOut size={10} weight="light" className="text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                        ) : null}
                      </a>
                    </React.Fragment>
                  );
                })}

                {/* Séparateur + langue */}
                <span aria-hidden className="mx-4 select-none text-[0.85rem] font-light text-slate-300">|</span>
                <div className="flex items-center gap-2">
                  <Translate size={14} weight="light" className="text-brand-royal/50" aria-hidden />
                  {(["fr", "en"] as const).map((l, i) => (
                    <React.Fragment key={l}>
                      {i > 0 ? <span aria-hidden className="select-none text-xs text-slate-200">/</span> : null}
                      <button
                        type="button"
                        aria-label={l === "fr" ? "Version francaise" : "English version"}
                        aria-pressed={lang === l}
                        onClick={() => setLang(l)}
                        className={cn(
                          "text-[0.7rem] font-semibold uppercase tracking-[0.06em] transition-colors duration-200",
                          lang === l ? "text-brand-royal" : "text-slate-400 hover:text-brand-royal",
                        )}
                      >
                        {l === "fr" ? "Français" : "English"}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ══════════════════════════════════════════════════════════════
            MOBILE UTILITY STRIP — visible HORS du drawer, au-dessus
            de la barre hamburger. Minimaliste : Nos pôles | Groupe SICA
            + sélecteur FR/EN bien visible. Même nuance bleutée que desktop.
        ══════════════════════════════════════════════════════════════ */}
        <div className="relative block overflow-hidden border-b border-slate-100/80 lg:hidden">
          {/* Base blanche */}
          <div className="absolute inset-0 bg-white" />
          {/* Nuance bleue latérale — miroir exact du desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, rgba(30,47,138,0.045) 0%, rgba(30,47,138,0.01) 28%, transparent 50%, rgba(30,47,138,0.008) 72%, rgba(30,47,138,0.038) 100%)",
            }}
          />

          <div className="relative flex h-[2rem] items-center justify-between px-4">
            {/* Gauche : liens utilitaires compacts */}
            <div className="flex items-center gap-0">
              <a
                href="/realisations"
                className="flex items-center gap-1 text-[0.63rem] font-medium text-slate-500 transition-colors hover:text-brand-royal"
              >
                <Trophy size={11} weight="light" className="text-brand-royal/40" aria-hidden />
                <span>Réalisations</span>
              </a>
              <span aria-hidden className="mx-2.5 text-[0.75rem] font-light text-slate-200 select-none">|</span>
              <a
                href="/a-propos"
                className="flex items-center gap-1 text-[0.63rem] font-medium text-slate-500 transition-colors hover:text-brand-royal"
              >
                <Compass size={11} weight="light" className="text-brand-royal/40" aria-hidden />
                <span>Corporate</span>
              </a>
            </div>

            {/* Droite : sélecteur de langue avec icône Translate */}
            <div className="flex items-center gap-1.5">
              <Translate size={12} weight="light" className="text-brand-royal/40" aria-hidden />
              {(["fr", "en"] as const).map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 ? (
                    <span aria-hidden className="select-none text-[0.6rem] text-slate-200">/</span>
                  ) : null}
                  <button
                    type="button"
                    aria-label={l === "fr" ? "Version francaise" : "English version"}
                    aria-pressed={lang === l}
                    onClick={() => setLang(l)}
                    className={cn(
                      "text-[0.63rem] font-bold uppercase tracking-[0.06em] transition-colors duration-200",
                      lang === l ? "text-brand-royal" : "text-slate-400 hover:text-brand-royal",
                    )}
                  >
                    {l.toUpperCase()}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN NAV — Logo + nav collée à gauche + actions droite
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={false}
          animate={{
            /* Pill flottant UNIQUEMENT sur les pages avec hero (forceScrolled=false).
               Sur les pages internes, header pleine largeur — pas de pill. */
            marginLeft: !forceScrolled && isScrolled ? 12 : 0,
            marginRight: !forceScrolled && isScrolled ? 12 : 0,
            marginTop: !forceScrolled && isScrolled ? 10 : 0,
            borderRadius: !forceScrolled && isScrolled ? 24 : 0,
          }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "overflow-visible transition-[background-color,box-shadow] duration-[280ms]",
            /* forceScrolled → fond géré par le style inline du motion.header,
               la motion.div reste transparente pour ne pas doubler l'ombre.
               Sinon : comportement scroll normal. */
            forceScrolled
              ? "bg-transparent shadow-none"
              : isScrolled
                ? "bg-[#1E2F8A] shadow-[0_8px_32px_rgba(7,20,74,0.32)]"
                : "bg-transparent shadow-none",
          )}
          onMouseLeave={closeDesktopMenu}
        >
          <div className="mx-auto flex h-[4.75rem] max-w-[1440px] items-center px-5 lg:h-[5.5rem] xl:px-8">

            {/* Mobile : plaque menu + logo
                Quand la barre de recherche est ouverte → logo masqué pour
                libérer l'espace. Le hamburger reste toujours visible.        */}
            <div className={cn(
              "flex items-center rounded-2xl bg-white lg:hidden",
              "transition-[filter] duration-300",
              isTop ? "[filter:drop-shadow(0_4px_20px_rgba(0,0,0,0.22))]" : "[filter:drop-shadow(0_0px_0px_transparent)]",
            )}>
              <button
                type="button"
                aria-label="Ouvrir le menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                onClick={() => setMobileOpen(true)}
                className="inline-flex size-11 items-center justify-center text-slate-600 transition-colors hover:bg-slate-50"
              >
                <List size={20} weight="regular" aria-hidden />
              </button>
              {/* Séparateur + logo — cachés quand search est ouverte sur mobile */}
              {!searchOpen ? (
                <>
                  <div className="h-5 w-px shrink-0 bg-gray-200" />
                  <div className="flex items-center px-3 [&_img]:!h-[56px] [&_img]:!w-auto">
                    {logo}
                  </div>
                </>
              ) : null}
            </div>

            {/* Desktop : logo */}
            <div className={cn(
              "hidden shrink-0 items-center lg:flex transition-[filter] duration-300",
              /* Sur fond bleu ou transparent → ombre blanche pour faire ressortir le logo */
              "[filter:drop-shadow(0_2px_12px_rgba(255,255,255,0.18))]",
            )}>
              {logo}
            </div>

            {/* Desktop : nav collée au logo (ml-8) — pas centrée */}
            <nav aria-label="Navigation principale" className="ml-8 hidden items-center lg:flex xl:ml-10">
              <ul className="flex items-center gap-0.5">
                {nav.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  const opened = desktopOpenLabel === item.label;
                  return (
                    <li
                      key={item.label}
                      onMouseEnter={() => hasChildren ? openDesktopMenu(item.label) : setDesktopOpenLabel(null)}
                      onFocus={() => hasChildren ? openDesktopMenu(item.label) : setDesktopOpenLabel(null)}
                    >
                      <a
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={cn(
                          "group relative inline-flex items-center gap-1 px-3 py-3 xl:px-3.5",
                          "text-[0.775rem] font-semibold tracking-[0.01em] transition-colors duration-200",
                          /* Sur fond bleu (isScrolled ou forceScrolled) → texte blanc.
                             Sur fond transparent (hero) → texte blanc aussi. Toujours blanc. */
                          "text-white/90 hover:text-white",
                          "after:absolute after:bottom-[0.6rem] after:left-1/2 after:-translate-x-1/2",
                          "after:h-[1.5px] after:w-5 after:rounded-full after:bg-brand-amber",
                          "after:origin-center after:transition-transform after:duration-300 after:ease-out",
                          item.current || opened ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                        )}
                      >
                        {item.label}
                        {hasChildren ? (
                          <CaretDown size={11} weight="bold" className={cn("transition-transform duration-200", opened && "rotate-180")} aria-hidden />
                        ) : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions droite */}
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <div className="relative flex items-center">
                <AnimatePresence>
                  {searchOpen ? (
                    <motion.div
                      key="search-box"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <input
                        ref={searchRef}
                        type="search"
                        placeholder="Rechercher dans SICA…"
                        aria-label="Rechercher"
                        // font-size 16px : empêche le zoom iOS sur focus
                        style={{ fontSize: "16px" }}
                        className={cn(
                          "w-full rounded-full border py-[0.4375rem] pl-4 pr-3 outline-none transition-all duration-200 lg:text-[0.8125rem]",
                          /* Fond bleu comme transparent → même style white/frosted */
                          "border-white/30 bg-white/15 text-white placeholder:text-white/55 focus:bg-white/25 backdrop-blur-sm",
                        )}
                        onKeyDown={(e) => { if (e.key === "Escape") setSearchOpen(false); }}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                <button
                  type="button"
                  aria-label={searchOpen ? "Fermer la recherche" : "Rechercher"}
                  aria-expanded={searchOpen}
                  onClick={() => setSearchOpen((v) => !v)}
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-full transition-all duration-200",
                    /* Fond bleu ou transparent → toujours blanc */
                    cn("text-white/90 hover:bg-white/15 hover:text-white", searchOpen && "bg-white/20 text-white"),
                  )}
                >
                  {searchOpen ? <X size={17} weight="regular" aria-hidden /> : <MagnifyingGlass size={17} weight="light" aria-hidden />}
                </button>
              </div>

              <a
                href="/espace-client"
                className={cn(
                  "inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.04em] transition-all duration-200",
                  "lg:rounded-full lg:border lg:px-4 lg:py-2",
                  isTop ? "text-white" : "text-brand-royal",
                  "lg:text-white lg:border-brand-amber lg:bg-brand-amber lg:hover:brightness-110 lg:shadow-[0_2px_14px_rgba(247,160,38,0.30)]",
                )}
              >
                <UserCircle size={16} weight="light" className="shrink-0" aria-hidden />
                <span className="hidden lg:inline">Espace client</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            MEGA-MENU DROPDOWN — Style VINCI, légèrement transparent
            Nuance dégradée intérieure pour plus de profondeur/goût
        ══════════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {desktopOpenItem?.children?.length ? (
            <motion.div
              key={desktopOpenItem.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => openDesktopMenu(desktopOpenItem.label)}
              onMouseLeave={closeDesktopMenu}
              className={cn(
                "absolute inset-x-0 top-full hidden overflow-hidden lg:block",
                "shadow-[0_24px_60px_rgba(7,20,74,0.28)]",
                // Légèrement transparent (82%) + backdrop-blur fort → le blanc de la
                // page transparaît doucement en bleu givré. Effet premium recherché.
                "bg-brand-royal/82 backdrop-blur-2xl",
                "border-t border-white/10",
              )}
            >
              {/* Nuances internes :
                  1. Lumière blanche en haut-gauche → donne la "subtilité blanche" demandée
                  2. Accent amber bas-droite → chaleur de marque
                  3. Gradient vertical → profondeur de bas en haut                      */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 130% at 0% -10%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 40%, transparent 65%), " +
                    "radial-gradient(circle at 95% 110%, rgba(247,160,38,0.12) 0%, transparent 40%), " +
                    "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 30%, transparent 55%)",
                }}
              />

              {/* Bouton fermer — positionné sur le BORD du panneau, hors de la
                  zone de contenu scrollable. Évite tout conflit avec la
                  scrollbar de la colonne de droite. */}
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setDesktopOpenLabel(null)}
                className="absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-white/10 text-white/85 backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-brand-amber hover:text-white hover:ring-brand-amber/60"
              >
                <X size={16} weight="bold" aria-hidden />
              </button>

              <div className="relative mx-auto max-w-[1440px] px-8 py-8 xl:px-12 xl:py-10">
                <div className="grid grid-cols-12 gap-6 xl:gap-10">
                  {/* Colonne gauche */}
                  <div className="col-span-4 flex flex-col justify-between">
                    <div>
                      <span className="block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-amber mb-3">
                        {desktopOpenItem.label}
                      </span>
                      <h3 className="text-[1.75rem] xl:text-[2.1rem] font-light leading-[1.12] text-white tracking-[-0.01em]">
                        {desktopOpenItem.tagline ?? desktopOpenItem.label}
                      </h3>
                    </div>
                    <a
                      href={desktopOpenItem.href}
                      {...(desktopOpenItem.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group mt-8 inline-flex items-center gap-3 self-start text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/80 transition-colors hover:text-brand-amber"
                    >
                      <span className="flex items-center">
                        <span className="block h-px w-7 bg-white/50 transition-all duration-300 group-hover:w-10 group-hover:bg-brand-amber" />
                        <ArrowRight size={13} weight="regular" className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      En savoir plus
                    </a>
                  </div>

                  {/* Barre verticale */}
                  <div className="col-span-1 hidden lg:flex justify-center">
                    <div className="h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                  </div>

                  {/* Colonne droite — liens scrollables si débordement */}
                  <div className="col-span-7 flex flex-col justify-center">
                    <ul
                      className="flex flex-col gap-0.5 overflow-y-auto overscroll-contain pr-2"
                      style={{ maxHeight: "min(52vh, 380px)", scrollbarGutter: "stable" }}
                    >
                      {desktopOpenItem.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="group flex items-start gap-4 rounded-md px-3 py-2.5 xl:px-4 transition-colors duration-200 hover:bg-white/[0.05]"
                          >
                            <span aria-hidden className="mt-[0.3rem] flex shrink-0 items-center">
                              <span className="block h-px w-4 bg-brand-amber transition-all duration-300 group-hover:w-7" />
                              <ArrowRight size={13} weight="regular" className="-ml-[1px] text-brand-amber transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                            <span className="flex-1">
                              <span className="block text-[0.88rem] font-medium text-white/95 transition-colors duration-200 group-hover:text-white">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-white/50 transition-colors duration-200 group-hover:text-white/70">
                                  {child.description}
                                </span>
                              ) : null}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE DRAWER — Design premium app-banking

          Structure :
          ┌─ Header gradient (logo grand + close) ──────────┐
          ├─ Utility chips horizontaux défilants ───────────┤
          ├─ Navigation principale (accordion) ─────────────┤
          │    (scrollable)                                  │
          └─ Footer sticky (langue + espace client) ────────┘
      ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen ? (
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
              transition={{ duration: 0.22 }}
              className="absolute inset-0 bg-slate-900/55 backdrop-blur-[3px]"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />

            {/* Panneau drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0, 0.18, 1] }}
              className="absolute right-0 top-0 flex h-full w-full max-w-[340px] flex-col bg-white shadow-[−32px_0_80px_rgba(7,20,74,0.22)]"
            >
              {/* ── Header du drawer : gradient bleu + logo grand ──────── */}
              <div className="relative shrink-0 overflow-hidden">
                {/* Fond blanc */}
                <div className="absolute inset-0 bg-white" />
                {/* Nuance dégradée bleue — donne le caractère premium */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(30,47,138,0.07) 0%, rgba(30,47,138,0.04) 35%, rgba(255,255,255,0) 65%)",
                  }}
                />
                {/* Ligne d'accentuation amber en bas du header */}
                <div
                  aria-hidden
                  className="absolute bottom-0 left-5 right-5 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(247,160,38,0.5) 30%, rgba(247,160,38,0.5) 70%, transparent)",
                  }}
                />

                <div className="relative flex items-center justify-between px-5 py-4">
                  {/* Logo plus grand que dans la nav desktop */}
                  <div className="[&_img]:!h-[52px] [&_img]:!w-auto">{logo}</div>
                  <button
                    type="button"
                    aria-label="Fermer le menu"
                    onClick={() => setMobileOpen(false)}
                    className="flex size-9 items-center justify-center rounded-full border border-brand-royal/10 text-brand-royal transition-all hover:bg-brand-royal hover:text-white hover:border-brand-royal"
                  >
                    <X size={18} weight="regular" aria-hidden />
                  </button>
                </div>
              </div>

              {/* ── Utility chips — barre 2 sur mobile ────────────────── */}
              {topNav && topNav.length > 0 ? (
                <div className="relative shrink-0 border-b border-slate-100/80">
                  {/* Fond avec très légère nuance bleue */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(30,47,138,0.03) 0%, rgba(30,47,138,0.015) 100%)",
                    }}
                  />

                  {/* Chips horizontaux avec fondu droit (masque CSS) */}
                  <div
                    className="relative flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none"
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      WebkitOverflowScrolling: "touch",
                      maskImage:
                        "linear-gradient(to right, black 78%, rgba(0,0,0,0.3) 92%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, black 78%, rgba(0,0,0,0.3) 92%, transparent 100%)",
                    }}
                  >
                    {topNav.map((item) => {
                      const Icon = item.icon ? TOP_ICONS[item.icon] : null;
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          onClick={() => setMobileOpen(false)}
                          className="group flex shrink-0 items-center gap-1.5 rounded-full border border-brand-royal/10 bg-white/80 px-3 py-1.5 text-[0.68rem] font-semibold text-brand-royal/80 shadow-[0_1px_4px_rgba(7,20,74,0.06)] transition-all hover:border-brand-royal/20 hover:bg-brand-royal hover:text-white active:scale-95"
                        >
                          {Icon ? (
                            <Icon size={12} weight="light" className="text-brand-amber transition-colors group-hover:text-white/90" />
                          ) : null}
                          {item.label}
                        </a>
                      );
                    })}
                    {/* Chip langue dans la barre utilitaire mobile */}
                    <button
                      type="button"
                      onClick={() => setLang((l) => (l === "fr" ? "en" : "fr"))}
                      className="group flex shrink-0 items-center gap-1.5 rounded-full border border-brand-royal/10 bg-white/80 px-3 py-1.5 text-[0.68rem] font-semibold text-brand-royal/80 shadow-[0_1px_4px_rgba(7,20,74,0.06)] transition-all hover:border-brand-royal/20 hover:bg-brand-royal hover:text-white"
                      aria-label="Changer la langue"
                    >
                      <Globe size={12} weight="light" className="text-brand-amber transition-colors group-hover:text-white/90" />
                      <span>{lang.toUpperCase()}</span>
                    </button>
                  </div>
                </div>
              ) : null}

              {/* ── Navigation principale — scrollable ────────────────── */}
              <nav
                aria-label="Navigation principale (mobile)"
                className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <ul className="flex flex-col gap-1">
                  {nav.map((item, navIdx) => {
                    const hasChildren = Boolean(item.children?.length);
                    const expanded = mobileExpanded === item.label;
                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: navIdx * 0.04, duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                      >
                        {hasChildren ? (
                          <div className={cn(
                            "rounded-xl border transition-colors duration-200",
                            expanded ? "border-brand-royal/15 bg-brand-royal/[0.03]" : "border-brand-royal/8",
                          )}>
                            <button
                              type="button"
                              onClick={() => setMobileExpanded((v) => (v === item.label ? null : item.label))}
                              className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[0.8rem] font-bold uppercase tracking-[0.04em] text-brand-royal"
                              aria-expanded={expanded}
                            >
                              <span>{item.label}</span>
                              <CaretDown
                                size={13}
                                weight="bold"
                                className={cn("text-brand-royal/40 transition-transform duration-200", expanded && "rotate-180 text-brand-amber")}
                                aria-hidden
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {expanded ? (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                                  className="overflow-hidden px-2 pb-2"
                                >
                                  {item.children?.map((child, ci) => (
                                    <motion.li
                                      key={child.label}
                                      initial={{ opacity: 0, x: 8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: ci * 0.03 }}
                                    >
                                      <a
                                        href={child.href}
                                        {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[0.75rem] font-medium text-brand-royal/80 transition-colors hover:bg-brand-royal hover:text-white"
                                      >
                                        <ArrowRight size={11} weight="regular" className="shrink-0 text-brand-amber" aria-hidden />
                                        {child.label}
                                      </a>
                                    </motion.li>
                                  ))}
                                </motion.ul>
                              ) : null}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <a
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "flex items-center rounded-xl px-4 py-3.5",
                              "text-[0.8rem] font-bold tracking-[0.04em] uppercase text-brand-royal",
                              "transition-all hover:bg-brand-royal hover:text-white",
                              item.current && "bg-brand-royal/8",
                            )}
                          >
                            {item.label}
                          </a>
                        )}
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* ── Footer sticky — signature premium ─────────────────── */}
              {/* Langue + Espace client — toujours visibles, ancrés en bas */}
              <div className="shrink-0 border-t border-slate-100">
                {/* Nuance bleue dans le footer aussi */}
                <div className="relative overflow-hidden">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(30,47,138,0.025) 100%)",
                    }}
                  />
                  <div className="relative px-4 py-4">
                    {/* Switcher langue — compact, élégant */}
                    <div className="mb-3 flex items-center gap-1.5">
                      <Translate size={13} weight="light" className="text-slate-400" aria-hidden />
                      <div className="flex gap-1">
                        {(["fr", "en"] as const).map((l) => (
                          <button
                            key={l}
                            type="button"
                            onClick={() => setLang(l)}
                            className={cn(
                              "rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.06em] transition-all duration-200",
                              lang === l
                                ? "bg-brand-royal text-white shadow-sm"
                                : "text-slate-400 hover:text-brand-royal",
                            )}
                          >
                            {l.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CTA Espace client — amber, visible, premium */}
                    <a
                      href="/espace-client"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-amber px-4 py-3.5 text-[0.78rem] font-bold uppercase tracking-[0.05em] text-white shadow-[0_4px_20px_rgba(247,160,38,0.32)] transition-all hover:brightness-110 active:scale-[0.98]"
                    >
                      <UserCircle size={17} weight="light" aria-hidden />
                      Espace client
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
