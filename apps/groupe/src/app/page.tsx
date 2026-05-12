import { Button, Container, Logo, SiteHeader } from "@sica/ui";
import Image from "next/image";
import { mainNav } from "@/lib/nav";

export default function HomePage() {
  return (
    <>
      <SiteHeader
        brand="groupe"
        logo={
          <Logo
            brand="groupe"
            imageRenderer={({ src, alt, width, height }) => (
              <Image src={src} alt={alt} width={width} height={height} priority />
            )}
          />
        }
        nav={mainNav}
        rightSlotInitial={
          <span className="hidden text-xs uppercase tracking-widest text-white/80 xl:inline">
            Côte d&apos;Ivoire — depuis 2020
          </span>
        }
        rightSlotScrolled={
          <Button asChild variant="accent" size="md">
            <a href="/contact">Nous écrire</a>
          </Button>
        }
      />

      <main id="main-content">
        <Hero />
        <Pillars />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-brand-royal-900 text-white">
      {/* Fallback gradient — replaced by chantier hero image once provided by the client */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-royal-900 via-brand-royal to-brand-royal-700"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(243,146,0,0.25),transparent_60%)]"
      />

      <Container className="pb-20 pt-40 lg:pb-28 lg:pt-48">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-white/80 backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-brand-amber" aria-hidden />
          Groupe SICA · Abidjan & Yamoussoukro
        </p>
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
          Vos défis sont les nôtres
          <span className="block text-brand-amber">: lancez-vous.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-balance text-lg text-white/80 md:text-xl">
          Construction, génie civil, géobéton, assistance entrepreneuriale et comptable.
          Une équipe ivoirienne au service de vos projets immobiliers et de votre développement
          d&apos;entreprise.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="accent" size="lg">
            <a href="https://sicaconstruction.ci/devis">Demander un devis</a>
          </Button>
          <Button asChild variant="on-dark-outline" size="lg">
            <a href="/realisations">Voir nos réalisations</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      name: "SICA Construction",
      tagline: "BTP, génie civil, géobéton",
      href: "https://sicaconstruction.ci",
      body: "Études architecturales et techniques, villas et immeubles, charpente, plomberie, électricité, VRD, location d'engins. De la fondation aux finitions.",
    },
    {
      name: "SICA Assistance",
      tagline: "Création & gestion d'entreprises",
      href: "https://sicaassistance.ci",
      body: "Création et modification d'entreprises, comptabilité, fiscal, juridique, conseil en gestion, suivi administratif des PME et accompagnement des entrepreneurs.",
    },
  ];

  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-amber">
            Deux pôles, une exigence
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Construire le bâti et structurer l&apos;entreprise.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {pillars.map((pillar) => (
            <article
              key={pillar.name}
              className="group relative flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-brand-royal">
                  {pillar.tagline}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
                  {pillar.name}
                </h3>
              </div>
              <p className="text-base leading-relaxed text-slate">{pillar.body}</p>
              <div className="mt-auto">
                <Button asChild variant="outline">
                  <a href={pillar.href} target="_blank" rel="noopener">
                    Découvrir
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
