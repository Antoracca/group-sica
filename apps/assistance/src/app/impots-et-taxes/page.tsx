import type { Metadata } from "next";
import { Block, CtaFinal, InnerHero, PageShell } from "@/components/assistance-page";
import { Btn, DarkFrame, SectionHead, WRAP } from "@/components/kit";
import { COTISATIONS_CNPS, IMPOTS_ENTREPRISES, IMPOTS_LOCAUX, IMPOTS_PARTICULIERS, REGIMES } from "@/lib/contenu";

export const metadata: Metadata = {
  title: "Impôts et taxes en Côte d'Ivoire — ITS, IS, TVA, TEE, RME, RSI, RNI",
  description:
    "Les impôts et taxes à payer en Côte d'Ivoire : ITS, CN, IGR pour les salariés ; IS 25 %, IMF, TVA 18 % pour les entreprises ; régimes TEE, RME, RSI, RNI ; impôts fonciers ; cotisations CNPS.",
  alternates: { canonical: "/impots-et-taxes" },
};

export default function ImpotsPage() {
  return (
    <PageShell>
      <InnerHero
        pill="Impôts et taxes"
        title={
          <>
            Les impôts et taxes à payer <span className="f-accent text-[1.08em] text-brand-amber">en Côte d&apos;Ivoire.</span>
          </>
        }
        intro="Particuliers salariés, entreprises, régimes d'imposition, impôts fonciers et cotisations sociales : les repères essentiels."
        image="/media/partenariat.jpeg"
      >
        <Btn href="/contact?objet=impots" arrow>
          Poser une question fiscale
        </Btn>
        <Btn href="#regimes" variant="outline-light">
          Les régimes d&apos;imposition
        </Btn>
      </InnerHero>

      <Block pill="Particuliers (salariés)" title="Impôts pour les particuliers" intro="Les retenues sont directement prélevées sur le salaire et comprennent trois prélèvements principaux.">
        <div className="grid gap-5 md:grid-cols-3">
          {IMPOTS_PARTICULIERS.map((i) => (
            <div key={i.sigle} className="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm">
              <p className="font-display text-3xl font-extrabold text-brand-royal">{i.sigle}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{i.titre}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate">{i.texte}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block gray pill="Entreprises" title="Impôts pour les entreprises" intro="Les taux varient selon le régime d'imposition de l'entreprise.">
        <div className="grid gap-5 md:grid-cols-3">
          {IMPOTS_ENTREPRISES.map((i) => (
            <div key={i.sigle} className="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-3xl font-extrabold text-brand-royal">{i.sigle}</p>
                <p className="font-display text-xl font-extrabold text-brand-amber-600">{i.valeur}</p>
              </div>
              <p className="mt-1 text-sm font-semibold text-ink">{i.titre}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate">{i.texte}</p>
            </div>
          ))}
        </div>
      </Block>

      <div className="pt-20 sm:pt-24" />
      <DarkFrame id="regimes">
        <div className={`${WRAP} py-20 sm:py-24`}>
          <SectionHead
            dark
            pill="Régimes d'imposition"
            title="Les régimes d'imposition en Côte d'Ivoire"
            intro="Le régime dépend du chiffre d'affaires annuel TTC de l'entreprise."
            className="mb-12"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {REGIMES.map((r) => (
              <article key={r.sigle} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="rounded-2xl bg-brand-amber px-3.5 py-2 font-display text-lg font-extrabold text-ink">{r.sigle}</span>
                  <p className="font-display text-lg font-bold leading-tight">{r.nom}</p>
                </div>
                <p className="mt-4 text-sm text-white/70">{r.cible}</p>
                <p className="mt-4 rounded-2xl bg-white/[0.06] p-4 text-sm text-white/85">
                  <span className="font-semibold text-brand-amber">Seuil d&apos;éligibilité : </span>
                  {r.seuil}
                </p>
                <ul className="mt-5 space-y-3">
                  {r.points.map((p) => (
                    <li key={p.titre} className="text-sm leading-relaxed text-white/70">
                      <span className="font-semibold text-white">{p.titre} : </span>
                      {p.texte}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </DarkFrame>

      <Block pill="Fonciers et locaux" title="Impôts fonciers et locaux">
        <div className="grid gap-5 md:grid-cols-2">
          {IMPOTS_LOCAUX.map((i) => (
            <div key={i.titre} className="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-sm">
              <p className="font-display text-lg font-bold text-ink">{i.titre}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{i.texte}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block gray pill="Cotisations sociales" title="Les cotisations CNPS" intro="Les employeurs et les employés versent des cotisations à la Caisse Nationale de Prévoyance Sociale (CNPS).">
        <div className="grid gap-5 md:grid-cols-3">
          {COTISATIONS_CNPS.map((c) => (
            <div key={c.titre} className="rounded-3xl border border-slate-200/70 bg-white p-7 text-center shadow-sm">
              <p className="font-display text-4xl font-extrabold tracking-tight text-brand-royal">{c.valeur}</p>
              <p className="mt-2 font-semibold text-ink">{c.titre}</p>
              <p className="mt-1 text-sm text-slate">{c.texte}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-slate">
          Ces repères sont donnés à titre informatif. Les règles fiscales évoluent chaque année avec l&apos;Annexe Fiscale :
          un conseiller vérifie votre situation avant toute déclaration.
        </p>
      </Block>

      <CtaFinal
        title={
          <>
            Le bon régime, <span className="f-accent text-[1.08em] text-brand-amber">les bonnes déclarations.</span>
          </>
        }
      />
    </PageShell>
  );
}
