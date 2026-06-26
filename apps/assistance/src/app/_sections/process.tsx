"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container, cn } from "@sica/ui";

const STEPS = [
  { num: "01", title: "Prise de contact", text: "Vous nous exposez votre besoin, nous cernons votre situation et vos objectifs." },
  { num: "02", title: "Diagnostic", text: "Nous identifions la forme juridique et les démarches adaptées à votre projet." },
  { num: "03", title: "Constitution", text: "Nous réunissons et rédigeons les pièces nécessaires à votre dossier." },
  { num: "04", title: "Démarches", text: "Nous déposons et suivons vos formalités auprès des administrations." },
  { num: "05", title: "Suivi continu", text: "Nous tenons votre dossier à jour et restons disponibles pour la suite." },
];

/* Magnetic Button Wrapper */
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" aria-labelledby="process-heading" className="relative bg-zinc-50 py-24 sm:py-32 overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="pointer-events-none absolute inset-0 flex justify-center opacity-[0.15]">
        <div className="absolute -left-20 -top-40 h-[40rem] w-[40rem] rounded-full bg-brand-royal mix-blend-multiply blur-[128px]" />
        <div className="absolute right-0 top-40 h-[40rem] w-[40rem] rounded-full bg-brand-amber mix-blend-multiply blur-[128px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          
          {/* Left: Sticky Header */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-amber shadow-sm ring-1 ring-zinc-200"
              >
                Notre Méthode
              </motion.span>
              <motion.h2
                id="process-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-zinc-950"
              >
                Un parcours fluide, <br />
                <span className="bg-gradient-to-r from-brand-royal to-brand-amber bg-clip-text text-transparent">zéro friction.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600"
              >
                Chaque étape est documentée et optimisée. Vous suivez l&apos;avancée de votre dossier avec une clarté absolue, sans jamais perdre le fil.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="mt-10 hidden lg:block"
              >
                <MagneticButton className="inline-block">
                  <a
                    href="/#contact"
                    className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-zinc-950 px-8 font-bold text-white transition-all hover:scale-105 hover:shadow-2xl hover:shadow-brand-royal/20 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Lancer mon projet
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-royal to-brand-amber opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </MagneticButton>
              </motion.div>
            </div>
          </div>

          {/* Right: Scrolling Steps (Bento Style) */}
          <div ref={ref} className="flex flex-col gap-6 lg:col-span-7">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] ring-1 ring-zinc-950/5 transition-all duration-500",
                  "hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(13,26,74,0.08)] hover:ring-brand-royal/20"
                )}
              >
                {/* Subtle hover gradient inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-royal/[0.02] to-brand-amber/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 font-mono text-2xl font-bold text-zinc-300 transition-colors duration-500 group-hover:bg-brand-royal/5 group-hover:text-brand-royal">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-brand-royal">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-zinc-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 lg:hidden"
          >
            <a
              href="/#contact"
              className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-zinc-950 px-8 font-bold text-white transition-all active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Lancer mon projet
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
