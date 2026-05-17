import Image from "next/image";
import { Container, Logo } from "@sica/ui";
import { links } from "@/lib/links";

const navLeGroupe = [
  { label: "Histoire & vision", href: "/groupe" },
  { label: "Nos valeurs", href: "/groupe#valeurs" },
  { label: "Organigramme", href: "/groupe#equipe" },
  { label: "Partenaires", href: "/partenaires" },
  { label: "Carrières", href: "/carrieres" },
];

const navInformations = [
  { label: "Actualités", href: "/actualites" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Contact", href: "/contact" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];

const poles = [
  {
    name: "SICA Construction",
    tagline: "BTP · Génie civil · Géobéton",
    href: links.construction.base,
  },
  {
    name: "SICA Assistance",
    tagline: "Création d'entreprise · Comptabilité",
    href: "https://sicaassistance.ci",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70" role="contentinfo">
      <Container>
        {/* ── Top grid ─────────────────────────────────────────── */}
        <div className="grid gap-12 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] lg:gap-8 lg:py-20">

          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Logo
              brand="groupe"
              href="/"
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
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Construction, génie civil, géobéton, assistance entrepreneuriale
              et comptable. Une équipe ivoirienne au service de vos projets
              depuis 2020.
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <address className="not-italic text-white/50">
                <strong className="block text-white/80 font-medium">Abidjan</strong>
                Cocody Mermoz, derrière la Pharmacie Mermoz
              </address>
              <address className="not-italic text-white/50">
                <strong className="block text-white/80 font-medium">Yamoussoukro</strong>
                Morofé, 24 ampoules (rte Daloa)
              </address>
            </div>
          </div>

          {/* Column 2 — Le Groupe */}
          <nav aria-label="Navigation Le Groupe">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Le Groupe
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLeGroupe.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Informations */}
          <nav aria-label="Navigation Informations">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Informations
            </p>
            <ul className="flex flex-col gap-2.5">
              {navInformations.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Nos pôles & Contact */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                Nos pôles
              </p>
              <ul className="flex flex-col gap-3">
                {poles.map((pole) => (
                  <li key={pole.href}>
                    <a
                      href={pole.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-0.5"
                    >
                      <span className="text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                        {pole.name}
                        <span className="ml-1.5 inline-block text-white/30 transition-transform group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </span>
                      <span className="text-xs text-white/40">{pole.tagline}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                Contact direct
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="tel:+2250709883293"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    +225 07 09 88 32 93
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+2250102442894"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    +225 01 02 44 28 94
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:groupesica@gmail.com"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    groupesica@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/SicaConstruction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    Facebook — SicaConstruction
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-xs text-white/30">
            &copy; {currentYear} Groupe SICA — SARL · RCCM CI-ABJ-03-2020-B13-17592 · Abidjan, Côte d&apos;Ivoire
          </p>
          <nav aria-label="Navigation légale">
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
              {[
                { label: "Mentions légales", href: "/mentions-legales" },
                { label: "Confidentialité", href: "/confidentialite" },
                { label: "Cookies", href: "/cookies" },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-xs text-white/30 transition-colors hover:text-white/60"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
