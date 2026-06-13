"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@sica/ui";

/*
  HERO de la page distinctions. Composition « gala » :
    - fond noir profond #070A1A
    - halo doré radial décentré bas-droite
    - palmette dorée stylisée (SVG inline) en filigrane gauche
    - filets royaux subtils en filigrane
    - typo display sérif pour le titre, accroche éditoriale en dessous
*/

export function AwardsHero() {
  const reduce = useReducedMotion();
  const t = useTranslations("Awards.hero");

  return (
    <section
      aria-labelledby="awards-hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* === Couches de fond === */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Halo doré bas-droite */}
        <div
          className="absolute -bottom-40 -right-32 h-[680px] w-[680px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(247,160,38,0.32) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Lueur royale haut-gauche */}
        <div
          className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(30,47,138,0.45) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        {/* Filets verticaux subtils */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 700"
        >
          <defs>
            <linearGradient id="vlin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F39200" stopOpacity="0" />
              <stop offset="50%" stopColor="#F39200" stopOpacity="1" />
              <stop offset="100%" stopColor="#F39200" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[120, 360, 600, 840, 1080, 1320].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="700" stroke="url(#vlin)" strokeWidth="1" />
          ))}
        </svg>
        {/* Palmette dorée stylisée — filigrane gauche */}
        <svg
          aria-hidden
          className="absolute -left-12 top-1/2 h-[420px] w-[420px] -translate-y-1/2 opacity-[0.08] sm:opacity-[0.12]"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Tige */}
          <path d="M100 195 Q 100 120 100 30" stroke="#F39200" strokeWidth="1.2" strokeLinecap="round" />
          {/* Feuilles gauche */}
          {[40, 65, 90, 115, 140, 165].map((y, i) => (
            <path
              key={`l-${y}`}
              d={`M 100 ${y} Q ${60 - i * 2} ${y - 18 - i * 2} ${28 - i * 1.5} ${y - 6}`}
              stroke="#F39200"
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}
          {/* Feuilles droite */}
          {[40, 65, 90, 115, 140, 165].map((y, i) => (
            <path
              key={`r-${y}`}
              d={`M 100 ${y} Q ${140 + i * 2} ${y - 18 - i * 2} ${172 + i * 1.5} ${y - 6}`}
              stroke="#F39200"
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <Container className="relative pt-36 pb-24 sm:pt-44 sm:pb-32 lg:pt-48 lg:pb-40">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.32em] text-[#F39200]"
        >
          <span aria-hidden className="h-px w-10 bg-[#F39200]" />
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          id="awards-hero-title"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] tracking-[-0.025em] text-white"
        >
          {t("title")}{" "}
          <span
            className="bg-gradient-to-r from-[#F8C16C] via-[#F39200] to-[#C16D00] bg-clip-text text-transparent"
            style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}
          >
            {t("titleAccent")}
          </span>
          .
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          {t("subtitle")}
        </motion.p>

        {/* Filet doré inférieur */}
        <motion.div
          aria-hidden
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 h-px w-32 origin-left bg-gradient-to-r from-[#F39200] to-transparent"
        />
      </Container>
    </section>
  );
}
