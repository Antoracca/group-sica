"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@sica/ui";
import { links } from "@/lib/links";

/* Navigation en pilule sombre flottante (DESIGN.md §4.2).
   `forceScrolled` est conservé pour compatibilité avec les anciennes pages. */

export const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Création", href: "/creation-entreprise" },
  { label: "Modification", href: "/modification-entreprise" },
  { label: "Formes juridiques", href: "/formes-juridiques" },
  { label: "Gestion", href: "/gestion" },
  { label: "Impôts & taxes", href: "/impots-et-taxes" },
  { label: "Contact", href: "/contact" },
] as const;

export function AssistanceHeader({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(forceScrolled);

  useEffect(() => {
    const onScroll = () => setScrolled(forceScrolled || window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [forceScrolled]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Bandeau supérieur fin */}
      <div
        className={cn(
          "hidden overflow-hidden bg-[#0A1130] text-[12px] text-white/70 transition-all duration-300 md:block",
          scrolled ? "h-0" : "h-8",
        )}
      >
        <div className="mx-auto flex h-8 max-w-[1200px] items-center justify-between px-8">
          <p className="flex items-center gap-2">
            Formalités, comptabilité, fiscalité · Abidjan et Yamoussoukro
          </p>
          <p className="flex items-center gap-4">
            <a href={links.groupe.base} className="hover:text-white">GROUPE SICA</a>
            <a href={links.construction.base} className="hover:text-white">SICA CONSTRUCTION</a>
          </p>
        </div>
      </div>

      <div className="px-3 pt-3 sm:px-4">
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0A1130]/85 pl-2.5 pr-2.5 shadow-xl shadow-black/20 backdrop-blur-xl sm:pl-3"
        >
          <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="SICA ASSISTANCE — accueil">
            <span className="grid size-11 place-items-center overflow-hidden rounded-xl bg-white">
              <Image src="/logo-assistance.png" alt="" width={44} height={44} className="size-11 object-contain" priority />
            </span>
            <span className="font-display text-[15px] font-bold leading-none tracking-tight text-white">
              SICA <span className="font-medium text-white/70">ASSISTANCE</span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV.slice(1, 6).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3 py-2 text-[14px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href="/contact"
              className="hidden rounded-full px-3 py-2 text-[14px] font-medium text-white/80 hover:text-white xl:inline-flex"
            >
              Contact
            </a>
            <a
              href="/contact?objet=creation"
              className="hidden h-10 items-center rounded-full bg-white px-5 text-sm font-semibold text-ink shadow-[0_2px_12px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/90 sm:inline-flex"
            >
              Démarrer mon dossier
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-xl text-white hover:bg-white/10 xl:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
            >
              <Menu className="size-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Tiroir mobile plein écran */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-[#0A1130] px-5 pb-8 pt-5 text-white transition-opacity duration-300 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold">
            SICA <span className="font-medium text-white/70">ASSISTANCE</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-xl hover:bg-white/10"
            aria-label="Fermer le menu"
            tabIndex={open ? 0 : -1}
          >
            <X className="size-6" />
          </button>
        </div>
        <ul className="mt-8 space-y-1">
          {NAV.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="block rounded-2xl px-4 py-3.5 font-display text-2xl font-bold tracking-tight hover:bg-white/10"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto space-y-3">
          <a
            href="/contact?objet=creation"
            tabIndex={open ? 0 : -1}
            className="flex h-12 items-center justify-center rounded-full bg-brand-amber text-sm font-semibold text-ink"
          >
            Démarrer mon dossier
          </a>
          <a
            href="tel:+2250709883293"
            tabIndex={open ? 0 : -1}
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 text-sm font-semibold"
          >
            <Phone aria-hidden className="size-4" /> (+225) 07 09 88 32 93
          </a>
          <p className="pt-2 text-center text-xs text-white/50">
            <a href={links.groupe.base} className="hover:text-white">GROUPE SICA</a> ·{" "}
            <a href={links.construction.base} className="hover:text-white">SICA CONSTRUCTION</a>
          </p>
        </div>
      </div>
    </header>
  );
}
