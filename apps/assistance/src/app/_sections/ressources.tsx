"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BookOpen, CalendarClock, FileText, ListChecks, type LucideIcon } from "lucide-react";
import { Container, SectionHeader, cn } from "@sica/ui";

interface Resource {
  icon: LucideIcon;
  title: string;
  description: string;
}

const RESOURCES: Resource[] = [
  {
    icon: ListChecks,
    title: "Checklist de création d'entreprise",
    description: "Les étapes et les pièces à réunir pour immatriculer votre société sans oubli.",
  },
  {
    icon: BookOpen,
    title: "Les formes juridiques en Côte d'Ivoire",
    description: "Comprendre les différences entre entreprise individuelle, SARL et SA avant de choisir.",
  },
  {
    icon: FileText,
    title: "Quelles pièces préparer ?",
    description: "La liste claire des documents demandés selon votre situation et votre activité.",
  },
  {
    icon: CalendarClock,
    title: "Calendrier des obligations",
    description: "Les principales échéances fiscales et sociales à garder en tête sur l'année.",
  },
];

export function RessourcesSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ressources" aria-labelledby="ressources-heading" className="bg-mist">
      <Container className="py-20 sm:py-24 lg:py-28">
        <SectionHeader
          eyebrow="Ressources"
          heading="Des repères clairs pour avancer sereinement."
          description="Nous préparons des guides pratiques pour vous aider à y voir clair dans vos démarches. Ils arrivent bientôt."
          headingClassName="text-ink"
          className="max-w-2xl"
        />

        <div ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.article
                key={r.title}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex flex-col rounded-2xl border border-brand-royal/10 bg-white p-6",
                  "transition-shadow duration-200 hover:shadow-[0_20px_50px_-30px_rgba(13,26,74,0.4)]",
                )}
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-royal/5 text-brand-royal">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {r.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{r.description}</p>
                <span className="mt-5 inline-flex w-fit items-center rounded-full bg-mist px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate">
                  Bientôt disponible
                </span>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
