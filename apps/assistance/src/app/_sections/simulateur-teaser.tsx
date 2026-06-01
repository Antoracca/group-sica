"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Building2, Calculator } from "lucide-react";
import { Container } from "@sica/ui";

const FORMES = [
  {
    id: "ei",
    label: "Entreprise individuelle",
    note: "La forme la plus simple pour démarrer seul, sans capital minimum.",
  },
  {
    id: "sarl",
    label: "SARL",
    note: "Adaptée aux PME : responsabilité limitée et capital librement fixé.",
  },
  {
    id: "sa",
    label: "SA",
    note: "Pour les structures plus importantes ouvertes à plusieurs actionnaires.",
  },
] as const;

export function SimulateurTeaser() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [forme, setForme] = useState<(typeof FORMES)[number]["id"]>("sarl");

  const active = FORMES.find((f) => f.id === forme) ?? FORMES[1];

  return (
    <section id="simulateur" aria-labelledby="simulateur-heading" className="relative overflow-hidden bg-brand-royal text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_88%_12%,rgba(243,146,0,0.16),transparent_70%)]"
      />
      <Container className="relative z-10 py-20 sm:py-24 lg:py-28">
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          {/* Texte */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-brand-amber">
              <Calculator className="size-4" aria-hidden />
              Simulateur de création
            </p>
            <h2
              id="simulateur-heading"
              className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              Estimez votre création d&apos;entreprise en quelques clics.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
              Choisissez la forme qui vous correspond, indiquez votre activité et votre
              capital. Nous vous présentons les étapes et une estimation, puis nous
              prenons le relais.
            </p>

            <a
              href="/#contact"
              className="group mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-brand-royal-900 transition-colors hover:bg-brand-amber hover:text-brand-royal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-royal"
            >
              Lancer le simulateur
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </motion.div>

          {/* Aperçu interactif léger */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">
              Forme juridique
            </p>
            <div className="mt-3 grid gap-2">
              {FORMES.map((f) => {
                const selected = f.id === forme;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setForme(f.id)}
                    className={`flex min-h-[48px] items-center gap-3 rounded-xl border px-4 text-left text-sm font-semibold transition-colors ${
                      selected
                        ? "border-brand-amber bg-brand-amber text-brand-royal-900"
                        : "border-white/15 bg-white/[0.04] text-white hover:bg-white/10"
                    }`}
                  >
                    <Building2 className="size-5 shrink-0" aria-hidden />
                    {f.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 min-h-[3.5rem] rounded-xl border border-white/10 bg-brand-royal-900/40 px-4 py-3">
              <p className="text-sm leading-snug text-white/80">{active.note}</p>
            </div>
            <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/45">
              Aperçu indicatif · estimation détaillée dans le simulateur
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
