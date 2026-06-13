"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Button, Container, cn } from "@sica/ui";
import {
  Layers3,
  Microscope,
  PenTool,
  Compass,
  Calculator,
  FileSignature,
  Home,
  Building2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════
   EXPERTISES MÉTIER — SICA Construction
   ────────────────────────────────────────────────────────────────────────
   Refonte alignée sur les 8 activités réelles. Mode accordéon conservé.
   Le bloc "Notre Méthodologie d'Étude" + "Points de contrôle" a été
   retiré (redondant avec les expertises ci-dessous).
═══════════════════════════════════════════════════════════════════════ */

const expertises = [
  {
    id: "etudes-sol",
    icon: Microscope,
    title: "Études de Sol",
    shortTitle: "Études",
    description:
      "Analyse géotechnique et caractérisation du terrain afin de garantir la stabilité, la sécurité et la durabilité des ouvrages avant tout démarrage de chantier.",
    linkText: "Découvrir l'expertise",
    href: "/devis",
  },
  {
    id: "geobeton",
    icon: Layers3,
    title: "Production de Briques Géobéton",
    shortTitle: "Géobéton",
    description:
      "Fabrication de briques écologiques et performantes offrant une excellente isolation thermique, une meilleure durabilité et une réduction significative des coûts de construction.",
    linkText: "Découvrir l'expertise",
    href: "/devis",
  },
  {
    id: "architecture",
    icon: PenTool,
    title: "Conception Architecturale",
    shortTitle: "Architecture",
    description:
      "Création de plans architecturaux modernes, fonctionnels et adaptés aux exigences techniques, esthétiques et budgétaires de chaque projet.",
    linkText: "Découvrir l'expertise",
    href: "/devis",
  },
  {
    id: "ingenierie",
    icon: Compass,
    title: "Ingénierie & Structure",
    shortTitle: "Ingénierie",
    description:
      "Études structurelles, calculs techniques et dimensionnement des ouvrages garantissant la conformité, la sécurité et la pérennité des constructions.",
    linkText: "Découvrir l'expertise",
    href: "/devis",
  },
  {
    id: "dqe",
    icon: Calculator,
    title: "Élaboration de Devis Quantitatifs et Estimatifs (DQE)",
    shortTitle: "DQE",
    description:
      "Évaluation précise des coûts, quantités et ressources nécessaires afin d'assurer une parfaite maîtrise budgétaire du projet.",
    linkText: "Découvrir l'expertise",
    href: "/devis-auto",
  },
  {
    id: "permis",
    icon: FileSignature,
    title: "Permis de Construire",
    shortTitle: "Permis",
    description:
      "Accompagnement administratif complet pour l'obtention des autorisations et démarches réglementaires nécessaires à la réalisation des projets.",
    linkText: "Découvrir l'expertise",
    href: "/contact",
  },
  {
    id: "villas-basses",
    icon: Home,
    title: "Réalisation de Villas Basses",
    shortTitle: "Villas",
    description:
      "Construction clé en main de villas individuelles répondant aux standards de qualité, de confort et de durabilité de SICA Construction.",
    linkText: "Découvrir l'expertise",
    href: "/realisations",
  },
  {
    id: "duplex-immeubles",
    icon: Building2,
    title: "Réalisation de Villas Duplex et Immeubles",
    shortTitle: "Immeubles",
    description:
      "Conception et réalisation de bâtiments résidentiels, commerciaux et immeubles de plusieurs niveaux avec une gestion rigoureuse des délais, des coûts et de la qualité.",
    linkText: "Découvrir l'expertise",
    href: "/realisations",
  },
];

/* ─────────────────────────────────────────────
   MAIN SECTION : ACCORDION MINIMALISTE
───────────────────────────────────────────── */

export function ExpertisesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Ouverture d'une expertise via hash dans l'URL (#etudes-sol etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const idx = expertises.findIndex((exp) => exp.id === hash);
      if (idx >= 0) {
        setActiveIndex(idx);
        const section = document.getElementById("expertises");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <section id="expertises" className="bg-paper pt-8 pb-20 sm:pt-12 sm:pb-28 lg:pt-16 lg:pb-36">
      <Container>
        {/* ── Section Header ── */}
        <div className="mb-10 max-w-3xl lg:mb-14">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-amber">
            Expertises métier
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-ink text-balance">
            L&apos;ingénierie de votre projet, structurée pour garantir{" "}
            <span className="relative inline-block">
              qualité
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[4px] w-full bg-brand-amber"
              />
            </span>
            , maîtrise des coûts et respect des délais.
          </h2>
        </div>

        {/* ── Introduction institutionnelle ── */}
        <div className="mb-12 grid gap-8 border-y border-slate-200/70 py-10 lg:mb-16 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:py-12">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-brand-royal">
              Le Groupe SICA
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-700">
              Le GROUPE SICA, à travers son département{" "}
              <strong className="text-ink">SICA Construction</strong>, est une
              Société à Responsabilité Limitée spécialisée dans la construction
              de bâtiments et travaux publics utilisant les technologies de
              construction en agglos/parpaings, BTCS/Géobéton, métal, aluminium
              et autres solutions innovantes.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-brand-royal">
              Notre positionnement
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-700">
              SICA accompagne entreprises, investisseurs, institutions et
              particuliers à chaque étape de leurs projets, des études techniques
              jusqu&apos;à la livraison complète des ouvrages.
            </p>
            <p className="mt-4 border-l-2 border-brand-amber pl-4 font-display text-[0.95rem] italic leading-relaxed text-ink/85">
              SICA se définit comme une{" "}
              <strong className="not-italic text-ink">
                Société Ivoirienne de Construction, de Consultance et
                d&apos;Assistance
              </strong>
              , dédiée à l&apos;accompagnement des entreprises,
              entrepreneur(e)s et particuliers aux niveaux national et
              international.
            </p>
          </div>
        </div>

        {/* ── Expanding Accordion Minimaliste (Lignes Droites) ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-[640px] w-full flex-col border-y border-slate-200/80 lg:h-[520px] lg:flex-row lg:border-x lg:border-y-0"
        >
          {expertises.map((item, index) => {
            const isActive = activeIndex === index;
            const Icon = item.icon;
            const isLast = index === expertises.length - 1;

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative flex cursor-pointer overflow-hidden transition-colors duration-500",
                  !isLast && "border-b border-slate-200/80 lg:border-b-0 lg:border-r",
                  isActive ? "bg-white" : "bg-slate-50/40 hover:bg-slate-100/60",
                )}
                animate={{ flex: isActive ? (isDesktop ? 5 : 4) : 1 }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              >
                {/* Grille Architecturale (Blueprint) en fond du panneau actif */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="pointer-events-none absolute inset-0 z-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div
                      key="active-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="relative z-10 flex h-full w-full flex-col justify-end p-5 lg:p-10"
                    >
                      <div className="mb-auto flex items-start justify-between gap-4">
                        <div className="flex size-14 items-center justify-center rounded-none bg-brand-royal-900 text-brand-amber">
                          <Icon className="size-6" strokeWidth={1.5} />
                        </div>
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-brand-amber/80">
                          {String(index + 1).padStart(2, "0")} / {String(expertises.length).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Ligne orange dynamique au-dessus du titre */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 48 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6 h-[2px] bg-brand-amber"
                      />

                      <h3 className="mb-4 font-display text-2xl font-bold leading-tight text-brand-royal-900 lg:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mb-8 max-w-md text-sm leading-relaxed text-slate-600 lg:text-base">
                        {item.description}
                      </p>
                      <div>
                        <a
                          href={item.href}
                          onClick={(e) => e.stopPropagation()}
                          className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-royal-900 transition-all hover:text-brand-amber"
                        >
                          <span className="border-b border-brand-royal-900/30 pb-1 transition-colors group-hover/btn:border-brand-amber">
                            {item.linkText}
                          </span>
                          <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="inactive-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 flex h-full w-full items-center justify-center gap-4 p-4 lg:flex-col lg:p-6 lg:pb-10"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-none border border-slate-200 bg-white text-slate-400 transition-colors group-hover:border-brand-amber group-hover:text-brand-amber">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      <span className="font-display text-sm font-bold tracking-widest text-slate-400 whitespace-nowrap uppercase lg:-rotate-180 lg:[writing-mode:vertical-rl] lg:text-[11px]">
                        {item.shortTitle}
                      </span>

                      {/* Flèche flottante au centre/bas */}
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="ml-auto lg:ml-0 lg:mt-auto"
                      >
                        <ChevronDown className="size-4 text-brand-amber lg:-rotate-90" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-16 flex flex-col items-start gap-6 border-t border-slate-200/60 pt-12 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <div>
            <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
              Définissons ensemble la portée de votre projet.
            </p>
          </div>
          <Button asChild variant="accent" size="lg" className="shrink-0 shadow-lg shadow-brand-amber/10 group">
            <a href="/devis">Configurer mon projet</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
