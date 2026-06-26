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
      className="relative isolate min-h-[100svh] overflow-hidden bg-zinc-950 font-sans"
    >
      {/* ── Background image + light overlay ───────────────────────── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/hero/Personal-assistant.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_35%] opacity-80"
          sizes="100vw"
          quality={80}
        />
        {/* Cleaner, lighter overlay: Dark on the left for text, transparent on the right for the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1020]/95 via-[#0B1020]/60 to-[#0B1020]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent opacity-80" />
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
              className="font-display text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.9] tracking-tighter text-white"
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
                    className="absolute inset-x-0 top-0 block bg-gradient-to-br from-white via-white to-brand-amber bg-clip-text text-transparent drop-shadow-sm"
                  >
                    {displayWord}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300 drop-shadow-md"
            >
              Création d&apos;entreprise, comptabilité, fiscalité et conseil.
              Vous avancez sur votre activité, nous tenons l&apos;administratif.
            </motion.p>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-2">
              {TRUST_BADGES.map((b) => (
                <div
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-200 backdrop-blur-md"
                >
                  <CheckCircle2 className="h-3 w-3 text-brand-amber" />
                  {b}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 hidden flex-col gap-4 sm:flex sm:flex-row"
            >
              <a
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-zinc-950 shadow-lg shadow-white/10 transition-all hover:-translate-y-0.5 hover:bg-zinc-100 active:translate-y-0"
              >
                Démarrer mon dossier
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+2250709883293"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/30 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-black/50"
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
            className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl lg:mt-6"
          >
            {/* Ambient Card Light */}
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-brand-amber/10 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-5 px-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
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
                      className={`group flex min-h-[56px] items-center gap-3 rounded-2xl border p-4 text-left text-sm font-bold transition-all duration-300 hover:scale-[1.02] ${
                        selected
                          ? "border-brand-amber bg-brand-amber/20 text-white shadow-[0_0_30px_-5px_rgba(243,146,0,0.4)]"
                          : "border-white/10 bg-black/20 text-zinc-200 hover:border-white/30 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className={`flex items-center justify-center rounded-xl p-2 transition-colors ${selected ? "bg-brand-amber text-white" : "bg-white/5 text-zinc-400 group-hover:bg-white/10 group-hover:text-white"}`}>
                        <Icon weight={selected ? "fill" : "duotone"} className="h-5 w-5 shrink-0" />
                      </div>
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {/* Contextual need — animated swap */}
              <div className="mt-6 min-h-[4rem] rounded-2xl border border-white/5 bg-black/30 p-5 backdrop-blur-md">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active?.id ?? "default"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium leading-relaxed text-zinc-300"
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
                  className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-zinc-950 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Démarrer mon dossier
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:+2250709883293"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-black/60"
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
