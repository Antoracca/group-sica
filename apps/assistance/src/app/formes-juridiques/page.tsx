import type { Metadata } from "next";
import { Block, CtaFinal, InnerHero, PageShell } from "@/components/assistance-page";
import { Btn } from "@/components/kit";
import { AUTRES_FORMES, FORMES, FORMES_INTRO } from "@/lib/contenu";

export const metadata: Metadata = {
  title: "Formes juridiques en Côte d'Ivoire — EI, SARL, SARLU, SA, SAS, SCI",
  description:
    "Comparatif des formes juridiques en Côte d'Ivoire (espace OHADA) : associés, capital minimum, responsabilité. EI, SARL / SARLU, SA, SAS / SASU, SCI, SNC, SCS.",
  alternates: { canonical: "/formes-juridiques" },
};

const LIGNES = [
  { cle: "associes", label: "Associés" },
  { cle: "capital", label: "Capital minimum" },
  { cle: "responsabilite", label: "Responsabilité" },
  { cle: "ideal", label: "Idéal pour" },
] as const;

export default function FormesPage() {
  return (
    <PageShell>
      <InnerHero
        pill="Formes juridiques · OHADA"
        title={
          <>
            Les formes juridiques <span className="f-accent text-[1.08em] text-brand-amber">en Côte d&apos;Ivoire.</span>
          </>
        }
        intro={FORMES_INTRO}
        image="/media/direction-bureau.jpeg"
      >
        <Btn href="/contact?objet=formes" arrow>
          Être conseillé
        </Btn>
      </InnerHero>

      <Block pill="Comparatif" title="Les principales structures juridiques">
        {/* Tableau sur grand écran */}
        <div className="hidden overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-sm lg:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#0A1130] text-white">
                <th className="w-40 p-5 font-semibold" scope="col">
                  <span className="sr-only">Critère</span>
                </th>
                {FORMES.map((f) => (
                  <th key={f.sigle} scope="col" className="p-5 align-top">
                    <span className="block font-display text-2xl font-extrabold">{f.sigle}</span>
                    <span className="mt-1 block text-xs font-normal text-white/70">{f.nom}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LIGNES.map((l, i) => (
                <tr key={l.cle} className={i % 2 ? "bg-[#F5F6F8]" : "bg-white"}>
                  <th scope="row" className="p-5 align-top text-xs font-semibold uppercase tracking-[0.12em] text-brand-royal">
                    {l.label}
                  </th>
                  {FORMES.map((f) => (
                    <td key={f.sigle} className="p-5 align-top leading-relaxed text-slate">
                      {f[l.cle]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cartes sur mobile et tablette */}
        <div className="grid gap-5 md:grid-cols-2 lg:hidden">
          {FORMES.map((f) => (
            <article key={f.sigle} className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <p className="font-display text-3xl font-extrabold text-brand-royal">{f.sigle}</p>
              <p className="text-sm font-semibold text-ink">{f.nom}</p>
              <dl className="mt-4 space-y-3 text-sm">
                {LIGNES.map((l) => (
                  <div key={l.cle}>
                    <dt className="text-xs font-semibold text-slate">{l.label}</dt>
                    <dd className="text-ink">{f[l.cle]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Block>

      <Block gray pill="Autres formes" title="Sociétés de personnes">
        <div className="grid gap-5 md:grid-cols-2">
          {AUTRES_FORMES.map((a) => (
            <div key={a.sigle} className="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm">
              <p className="font-display text-3xl font-extrabold text-brand-royal">{a.sigle}</p>
              <p className="text-sm font-semibold text-ink">{a.nom}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate">{a.texte}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate">
          Pour vous faire accompagner dans le choix et les démarches de création, contactez nos services officiels :{" "}
          <a href="tel:+2250709883293" className="font-semibold text-brand-royal">(+225) 07 09 88 32 93</a> /{" "}
          <a href="tel:+2252722247445" className="font-semibold text-brand-royal">27 22 24 74 45</a>.
        </p>
      </Block>

      <CtaFinal />
    </PageShell>
  );
}
