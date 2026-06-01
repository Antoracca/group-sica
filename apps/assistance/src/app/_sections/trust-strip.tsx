"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CalendarCheck2, Landmark, MapPin, ShieldCheck } from "lucide-react";
import { Container } from "@sica/ui";

/*
  Bande de confiance — Trust & Authority. Uniquement des faits vérifiables
  sourcés (année, forme, implantations, enregistrement). Aucun chiffre client
  inventé. Fond royal, peu d'amber, lecture nette.
*/

const FACTS = [
  { icon: CalendarCheck2, value: "2020", label: "Année de création" },
  { icon: Landmark, value: "SARL", label: "Société enregistrée" },
  { icon: MapPin, value: "2", label: "Implantations · Abidjan, Yamoussoukro" },
  { icon: ShieldCheck, value: "RCCM", label: "CI-ABJ-03-2020-B13-17592" },
];

export function TrustStrip() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section aria-label="Repères de confiance" className="bg-brand-royal text-white">
      <Container className="py-12 sm:py-14">
        <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {FACTS.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-2"
              >
                <Icon className="size-5 text-brand-amber" />
                <span className="font-display text-3xl font-bold leading-none sm:text-4xl">
                  {f.value}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/65">
                  {f.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
