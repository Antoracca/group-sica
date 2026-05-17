"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, type MotionProps } from "motion/react";
import { CheckCircle2, Clock, FileSearch, MapPin } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   Données — 11 réalisations
══════════════════════════════════════════════════════════════ */

type Statut = "Livré" | "En cours" | "Étude";

interface Projet {
  slug: string;
  nom: string;
  lieu: string;
  annee: string;
  mission: string;
  description: string;
  statut: Statut;
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
      "Le siège de la SGCI au Plateau. Construit en Géobéton, notre matériau signature. Briques de terre comprimée à haute densité, finition apparente.",
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
      "Une villa de 380 m² avec sous-sol technique. Fondations profondes, structure béton armé, volumes ouverts sur jardin. Tout a été pensé jusqu'au dernier détail.",
    statut: "Livré",
    imgs: ["/projets/dabre-01.jpg", "/projets/dabre-02.jpg", "/projets/dabre-03.jpg"],
  },
  {
    slug: "villa-duplex-jacqueville",
    nom: "Villa Duplex",
    lieu: "Jacqueville",
    annee: "2023",
    mission: "Conception et réalisation",
    description:
      "Villa duplex face à la lagune de Jacqueville. Volumes purs, terrasses étagées, piscine intégrée. Du croquis à la peinture, mission complète par nos équipes.",
    statut: "Livré",
    imgs: ["/projets/villa-duplex-01.jpg", "/projets/villa-duplex-02.jpg", "/projets/villa-duplex-03.jpg"],
  },
  {
    slug: "y4-cocody",
    nom: "Y4 Cocody",
    lieu: "Cocody Y4, Abidjan",
    annee: "2025",
    mission: "Géotechnique et construction",
    description:
      "Programme résidentiel haut standing à Cocody Y4. Terrain délicat, fondations spéciales sur mesure, structure béton armé complexe. Suivi rigoureux par notre équipe dédiée.",
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
      "Maison en briques de terre cuite apparentes. Chaînages béton armé, mise en œuvre soignée. Une habitation ancrée dans son terroir, construite pour durer.",
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
      "Résidence sur la plage de Jacqueville. Façades brutes, bois exotique, toiture bac acier. L'authenticité tropicale, sans concession sur les matériaux.",
    statut: "Livré",
    imgs: ["/projets/avagout-01.jpg", "/projets/avagout-02.jpg", "/projets/avagout-03.jpg"],
  },
  {
    slug: "cocody-extension",
    nom: "Extension Cocody",
    lieu: "Cocody, Abidjan",
    annee: "2024",
    mission: "Études et réalisation",
    description:
      "Reprendre une maison existante et lui ajouter un étage entier. Fondations renforcées, étanchéité refaite. Intervention propre sur maison habitée pendant le chantier.",
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
      "Cité résidentielle en bordure d'autoroute. Livraison séquentielle par tranches, organisation de chantier maîtrisée. C'est ça l'organisation SICA.",
    statut: "Livré",
    imgs: ["/projets/ocalm-01.jpg", "/projets/ocalm-02.jpg", "/projets/ocalm-03.jpg"],
  },
  {
    slug: "songon",
    nom: "Villa SONGON",
    lieu: "Songon, Abidjan",
    annee: "2023",
    mission: "Conception et réalisation",
    description:
      "De la parcelle vide aux clés en main. Terrassement, fondations, structure, finitions complètes. Mission intégrale, sans sous-traitance, sans intermédiaire.",
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
      "Construction en zone caféière près de Soubré. Équipes mobiles, matériaux transportés sur place, chantier autonome. Notre exigence ne change pas avec la distance.",
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
      "Étude géotechnique préalable à un programme R+3. Sondages pressiométriques, essais SPT, dimensionnement précis des fondations. Tout est documenté dans le rapport.",
    statut: "Étude",
    imgs: ["/projets/bingerville-01.jpg", "/projets/bingerville-02.jpg", "/projets/bingerville-03.jpg"],
  },
] satisfies Projet[];

const INTERVAL_MS = 9000;
const FIRST_REVEAL_DURATION = 2400; // après ce délai, on bascule sur transitions naturelles

/* Phrase statut générée à partir du projet */
function buildStatusPhrase(p: Projet): string {
  switch (p.statut) {
    case "Livré":
      return `Chantier livré en ${p.annee}`;
    case "En cours":
      return `Chantier en cours · livraison prévue 2026`;
    case "Étude":
      return `Étude livrée en ${p.annee}`;
  }
}

function statutCfg(statut: Statut) {
  switch (statut) {
    case "Livré":
      return {
        Icon: CheckCircle2, color: "#0B6E45",
        bgSoft: "rgba(11,110,69,0.12)", ring: "rgba(11,110,69,0.28)",
        glow: "rgba(29,184,115,0.40)", label: "Livré",
      };
    case "En cours":
      return {
        Icon: Clock, color: "#A85C00",
        bgSoft: "rgba(168,92,0,0.12)", ring: "rgba(168,92,0,0.28)",
        glow: "rgba(245,158,11,0.40)", label: "En cours",
      };
    case "Étude":
      return {
        Icon: FileSearch, color: "#1E2F8A",
        bgSoft: "rgba(30,47,138,0.12)", ring: "rgba(30,47,138,0.28)",
        glow: "rgba(107,133,240,0.40)", label: "Étude",
      };
  }
}

/* ══════════════════════════════════════════════════════════════
   SECTION PRINCIPALE
══════════════════════════════════════════════════════════════ */

export function Realisations() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -10% 0px",
  });
  const [idx, setIdx] = React.useState(0);
  const [imagesReady, setImagesReady] = React.useState(false);
  const [isFirstReveal, setIsFirstReveal] = React.useState(true);

  /* Préchargement raw — onload counter */
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let loaded = 0;
    const total = PROJETS.reduce((acc, p) => acc + p.imgs.length, 0);
    PROJETS.forEach((p) =>
      p.imgs.forEach((src) => {
        const img = new window.Image();
        img.onload = () => {
          loaded++;
          if (loaded >= total) setImagesReady(true);
        };
        img.onerror = () => {
          loaded++;
          if (loaded >= total) setImagesReady(true);
        };
        img.src = src;
      }),
    );
    const fallback = setTimeout(() => setImagesReady(true), 2500);
    return () => clearTimeout(fallback);
  }, []);

  /* Bascule de la 1ère apparition (slow-mo + tremblement)
     vers les transitions naturelles, après FIRST_REVEAL_DURATION */
  React.useEffect(() => {
    if (!inView || !imagesReady) return;
    const t = setTimeout(() => setIsFirstReveal(false), FIRST_REVEAL_DURATION);
    return () => clearTimeout(t);
  }, [inView, imagesReady]);

  /* Rotation auto démarre après la 1ère apparition */
  React.useEffect(() => {
    if (isFirstReveal || !inView || !imagesReady) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % PROJETS.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [isFirstReveal, inView, imagesReady]);

  const projet = PROJETS[idx];
  if (!projet) return null;
  const showcaseActive = inView && imagesReady;

  return (
    <section
      ref={sectionRef}
      aria-label="Réalisations SICA Construction"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32"
      style={{ backgroundColor: "#F7F8FC" }}
    >
      {/* ═══════════════════════════════════════════════════════
          BACKGROUND DIAGONAL — Innovant CSS pur, zéro asset
          Triangle haut-gauche  : pattern blueprint architectural
          Triangle bas-droite   : gradient bleu froid
          Ligne diagonale fine  : sépare les deux mondes
      ═══════════════════════════════════════════════════════ */}

      {/* Triangle bas-droite : gradient bleu froid + warm cream */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          background:
            "linear-gradient(135deg, rgba(232,238,250,0.55) 0%, rgba(218,228,248,0.85) 100%)",
        }}
      />

      {/* Triangle haut-gauche : motif blueprint en SVG inline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          backgroundColor: "rgba(255,253,248,0.4)",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44'><g stroke='%231E2F8A' stroke-width='0.5' fill='none' opacity='0.085'><path d='M44 0H0V44'/><circle cx='0' cy='0' r='1.5' fill='%231E2F8A' opacity='0.4'/><circle cx='44' cy='44' r='1.5' fill='%231E2F8A' opacity='0.4'/></g></svg>\")",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Trait diagonal fin — sépare les 2 zones */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line
          x1="100" y1="0" x2="0" y2="100"
          stroke="#1E2F8A" strokeWidth="0.08" opacity="0.22"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Halos d'ambiance */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 60% 50% at 92% 8%, rgba(30,47,138,0.06) 0%, transparent 70%)",
            "radial-gradient(ellipse 55% 45% at 6% 92%, rgba(243,146,0,0.055) 0%, transparent 65%)",
          ].join(", "),
        }}
      />

      {/* Grain fin */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "180px 180px",
        }}
      />

      {/* ═══ CONTENU ═══ */}
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">

        {/* ── EN-TÊTE — 1ère apparition : slow-mo from right + tremor ── */}
        <motion.div
          initial={{ opacity: 0, x: 280 }}
          animate={
            inView
              ? { opacity: 1, x: [280, 0, -8, 5, -3, 2, 0] }
              : {}
          }
          transition={{
            duration: 1.4,
            times: [0, 0.65, 0.75, 0.83, 0.89, 0.95, 1],
            ease: "easeOut",
          }}
          className="mb-14 sm:mb-16 lg:mb-20"
        >
          <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[#1E2F8A]">
            Voici ce que nous construisons.
          </p>
          <h2 className="max-w-3xl text-balance text-[2rem] font-bold leading-[1.08] tracking-tight text-[#0D1A4A] sm:text-[2.75rem] lg:text-[3.25rem]">
            Chaque chantier,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(120deg, #1E2F8A 30%, #3B62F5 100%)",
              }}
            >
              une promesse tenue.
            </span>
          </h2>
          <p className="mt-5 max-w-[480px] text-pretty text-[0.9375rem] leading-relaxed text-neutral-500 sm:text-base">
            Onze projets récents en Côte d'Ivoire. Villas, sièges institutionnels,
            études techniques. Voici comment SICA travaille.
          </p>
        </motion.div>

        {/* ── DIAPORAMA ── */}
        <AnimatePresence mode="wait">
          <ProjectShowcase
            key={`project-${idx}`}
            projet={projet}
            slideIdx={idx}
            totalProjects={PROJETS.length}
            visible={showcaseActive}
            isFirstReveal={isFirstReveal}
          />
        </AnimatePresence>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-16 lg:mt-20"
        >
          <a
            href="/realisations"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:gap-4"
            style={{
              background: "linear-gradient(135deg, #1E2F8A 0%, #2A52C0 100%)",
              boxShadow: "0 4px 20px rgba(30,47,138,0.28), 0 1px 0 rgba(255,255,255,0.12) inset",
            }}
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            Voir toutes nos réalisations
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="relative transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   ProjectShowcase — Mosaïque connectée + animations adaptatives
══════════════════════════════════════════════════════════════ */

function ProjectShowcase({
  projet, slideIdx, totalProjects, visible, isFirstReveal,
}: {
  projet: Projet;
  slideIdx: number;
  totalProjects: number;
  visible: boolean;
  isFirstReveal: boolean;
}) {
  const img0 = projet.imgs[0];
  const img1 = projet.imgs[1];
  const img2 = projet.imgs[2];
  const cfg = statutCfg(projet.statut);
  const statusPhrase = buildStatusPhrase(projet);

  /* ── ANIMATIONS DIFFÉRENCIÉES ──
     1ère apparition : slow-mo depuis la droite + tremblement final
     Suivantes        : converge depuis positions éclatées (mosaïque) */

  /** 1ère apparition : x: 280 → 0 avec tremor */
  const firstReveal = (delay: number, startX = 280): MotionProps => ({
    initial: { opacity: 0, x: startX },
    animate: visible
      ? { opacity: 1, x: [startX, 30, -7, 5, -3, 2, 0] }
      : {},
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
    transition: {
      duration: 1.5,
      times: [0, 0.6, 0.74, 0.83, 0.9, 0.96, 1],
      delay,
      ease: "easeOut",
    },
  });

  /** Transitions suivantes : converge depuis position éclatée */
  const explode = (
    from: { x: number; y: number; rotate: number },
    exitTo: { x: number; y: number; rotate: number },
    delay: number,
  ): MotionProps => ({
    initial: { opacity: 0, ...from, scale: 0.92 },
    animate: visible
      ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
      : {},
    exit: { opacity: 0, ...exitTo, scale: 0.94, transition: { duration: 0.3 } },
    transition: { type: "spring", stiffness: 180, damping: 22, mass: 0.9, delay },
  });

  /* Style commun conteneurs image — fond bleu très clair pour éviter
     le flash blanc même si l'image n'est pas encore en cache */
  const imgBg = { backgroundColor: "#E8EDF7" };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">

      {/* ════════════════════════════════════════════════════════
          IMAGES MOSAÏQUE — collées, zéro gap
          Composition : 1 grande à gauche + 2 stack droite
          Total largeur 100%, total hauteur 100% droite
      ════════════════════════════════════════════════════════ */}
      <div className="lg:col-span-7">

        {/* ── Mobile : mosaïque seamless — hero + 2 soudées ── */}
        <div className="relative overflow-hidden rounded-2xl lg:hidden"
          style={{ boxShadow: "0 20px 56px rgba(13,26,74,0.18), 0 4px 16px rgba(13,26,74,0.08)" }}>

          {/* Image principale */}
          <motion.div
            {...(isFirstReveal
              ? firstReveal(0)
              : explode({ x: -60, y: 30, rotate: -4 }, { x: -80, y: 0, rotate: -6 }, 0))}
            className="relative aspect-[16/10] w-full overflow-hidden"
            style={imgBg}
          >
            <Image src={img0} alt={projet.nom} fill sizes="100vw" className="object-cover" priority unoptimized />
            {/* Fondu bas pour souder avec les 2 images du bas */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
              style={{ background: "linear-gradient(to top, rgba(8,14,50,0.40), transparent)" }} />
          </motion.div>

          {/* 2 images du bas — gap-0 explicite */}
          <div className="grid grid-cols-2 gap-0">
            <motion.div
              {...(isFirstReveal
                ? firstReveal(0.12)
                : explode({ x: -40, y: 30, rotate: -4 }, { x: -60, y: 20, rotate: -4 }, 0.08))}
              className="relative aspect-[4/3] overflow-hidden"
              style={imgBg}
            >
              <Image src={img1} alt={`${projet.nom} vue 2`} fill sizes="50vw" className="object-cover" unoptimized />
              {/* Fondu haut (soude avec img0) */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-8"
                style={{ background: "linear-gradient(to bottom, rgba(8,14,50,0.38), transparent)" }} />
              {/* Fondu droite (soude avec img2) */}
              <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-6"
                style={{ background: "linear-gradient(to right, transparent, rgba(8,14,50,0.35))" }} />
            </motion.div>

            <motion.div
              {...(isFirstReveal
                ? firstReveal(0.24)
                : explode({ x: 40, y: 30, rotate: 4 }, { x: 60, y: 20, rotate: 4 }, 0.16))}
              className="relative aspect-[4/3] overflow-hidden"
              style={imgBg}
            >
              <Image src={img2} alt={`${projet.nom} vue 3`} fill sizes="50vw" className="object-cover" unoptimized />
              {/* Fondu haut */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-8"
                style={{ background: "linear-gradient(to bottom, rgba(8,14,50,0.38), transparent)" }} />
              {/* Fondu gauche */}
              <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-6"
                style={{ background: "linear-gradient(to left, transparent, rgba(8,14,50,0.35))" }} />
            </motion.div>
          </div>

          {/* Vignette globale mobile */}
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 95% 90% at 50% 50%, transparent 50%, rgba(8,14,50,0.22) 100%)" }} />

          {/* Compteur + watermark mobile */}
          <div aria-hidden className="pointer-events-none absolute left-3 top-3 z-20 flex items-baseline gap-1">
            <span className="font-mono text-[1.25rem] font-bold leading-none text-white/85"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              {String(slideIdx + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[0.6rem] text-white/35">/{String(totalProjects).padStart(2, "0")}</span>
          </div>
          <div aria-hidden className="pointer-events-none absolute bottom-3 right-3 z-20">
            <Image src="/logo-groupe.png" alt="SICA" width={90} height={38} unoptimized
              className="h-[34px] w-auto opacity-[0.22]"
              style={{ filter: "brightness(0) invert(1)" }} />
          </div>

          {/* Barre de progression mobile */}
          <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 z-20 h-[3px]"
            style={{ background: "rgba(255,255,255,0.10)" }}>
            <motion.div className="h-full"
              style={{ background: "linear-gradient(90deg, #F39200, #FFB84D)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${((slideIdx + 1) / totalProjects) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* ── Desktop : mosaïque seamless — ZÉRO coupure, zéro espace ── */}
        <div
          className="relative hidden overflow-hidden rounded-2xl lg:block"
          style={{
            height: 540,
            boxShadow: "0 28px 72px rgba(13,26,74,0.22), 0 6px 24px rgba(13,26,74,0.10)",
          }}
        >
          {/* Image 1 — gauche, pleine hauteur, 62% */}
          <motion.div
            {...(isFirstReveal
              ? firstReveal(0, 300)
              : explode({ x: -80, y: 30, rotate: -6 }, { x: -100, y: 0, rotate: -8 }, 0))}
            className="absolute overflow-hidden"
            style={{ left: 0, top: 0, width: "62%", bottom: 0, ...imgBg }}
          >
            {/* Ken Burns subtil */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.04] }}
              transition={{ duration: INTERVAL_MS / 1000, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            >
              <Image src={img0} alt={projet.nom} fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" priority unoptimized />
            </motion.div>
            {/* Fondu droit pour fusionner avec img1/2 */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16"
              style={{ background: "linear-gradient(to right, transparent, rgba(10,18,60,0.45))" }} />
            {/* Fondu bas */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{ background: "linear-gradient(to top, rgba(10,18,60,0.22), transparent)" }} />
          </motion.div>

          {/* Image 2 — haut-droite, 38% × 50% */}
          <motion.div
            {...(isFirstReveal
              ? firstReveal(0.12, 300)
              : explode({ x: 70, y: -40, rotate: 8 }, { x: 90, y: -30, rotate: 8 }, 0.08))}
            className="absolute overflow-hidden"
            style={{ right: 0, top: 0, width: "38%", height: "50%", ...imgBg }}
          >
            <Image src={img1} alt={`${projet.nom} vue 2`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" unoptimized />
            {/* Fondu gauche (fusionne avec img0) */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-10"
              style={{ background: "linear-gradient(to left, transparent, rgba(10,18,60,0.38))" }} />
            {/* Fondu bas (fusionne avec img2) */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-8"
              style={{ background: "linear-gradient(to top, rgba(10,18,60,0.35), transparent)" }} />
          </motion.div>

          {/* Image 3 — bas-droite, 38% × 50% */}
          <motion.div
            {...(isFirstReveal
              ? firstReveal(0.24, 300)
              : explode({ x: 70, y: 40, rotate: -8 }, { x: 90, y: 30, rotate: -8 }, 0.16))}
            className="absolute overflow-hidden"
            style={{ right: 0, bottom: 0, width: "38%", height: "50%", ...imgBg }}
          >
            <Image src={img2} alt={`${projet.nom} vue 3`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" unoptimized />
            {/* Fondu gauche */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-10"
              style={{ background: "linear-gradient(to left, transparent, rgba(10,18,60,0.38))" }} />
            {/* Fondu haut (fusionne avec img1) */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-8"
              style={{ background: "linear-gradient(to bottom, rgba(10,18,60,0.35), transparent)" }} />
          </motion.div>

          {/* ── Vignette globale — unifie les 3 images en un seul bloc ── */}
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(8,14,50,0.28) 100%)",
                "linear-gradient(to bottom, rgba(8,14,50,0.10) 0%, transparent 15%, transparent 85%, rgba(8,14,50,0.16) 100%)",
              ].join(", "),
            }}
          />

          {/* ── Grain fin — texture photographique ── */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundSize: "120px 120px",
              mixBlendMode: "overlay",
            }}
          />

          {/* ── Compteur projet — top-left, style éditorial ── */}
          <div aria-hidden className="pointer-events-none absolute left-5 top-5 z-20 flex items-baseline gap-1.5">
            <span className="font-mono text-[2rem] font-bold leading-none text-white/90"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
              {String(slideIdx + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[0.75rem] font-medium text-white/40">/</span>
            <span className="font-mono text-[0.75rem] font-medium text-white/40"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
              {String(totalProjects).padStart(2, "0")}
            </span>
          </div>

          {/* ── Watermark SICA — ×3, semi-transparent, bas-droit ── */}
          <div aria-hidden className="pointer-events-none absolute bottom-5 right-5 z-20">
            <Image
              src="/logo-groupe.png"
              alt="SICA"
              width={130}
              height={55}
              unoptimized
              className="h-[48px] w-auto opacity-[0.22]"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* ── Barre de progression — bottom, fine, animée ── */}
          <div aria-hidden className="pointer-events-none absolute bottom-0 inset-x-0 z-20 h-[3px]"
            style={{ background: "rgba(255,255,255,0.10)" }}>
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, #F39200, #FFB84D)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${((slideIdx + 1) / totalProjects) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* ── Pastilles projet — rangée discrète top-right ── */}
          <div aria-hidden className="pointer-events-none absolute right-5 top-5 z-20 flex items-center gap-1">
            {Array.from({ length: totalProjects }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === slideIdx ? 16 : 5,
                  height: 5,
                  backgroundColor: i === slideIdx
                    ? "#F39200"
                    : "rgba(255,255,255,0.28)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          COLONNE DROITE — TEXTE STATIQUE (plus de typewriter)
      ════════════════════════════════════════════════════════ */}
      <motion.div
        {...(isFirstReveal
          ? firstReveal(0.35, 200)
          : ({
              initial: { opacity: 0, x: 30 },
              animate: visible ? { opacity: 1, x: 0 } : {},
              exit: { opacity: 0, transition: { duration: 0.25 } },
              transition: { duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const },
            } satisfies MotionProps))}
        className="flex flex-col justify-center lg:col-span-5"
      >
        {/* ── Badge statut chip (icône + label) ── */}
        <div
          className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
          style={{
            backgroundColor: cfg.bgSoft,
            color: cfg.color,
            boxShadow: `0 0 0 1px ${cfg.ring}, 0 0 18px ${cfg.glow}`,
          }}
        >
          <cfg.Icon size={14} strokeWidth={2.2} />
          <span className="uppercase tracking-wider">{cfg.label}</span>
        </div>

        {/* ── Phrase statut SOULIGNÉE + watermark SICA ──
            Format : "Chantier livré en 2024 [logo SICA]" */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span
            className="text-[0.875rem] font-semibold leading-snug"
            style={{
              color: cfg.color,
              borderBottom: `1.5px solid ${cfg.color}`,
              paddingBottom: 2,
            }}
          >
            {statusPhrase}
          </span>
          <Image
            src="/logo-groupe.png"
            alt="SICA"
            width={126}
            height={54}
            unoptimized
            className="h-[54px] w-auto opacity-55"
          />
        </div>

        {/* ── Nom du projet (STATIQUE) ── */}
        <h3 className="mt-6 text-[1.75rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[2rem] lg:text-[1.875rem] xl:text-[2.125rem]">
          {projet.nom}
        </h3>

        {/* ── Lieu, mission ── */}
        <div className="mt-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.8125rem] text-neutral-500">
            <MapPin size={13} strokeWidth={1.75} className="shrink-0" />
            <span>{projet.lieu}</span>
          </div>
          <p className="mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]" style={{ color: "#F39200" }}>
            {projet.mission}
          </p>
        </div>

        {/* ── Filet décoratif ── */}
        <div
          className="mt-6 h-px w-12"
          style={{ background: "linear-gradient(90deg, #1E2F8A, rgba(30,47,138,0))" }}
        />

        {/* ── Description (STATIQUE) ── */}
        <p className="mt-5 text-pretty text-[0.9375rem] leading-[1.78] text-neutral-700">
          {projet.description}
        </p>
      </motion.div>

    </div>
  );
}
