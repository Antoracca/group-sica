import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@sica/ui";

/*
  CTA final — porte la devise officielle sourcée du dossier technique.
  Fond royal, accent amber parcimonieux.
*/
export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-brand-royal-900 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_10%,rgba(243,146,0,0.18),transparent_70%)]"
      />
      <Container className="relative z-10 py-20 text-center sm:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand-amber">
          Groupe SICA
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-tight">
          Vos défis sont les nôtres : lancez-vous.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70">
          Parlons de votre projet. Un interlocuteur vous répond et vous indique les
          prochaines étapes, sans engagement.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/#contact"
            className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-brand-royal-900 transition-colors hover:bg-brand-amber hover:text-brand-royal-900"
          >
            Démarrer mon dossier
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href="tel:+2250709883293"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="size-4" />
            +225 07 09 88 32 93
          </a>
        </div>
      </Container>
    </section>
  );
}
