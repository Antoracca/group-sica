"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Container, SectionHeader } from "@sica/ui";
import { ConstructionHeader } from "@/components/construction-header";
import { FooterConstruction } from "@/components/footer-construction";
import { constructionProjects, type ProjectItem } from "@/lib/projects";
import { Folder, ChevronLeft, X, Maximize2 } from "lucide-react";
import { BackButton } from "@/components/back-button";

export default function RealisationsPage() {
  const [activeFolder, setActiveFolder] = useState<ProjectItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close folder if user hits escape
  // (In a more complex app, we'd use a dedicated hook for this)

  return (
    <>
      <ConstructionHeader forceScrolled />
      <BackButton />
      <main id="main-content" className="min-h-screen bg-[#F8F9FC] pb-20 pt-40 sm:pt-44">
        <Container className="relative">
          <SectionHeader
            eyebrow="Portfolio chantier"
            heading="Consulter toutes nos archives"
            description="Naviguez dans nos dossiers projets comme dans un explorateur de fichiers. Double-cliquez pour ouvrir un dossier ou agrandir une image."
          />

          <div className="relative mt-12 min-h-[60vh] overflow-hidden rounded-2xl border border-brand-royal/10 bg-white shadow-sm">
            {/* Barre de navigation "Explorateur" */}
            <div className="flex items-center border-b border-brand-royal/10 bg-brand-royal/5 px-4 py-3">
              <button
                onClick={() => setActiveFolder(null)}
                disabled={!activeFolder}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-brand-royal/60 transition-colors hover:bg-brand-royal/10 hover:text-brand-royal disabled:opacity-30 disabled:hover:bg-transparent"
                title="Dossier parent"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="ml-3 flex items-center rounded-md border border-brand-royal/20 bg-white px-3 py-1.5 text-sm text-brand-royal/80 shadow-inner">
                <span className="font-mono text-xs">Serveur\Archives\</span>
                <AnimatePresence mode="popLayout">
                  {activeFolder && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-mono text-xs font-semibold"
                    >
                      {activeFolder.id}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Contenu principal avec swipe conditionnel */}
            <div className="relative w-full">
              <AnimatePresence mode="wait">
                {!activeFolder ? (
                  <motion.div
                    key="explorer-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                  >
                    {constructionProjects.map((project) => (
                      <button
                        key={project.id}
                        onDoubleClick={() => setActiveFolder(project)}
                        onClick={() => {
                          // Support single tap for mobile, double click for desktop
                          if (window.matchMedia("(max-width: 768px)").matches) {
                            setActiveFolder(project);
                          }
                        }}
                        className="group flex flex-col items-center gap-3 rounded-xl border border-transparent p-4 transition-all hover:bg-brand-royal/5 hover:border-brand-royal/10 focus:outline-none focus:ring-2 focus:ring-brand-amber/50"
                      >
                        <Folder
                          size={64}
                          className="text-[#FFD166] drop-shadow-sm transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                          fill="currentColor"
                          strokeWidth={1}
                        />
                        <span className="line-clamp-2 text-center text-sm font-medium leading-tight text-brand-royal-900">
                          {project.name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="folder-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row"
                  >
                    {/* Panel Gauche: Informations du projet */}
                    <div className="border-b border-brand-royal/10 bg-[#F9FAFD] p-6 md:w-80 md:shrink-0 md:border-b-0 md:border-r">
                      <div className="sticky top-6">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-amber/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-amber-600">
                          <Folder size={14} fill="currentColor" />
                          Dossier Ouvert
                        </div>
                        <h2 className="font-display text-2xl font-bold text-ink">
                          {activeFolder.name}
                        </h2>
                        <div className="mt-2 text-sm font-medium text-brand-royal">
                          Localisation : {activeFolder.city}
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-slate">
                          {activeFolder.summary}
                        </p>
                        
                        <div className="mt-6 rounded-xl border border-brand-royal/10 bg-white p-5 shadow-sm">
                          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-royal/60">
                            Fiche technique détaillée
                          </h3>
                          <dl className="space-y-3 text-[0.8rem] sm:text-sm">
                            <div className="flex flex-col border-b border-brand-royal/5 pb-2 sm:flex-row sm:justify-between">
                              <dt className="text-slate">Maître d'ouvrage</dt>
                              <dd className="font-medium text-ink sm:text-right">{activeFolder.client}</dd>
                            </div>
                            <div className="flex flex-col border-b border-brand-royal/5 pb-2 sm:flex-row sm:justify-between">
                              <dt className="text-slate">Type de mission</dt>
                              <dd className="font-medium text-ink sm:text-right">{activeFolder.mission}</dd>
                            </div>
                            <div className="flex flex-col border-b border-brand-royal/5 pb-2 sm:flex-row sm:justify-between">
                              <dt className="text-slate">Secteur / Domaine</dt>
                              <dd className="font-medium text-ink sm:text-right">{activeFolder.sector}</dd>
                            </div>
                            <div className="flex flex-col border-b border-brand-royal/5 pb-2 sm:flex-row sm:justify-between">
                              <dt className="text-slate">Surface / Linéaire</dt>
                              <dd className="font-medium text-ink sm:text-right">{activeFolder.surface}</dd>
                            </div>
                            <div className="flex flex-col border-b border-brand-royal/5 pb-2 sm:flex-row sm:justify-between">
                              <dt className="text-slate">Technologies clés</dt>
                              <dd className="font-medium text-ink sm:text-right">{activeFolder.tech}</dd>
                            </div>
                            <div className="flex flex-col border-b border-brand-royal/5 pb-2 sm:flex-row sm:justify-between">
                              <dt className="text-slate">Équipe mobilisée</dt>
                              <dd className="font-medium text-ink sm:text-right">{activeFolder.team}</dd>
                            </div>
                            <div className="flex flex-col border-b border-brand-royal/5 pb-2 sm:flex-row sm:justify-between">
                              <dt className="text-slate">Année de réalisation</dt>
                              <dd className="font-medium text-ink sm:text-right">{activeFolder.year}</dd>
                            </div>
                            <div className="flex flex-col border-b border-brand-royal/5 pb-2 sm:flex-row sm:justify-between">
                              <dt className="text-slate">Référent SICA</dt>
                              <dd className="font-medium text-ink sm:text-right">{activeFolder.referent}</dd>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <dt className="text-slate font-medium">Durée d'exécution</dt>
                              <dd className="font-bold text-brand-amber sm:text-right">
                                {activeFolder.durationMonths} mois
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>

                    {/* Panel Droit: Grille des images */}
                    <div className="flex-1 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-brand-royal-900">
                          Contenu du dossier ({activeFolder.media?.length || 0} fichiers)
                        </h3>
                        <span className="text-xs text-brand-royal/50">
                          Double-cliquez pour agrandir
                        </span>
                      </div>

                      {activeFolder.media && activeFolder.media.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                          {activeFolder.media.map((imgPath, index) => {
                            // Liste de noms professionnels pour masquer "WhatsApp Image..."
                            const proNames = [
                              "Vue aérienne du chantier",
                              "Étude géotechnique",
                              "Bâtiment administratif",
                              "Travaux de fondation",
                              "Ouvrage principal",
                              "Phase d'exécution",
                              "Contrôle technique",
                              "Réception des travaux",
                              "Aménagement extérieur",
                              "Détail architectural",
                              "Zone de stockage",
                              "Installation de chantier"
                            ];
                            const displayName = proNames[index % proNames.length] + " " + (index > 11 ? Math.floor(index/12) + 1 : "");
                            
                            return (
                              <button
                                key={index}
                                onDoubleClick={() => setSelectedImage(imgPath)}
                                onClick={() => {
                                  // Support single tap for mobile
                                  if (window.matchMedia("(max-width: 768px)").matches) {
                                    setSelectedImage(imgPath);
                                  }
                                }}
                                className="group relative flex flex-col items-center gap-2 rounded-xl border border-transparent p-2 text-left transition-all hover:bg-brand-royal/5 hover:border-brand-royal/10 focus:outline-none focus:ring-2 focus:ring-brand-amber/50"
                              >
                                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-brand-royal/10 bg-brand-royal/5 shadow-sm">
                                  <Image
                                    src={imgPath}
                                    alt={displayName}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-brand-royal/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    <Maximize2 size={24} className="text-white drop-shadow-md" />
                                  </div>
                                </div>
                                <span className="w-full text-center text-xs font-medium text-brand-royal-900/80 leading-tight">
                                  {displayName}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-royal/10 bg-brand-royal/5">
                          <Folder size={48} className="text-brand-royal/20" />
                          <p className="mt-4 text-sm font-medium text-brand-royal/60">
                            Ce dossier est vide
                          </p>
                          <p className="mt-1 text-xs text-brand-royal/40">
                            Aucun visuel n'a encore été rattaché à ce projet.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </main>
      <FooterConstruction />

      {/* Modal / Lightbox d'image en plein écran */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-[101] inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative h-full w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Vue agrandie"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
