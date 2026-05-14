import { Container, SectionHeader } from "@sica/ui";

const testimonials = [
  {
    id: "koné-jacqueville",
    quote:
      "Nous avons confié à SICA Construction notre villa duplex à Jacqueville. Suivi rigoureux du début à la réception, équipes sérieuses et réactives. Une réalisation qui dépasse nos attentes, livrée dans les délais.",
    author: "A. Koné",
    role: "Particulier",
    location: "Abidjan",
    pole: "SICA Construction",
  },
  {
    id: "coulibaly-pme",
    quote:
      "SICA Assistance nous a accompagnés dans la création de notre SARL et assure notre comptabilité depuis deux ans. Professionnalisme, disponibilité et suivi rigoureux — exactement ce dont une PME en croissance a besoin.",
    author: "M. Coulibaly",
    role: "Directeur général",
    location: "Abidjan",
    pole: "SICA Assistance",
  },
];

export function Testimonials() {
  return (
    <section className="bg-mist py-16 sm:py-24 lg:py-32">
      <Container>
        <SectionHeader
          eyebrow="Témoignages"
          heading="Ce que nos clients disent."
          description="Particuliers, PME et promoteurs immobiliers — ils nous font confiance pour leurs projets de construction et leurs démarches entrepreneuriales."
          align="center"
          className="max-w-2xl"
        />

        <ul className="mt-12 grid gap-6 sm:mt-14 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {testimonials.map((t) => (
            <li key={t.id}>
              <figure className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-7 sm:p-8 lg:p-10">
                {/* Large decorative quote mark */}
                <div aria-hidden className="font-display text-6xl font-bold leading-none text-brand-amber/30 select-none">
                  &ldquo;
                </div>

                <blockquote className="-mt-4 flex-1">
                  <p className="text-pretty text-base leading-relaxed text-ink sm:text-lg">
                    {t.quote}
                  </p>
                </blockquote>

                <figcaption className="flex items-center gap-4 border-t border-border pt-5">
                  {/* Avatar placeholder — replace with real photo if available */}
                  <div
                    aria-hidden
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-royal font-display text-sm font-semibold text-white sm:size-11"
                  >
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.author}</p>
                    <p className="text-xs text-slate">
                      {t.role} · {t.location}
                    </p>
                  </div>
                  <span className="ml-auto rounded-full bg-mist px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-widest text-brand-royal sm:text-xs">
                    {t.pole}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
