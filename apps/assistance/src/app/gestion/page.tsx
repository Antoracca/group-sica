import type { Metadata } from "next";
import { Block, CtaFinal, InnerHero, PageShell } from "@/components/assistance-page";
import { Btn, DarkFrame, SectionHead, WRAP } from "@/components/kit";
import { GESTION_INTRO, GESTION_VOLETS, PRESTATIONS_CABINET } from "@/lib/contenu";

export const metadata: Metadata = {
  title: "Gestion comptable, fiscale et sociale — SYSCOHADA, DGI, CNPS",
  description:
    "Gestion comptable (SYSCOHADA révisé), fiscale (DGI, e-Impôts) et sociale (CNPS, e-CNPS) avec SICA ASSISTANCE : tenue de comptabilité, états financiers, FNE, paie, business plan.",
  alternates: { canonical: "/gestion" },
};

export default function GestionPage() {
  return (
    <PageShell>
      <InnerHero
        pill="Gestion comptable, fiscale et sociale"
        title={
          <>
            Comptabilité, fiscalité, social : <span className="f-accent text-[1.08em] text-brand-amber">le triptyque de votre gestion.</span>
          </>
        }
        intro={GESTION_INTRO}
        image="/media/equipe-bureau.jpeg"
      >
        <Btn href="/contact?objet=gestion" arrow>
          Confier ma gestion
        </Btn>
        <Btn href="#prestations" variant="outline-light">
          Nos prestations
        </Btn>
      </InnerHero>

      {GESTION_VOLETS.map((v, i) => (
        <Block key={v.id} id={v.id} gray={i % 2 === 1} pill={`${i === 0 ? "I" : i === 1 ? "II" : "III"}. ${v.titre}`} title={v.titre} intro={v.intro}>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-royal">Liste des activités</p>
              <ul className="mt-5 divide-y divide-slate-200/70">
                {v.activites.map((a) => (
                  <li key={a.titre} className="py-4 first:pt-0 last:pb-0">
                    <p className="font-semibold text-ink">{a.titre}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate">{a.texte}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] bg-brand-royal p-6 text-white sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-amber">Caractéristiques clés</p>
              <ul className="mt-5 space-y-5">
                {v.caracteristiques.map((c) => (
                  <li key={c.titre}>
                    <p className="font-semibold">{c.titre}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">{c.texte}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Block>
      ))}

      <div className="pt-6" />
      <DarkFrame id="prestations">
        <div className={`${WRAP} py-20 sm:py-24`}>
          <SectionHead
            dark
            pill="Le cabinet"
            title="Le suivi quotidien et annuel de votre santé fiscale"
            className="mb-12"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRESTATIONS_CABINET.map((p) => (
              <div key={p.titre} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
                <span aria-hidden className="block h-1 w-10 rounded-full bg-brand-amber" />
                <p className="mt-5 font-display text-lg font-bold">{p.titre}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkFrame>

      <CtaFinal
        title={
          <>
            Vos déclarations à jour, <span className="f-accent text-[1.08em] text-brand-amber">chaque mois.</span>
          </>
        }
        intro="Contrat de suivi comptable et fiscal, paie et déclarations CNPS : parlons de votre organisation."
      />
    </PageShell>
  );
}
