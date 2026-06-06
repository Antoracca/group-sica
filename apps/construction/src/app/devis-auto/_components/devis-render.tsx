"use client";

import type { DevisResult } from "@sica/devis-engine";

/*
  Rendu du DQE produit par le moteur SICA. Affiché dans le panneau de droite
  comme un document tabulaire en gris/blanc, mêmes proportions qu'un feuillet
  A4 (sans les marges figées : ici la grille s'adapte au panneau).
*/

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n));
}

interface Props {
  devis: DevisResult;
  reference?: string;
}

export function DevisRender({ devis, reference }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_12px_40px_-18px_rgba(13,26,74,0.32)]">
      {/* En-tête */}
      <header className="flex items-start justify-between border-b border-ink/8 bg-paper px-6 py-5">
        <div>
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-brand-royal">
            SICA Construction
          </p>
          <h2 className="mt-0.5 font-display text-xl font-bold tracking-[-0.01em] text-ink">
            Devis estimatif
          </h2>
        </div>
        <div className="text-right">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate">
            Référence
          </p>
          <p className="mt-0.5 font-mono text-[0.78rem] font-semibold text-ink">
            {reference ?? "—"}
          </p>
        </div>
      </header>

      {/* Filet ambre — signature visuelle SICA */}
      <div aria-hidden className="h-[3px] bg-gradient-to-r from-brand-amber via-brand-amber/60 to-transparent" />

      <div className="px-6 py-6">
        {/* Lots */}
        <div className="space-y-7">
          {devis.lots.map((lot) => (
            <LotBlock key={lot.code} lot={lot} />
          ))}
        </div>

        {/* Totaux */}
        <div className="mt-8 rounded-xl bg-paper p-5">
          <Line label="Total Gros œuvre" value={devis.totalGrosOeuvre} />
          <Line label="Total Second œuvre" value={devis.totalSecondOeuvre} />
          <div className="mt-3 flex items-center justify-between rounded-lg bg-brand-royal px-4 py-3 text-white">
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
              Total estimatif HT
            </span>
            <span className="font-display text-lg font-bold tabular-nums">
              {fmt(devis.totalHT)} FCFA
            </span>
          </div>
          <p className="mt-3 text-right font-mono text-[0.65rem] uppercase tracking-[0.12em] text-slate">
            Ratio : {fmt(devis.ratioFcfaM2)} FCFA / m²
          </p>
        </div>

        {/* Mention légale */}
        <p className="mt-5 max-w-prose text-[0.72rem] leading-relaxed text-slate">
          Document généré automatiquement par les agents SICA à partir du plan fourni.
          Les quantités et prix unitaires sont des estimations basées sur la bibliothèque
          interne de SICA Construction&nbsp;; ils seront confirmés après visite de site
          et étude technique.
        </p>
      </div>
    </article>
  );
}

function LotBlock({ lot }: { lot: DevisResult["lots"][number] }) {
  return (
    <section>
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-mono text-[0.72rem] font-bold text-brand-amber">{lot.code}.</span>
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-brand-royal">
          {lot.titre}
        </h3>
        <span className="h-px flex-1 bg-ink/10" />
        <span className="font-mono text-[0.72rem] font-semibold tabular-nums text-ink">
          {fmt(lot.total)} FCFA
        </span>
      </div>

      <div className="space-y-4">
        {lot.sousLots.map((sl) => (
          <div key={sl.code}>
            <div className="mb-1.5 flex items-baseline gap-2">
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate">
                {sl.code}. {sl.titre}
              </span>
            </div>

            <ul className="overflow-hidden rounded-lg border border-ink/6">
              {sl.lignes.map((l, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1fr_3rem_4rem_5rem_6rem] items-center gap-2 border-b border-ink/5 px-3 py-2 text-[0.74rem] last:border-b-0 odd:bg-paper"
                >
                  <span className="truncate text-ink">{l.designation}</span>
                  <span className="text-center font-mono text-[0.66rem] uppercase tracking-wider text-slate">
                    {l.unite}
                  </span>
                  <span className="text-right font-mono tabular-nums text-slate">
                    {l.quantite.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-right font-mono tabular-nums text-slate">{fmt(l.pu)}</span>
                  <span className="text-right font-mono font-semibold tabular-nums text-ink">
                    {fmt(l.montant)}
                  </span>
                </li>
              ))}
              <li className="grid grid-cols-[1fr_auto] items-center gap-2 bg-brand-royal/5 px-3 py-2">
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand-royal">
                  Sous-total · {sl.titre}
                </span>
                <span className="font-mono text-[0.78rem] font-semibold tabular-nums text-ink">
                  {fmt(sl.sousTotal)} FCFA
                </span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Line({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-slate">{label}</span>
      <span className="font-mono font-semibold tabular-nums text-ink">{fmt(value)} FCFA</span>
    </div>
  );
}
