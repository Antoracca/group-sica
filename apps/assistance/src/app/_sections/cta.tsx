"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@sica/ui";

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

  const reset = () => setPosition({ x: 0, y: 0 });

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

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <Container className="relative z-10 flex flex-col items-center justify-center">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden rounded-[3rem] bg-zinc-950 px-6 py-20 text-center sm:px-16 sm:py-32"
        >
          {/* Stunning glowing mesh inside the dark card for ultra-premium feel */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
            <div className="absolute top-0 right-0 h-[30rem] w-[30rem] rounded-full bg-brand-amber mix-blend-screen blur-[120px]" />
            <div className="absolute bottom-0 left-0 h-[30rem] w-[30rem] rounded-full bg-brand-royal mix-blend-screen blur-[120px]" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              <span className="flex size-1.5 animate-pulse rounded-full bg-brand-amber" />
              Prêt à commencer ?
            </span>
            <h2 className="mx-auto mt-8 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              Vos défis sont les nôtres : <br />
              <span className="bg-gradient-to-r from-brand-amber to-brand-royal bg-clip-text text-transparent">lancez-vous.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/70">
              Parlons de votre projet. Un interlocuteur vous répond et vous indique les
              prochaines étapes, sans aucun engagement.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <MagneticButton>
                <a
                  href="/#contact"
                  className="group relative inline-flex h-16 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-10 font-bold text-zinc-950 transition-all hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Démarrer mon dossier
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-amber/20 to-brand-royal/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              </MagneticButton>
              
              <MagneticButton>
                <a
                  href="tel:+2250709883293"
                  className="group inline-flex h-16 w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-10 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40 active:scale-95"
                >
                  <Phone className="size-5 transition-transform group-hover:rotate-12" />
                  +225 07 09 88 32 93
                </a>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
