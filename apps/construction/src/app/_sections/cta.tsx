import { Button, Container } from "@sica/ui";

export function CtaConstruction() {
  return (
    <section className="relative overflow-hidden bg-brand-royal py-16 text-white sm:py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_80%_at_80%_0%,rgba(243,146,0,0.3),transparent_70%)]" />
      <Container className="relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-amber">
              Prêt à lancer
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.8vw,3.6rem)] font-bold leading-tight">
              On transforme ton cahier des charges en plan d'exécution.
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/85 sm:text-base">
              Donne-nous ton type de projet, ta surface et ta localité. On te retourne
              une première lecture technique exploitable.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild variant="accent" size="lg" className="w-full justify-center">
              <a href="/devis">Demander un devis</a>
            </Button>
            <Button asChild variant="on-dark-outline" size="lg" className="w-full justify-center">
              <a href="tel:+2250709883293">Parler à un expert chantier</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

