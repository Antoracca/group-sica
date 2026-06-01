import Image from "next/image";
import { Container, Logo, SiteHeader, StickyCtaMobile, getTopNav } from "@sica/ui";
import { mainNav } from "@/lib/nav";
import { links } from "@/lib/links";
import { Footer } from "@/components/footer";
import { HeroActionPanel } from "./_sections/hero-action-panel";
import { Stats } from "./_sections/stats";
import { Realisations } from "./_sections/realisations";
import { News } from "./_sections/news";
import { Testimonials } from "./_sections/testimonials";
import { CtaBand } from "./_sections/cta-band";
import { AnimatedHeroTitle } from "./_sections/animated-hero-title";
import { HeroVideo } from "./_sections/hero-video";
import { Pillars } from "./_sections/pillars";

/* ── Renderer next/image réutilisable ── */
function makeImageRenderer(priority = false) {
  return ({ src, alt, width, height, className }: {
    src: string; alt: string; width: number; height: number; className: string;
  }) => (
    <Image src={src} alt={alt} width={width} height={height} priority={priority} className={className} />
  );
}

export default function HomePage() {
  /* Top-nav adaptatif : on est sur Groupe → on n'affiche PAS "Groupe SICA"
     mais Construction + Assistance + utilitaires (Carrières, Partenaires, Contact). */
  const topNav = getTopNav("groupe", {
    constructionUrl: links.construction.base,
    assistanceUrl: links.assistance.base,
    groupeUrl: links.groupe.base,
    landingUrl: links.landing.base,
  });

  return (
    <>
      <SiteHeader
        brand="groupe"
        logo={
          <Logo
            brand="groupe"
            imgClassName="h-16 w-auto select-none sm:h-[4.5rem] lg:h-20 xl:h-24"
            imageRenderer={makeImageRenderer(true)}
          />
        }
        nav={mainNav}
        topNav={topNav}
      />

      <main id="main-content">
        {/* Hero + Panel — la carte chevauche le bas de la vidéo (effet "flottant sur l'image") */}
        <div className="relative">
          <Hero />
          {/* Le bandeau colle au bas de la hero — les onglets dépassent au-dessus via leur propre -mt */}
          <div className="relative z-40">
            <HeroActionPanel />
          </div>
        </div>
        <Pillars />
        <Stats />
        <Realisations />
        <News />
        <Testimonials />
        <CtaBand />
      </main>

      <Footer />

      {/* Sticky bottom CTA — mobile uniquement, apparaît après hero scrollé */}
      <StickyCtaMobile
        devisHref={links.construction.devis}
        phoneHref="tel:+2250709883293"
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Hero — Section 1
   Couches (bottom → top) :
     z-0   Image de fond plein écran (photo chantier / Abidjan skyline)
     z-10  Overlay sombre uniforme — lisibilité texte garantie
     z-20  Dégradé bas — fondu doux sur la zone de contenu uniquement
     z-30  Contenu (titre, accroche, CTAs)

   NOTE : aucun gradient radial artificiel — le rendu doit rester naturel.
   Lorsque le client fournira ses photos haute résolution, remplacer l'URL.
───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className={[
        "relative flex overflow-hidden bg-brand-royal-900 text-white",
        /*
          Mobile  : min-h-[78svh] → hero plus compact, moins de vidéo vide.
                    items-center → texte vertical-centered → équilibré.
          Desktop : min-h-[100svh] + items-center comme avant.
        */
        "min-h-[78svh] sm:min-h-[100svh]",
        "items-center",
      ].join(" ")}
    >
      {/* ── Vidéo de fond ── */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <HeroVideo />
      </div>

      {/* ── Overlay sombre — lisibilité texte ── */}
      <div className="absolute inset-0 z-10 bg-black/45" aria-hidden="true" />

      {/* ── Contenu ──
          Mobile  : pt-[5.25rem] dépasse le header fixe (76px) + 8px respir.
                    pb-6 minimal — le bas du hero est de la vidéo pure.
          Desktop : pt-20 / pb-36~52 — décale le centre vers le haut pour
                    laisser la place visulle à la carte d'onglets flottante.
      */}
      <Container className="relative z-30 pt-20 pb-8 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44 xl:pt-32 xl:pb-52">

        <AnimatedHeroTitle />

        {/* Mobile : version concise — deux blocs courts, hiérarchie nette */}
        <p className="mt-4 max-w-[24rem] text-pretty text-[1.0625rem] font-medium leading-snug text-white/95 sm:hidden">
          Vos chantiers et votre paperasse.
          <span className="mt-2 block text-[0.9375rem] font-normal leading-relaxed text-white/75">
            SICA s&apos;en occupe — depuis 2020 en Côte d&apos;Ivoire.
          </span>
        </p>

        {/* Tablette / Desktop : version étendue (original) */}
        <p className="hidden text-pretty leading-relaxed text-white/85 sm:mt-6 sm:block sm:max-w-2xl sm:text-base md:text-lg">
          Construire un immeuble ou monter sa boîte, c&apos;est le même combat : il faut des fondations solides. SICA s&apos;occupe de vos chantiers et de votre paperasse.
        </p>

      </Container>
    </section>
  );
}

