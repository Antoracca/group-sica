"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@sica/ui";
import { links } from "@/lib/links";

/* ── Footer du site Groupe ──────────────────────────────────────────────
   Libellés traduits via next-intl ; liens INTERNES préfixés par la locale
   active (sauf l'espace client, mono-langue) ; liens EXTERNES inchangés.
   Cohérent avec docs/CONTEXTE.md §8 : Réalisations n'apparaît PAS ici car
   c'est du contenu Construction, pas Groupe.
───────────────────────────────────────────────────────────────────────── */

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const loc = (path: string) => `/${locale}${path}`;

  const NAV_LINKS = [
    { label: t("nav.group"), href: loc("/groupe") },
    { label: t("nav.news"), href: loc("/actualites") },
    { label: t("nav.partners"), href: loc("/partenaires") },
    { label: t("nav.careers"), href: loc("/carrieres") },
    { label: t("nav.contact"), href: loc("/contact") },
  ];

  const CLIENT_LINKS = [
    // Espace client : route mono-langue (non préfixée).
    { label: t("access.client"), href: "/espace-client", highlight: true as const },
    { label: t("access.quote"), href: links.construction.devis },
    { label: t("access.legal"), href: loc("/mentions-legales") },
    { label: t("access.privacy"), href: loc("/confidentialite") },
    { label: t("access.cookies"), href: loc("/cookies") },
  ];

  const POLES = [
    {
      name: "SICA Construction",
      tagline: t("poles.constructionTagline"),
      href: links.construction.base,
      logoSrc: "/logo-construction.png",
      logoAlt: "Logo SICA Construction",
    },
    {
      name: "SICA Assistance",
      tagline: t("poles.assistanceTagline"),
      href: links.assistance.base,
      logoSrc: "/logo-assistance.png",
      logoAlt: "Logo SICA Assistance",
    },
  ];

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
        <div className="grid gap-10 py-12 sm:py-14 md:grid-cols-2 xl:grid-cols-[1.8fr_1fr_1fr_1.2fr] lg:gap-14">
          <div className="flex flex-col gap-4">
            <Logo
              brand="groupe"
              href={loc("/")}
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
            <p className="max-w-[34ch] text-sm leading-relaxed text-white/60">
              {t("intro")}
            </p>
            <div className="text-xs leading-relaxed text-white/55">
              <span className="font-medium text-white/70">Abidjan</span> — {t("addresses.abidjan")}
              <br />
              <span className="font-medium text-white/70">Yamoussoukro</span> — {t("addresses.yamoussoukro")}
            </div>
          </div>

          <nav aria-label={t("aria.footerNav")}>
            <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-amber/70">
              {t("headings.navigation")}
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 xl:grid-cols-1">
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

          <nav aria-label={t("aria.clientNav")}>
            <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-amber/70">
              {t("headings.access")}
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
              <p className="mb-4 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-amber/70">
                {t("headings.poles")}
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
                        <span className="text-xs text-white/60">{pole.tagline}</span>
                      </div>
                      <span className="ml-auto mt-0.5 shrink-0 text-xs text-white/55 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-amber">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-amber/70">
                {t("headings.contact")}
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
                    href="mailto:secretariat@groupe-sica.com"
                    className="text-sm text-white/52 transition-colors duration-200 hover:text-white"
                  >
                    secretariat@groupe-sica.com
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
                    <span aria-hidden className="text-white/55">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.07] pb-8 pt-6 sm:mt-4 md:mt-0 md:flex-row md:items-center md:justify-between md:gap-2 md:py-5">
          <p className="text-[0.75rem] text-white/55">
            &copy; {year} {t("legal.copyright")}
          </p>
          <nav aria-label={t("aria.legalNav")}>
            <ul className="flex gap-4">
              {[
                { label: t("access.legal"), href: loc("/mentions-legales") },
                { label: t("access.privacy"), href: loc("/confidentialite") },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[0.75rem] text-white/55 transition-colors duration-200 hover:text-white/55"
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
