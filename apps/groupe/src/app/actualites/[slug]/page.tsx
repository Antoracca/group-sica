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

const CATEGORIE_COLORS: Record<string, { bg: string; text: string }> = {
  Construction: { bg: "rgba(30,47,138,0.10)", text: "#1E2F8A" },
  Assistance: { bg: "rgba(243,146,0,0.12)", text: "#A85C00" },
  Groupe: { bg: "rgba(13,26,74,0.10)", text: "#0D1A4A" },
  Communauté: { bg: "rgba(31,138,86,0.12)", text: "#0B6E45" },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getActualiteBySlug(slug);
  if (!article) notFound();

  /* Articles liés (même catégorie, hors article courant), 2 max */
  const related = ACTUALITES.filter(
    (a) => a.slug !== article.slug && a.categorie === article.categorie,
  ).slice(0, 2);

  return (
    <PageShell>
      {/* ── HERO ARTICLE ── */}
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
          <Link
            href="/actualites"
            className="group mb-8 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-white/55 transition-colors hover:text-white"
          >
            <ArrowLeft size={13} strokeWidth={2.2} />
            Toutes les actualités
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex rounded-full px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.2em]"
              style={{
                background: CATEGORIE_COLORS[article.categorie]?.bg,
                color: CATEGORIE_COLORS[article.categorie]?.text,
              }}
            >
              {article.categorie}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/55">
              <Calendar size={12} strokeWidth={2} />
              {formatDateFr(article.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/55">
              <Clock size={12} strokeWidth={2} />
              {article.lecture}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-white/55">
              <User size={12} strokeWidth={2} />
              {article.auteur}
            </span>
          </div>

          <h1 className="font-display max-w-4xl text-balance text-[2rem] font-bold leading-tight tracking-tight sm:text-[2.75rem] lg:text-[3.5rem]">
            {article.titre}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/72 sm:text-lg">
            {article.chapo}
          </p>
        </Container>
      </section>

      {/* ── CORPS DE L'ARTICLE ── */}
      <article className="py-16 sm:py-20 lg:py-24">
        <Container size="tight">
          <div className="prose-styles space-y-6">
            {article.contenu.map((paragraphe, i) => (
              <p
                key={i}
                className="text-pretty text-[1.0625rem] leading-[1.78] text-neutral-700 sm:text-[1.125rem]"
              >
                {paragraphe}
              </p>
            ))}
          </div>
        </Container>
      </article>

      {/* ── ARTICLES LIÉS ── */}
      {related.length > 0 && (
        <section className="border-t border-neutral-200 bg-neutral-50 py-16 sm:py-20">
          <Container>
            <p className="mb-8 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
              À lire également
            </p>
            <div className="grid gap-8 sm:grid-cols-2">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/actualites/${a.slug}`}
                  className="group flex flex-col"
                >
                  <div
                    className="relative aspect-[16/9] overflow-hidden rounded-xl"
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
                  <h3 className="mt-5 font-display text-[1.125rem] font-bold leading-tight tracking-tight text-[#0D1A4A] transition-colors group-hover:text-[#1E2F8A]">
                    {a.titre}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[0.875rem] leading-relaxed text-neutral-600">
                    {a.chapo}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#1E2F8A] transition-colors group-hover:text-[#F39200]">
                    Lire
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
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
