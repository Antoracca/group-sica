import { Button, Container, SectionHeader } from "@sica/ui";
import { Building2, DraftingCompass, HardHat, Layers3, Ruler, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: DraftingCompass,
    title: "Études & préconisations",
    text: "Étude de sol, esquisse, métrés, planification de lots et cahier d'exécution.",
  },
  {
    icon: Layers3,
    title: "Géobéton & structure",
    text: "Mise en oeuvre géobéton, fondations et structures adaptées aux contraintes terrain.",
  },
  {
    icon: Building2,
    title: "Bâtiment résidentiel",
    text: "Villas basses, duplex, immeubles, extensions, réhabilitation et optimisation des espaces.",
  },
  {
    icon: HardHat,
    title: "Pilotage de chantier",
    text: "Coordination équipes, planning journalier, points d'arrêt qualité et suivi client.",
  },
  {
    icon: Ruler,
    title: "Contrôle et métriques",
    text: "Métrés, conformité, traçabilité des étapes et alertes sur écarts de cadence.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité & livraison",
    text: "Protocoles sécurité, réception de lots et livraison avec dossier technique final.",
  },
];

export function ExpertisesSection() {
  return (
    <section id="expertises" className="bg-paper py-16 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Expertises métier"
          heading="Une exécution chantier pensée comme un système."
          description="Chaque phase a ses points de contrôle. Chaque point de contrôle a son livrable. C'est ce qui sécurise vos délais et votre budget."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="group rounded-2xl border border-brand-royal/10 bg-white p-6 shadow-[0_1px_0_rgba(30,47,138,0.04)] transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="inline-flex rounded-xl bg-brand-royal/8 p-3 text-brand-royal">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{card.text}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-10">
          <Button asChild variant="primary" size="lg">
            <a href="/devis">Configurer mon projet</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}

