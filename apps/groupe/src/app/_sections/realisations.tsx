import { Button, Container, SectionHeader } from "@sica/ui";

const projects = [
  {
    slug: "siege-sgci-plateau",
    category: "Géobéton · Génie civil",
    name: "Siège SGCI — Plateau Abidjan",
    description:
      "Construction du siège social de la SGCI au Plateau d'Abidjan. Réalisation en géobéton, matériau signature de SICA Construction pour sa résistance et son économie de moyens.",
    location: "Plateau, Abidjan",
    gradient: "from-brand-royal-900 via-brand-royal to-brand-royal-700",
  },
  {
    slug: "villa-duplex-jacqueville",
    category: "Résidentiel · Bord de mer",
    name: "Villa Duplex — Jacqueville",
    description:
      "Conception et réalisation d'une villa duplex en bord de mer à Jacqueville. Études architecturales, béton armé, plomberie, électricité et aménagements extérieurs.",
    location: "Jacqueville, Abidjan",
    gradient: "from-[#0a1a3a] via-brand-royal-900 to-[#1a2f5a]",
  },
  {
    slug: "projet-dabre",
    category: "Résidentiel · Sous-sol",
    name: "Villa DABRÉ — Abidjan",
    description:
      "Villa basse avec sous-sol. Mission complète : étude de sol, terrassement, fondations spéciales, béton armé, second œuvre et finitions. Réalisation dans les délais contractuels.",
    location: "Abidjan",
    gradient: "from-[#0f1a40] via-[#162558] to-brand-royal-700",
  },
];

export function Realisations() {
  return (
    <section className="bg-mist py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-10 sm:gap-12 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Nos réalisations"
            heading="Des projets qui parlent d'eux-mêmes."
            description="De la fondation aux finitions, SICA Construction livre des ouvrages durables sur l'ensemble du territoire ivoirien."
          />
          <div className="shrink-0">
            <Button asChild variant="outline" size="md">
              <a href="/realisations">Voir tous les projets</a>
            </Button>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 sm:mt-14 sm:gap-7 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl">
                {/* Image zone — swap <div> for <Image> once photos are available */}
                <div
                  aria-hidden
                  className={`relative aspect-[4/3] w-full bg-gradient-to-br ${project.gradient} overflow-hidden`}
                >
                  {/* Real photo: replace this div with next/image once client provides assets */}
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/10 px-3 py-1 text-[0.625rem] font-medium uppercase tracking-widest text-white backdrop-blur-sm sm:text-xs">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6 sm:gap-4 sm:p-7">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-brand-royal sm:text-sm">
                      {project.location}
                    </p>
                    <h3 className="mt-1.5 font-display text-[clamp(1.125rem,2.5vw,1.375rem)] font-semibold leading-snug text-ink">
                      {project.name}
                    </h3>
                  </div>
                  <p className="flex-1 text-pretty text-sm leading-relaxed text-slate sm:text-base">
                    {project.description}
                  </p>
                  <div className="pt-1">
                    <a
                      href={`/realisations/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-royal underline-offset-4 hover:underline"
                      aria-label={`Voir le projet ${project.name}`}
                    >
                      Voir le projet
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                        className="transition-transform group-hover:translate-x-0.5"
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
