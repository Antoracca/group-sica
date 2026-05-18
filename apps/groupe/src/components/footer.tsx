import Image from "next/image";
import { Logo } from "@sica/ui";
import { links } from "@/lib/links";

/* ── Navigation interne au site Groupe SICA ──
   Cohérent avec docs/CONTEXTE.md §8 : Réalisations n'apparaît PAS
   ici car c'est du contenu Construction, pas Groupe. */
const NAV_LINKS = [
  { label: "Le Groupe", href: "/groupe" },
  { label: "Actualites", href: "/actualites" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Carrieres", href: "/carrieres" },
  { label: "Contact", href: "/contact" },
] as const;

/* ── Accès rapide client + liens légaux ── */
const CLIENT_LINKS = [
  { label: "Connexion client", href: "/espace-client", highlight: true },
  { label: "Demander un devis", href: `${process.env.NEXT_PUBLIC_CONSTRUCTION_URL ?? "http://localhost:3001"}/devis` },
  { label: "Mentions legales", href: "/mentions-legales" },
  { label: "Confidentialite", href: "/confidentialite" },
  { label: "Cookies", href: "/cookies" },
] as const;

const POLES = [
  {
    name: "SICA Construction",
    tagline: "BTP - Genie civil - Geobeton",
    href: links.construction.base,
    logoSrc: "/logo-construction.png",
    logoAlt: "Logo SICA Construction",
  },
  {
    name: "SICA Assistance",
    tagline: "Comptabilite - Fiscalite - Paie",
    href: "https://sicaassistance.ci",
    logoSrc: "/logo-assistance.png",
    logoAlt: "Logo SICA Assistance",
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/60" role="contentinfo">
      <div
        aria-hidden
        className="h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(247,160,38,0.35) 25%, rgba(247,160,38,0.35) 75%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-[1440px] px-5 xl:px-8">
        <div className="grid gap-10 py-12 sm:py-14 md:grid-cols-[1.8fr_1fr_1fr_1.2fr] lg:gap-14">
          <div className="flex flex-col gap-4">
            <Logo
              brand="groupe"
              href="/"
              imgClassName="h-16 w-auto select-none sm:h-16 lg:h-16 xl:h-20"
              imageRenderer={({ src, alt, width, height, className }) => (
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className={className}
                />
              )}
            />
            <p className="max-w-[30ch] text-sm leading-relaxed text-white/40">
              Construction, genie civil et assistance entrepreneuriale. Une
              equipe ivoirienne a votre service depuis 2020.
            </p>
            <div className="text-xs leading-relaxed text-white/28">
              <span className="font-medium text-white/40">Abidjan</span> - Cocody Mermoz
              <br />
              <span className="font-medium text-white/40">Yamoussoukro</span> - Morofe, rte Daloa
            </div>
          </div>

          <nav aria-label="Navigation du pied de page">
            <p className="mb-4 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-brand-amber/70">
              Navigation
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/52 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Colonne Accès Client + liens légaux */}
          <nav aria-label="Accès client et liens légaux">
            <p className="mb-4 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-brand-amber/70">
              Accès
            </p>
            <ul className="flex flex-col gap-2.5">
              {CLIENT_LINKS.map((item) => (
                <li key={item.href}>
                  {"highlight" in item && item.highlight ? (
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
                      style={{
                        background: "linear-gradient(135deg, #1E2F8A 0%, #2C47C5 100%)",
                        color: "#FFFFFF",
                        boxShadow: "0 2px 12px rgba(30,47,138,0.35)",
                      }}
                    >
                      {/* Petit cadenas */}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      {item.label}
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm text-white/52 transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-7">
            <div>
              <p className="mb-4 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-brand-amber/70">
                Nos poles
              </p>
              <ul className="flex flex-col gap-3">
                {POLES.map((pole) => (
                  <li key={pole.href}>
                    <a
                      href={pole.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <Image
                        src={pole.logoSrc}
                        alt={pole.logoAlt}
                        width={168}
                        height={68}
                        className="h-12 w-auto shrink-0 object-contain sm:h-12 lg:h-12"
                      />
                      <div className="min-w-0">
                        <span className="block text-sm font-medium text-white/75 transition-colors duration-200 group-hover:text-white">
                          {pole.name}
                        </span>
                        <span className="text-xs text-white/36">{pole.tagline}</span>
                      </div>
                      <span className="ml-auto mt-0.5 shrink-0 text-xs text-white/28 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-amber">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-brand-amber/70">
                Contact direct
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="tel:+2250709883293"
                    className="text-sm text-white/52 transition-colors duration-200 hover:text-white"
                  >
                    +225 07 09 88 32 93
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:groupesica@gmail.com"
                    className="text-sm text-white/52 transition-colors duration-200 hover:text-white"
                  >
                    groupesica@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/SicaConstruction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-white/52 transition-colors duration-200 hover:text-white"
                  >
                    Facebook
                    <span aria-hidden className="text-white/28">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/[0.07] py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.72rem] text-white/24">
            &copy; {year} Groupe SICA - RCCM CI-ABJ-03-2020-B13-17592 - Abidjan, Cote d'Ivoire
          </p>
          <nav aria-label="Navigation legale">
            <ul className="flex gap-4">
              {[
                { label: "Mentions legales", href: "/mentions-legales" },
                { label: "Confidentialite", href: "/confidentialite" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.72rem] text-white/24 transition-colors duration-200 hover:text-white/55"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
