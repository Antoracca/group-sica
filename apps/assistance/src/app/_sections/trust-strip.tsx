"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { CalendarCheck2, Landmark, MapPin, ShieldCheck } from "lucide-react";
import { Container } from "@sica/ui";

const FACTS = [
  { icon: CalendarCheck2, value: "2020", label: "Année de création" },
  { icon: Landmark, value: "SARL", label: "Société enregistrée" },
  { icon: MapPin, value: "2", label: "Abidjan, Yamoussoukro" },
  { icon: ShieldCheck, value: "RCCM", label: "CI-ABJ-03-2020-B13-17592" },
];

export function TrustStrip() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section aria-label="Repères de confiance" className="border-y border-zinc-200/50 bg-white">
      <Container className="py-16 sm:py-24">
        <div ref={ref} className="grid grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-4 lg:divide-x lg:divide-zinc-200/50">
          {FACTS.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center lg:px-8"
              >
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-brand-amber/10 text-brand-amber transition-transform duration-500 hover:scale-110">
                  <Icon className="size-6" />
                </div>
                <span className="font-display text-4xl font-bold leading-none tracking-tight text-zinc-950 sm:text-5xl">
                  {f.value}
                </span>
                <span className="mt-4 font-mono text-[0.7rem] font-bold uppercase tracking-[0.15em] text-zinc-400">
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
