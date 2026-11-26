"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { Container, cn } from "@sica/ui";
import { ASSISTANCE_SERVICES } from "@/lib/services";

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openId, setOpenId] = useState<string | null>(ASSISTANCE_SERVICES[0]?.id ?? null);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(243,146,0,0.06),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(13,26,74,0.05),transparent_55%)]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-royal/5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-royal"
          >
            Nos Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            id="services-heading"
            className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-zinc-950"
          >
            Tout l&apos;administratif, <br />
            <span className="bg-gradient-to-r from-brand-royal to-brand-amber bg-clip-text text-transparent">au même endroit.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-zinc-600"
          >
            De la création de votre société jusqu&apos;au suivi quotidien de vos obligations,
            nous prenons en charge chaque étape dans un espace épuré et professionnel.
          </motion.p>
        </div>

        {/* Liste verticale — pleine largeur, sans carte, séparateurs fins */}
        <div ref={ref} className="mx-auto mt-20 max-w-5xl">
          {/* Trait supérieur */}
          <div
            className="h-px w-full bg-gradient-to-r from-transparent via-zinc-900/15 to-transparent"
            aria-hidden
          />

          <ul>
            {ASSISTANCE_SERVICES.map((service, i) => {
              const isOpen = openId === service.id;

              return (
                <motion.li
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative"
                >
                  {/* Barre latérale ambre visible quand ouvert */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top rounded-full bg-brand-amber transition-transform duration-500",
                      isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    )}
                  />

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`svc-panel-${service.id}`}
                    onClick={() => setOpenId(isOpen ? null : service.id)}
                    className="flex w-full items-center gap-6 py-8 pl-4 pr-2 text-left transition-colors sm:py-10 sm:pl-8 sm:pr-4"
                  >
                    <span className="min-w-0 flex-1">
                      <h3
                        className={cn(
                          "font-display text-2xl font-semibold leading-tight tracking-tight transition-colors sm:text-3xl lg:text-[2.25rem]",
                          isOpen ? "text-brand-royal" : "text-zinc-900 group-hover:text-zinc-950"
                        )}
                      >
                        {service.label}
                      </h3>
                    </span>

                    <span
                      aria-hidden
                      className={cn(
                        "flex size-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:size-14",
                        isOpen
                          ? "rotate-45 border-brand-amber bg-brand-amber text-white shadow-[0_10px_25px_-8px_rgba(243,146,0,0.5)]"
                          : "border-zinc-900/15 bg-transparent text-zinc-700 group-hover:border-zinc-900/30 group-hover:bg-zinc-950 group-hover:text-white"
                      )}
                    >
                      <Plus className="size-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`svc-panel-${service.id}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="max-w-3xl pb-10 pl-4 pr-2 sm:pl-8 sm:pr-4">
                          <p className="text-lg leading-relaxed text-zinc-700 sm:text-xl">
                            {service.description}
                          </p>

                          <ul className="mt-6 flex flex-wrap gap-2.5">
                            {service.points.map((point) => (
                              <li
                                key={point}
                                className="inline-flex items-center rounded-full border border-brand-amber/25 bg-brand-amber/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-amber-700"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Séparateur — plein largeur */}
                  <div
                    className="h-px w-full bg-gradient-to-r from-transparent via-zinc-900/15 to-transparent"
                    aria-hidden
                  />
                </motion.li>
              );
            })}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mt-20 text-center"
        >
          <a
            href="/#contact"
            className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-zinc-950 px-8 text-sm font-bold text-white shadow-xl shadow-zinc-950/10 transition-all hover:-translate-y-1 hover:bg-brand-royal hover:shadow-brand-royal/20 active:translate-y-0"
          >
            Démarrer mon dossier
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
