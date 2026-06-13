import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { PageHero } from "@/components/page-hero";
import { ContentBlocks } from "@/components/content-blocks";
import { SERVICE_DETAILS, getServiceDetail } from "@/lib/service-details";

/*
  Page service détaillée. Une page pré-rendue par service ayant un dossier
  approfondi (lib/service-details.ts). Renvoie vers les guides Ressources liés.
*/

export function generateStaticParams() {
  return SERVICE_DETAILS.map((detail) => ({ slug: detail.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) return { title: "Service introuvable" };
  return {
    title: detail.metaTitle,
    description: detail.metaDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) notFound();

  return (
    <>
      <AssistanceHeader forceScrolled />
      <main id="main-content">
        <PageHero eyebrow={detail.eyebrow} title={detail.title} intro={detail.intro}>
          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-royal transition-colors hover:text-brand-royal-700"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Tous les services
          </Link>
        </PageHero>

        <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <div className="max-w-3xl space-y-14">
              {detail.sections.map((section) => (
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

            {/* Guides liés */}
            {detail.relatedGuides.length > 0 ? (
              <div className="mt-14 max-w-3xl border-t border-brand-royal/10 pt-10">
                <h2 className="font-display text-lg font-semibold text-ink">
                  Pour aller plus loin
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {detail.relatedGuides.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/ressources/${g.slug}`}
                        className="group inline-flex items-center gap-2 text-base font-medium text-brand-royal transition-colors hover:text-brand-royal-700"
                      >
                        <ArrowRight
                          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* CTA */}
            <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-brand-royal/10 bg-mist/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  Prêt à démarrer ?
                </h2>
                <p className="mt-1 max-w-md text-base leading-relaxed text-slate">
                  Exposez-nous votre situation, nous montons votre dossier avec vous.
                </p>
              </div>
              <a
                href="/contact"
                className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-brand-royal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
              >
                Démarrer mon dossier
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
