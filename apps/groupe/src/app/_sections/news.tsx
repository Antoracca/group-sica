import { Button, Container, SectionHeader } from "@sica/ui";

const articles = [
  {
    slug: "ngoran-ivan-meilleur-jeune-entrepreneur-ivoirien-2023",
    category: "Distinction",
    date: "2023",
    title: "Ngoran Ivan, Meilleur jeune entrepreneur ivoirien 2023",
    excerpt:
      "Le Directeur Général du Groupe SICA reçoit la distinction de Meilleur jeune entrepreneur ivoirien. Une reconnaissance de l'engagement et du dynamisme qui fondent l'identité du Groupe depuis sa création en 2020.",
    readTime: "3 min",
  },
  {
    slug: "geobeton-sica-innovation-structurale",
    category: "Innovation",
    date: "2024",
    title: "Le géobéton SICA : innovation structurale et économie de matériaux",
    excerpt:
      "Brique BTCS, agglo, parpaing, préfabriqué — le géobéton est le matériau signature de SICA Construction. Résistance accrue, délais réduits, coût maîtrisé : notre équipe technique vous explique ses avantages.",
    readTime: "5 min",
  },
  {
    slug: "antenne-yamoussoukro-ouverture",
    category: "Actualités",
    date: "2024",
    title: "SICA renforce sa présence à Yamoussoukro",
    excerpt:
      "L'ouverture de notre antenne à Yamoussoukro — Morofé, 24 ampoules — marque une étape importante dans notre déploiement national. Nos équipes sont désormais disponibles au cœur du pays pour vos projets de construction et d'assistance entrepreneuriale.",
    readTime: "2 min",
  },
];

export function News() {
  return (
    <section className="bg-paper py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-10 sm:gap-12 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Actualités"
            heading="Les dernières nouvelles du Groupe."
          />
          <div className="shrink-0">
            <Button asChild variant="outline" size="md">
              <a href="/actualites">Toutes les actualités</a>
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {articles.map((article) => (
            <li key={article.slug}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-mist px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-widest text-brand-royal sm:text-xs">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate">{article.date}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-[clamp(1.0625rem,2vw,1.25rem)] font-semibold leading-snug text-ink transition-colors group-hover:text-brand-royal">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-slate sm:text-base">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <a
                      href={`/actualites/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-royal underline-offset-4 hover:underline"
                      aria-label={`Lire : ${article.title}`}
                    >
                      Lire l&apos;article
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 7h8M8 4l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <span className="text-xs text-slate/60">{article.readTime}</span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
