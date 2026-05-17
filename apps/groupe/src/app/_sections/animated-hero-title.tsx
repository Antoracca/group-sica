"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

const PHRASES = [
  "la bâtit de A à Z.",
  "la structure à 100%.",
  "la sort de terre.",
  "gère sa compta.",
  "en fait une réalité.",
];

export function AnimatedHeroTitle() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <h1
      id="hero-heading"
      className="max-w-3xl font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(1.6rem,5vw,4.25rem)] xl:text-[4.75rem]"
    >
      Votre ambition en Côte d'Ivoire, on
      {/* Ligne animée — mt et pb resserrés sur mobile */}
      <span className="mt-1 grid overflow-hidden text-brand-amber pb-1 sm:pb-3">
        <AnimatePresence>
          <motion.span
            key={index}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="col-start-1 row-start-1"
          >
            {PHRASES[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
}
