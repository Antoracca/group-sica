import Image from "next/image";
import Link from "next/link";
import { Logo, SiteHeader } from "@sica/ui";
import { mainNav, topNav } from "@/lib/nav";
import { Footer } from "@/components/footer";
import { ArrowRight, ArrowLeft, Building2, Handshake } from "lucide-react";

function makeImageRenderer(priority = false) {
  return ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  }) => (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

export const metadata = {
  title: "Nos réalisations — Groupe SICA",
  description:
    "Explorez les dossiers de réalisation de SICA Construction et SICA Assistance — projets concrets, expertise terrain.",
};

/* ── Données des deux pôles ─────────────────────────────────────────────── */
const POLES = [
  {
    key: "construction",
    href: "/realisations/construction",
    label: "Construction",
    eyebrow: "Pôle BTP",
    title: "Réalisations\nConstruction",
    description:
      "Villas, sièges institutionnels, génie civil, études de sol. Chaque projet traduit une maîtrise rigoureuse du chantier, du sol au toit.",
    cta: "Voir les projets construction",
    count: "6 dossiers",
    accent: "#1E2F8A",
    bg: "linear-gradient(145deg, #060D22 0%, #0F1C55 55%, #1E2F8A 100%)",
    patternColor: "rgba(255,255,255,0.035)",
    textColor: "white",
    labelColor: "#F39200",
    ctaClass:
      "border-white/30 text-white hover:bg-white hover:text-[#1E2F8A]",
    chipClass: "bg-white/10 text-white/75 border border-white/15",
  },
  {
    key: "assistance",
    href: "/realisations/assistance",
    label: "Assistance",
    eyebrow: "Pôle Conseil",
    title: "Réalisations\nAssistance",
    description:
      "Création d'entreprises, structures comptables, missions juridiques et conseils en gestion. Des missions à impact durable pour les PME ivoiriennes.",
    cta: "Voir les projets assistance",
    count: "6 dossiers",
    accent: "#F39200",
    bg: "linear-gradient(145deg, #FBF4E6 0%, #FEF0CC 45%, #FFFBF2 100%)",
    patternColor: "rgba(243,146,0,0.045)",
    textColor: "#0D1A4A",
    labelColor: "#A05500",
    ctaClass:
      "border-[#1E2F8A]/30 text-[#1E2F8A] hover:bg-[#1E2F8A] hover:text-white",
    chipClass: "bg-[#1E2F8A]/08 text-[#1E2F8A]/70 border border-[#1E2F8A]/10",
  },
] as const;

export default function RealisationsPage() {
  return (
    <>
      <SiteHeader
        forceScrolled
        brand="groupe"
        logo={
          <Logo
            brand="groupe"
            imgClassName="h-16 w-auto select-none sm:h-[4.5rem] lg:h-20 xl:h-24"
            imageRenderer={makeImageRenderer(true)}
          />
        }
        nav={mainNav}
        topNav={topNav}
      />

      <main id="main-content">

        {/* ══════════════════════════════════════════════════════════════════
            HERO — cinématographique éditorial
        ══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden pt-36 pb-20 text-white sm:pt-44 sm:pb-28"
          style={{
            background:
              "linear-gradient(155deg, #060D22 0%, #0F1C55 55%, #1E2F8A 100%)",
          }}
        >
          {/* Blueprint grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='52' height='52'><path d='M52 0H0V52' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
              backgroundSize: "52px 52px",
            }}
          />
          {/* Barre amber en haut */}
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background:
                "linear-gradient(to right, #F39200, rgba(243,146,0,0.4), transparent)",
            }}
          />

          <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">

            {/* Fil d'Ariane */}
            <nav aria-label="Fil d'Ariane" className="mb-10 flex items-center gap-2 text-[0.75rem] text-white/40">
              <Link href="/" className="transition-colors hover:text-white/80">
                Accueil
              </Link>
              <ArrowRight size={11} strokeWidth={2} className="text-white/25" />
              <span className="text-white/70">Réalisations</span>
            </nav>

            {/* Label éditorial */}
            <p
              className="mb-5 text-[0.6rem] font-bold uppercase tracking-[0.35em]"
              style={{ color: "#F39200" }}
            >
              Dossiers · Groupe SICA
            </p>

            {/* Titre principal */}
            <h1
              className="max-w-3xl text-balance text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.06] tracking-tight"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Nos dossiers de réalisation
            </h1>

            {/* Chapo */}
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.72] text-white/60">
              Découvrez ici les différents projets que nous avons réalisés, classés par pôle d'expertise. Chaque dossier retrace une mission concrète, menée de bout en bout par les équipes SICA.
            </p>

            {/* Filet décoratif */}
            <div
              className="mt-10 h-px w-full max-w-[400px]"
              style={{
                background:
                  "linear-gradient(to right, rgba(243,146,0,0.55), transparent)",
              }}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            DEUX PÔLES — Orientation cards
        ══════════════════════════════════════════════════════════════════ */}
        <section className="bg-[#F8F8F5] py-20 sm:py-28">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">

            {/* Label section */}
            <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
              Explorer par pôle
            </p>
            <h2
              className="mb-14 text-[1.375rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[1.625rem]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Choisissez un domaine d'expertise
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              {POLES.map((pole) => {
                return (
                  <Link
                    key={pole.key}
                    href={pole.href}
                    className="group relative block overflow-hidden"
                    style={{ minHeight: 420 }}
                  >
                    {/* Card background */}
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.015]"
                      style={{ background: pole.bg }}
                    />

                    {/* Blueprint / diagonal pattern overlay */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage:
                          pole.key === "construction"
                            ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='52' height='52'><path d='M52 0H0V52' fill='none' stroke='white' stroke-width='0.5'/></svg>")`
                            : `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><line x1='0' y1='40' x2='40' y2='0' stroke='%23F39200' stroke-width='0.6' stroke-opacity='0.35'/></svg>")`,
                        backgroundSize: "52px 52px",
                        opacity: 0.06,
                      }}
                    />

                    {/* Accent bar left */}
                    <div
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-[3px] transition-all duration-300 group-hover:w-[5px]"
                      style={{ background: pole.accent }}
                    />

                    {/* Accent corner glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
                      style={{ background: pole.accent }}
                    />

                    {/* Content */}
                    <div className="relative flex h-full flex-col justify-between p-10 sm:p-12">
                      {/* Top row */}
                      <div className="flex items-start justify-between">
                        <div>
                          <span
                            className="mb-5 block text-[0.6rem] font-bold uppercase tracking-[0.3em]"
                            style={{ color: pole.labelColor }}
                          >
                            {pole.eyebrow}
                          </span>
                          <h3
                            className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.05] tracking-tight"
                            style={{
                              fontFamily: "'DM Serif Display', serif",
                              color: pole.textColor,
                              whiteSpace: "pre-line",
                            }}
                          >
                            {pole.title}
                          </h3>
                        </div>
                        {/* Icon badge */}
                        <div
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6"
                          style={{
                            background:
                              pole.key === "construction"
                                ? "rgba(255,255,255,0.10)"
                                : "rgba(243,146,0,0.12)",
                            border:
                              pole.key === "construction"
                                ? "1px solid rgba(255,255,255,0.14)"
                                : "1px solid rgba(243,146,0,0.20)",
                          }}
                        >
                          {pole.key === "construction" ? (
                            <Building2
                              size={28}
                              strokeWidth={1.25}
                              style={{ color: "rgba(255,255,255,0.80)" }}
                            />
                          ) : (
                            <Handshake
                              size={28}
                              strokeWidth={1.25}
                              style={{ color: "#A05500" }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Middle: description */}
                      <p
                        className="mt-8 max-w-sm text-[0.9375rem] leading-[1.72]"
                        style={{
                          color:
                            pole.key === "construction"
                              ? "rgba(255,255,255,0.62)"
                              : "rgba(13,26,74,0.65)",
                        }}
                      >
                        {pole.description}
                      </p>

                      {/* Bottom row: chip + CTA */}
                      <div className="mt-10 flex items-center justify-between gap-4">
                        {/* Count chip */}
                        <span
                          className="inline-flex items-center rounded-full px-3.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em]"
                          style={{
                            background:
                              pole.key === "construction"
                                ? "rgba(255,255,255,0.10)"
                                : "rgba(30,47,138,0.07)",
                            color:
                              pole.key === "construction"
                                ? "rgba(255,255,255,0.65)"
                                : "rgba(13,26,74,0.60)",
                            border:
                              pole.key === "construction"
                                ? "1px solid rgba(255,255,255,0.12)"
                                : "1px solid rgba(30,47,138,0.08)",
                          }}
                        >
                          {pole.count}
                        </span>

                        {/* CTA button */}
                        <span
                          className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.8125rem] font-semibold transition-all duration-300"
                          style={{
                            borderColor:
                              pole.key === "construction"
                                ? "rgba(255,255,255,0.28)"
                                : "rgba(30,47,138,0.25)",
                            color: pole.key === "construction" ? "white" : "#1E2F8A",
                          }}
                        >
                          {pole.cta}
                          <ArrowRight
                            size={14}
                            strokeWidth={2}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Note bas de page */}
            <p className="mt-12 text-center text-[0.75rem] leading-relaxed text-neutral-400">
              Les dossiers complets sont en cours de documentation. Le contenu détaillé sera disponible prochainement.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CTA CONTACT
        ══════════════════════════════════════════════════════════════════ */}
        <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1440px] px-6 text-center sm:px-10 lg:px-16">
            <p className="mb-3 text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
              Un projet en tête ?
            </p>
            <h2
              className="mb-4 text-[1.5rem] font-bold tracking-tight text-[#0D1A4A] sm:text-[1.875rem]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Parlons de votre projet
            </h2>
            <p className="mx-auto mb-8 max-w-md text-[0.9375rem] leading-relaxed text-neutral-500">
              Construction ou assistance aux entreprises, nos équipes sont disponibles pour cadrer votre besoin.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E2F8A] px-7 py-3 text-[0.875rem] font-semibold text-white transition-all duration-300 hover:bg-[#0D1A4A]"
              >
                Nous contacter
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-7 py-3 text-[0.875rem] font-semibold text-[#1E2F8A] transition-all duration-300 hover:border-[#1E2F8A]"
              >
                <ArrowLeft size={14} strokeWidth={2} />
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
