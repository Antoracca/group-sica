import type { DevisState, OptionLine, Totals, WorkLine } from "./types";

export function formatFcfa(value: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(
    Math.max(0, Math.round(value)),
  );
}

export function lineQty(line: WorkLine, surface: number): number {
  if (line.surfaceDriven) return surface > 0 ? surface : 0;
  return line.qty;
}

export function lineTotal(line: WorkLine | OptionLine, surface: number): number {
  if ("surfaceDriven" in line && line.surfaceDriven) {
    return line.pu * (surface > 0 ? surface : 0);
  }
  return line.pu * line.qty;
}

export function computeTotals(state: DevisState): Totals {
  const surface = state.projet.surface;
  const worksSum = state.works
    .filter((w) => w.enabled)
    .reduce((acc, w) => acc + lineTotal(w, surface), 0);
  const optionsSum = state.options.reduce(
    (acc, o) => acc + lineTotal(o, surface),
    0,
  );
  const sousTotal = worksSum + optionsSum;
  const remise = sousTotal * (state.finances.remisePct / 100);
  const htNet = sousTotal - remise;
  const tva = state.finances.tva ? htNet * 0.18 : 0;
  const ttc = htNet + tva;
  const avance = ttc * (state.finances.avancePct / 100);
  const solde = ttc - avance;
  return { sousTotal, remise, htNet, tva, ttc, avance, solde };
}

export function generateRef(date: Date = new Date()): string {
  const y = date.getFullYear();
  const seq = String(Math.floor(date.getTime() / 1000) % 10000).padStart(4, "0");
  return `SICA-DV-${y}-${seq}`;
}

export function formatDateFr(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
