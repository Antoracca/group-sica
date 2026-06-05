"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Container, SectionHeader, cn } from "@sica/ui";
import { ConstructionHeader } from "@/components/construction-header";
import { FooterConstruction } from "@/components/footer-construction";
import { constructionProjects, type ProjectItem } from "@/lib/projects";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Extraction de toutes les catégories uniques
const CATEGORIES = ["Tous", ...Array.from(new Set(constructionProjects.map(p => p.sector || p.type)))];

export default function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filtrage des projets
  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") return constructionProjects;
    return constructionProjects.filter(p => p.sector === activeCategory || p.type === activeCategory);
  }, [activeCategory]);

  const openProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (!selectedProject?.media) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.media!.length);
  };

  const prevImage = () => {
    if (!selectedProject?.media) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.media!.length) % selectedProject.media!.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject?.media) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, currentImageIndex]);

  return (
    <>
      <ConstructionHeader forceScrolled />
      
      <main id="main-content" className="min-h-screen bg-[#F8F9FC] pb-20 pt-40 sm:pt-44">
        <Container className="relative">
          <SectionHeader
            eyebrow="Nos Réalisations"
            heading="L'Excellence en Bâtiment et Travaux Publics"
            description="Découvrez l'étendue de notre savoir-faire à travers nos projets emblématiques. Des infrastructures structurantes aux complexes résidentiels de standing."
          />

          {/* Barre de filtres de catégories */}
          <div className="mt-12 mb-10 flex flex-wrap items-center justify-center gap-2 lg:gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300",
                  activeCategory === category
                    ? "bg-brand-royal-900 text-white shadow-md"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-brand-royal/30 hover:text-brand-royal-900"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grille PFO-Style */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => openProject(project)}
                  className={cn(
                    "group relative block overflow-hidden rounded-2xl bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500",
                    // Variation des hauteurs pour donner un effet masonry asymétrique
                    index % 4 === 0 || index % 4 === 3 ? "aspect-[4/5]" : "aspect-square"
                  )}
                >
                  <Image
                    src={project.media?.[0] || "/placeholder.jpg"}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Voile sombre au survol */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95" />

                  {/* Contenu textuel */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 md:p-8 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                    <div className="mb-3 overflow-hidden">
                      <span className="inline-block translate-y-full rounded-full bg-brand-amber px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink transition-transform duration-500 delay-100 group-hover:translate-y-0">
                        {project.sector || project.type}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white leading-tight">
                      {project.name}
                    </h3>
                    <div className="mt-3 h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:h-auto group-hover:opacity-100">
                      <p className="font-mono text-xs uppercase tracking-widest text-white/70">
                        {project.city} {project.year && `— ${project.year}`}
                      </p>
                      <p className="mt-2 text-sm text-white/80 line-clamp-2">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </main>
      <FooterConstruction />

      {/* Lightbox / Modal Premium PFO-style */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex bg-black"
          >
            {/* Bouton Fermer Global */}
            <button
              onClick={closeProject}
              className="absolute right-6 top-6 z-[110] inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <X size={24} />
            </button>

            {/* Zone Image / Carrousel (Prend 100% sur mobile, 70% sur desktop) */}
            <div className="relative flex-1 bg-black flex items-center justify-center">
              {selectedProject.media && selectedProject.media.length > 0 ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={selectedProject.media[currentImageIndex]!}
                        alt={`${selectedProject.name} - vue ${currentImageIndex + 1}`}
                        fill
                        className="object-cover opacity-80 lg:opacity-100 lg:object-contain"
                        sizes="100vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Contrôles du Carrousel */}
                  {selectedProject.media.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-6 z-[105] inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-brand-amber hover:text-black"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-6 lg:right-auto lg:left-[calc(100%-4rem)] z-[105] inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-brand-amber hover:text-black"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      {/* Compteur */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[105] rounded-full bg-black/50 px-4 py-1.5 text-xs font-bold tracking-widest text-white backdrop-blur-md">
                        {currentImageIndex + 1} / {selectedProject.media.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-white/50">Aucun visuel disponible</div>
              )}
            </div>

            {/* Zone Infos / Sidebar (Hidden sur petit mobile, visible en overlay ou colonne) */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-[30%] lg:min-w-[400px] z-[105] flex flex-col pointer-events-none lg:pointer-events-auto">
              <div className="mt-auto lg:mt-0 h-full max-h-[60%] lg:max-h-none overflow-y-auto bg-gradient-to-t from-black via-black/90 to-transparent lg:bg-black/95 lg:backdrop-blur-xl p-8 lg:p-12 lg:pt-32 border-l border-white/10 pointer-events-auto">
                <div className="inline-block rounded-full border border-brand-amber/30 bg-brand-amber/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-amber">
                  {selectedProject.type}
                </div>
                
                <h2 className="mt-4 font-display text-3xl font-bold text-white lg:text-4xl">
                  {selectedProject.name}
                </h2>
                
                <p className="mt-6 text-sm leading-relaxed text-white/70">
                  {selectedProject.summary}
                </p>

                <div className="mt-10 h-px w-full bg-white/10" />

                <div className="mt-10 space-y-6">
                  {selectedProject.client && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Maître d'ouvrage</p>
                      <p className="mt-1 text-sm font-medium text-white">{selectedProject.client}</p>
                    </div>
                  )}
                  {selectedProject.city && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Localisation</p>
                      <p className="mt-1 text-sm font-medium text-white">{selectedProject.city}</p>
                    </div>
                  )}
                  {selectedProject.year && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Livraison</p>
                      <p className="mt-1 text-sm font-medium text-white">{selectedProject.year}</p>
                    </div>
                  )}
                  {selectedProject.surface && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Surface / Linéaire</p>
                      <p className="mt-1 text-sm font-medium text-white">{selectedProject.surface}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
