import Image from "next/image";
import { Container, SectionHeader } from "@sica/ui";
import { ConstructionHeader } from "@/components/construction-header";
import { FooterConstruction } from "@/components/footer-construction";
import { constructionProjects } from "@/lib/projects";

export default function RealisationsPage() {
  return (
    <>
      <ConstructionHeader forceScrolled />
      <main id="main-content" className="bg-paper pb-20 pt-40 sm:pt-44">
        <Container>
          <SectionHeader
            eyebrow="Portfolio chantier"
            heading="Réalisations Construction"
            description="Vue projet par projet: typologie, statut, localisation et visuels de référence."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {constructionProjects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-2xl border border-brand-royal/10 bg-white shadow-sm">
                {project.media?.[0] ? (
                  <div className="relative aspect-[16/10]">
                    <Image src={project.media[0]} alt={project.name} fill className="object-cover" />
                  </div>
                ) : null}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-amber">{project.type}</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{project.name}</h2>
                  <p className="mt-1 text-sm text-brand-royal">{project.city} · {project.status}</p>
                  <p className="mt-3 text-sm text-slate">{project.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </main>
      <FooterConstruction />
    </>
  );
}

