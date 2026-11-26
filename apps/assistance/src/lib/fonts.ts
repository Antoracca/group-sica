import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

/*
  Système typographique SICA Assistance.
  - Geist : corps de texte et interface (partagé avec le holding).
  - Bricolage Grotesque : grands titres (DESIGN.md §2), caractère affirmé.
  - Instrument Serif italique : mot mis en avant dans les titres, en orange.
*/

export const fontDisplay = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const fontBody = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const fontTitre = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-titre",
});

export const fontAccent = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-accent",
});
