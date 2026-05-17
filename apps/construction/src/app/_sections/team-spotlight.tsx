"use client";

import Image from "next/image";
import { Container, SectionHeader } from "@sica/ui";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const teamFrames = [
  {
    src: "/media/team/equipe.jpeg",
    title: "Direction de chantier",
    text: "Vision globale, décisions rapides, arbitrages terrain.",
  },
  {
    src: "/media/team/portrait-1.jpeg",
    title: "Pilotage opérationnel",
    text: "Métrés, planning de lots, coordination quotidienne.",
  },
  {
    src: "/media/team/portrait-2.jpeg",
    title: "Qualité d'exécution",
    text: "Points d'arrêt, conformité technique, traçabilité.",
  },
  {
    src: "/media/team/portrait-3.jpeg",
    title: "Relation client chantier",
    text: "Reporting clair, décisions partagées, visibilité continue.",
  },
];

export function TeamSpotlightSection() {
  const [index, setIndex] = useState(0);
  const safeIndex = ((index % teamFrames.length) + teamFrames.length) % teamFrames.length;
  const frame = useMemo(
    () => teamFrames[safeIndex] ?? teamFrames[0]!,
    [safeIndex],
  );

  useEffect(() => {
    const id = setInterval(() => setIndex((old) => (old + 1) % teamFrames.length), 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="equipe" className="bg-paper py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Direction & équipe"
          heading="Un pilotage humain qui tient le chantier droit."
          description="Tu demandais l'image du PDG et de ses associés en avant: section dédiée avec rotation premium des visuels et messages métier."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-3xl border border-brand-royal/10 bg-mist">
            <AnimatePresence mode="wait">
              <motion.div
                key={frame.src}
                initial={{ opacity: 0.2, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                className="relative aspect-[4/3]"
              >
                <Image src={frame.src} alt={frame.title} fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-amber">
                    {frame.title}
                  </p>
                  <p className="mt-1 text-sm text-white/90">{frame.text}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="rounded-3xl border border-brand-royal/10 bg-white p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-amber">
              Pourquoi c'est décisif
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink">
              Les projets solides ont un visage, pas seulement un budget.
            </h3>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-slate">
              <li>Un interlocuteur décisionnaire présent à chaque jalon critique.</li>
              <li>Des points de suivi compréhensibles, même pour un client non technique.</li>
              <li>Des engagements de délais soutenus par des métriques de terrain.</li>
            </ul>
            <div className="mt-6 flex gap-2">
              {teamFrames.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Voir visuel ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-9 bg-brand-amber" : "w-5 bg-brand-royal/20 hover:bg-brand-royal/40"}`}
                />
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
