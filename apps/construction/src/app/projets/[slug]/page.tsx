import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container, Button } from "@sica/ui";
import { ConstructionHeader } from "@/components/construction-header";
import { FooterConstruction } from "@/components/footer-construction";
import { constructionProjects, type ProjectItem } from "@/lib/projects";
import { BackButton } from "@/components/back-button";

/*
  Vue projet détaillée — colonne gauche éditoriale (titre, contexte,
  caractéristiques) en sticky desktop, colonne droite galerie scrollable.
  Pré-rendu statique par projet. Identité « ingénierie » : labels Geist Mono.
*/

const STATUS_STYLE: Record<ProjectItem["status"], string> = {
  Livré: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  "En cours": "bg-amber-500/15 text-amber-300 ring-amber-400/30",
  Étude: "bg-slate-400/15 text-slate-200 ring-slate-300/30",
};

const METHOD = [
  "Point de contrôle qualité hebdomadaire",
  "Pilotage lot par lot avec jalons validés",
  "Reporting client structuré et actionnable",
];

export function generateStaticParams() {
  return constructionProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = constructionProjects.find((p) => p.id === slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: `${project.name} · ${project.city}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = constructionProjects.find((p) => p.id === slug);
  if (!project) notFound();

  const images = project.media ?? [];

  return (
    <>
      <ConstructionHeader forceScrolled />

      <main id="main-content" className="bg-paper pb-24 pt-32 sm:pt-40">
        <Container>
          <BackButton />

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            {/* ── Colonne gauche — éditoriale, sticky desktop ── */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-royal/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-brand-royal">
                  {project.type}
                </span>
                <span
                  className={`rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] ring-1 ${STATUS_STYLE[project.status]}`}
                >
                  {project.status}
                </span>
              </div>

              <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
                {project.name}
              </h1>
              <p className="mt-3 font-mono text-sm uppercase tracking-[0.14em] text-brand-royal">
                {project.city}
              </p>

              <p className="mt-6 max-w-prose text-pretty text-base leading-relaxed text-slate">
                {project.summary}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-brand-royal/10 bg-brand-royal/10">
                {[
                  { k: "Localisation", v: project.city },
                  { k: "Typologie", v: project.type },
                  { k: "Statut", v: project.status },
                  { k: "Maîtrise d'œuvre", v: "SICA Construction" },
                ].map((row) => (
                  <div key={row.k} className="bg-paper p-4">
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-slate">
                      {row.k}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-ink">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-amber">
                  Logique d&apos;exécution
                </p>
                <ul className="mt-3 space-y-2">
                  {METHOD.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-amber" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9">
                <Button asChild variant="primary" size="lg">
                  <a href="/devis">Lancer un projet similaire</a>
                </Button>
              </div>
            </div>

            {/* ── Colonne droite — galerie scrollable ── */}
            <div className="space-y-5">
              {images.length > 0 ? (
                images.map((src, i) => (
                  <figure
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-royal/10 bg-mist"
                  >
                    <Image
                      src={src}
                      alt={`${project.name} — vue ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </figure>
                ))
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-dashed border-brand-royal/20 bg-mist text-center">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand-royal/60">
                    Visuels en préparation
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-slate">
                    Le reportage photo de ce chantier sera publié prochainement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>

      <FooterConstruction />
    </>
  );
}
