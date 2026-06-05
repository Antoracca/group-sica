import type { Metadata } from "next";
import {
  BookOpen,
  CalendarClock,
  FileText,
  ListChecks,
  Scale,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Ressources",
  description:
    "Guides pratiques pour entrepreneurs et PME : création d'entreprise, formes juridiques, pièces à fournir, obligations fiscales et sociales.",
};

interface Resource {
  icon: LucideIcon;
  title: string;
  description: string;
}

const RESOURCES: Resource[] = [
  {
    icon: ListChecks,
    title: "Checklist de création d'entreprise",
    description: "Les étapes et les pièces à réunir pour immatriculer votre société sans oubli.",
  },
  {
    icon: BookOpen,
    title: "Les formes juridiques en Côte d'Ivoire",
    description: "Comprendre les différences entre entreprise individuelle, SARL et SA avant de choisir.",
  },
  {
    icon: FileText,
    title: "Quelles pièces préparer ?",
    description: "La liste claire des documents demandés selon votre situation et votre activité.",
  },
  {
    icon: CalendarClock,
    title: "Calendrier des obligations",
    description: "Les principales échéances fiscales et sociales à garder en tête sur l'année.",
  },
  {
    icon: Wallet,
    title: "Comprendre votre fiscalité",
    description: "Les régimes et les déclarations qui concernent votre activité, expliqués simplement.",
  },
  {
    icon: Scale,
    title: "Vos obligations juridiques",
    description: "Statuts, registres et formalités annuelles à tenir pour rester en règle.",
  },
];

export default function RessourcesPage() {
  return (
    <>
      <AssistanceHeader forceScrolled />
      <main id="main-content">
        <PageHero
          eyebrow="Ressources"
          title="Des repères clairs pour avancer sereinement."
          intro="Nous préparons des guides pratiques pour vous aider à y voir clair dans vos démarches. Ils arrivent prochainement. En attendant, notre équipe répond à toutes vos questions."
        />

        <section className="bg-background pb-20 sm:pb-24 lg:pb-28">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {RESOURCES.map((r) => {
                const Icon = r.icon;
                return (
                  <article
                    key={r.title}
                    className="flex flex-col rounded-2xl border border-brand-royal/10 bg-white p-6"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-royal/5 text-brand-royal">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h2 className="mt-5 font-display text-base font-semibold leading-snug tracking-[-0.01em] text-ink">
                      {r.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">
                      {r.description}
                    </p>
                    <span className="mt-5 inline-flex w-fit items-center rounded-full bg-mist px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate">
                      Bientôt disponible
                    </span>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 rounded-2xl border border-brand-royal/10 bg-mist/40 p-6 text-center sm:p-8">
              <h2 className="font-display text-xl font-semibold text-ink">
                Une question en attendant ?
              </h2>
              <p className="mx-auto mt-1 max-w-md text-base leading-relaxed text-slate">
                Notre équipe vous répond directement et vous oriente selon votre situation.
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
