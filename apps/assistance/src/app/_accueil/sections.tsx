import Image from "next/image";
import { Building, Calculator, ChevronDown, FileSignature, FileSpreadsheet, Handshake, Landmark, LineChart, MapPinned, QrCode, ShieldCheck, Stamp } from "lucide-react";
import { cn } from "@sica/ui";
import { Btn, DarkFrame, Marquee, SectionHead, WRAP } from "@/components/kit";
import { Em } from "@/components/titres";
import { FormesExplorer } from "./formes-explorer";
import { FORMES_INTRO, INTERLOCUTEURS, PRESTATIONS_CABINET, REPERES } from "@/lib/contenu";
import { ASSISTANCE_FAQ } from "@/lib/faq";

/* §4.6 + §4.7 — Phrase manifeste et interlocuteurs. */

const ICONES_PRESTATIONS = [Calculator, FileSpreadsheet, QrCode, LineChart, Handshake];
const ICONES = [Landmark, Building, Stamp, ShieldCheck, FileSignature, MapPinned];

export function Manifeste() {
  return (
    <section className="py-24 sm:py-28">
      <div className={WRAP}>
        <SectionHead
          pill="Nos interlocuteurs"
          deco="points"
          title={
            <>
              Votre entreprise évolue. Vos statuts <Em>aussi.</Em>
            </>
          }
          intro="SICA ASSISTANCE centralise vos démarches juridiques, fiscales et sociales auprès des administrations, de la création à la gestion courante."
        />
        <ul className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {INTERLOCUTEURS.map((nom, i) => {
            const Icone = ICONES[i] ?? Landmark;
            return (
              <li key={nom} className="flex flex-col gap-3">
                <Icone aria-hidden strokeWidth={1.5} className="size-9 text-brand-royal" />
                <span className="f-titre text-lg font-bold leading-tight text-ink">{nom}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-12 text-sm text-slate">
          Notaire agréé ou sous seing privé · Plateformes e-Impôts et e-CNPS · Siège et succursale
        </p>
      </div>
    </section>
  );
}

/* §4.8 — Formes juridiques : grand cadre indigo, index typographique, « OHADA » en filigrane. */

export function FormesJuridiques() {
  return (
    <section id="formes" className="scroll-mt-28 px-3 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-brand-royal text-white">
        <span
          aria-hidden
          className="f-titre pointer-events-none absolute -bottom-[0.16em] right-[-0.03em] -z-10 select-none text-[clamp(7rem,25vw,24rem)] font-extrabold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.32)]"
        >
          OHADA
        </span>
        <div className={`${WRAP} pb-44 pt-20 sm:pb-64 sm:pt-28 lg:pb-[24rem]`}>
          <SectionHead
            dark
            pill="Formes juridiques"
            title={
              <>
                SARL, SAS, SA… quelle forme pour <Em>votre société ?</Em>
              </>
            }
            intro={FORMES_INTRO}
          />
          <FormesExplorer />
          <p className="mt-14 text-sm text-white/75">
            Pour être accompagné dans le choix et les démarches :{" "}
            <a href="tel:+2250709883293" className="font-semibold text-white underline-offset-4 hover:underline">(+225) 07 09 88 32 93</a> ·{" "}
            <a href="tel:+2252722247445" className="font-semibold text-white underline-offset-4 hover:underline">27 22 24 74 45</a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* §4.10 — Section sombre avec bandeau défilant des repères. */

export function Reperes() {
  return (
    <DarkFrame>
      <div className="py-20 sm:py-24">
        <div className={WRAP}>
          <SectionHead
            dark
            pill="Abidjan · Yamoussoukro"
            deco="points"
            title={
              <>
                Les règles ivoiriennes, <Em>on les applique chaque jour.</Em>
              </>
            }
            intro="OHADA, SYSCOHADA révisé, DGI, CNPS : les repères qui guident chacun de vos dossiers."
          />
        </div>
        <div className="mt-14 space-y-5 border-y border-white/10 py-8 sm:space-y-7">
          <Marquee items={REPERES.slice(0, 5)} sens="droite" />
          <Marquee items={REPERES.slice(5)} sens="gauche" />
        </div>
      </div>
    </DarkFrame>
  );
}

/* §4.11 — L'essentiel : tuiles + deux grandes cartes d'appel. */

export function Essentiel() {
  return (
    <section className="py-24 sm:py-28">
      <div className={WRAP}>
        <SectionHead
          pill="L'essentiel"
          title={
            <>
              Votre santé fiscale, <Em>suivie toute l&apos;année.</Em>
            </>
          }
          intro="Au quotidien comme en fin d'exercice, SICA ASSISTANCE vous accompagne au-delà de la création."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PRESTATIONS_CABINET.map((p, i) => {
            const IconeP = ICONES_PRESTATIONS[i] ?? Calculator;
            return (
            <div key={p.titre} className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-royal/[0.07] text-brand-royal">
                <IconeP aria-hidden className="size-5" />
              </span>
              <p className="mt-4 font-display text-base font-bold text-ink">{p.titre}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-slate">{p.texte}</p>
            </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[28px] bg-brand-royal p-8 text-white sm:p-10">
            <div className="relative z-10 max-w-[58%]">
              <p className="f-titre text-[1.9rem] font-extrabold leading-tight tracking-[-0.03em]">Rendez-vous avec <Em>un conseiller</Em></p>
              <p className="mt-3 text-sm text-white/80">
                À Abidjan (Cocody Centre / PMI) ou à Yamoussoukro (Morofé / 24 Ampoules), pour faire le point sur votre
                projet.
              </p>
              <Btn href="/contact?objet=rendez-vous" variant="white" className="mt-7">
                Réserver un échange
              </Btn>
            </div>
            <div className="absolute inset-y-0 right-0 w-[45%]">
              <Image src="/media/direction-bureau.jpeg" alt="La Direction du GROUPE SICA dans ses bureaux" fill sizes="25vw" className="object-cover object-[40%_30%]" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-royal via-brand-royal/30 to-transparent" />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[28px] bg-[#0A1130] p-8 text-white sm:p-10">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_60%_at_100%_0%,rgba(247,127,0,0.25),transparent_70%)]" />
            <div className="relative">
              <p className="f-titre text-[1.9rem] font-extrabold leading-tight tracking-[-0.03em]">Simulateur <Em>de création</Em></p>
              <p className="mt-3 max-w-md text-sm text-white/75">
                Répondez à quelques questions pour préparer votre projet de création avant d&apos;échanger avec un
                conseiller.
              </p>
              <Btn href="/simulateur" variant="orange" arrow className="mt-7">
                Lancer le simulateur
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* §4.12 — FAQ en accordéon (details natif, sans JavaScript). */

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 bg-[#F5F6F8] py-24 sm:py-28">
      <div className={cn(WRAP, "max-w-3xl")}>
        <SectionHead
          pill="Questions fréquentes"
          align="center"
          title={
            <>
              Vos questions, <Em>nos réponses.</Em>
            </>
          }
        />
        <div className="mt-12 space-y-3">
          {ASSISTANCE_FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200/70 bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[15px] font-semibold text-ink">
                {f.q}
                <ChevronDown aria-hidden className="size-5 shrink-0 text-slate transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 text-sm leading-relaxed text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
