import Image from "next/image";
import { Button, Container } from "@sica/ui";
import { HeroEstimator } from "./hero-estimator";

export function HeroConstruction() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-brand-royal-900 text-white">
      <Image
        src="/EQUIPE2.jpeg"
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-royal-900/92 via-brand-royal-900/78 to-brand-royal-900/50" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_45%_at_85%_10%,rgba(243,146,0,0.24),transparent_70%)]" />

      <Container className="relative z-10 pb-16 pt-32 sm:pb-24 sm:pt-40 lg:pb-32 lg:pt-52">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-amber sm:text-sm">
              SICA Construction
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,6.8vw,5.8rem)] font-bold leading-[1.02] tracking-tight">
              On ne vend pas des plans.
              <span className="block text-brand-amber">On livre des ouvrages.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Études, exécution, contrôle qualité, reporting client. Chaque lot est tracé.
              Chaque décision est documentée. Chaque délai est piloté.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
                <a href="/devis">Démarrer un devis</a>
              </Button>
              <Button asChild variant="on-dark-outline" size="lg" className="w-full sm:w-auto">
                <a href="#projets-az">Voir les projets A-Z</a>
              </Button>
            </div>
          </div>

          <HeroEstimator />
        </div>
      </Container>
    </section>
  );
}
