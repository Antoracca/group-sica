import { Container } from "@sica/ui";

const stats = [
  {
    value: "2020",
    label: "Année de fondation",
    detail: "Immatriculés au RCCM d'Abidjan",
  },
  {
    value: "2",
    label: "Pôles d'activité",
    detail: "Construction · Assistance",
  },
  {
    value: "5",
    label: "Équipes terrain",
    detail: "Déployées partout en Côte d'Ivoire",
  },
  {
    value: "11+",
    label: "Projets réalisés",
    detail: "Abidjan, Jacqueville, Soubré, Bingerville…",
  },
];

export function Stats() {
  return (
    <section
      aria-label="Chiffres clés"
      className="bg-brand-royal py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <dl className="grid grid-cols-2 gap-px lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "flex flex-col gap-1.5 px-6 py-8 sm:px-8 sm:py-10 lg:py-12",
                /* vertical separator between items on lg */
                i > 0 ? "lg:border-l lg:border-white/15" : "",
                /* horizontal separator on mobile (bottom of top row) */
                i < 2 ? "border-b border-white/15 lg:border-b-0" : "",
                /* vertical separator on mobile/tablet (right of left col) */
                i % 2 === 0 ? "border-r border-white/15 lg:border-r-0" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <dt className="order-2 text-xs font-medium uppercase tracking-widest text-white/60 sm:text-sm">
                {stat.label}
              </dt>
              <dd
                className="order-1 font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tight text-white"
                aria-label={`${stat.value} — ${stat.label}`}
              >
                {stat.value}
              </dd>
              <p className="order-3 text-xs text-white/40 sm:text-sm">
                {stat.detail}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
