"use client";

import Image from "next/image";
import { Container, Button, cn } from "@sica/ui";
import { motion, useInView, AnimatePresence } from "motion/react";
import { MoveRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { constructionProjects, type ProjectItem } from "@/lib/projects";
import React from "react";

/* ─── Composant : Accordéon Architectural (Concept 1 + 2) ───────────── */

function ArchitecturalAccordion({ projects }: { projects: ProjectItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px" });

  // 1. Défaut sur l'image du milieu (index 1)
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Gérer la responsivité
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // 2. Logique d'Autoplay (Slow motion chaque 5s) et de Reset
  useEffect(() => {
    if (!isInView) {
      // Reparamétrer sur le milieu (index 1) dès qu'on n'est plus sur la section
      setActiveIndex(1);
      return;
    }

    // Suspendre l'autoplay si l'utilisateur interagit avec l'accordéon
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView, isHovering, projects.length]);

  return (
    <div 
      ref={containerRef}
      className="flex h-[550px] w-full flex-col overflow-hidden rounded-[2.5rem] bg-ink shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] lg:h-[650px] lg:flex-row"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {projects.map((project, index) => {
        const isActive = activeIndex === index;
        const image = project.media?.[0] ?? "";
        
        return (
          <motion.div
            key={project.id}
            layout
            onMouseEnter={() => isDesktop && setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative flex cursor-pointer overflow-hidden border-white/10",
              index !== projects.length - 1 && (isDesktop ? "border-r" : "border-b")
            )}
            animate={{ flex: isActive ? (isDesktop ? 3.5 : 4) : 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {/* L'image de fond : N&B inactif, Couleur au survol */}
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                scale: isActive ? 1.05 : 1,
                filter: isActive ? "grayscale(0%)" : "grayscale(100%)"
              }}
              transition={{ duration: 0.8 }}
            >
              {image ? (
                <Image src={image} alt={project.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
              ) : null}
            </motion.div>

            {/* Voile sombre / Flou sur les panneaux inactifs (Effet Accordéon flou demandé pour mobile) */}
            <motion.div 
              className="absolute inset-0 bg-ink/50 lg:bg-ink/30"
              animate={{ 
                opacity: isActive ? 0 : 1,
                backdropFilter: isActive ? "blur(0px)" : (isDesktop ? "blur(0px)" : "blur(4px)") 
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Dégradé de bas de carte pour lisibilité du texte (actif seulement) */}
            <AnimatePresence>
               {isActive && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none"
                 />
               )}
            </AnimatePresence>

            {/* Viseur Architectural : Lignes et croix de cadrage */}
            <div className="absolute inset-4 border border-white/10 pointer-events-none transition-opacity duration-500" style={{ opacity: isActive ? 0.5 : 0.1 }} />
            <div className="absolute left-3 top-3 text-white/40 pointer-events-none text-[10px]">+</div>
            <div className="absolute right-3 top-3 text-white/40 pointer-events-none text-[10px]">+</div>
            <div className="absolute left-3 bottom-3 text-white/40 pointer-events-none text-[10px]">+</div>
            <div className="absolute right-3 bottom-3 text-white/40 pointer-events-none text-[10px]">+</div>




            {/* Contenu Actif */}
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key="active-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="relative z-10 flex h-full w-full flex-col justify-end p-8 lg:p-10"
                >
                   <span className="mb-4 w-max rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-md">
                     {project.type}
                   </span>
                   <h3 className="font-display text-2xl font-bold leading-tight text-white lg:text-3xl">
                     {project.name}
                   </h3>
                   <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-brand-amber">
                     {project.city}
                   </p>

                   {/* Bouton pour consulter toutes les images */}
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="mt-6"
                   >
                     <a
                       href={`/realisations#${project.id}`}
                       className="group/link inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:text-brand-amber"
                     >
                       <span className="border-b border-white/30 pb-1 transition-colors group-hover/link:border-brand-amber">
                         Consulter toutes les images
                       </span>
                       <MoveRight className="size-4 transition-transform group-hover/link:translate-x-1" />
                     </a>
                   </motion.div>
                </motion.div>
              ) : (
                /* Contenu Inactif (Texte vertical ultra-minimaliste) */
                <motion.div
                  key="inactive-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  className="relative z-10 flex h-full w-full items-center justify-center p-4 lg:flex-col lg:justify-end lg:p-6"
                >
                   {isDesktop ? (
                     <span className="font-display text-xs font-bold tracking-[0.3em] text-white/80 whitespace-nowrap uppercase -rotate-180 [writing-mode:vertical-rl]">
                       {project.city}
                     </span>
                   ) : (
                     <span className="font-display text-xs font-bold tracking-[0.3em] text-white/80 whitespace-nowrap uppercase">
                       {project.city}
                     </span>
                   )}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────────────────── */

const FEATURED_PROJECT_IDS = ["sgci-plateau", "dabre-villa", "jacqueville-villa-duplex"];

export function ProjectsAZSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const featuredProjects = FEATURED_PROJECT_IDS.map(
    id => constructionProjects.find(p => p.id === id)!
  );

  return (
    <section id="projets-az" className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-36">
      <Container className="relative z-10">
        <motion.div 
          ref={ref}
          className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20"
        >
          {/* ── Colonne Gauche : Narration & Call-to-actions ── */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-amber">
                Réalisations
              </p>
              
              <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink">
                Des chantiers menés avec rigueur, des réhabilitations à la côte.
              </h2>
              
              <div className="mt-8 mb-12 h-[3px] w-16 bg-brand-royal-900" />
              
              <p className="text-pretty text-lg leading-relaxed text-slate-600">
                L'excellence opérationnelle n'est pas une promesse, c'est une méthode. De la conception résidentielle aux infrastructures d'envergure, nous déployons une ingénierie de précision sur chaque <strong>résidentiel</strong>, <strong>corporate</strong>, ou <strong>infrastructure</strong> qui nous est confié.
              </p>

              {/* Boutons d'action */}
              <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Button asChild variant="accent" size="lg" className="h-14 px-8 text-sm group">
                  <a href="/realisations">
                    Explorer nos archives
                    <MoveRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                
                <a 
                  href="/devis" 
                  className="group inline-flex h-14 items-center justify-center px-6 text-sm font-bold uppercase tracking-widest text-brand-royal-900 transition-colors hover:text-brand-amber"
                >
                  <span className="border-b-2 border-transparent pb-0.5 transition-colors group-hover:border-brand-amber">
                    Démarrer un projet
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Colonne Droite : L'Accordéon Viseur Architectural ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.95, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
             <ArchitecturalAccordion projects={featuredProjects} />
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
