import { Container, SectionHeader } from "@sica/ui";

const steps = [
  {
    title: "01 · Diagnostic",
    text: "Visite site, étude du besoin, cadrage technique et budgétaire initial.",
  },
  {
    title: "02 · Études",
    text: "Étude de sol, esquisses, planification des lots, métrés prévisionnels.",
  },
  {
    title: "03 · Exécution",
    text: "Déploiement chantier, suivi cadence, coordination équipes et fournisseurs.",
  },
  {
    title: "04 · Contrôle",
    text: "Vérification qualité, conformité technique, ajustements et validations.",
  },
  {
    title: "05 · Livraison",
    text: "Réception client, levée des réserves, dossier final et accompagnement.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="bg-ink py-16 text-white sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Process chantier"
          heading="Chaque étape a son contrôle. Chaque contrôle a son livrable."
          description="C'est ce qui permet d'éviter les surprises tardives et de garder le chantier lisible côté client."
          headingClassName="text-white"
          className="max-w-3xl"
        />

        <ol className="mt-10 grid gap-4 lg:grid-cols-5">
          {steps.map((step) => (
            <li key={step.title} className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-amber">{step.title}</p>
              <p className="mt-3 text-sm text-white/80">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

