import { Geist, Geist_Mono } from "next/font/google";

/*
  Système typographique SICA Construction — identité « ingénierie ».
  Geist (variable) en display + corps : grotesque néo-suisse, précision
  technique, excellent en tailles monumentales.
  Geist Mono : eyebrows, métriques, cotes et références projet — signature
  visuelle « plan d'exécution ».
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
