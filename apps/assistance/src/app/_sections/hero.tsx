"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { Container } from "@sica/ui";
import { PROFILES } from "@/lib/profiles";

/* ─── Animation config ───────────────────────────────────────────────── */

const ROTATING = ["formalités.", "déclarations.", "obligations.", "ambitions."] as const;
const WORD_MS = 2600;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const TRUST_BADGES = [
  "Depuis 2020",
  "RCCM enregistrée",
  "Abidjan · Yamoussoukro",
] as const;

/* ─── Component ──────────────────────────────────────────────────────── */

export function AssistanceHero() {
  const reduce = useReducedMotion();
  const [word, setWord] = useState(0);
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setWord((w) => (w + 1) % ROTATING.length), WORD_MS);
    return () => clearInterval(id);
  }, [reduce]);

  const active = PROFILES.find((p) => p.id === profile) ?? null;
  const displayWord = reduce ? ROTATING[0] : ROTATING[word];

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden bg-white font-sans"
    >
      {/* ── Background image + light white overlay ─────────────────── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/hero/Personal-assistant.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
          quality={85}
        />
        {/* Voile blanc lumineux — dégradé clair, plus dense à gauche pour la lisibilité du texte,
            plus transparent à droite pour laisser respirer l'image. */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/40" />
        {/* Léger halo blanc en bas pour raccorder à la section suivante sans ombre sombre. */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <Container className="flex min-h-[100svh] items-center pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pt-44">
        <div className="grid w-full items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* ── Left column — Editorial ─────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center pt-8"
          >
            {/* Title */}
            <motion.h1
              variants={itemVariants}
              id="hero-heading"
              className="font-display text-[clamp(3rem,8.5vw,6.25rem)] font-semibold leading-[0.95] tracking-tighter text-zinc-950"
            >
              <span className="block">Nous portons vos</span>
              <span className="relative mt-2 block h-[1.1em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={displayWord}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0 block bg-gradient-to-br from-zinc-900 via-zinc-800 to-brand-amber bg-clip-text text-transparent"
                  >
                    {displayWord}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-xl text-xl leading-relaxed text-zinc-700 sm:text-2xl"
            >
              Création d&apos;entreprise, comptabilité, fiscalité et conseil.
              Vous avancez sur votre activité, nous tenons l&apos;administratif.
            </motion.p>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-2.5">
              {TRUST_BADGES.map((b) => (
                <div
                  key={b}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-800 shadow-sm backdrop-blur-md"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-amber" />
                  {b}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 hidden flex-col gap-4 sm:flex sm:flex-row"
            >
              <a
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-9 py-4 text-base font-bold text-white shadow-lg shadow-zinc-950/10 transition-all hover:-translate-y-0.5 hover:bg-zinc-900 active:translate-y-0"
              >
                Démarrer mon dossier
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+2250709883293"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-zinc-900/15 bg-white/80 px-9 py-4 text-base font-semibold text-zinc-900 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                <Phone className="h-4 w-4 fill-current" />
                Nous appeler
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right column — Profile Gateway card ─────────────────── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-zinc-900/10 bg-white/85 p-6 shadow-2xl shadow-zinc-900/10 backdrop-blur-xl lg:mt-6"
          >
            {/* Ambient Card Light */}
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-amber/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-brand-amber/15 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-5 px-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Je suis…
              </p>

              <div className="grid grid-cols-2 gap-3">
                {PROFILES.map((p) => {
                  const Icon = p.icon;
                  const selected = p.id === profile;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setProfile(selected ? null : p.id)}
                      className={`group flex min-h-[60px] items-center gap-3 rounded-2xl border p-4 text-left text-sm font-bold transition-all duration-300 hover:scale-[1.02] ${
                        selected
                          ? "border-brand-amber bg-brand-amber/15 text-zinc-950 shadow-[0_0_30px_-5px_rgba(243,146,0,0.35)]"
                          : "border-zinc-900/10 bg-white/70 text-zinc-800 hover:border-zinc-900/20 hover:bg-white hover:text-zinc-950"
                      }`}
                    >
                      <div className={`flex items-center justify-center rounded-xl p-2 transition-colors ${selected ? "bg-brand-amber text-white" : "bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200 group-hover:text-zinc-900"}`}>
                        <Icon weight={selected ? "fill" : "duotone"} className="h-5 w-5 shrink-0" />
                      </div>
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {/* Contextual need — animated swap */}
              <div className="mt-6 min-h-[4rem] rounded-2xl border border-zinc-900/5 bg-white/60 p-5 backdrop-blur-md">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active?.id ?? "default"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-base font-medium leading-relaxed text-zinc-700"
                  >
                    {active
                      ? active.need
                      : "Choisissez votre profil pour un accompagnement adapté à votre situation."}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Mobile CTAs */}
              <div className="mt-6 flex flex-col gap-3 sm:hidden">
                <a
                  href="/#contact"
                  className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Démarrer mon dossier
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:+2250709883293"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-zinc-900/15 bg-white/80 px-6 text-base font-semibold text-zinc-900 backdrop-blur-md transition-all hover:bg-white"
                >
                  <Phone className="h-4 w-4 fill-current" />
                  Nous appeler
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
