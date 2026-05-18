"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, UserRound, X, Search, ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";
import { useHeaderScroll } from "../hooks/use-header-scroll";

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
  children?: NavSubItem[];
}

interface SiteHeaderProps {
  brand?: "groupe" | "construction" | "assistance";
  logo: React.ReactNode;
  badgeLogo?: React.ReactNode;
  nav: NavItem[];
  rightSlotScrolled?: React.ReactNode;
  scrolledThreshold?: number;
  hideThreshold?: number;
  className?: string;
}

export function SiteHeader({
  brand: _brand = "groupe",
  logo,
  badgeLogo: _badgeLogo,
  nav,
  rightSlotScrolled: _rightSlotScrolled,
  scrolledThreshold = 80,
  hideThreshold = 480,
  className,
}: SiteHeaderProps) {
  const state = useHeaderScroll({ scrolledThreshold, hideThreshold });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [desktopOpenLabel, setDesktopOpenLabel] = React.useState<string | null>(null);
  const [lang, setLang] = React.useState<"fr" | "en">("fr");
  const searchRef = React.useRef<HTMLInputElement>(null);
  const closeMenuTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

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
    const h = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  React.useEffect(() => {
    return () => {
      if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    };
  }, []);

  const desktopOpenItem = React.useMemo(
    () => nav.find((item) => item.label === desktopOpenLabel && item.children?.length),
    [desktopOpenLabel, nav],
  );
  const desktopChildrenCount = desktopOpenItem?.children?.length ?? 0;
  const desktopGridColsClass =
    desktopChildrenCount >= 4
      ? "xl:grid-cols-4"
      : desktopChildrenCount === 3
        ? "xl:grid-cols-3"
        : "xl:grid-cols-2";

  const openDesktopMenu = (label: string) => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    setDesktopOpenLabel(label);
  };

  const closeDesktopMenu = () => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    closeMenuTimer.current = setTimeout(() => setDesktopOpenLabel(null), 120);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] }}
        className={cn("fixed inset-x-0 top-0 z-50", className)}
        data-state={state}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-royal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Aller au contenu principal
        </a>

        <motion.div
          initial={false}
          animate={{
            marginLeft: isScrolled ? 12 : 0,
            marginRight: isScrolled ? 12 : 0,
            marginTop: isScrolled ? 10 : 0,
            borderRadius: isScrolled ? 28 : 0,
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "overflow-hidden",
            "transition-[background-color,box-shadow] duration-[250ms]",
            isScrolled
              ? "bg-white shadow-[0_4px_32px_rgba(30,47,138,0.10)]"
              : "bg-transparent shadow-none",
          )}
          onMouseLeave={closeDesktopMenu}
        >
          <div className="mx-auto flex h-[4.75rem] max-w-[1440px] items-center gap-2 px-5 lg:h-[5.25rem] lg:gap-4 xl:px-8">
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
              <div
                className={cn(
                  "flex items-center px-3",
                  isTop
                    ? "[&_img]:!h-[60px] [&_img]:!w-auto"
                    : "[&_img]:!h-20 [&_img]:!w-auto",
                )}
              >
                {logo}
              </div>
            </div>

            <div
              className={cn(
                "hidden shrink-0 lg:block transition-[filter] duration-300",
                isTop && "[filter:drop-shadow(0_2px_16px_rgba(0,0,0,0.55))]",
              )}
            >
              {logo}
            </div>

            <nav aria-label="Navigation principale" className="hidden flex-1 lg:block">
              <ul className="flex items-center">
                {nav.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  const opened = desktopOpenLabel === item.label;
                  return (
                    <li
                      key={item.href}
                      onMouseEnter={() =>
                        hasChildren ? openDesktopMenu(item.label) : setDesktopOpenLabel(null)
                      }
                      onFocus={() =>
                        hasChildren ? openDesktopMenu(item.label) : setDesktopOpenLabel(null)
                      }
                    >
                      <a
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={cn(
                          "group relative inline-flex items-center gap-1 px-3 py-2.5 xl:px-3.5",
                          "text-[0.6875rem] font-black tracking-[0.09em] uppercase",
                          "transition-colors duration-200",
                          isTop
                            ? "text-white/90 hover:text-white"
                            : "text-brand-royal hover:text-brand-royal",
                          "after:absolute after:bottom-1.5 after:left-3 after:right-3 xl:after:left-3.5 xl:after:right-3.5",
                          "after:h-[2px] after:rounded-full after:bg-brand-amber",
                          "after:origin-left after:transition-transform after:duration-250 after:ease-out",
                          item.current || opened
                            ? "after:scale-x-100"
                            : "after:scale-x-0 hover:after:scale-x-100",
                        )}
                      >
                        {item.label}
                        {hasChildren ? (
                          <ChevronDown
                            className={cn(
                              "size-3.5 transition-transform duration-200",
                              opened && "rotate-180",
                            )}
                            aria-hidden
                          />
                        ) : null}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
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
                    aria-label={l === "fr" ? "Version francaise" : "English version"}
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

              <div className="relative flex items-center">
                <AnimatePresence>
                  {searchOpen ? (
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
                        placeholder="Rechercher..."
                        aria-label="Rechercher"
                        className={cn(
                          "w-full rounded-full border py-[0.4375rem] pl-4 pr-2",
                          "text-[0.8125rem] outline-none transition-all duration-200",
                          isTop
                            ? "border-white/30 bg-white/15 text-white placeholder:text-white/50 focus:bg-white/25 backdrop-blur-sm"
                            : "border-gray-200 bg-gray-50 text-ink placeholder:text-slate/50 focus:border-brand-royal focus:bg-white focus:ring-2 focus:ring-brand-royal/10",
                        )}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setSearchOpen(false);
                        }}
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
                    "inline-flex size-9 items-center justify-center rounded-full transition-all duration-200",
                    isTop
                      ? cn(
                          "text-white/90 hover:bg-white/15 hover:text-white",
                          searchOpen && "bg-white/20 text-white",
                        )
                      : cn(
                          "text-brand-royal hover:bg-brand-royal hover:text-white",
                          searchOpen && "bg-brand-royal text-white",
                        ),
                  )}
                >
                  {searchOpen ? (
                    <X className="size-[1.0625rem]" aria-hidden />
                  ) : (
                    <Search className="size-[1.0625rem]" aria-hidden />
                  )}
                </button>
              </div>

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
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {desktopOpenItem?.children?.length ? (
            <motion.div
              key={desktopOpenItem.label}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => openDesktopMenu(desktopOpenItem.label)}
              onMouseLeave={closeDesktopMenu}
              className={cn(
                "absolute inset-x-0 top-full hidden overflow-hidden border-t backdrop-blur-xl lg:block",
                "shadow-[0_16px_36px_rgba(7,20,74,0.24)]",
                "border-white/20 bg-brand-royal/72",
              )}
            >
              <div className="mx-auto max-w-[1440px] px-8 py-5 xl:px-10">
                <ul className={cn("grid gap-2 md:grid-cols-2 xl:gap-x-6", desktopGridColsClass)}>
                  {desktopOpenItem.children.map((child) => (
                    <li key={child.href}>
                      <a
                        href={child.href}
                        {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-start gap-3 border-l border-white/30 py-1.5 pl-4 pr-2 transition-colors duration-200 hover:border-brand-amber hover:text-white"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden
                          className="mt-[0.2rem] shrink-0 text-brand-amber"
                        >
                          <path
                            d="M1.5 6h8M6.5 2.5L10 6 6.5 9.5"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="block">
                          <span className="block text-[0.73rem] font-black uppercase tracking-[0.07em] text-white/92 group-hover:text-white">
                            {child.label}
                          </span>
                          {child.description ? (
                            <span className="mt-0.5 block text-[0.72rem] leading-relaxed text-white/66 group-hover:text-white/82">
                              {child.description}
                            </span>
                          ) : null}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
          <div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-brand-royal-900/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-0 top-0 flex h-full w-full max-w-[320px] flex-col bg-white shadow-2xl"
            >
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

              <nav
                aria-label="Navigation principale (mobile)"
                className="flex-1 overflow-y-auto px-4 py-5"
              >
                <ul className="flex flex-col gap-1">
                  {nav.map((item) => {
                    const hasChildren = Boolean(item.children?.length);
                    const expanded = mobileExpanded === item.label;
                    return (
                      <li key={item.href}>
                        {hasChildren ? (
                          <div className="rounded-xl border border-brand-royal/10">
                            <button
                              type="button"
                              onClick={() => setMobileExpanded((v) => (v === item.label ? null : item.label))}
                              className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[0.75rem] font-black uppercase tracking-[0.07em] text-brand-royal"
                              aria-expanded={expanded}
                            >
                              <span>{item.label}</span>
                              <ChevronDown
                                className={cn(
                                  "size-4 transition-transform duration-200",
                                  expanded && "rotate-180",
                                )}
                                aria-hidden
                              />
                            </button>

                            <AnimatePresence initial={false}>
                              {expanded ? (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden px-2 pb-2"
                                >
                                  {item.children?.map((child) => (
                                    <li key={child.href}>
                                      <a
                                        href={child.href}
                                        {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        onClick={() => setMobileOpen(false)}
                                        className="block rounded-lg px-3 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-brand-royal/85 transition-colors hover:bg-brand-royal hover:text-white"
                                      >
                                        {child.label}
                                      </a>
                                    </li>
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
                              "text-[0.75rem] font-black tracking-[0.07em] uppercase",
                              "text-brand-royal transition-all duration-200 hover:bg-brand-royal hover:text-white",
                              item.current && "bg-brand-royal/8",
                            )}
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <p className="mb-3 px-1 text-[0.625rem] font-black uppercase tracking-[0.14em] text-slate/40">
                    Langue
                  </p>
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
        ) : null}
      </AnimatePresence>
    </>
  );
}
