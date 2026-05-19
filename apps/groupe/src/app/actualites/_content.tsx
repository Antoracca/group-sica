"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@sica/ui";
import type { Actualite, ActualiteCategorie } from "@/lib/actualites";
import { formatDateFr } from "@/lib/actualites";

/* ════════════════════════════════════════════════════════════════════════
   Easing & helpers
═══════════════════════════════════════════════════════════════════════ */
const E = [0.16, 1, 0.3, 1] as const;

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

/* Format date court éditorial : "10 DÉC 2025" */
function formatDateShort(iso: string): string {
  const d = new Date(iso);
  const months = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC"];
  return `${d.getDate().toString().padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/* ════════════════════════════════════════════════════════════════════════
   Couleurs par catégorie — accents clairs (cohérent avec news.tsx)
═══════════════════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-36 pb-20 text-white sm:pt-44 sm:pb-28"
      style={{ background: "linear-gradient(155deg, #060D22 0%, #0F1C55 55%, #1E2F8A 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='52' height='52'><path d='M52 0H0V52' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
          backgroundSize: "52px 52px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(243,146,0,0.45) 0%, transparent 65%)" }}
      />

      <Container className="relative">
        <motion.p
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: E }}
          className="mb-7 inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
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

/* ════════════════════════════════════════════════════════════════════════
   FEATURED ARTICLE — pleine largeur éditoriale (sans filigrane chiffré)
═══════════════════════════════════════════════════════════════════════ */
function FeaturedArticle({ article }: { article: Actualite }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const cat: CatStyle = CAT[article.categorie] ?? FALLBACK_CAT;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-neutral-200 bg-[#FAFAF6] py-20 sm:py-24 lg:py-28"
    >
      {/* Texture papier journal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "180px 180px",
        }}
      />

      <Container className="relative">
        {/* Bandeau "À LA UNE" en haut */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: E }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="h-[1.5px] w-12" style={{ background: "#F39200" }} aria-hidden />
          <span
            className="text-[0.7rem] font-bold uppercase tracking-[0.35em] text-[#F39200]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            À la une
          </span>
          <span className="text-neutral-300" aria-hidden>·</span>
          <span
            className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-neutral-500"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {formatDateShort(article.date)}
          </span>
        </motion.div>

        <Link href={`/actualites/${article.slug}`} className="group block">
          <div className="grid items-start gap-12 lg:grid-cols-[1.6fr_1fr] xl:gap-20">

            {/* Colonne gauche — titre éditorial massif */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08, ease: E }}
                className="mb-5 inline-flex items-center gap-2"
              >
                <span
                  className="inline-block h-[3px] w-6"
                  style={{ background: cat.accent }}
                  aria-hidden
                />
                <span
                  className="text-[0.7rem] font-bold uppercase tracking-[0.28em]"
                  style={{ color: cat.accent, fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {article.categorie}
                </span>
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.14, ease: E }}
                className="text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-[#0D1A4A] transition-colors duration-300 group-hover:text-[#1E2F8A]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {article.titre}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.72, delay: 0.24, ease: E }}
                className="mt-6 max-w-[58ch] text-[1.0625rem] leading-[1.74] text-neutral-600"
              >
                {article.chapo}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.34 }}
                className="mt-8 inline-flex items-center gap-3"
              >
                <span
                  className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#1E2F8A] transition-colors group-hover:text-[#F39200]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Lire l'article complet
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-[#1E2F8A] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-[#F39200]"
                />
              </motion.div>
            </div>

            {/* Colonne droite — pull-quote éditorial sobre */}
            <motion.aside
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.22, ease: E }}
              className="relative lg:pt-10"
            >
              {/* Filet d'accent vertical à gauche */}
              <span
                className="absolute left-0 top-10 hidden h-[80%] w-[2px] lg:block"
                style={{ background: cat.accent, opacity: 0.7 }}
                aria-hidden
              />
              <div className="lg:pl-8">
                <p
                  className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-neutral-400"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Extrait
                </p>
                <blockquote
                  className="mt-3 text-[1.125rem] italic leading-[1.7] text-neutral-700"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  "{(article.contenu[0] ?? "").slice(0, 180)}…"
                </blockquote>
                <div className="mt-7 flex flex-col gap-1.5">
                  <span
                    className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-neutral-500"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {article.auteur}
                  </span>
                  <span
                    className="text-[0.68rem] uppercase tracking-[0.18em] text-neutral-400"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {article.lecture} de lecture
                  </span>
                </div>
              </div>
            </motion.aside>
          </div>
        </Link>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ARTICLE ROW — ligne éditoriale (pas de card, pas de border rounded)
   Variant "large" tous les 4 articles : titre plus grand, layout différent
═══════════════════════════════════════════════════════════════════════ */
function ArticleRow({
  article,
  variant,
}: {
  article: Actualite;
  variant: "large" | "standard";
}) {
  const cat: CatStyle = CAT[article.categorie] ?? FALLBACK_CAT;
  const isLarge = variant === "large";

  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.55, ease: E }}
      className="group relative"
    >
      <Link
        href={`/actualites/${article.slug}`}
        className="relative flex flex-col gap-5 py-9 transition-colors duration-300 sm:py-10 lg:flex-row lg:items-start lg:gap-10 lg:py-12"
        aria-label={`Lire : ${article.titre}`}
      >
        {/* ─ Filet d'accent vertical (subtil → s'élargit au hover) ─ */}
        <span
          aria-hidden
          className="absolute left-0 top-9 h-12 w-[2px] transition-all duration-500 group-hover:h-[calc(100%-3rem)] group-hover:w-[3px] sm:top-10"
          style={{ background: cat.accent }}
        />

        {/* ─ Halo ambre qui se révèle au hover, parfaitement sobre ─ */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-4 inset-y-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, rgba(243,146,0,0.04) 0%, rgba(243,146,0,0.015) 50%, transparent 100%)",
          }}
        />

        {/* ─ COLONNE GAUCHE : méta + date verticale (desktop), inline (mobile) ─ */}
        <div className="flex shrink-0 items-center gap-4 pl-6 lg:w-[200px] lg:flex-col lg:items-start lg:gap-3 lg:pt-2 lg:pl-8">
          <span
            className="text-[0.65rem] font-bold uppercase tracking-[0.28em]"
            style={{ color: cat.accent, fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {article.categorie}
          </span>
          <span className="text-neutral-300 lg:hidden" aria-hidden>·</span>
          <time
            className="tabular-nums text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {formatDateShort(article.date)}
          </time>
        </div>

        {/* ─ COLONNE CENTRE : titre + chapô ─ */}
        <div className="flex-1 pl-6 lg:pl-0">
          <h3
            className={[
              "text-balance font-bold leading-[1.16] tracking-tight text-[#0D1A4A] transition-colors duration-300 group-hover:text-[#1E2F8A]",
              isLarge
                ? "text-[clamp(1.625rem,2.6vw,2.25rem)]"
                : "text-[clamp(1.25rem,2vw,1.625rem)]",
            ].join(" ")}
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {article.titre}
          </h3>

          <p
            className={[
              "mt-3 text-pretty leading-[1.68] text-neutral-600",
              isLarge ? "max-w-[62ch] text-[1rem]" : "max-w-[58ch] line-clamp-2 text-[0.9375rem]",
            ].join(" ")}
          >
            {article.chapo}
          </p>

          {/* Méta ligne basse : lire + temps */}
          <div className="mt-5 flex items-center gap-5">
            <span
              className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#1E2F8A] transition-colors group-hover:text-[#F39200]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <span className="h-px w-5 bg-current transition-all duration-300 group-hover:w-9" aria-hidden />
              Lire l'article
              <ArrowUpRight
                size={13}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            <span
              className="text-[0.68rem] tabular-nums uppercase tracking-[0.18em] text-neutral-400"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {article.lecture}
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
═══════════════════════════════════════════════════════════════════════ */
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
      {featured && <FeaturedArticle article={featured} />}

      {/* ══════════════════════════════════════════════════════════════
          LISTE ÉDITORIALE — pas de cards, layout journal
          Filets verticaux d'accent + séparateurs fins horizontaux
      ══════════════════════════════════════════════════════════════ */}
      {rest.length > 0 && (
        <section className="relative overflow-hidden bg-[#FBF7EE] py-16 sm:py-20 lg:py-24">
          {/* Texture papier journal très subtile */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundSize: "180px 180px",
            }}
          />

          <Container className="relative">
            {/* ─ En-tête section + filtres ─ */}
            <div className="mb-12 flex flex-col gap-7 border-b border-[#1E2F8A]/12 pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-[1.5px] w-8 bg-[#F39200]" aria-hidden />
                  <span
                    className="text-[0.7rem] font-bold uppercase tracking-[0.32em] text-[#F39200]"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Toute l'actualité
                  </span>
                </div>
                <h2
                  className="mt-4 text-balance text-[clamp(1.625rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-[#0D1A4A]"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Chroniques du Groupe SICA.
                </h2>
              </Reveal>

              {/* ─ Pills filtre, alignés à droite, look journal ─ */}
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
                          "px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] transition-all duration-200",
                          isActive
                            ? "bg-[#1E2F8A] text-white shadow-[0_2px_12px_rgba(30,47,138,0.25)]"
                            : "bg-transparent text-neutral-500 hover:bg-[#1E2F8A]/[0.05] hover:text-[#1E2F8A]",
                        ].join(" ")}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            {/* ─ Liste éditoriale verticale (pas de grid, pas de cards) ─ */}
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.ul
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="divide-y divide-[#1E2F8A]/12"
                >
                  {filtered.map((a, i) => (
                    <ArticleRow
                      key={a.slug}
                      article={a}
                      /* Une ligne sur 4 passe en "large" pour rythmer la page */
                      variant={i % 4 === 0 ? "large" : "standard"}
                    />
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border-t border-[#1E2F8A]/12 py-16 text-center"
                >
                  <p className="text-[0.875rem] text-neutral-500">
                    Aucun article dans cette catégorie pour le moment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pied de section — colophon éditorial */}
            <div className="mt-12 flex items-center justify-between border-t border-[#1E2F8A]/12 pt-7">
              <span
                className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-neutral-400"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Le journal du Groupe SICA
              </span>
              <span
                className="text-[0.68rem] tabular-nums uppercase tracking-[0.18em] text-neutral-400"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {filtered.length} {filtered.length > 1 ? "articles" : "article"}
              </span>
            </div>
          </Container>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          PRIX ET RÉCOMPENSES — placeholder éditorial
      ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-neutral-200 bg-white py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-[1.5px] w-8 bg-[#F39200]" aria-hidden />
              <span
                className="text-[0.7rem] font-bold uppercase tracking-[0.32em] text-[#F39200]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Prix et récompenses
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <h2
              className="mb-10 mt-4 text-balance text-[clamp(1.625rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-[#0D1A4A]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Distinctions du Groupe.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="flex items-center gap-5 border-l-[2px] border-[#F39200] bg-[#FBF7EE] px-7 py-7">
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
