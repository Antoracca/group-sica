"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container, cn } from "@sica/ui";
import { PROFILES } from "@/lib/profiles";

export function SegmentsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="segments" aria-labelledby="segments-heading" className="bg-white py-24 sm:py-32 overflow-hidden relative">
      {/* Light background meshes */}
      <div className="pointer-events-none absolute inset-0 flex justify-center opacity-40">
        <div className="absolute top-0 right-1/4 h-[30rem] w-[30rem] rounded-full bg-brand-amber/10 mix-blend-multiply blur-[100px]" />
      </div>

      <Container className="relative z-10">
        <div className="text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-royal/5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-royal"
          >
            Pour qui
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            id="segments-heading"
            className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-zinc-950"
          >
            Un accompagnement pour <br/> <span className="bg-gradient-to-r from-brand-royal to-brand-amber bg-clip-text text-transparent">chaque profil.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600"
          >
            Que vous lanciez votre activité ou que vous pilotiez une structure établie, nous adaptons notre intervention à votre situation.
          </motion.p>
        </div>

        <div ref={ref} className="mx-auto mt-20 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:mt-28">
          {PROFILES.map((p, i) => {
            const Icon = p.icon;
            // Asymmetric grid: First two span 2 cols, next two span 2 cols each -> 2x2 symmetrical.
            // Let's make first span 2, second span 1, third span 1, fourth span 2 => Asymmetric Bento
            const colSpans = [
              "sm:col-span-2 lg:col-span-2",
              "sm:col-span-1 lg:col-span-1",
              "sm:col-span-1 lg:col-span-1",
              "sm:col-span-2 lg:col-span-2",
            ];
            const isWide = i === 0 || i === 3;

            return (
              <motion.a
                key={p.id}
                href="/#contact"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[2rem] bg-zinc-50/50 p-8 shadow-sm ring-1 ring-zinc-950/5 backdrop-blur-sm",
                  "transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_40px_-10px_rgba(243,146,0,0.15)] hover:ring-brand-amber/30",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2",
                  colSpans[i]
                )}
              >
                {/* Glow arrière-plan au survol */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-brand-amber/20 blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className={cn("relative z-10 flex flex-1 flex-col", isWide ? "sm:flex-row sm:items-center sm:gap-8" : "")}>
                  <span className={cn(
                    "flex shrink-0 items-center justify-center rounded-2xl bg-white text-zinc-400 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] ring-1 ring-zinc-950/5 transition-all duration-500 group-hover:bg-brand-amber group-hover:text-white group-hover:ring-brand-amber",
                    isWide ? "size-16 sm:size-20" : "size-14"
                  )}>
                    <Icon weight="duotone" className={cn("transition-transform duration-500 group-hover:scale-110", isWide ? "size-8 sm:size-10" : "size-7")} aria-hidden />
                  </span>
                  
                  <div className={cn("mt-8", isWide ? "sm:mt-0" : "")}>
                    <h3 className={cn("font-display font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-brand-royal", isWide ? "text-2xl" : "text-xl")}>
                      {p.label}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-zinc-600">
                      {p.need}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-8 flex items-center justify-between border-t border-zinc-200/50 pt-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-amber">
                    Découvrir
                  </span>
                  <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 transition-all duration-300 group-hover:bg-brand-amber group-hover:text-white">
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:-rotate-45" aria-hidden />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
