"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeader, cn } from "@sica/ui";
import { ASSISTANCE_SERVICES } from "@/lib/services";

export function ServicesSection() {
  const reduce = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const listInView = useInView(listRef, { once: true, margin: "-60px" });

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-background"
    >
      <Container className="py-20 sm:py-24 lg:py-32">
        {/* En-tête de section */}
        <motion.div
          ref={headerRef}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeader
            eyebrow="Nos services"
            heading="Tout l'administratif de votre entreprise, au même endroit."
            description="De la création de votre société jusqu'au suivi quotidien de vos obligations, SICA Assistance prend en charge chaque étape pour que vous restiez concentré sur votre activité."
            headingClassName="text-ink"
            className="max-w-2xl"
          />
        </motion.div>

        {/* Liste éditoriale des 7 services */}
        <ol
          ref={listRef}
          className="mt-14 divide-y divide-brand-royal/8 sm:mt-16"
          aria-label="Liste des services SICA Assistance"
        >
          {ASSISTANCE_SERVICES.map((service, i) => {
            const Icon = service.icon;
            const isEven = i % 2 === 0;

            return (
              <motion.li
                key={service.id}
                initial={reduce ? false : { opacity: 0, x: isEven ? -20 : 20 }}
                animate={listInView ? { opacity: 1, x: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative py-8 sm:py-10"
              >
                {/* Filet amber hover — accents ponctuels */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-y-0 left-0 w-[3px] rounded-full bg-brand-amber",
                    "scale-y-0 origin-top transition-transform duration-300 ease-out",
                    "group-hover:scale-y-100",
                  )}
                />

                <div className="flex flex-col gap-5 pl-0 sm:flex-row sm:items-start sm:gap-8 md:gap-12 sm:pl-6">
                  {/* Numéro + Icône */}
                  <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-start sm:gap-3">
                    <span
                      className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-brand-royal/40"
                      aria-hidden
                    >
                      {service.num}
                    </span>
                    <div
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl",
                        "bg-brand-royal/5 text-brand-royal",
                        "transition-colors duration-200 group-hover:bg-brand-royal/10",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </div>
                  </div>

                  {/* Corps éditorial */}
                  <div className="flex-1">
                    {/* Label + description */}
                    <div className="lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-10">
                      <div>
                        <h3
                          id={`service-${service.id}`}
                          className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-xl"
                        >
                          {service.label}
                        </h3>
                        <p className="mt-2.5 text-base leading-relaxed text-slate">
                          {service.description}
                        </p>
                      </div>

                      {/* Points clés */}
                      <ul
                        aria-label={`Points clés — ${service.label}`}
                        className="mt-4 flex flex-wrap gap-2 lg:mt-0 lg:content-start lg:self-center"
                      >
                        {service.points.map((point) => (
                          <li
                            key={point}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full",
                              "border border-brand-royal/12 bg-mist/60",
                              "px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-brand-royal",
                            )}
                          >
                            <span
                              aria-hidden
                              className="size-1 shrink-0 rounded-full bg-brand-amber"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* CTA bas de section */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={listInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-start gap-4 border-t border-brand-royal/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-sm text-base leading-relaxed text-slate">
            Un service qui ne figure pas dans la liste ? Contactez-nous, nous
            étudions chaque situation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/#contact"
              className={cn(
                "group inline-flex min-h-[48px] items-center justify-center gap-2",
                "rounded-full bg-brand-royal px-6 text-sm font-semibold text-white",
                "transition-colors duration-200 hover:bg-brand-royal-700",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2",
              )}
            >
              Parler à un conseiller
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a
              href="/#contact"
              className={cn(
                "inline-flex min-h-[48px] items-center justify-center gap-2",
                "rounded-full border border-brand-royal/20 px-6 text-sm font-semibold text-brand-royal",
                "transition-colors duration-200 hover:bg-brand-royal/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2",
              )}
            >
              Démarrer mon dossier
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
