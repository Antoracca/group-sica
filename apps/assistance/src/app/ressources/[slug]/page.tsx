import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { PageHero } from "@/components/page-hero";
import { ContentBlocks } from "@/components/content-blocks";
import { GUIDES, getGuide } from "@/lib/guides";

/*
  Guide Ressources détaillé. Une page pré-rendue par guide (generateStaticParams).
  Le contenu provient de lib/guides.ts et est rendu via ContentBlocks.
*/

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide introuvable" };
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <AssistanceHeader forceScrolled />
      <main id="main-content">
        <PageHero eyebrow={guide.eyebrow} title={guide.title} intro={guide.intro}>
          <Link
            href="/ressources"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-royal-700"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Toutes les ressources
          </Link>
        </PageHero>

        <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <div className="max-w-3xl space-y-14">
              {guide.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-6">
                    <ContentBlocks blocks={section.blocks} />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-brand-royal/10 bg-mist/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  Une question sur votre situation ?
                </h2>
                <p className="mt-1 max-w-md text-base leading-relaxed text-slate">
                  Notre équipe vous répond directement et vous oriente vers le bon
                  service.
                </p>
              </div>
              <a
                href="/contact"
                className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-brand-royal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
              >
                Nous contacter
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </div>
          </Container>
        </section>
      </main>
      <FooterAssistance />
    </>
  );
}
