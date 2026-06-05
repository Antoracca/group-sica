import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { PageHero } from "@/components/page-hero";
import { ASSISTANCE_SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Création et modification d'entreprises, comptabilité, fiscalité, déclarations, conseil en gestion et accompagnement. Le détail des services de SICA Assistance.",
};

export default function ServicesPage() {
  return (
    <>
      <AssistanceHeader forceScrolled />
      <main id="main-content">
        <PageHero
          eyebrow="Nos services"
          title="L'administratif de votre entreprise, pris en charge de bout en bout."
          intro="Sept domaines d'intervention complémentaires. Vous mobilisez un seul service ou un accompagnement complet, selon votre situation."
        />

        <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
              {ASSISTANCE_SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.id}
                    id={service.id}
                    className="flex scroll-mt-28 flex-col rounded-2xl border border-brand-royal/10 bg-white p-6 sm:p-7"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-royal/5 text-brand-royal">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-brand-royal/40">
                        {service.num}
                      </span>
                    </div>

                    <h2 className="mt-5 font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-ink">
                      {service.label}
                    </h2>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-slate">
                      {service.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="inline-flex items-center gap-1.5 rounded-full border border-brand-royal/12 bg-mist/60 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-brand-royal"
                        >
                          <span aria-hidden className="size-1 shrink-0 rounded-full bg-brand-amber" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-brand-royal/10 bg-mist/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  Un besoin précis ? Parlons-en.
                </h2>
                <p className="mt-1 max-w-md text-base leading-relaxed text-slate">
                  Exposez-nous votre situation, nous vous orientons vers le bon service.
                </p>
              </div>
              <a
                href="/contact"
                className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-brand-royal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
              >
                Démarrer mon dossier
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </Container>
        </section>
      </main>
      <FooterAssistance />
    </>
  );
}
