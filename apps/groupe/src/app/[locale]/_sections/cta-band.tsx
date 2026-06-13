"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { links } from "@/lib/links";

/** Variants distincts pour l'entrée et la sortie de la slot machine */
const slotVariants = {
  /** État de départ : vient d'en bas, flouté, rétréci */
  enter: {
    y: "108%",
    opacity: 0,
    filter: "blur(20px)",
    scale: 0.72,
  },
  /** État visible : position zéro, net, taille normale */
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      // Spring pour un atterrissage naturel avec légère inertie
      y: { type: "spring", stiffness: 320, damping: 24, mass: 0.85 },
      scale: { type: "spring", stiffness: 280, damping: 22, mass: 0.85 },
      // Défloutage progressif légèrement en retard sur le mouvement
      filter: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.32, ease: "easeOut" },
    },
  },
  /** État de sortie : part vers le haut, se floute et grossit */
  exit: {
    y: "-108%",
    opacity: 0,
    filter: "blur(14px)",
    scale: 1.14,
    transition: {
      // Accélération forte = départ vif, comme une cassette qui avance
      y: { duration: 0.32, ease: [0.55, 0, 0.9, 0.05] },
      scale: { duration: 0.32, ease: [0.55, 0, 0.9, 0.05] },
      filter: { duration: 0.26, ease: "easeIn" },
      opacity: { duration: 0.18, ease: "easeIn" },
    },
  },
};

export function CtaBand() {
  const t = useTranslations("Home.cta");
  const locale = useLocale();
  const SERVICES = [
    t("services.constructions"),
    t("services.civilEngineering"),
    t("services.geobeton"),
    t("services.utilities"),
    t("services.plumbing"),
    t("services.accounting"),
    t("services.tax"),
    t("services.smeAdvice"),
  ];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SERVICES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [SERVICES.length]);

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-[#05081A] py-28 sm:py-36 lg:py-44"
    >
      {/* ── Aurora blobs ──────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Royal blue — top-left */}
        <div
          className="absolute -left-32 -top-40 h-[680px] w-[680px] rounded-full"
          style={{
            background: "radial-gradient(circle, #1E2F8A 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.48,
          }}
        />
        {/* Amber — top-right */}
        <div
          className="absolute -right-20 top-[-8%] h-[560px] w-[560px] rounded-full"
          style={{
            background: "radial-gradient(circle, #F7A026 0%, transparent 68%)",
            filter: "blur(100px)",
            opacity: 0.26,
          }}
        />
        {/* Indigo — center-bottom */}
        <div
          className="absolute bottom-[-25%] left-[20%] h-[520px] w-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle, #3E53CC 0%, transparent 70%)",
            filter: "blur(88px)",
            opacity: 0.22,
          }}
        />
        {/* White centre glow — subtle halo */}
        <div
          className="absolute left-1/2 top-1/2 h-[180px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,1) 0%, transparent 70%)",
            filter: "blur(60px)",
            opacity: 0.035,
          }}
        />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Eyebrow */}
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-brand-amber/70">
          {t("eyebrow")}
        </p>

        {/* Main heading — static line + animated slot */}
        <h2
          id="cta-heading"
          className="mt-5 text-[clamp(2rem,5.5vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-white"
        >
          <span className="block">{t("trustLead")}</span>

          {/* Slot-machine container — clipped + masque dégradé sur les bords */}
          <span
            className="relative block overflow-hidden text-brand-amber"
            style={{
              height: "clamp(2.4rem, 6.2vw, 4rem)",
              // Fondu subtil en haut/bas pour un clip premium (pas de coupure brutale)
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
            }}
          >
            <AnimatePresence mode="sync">
              <motion.span
                key={index}
                className="absolute inset-x-0 top-0 block"
                variants={slotVariants}
                initial="enter"
                animate="visible"
                exit="exit"
              >
                {SERVICES[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h2>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-white/45">
          {t("subtext")}
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <a
            href={links.construction.devis}
            className="inline-flex items-center justify-center rounded-full bg-white px-9 py-3.5 text-sm font-bold tracking-wide text-[#05081A] transition-all hover:bg-white/90 active:scale-[0.97]"
          >
            {t("start")}
          </a>
          <a
            href={`/${locale}/contact`}
            className="inline-flex min-h-[44px] items-center justify-center px-4 text-sm font-medium text-white/60 transition-colors hover:text-white/90"
          >
            {t("contact")}
          </a>
        </div>
      </div>
    </section>
  );
}
