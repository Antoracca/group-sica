import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://groupesica.ci"),
  title: {
    default: "Groupe SICA — Construction & Assistance en Côte d'Ivoire",
    template: "%s · Groupe SICA",
  },
  description:
    "Le Groupe SICA accompagne particuliers et entreprises en Côte d'Ivoire à travers deux pôles : SICA Construction (BTP, génie civil, géobéton) et SICA Assistance (création d'entreprise, conseil, comptabilité).",
  applicationName: "Groupe SICA",
  authors: [{ name: "Groupe SICA" }],
  generator: "Next.js",
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "Groupe SICA",
  },
  icons: {
    icon: "/logo-groupe.png",
    shortcut: "/logo-groupe.png",
    apple: "/logo-groupe.png",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1956" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <head>
        {/* ── Préchargement critique du hero ──────────────────────────────────
            Le poster est en image (priorité HIGH par défaut) → s'affiche
            instantanément. La vidéo se télécharge en parallèle dès le
            parse du HTML. Évite l'écran bleu de 2-3 s. */}
        <link rel="preload" as="image" href="/hero-poster.jpg" fetchPriority="high" />
        <link
          rel="preload"
          as="video"
          href="/hero.mp4"
          type="video/mp4"
          /* @ts-expect-error — attr HTML standard, types React partiels */
          fetchpriority="high"
        />

        {/* ── Google Fonts — chargement au niveau HTML (zéro CLS) ─────────────
            Chargées ici au lieu d'être @importées dans les composants client.
            Raison : les <style dangerouslySetInnerHTML> dans les composants
            "use client" s'injectent APRÈS l'hydratation React → les polices
            arrivent après le premier rendu → swap visible de la police système
            vers DM Serif/Barlow = CLS.
            En les plaçant dans le <head> du layout SSR, le navigateur les
            découvre au même moment que le HTML → zéro swap visible. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400&display=swap"
        />
      </head>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
