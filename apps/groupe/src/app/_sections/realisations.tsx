"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { MapPin } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   Données — 11 réalisations SICA
══════════════════════════════════════════════════════════════ */

interface Projet {
  slug: string;
  nom: string;
  lieu: string;
  annee: string;
  mission: string;
  description: string;
  statut: "Livré" | "En cours" | "Étude";
  imgs: readonly [string, string, string];
}

const PROJETS: readonly Projet[] = [
  {
    slug: "sgci-plateau",
    nom: "Siège SGCI",
    lieu: "Plateau, Abidjan",
    annee: "2024",
    mission: "Construction · Géobéton",
    description:
      "Des murs à la hauteur d'une institution. Le Géobéton SICA — briques de terre comprimée haute densité — pour un bâtiment qui affiche son identité jusque dans sa propre matière.",
    statut: "Livré",
    imgs: ["/projets/sgci-01.jpg", "/projets/sgci-02.jpg", "/projets/sgci-03.jpg"],
  },
  {
    slug: "dabre",
    nom: "Villa DABRÉ",
    lieu: "Abidjan",
    annee: "2024",
    mission: "Mission complète",
    description:
      "380 m² pensés de fond en comble, sur sous-sol technique et fondations profondes. Une famille installée, une mission accomplie — sans rien laisser au hasard.",
    statut: "Livré",
    imgs: ["/projets/dabre-01.jpg", "/projets/dabre-02.jpg", "/projets/dabre-03.jpg"],
  },
  {
    slug: "villa-duplex-jacqueville",
    nom: "Villa Duplex",
    lieu: "Jacqueville",
    annee: "2023",
    mission: "Conception + Réalisation",
    description:
      "Face à la lagune de Jacqueville. Volumes épurés, terrasses étagées, piscine intégrée — de la conception à la remise des clés, SICA de bout en bout.",
    statut: "Livré",
    imgs: ["/projets/villa-duplex-01.jpg", "/projets/villa-duplex-02.jpg", "/projets/villa-duplex-03.jpg"],
  },
  {
    slug: "y4-cocody",
    nom: "Y4 Cocody",
    lieu: "Cocody Y4, Abidjan",
    annee: "2025",
    mission: "Géotechnique + Construction",
    description:
      "Un terrain délicat dans un quartier exigeant. Fondations spéciales, structure béton armé sur mesure, suivi de chantier rigoureux. Ce projet avance — et il tiendra.",
    statut: "En cours",
    imgs: ["/projets/y4-cocody-01.jpg", "/projets/y4-cocody-02.jpg", "/projets/y4-cocody-03.jpg"],
  },
  {
    slug: "guessiguie-agboville",
    nom: "Maison GUESSIGUIÉ",
    lieu: "Agboville",
    annee: "2024",
    mission: "Construction",
    description:
      "Briques de terre cuite apparentes, chaînages béton armé, mise en œuvre soignée. Une maison ancrée dans son terroir, construite pour les générations qui suivent.",
    statut: "Livré",
    imgs: ["/projets/guessiguie-01.jpg", "/projets/guessiguie-02.jpg", "/projets/guessiguie-03.jpg"],
  },
  {
    slug: "avagout-jacqueville",
    nom: "Villa AVAGOUT",
    lieu: "Jacqueville",
    annee: "2023",
    mission: "Construction",
    description:
      "Sur cette plage de Jacqueville, là où l'Atlantique rencontre le béton brut. Façades nues, bois exotique, toiture acier — une résidence qui assume pleinement ses matériaux.",
    statut: "Livré",
    imgs: ["/projets/avagout-01.jpg", "/projets/avagout-02.jpg", "/projets/avagout-03.jpg"],
  },
  {
    slug: "cocody-extension",
    nom: "Extension Cocody",
    lieu: "Cocody, Abidjan",
    annee: "2024",
    mission: "Études + Réalisation",
    description:
      "Reprendre une maison existante, lui ajouter un étage, l'étancher de bas en haut. Une intervention précise, sur mesure — sans démolir ce qui fonctionnait déjà.",
    statut: "Livré",
    imgs: ["/projets/cocody-extension-01.jpg", "/projets/cocody-extension-02.jpg", "/projets/cocody-extension-03.jpg"],
  },
  {
    slug: "ocalm-km53",
    nom: "O'CALM km 53",
    lieu: "km 53, Abidjan",
    annee: "2024",
    mission: "Construction résidentielle",
    description:
      "Un programme livré par tranches, en bordure d'autoroute. Chaque villa sortie de terre selon le calendrier prévu. C'est ça, l'organisation SICA.",
    statut: "Livré",
    imgs: ["/projets/ocalm-01.jpg", "/projets/ocalm-02.jpg", "/projets/ocalm-03.jpg"],
  },
  {
    slug: "songon",
    nom: "Villa SONGON",
    lieu: "Songon, Abidjan",
    annee: "2023",
    mission: "Conception + Réalisation",
    description:
      "De la parcelle vide à la réception sans réserves. Terrassement, fondations, structure, finitions — mission complète. SICA de A à Z, sans intermédiaire.",
    statut: "Livré",
    imgs: ["/projets/songon-01.jpg", "/projets/songon-02.jpg", "/projets/songon-03.jpg"],
  },
  {
    slug: "gbakayo-soubre",
    nom: "Chantier GBAKAYO",
    lieu: "Soubré",
    annee: "2025",
    mission: "Construction rurale",
    description:
      "En plein pays caféier, loin des circuits habituels. Équipes mobiles, matériaux transportés sur place, chantier autonome. La distance ne change pas notre niveau d'exigence.",
    statut: "En cours",
    imgs: ["/projets/gbakayo-01.jpg", "/projets/gbakayo-02.jpg", "/projets/gbakayo-03.jpg"],
  },
  {
    slug: "bingerville-r3",
    nom: "Étude R+3 Bingerville",
    lieu: "Bingerville",
    annee: "2024",
    mission: "Étude géotechnique",
    description:
      "Avant de bâtir, comprendre le sol. Sondages pressiométriques, essais SPT, dimensionnement des fondations. Le savoir-faire géotechnique SICA — avant la première pierre.",
    statut: "Étude",
    imgs: ["/projets/bingerville-01.jpg", "/projets/bingerville-02.jpg", "/projets/bingerville-03.jpg"],
  },
] satisfies Projet[];

const INTERVAL_MS = 7000;

/* ── Config statut ── */
function statutCfg(statut: Projet["statut"]): {
  color: string;
  bg: string;
  dot: string;
  label: string;
} {
  switch (statut) {
    case "Livré":
      return {
        color: "#0B6E45",
        bg: "rgba(11,110,69,0.10)",
        dot: "#1DB873",
        label: "Livré",
      };
    case "En cours":
      return {
        color: "#A85C00",
        bg: "rgba(168,92,0,0.10)",
        dot: "#F59E0B",
        label: "En cours",
      };
    case "Étude":
      return {
        color: "#1E2F8A",
        bg: "rgba(30,47,138,0.10)",
        dot: "#6B85F0",
        label: "Étude",
      };
  }
}

/* ══════════════════════════════════════════════════════════════
   Section principale
══════════════════════════════════════════════════════════════ */

export function Realisations() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-8%" });
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % PROJETS.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [inView]);

  const projet = PROJETS[idx];
  if (!projet) return null;

  return (
    <section
      ref={sectionRef}
      aria-label="Réalisations SICA Construction"
      className="relative overflow-hidden bg-[#F7F8FC] py-20 sm:py-28 lg:py-32"
    >
      {/* ── Gradient mesh décoratif — fond de la scène ──────────
          Ces blobs donnent de la profondeur et permettent au
          glassmorphisme de la carte info d'être clairement visible.
      ─────────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            /* Blob bleu — haut-droite */
            "radial-gradient(ellipse 65% 55% at 92% 8%, rgba(30,47,138,0.07) 0%, transparent 70%)",
            /* Blob bleu froid — milieu-droite (derrière la carte glass) */
            "radial-gradient(ellipse 55% 70% at 85% 55%, rgba(42,82,190,0.06) 0%, transparent 65%)",
            /* Blob ambre — bas-gauche */
            "radial-gradient(ellipse 60% 50% at 6% 92%, rgba(243,146,0,0.055) 0%, transparent 60%)",
            /* Légère lueur centrale */
            "radial-gradient(ellipse 80% 40% at 50% 102%, rgba(30,47,138,0.03) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Grain ultra-léger — texture artisanale */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='1'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">

        {/* ═══ EN-TÊTE ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-16 lg:mb-20"
        >
          <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[#1E2F8A]">
            Nos réalisations · 2020 — 2025
          </p>
          <h2 className="max-w-3xl text-balance text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0D1A4A] sm:text-[2.75rem] lg:text-[3.25rem]">
            Chaque chantier,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #1E2F8A 30%, #3B62F5 100%)",
              }}
            >
              une promesse tenue.
            </span>
          </h2>
          <p className="mt-5 max-w-[480px] text-pretty text-[0.9375rem] leading-relaxed text-neutral-500 sm:text-base">
            Villas contemporaines, sièges institutionnels, études géotechniques —
            de Jacqueville à Soubré, SICA laisse des traces qui durent.
          </p>
        </motion.div>

        {/* ═══ DIAPORAMA ═══ */}
        <AnimatePresence mode="wait">
          <ProjectShowcase
            key={`project-${idx}`}
            projet={projet}
            visible={inView}
          />
        </AnimatePresence>

        {/* ═══ BARRE DE PROGRESSION ═══ */}
        <ProgressBar key={`bar-${idx}`} durationMs={INTERVAL_MS} active={inView} />

        {/* ═══ INDICATEURS DE POSITION ═══ */}
        <div className="mt-5 flex items-center gap-2" aria-hidden>
          {PROJETS.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{ backgroundColor: "#1E2F8A", height: 3 }}
              animate={{
                width: i === idx ? 28 : 6,
                opacity: i === idx ? 1 : 0.15,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>

        {/* ═══ CTA ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-14"
        >
          <a
            href="/realisations"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:gap-4"
            style={{
              background: "linear-gradient(135deg, #1E2F8A 0%, #2A52C0 100%)",
              boxShadow:
                "0 4px 20px rgba(30,47,138,0.28), 0 1px 0 rgba(255,255,255,0.12) inset",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 32px rgba(30,47,138,0.40), 0 1px 0 rgba(255,255,255,0.14) inset";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 4px 20px rgba(30,47,138,0.28), 0 1px 0 rgba(255,255,255,0.12) inset";
            }}
          >
            {/* Shimmer au hover */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            Voir toutes nos réalisations
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   ProjectShowcase — images diagonales + carte glassmorphisme
══════════════════════════════════════════════════════════════ */

function ProjectShowcase({
  projet,
  visible,
}: {
  projet: Projet;
  visible: boolean;
}) {
  const img0 = projet.imgs[0];
  const img1 = projet.imgs[1];
  const img2 = projet.imgs[2];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">

      {/* ── IMAGES ── */}
      <div className="lg:col-span-8">

        {/* ── Mobile ── */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl"
            style={{
              boxShadow:
                "0 16px 48px rgba(13,26,74,0.14), 0 2px 8px rgba(13,26,74,0.07)",
            }}
          >
            <Image
              src={img0}
              alt={projet.nom}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>

          <div className="mt-2.5 grid grid-cols-2 gap-2.5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
              style={{ boxShadow: "0 8px 28px rgba(13,26,74,0.09)" }}
            >
              <Image
                src={img1}
                alt={`${projet.nom} — vue 2`}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] overflow-hidden rounded-xl"
              style={{ boxShadow: "0 8px 28px rgba(13,26,74,0.09)" }}
            >
              <Image
                src={img2}
                alt={`${projet.nom} — vue 3`}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* ── Desktop — composition diagonale ── */}
        <div
          className="relative hidden lg:block"
          style={{ height: 520 }}
        >
          {/* Image 1 — grande, gauche, décalée 28px vers le bas */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="absolute overflow-hidden rounded-2xl"
            style={{
              left: 0,
              top: 28,
              width: "61%",
              bottom: 0,
              boxShadow:
                "0 20px 56px rgba(13,26,74,0.16), 0 4px 16px rgba(13,26,74,0.08)",
            }}
          >
            <Image
              src={img0}
              alt={projet.nom}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
              priority
            />
            {/* Voile dégradé bas — profondeur douce */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl"
              style={{
                background:
                  "linear-gradient(to top, rgba(13,26,74,0.08), transparent)",
              }}
            />
          </motion.div>

          {/* Image 2 — haut-droite */}
          <motion.div
            initial={{ opacity: 0, x: 22, y: -16 }}
            animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 22, y: -16 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.58, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}
            className="absolute overflow-hidden rounded-xl"
            style={{
              right: 0,
              top: 0,
              width: "37%",
              height: "calc(50% - 6px)",
              boxShadow:
                "0 12px 36px rgba(13,26,74,0.13), 0 2px 8px rgba(13,26,74,0.06)",
            }}
          >
            <Image
              src={img1}
              alt={`${projet.nom} — vue 2`}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Image 3 — bas-droite */}
          <motion.div
            initial={{ opacity: 0, x: 22, y: 16 }}
            animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 22, y: 16 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.54, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="absolute overflow-hidden rounded-xl"
            style={{
              right: 0,
              bottom: 0,
              width: "37%",
              height: "calc(50% - 6px)",
              boxShadow:
                "0 12px 36px rgba(13,26,74,0.13), 0 2px 8px rgba(13,26,74,0.06)",
            }}
          >
            <Image
              src={img2}
              alt={`${projet.nom} — vue 3`}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* ── CARTE GLASSMORPHISME — infos projet ──────────────────
          Le backdrop-blur capte les blobs de gradient du fond de
          section, créant un effet verre givré lumineux.
      ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-4 lg:self-stretch"
      >
        {/* Carte glass */}
        <div
          className="flex h-full flex-col justify-center rounded-2xl p-6 sm:p-7 lg:rounded-3xl lg:p-8"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.68) 0%, rgba(245,248,255,0.55) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.52)",
            boxShadow: [
              "0 8px 40px rgba(30,47,138,0.07)",
              "0 1px 0 rgba(255,255,255,0.65) inset",
              "0 -1px 0 rgba(30,47,138,0.03) inset",
            ].join(", "),
          }}
        >
          <StatutBadge statut={projet.statut} />

          <h3 className="mt-4 text-[1.625rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[1.875rem] lg:text-[1.625rem] xl:text-[1.875rem]">
            {projet.nom}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.8125rem] text-neutral-400">
            <MapPin size={12} strokeWidth={1.75} className="shrink-0" />
            <span>{projet.lieu}</span>
            <span aria-hidden className="select-none text-neutral-300">·</span>
            <span>{projet.annee}</span>
          </div>

          <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-widest text-[#F39200]">
            {projet.mission}
          </p>

          {/* Séparateur glass */}
          <div
            className="my-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(30,47,138,0.12), rgba(30,47,138,0.04))",
            }}
          />

          <p className="text-pretty text-[0.9375rem] leading-[1.78] text-neutral-600">
            {projet.description}
          </p>

          {/* Micro-indicateur bas de carte */}
          <div className="mt-6 flex items-center gap-1.5">
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: "rgba(30,47,138,0.25)" }}
            />
            <span
              className="text-[0.625rem] font-medium uppercase tracking-widest"
              style={{ color: "rgba(30,47,138,0.40)" }}
            >
              Défilement automatique
            </span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Barre de progression — gradient bleu-cyan
══════════════════════════════════════════════════════════════ */

function ProgressBar({
  durationMs,
  active,
}: {
  durationMs: number;
  active: boolean;
}) {
  return (
    <div
      className="mt-10 h-[2px] w-full overflow-hidden rounded-full"
      style={{ backgroundColor: "rgba(30,47,138,0.07)" }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #1E2F8A 0%, #4A72F5 100%)",
        }}
        initial={{ width: "0%" }}
        animate={active ? { width: "100%" } : {}}
        transition={{ duration: durationMs / 1000, ease: "linear" }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Badge statut
══════════════════════════════════════════════════════════════ */

function StatutBadge({ statut }: { statut: Projet["statut"] }) {
  const cfg = statutCfg(statut);
  return (
    <span
      className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
      style={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.color}26`,
      }}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ backgroundColor: cfg.dot }}
      />
      {cfg.label}
    </span>
  );
}
