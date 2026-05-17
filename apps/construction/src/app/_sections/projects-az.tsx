"use client";

import Image from "next/image";
import { Container, SectionHeader } from "@sica/ui";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { constructionProjects, projectLetters, type ProjectItem } from "@/lib/projects";

const statusStyle: Record<string, string> = {
  Livré: "bg-emerald-100 text-emerald-800",
  "En cours": "bg-amber-100 text-amber-800",
  "Étude": "bg-slate-200 text-slate-700",
};

function ProjectPanel({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  const images = project.media ?? [];
  const [index, setIndex] = useState(0);
  const image = images[index];

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.22 }}
        className="relative w-full max-w-4xl overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
          aria-label="Fermer le panel chantier"
        >
          <X className="size-5" />
        </button>

        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative aspect-[16/10] bg-mist">
            {image ? (
              <Image
                src={image}
                alt={project.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-royal/10 px-2.5 py-1 text-xs font-semibold text-brand-royal">
                {project.type}
              </span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[project.status]}`}>
                {project.status}
              </span>
            </div>
            <h4 className="font-display text-3xl font-semibold leading-tight text-ink">{project.name}</h4>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-royal">{project.city}</p>
            <p className="text-sm leading-relaxed text-slate">{project.summary}</p>

            <div className="rounded-xl border border-brand-royal/12 bg-mist p-4 text-sm text-slate">
              <p className="font-semibold text-ink">Logique d'exécution</p>
              <ul className="mt-2 space-y-1">
                <li>• Point de contrôle qualité hebdomadaire</li>
                <li>• Pilotage lot par lot avec jalons validés</li>
                <li>• Reporting client structuré et actionnable</li>
              </ul>
            </div>

            {images.length > 1 ? (
              <div className="grid grid-cols-3 gap-2">
                {images.map((src, thumbIndex) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setIndex(thumbIndex)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg border ${thumbIndex === index ? "border-brand-amber ring-2 ring-brand-amber/40" : "border-brand-royal/20"}`}
                    aria-label={`Voir image ${thumbIndex + 1}`}
                  >
                    <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsAZSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = useMemo(
    () => constructionProjects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId],
  );

  return (
    <section id="projets-az" className="bg-mist py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Projets de A à Z"
          heading="Tout le portefeuille chantier, sans angle mort."
          description="Vue structurée A→Z avec statut, typologie, localisation et panel détaillé par projet."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {projectLetters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="rounded-md border border-brand-royal/20 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-brand-royal transition hover:bg-brand-royal hover:text-white"
            >
              {letter}
            </a>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {projectLetters.map((letter) => {
            const group = constructionProjects.filter((project) => project.letter === letter);
            return (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-32">
                <div className="mb-4 inline-flex items-center gap-3">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-royal text-sm font-bold text-white">
                    {letter}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-ink">Projets en {letter}</h3>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  {group.map((project) => (
                    <article
                      key={project.id}
                      className="overflow-hidden rounded-2xl border border-brand-royal/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      {project.media?.[0] ? (
                        <div className="relative aspect-[16/9]">
                          <Image
                            src={project.media[0]}
                            alt={project.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-brand-royal/10 px-2.5 py-1 text-xs font-semibold text-brand-royal">
                            {project.type}
                          </span>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[project.status]}`}>
                            {project.status}
                          </span>
                        </div>
                        <h4 className="mt-4 font-display text-2xl font-semibold text-ink">{project.name}</h4>
                        <p className="mt-1 text-sm font-medium text-brand-royal">{project.city}</p>
                        <p className="mt-3 text-sm leading-relaxed text-slate">{project.summary}</p>
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={() => setSelectedProjectId(project.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-brand-royal/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-royal transition hover:bg-brand-royal hover:text-white"
                          >
                            Ouvrir le panel chantier
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectPanel project={selectedProject} onClose={() => setSelectedProjectId(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

