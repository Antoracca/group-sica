"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@sica/ui";
import { PROFILES } from "@/lib/profiles";

const ROTATING = ["formalités.", "déclarations.", "obligations.", "ambitions."] as const;
const WORD_MS = 2600;

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
      className="relative isolate overflow-hidden bg-background"
    >
      {/* Fond administratif sobre : trame royal très légère + halo doux */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><path d='M48 0H0V48' fill='none' stroke='%231E2F8A' stroke-width='0.6'/></svg>\")",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_85%_0%,rgba(30,47,138,0.10),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      <Container className="pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Colonne gauche — accroche éditoriale */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-brand-royal sm:text-xs"
            >
              <span aria-hidden className="h-px w-8 bg-brand-amber" />
              SICA Assistance · Pôle administratif et conseil
            </motion.p>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-[clamp(2.5rem,7vw,5.25rem)] font-semibold leading-[1.0] tracking-[-0.03em] text-ink"
            >
              <span className="block">Nous portons vos</span>
              <span className="relative mt-1 block h-[1.05em] overflow-hidden text-brand-royal">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={displayWord}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0 block"
                  >
                    {displayWord}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-slate sm:text-lg">
              Création d&apos;entreprise, comptabilité, fiscalité et conseil. Vous avancez
              sur votre activité, nous tenons l&apos;administratif.
            </p>

            {/* Faits vérifiables — Trust & Authority */}
            <ul className="mt-7 flex flex-wrap gap-2">
              {["Depuis 2020", "RCCM enregistrée", "Abidjan · Yamoussoukro"].map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-brand-royal/15 bg-white px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-brand-royal"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne droite — Gateway « Je suis… » */}
          <div className="rounded-2xl border border-brand-royal/10 bg-white p-5 shadow-[0_24px_60px_-30px_rgba(13,26,74,0.45)] sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
              Je suis…
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {PROFILES.map((p) => {
                const Icon = p.icon;
                const selected = p.id === profile;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setProfile(selected ? null : p.id)}
                    className={`flex min-h-[44px] items-center gap-2.5 rounded-xl border p-3 text-left text-sm font-semibold transition-colors ${
                      selected
                        ? "border-brand-royal bg-brand-royal/5 text-brand-royal"
                        : "border-black/10 bg-white text-ink hover:border-brand-royal/30 hover:bg-mist/40"
                    }`}
                  >
                    <Icon className="size-5 shrink-0 text-brand-royal" />
                    {p.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 min-h-[2.75rem] rounded-xl bg-mist/50 px-4 py-3">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active?.id ?? "default"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="text-sm leading-snug text-slate"
                >
                  {active
                    ? active.need
                    : "Choisissez votre profil pour un accompagnement adapté à votre situation."}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <a
                href="/#contact"
                className="group inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-brand-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700"
              >
                Démarrer mon dossier
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+2250709883293"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-brand-royal/20 px-5 text-sm font-semibold text-brand-royal transition-colors hover:bg-brand-royal/5"
              >
                <Phone className="size-4" />
                Nous appeler
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
