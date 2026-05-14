import Image from "next/image";
import { Button, Container, Logo, SectionHeader, SiteHeader } from "@sica/ui";
import { mainNav } from "@/lib/nav";
import { Footer } from "@/components/footer";
import { Stats } from "./_sections/stats";
import { Realisations } from "./_sections/realisations";
import { News } from "./_sections/news";
import { Testimonials } from "./_sections/testimonials";
import { CtaBand } from "./_sections/cta-band";

export default function HomePage() {
  return (
    <>
      <SiteHeader
        brand="groupe"
        logo={
          <Logo
            brand="groupe"
            imgClassName="h-[3.25rem] w-auto select-none sm:h-14 lg:h-[3.75rem] xl:h-16"
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
        rightSlotScrolled={
          <Button asChild variant="accent" size="md">
            <a href="/contact">Nous écrire</a>
          </Button>
        }
      />

      <main id="main-content">
        <Hero />
        <Stats />
        <Pillars />
        <Realisations />
        <News />
        <Testimonials />
        <CtaBand />
      </main>

      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero — Section 1
   Fond vidéo YouTube (Abidjan skyline, ID: klBtpdKc5yc).
   Couches (bottom → top):
     z-0   YouTube iframe (HeroVideoBg)
     z-10  Overlay sombre — lisibilité texte
     z-20  Dégradé radial amber (atmosphère)
     z-20  Dégradé linéaire bas (lisibilité zone contenu)
     z-30  Contenu
───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-brand-royal-900 text-white"
    >
      {/* ── Image de fond ── */}
      <Image
        src="https://t4.ftcdn.net/jpg/01/87/89/01/240_F_187890135_TmEcNKzPCcpqp5wqV4GbaMcCdKVx0CbK.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />

      {/* ── Overlay sombre — lisibilité texte ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-black/45"
      />

      {/* ── Touche ambrée en haut ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(243,146,0,0.18),transparent_65%)]"
      />

      {/* ── Dégradé bas — zone texte plus lisible ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-3/4 bg-gradient-to-t from-black/65 via-black/25 to-transparent"
      />

      {/* ── Contenu ── */}
      <Container className="relative z-30 pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-28 lg:pt-48 xl:pb-32 xl:pt-56">

        {/* Titre principal */}
        <h1
          id="hero-heading"
          className="max-w-4xl font-display font-bold leading-[1.05] tracking-tight text-balance text-[clamp(2.25rem,8vw,6rem)] xl:text-[7rem]"
        >
          Vos défis sont les nôtres
          <span className="block text-brand-amber">: lancez-vous.</span>
        </h1>

        {/* Accroche */}
        <p className="mt-6 max-w-2xl text-pretty text-base text-white/85 sm:mt-8 sm:text-lg md:text-xl">
          Construction, génie civil, géobéton, assistance entrepreneuriale et
          comptable. Une équipe ivoirienne au service de vos projets immobiliers
          et de votre développement d&apos;entreprise.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
          {/* Bouton principal — lueur ambrée */}
          <Button
            asChild
            variant="accent"
            size="lg"
            className="w-full sm:w-auto shadow-[0_4px_24px_rgba(243,146,0,0.45)] hover:shadow-[0_6px_32px_rgba(243,146,0,0.60)] transition-shadow duration-300"
          >
            <a href="https://sicaconstruction.ci/devis">Demander un devis</a>
          </Button>
          {/* Bouton secondaire — verre dépoli élégant */}
          <Button
            asChild
            variant="on-dark-outline"
            size="lg"
            className="w-full sm:w-auto border-white/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/70 transition-all duration-300"
          >
            <a href="/realisations">Voir nos réalisations</a>
          </Button>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pillars — Deux pôles, une exigence
───────────────────────────────────────────────────────────── */
const pillars = [
  {
    name: "SICA Construction",
    tagline: "BTP · Génie civil · Géobéton",
    href: "https://sicaconstruction.ci",
    body: "Études architecturales et techniques, villas et immeubles résidentiels, charpente métallique, plomberie, électricité, VRD, location d'engins. De la fondation aux finitions, sur l'ensemble du territoire ivoirien.",
    cta: "Découvrir SICA Construction",
    accent: "Construction",
  },
  {
    name: "SICA Assistance",
    tagline: "Création d'entreprise · Conseil · Comptabilité",
    href: "https://sicaassistance.ci",
    body: "Création et modification d'entreprises, comptabilité générale, déclarations fiscales et sociales, conseil en gestion, suivi administratif des PME et accompagnement des porteurs de projets.",
    cta: "Découvrir SICA Assistance",
    accent: "Assistance",
  },
];

function Pillars() {
  return (
    <section
      aria-labelledby="pillars-heading"
      className="bg-paper py-16 sm:py-24 lg:py-32"
    >
      <Container>
        {/* Section header */}
        <SectionHeader
          eyebrow="Deux pôles, une exigence"
          heading="Construire le bâti et structurer l'entreprise."
          description="Le Groupe SICA réunit sous une même direction deux expertises complémentaires. Nos équipes vous accompagnent de la première pierre jusqu'à la pérennité de votre activité."
          headingAs="h2"
        />

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {pillars.map((pillar) => (
            <article
              key={pillar.name}
              className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-xl sm:gap-6 sm:p-9"
            >
              {/* Accent line top */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-brand-royal opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-royal sm:text-sm">
                  {pillar.tagline}
                </p>
                <h3 className="mt-2 font-display font-bold text-ink text-[clamp(1.5rem,3vw,2.25rem)] leading-tight">
                  {pillar.name}
                </h3>
              </div>

              <p className="flex-1 text-pretty text-sm leading-relaxed text-slate sm:text-base">
                {pillar.body}
              </p>

              <div className="mt-auto">
                <Button
                  asChild
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <a href={pillar.href} target="_blank" rel="noopener noreferrer">
                    {pillar.cta}
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
