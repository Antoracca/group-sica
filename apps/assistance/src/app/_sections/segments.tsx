"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeader, cn } from "@sica/ui";
import { PROFILES } from "@/lib/profiles";

export function SegmentsSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="segments" aria-labelledby="segments-heading" className="bg-background">
      <Container className="py-20 sm:py-24 lg:py-28">
        <SectionHeader
          eyebrow="Pour qui"
          heading="Un accompagnement pour chaque profil."
          description="Que vous lanciez votre activité ou que vous pilotiez une structure établie, nous adaptons notre intervention à votre situation."
          headingClassName="text-ink"
          className="max-w-2xl"
        />

        <div ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROFILES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.a
                key={p.id}
                href="/#contact"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group flex flex-col rounded-2xl border border-brand-royal/10 bg-white p-6",
                  "transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-royal/30 hover:shadow-[0_20px_50px_-30px_rgba(13,26,74,0.45)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2",
                )}
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-royal/5 text-brand-royal transition-colors duration-200 group-hover:bg-brand-royal/10">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.01em] text-ink">
                  {p.label}
                </h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-slate">{p.need}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand-royal">
                  Démarrer
                  <ArrowRight
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </motion.a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
