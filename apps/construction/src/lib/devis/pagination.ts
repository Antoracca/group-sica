import type { DevisState, OptionLine, WorkLine } from "./types";

/*
  Moteur de pagination déterministe. Le document est modélisé comme un flux
  de blocs avec une hauteur estimée (px, feuille A4 à 96 dpi = 794×1123).
  Les blocs sont empaquetés page par page selon la hauteur utile ; les deux
  tableaux (corps d'état, options) se scindent ligne par ligne et ré-émettent
  leur en-tête en haut d'une nouvelle page (mention « suite »).
*/

export const SHEET_W = 794;
export const SHEET_H = 1123;
const USABLE = 840; // hauteur utile après en-tête + pied + marges internes

/*
  Hauteurs estimées = majorants du rendu réel (px). Les lignes de tableau
  prévoient une désignation + un détail pouvant occuper deux lignes : sans
  cette marge, une description longue débordait sur la feuille suivante.
*/
const H = {
  intro: 150,
  client: 188,
  projet: 250,
  tableHead: 54,
  tableRow: 70,
  totals: 230,
  conditions: 286,
  signature: 188,
  annexHead: 48,
  annexRow: 168,
} as const;

export type Block =
  | { kind: "intro" }
  | { kind: "client" }
  | { kind: "projet" }
  | { kind: "works-head"; continued: boolean }
  | { kind: "works-row"; line: WorkLine }
  | { kind: "options-head"; continued: boolean }
  | { kind: "options-row"; line: OptionLine }
  | { kind: "totals" }
  | { kind: "conditions" }
  | { kind: "signature" }
  | { kind: "annexes-head" }
  | { kind: "annexes-row"; ids: string[] };

export type Page = Block[];

class Packer {
  pages: Page[] = [[]];
  private used = 0;

  private newPage() {
    this.pages.push([]);
    this.used = 0;
  }

  private current(): Page {
    return this.pages[this.pages.length - 1]!;
  }

  fits(h: number): boolean {
    return this.used + h <= USABLE;
  }

  /** Démarre une page si `h` ne tient pas et que la page courante n'est pas vide. */
  ensure(h: number) {
    if (!this.fits(h) && this.current().length > 0) this.newPage();
  }

  place(block: Block, h: number) {
    this.ensure(h);
    this.current().push(block);
    this.used += h;
  }
}

export function buildPages(state: DevisState): Page[] {
  const p = new Packer();

  p.place({ kind: "intro" }, H.intro);
  p.place({ kind: "client" }, H.client);
  p.place({ kind: "projet" }, H.projet);

  const works = state.works.filter((w) => w.enabled);
  if (works.length > 0) {
    // Évite un en-tête orphelin en bas de page.
    p.ensure(H.tableHead + H.tableRow);
    p.place({ kind: "works-head", continued: false }, H.tableHead);
    works.forEach((line) => {
      if (!p.fits(H.tableRow)) {
        p.place({ kind: "works-head", continued: true }, H.tableHead);
      }
      p.place({ kind: "works-row", line }, H.tableRow);
    });
  }

  if (state.options.length > 0) {
    p.ensure(H.tableHead + H.tableRow);
    p.place({ kind: "options-head", continued: false }, H.tableHead);
    state.options.forEach((line) => {
      if (!p.fits(H.tableRow)) {
        p.place({ kind: "options-head", continued: true }, H.tableHead);
      }
      p.place({ kind: "options-row", line }, H.tableRow);
    });
  }

  p.place({ kind: "totals" }, H.totals);
  p.place({ kind: "conditions" }, H.conditions);
  p.place({ kind: "signature" }, H.signature);

  if (state.annexes.length > 0) {
    p.place({ kind: "annexes-head" }, H.annexHead);
    for (let i = 0; i < state.annexes.length; i += 3) {
      const ids = state.annexes.slice(i, i + 3).map((a) => a.id);
      p.place({ kind: "annexes-row", ids }, H.annexRow);
    }
  }

  return p.pages;
}
