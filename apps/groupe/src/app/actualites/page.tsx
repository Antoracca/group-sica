import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Container } from "@sica/ui";
import { ACTUALITES, formatDateFr } from "@/lib/actualites";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Actualités — Groupe SICA",
  description:
    "Toute l'activité récente du Groupe SICA : livraisons de chantiers, distinctions, lancements produits et études techniques.",
};

const CATEGORIE_COLORS: Record<string, { bg: string; text: string }> = {
  Construction: { bg: "rgba(30,47,138,0.10)", text: "#1E2F8A" },
  Assistance: { bg: "rgba(243,146,0,0.12)", text: "#A85C00" },
  Groupe: { bg: "rgba(13,26,74,0.10)", text: "#0D1A4A" },
  Communauté: { bg: "rgba(31,138,86,0.12)", text: "#0B6E45" },
};

export default function ActualitesPage() {
  /* Tri par date décroissante (plus récente en premier) */
  const sorted = [...ACTUALITES].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = sorted;

  return (
    <PageShell>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-32 pb-16 text-white sm:pt-40 sm:pb-20 lg:pt-44"
        style={{ background: "linear-gradient(155deg, #08112E 0%, #1E2F8A 60%, #0D1A4A 100%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><g stroke='white' stroke-width='0.5' fill='none'><path d='M48 0H0V48'/></g></svg>\")",
            backgroundSize: "48px 48px",
          }}
        />
        <Container className="relative">
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#F7A832" }}>
            Actualités SICA
          </p>
          <h1 className="font-display max-w-3xl text-balance text-[2.25rem] font-bold leading-tight tracking-tight sm:text-[3rem] lg:text-[3.75rem]">
            Le journal de bord du Groupe.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
            Livraisons, distinctions, études techniques, lancements produits. Tout ce qui rythme la
            vie de SICA Construction et SICA Assistance.
          </p>
        </Container>
      </section>

      {/* ── À LA UNE ── */}
      {featured && (
        <section className="py-16 sm:py-20 lg:py-24">
          <Container>
            <Link
              href={`/actualites/${featured.slug}`}
              className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Visuel placeholder — bleu architectural */}
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #1E2F8A 0%, #08112E 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-[0.10]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44'><g stroke='white' stroke-width='0.5' fill='none'><path d='M44 0H0V44'/></g></svg>\")",
                    backgroundSize: "44px 44px",
                  }}
                />
                <div className="absolute bottom-5 left-5 text-white">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em]"
                    style={{ background: "rgba(243,146,0,0.92)", color: "#FFFFFF" }}
                  >
                    À la une
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.18em]"
                    style={{
                      background: CATEGORIE_COLORS[featured.categorie]?.bg,
                      color: CATEGORIE_COLORS[featured.categorie]?.text,
                    }}
                  >
                    {featured.categorie}
                  </span>
                  <time className="text-[0.8125rem] text-neutral-500">
                    {formatDateFr(featured.date)}
                  </time>
                </div>
                <h2 className="font-display text-balance text-[1.5rem] font-bold leading-tight tracking-tight text-[#0D1A4A] transition-colors group-hover:text-[#1E2F8A] sm:text-[2rem] lg:text-[2.25rem]">
                  {featured.titre}
                </h2>
                <p className="mt-4 text-pretty text-[0.9375rem] leading-relaxed text-neutral-600 sm:text-base">
                  {featured.chapo}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-[#1E2F8A] transition-colors group-hover:text-[#F39200]">
                  Lire l'article
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Container>
        </section>
      )}

      {/* ── GRILLE DES AUTRES ARTICLES ── */}
      {rest.length > 0 && (
        <section className="border-t border-neutral-200 bg-neutral-50 py-16 sm:py-20 lg:py-24">
          <Container>
            <p className="mb-10 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
              Tous les articles
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {rest.map((a) => (
                <Link
                  key={a.slug}
                  href={`/actualites/${a.slug}`}
                  className="group flex flex-col"
                >
                  <div
                    className="relative aspect-[16/10] overflow-hidden rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, #1E2F8A 0%, #0D1A4A 100%)",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.10]"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><g stroke='white' stroke-width='0.5' fill='none'><path d='M40 0H0V40'/></g></svg>\")",
                        backgroundSize: "40px 40px",
                      }}
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <span
                      className="inline-flex rounded-full px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.18em]"
                      style={{
                        background: CATEGORIE_COLORS[a.categorie]?.bg,
                        color: CATEGORIE_COLORS[a.categorie]?.text,
                      }}
                    >
                      {a.categorie}
                    </span>
                    <time className="text-[0.75rem] text-neutral-500">{formatDateFr(a.date)}</time>
                  </div>
                  <h3 className="mt-3 font-display text-[1.125rem] font-bold leading-tight tracking-tight text-[#0D1A4A] transition-colors group-hover:text-[#1E2F8A]">
                    {a.titre}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[0.875rem] leading-relaxed text-neutral-600">
                    {a.chapo}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] text-neutral-500">
                    <Clock size={11} strokeWidth={2} />
                    {a.lecture}
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </PageShell>
  );
}
