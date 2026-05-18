"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   FONTS — DM Serif Display (titres) + Barlow Condensed (méta)
   Cohérent avec Pillars / Realisations
══════════════════════════════════════════════════════════════ */
/* Google Fonts chargées dans layout.tsx — pas d'injection ici */

/* ══════════════════════════════════════════════════════════════
   DATA — 20 actualités sourcées du Dossier Technique SICA (déc. 2025)
   AUCUNE distinction / mérite personnel — uniquement entreprise
══════════════════════════════════════════════════════════════ */
type Categorie =
  | "Innovation"
  | "Réseau"
  | "Technique"
  | "Chantier"
  | "Équipe"
  | "Équipement"
  | "Service"
  | "Partenariat"
  | "Engagement"
  | "Méthode"
  | "Performance"
  | "Digital"
  | "Diversification";

interface Article {
  slug: string;
  category: Categorie;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
}

const ARTICLES: readonly Article[] = [
  {
    slug: "geobeton-btcs-materiau-signature",
    category: "Innovation",
    date: "Déc. 2025",
    title: "Géobéton BTCS — le matériau qui change la façon de construire en Côte d'Ivoire",
    excerpt:
      "Brique de terre comprimée stabilisée. 90 % terre tamisée, 10 % ciment. Plus de 99 ans de durée de vie, zéro fissure après construction. Notre signature technique.",
    readTime: "5 min",
  },
  {
    slug: "antenne-yamoussoukro-morofe",
    category: "Réseau",
    date: "Nov. 2025",
    title: "Ouverture de notre antenne à Yamoussoukro — Morofé",
    excerpt:
      "Pour desservir l'intérieur du pays sans compromis sur la qualité. Équipes mobiles, bureaux permanents, réactivité identique à Abidjan. Le centre du pays mérite la même exigence.",
    readTime: "3 min",
  },
  {
    slug: "etudes-sol-pressiometre",
    category: "Technique",
    date: "Oct. 2025",
    title: "Essais pressiométriques — la précision avant les fondations",
    excerpt:
      "Mesurer la résistance du sol couche par couche, avant de couler la moindre semelle. C'est notre garantie : zéro mauvaise surprise lors du gros œuvre.",
    readTime: "4 min",
  },
  {
    slug: "production-briques-geobeton",
    category: "Équipement",
    date: "Sept. 2025",
    title: "Mise en service d'une nouvelle ligne de production briques géobéton",
    excerpt:
      "Notre capacité de production augmente. Briques BTCS calibrées sur place, livrées directement sur chantier. Plus de logistique externe, moins de délais.",
    readTime: "3 min",
  },
  {
    slug: "team-cinq-nouvelle-equipe-terrain",
    category: "Équipe",
    date: "Sept. 2025",
    title: "Une cinquième équipe terrain rejoint SICA Construction",
    excerpt:
      "Ingénieurs génie civil, techniciens supérieurs, ouvriers qualifiés. La TEAM N°5 nous permet d'ouvrir cinq chantiers en parallèle, sans diluer la rigueur.",
    readTime: "2 min",
  },
  {
    slug: "construction-metallique-charpente",
    category: "Diversification",
    date: "Août 2025",
    title: "Construction métallique — hangars, combles, pylônes",
    excerpt:
      "Étude, fabrication, montage. Notre pôle métal complète notre offre béton armé. Une seule entreprise, du sol aux structures les plus complexes.",
    readTime: "4 min",
  },
  {
    slug: "essais-penetrometriques-spt",
    category: "Technique",
    date: "Août 2025",
    title: "Essais SPT pénétromètre — pour les sols les plus délicats",
    excerpt:
      "Sondages dynamiques continus, profil de portance complet. Pour les terrains de Cocody, d'Abidjan Nord, et partout où la nature des sols change brutalement.",
    readTime: "4 min",
  },
  {
    slug: "location-engins-btp",
    category: "Service",
    date: "Juillet 2025",
    title: "Location d'engins BTP — un nouveau service pour les pros",
    excerpt:
      "Bétonnières, vibreurs, chargeuses, camions. Du matériel entretenu, livré sur site, à la journée ou au mois. Pour les confrères comme pour les chantiers indépendants.",
    readTime: "2 min",
  },
  {
    slug: "engagement-24-7",
    category: "Engagement",
    date: "Juillet 2025",
    title: "Astreinte client 24h/24, 7j/7 — l'engagement SICA",
    excerpt:
      "Un chantier ne s'arrête pas le week-end. Notre cellule d'astreinte répond à toute heure, pour les questions techniques comme pour les urgences de terrain.",
    readTime: "2 min",
  },
  {
    slug: "geobeton-empreinte-carbone",
    category: "Innovation",
    date: "Juin 2025",
    title: "Géobéton : jusqu'à 70 % de CO₂ en moins par mètre carré",
    excerpt:
      "Moins de ciment, plus de terre locale. Notre matériau signature divise par trois l'empreinte carbone d'un mur traditionnel. Construire propre, sans concession.",
    readTime: "5 min",
  },
  {
    slug: "methode-sept-etapes",
    category: "Méthode",
    date: "Juin 2025",
    title: "Notre méthode en sept étapes — du terrain aux clés en main",
    excerpt:
      "Visite, étude de sol, conception, ingénierie, devis, permis, démarrage. Rien n'est laissé au hasard. Chaque étape est documentée, chaque décision tracée.",
    readTime: "4 min",
  },
  {
    slug: "geobeton-economie-20-pourcent",
    category: "Performance",
    date: "Mai 2025",
    title: "Géobéton — jusqu'à 20 % d'économies sur les gros œuvres",
    excerpt:
      "À qualité égale, parfois supérieure. Le calcul est simple : moins de ciment importé, plus de matière locale, des délais raccourcis. La rentabilité d'un choix réfléchi.",
    readTime: "3 min",
  },
  {
    slug: "delai-construction-reduit",
    category: "Performance",
    date: "Avril 2025",
    title: "Délais de construction réduits de 30 % avec le géobéton",
    excerpt:
      "Brique préfabriquée, séchage rapide, pose mécanisée. Les chantiers avancent. Là où un projet prenait dix mois, nous livrons en sept. Sans rabais sur la qualité.",
    readTime: "3 min",
  },
  {
    slug: "partenariat-afg-bank",
    category: "Partenariat",
    date: "Avril 2025",
    title: "Partenariat AFG Bank — accompagner le financement de votre projet",
    excerpt:
      "Notre client peut désormais bénéficier d'un parcours de financement simplifié auprès d'AFG Bank Côte d'Ivoire. Devis SICA, dossier accompagné, décision plus rapide.",
    readTime: "3 min",
  },
  {
    slug: "vrd-amenagements-urbains",
    category: "Technique",
    date: "Mars 2025",
    title: "Voirie, réseaux divers, terrassement — notre pôle aménagement",
    excerpt:
      "Préparation de plateforme, drainage, assainissement, signalisation, paysage. Tout ce qui se passe avant et autour du bâtiment — et que nous gérons aussi.",
    readTime: "4 min",
  },
  {
    slug: "plomberie-electricite-integre",
    category: "Service",
    date: "Mars 2025",
    title: "Plomberie et électricité — second œuvre intégré",
    excerpt:
      "Du gainage aux luminaires, de la pieuvre aux raccordements. Nos équipes second œuvre interviennent en continuité du gros œuvre. Une seule responsabilité.",
    readTime: "3 min",
  },
  {
    slug: "villa-duplex-bingerville",
    category: "Chantier",
    date: "Févr. 2025",
    title: "Villa duplex Bingerville — livraison du programme R+1",
    excerpt:
      "Façade géobéton apparente, terrasses étagées, finitions soignées. Un projet livré dans les délais annoncés, après dix mois de chantier maîtrisé.",
    readTime: "3 min",
  },
  {
    slug: "sica-ci-lancement-site",
    category: "Digital",
    date: "Janv. 2025",
    title: "sica.ci — notre nouveau site dédié au Groupe",
    excerpt:
      "Une vitrine pensée pour vous. Pôles, réalisations, contact direct, accès client. Une porte d'entrée unique vers SICA Construction et SICA Assistance.",
    readTime: "2 min",
  },
  {
    slug: "grands-chantiers-sous-traitance",
    category: "Partenariat",
    date: "Janv. 2025",
    title: "Grands chantiers et sous-traitance — un positionnement assumé",
    excerpt:
      "Travailler aux côtés des majors du BTP ivoirien. Apporter notre savoir-faire géobéton sur les programmes d'envergure. Sans perdre l'âme d'un acteur local.",
    readTime: "4 min",
  },
  {
    slug: "prefabrique-elements-beton",
    category: "Équipement",
    date: "Déc. 2024",
    title: "Préfabriqués béton — éléments calibrés pour gagner du temps",
    excerpt:
      "Linteaux, poteaux, hourdis, claustras. Préparés en atelier, livrés prêts à poser. Moins de temps perdu sur place, plus de régularité dans la qualité finale.",
    readTime: "3 min",
  },
] satisfies Article[];

/* ══════════════════════════════════════════════════════════════
   Pagination — 2 articles par vue (diptyque), 4s par cycle
══════════════════════════════════════════════════════════════ */
const CHUNK_SIZE = 2;
const ROTATE_MS = 5000; // 5 s

function chunkBy<T>(arr: readonly T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

/* Couleur d'accent — claire sur fond sombre */
function catColor(c: Categorie): string {
  switch (c) {
    case "Innovation":
    case "Performance":     return "#F39200"; /* orange chaud */
    case "Réseau":
    case "Partenariat":     return "#6B85F0"; /* bleu clair */
    case "Technique":
    case "Équipement":      return "#7CC4FF"; /* cyan doux */
    case "Chantier":
    case "Équipe":          return "#5FD4A4"; /* vert émeraude clair */
    case "Service":
    case "Engagement":      return "#C8A5FF"; /* lavande */
    case "Méthode":
    case "Diversification": return "#FFB84D"; /* ocre */
    case "Digital":         return "#5FE6E5"; /* turquoise */
  }
}

/* ══════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
══════════════════════════════════════════════════════════════ */
export function News() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -10% 0px",
  });

  const chunks = React.useMemo(() => chunkBy(ARTICLES, CHUNK_SIZE), []);
  const totalChunks = chunks.length;
  const [chunkIdx, setChunkIdx] = React.useState(0);
  const current = chunks[chunkIdx] ?? [];

  /* Pause au hover/touch — pour laisser le temps de lire */
  const [paused, setPaused] = React.useState(false);
  const rotateTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextSwitchAtRef = React.useRef<number | null>(null);
  const mobilePauseTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearRotateTimeout = React.useCallback(() => {
    if (!rotateTimeoutRef.current) return;
    clearTimeout(rotateTimeoutRef.current);
    rotateTimeoutRef.current = null;
  }, []);

  const clearMobilePauseTimeout = React.useCallback(() => {
    if (!mobilePauseTimeoutRef.current) return;
    clearTimeout(mobilePauseTimeoutRef.current);
    mobilePauseTimeoutRef.current = null;
  }, []);

  const scheduleNextTick = React.useCallback(
    (delayMs: number) => {
      clearRotateTimeout();
      rotateTimeoutRef.current = setTimeout(() => {
        setChunkIdx((i) => (i + 1) % totalChunks);
        nextSwitchAtRef.current = Date.now() + ROTATE_MS;
        scheduleNextTick(ROTATE_MS);
      }, delayMs);
    },
    [clearRotateTimeout, totalChunks],
  );

  const pauseBrieflyForTouch = React.useCallback((ms = 2200) => {
    setPaused(true);
    clearMobilePauseTimeout();
    mobilePauseTimeoutRef.current = setTimeout(() => {
      setPaused(false);
      mobilePauseTimeoutRef.current = null;
    }, ms);
  }, [clearMobilePauseTimeout]);

  React.useEffect(() => {
    if (!inView || paused || totalChunks <= 1) {
      clearRotateTimeout();
      return;
    }

    nextSwitchAtRef.current = Date.now() + ROTATE_MS;
    scheduleNextTick(ROTATE_MS);

    return clearRotateTimeout;
  }, [inView, paused, totalChunks, scheduleNextTick, clearRotateTimeout]);

  React.useEffect(() => {
    if (totalChunks <= 1) return;

    const onVisibilityChange = () => {
      if (document.hidden) {
        clearRotateTimeout();
        return;
      }

      if (!inView || paused) return;

      const now = Date.now();
      const target = nextSwitchAtRef.current ?? now + ROTATE_MS;
      if (now >= target) {
        setChunkIdx((i) => (i + 1) % totalChunks);
        nextSwitchAtRef.current = now + ROTATE_MS;
        scheduleNextTick(ROTATE_MS);
        return;
      }

      scheduleNextTick(Math.max(120, target - now));
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [inView, paused, totalChunks, scheduleNextTick, clearRotateTimeout]);

  React.useEffect(() => clearMobilePauseTimeout, [clearMobilePauseTimeout]);

  return (
    <>
      <section
        ref={sectionRef}
        aria-labelledby="news-heading"
        className="relative overflow-hidden bg-[#FAFAF6] py-20 sm:py-28 lg:py-32"
      >
        {/* ── Texture papier journal (très subtile) ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "180px 180px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,47,138,0.045) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 100% 100%, rgba(243,146,0,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">

          {/* ═══ EN-TÊTE ÉDITORIAL — épuré ═══ */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <div className="mb-5 flex items-center gap-3">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-px w-10 origin-left bg-[#F39200]"
                />
                <span
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-[#F39200]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Actualités · À la une
                </span>
              </div>

              <h2
                id="news-heading"
                className="text-balance text-[2rem] font-bold leading-[1.05] tracking-tight text-[#0D1A4A] sm:text-[2.5rem] lg:text-[3rem]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Les dernières nouvelles{" "}
                <em
                  className="not-italic"
                  style={{
                    background:
                      "linear-gradient(120deg, #1E2F8A 20%, #3B62F5 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  du Groupe.
                </em>
              </h2>

              <p className="mt-4 max-w-[540px] text-[0.9375rem] leading-relaxed text-neutral-600">
                Innovations techniques, ouvertures de chantiers, partenariats.
                Tout ce qui fait avancer SICA, chaque mois.
              </p>
            </motion.div>

            {/* CTA seul — pas de compteur, pas de dots */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0"
            >
              <a
                href="/actualites"
                className="group inline-flex items-center gap-2 rounded-full border border-[#1E2F8A]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1E2F8A] transition-all duration-300 hover:bg-[#1E2F8A] hover:text-white hover:shadow-lg"
              >
                Toutes les actualités
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* ═══ SCÈNE DIAGONALE DESKTOP ═══ */}
          <div
            className="relative mt-14 hidden lg:block"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <DiagonalStage
              chunkIdx={chunkIdx}
              articles={current}
              inView={inView}
            />
          </div>

          {/* ═══ MOBILE — diptyque vertical avec même peel ═══ */}
          <div
            className="relative mt-12 lg:hidden"
            onTouchStart={() => pauseBrieflyForTouch(2400)}
            onTouchEnd={() => setPaused(false)}
            onTouchCancel={() => setPaused(false)}
          >
            <MobileStage
              chunkIdx={chunkIdx}
              articles={current}
              inView={inView}
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   DiagonalStage — scène desktop
   Fond navy profond (la noirceur qu'on voit pendant le peel)
   2 cartes posées en diagonale : haut-gauche + bas-droite
   Watermark SICA filigrane top-right
══════════════════════════════════════════════════════════════ */
function DiagonalStage({
  chunkIdx,
  articles,
  inView,
}: {
  chunkIdx: number;
  articles: Article[];
  inView: boolean;
}) {
  const STAGE_HEIGHT = 580;

  return (
    <div
      className="relative overflow-hidden rounded-[24px]"
      style={{
        height: STAGE_HEIGHT,
        perspective: 2000, // requis pour rotateX 3D du peel
        background:
          "radial-gradient(ellipse 90% 80% at 30% 20%, #142066 0%, #0A1340 60%, #06092A 100%)",
        boxShadow:
          "0 40px 100px rgba(8,12,40,0.35), 0 12px 32px rgba(8,12,40,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Texture grain sur le navy (très subtile) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* ── Halo orange chaud (atmosphère) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 90% 90%, rgba(243,146,0,0.10) 0%, transparent 60%)",
        }}
      />

      {/* ── WATERMARK SICA — filigrane top-right, signature éditoriale ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-8 top-7 z-[1]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <Image
          src="/logo-groupe.png"
          alt=""
          width={180}
          height={76}
          unoptimized
          className="h-[58px] w-auto"
          style={{
            filter: "brightness(0) invert(1)",
            opacity: 0.085,
          }}
        />
      </motion.div>

      {/* ── DÉCOR DIAGONAL — traits éditoriaux flottants AU-DESSUS des cartes ──
            Chaque carte a son propre trait diagonal au-dessus, jamais sur le texte */}
      <DiagonalDecor inView={inView} chunkIdx={chunkIdx} />

      {/* ── 2 CARTES POSÉES EN DIAGONALE ── */}
      <AnimatePresence mode="popLayout">
        {articles[0] && (
          <DiagonalCard
            key={`tl-${chunkIdx}`}
            article={articles[0]}
            position="topLeft"
          />
        )}
        {articles[1] && (
          <DiagonalCard
            key={`br-${chunkIdx}`}
            article={articles[1]}
            position="bottomRight"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DiagonalDecor — 2 traits SVG diagonaux flottants AU-DESSUS
   Pas au-dessus du texte (z-index plus bas que les cartes)
══════════════════════════════════════════════════════════════ */
function DiagonalDecor({
  inView,
  chunkIdx,
}: {
  inView: boolean;
  chunkIdx: number;
}) {
  return (
    <svg
      key={`decor-${chunkIdx}`}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      viewBox="0 0 1000 580"
      preserveAspectRatio="none"
    >
      {/* ── Trait 1 : flotte au-dessus de la carte top-left ── */}
      <motion.line
        x1="48" y1="36" x2="180" y2="36"
        stroke="#F39200"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
      />
      {/* Petit tiret diagonal qui amorce la diagonale */}
      <motion.line
        x1="180" y1="36" x2="208" y2="20"
        stroke="#F39200"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
        transition={{ duration: 0.4, delay: 0.65, ease: "easeOut" }}
      />

      {/* ── Diagonale fine qui relie la zone haute-gauche à la zone basse-droite ── */}
      <motion.line
        x1="220" y1="56" x2="780" y2="380"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1"
        strokeDasharray="2 6"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.7, ease: "easeInOut" }}
      />

      {/* ── Trait 2 : flotte au-dessus de la carte bottom-right ── */}
      {/* Petit tiret diagonal d'amorce */}
      <motion.line
        x1="792" y1="380" x2="820" y2="364"
        stroke="#F39200"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
        transition={{ duration: 0.4, delay: 0.95, ease: "easeOut" }}
      />
      <motion.line
        x1="820" y1="380" x2="952" y2="380"
        stroke="#F39200"
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   DiagonalCard — carte éditoriale
   Position : topLeft (tilt -1.5°) ou bottomRight (tilt +1.5°)
   Peel animation : lift → résistance → tear-off
══════════════════════════════════════════════════════════════ */
type CardPosition = "topLeft" | "bottomRight";

function DiagonalCard({
  article,
  position,
}: {
  article: Article;
  position: CardPosition;
}) {
  const accent = catColor(article.category);
  const isTL = position === "topLeft";

  /* Stagger : top-left part en premier, bottom-right en second */
  const enterDelay = isTL ? 0 : 0.18;
  const exitDelay = isTL ? 0.12 : 0; /* sortie inversée : bottom-right décolle en premier */

  return (
    <motion.article
      className="absolute"
      style={{
        // Positionnement diagonal
        top: isTL ? "10%" : "auto",
        left: isTL ? "4%" : "auto",
        bottom: isTL ? "auto" : "10%",
        right: isTL ? "auto" : "4%",
        width: "44%",
        maxWidth: 540,
        // Tilt subtil
        transformOrigin: isTL ? "top left" : "bottom right",
        transformStyle: "preserve-3d",
        zIndex: 5,
      }}
      // ── ENTRÉE : snap-stick (la nouvelle carte se colle vivement) ──
      initial={{
        opacity: 0,
        rotateX: isTL ? 75 : -75,
        rotateZ: isTL ? -8 : 8,
        y: isTL ? -40 : 40,
        scale: 0.88,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        rotateX: 0,
        rotateZ: isTL ? -1.5 : 1.5, /* tilt final éditorial */
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          delay: enterDelay,
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
        },
      }}
      // ── SORTIE : peel avec résistance puis tear-off ──
      // Keyframes : lift → small snap-back → tear away
      exit={{
        rotateX: isTL ? [0, -12, -6, -18, -110] : [0, 12, 6, 18, 110],
        rotateZ: isTL ? [-1.5, -4, -2, -5, 4] : [1.5, 4, 2, 5, -4],
        y: [0, -10, -4, -16, isTL ? -220 : 220],
        x: [0, isTL ? -4 : 4, 0, isTL ? -8 : 8, isTL ? -60 : 60],
        scale: [1, 0.99, 1, 0.97, 0.75],
        opacity: [1, 1, 1, 1, 0],
        filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(2px)", "blur(14px)"],
        transition: {
          delay: exitDelay,
          duration: 1.05,
          times: [0, 0.18, 0.32, 0.55, 1],
          ease: "easeIn",
        },
      }}
    >
      <a
        href={`/actualites/${article.slug}`}
        className="group relative block overflow-hidden rounded-[14px] bg-[#FBF7EE] p-7 transition-shadow duration-300 xl:p-8"
        style={{
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.32), 0 6px 18px rgba(0,0,0,0.20), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
        aria-label={`Lire : ${article.title}`}
      >
        {/* ── Filet d'accent vertical à gauche ── */}
        <div
          aria-hidden
          className="absolute left-0 top-5 h-12 w-[3px] rounded-r"
          style={{ backgroundColor: accent }}
        />

        {/* ── Méta — catégorie + date ── */}
        <div className="mb-3.5 flex items-center gap-2.5">
          <span
            className="text-[0.6875rem] font-bold uppercase tracking-[0.20em]"
            style={{
              color: accent,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            {article.category}
          </span>
          <span className="text-neutral-300">·</span>
          <span
            className="text-[0.6875rem] font-medium text-neutral-500"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {article.date}
          </span>
        </div>

        {/* ── Titre éditorial ── */}
        <h3
          className="text-balance text-[1.25rem] font-bold leading-[1.2] tracking-tight text-[#0D1A4A] transition-colors duration-300 group-hover:text-[#1E2F8A] xl:text-[1.4375rem]"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {article.title}
        </h3>

        {/* ── Excerpt ── */}
        <p className="mt-3 line-clamp-3 text-pretty text-[0.875rem] leading-[1.62] text-neutral-600 xl:text-[0.9375rem]">
          {article.excerpt}
        </p>

        {/* ── Pied : CTA + readtime ── */}
        <div className="mt-5 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold tracking-wide text-[#1E2F8A]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Lire l&apos;article
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          <span
            className="text-[0.6875rem] tabular-nums text-neutral-400"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {article.readTime} de lecture
          </span>
        </div>
      </a>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════════════
   MobileStage — pile verticale, 2 cartes empilées en diagonale
   Même peel animation, fond sombre visible aux jonctions
══════════════════════════════════════════════════════════════ */
function MobileStage({
  chunkIdx,
  articles,
  inView,
}: {
  chunkIdx: number;
  articles: Article[];
  inView: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[20px] p-5"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 40% 20%, #142066 0%, #0A1340 70%, #06092A 100%)",
        perspective: 1400,
        boxShadow:
          "0 28px 64px rgba(8,12,40,0.30), 0 8px 20px rgba(8,12,40,0.16)",
      }}
    >
      {/* Watermark filigrane top-right mobile */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 z-[1]"
      >
        <Image
          src="/logo-groupe.png"
          alt=""
          width={110}
          height={46}
          unoptimized
          className="h-[36px] w-auto"
          style={{
            filter: "brightness(0) invert(1)",
            opacity: 0.085,
          }}
        />
      </div>

      {/*
        Grid trick — empêche l'effondrement de la hauteur pendant les transitions.
        Avec mode="sync", l'ancien et le nouveau motion.div coexistent dans la
        même cellule de la grille CSS (col-start-1 row-start-1). La hauteur de
        la cellule = max(hauteur sortante, hauteur entrante) → jamais de saut.
        Le crossfade opacity évite le double-affichage visible.
      */}
      <div className="grid">
        <AnimatePresence mode="sync">
          <motion.div
            key={`mobile-${chunkIdx}`}
            className="col-start-1 row-start-1 relative z-[5] flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {articles.map((art, i) => (
              <MobileCard
                key={`${chunkIdx}-${art.slug}`}
                article={art}
                position={i}
                inView={inView}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileCard({
  article,
  position,
  inView,
}: {
  article: Article;
  position: number;
  inView: boolean;
}) {
  const accent = catColor(article.category);
  const isTop = position === 0;
  const enterDelay = position * 0.14;
  const exitDelay = (1 - position) * 0.12;

  return (
    <motion.article
      className="relative overflow-hidden rounded-[14px] bg-[#FBF7EE]"
      style={{
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.30), 0 4px 12px rgba(0,0,0,0.18)",
        transformOrigin: isTop ? "top left" : "bottom right",
      }}
      initial={{
        opacity: 0,
        rotateX: isTop ? 70 : -70,
        rotateZ: isTop ? -6 : 6,
        y: isTop ? -20 : 20,
        scale: 0.92,
        filter: "blur(6px)",
      }}
      animate={
        inView
          ? {
              opacity: 1,
              rotateX: 0,
              rotateZ: isTop ? -1.7 : 1.7,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                delay: enterDelay,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              },
            }
          : {}
      }
      exit={{
        rotateX: isTop ? [0, -10, -5, -16, -100] : [0, 10, 5, 16, 100],
        rotateZ: isTop ? [-1.7, -4.2, -1.4, -5.2, 4.8] : [1.7, 4.2, 1.4, 5.2, -4.8],
        y: [0, -8, -3, -12, isTop ? -120 : 120],
        scale: [1, 0.99, 1, 0.97, 0.78],
        opacity: [1, 1, 1, 1, 0],
        filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(1px)", "blur(10px)"],
        transition: {
          delay: exitDelay,
          duration: 0.95,
          times: [0, 0.18, 0.32, 0.55, 1],
          ease: "easeIn",
        },
      }}
    >
      <a
        href={`/actualites/${article.slug}`}
        className="block p-5"
        aria-label={`Lire : ${article.title}`}
      >
        {/* Filet d'accent gauche */}
        <div
          aria-hidden
          className="absolute left-0 top-4 h-10 w-[3px] rounded-r"
          style={{ backgroundColor: accent }}
        />

        <div className="mb-2.5 flex items-center gap-2">
          <span
            className="text-[0.6875rem] font-bold uppercase tracking-[0.18em]"
            style={{
              color: accent,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            {article.category}
          </span>
          <span className="text-neutral-300">·</span>
          <span
            className="text-[0.6875rem] font-medium text-neutral-500"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {article.date}
          </span>
        </div>

        <h3
          className="text-balance text-[1.0625rem] font-bold leading-[1.22] tracking-tight text-[#0D1A4A]"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {article.title}
        </h3>

        <p className="mt-2.5 line-clamp-3 text-pretty text-[0.8125rem] leading-[1.55] text-neutral-600">
          {article.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#1E2F8A]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Lire l&apos;article
            <ArrowUpRight size={13} />
          </span>
          <span
            className="text-[0.6875rem] tabular-nums text-neutral-400"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {article.readTime}
          </span>
        </div>
      </a>
    </motion.article>
  );
}
