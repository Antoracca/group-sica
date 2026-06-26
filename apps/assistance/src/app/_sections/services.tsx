"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container, cn } from "@sica/ui";
import { ASSISTANCE_SERVICES } from "@/lib/services";

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      {/* Subtle Stripe-like ambient background gradient (blanc, bleu, orange) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(243,146,0,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(13,26,74,0.06),transparent_50%)]" />

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

        <div 
          ref={ref}
          className="mx-auto mt-20 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ASSISTANCE_SERVICES.map((service, i) => {
            const Icon = service.icon;
            // The first item can take 2 columns on tablet/desktop to break the monotony
            const isFeatured = i === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ring-1 ring-zinc-950/5 transition-all duration-500",
                  "hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(243,146,0,0.15)] hover:ring-brand-amber/30",
                  isFeatured ? "sm:col-span-2 lg:col-span-2 lg:flex-row lg:items-center lg:gap-10" : ""
                )}
              >
                {/* Hoverlay orange animated effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-amber/0 via-brand-amber/0 to-brand-amber/[0.08] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Icon wrapper */}
                <div className={cn(
                  "relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand-royal/5 text-brand-royal transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-amber group-hover:text-white group-hover:shadow-[0_0_20px_rgba(243,146,0,0.4)]",
                  isFeatured ? "lg:size-20 lg:rounded-[1.5rem]" : ""
                )}>
                  <Icon weight="duotone" className={cn("size-7 transition-transform duration-500", isFeatured ? "lg:size-10" : "")} aria-hidden />
                </div>

                <div className="relative z-10 mt-6 flex flex-1 flex-col lg:mt-0">
                  <h3 className={cn(
                    "font-display font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-brand-royal",
                    isFeatured ? "text-2xl lg:text-3xl" : "text-xl"
                  )}>
                    {service.label}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-600">
                    {service.description}
                  </p>
                  
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="inline-flex items-center rounded-lg bg-zinc-50 px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-500 transition-colors group-hover:bg-brand-amber/10 group-hover:text-brand-amber-700"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
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
