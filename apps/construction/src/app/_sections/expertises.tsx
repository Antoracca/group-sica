"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Button, Container, cn } from "@sica/ui";
import {
  DraftingCompass,
  Layers3,
  Award,
  ArrowRight,
  ChevronDown,
  X,
  CheckCircle2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA (Ultra-court, 1 phrase) + Contenu Modale
───────────────────────────────────────────── */

type Expertise = {
  id: string;
  icon: typeof DraftingCompass;
  title: string;
  shortTitle: string;
  description: string;
  linkText: string;
  href?: string;
  modal?: { title: string; subtitle: string; content: string; points: string[] };
};

const expertises: Expertise[] = [
  {
    id: "etudes",
    icon: DraftingCompass,
    title: "A. Études & conception",
    shortTitle: "Études",
    description: "Étude de sol, conception architecturale, études de structure, plans techniques, métrés, estimation et devis.",
    linkText: "Voir le domaine Études",
    modal: {
      title: "A. Études & conception",
      subtitle: "Fonction Études — bureau d'études SICA",
      content: "Le bureau d'études définit le projet avant tout engagement : nature du sol, conception, dimensionnement de la structure et chiffrage. Les quantités et hypothèses sont vérifiées par le service Études avant la validation d'un devis.",
      points: [
        "Étude de sol",
        "Conception architecturale",
        "Études de structure et plans techniques",
        "Métrés, estimation et devis",
      ],
    },
  },
  {
    id: "technique",
    icon: Layers3,
    title: "B. Technique & réalisation",
    shortTitle: "Réalisation",
    description: "Préparation de chantier, villas et immeubles, gros œuvre, second œuvre, électricité, plomberie, finitions et géobéton.",
    linkText: "Voir le domaine Technique",
    modal: {
      title: "B. Technique & réalisation",
      subtitle: "Fonction Technique — équipes terrain",
      content: "Les équipes terrain exécutent les ouvrages sur la base des plans validés par le bureau d'études, de la préparation du chantier jusqu'aux finitions.",
      points: [
        "Préparation de chantier",
        "Villas basses, duplex et immeubles",
        "Gros œuvre et second œuvre",
        "Électricité, plomberie et finitions",
        "Géobéton / BTCS",
      ],
    },
  },
  {
    id: "suivi",
    icon: Award,
    title: "C. Suivi, contrôle & accompagnement",
    shortTitle: "Suivi",
    description: "Suivi de chantier, contrôle qualité, coordination, conseil technique, réception et accompagnement.",
    linkText: "Voir le domaine Suivi",
    modal: {
      title: "C. Suivi, contrôle & accompagnement",
      subtitle: "Du premier jalon à la réception",
      content: "Le suivi est assuré tout au long du chantier : points de contrôle, coordination des intervenants, conseil technique et réception des travaux avec le client.",
      points: [
        "Suivi de chantier",
        "Contrôle qualité",
        "Coordination des intervenants",
        "Conseil technique",
        "Réception et accompagnement",
      ],
    },
  },
];

/* ─────────────────────────────────────────────
   PANNEAU LATÉRAL (SIDE-PANEL MODAL)
───────────────────────────────────────────── */
function SidePanel({ 
  item, 
  onClose 
}: { 
  item: typeof expertises[0] | null; 
  onClose: () => void 
}) {
  useEffect(() => {
    if (item && item.modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  return (
    <AnimatePresence>
      {item && item.modal && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop sombre flouté */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Panneau latéral */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header avec icône */}
            <div className="flex items-center justify-between border-b border-black/5 p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-royal/10 text-brand-royal">
                  <item.icon className="size-5" />
                </div>
                <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-brand-amber">
                  Expertise
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Contenu défilable */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold leading-tight text-ink">
                {item.modal.title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-brand-royal">
                {item.modal.subtitle}
              </p>
              
              <div className="my-6 h-px w-12 bg-brand-amber" />

              <p className="text-[0.95rem] leading-relaxed text-slate-600">
                {item.modal.content}
              </p>

              <div className="mt-8 rounded-xl border border-black/5 bg-slate-50 p-5">
                <h4 className="mb-4 font-mono text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">
                  Points de contrôle
                </h4>
                <ul className="space-y-3">
                  {item.modal.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-amber" />
                      <span className="text-sm text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-black/5 bg-slate-50/50 p-6">
              <Button asChild className="w-full" variant="accent">
                <a href="/devis">Démarrer mon projet</a>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION : ACCORDION MINIMALISTE
───────────────────────────────────────────── */

export function ExpertisesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<typeof expertises[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Écoute du hash pour ouvrir la modale depuis la navbar
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      
      const found = expertises.find((exp) => exp.id === hash);
      if (found && found.modal) {
        setActiveModal(found);
        // On remonte un peu pour voir la section
        const section = document.getElementById("expertises");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Vérifier au montage
    handleHashChange();

    // Écouter les changements
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <section id="expertises" className="bg-paper pt-8 pb-20 sm:pt-12 sm:pb-28 lg:pt-16 lg:pb-36">
      <Container>
        {/* ── Section Header ── */}
        <div className="mb-10 max-w-3xl lg:mb-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-amber">
            Expertises métier
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-ink text-balance">
            L&apos;ingénierie de votre{" "}
            <span className="relative inline-block">
              CHANTIER
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[4px] w-full bg-brand-amber"
              />
            </span>
            , organisée en trois domaines.
          </h2>
          <p className="mt-8 text-pretty text-base leading-relaxed text-slate lg:text-lg">
            Études &amp; conception, technique &amp; réalisation, suivi &amp; contrôle : chaque domaine a ses responsables et ses validations. Les études valident les plans et les quantités, la technique exécute, le suivi contrôle et réceptionne.
          </p>
        </div>

        {/* ── Expanding Accordion Minimaliste (Lignes Droites) ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-[600px] w-full flex-col border-y border-slate-200/80 lg:h-[500px] lg:flex-row lg:border-x lg:border-y-0"
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
                  isActive ? "bg-white" : "bg-slate-50/40 hover:bg-slate-100/60"
                )}
                animate={{ flex: isActive ? (isDesktop ? 5 : 4) : 1 }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              >
                {/* TOUCHE SPÉCIALE : Grille Architecturale (Blueprint) en fond du panneau actif */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="pointer-events-none absolute inset-0 z-0"
                      style={{
                        backgroundImage: "linear-gradient(to right, #CBD1E1 1px, transparent 1px), linear-gradient(to bottom, #CBD1E1 1px, transparent 1px)",
                        backgroundSize: "24px 24px"
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
                      <div className="mb-auto">
                        <div className="flex size-14 items-center justify-center rounded-none bg-brand-royal-900 text-brand-amber">
                          <Icon className="size-6" strokeWidth={1.5} />
                        </div>
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
                        {item.href ? (
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
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModal(item);
                            }}
                            className="group/btn inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-royal-900 transition-all hover:text-brand-amber"
                          >
                            <span className="border-b border-brand-royal-900/30 pb-1 transition-colors group-hover/btn:border-brand-amber">
                              {item.linkText}
                            </span>
                            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        )}
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
            <a href="/devis">
              Configurer mon projet
            </a>
          </Button>
        </div>
      </Container>
      
      {/* Intégration du panneau latéral en dehors du flux */}
      <SidePanel item={activeModal} onClose={() => setActiveModal(null)} />
    </section>
  );
}
