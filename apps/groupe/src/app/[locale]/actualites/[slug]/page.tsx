import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Container } from "@sica/ui";
import {
  ACTUALITES,
  getActualiteBySlug,
  getAllSlugs,
  formatDateFr,
} from "@/lib/actualites";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";

/* ─── Couleurs par catégorie ────────────────────────────────────────────── */
type CatStyle = { accent: string; bg: string; label: string };
const FALLBACK_CAT: CatStyle = { accent: "#0D1A4A", bg: "rgba(13,26,74,0.09)", label: "#0D1A4A" };
const CAT: Record<string, CatStyle> = {
  Construction: { accent: "#1E2F8A", bg: "rgba(30,47,138,0.09)", label: "#1E2F8A" },
  Assistance:   { accent: "#F39200", bg: "rgba(243,146,0,0.11)",  label: "#A05500" },
  Groupe:       { accent: "#0D1A4A", bg: "rgba(13,26,74,0.09)",   label: "#0D1A4A" },
  Communauté:   { accent: "#166534", bg: "rgba(22,101,52,0.10)",  label: "#166534" },
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const article = getActualiteBySlug(slug);
  if (!article) return { title: "Article introuvable — Groupe SICA" };
  return {
    title: `${article.titre} — Actualités SICA`,
    description: article.chapo,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getActualiteBySlug(slug);
  if (!article) notFound();

  const cat: CatStyle = CAT[article.categorie] ?? FALLBACK_CAT;

  /* Articles liés (même catégorie, hors article courant), 2 max */
  const related = ACTUALITES.filter(
    (a) => a.slug !== article.slug && a.categorie === article.categorie,
  ).slice(0, 2);

  return (
    <PageShell>
      {/* ══════════════════════════════════════════════════════════════════
          HERO ARTICLE — cinématographique éditorial
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden pt-36 pb-20 text-white sm:pt-44 sm:pb-28"
        style={{ background: "linear-gradient(155deg, #060D22 0%, #0F1C55 55%, #1E2F8A 100%)" }}
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
        {/* Barre couleur catégorie en haut pleine largeur */}
        <div
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: cat.accent }}
        />

        <Container className="relative">
          {/* Retour */}
          <Link
            href="/actualites"
            className="group mb-10 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={13} strokeWidth={2.2} />
            Toutes les actualités
          </Link>

          {/* Meta ligne */}
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em]"
              style={{ background: cat.bg, color: cat.label }}
            >
              {article.categorie}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/50">
              <Calendar size={11} strokeWidth={2} />
              {formatDateFr(article.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/50">
              <Clock size={11} strokeWidth={2} />
              {article.lecture}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/50">
              <User size={11} strokeWidth={2} />
              {article.auteur}
            </span>
          </div>

          {/* Titre */}
          <h1
            className="max-w-4xl text-balance text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.06] tracking-tight"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {article.titre}
          </h1>

          {/* Chapo */}
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-white/65">
            {article.chapo}
          </p>

          {/* Filet décoratif */}
          <div
            className="mt-10 h-px w-full max-w-[480px]"
            style={{ background: "linear-gradient(to right, rgba(243,146,0,0.55), transparent)" }}
          />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CORPS DE L'ARTICLE — lecture premium
      ══════════════════════════════════════════════════════════════════ */}
      <article className="bg-white py-16 sm:py-20 lg:py-24">
        <Container size="tight">
          {/* Premier paragraphe mis en valeur */}
          {article.contenu.length > 0 && (
            <p
              className="mb-8 border-l-[3px] pl-6 text-[1.125rem] font-medium leading-[1.76] text-[#0D1A4A] sm:text-[1.25rem]"
              style={{ borderColor: cat.accent }}
            >
              {article.contenu[0]}
            </p>
          )}

          {/* Paragraphes suivants */}
          <div className="space-y-6">
            {article.contenu.slice(1).map((paragraphe, i) => (
              <p
                key={i}
                className="text-[1.0625rem] leading-[1.78] text-neutral-700 sm:text-[1.125rem]"
              >
                {paragraphe}
              </p>
            ))}
          </div>

          {/* Footer article */}
          <div className="mt-14 flex items-center justify-between border-t border-neutral-200 pt-8">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-neutral-400">
                Rédigé par
              </p>
              <p className="mt-1 text-[0.9375rem] font-semibold text-[#0D1A4A]">
                {article.auteur}
              </p>
            </div>
            <Link
              href="/actualites"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-5 py-2 text-[0.8125rem] font-semibold text-[#1E2F8A] transition-all hover:border-[#1E2F8A] hover:bg-[#1E2F8A] hover:text-white"
            >
              <ArrowLeft size={13} strokeWidth={2} />
              Retour aux actualités
            </Link>
          </div>
        </Container>
      </article>

      {/* ══════════════════════════════════════════════════════════════════
          ARTICLES LIÉS
      ══════════════════════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="border-t border-neutral-200 bg-[#F8F8F5] py-16 sm:py-20">
          <Container>
            <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
              À lire également
            </p>
            <h2
              className="mb-10 text-[1.375rem] font-bold leading-tight tracking-tight text-[#0D1A4A]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Dans la même thématique
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((a) => {
                const relCat: CatStyle = CAT[a.categorie] ?? FALLBACK_CAT;
                return (
                  <Link
                    key={a.slug}
                    href={`/actualites/${a.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:border-transparent hover:shadow-[0_8px_36px_rgba(30,47,138,0.10)]"
                  >
                    <div
                      className="h-[3px] w-full"
                      style={{ background: relCat.accent }}
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <span
                          className="inline-flex rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.18em]"
                          style={{ background: relCat.bg, color: relCat.label }}
                        >
                          {a.categorie}
                        </span>
                        <time className="text-[0.75rem] text-neutral-400">
                          {formatDateFr(a.date)}
                        </time>
                      </div>
                      <h3
                        className="flex-1 text-balance text-[1.125rem] font-bold leading-tight tracking-tight text-[#0D1A4A] transition-colors group-hover:text-[#1E2F8A]"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                      >
                        {a.titre}
                      </h3>
                      <p className="mt-2.5 line-clamp-2 text-[0.875rem] leading-relaxed text-neutral-600">
                        {a.chapo}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#1E2F8A] transition-colors group-hover:text-[#F39200]">
                        Lire l'article
                        <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </PageShell>
  );
}
