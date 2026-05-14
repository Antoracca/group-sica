import { Button, Container } from "@sica/ui";

export function CtaBand() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden bg-brand-royal-900 py-20 sm:py-28 lg:py-36"
    >
      {/* Subtle radial amber glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(243,146,0,0.18),transparent)]"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-amber sm:text-sm">
            Travaillons ensemble
          </p>

          <h2
            id="cta-heading"
            className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-balance text-white"
          >
            Parlons de votre projet.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-white/70 sm:mt-7 sm:text-lg">
            Construction, génie civil, création d&apos;entreprise, comptabilité —
            nos équipes sont disponibles six jours sur sept à Abidjan et
            Yamoussoukro.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
            <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
              <a href="https://sicaconstruction.ci/devis">Demander un devis</a>
            </Button>
            <Button
              asChild
              variant="on-dark-outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a href="/contact">Nous contacter</a>
            </Button>
          </div>

          {/* Contact strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:mt-12">
            <a
              href="tel:+2250709883293"
              className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M12.5 9.5c-.7-.7-1.9-.7-2.6 0l-.9.9C7.7 9.6 6 7.9 5.3 6.5L6.2 5.6c.7-.7.7-1.9 0-2.6L5 1.8C4.3 1.1 3.1 1.1 2.4 1.8L1.5 2.7C.4 3.8.6 5.6 1.9 8c1.2 2.2 3.1 4.1 5.3 5.3 2.4 1.3 4.2 1.5 5.3.4l.9-.9c.7-.7.7-1.9 0-2.6l-1.1-.7z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              +225 07 09 88 32 93
            </a>
            <a
              href="mailto:groupesica@gmail.com"
              className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect
                  x="1.5"
                  y="3"
                  width="11"
                  height="8"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <path
                  d="M1.5 4.5l5.5 4 5.5-4"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
              groupesica@gmail.com
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
