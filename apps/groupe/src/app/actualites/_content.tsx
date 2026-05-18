"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@sica/ui";
import type { Actualite, ActualiteCategorie } from "@/lib/actualites";
import { formatDateFr } from "@/lib/actualites";

/* ─── Easing ───────────────────────────────────────────────────────────── */
const E = [0.16, 1, 0.3, 1] as const;

/* ─── Reveal wrapper ───────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Couleurs par catégorie ────────────────────────────────────────────── */
type CatStyle = { accent: string; bg: string; label: string };
const FALLBACK_CAT: CatStyle = { accent: "#0D1A4A", bg: "rgba(13,26,74,0.09)", label: "#0D1A4A" };
const CAT: Record<string, CatStyle> = {
  Construction: { accent: "#1E2F8A", bg: "rgba(30,47,138,0.09)", label: "#1E2F8A" },
  Assistance:   { accent: "#F39200", bg: "rgba(243,146,0,0.11)",  label: "#A05500" },
  Groupe:       { accent: "#0D1A4A", bg: "rgba(13,26,74,0.09)",   label: "#0D1A4A" },
  Communauté:   { accent: "#166534", bg: "rgba(22,101,52,0.10)",  label: "#166534" },
};

const CATEGORIES: Array<ActualiteCategorie | "Tout"> = [
  "Tout",
  "Construction",
  "Groupe",
  "Assistance",
  "Communauté",
];

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
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
      {/* Halo ambre discret */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(243,146,0,0.45) 0%, transparent 65%)" }}
      />

      <Container className="relative">
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: E }}
          className="mb-7 inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]"
        >
          <span className="h-px w-7 bg-[#F39200]" aria-hidden />
          Actualités SICA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, delay: 0.07, ease: E }}
          className="max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02] tracking-tight"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Le journal
          <br />
          <em className="not-italic" style={{ color: "#F39200" }}>
            du Groupe.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-white/60"
        >
          Livraisons, distinctions, études techniques, lancements produits.
          Tout ce qui rythme la vie de SICA Construction et SICA Assistance.
        </motion.p>

        {/* Filet séparateur décoratif */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: E }}
          className="mt-10 h-px w-full max-w-[560px] origin-left bg-gradient-to-r from-[#F39200]/60 via-white/10 to-transparent"
        />
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURED ARTICLE — mise en avant éditoriale
═══════════════════════════════════════════════════════════════════════════ */
function FeaturedArticle({ article, index }: { article: Actualite; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const cat: CatStyle = CAT[article.categorie] ?? FALLBACK_CAT;

  return (
    <div ref={ref} className="border-b border-neutral-200 py-16 sm:py-20 lg:py-24">
      <Container>
        <Link href={`/actualites/${article.slug}`} className="group block">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px] xl:gap-20">

            {/* Colonne gauche — texte éditorial */}
            <div>
              {/* Numéro éditorial géant */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-2 select-none font-black leading-none tracking-tighter text-[#1E2F8A]/[0.07]"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(5rem, 12vw, 9rem)",
                  lineHeight: 0.85,
                }}
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </motion.p>

              {/* Badge + date */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.07, ease: E }}
                className="mb-5 flex flex-wrap items-center gap-3"
              >
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em]"
                  style={{ background: cat.bg, color: cat.label }}
                >
                  À la une · {article.categorie}
                </span>
                <time className="text-[0.8125rem] text-neutral-500">
                  {formatDateFr(article.date)}
                </time>
              </motion.div>

              {/* Titre */}
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.12, ease: E }}
                className="text-balance text-[clamp(1.875rem,3.5vw,2.875rem)] font-bold leading-[1.12] tracking-tight text-[#0D1A4A] transition-colors group-hover:text-[#1E2F8A]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {article.titre}
              </motion.h2>

              {/* Chapo */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.72, delay: 0.2, ease: E }}
                className="mt-5 text-[1.0625rem] leading-[1.72] text-neutral-600"
              >
                {article.chapo}
              </motion.p>

              {/* CTA */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-7 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-[#1E2F8A] transition-colors group-hover:text-[#F39200]"
              >
                Lire l'article complet
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </motion.span>
            </div>

            {/* Colonne droite — encart visuel éditorial */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.82, delay: 0.18, ease: E }}
              className="relative"
            >
              <div
                className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
                style={{
                  background: `linear-gradient(145deg, ${cat.accent} 0%, #060D22 100%)`,
                }}
              >
                {/* Blueprint grid */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M40 0H0V40' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Pull-quote éditorial */}
                <p
                  className="relative text-[0.72rem] font-bold uppercase tracking-[0.28em] text-white/35"
                >
                  Extrait
                </p>
                <blockquote
                  className="relative mt-4 text-[1.05rem] italic leading-[1.7] text-white/80"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  "{(article.contenu[0] ?? "").slice(0, 160)}…"
                </blockquote>

                {/* Filet ambre */}
                <div
                  aria-hidden
                  className="mt-7 h-px w-16"
                  style={{ background: "#F39200" }}
                />

                {/* Meta */}
                <div className="mt-5 flex items-center gap-4">
                  <span className="text-[0.78rem] text-white/45">{article.auteur}</span>
                  <span className="flex items-center gap-1.5 text-[0.78rem] text-white/35">
                    <Clock size={11} strokeWidth={2} />
                    {article.lecture}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </Link>
      </Container>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ARTICLE CARD — grille magazine
═══════════════════════════════════════════════════════════════════════════ */
function ArticleCard({
  article,
  index,
}: {
  article: Actualite;
  index: number;
}) {
  const cat: CatStyle = CAT[article.categorie] ?? FALLBACK_CAT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.055, ease: E }}
      layout
    >
      <Link
        href={`/actualites/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:border-transparent hover:shadow-[0_8px_40px_rgba(30,47,138,0.10)]"
      >
        {/* Barre accent catégorie */}
        <div
          className="h-[3px] w-full transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: cat.accent, transformOrigin: "left" }}
        />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          {/* Numéro + catégorie */}
          <div className="mb-5 flex items-center justify-between">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.18em]"
              style={{ background: cat.bg, color: cat.label }}
            >
              {article.categorie}
            </span>
            <span
              className="select-none font-black text-[1.75rem] leading-none text-[#1E2F8A]/[0.08]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Date */}
          <time className="mb-2.5 text-[0.75rem] text-neutral-400">
            {formatDateFr(article.date)}
          </time>

          {/* Titre */}
          <h3
            className="flex-1 text-balance text-[1.125rem] font-bold leading-[1.22] tracking-tight text-[#0D1A4A] transition-colors group-hover:text-[#1E2F8A]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {article.titre}
          </h3>

          {/* Chapo */}
          <p className="mt-3 line-clamp-3 text-[0.875rem] leading-[1.65] text-neutral-600">
            {article.chapo}
          </p>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
            <span className="flex items-center gap-1.5 text-[0.75rem] text-neutral-400">
              <Clock size={11} strokeWidth={2} />
              {article.lecture}
            </span>
            <span className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-[#1E2F8A] transition-colors group-hover:text-[#F39200]">
              Lire
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
═══════════════════════════════════════════════════════════════════════════ */
export function ActualitesContent({ articles }: { articles: Actualite[] }) {
  const [activeFilter, setActiveFilter] = React.useState<ActualiteCategorie | "Tout">("Tout");

  const [featured, ...rest] = articles;

  const filtered = React.useMemo(
    () =>
      activeFilter === "Tout"
        ? rest
        : rest.filter((a) => a.categorie === activeFilter),
    [activeFilter, rest],
  );

  return (
    <>
      <Hero />

      {/* ── À LA UNE ── */}
      {featured && <FeaturedArticle article={featured} index={0} />}

      {/* ── GRILLE ARTICLES ── */}
      {rest.length > 0 && (
        <section className="bg-[#F8F8F5] py-16 sm:py-20 lg:py-24">
          <Container>
            {/* En-tête section + filtres */}
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
                  Tous les articles
                </p>
                <h2
                  className="mt-2 text-[1.375rem] font-bold leading-tight tracking-tight text-[#0D1A4A]"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Filtrer par thème
                </h2>
              </Reveal>

              {/* Pills filtre */}
              <Reveal delay={0.05}>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const isActive = activeFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveFilter(cat)}
                        className={[
                          "rounded-full border px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-all duration-200",
                          isActive
                            ? "border-[#1E2F8A] bg-[#1E2F8A] text-white shadow-sm"
                            : "border-neutral-300 bg-white text-neutral-600 hover:border-[#1E2F8A] hover:text-[#1E2F8A]",
                        ].join(" ")}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            {/* Grille */}
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filtered.map((a, i) => (
                    <ArticleCard key={a.slug} article={a} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center"
                >
                  <p className="text-[0.875rem] text-neutral-500">
                    Aucun article dans cette catégorie pour le moment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </section>
      )}

      {/* ── PRIX ET RÉCOMPENSES — placeholder ── */}
      <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
        <Container>
          <Reveal>
            <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
              Prix et Récompenses
            </p>
          </Reveal>
          <Reveal delay={0.07}>
            <h2
              className="mb-10 text-[1.375rem] font-bold leading-tight tracking-tight text-[#0D1A4A]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Distinctions du Groupe
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-neutral-300 bg-[#F8F8F5] px-7 py-8">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: "rgba(243,146,0,0.10)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F39200" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
              </div>
              <p className="text-[0.9375rem] leading-relaxed text-neutral-500">
                Les prix et récompenses du Groupe SICA s'afficheront ici prochainement.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
