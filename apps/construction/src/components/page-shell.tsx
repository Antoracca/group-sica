import Image from "next/image";
import type { ReactNode } from "react";
import { Container, cn } from "@sica/ui";
import { ConstructionHeader } from "@/components/construction-header";
import { FooterConstruction } from "@/components/footer-construction";

/* Gabarit des pages intérieures de SICA Construction.
   Reprend le langage de l'accueil : fond indigo profond, photo de chantier SICA
   réelle en arrière-plan, sur-titre mono orange, titre display. */

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ConstructionHeader forceScrolled />
      <main id="main-content" className="bg-paper">
        {children}
      </main>
      <FooterConstruction />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-royal-900 pb-16 pt-40 text-white sm:pb-20 sm:pt-48">
      {image ? (
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-royal-900/95 via-brand-royal-900/70 to-brand-royal-900/30" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_88%_8%,rgba(247,127,0,0.20),transparent_70%)]" />
        </div>
      ) : null}
      <Container className="relative">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-amber">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.3rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">{intro}</p>
        ) : null}
        {children ? <div className="mt-9 flex flex-col gap-3 sm:flex-row">{children}</div> : null}
      </Container>
    </section>
  );
}

export function Block({
  id,
  eyebrow,
  title,
  intro,
  tone = "paper",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  tone?: "paper" | "white";
  children?: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-32 py-16 sm:py-20 lg:py-24", tone === "white" ? "bg-white" : "bg-paper")}>
      <Container>
        {eyebrow || title ? (
          <div className="mb-10 max-w-3xl lg:mb-14">
            {eyebrow ? (
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-amber">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.1] tracking-tight text-ink text-balance">
                {title}
              </h2>
            ) : null}
            {intro ? <p className="mt-6 text-pretty text-base leading-relaxed text-slate lg:text-lg">{intro}</p> : null}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

/* Carte à liseré orange, comme les cartes de l'accueil. */
export function Card({ title, children, className }: { title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8", className)}>
      <span aria-hidden className="absolute left-0 top-8 h-10 w-[3px] rounded-r bg-brand-amber" />
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      {children ? <div className="mt-3 text-sm leading-relaxed text-slate sm:text-[0.95rem]">{children}</div> : null}
    </div>
  );
}

export function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-amber" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* Note « à confirmer par la Direction » — exigée par le document du 17/11/2026. */
export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 rounded-lg border border-dashed border-brand-amber/50 bg-brand-amber/[0.06] px-4 py-3 text-xs leading-relaxed text-slate">
      {children}
    </p>
  );
}

/* Bandeau d'appel à l'action de fin de page. */
export function CtaBand() {
  return (
    <section className="bg-brand-royal-900 py-16 text-white sm:py-20">
      <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand-amber">
            Étudier • Concevoir • Construire
          </p>
          <p className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            L&apos;exigence technique au service de vos constructions.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href="/devis"
            className="inline-flex h-12 items-center justify-center rounded-[10px] bg-brand-amber px-7 text-sm font-semibold text-ink transition-colors hover:bg-brand-amber-600"
          >
            Demander un devis
          </a>
          <a
            href="tel:+2250709883293"
            className="inline-flex h-12 items-center justify-center rounded-[10px] border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Parler à un conseiller
          </a>
          <a
            href="/contact#rendez-vous"
            className="inline-flex h-12 items-center justify-center rounded-[10px] border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Prendre rendez-vous
          </a>
        </div>
      </Container>
    </section>
  );
}
