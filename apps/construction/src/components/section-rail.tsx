"use client";

import { cn } from "@sica/ui";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const anchors = [
  { id: "hero", label: "Intro" },
  { id: "esica", label: "E-sica" },
  { id: "expertises", label: "Expertises" },
  { id: "projets-az", label: "Projets" },
  { id: "process", label: "Processus" },
];

export function SectionRail() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);

  /* Ancre active via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (inView?.target?.id) setActive(inView.target.id);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-20% 0px -35% 0px" },
    );

    anchors.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  /* Révélation au scroll : apparaît en descendant après le hero,
     se retire en remontant ou près du sommet. */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const past = y > window.innerHeight * 0.6;
      const goingDown = y > lastY.current;
      if (!past) setVisible(false);
      else setVisible(goingDown);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shown = reduce ? true : visible;

  return (
    <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <AnimatePresence>
        {shown ? (
          <motion.nav
            aria-label="Navigation rapide des sections"
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Conteneur sans aucun fond (bg-transparent) ni bordure/ombre */}
            <ul className="group flex flex-col items-end gap-5 py-4">
              {anchors.map((anchor) => {
                const isActive = active === anchor.id;
                return (
                  <li key={anchor.id} className="relative flex items-center justify-end">
                    <a
                      href={`#${anchor.id}`}
                      aria-current={isActive}
                      className="flex items-center gap-4 transition-all duration-300 outline-none"
                      aria-label={`Aller à la section ${anchor.label}`}
                    >
                      {/* Le nom de la section : toujours visible si actif, sinon visible au hover */}
                      <span
                        className={cn(
                          "relative font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] transition-all duration-300",
                          isActive 
                            ? "opacity-100 translate-x-0" 
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                          "bg-white px-3 py-1.5 rounded-lg shadow-lg border border-black/5 text-ink",
                        )}
                      >
                        {anchor.label}
                        
                        {/* Petite flèche orange sur le côté droit (façon infobulle) */}
                        {isActive && (
                          <span className="absolute -right-[5px] top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-[5px] border-l-white drop-shadow-sm" />
                        )}
                      </span>

                      {/* Le point : toujours orange */}
                      <div
                        className={cn(
                          "rounded-full transition-all duration-300",
                          isActive
                            ? "h-3 w-3 bg-brand-amber ring-4 ring-brand-amber/20 shadow-md"
                            : "h-2 w-2 bg-brand-amber/50 hover:bg-brand-amber hover:scale-125"
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </aside>
  );
}
