import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { PageHero } from "@/components/page-hero";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Ressources",
  description:
    "Guides pratiques pour entrepreneurs et PME : création d'entreprise, formes juridiques, pièces à fournir, obligations fiscales et sociales.",
};

export default function RessourcesPage() {
  return (
    <>
      <AssistanceHeader forceScrolled />
      <main id="main-content">
        <PageHero
          eyebrow="Ressources"
          title="Des repères clairs pour avancer sereinement."
          intro="Des guides pratiques pour y voir clair dans vos démarches de création, de gestion et de mise en conformité. Une question reste ? Notre équipe y répond directement."
        />

        <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {GUIDES.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Link
                    key={guide.slug}
                    href={`/ressources/${guide.slug}`}
                    className="group flex flex-col rounded-2xl border border-brand-royal/10 bg-white p-6 transition-colors hover:border-brand-royal/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-royal/5 text-brand-royal transition-colors group-hover:bg-brand-royal/10">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h2 className="mt-5 font-display text-base font-semibold leading-snug tracking-[-0.01em] text-ink">
                      {guide.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                      {guide.intro}
                    </p>
                    <span className="mt-5 inline-flex w-fit items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-brand-royal">
                      Lire le guide
                      <ArrowRight
                        className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 rounded-2xl border border-brand-royal/10 bg-mist/40 p-6 text-center sm:p-8">
              <h2 className="font-display text-xl font-semibold text-ink">
                Une question en attendant ?
              </h2>
              <p className="mx-auto mt-1 max-w-md text-base leading-relaxed text-slate">
                Notre équipe vous répond directement et vous oriente selon votre
                situation.
              </p>
              <a
                href="/contact"
                className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-full bg-brand-royal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
              >
                Nous contacter
              </a>
            </div>
          </Container>
        </section>
      </main>
      <FooterAssistance />
    </>
  );
}
