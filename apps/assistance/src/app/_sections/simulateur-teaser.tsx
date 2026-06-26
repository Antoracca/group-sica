"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Calculator, Building2 } from "lucide-react";
import { Container, cn } from "@sica/ui";

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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [forme, setForme] = useState<(typeof FORMES)[number]["id"]>("sarl");

  const active = FORMES.find((f) => f.id === forme) ?? FORMES[1];

  return (
    <section id="simulateur" aria-labelledby="simulateur-heading" className="relative overflow-hidden bg-zinc-50 py-24 sm:py-32">
      {/* Light Mesh Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
        <div className="absolute top-1/2 left-1/4 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-brand-royal/20 mix-blend-multiply blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-brand-amber/20 mix-blend-multiply blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div ref={ref} className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-royal shadow-sm ring-1 ring-zinc-200">
              <Calculator className="size-4 text-brand-amber" aria-hidden />
              Outil interactif
            </span>
            <h2
              id="simulateur-heading"
              className="mt-8 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-zinc-950"
            >
              Estimez votre projet en <span className="bg-gradient-to-r from-brand-royal to-brand-amber bg-clip-text text-transparent">quelques clics.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-600">
              Choisissez la forme qui vous correspond, indiquez votre activité et votre
              capital. Obtenez instantanément une projection claire des démarches et des coûts, sans surprise.
            </p>

            <a
              href="/#contact"
              className="group mt-10 inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-zinc-950 px-8 font-bold text-white shadow-xl shadow-zinc-950/10 transition-all hover:-translate-y-1 hover:bg-brand-royal hover:shadow-brand-royal/20 active:translate-y-0"
            >
              Lancer le simulateur
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </motion.div>

          {/* Interactive Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
          >
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-brand-royal/10 via-brand-amber/10 to-transparent blur-md" />
            <div className="relative flex flex-col rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-zinc-950/5">
              
              <div className="mb-8 flex items-center justify-between border-b border-zinc-100 pb-4">
                <p className="font-mono text-sm font-bold uppercase tracking-wider text-zinc-400">
                  Forme juridique
                </p>
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-400" />
                  <div className="size-3 rounded-full bg-amber-400" />
                  <div className="size-3 rounded-full bg-green-400" />
                </div>
              </div>

              <div className="grid gap-3">
                {FORMES.map((f) => {
                  const selected = f.id === forme;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setForme(f.id)}
                      className={cn(
                        "group flex min-h-[64px] items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300",
                        selected
                          ? "border-brand-amber/50 bg-brand-amber/5 shadow-[0_4px_20px_-4px_rgba(243,146,0,0.15)] ring-1 ring-brand-amber/20"
                          : "border-zinc-200/60 bg-zinc-50 hover:border-zinc-300 hover:bg-white"
                      )}
                    >
                      <div className={cn(
                        "flex size-10 items-center justify-center rounded-lg transition-colors duration-300",
                        selected ? "bg-brand-amber text-white" : "bg-zinc-200 text-zinc-500 group-hover:bg-zinc-300 group-hover:text-zinc-600"
                      )}>
                        <Building2 className="size-5" aria-hidden />
                      </div>
                      <span className={cn("font-display text-lg font-bold transition-colors", selected ? "text-brand-royal" : "text-zinc-700")}>
                        {f.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <motion.div 
                key={forme}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl bg-brand-royal/5 p-5 ring-1 ring-brand-royal/10"
              >
                <p className="text-sm leading-relaxed text-zinc-600">
                  <strong className="text-brand-royal">Conseil : </strong>{active.note}
                </p>
              </motion.div>

              <div className="mt-6 flex items-center justify-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-amber opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-brand-amber"></span>
                </span>
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-zinc-400">
                  Aperçu indicatif en direct
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
