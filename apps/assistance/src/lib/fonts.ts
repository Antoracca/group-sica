import { Geist, Geist_Mono } from "next/font/google";

/*
  Système typographique SICA Assistance — identité partagée avec le holding.
  Geist (display + corps) + Geist Mono (labels, références légales, données).
  On ne change jamais de police par site : la cohérence inter-sites prime.
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
