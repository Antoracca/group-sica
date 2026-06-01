"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Button, Container } from "@sica/ui";
import { HeroEstimator } from "./hero-estimator";
import { ArrowRight, Hammer, DraftingCompass, ListChecks } from "lucide-react";

const WORDS = ["chantiers.", "projets.", "ambitions."];

const PILLARS = [
  { label: "Chantier", icon: Hammer },
  { label: "Ingénierie", icon: DraftingCompass },
  { label: "Pilotage", icon: ListChecks },
];
const ACTIVE_PILLAR = 1;

export function HeroConstruction() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const displayWord = WORDS[wordIndex];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col justify-start overflow-hidden bg-brand-royal-900 text-white"
    >
      {/* ── Image de fond : mobile vs desktop ── */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        {/* Image MOBILE : positionnée pour que "Nous livrons vos" soit dessus et le mot orange sur le bleu */}
        <div className="absolute inset-x-0 top-[1.5rem] sm:hidden">
          <Image
            src="/hero/construction-apartment-building.webp"
            alt=""
            width={600}
            height={348}
            unoptimized
            priority
            className="w-full h-auto"
          />
        </div>
        {/* Image DESKTOP : pilotage.jpg */}
        <div className="absolute inset-0 hidden sm:block">
          <Image
            src="/hero/pilotage.jpg"
            alt=""
            fill
            priority
            quality={82}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Dégradé marque — lisibilité du texte à gauche */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-royal-900/92 via-brand-royal-900/62 to-brand-royal-900/10" />
        {/* Assombrissement */}
        <div className="absolute inset-0 bg-black/36" />
        {/* Vignette basse — ancrage du contenu */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-royal-900 to-transparent" />
        {/* Halo ambre — écho de marque */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_88%_8%,rgba(243,146,0,0.20),transparent_70%)]" />
      </div>

      {/* ── Transition vers section Statistiques (dégradé + lueurs) ── */}
      <div className="absolute inset-x-0 bottom-0 h-48 w-full pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
        {/* Lueurs subtiles orange/bleu pour fondre dans le ProofStrip */}
        <div className="absolute bottom-0 left-1/4 h-24 w-1/3 rounded-full bg-brand-amber/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-24 w-1/3 rounded-full bg-brand-royal/10 blur-3xl" />
      </div>

      {/* ── Contenu ── */}
      <Container className="relative z-10 pb-16 pt-[12rem] sm:pb-20 sm:pt-28 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative">
            {/* Effet de surbrillance/contraste derrière le texte */}
            <div className="absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,transparent_70%)] blur-md pointer-events-none" />
            
            {/* Accroche évolutive avec drop shadow pour un max de contraste */}
            <h1
              id="hero-heading"
              className="mt-2 font-display text-[clamp(2.6rem,7.4vw,6rem)] font-semibold leading-[1.1] tracking-[-0.03em] drop-shadow-lg"
            >
              <span className="block text-white drop-shadow-md">Nous livrons vos</span>
              <span className="relative mt-2 block h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={displayWord}
                    initial={{ y: "80%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-80%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0 block text-brand-amber drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                  >
                    {displayWord}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white sm:text-2xl font-medium drop-shadow-xl">
              Études, exécution, contrôle qualité.<br />
              <span className="font-semibold text-brand-amber">La maîtrise d&apos;œuvre par la preuve.</span>
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild variant="accent" size="lg" className="group w-full sm:w-auto shadow-xl shadow-brand-amber/20">
                <a href="/devis">
                  Constituer votre devis
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </Button>
              <a href="/espace-client" className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-white/10 px-8 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50">
                Connectez-vous à votre espace E-sica
              </a>
            </div>

            {/* Index — Ingénierie fixé en orange */}
            <div className="mt-14 flex max-w-sm gap-6 sm:gap-8">
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                const isActive = i === ACTIVE_PILLAR;
                return (
                  <div
                    key={pillar.label}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-brand-amber bg-brand-amber text-brand-royal-900 shadow-[0_0_15px_rgba(243,146,0,0.4)]"
                          : "border-white/20 bg-white/5 text-white/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`font-mono text-[0.65rem] uppercase tracking-[0.16em] ${
                        isActive ? "text-brand-amber font-semibold" : "text-white/45"
                      }`}
                    >
                      {pillar.label}
                    </span>
                  </div>
                );
              })}
             </div>
          </div>

          {/* Estimateur express */}
          <div className="lg:pb-1">
            <HeroEstimator />
          </div>
        </div>
      </Container>
    </section>
  );
}
