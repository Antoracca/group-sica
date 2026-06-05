import type { ReactNode } from "react";
import { Container } from "@sica/ui";

/*
  En-tête de page réutilisable pour les pages secondaires (services, contact,
  ressources, simulateur, légal). Thème light, sobre, registre administratif.
*/
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><path d='M48 0H0V48' fill='none' stroke='%231E2F8A' stroke-width='0.6'/></svg>\")",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_88%_0%,rgba(30,47,138,0.08),transparent_70%)]" />
      </div>

      <Container className="pb-12 pt-28 sm:pb-16 sm:pt-36 lg:pt-40">
        <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-brand-royal sm:text-xs">
          <span aria-hidden className="h-px w-8 bg-brand-amber" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-ink">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate sm:text-lg">
            {intro}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
