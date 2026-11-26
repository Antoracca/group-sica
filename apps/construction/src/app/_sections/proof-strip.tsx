"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@sica/ui";

const metrics = [
  { value: "3", label: "Domaines d'expertise", note: "Études & conception · Technique & réalisation · Suivi & contrôle" },
  { value: "11", label: "Réalisations référencées", note: "Dossier technique : Abidjan, Soubré, Agboville, Jacqueville..." },
  { value: "5", label: "Équipes terrain", note: "Teams n°1 à n°5, appuyées par le bureau d'études" },
  { value: "2", label: "Implantations", note: "Abidjan (Cocody Centre / PMI) · Yamoussoukro (Morofé / 24 Ampoules)" },
  { value: "2020", label: "Immatriculation", note: "GROUPE SICA – SARLU · RCCM CI-ABJ-03-2020-B13-17592" },
  { value: "A→Z", label: "Accompagnement", note: "De l'étude de sol à la réception des travaux" },
];

export function ProofStrip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % metrics.length);
    }, 2800); // Rapide (2.8 secondes)
    return () => clearInterval(id);
  }, []);

  const activeMetric = metrics[index]!;

  return (
    <section id="preuves" className="relative overflow-hidden bg-white pt-16 pb-6 sm:pt-20 sm:pb-10">
      {/* Halos lumineux (superposition orange et bleu) */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
            x: ["0%", "3%", "0%"],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/3 -left-1/4 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(247,127,0,0.15)_0%,transparent_70%)] blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.2, 0.4, 0.2],
            x: ["0%", "-4%", "0%"],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/3 -right-1/4 h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(6,75,249,0.08)_0%,transparent_70%)] blur-3xl"
        />
      </div>

      <Container className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="flex h-[280px] w-full max-w-3xl flex-col items-center justify-center sm:h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Texte géant avec ombre dynamique */}
              <div className="relative">
                {/* Halo d'ombre orange textuelle */}
                <div className="absolute inset-0 rounded-full bg-brand-amber/20 blur-2xl" />
                <span className="relative font-display text-[6rem] font-bold leading-none tracking-tighter text-brand-amber sm:text-[9rem]">
                  {activeMetric.value}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-bold uppercase tracking-tight text-brand-royal-900 sm:text-4xl">
                {activeMetric.label}
              </h3>
              <p className="mt-4 max-w-lg text-lg font-medium text-brand-royal-900/60 sm:text-xl">
                {activeMetric.note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      {/* Fondu dégradé pour préparer l'arrivée de la section Expertises */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-white/0 via-paper/50 to-paper" />
    </section>
  );
}
