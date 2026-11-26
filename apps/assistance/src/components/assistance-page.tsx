import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@sica/ui";
import { AssistanceHeader } from "@/components/assistance-header";
import { FooterAssistance } from "@/components/footer-assistance";
import { Btn, DarkFrame, SectionHead, WRAP } from "@/components/kit";
import { Parcours } from "@/components/parcours";
import { Kicker, SicaDots } from "@/components/titres";
import type { Etape } from "@/lib/contenu";

/* Gabarit des pages intérieures (DESIGN.md §5). */

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AssistanceHeader />
      <main id="main-content" className="bg-white">
        {children}
      </main>
      <FooterAssistance />
    </>
  );
}

export function InnerHero({
  pill,
  title,
  intro,
  image,
  children,
}: {
  pill: string;
  title: ReactNode;
  intro?: ReactNode;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-3 pt-3 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-[#0A1130] text-white">
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image src={image} alt="" fill priority sizes="100vw" className="sica-kenburns object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,17,48,0.78)_0%,rgba(10,17,48,0.7)_55%,rgba(10,17,48,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_30%,rgba(6,51,176,0.35),transparent_70%)]" />
        </div>
        <div className={cn(WRAP, "pb-16 pt-36 text-center sm:pb-24 sm:pt-44")}>
          <div className="flex justify-center">
            <Kicker dark>{pill}</Kicker>
          </div>
          <h1 className="f-titre mx-auto mt-6 max-w-4xl text-balance text-[clamp(2.5rem,5.6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
            {title}
          </h1>
          {intro ? (
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>
          ) : null}
          {children ? <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function Block({
  id,
  pill,
  title,
  intro,
  gray = false,
  children,
}: {
  id?: string;
  pill?: string;
  title?: ReactNode;
  intro?: ReactNode;
  gray?: boolean;
  children?: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-20 sm:py-24", gray && "bg-[#F5F6F8]")}>
      <div className={WRAP}>
        {title ? <SectionHead pill={pill} title={title} intro={intro} className="mb-12 sm:mb-16" /> : null}
        {children}
      </div>
    </section>
  );
}

/* Étapes numérotées dans une section sombre arrondie. */
export function StepsDark({
  id,
  pill,
  title,
  intro,
  etapes,
  note,
}: {
  id?: string;
  pill: string;
  title: ReactNode;
  intro?: ReactNode;
  etapes: readonly Etape[];
  note?: ReactNode;
}) {
  return (
    <DarkFrame id={id}>
      <div className={cn(WRAP, "py-20 sm:py-24")}>
        <SectionHead dark pill={pill} title={title} intro={intro} className="mb-12 sm:mb-16" />
        <Parcours etapes={etapes} />
        {note ? <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/60">{note}</p> : null}
      </div>
    </DarkFrame>
  );
}

/* Appel à l'action final, sombre et arrondi. */
export function CtaFinal({
  title = (
    <>
      Confiez vos formalités <span className="f-accent text-[1.08em] text-brand-amber">à SICA ASSISTANCE.</span>
    </>
  ),
  intro = "Un conseiller vous indique les pièces à réunir et la marche à suivre pour votre dossier.",
}: {
  title?: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="pt-20 sm:pt-24">
      <DarkFrame>
        <div className={cn(WRAP, "py-20 text-center sm:py-24")}>
          <SicaDots accent={[0, 9]} tone="clair" className="mx-auto mb-8 h-32 w-20" />
          <h2 className="f-titre mx-auto max-w-3xl text-balance text-[clamp(2.3rem,4.6vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.035em]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-white/70 sm:text-lg">{intro}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Btn href="/contact?objet=creation" arrow>
              Démarrer mon dossier
            </Btn>
            <Btn href="tel:+2250709883293" variant="outline-light">
              (+225) 07 09 88 32 93
            </Btn>
          </div>
          <p className="mt-6 text-xs text-white/50">(+225) 27 22 24 74 45 · groupesica@gmail.com</p>
        </div>
      </DarkFrame>
    </div>
  );
}
