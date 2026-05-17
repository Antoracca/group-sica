"use client";

import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useInView } from "motion/react";
import { links } from "@/lib/links";
import {
  DraftingCompass,
  Building2,
  Layers,
  Wrench,
  FileSignature,
  Calculator,
  TrendingUp,
  Users,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Fonts
───────────────────────────────────────────────────────────── */
const FONTS_CSS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Barlow+Condensed:wght@400;500;600;700&display=swap');`;

/* ─────────────────────────────────────────────────────────────
   Lottie — chargé uniquement côté client (canvas API)
   Construction Animation.lottie → pôle Construction (fond sombre)
   Costumer Support.lottie       → pôle Assistance (fond clair)
───────────────────────────────────────────────────────────── */
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((m) => m.DotLottieReact),
  { ssr: false, loading: () => null }
);

/* ─────────────────────────────────────────────────────────────
   Services data — icônes Lucide, aucun emoji
───────────────────────────────────────────────────────────── */
const CONSTRUCTION = [
  { Icon: DraftingCompass, text: "Études architecturales & techniques" },
  { Icon: Building2, text: "Villas & immeubles résidentiels" },
  { Icon: Layers,    text: "Géobéton — matériau signature SICA" },
  { Icon: Wrench,    text: "Plomberie · Électricité · VRD" },
];

const ASSISTANCE = [
  { Icon: FileSignature, text: "Création & modification d'entreprises" },
  { Icon: Calculator,  text: "Comptabilité & déclarations fiscales" },
  { Icon: TrendingUp,  text: "Conseil en gestion de PME" },
  { Icon: Users,       text: "Accompagnement porteurs de projets" },
];

/* ─────────────────────────────────────────────────────────────
   AnimatedServices — typewriter séquentiel + icônes Lucide
───────────────────────────────────────────────────────────── */
function AnimatedServices({
  services,
  startDelay,
  inView,
  onAllComplete,
  light = false,
}: {
  services: { Icon: React.ElementType; text: string }[];
  startDelay: number;
  inView: boolean;
  onAllComplete: () => void;
  light?: boolean;
}) {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);
  const [texts, setTexts]         = React.useState<string[]>(services.map(() => ""));
  const started   = React.useRef(false);
  const ivRef     = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const doneRef   = React.useRef(onAllComplete);
  doneRef.current = onAllComplete;

  React.useEffect(() => {
    if (!inView || started.current) return;
    const t = setTimeout(() => {
      started.current = true;
      setActiveIdx(0);
    }, startDelay * 1000);
    return () => clearTimeout(t);
  }, [inView, startDelay]);

  React.useEffect(() => {
    if (activeIdx === null) return;

    if (activeIdx >= services.length) {
      const t = setTimeout(() => doneRef.current(), 250);
      return () => clearTimeout(t);
    }

    const svc = services[activeIdx];
    if (!svc) return;
    const full = svc.text;
    let i = 0;

    if (ivRef.current) clearInterval(ivRef.current);

    ivRef.current = setInterval(() => {
      i++;
      setTexts(prev => {
        const next = [...prev];
        next[activeIdx] = full.slice(0, i);
        return next;
      });
      if (i >= full.length) {
        if (ivRef.current) clearInterval(ivRef.current);
        setTimeout(() => setActiveIdx(idx => (idx ?? 0) + 1), 80);
      }
    }, 10);

    return () => { if (ivRef.current) clearInterval(ivRef.current); };
  }, [activeIdx, services]);

  return (
    <div aria-live="polite" className="flex flex-col gap-3.5">
      {services.map((svc, i) => {
        const visible    = activeIdx !== null && i <= activeIdx;
        const typed      = texts[i] ?? "";
        const isTyping   = i === activeIdx && typed.length < svc.text.length;
        const { Icon }   = svc;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: light ? -10 : 10 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            {/* Icône Lucide — professionnelle, pas d'emoji */}
            <span
              className={`shrink-0 ${light ? "text-[#F39200]" : "text-[#1E2F8A]"}`}
              aria-hidden
            >
              <Icon size={16} strokeWidth={1.75} />
            </span>

            <span
              className={`text-sm sm:text-[0.9375rem] font-semibold tracking-[0.04em] ${
                light ? "text-white/90" : "text-[#1E2F8A]/90"
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {typed}
              {isTyping && (
                <span
                  className={`inline-block w-[2px] h-[1em] ml-0.5 align-middle animate-pulse ${
                    light ? "bg-white/80" : "bg-[#1E2F8A]/70"
                  }`}
                />
              )}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Flèche déco
───────────────────────────────────────────────────────────── */
function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 7h8M8 4l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pillars — export principal
───────────────────────────────────────────────────────────── */
export function Pillars() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-10%" });

  const [constructionDone, setConstructionDone] = React.useState(false);
  const [assistanceDone,   setAssistanceDone]   = React.useState(false);

  const handleConstructionDone = React.useCallback(() => setConstructionDone(true), []);
  const handleAssistanceDone   = React.useCallback(() => setAssistanceDone(true),   []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS_CSS }} />

      <section
        ref={sectionRef}
        aria-labelledby="pillars-heading"
        className="overflow-hidden bg-[#F7F8FC]"
      >

        {/* ══════════════════════════════════════════════════════
            TITRE
        ══════════════════════════════════════════════════════ */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-20 text-center sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-32">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            className="mb-4 text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-[#F39200] sm:text-[0.6875rem]"
          >
            Deux pôles, une exigence
          </motion.p>

          <motion.h2
            id="pillars-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="text-balance"
            style={{
              fontFamily:    "'DM Serif Display', serif",
              fontSize:      "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "#1E2F8A",
            }}
          >
            Construire le bâti.{" "}
            <em className="not-italic opacity-60">Structurer l'entreprise.</em>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mx-auto mt-6 h-px w-16 origin-center bg-[#F39200]"
          />
        </div>

        {/* ══════════════════════════════════════════════════════
            DESKTOP — split diagonal
        ══════════════════════════════════════════════════════ */}
        <div className="relative hidden md:block" style={{ minHeight: 760 }}>

          {/* Fond Construction */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "linear-gradient(140deg, #1E2F8A 0%, #0D1A6E 100%)",
              clipPath:   "polygon(0 0, 100% 0, 100% 42%, 0 88%)",
            }}
          />

          {/* Fond Assistance */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "#FAFAF8",
              clipPath:   "polygon(0 88%, 100% 42%, 100% 100%, 0 100%)",
            }}
          />

          {/* ── Ligne diagonale amber animée ── */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 760"
          >
            <defs>
              <filter id="amber-glow-pillars" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Halo ambient */}
            <motion.path
              d="M 0 668.8 L 1000 319.2"
              fill="none"
              stroke="#F39200"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.18"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.55, ease: "easeInOut" }}
            />

            {/* Ligne principale */}
            <motion.path
              d="M 0 668.8 L 1000 319.2"
              fill="none"
              stroke="#F39200"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#amber-glow-pillars)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.95, delay: 0.58, ease: "easeInOut" }}
            />

            <motion.circle
              cx="0" cy="668.8" r="5"
              fill="#F39200"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.52 }}
            />
            <motion.circle
              cx="1000" cy="319.2" r="5"
              fill="#F39200"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.35, delay: 1.5 }}
            />
          </svg>

          {/* ── CONTENU CONSTRUCTION (zone haute-gauche) ── */}
          <div
            className="absolute left-12 top-10 z-10 xl:left-20 xl:top-14"
            style={{ width: "min(46%, 520px)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
            >
              {/* Logo Construction — taille doublée sur desktop */}
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo-construction.png"
                  alt="SICA Construction — BTP, Génie civil, Géobéton"
                  width={440}
                  height={176}
                  className="h-32 w-auto object-contain drop-shadow-lg"
                  style={{ filter: "brightness(0) invert(1)" }}
                  priority={false}
                />
              </motion.div>

              {/* Lottie Construction Animation — vitesse ×2.75 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.5 }}
                className="mb-5"
                style={{ width: 80, height: 80 }}
                aria-hidden
              >
                <DotLottieReact
                  src="/Construction Animation.lottie"
                  loop
                  autoplay
                  speed={2.75}
                />
              </motion.div>

              {/* Tagline */}
              <p
                className="mb-5 text-[0.625rem] font-medium uppercase tracking-[0.22em] text-white/45"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                BTP · Génie civil · Géobéton
              </p>

              {/* Typewriter services */}
              <AnimatedServices
                services={CONSTRUCTION}
                startDelay={1.0}
                inView={inView}
                onAllComplete={handleConstructionDone}
                light
              />

              {/* CTA amber */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={constructionDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <a
                  href={links.construction.base}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F39200] px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-white shadow-lg transition-all duration-200 hover:bg-[#D97E00] hover:shadow-xl"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Découvrir SICA Construction <Arrow />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* ── LOGO ASSISTANCE — bas-gauche, sur le blanc, effet titre diagonal ──
              Calcul : zone blanche à x=48 commence à y=652, section=760px.
              Hauteur disponible = 108px → h-24 (96px) centré : top=(652+(108-96)/2)=658
              xl: x=80 → zone blanche à y=641, disponible=119px → top=652 ── */}
          <motion.div
            className="absolute left-12 z-10 xl:left-20"
            style={{ top: 658 }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
              <Image
                src="/logo-assistance.png"
                alt="SICA Assistance — Création d'entreprise, Comptabilité, Conseil"
                width={384}
                height={154}
                className="h-24 w-auto object-contain drop-shadow-md"
                priority={false}
              />
            </motion.div>
          </motion.div>

          {/* ── CONTENU ASSISTANCE (zone basse-droite) ── */}
          <div
            className="absolute bottom-10 right-12 z-10 xl:bottom-14 xl:right-20"
            style={{ width: "min(46%, 520px)" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col items-end"
            >
              {/* Lottie Costumer Support — taille ×2, vitesse inchangée */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.55 }}
                className="mb-5"
                style={{ width: 160, height: 160 }}
                aria-hidden
              >
                <DotLottieReact
                  src="/Costumer Support.lottie"
                  loop
                  autoplay
                />
              </motion.div>

              {/* Tagline */}
              <p
                className="mb-5 text-right text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[#1E2F8A]/70"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Création · Conseil · Comptabilité
              </p>

              {/* Typewriter assistance — démarre quand construction est fini */}
              {constructionDone && (
                <AnimatedServices
                  key="assistance-desktop"
                  services={ASSISTANCE}
                  startDelay={0.25}
                  inView={constructionDone}
                  onAllComplete={handleAssistanceDone}
                />
              )}

              {/* CTA royal */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={assistanceDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <a
                  href="https://sicaassistance.ci"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E2F8A] px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[#1E2F8A] shadow-sm transition-all duration-200 hover:bg-[#1E2F8A] hover:text-white hover:shadow-lg"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Découvrir SICA Assistance <Arrow />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MOBILE — stack avec séparateur diagonal
        ══════════════════════════════════════════════════════ */}
        <div className="md:hidden">

          {/* Bloc Construction */}
          <div
            className="relative px-6 pb-24 pt-10"
            style={{
              background: "linear-gradient(140deg, #1E2F8A 0%, #0D1A6E 100%)",
              clipPath:   "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
            }}
          >
            {/* Logo Construction — taille doublée sur mobile, aligné à droite */}
            <div className="mb-6 flex justify-end">
              <Image
                src="/logo-construction.png"
                alt="SICA Construction — BTP, Génie civil, Géobéton"
                width={360}
                height={144}
                className="h-24 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                priority={false}
              />
            </div>

            {/* Lottie Construction Animation — mobile, vitesse ×2.75 */}
            <div className="mb-5" style={{ width: 64, height: 64 }} aria-hidden>
              <DotLottieReact
                src="/Construction Animation.lottie"
                loop
                autoplay
                speed={2.75}
              />
            </div>

            <p
              className="mb-5 text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-white/40"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BTP · Génie civil · Géobéton
            </p>
            <AnimatedServices
              services={CONSTRUCTION}
              startDelay={0.8}
              inView={inView}
              onAllComplete={handleConstructionDone}
              light
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={constructionDone ? { opacity: 1 } : {}}
              transition={{ duration: 0.45 }}
              className="mt-7"
            >
              <a
                href={links.construction.base}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#F39200] px-5 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Découvrir <Arrow />
              </a>
            </motion.div>
          </div>

          {/* Séparateur diagonal SVG */}
          <div className="relative -mt-px h-10 overflow-hidden" aria-hidden>
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="h-full w-full">
              <polygon points="0,0 100,0 100,0 0,20" fill="#0D1A6E" />
              <polygon points="0,20 100,0 100,20" fill="#FAFAF8" />
              <line x1="0" y1="20" x2="100" y2="0" stroke="#F39200" strokeWidth="0.4" />
            </svg>
          </div>

          {/* Bloc Assistance */}
          <div
            className="relative px-6 pb-16 pt-6"
            style={{ background: "#FAFAF8" }}
          >
            {/* Logo Assistance — taille doublée sur mobile */}
            <div className="mb-6">
              <Image
                src="/logo-assistance.png"
                alt="SICA Assistance — Création d'entreprise, Comptabilité, Conseil"
                width={360}
                height={144}
                className="h-24 w-auto object-contain"
                priority={false}
              />
            </div>

            {/* Lottie Costumer Support — mobile, taille ×2, aligné à droite */}
            <div className="mb-5 flex justify-end" aria-hidden>
              <div style={{ width: 128, height: 128 }}>
                <DotLottieReact
                  src="/Costumer Support.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>

            <p
              className="mb-5 text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-[#1E2F8A]/40"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Création · Conseil · Comptabilité
            </p>
            {constructionDone && (
              <AnimatedServices
                key="assistance-mobile"
                services={ASSISTANCE}
                startDelay={0.3}
                inView={constructionDone}
                onAllComplete={handleAssistanceDone}
              />
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={assistanceDone ? { opacity: 1 } : {}}
              transition={{ duration: 0.45 }}
              className="mt-7"
            >
              <a
                href="https://sicaassistance.ci"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E2F8A] px-5 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-[#1E2F8A]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Découvrir <Arrow />
              </a>
            </motion.div>
          </div>
        </div>

      </section>
    </>
  );
}
