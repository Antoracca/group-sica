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
            imageRenderer={({ src, alt, width, height, className }) => (
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority
                className={className}
              />
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

      <Container className="pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-28 lg:pt-48">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.625rem] uppercase tracking-widest text-white/80 backdrop-blur-sm sm:mb-6 sm:text-xs">
          <span className="size-1.5 rounded-full bg-brand-amber" aria-hidden />
          Groupe SICA · Abidjan &amp; Yamoussoukro
        </p>
        <h1 className="max-w-4xl font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(2.25rem,8vw,6rem)] xl:text-[7rem]">
          Vos défis sont les nôtres
          <span className="block text-brand-amber">: lancez-vous.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base text-white/80 sm:mt-8 sm:text-lg md:text-xl">
          Construction, génie civil, géobéton, assistance entrepreneuriale et comptable.
          Une équipe ivoirienne au service de vos projets immobiliers et de votre développement
          d&apos;entreprise.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
          <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
            <a href="https://sicaconstruction.ci/devis">Demander un devis</a>
          </Button>
          <Button asChild variant="on-dark-outline" size="lg" className="w-full sm:w-auto">
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
    <section className="bg-paper py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-amber sm:text-sm">
            Deux pôles, une exigence
          </p>
          <h2 className="mt-3 font-display font-bold tracking-tight text-balance text-ink text-[clamp(1.75rem,5vw,3rem)] sm:mt-4">
            Construire le bâti et structurer l&apos;entreprise.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 md:gap-8">
          {pillars.map((pillar) => (
            <article
              key={pillar.name}
              className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg sm:gap-6 sm:p-8"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-brand-royal sm:text-sm">
                  {pillar.tagline}
                </p>
                <h3 className="mt-2 font-display font-semibold text-ink text-[clamp(1.375rem,3.5vw,2rem)]">
                  {pillar.name}
                </h3>
              </div>
              <p className="text-pretty text-sm leading-relaxed text-slate sm:text-base">
                {pillar.body}
              </p>
              <div className="mt-auto">
                <Button asChild variant="outline" className="w-full sm:w-auto">
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
