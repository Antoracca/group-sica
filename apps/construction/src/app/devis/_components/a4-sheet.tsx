import type { ReactNode } from "react";
import { COMPANY } from "@/lib/devis/company";
import { SHEET_W, SHEET_H } from "@/lib/devis/pagination";

/*
  Coquille d'une feuille A4 (794×1123 px ≈ A4 96 dpi). En-tête logo + marque,
  filet ambre, zone de contenu, pied de page légal + numérotation.
  Dimensions fixes : la mise à l'échelle écran est gérée par le parent.
*/

export function A4Sheet({
  page,
  total,
  reference,
  children,
}: {
  page: number;
  total: number;
  reference: string;
  children: ReactNode;
}) {
  return (
    <div
      className="devis-page relative flex flex-col bg-white text-ink shadow-[0_8px_40px_-12px_rgba(13,26,74,0.35)] ring-1 ring-black/5"
      style={{ width: SHEET_W, height: SHEET_H }}
    >
      {/* En-tête */}
      <header className="flex items-start justify-between px-14 pt-12">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COMPANY.logo} alt={COMPANY.marque} className="h-11 w-auto" />
          <div className="border-l border-black/10 pl-3">
            <p className="font-display text-sm font-semibold leading-tight text-brand-royal">
              {COMPANY.marque}
            </p>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate">
              {COMPANY.baseline}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-base font-bold tracking-tight text-ink">
            DEVIS ESTIMATIF
          </p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate">
            {reference}
          </p>
        </div>
      </header>

      <div className="mx-14 mt-4 h-px bg-gradient-to-r from-brand-amber via-brand-amber/40 to-transparent" />

      {/* Contenu — min-h-0 + overflow-hidden : garde le pied de page en bas
          et empêche tout débordement entre les feuilles. */}
      <div className="min-h-0 flex-1 overflow-hidden px-14 py-6">{children}</div>

      {/* Pied de page */}
      <footer className="mx-14 mb-8 border-t border-black/10 pt-3">
        <div className="flex items-end justify-between gap-4">
          <p className="max-w-[78%] font-mono text-[0.55rem] leading-relaxed text-slate">
            {COMPANY.groupe} · RCCM {COMPANY.rccm} · Capital {COMPANY.capital} ·{" "}
            {COMPANY.siege} · {COMPANY.telephones[0]} · {COMPANY.email}
          </p>
          <p className="shrink-0 font-mono text-[0.6rem] font-semibold text-brand-royal">
            {String(page).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </footer>
    </div>
  );
}
