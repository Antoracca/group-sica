import { Container } from "@sica/ui";

const metrics = [
  { value: "11+", label: "Projets suivis", note: "Abidjan, Jacqueville, Soubré, Songon..." },
  { value: "5", label: "Corps de métier", note: "Gros oeuvre, second oeuvre, réseaux, contrôle, finitions" },
  { value: "24/6", label: "Disponibilité", note: "Suivi client continu + remontées chantier" },
  { value: "A→Z", label: "Pilotage", note: "Études, exécution, qualité, réception" },
];

export function ProofStrip() {
  return (
    <section className="bg-ink py-14 text-white">
      <Container>
        <dl className="grid gap-px md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <dd className="font-display text-5xl font-bold leading-none text-brand-amber">{metric.value}</dd>
              <dt className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">{metric.label}</dt>
              <p className="mt-2 text-sm text-white/55">{metric.note}</p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

