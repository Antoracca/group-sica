import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sicaconstruction.com"),
  title: {
    default: "SICA Construction — Entreprise de construction à Abidjan et Yamoussoukro",
    template: "%s · SICA Construction",
  },
  description:
    "SICA CONSTRUCTION accompagne les particuliers, entreprises et investisseurs de la conception aux travaux de finition : étude de sol, étude de structure, villas, immeubles, géobéton, suivi de chantier. Abidjan et Yamoussoukro.",
  applicationName: "SICA Construction",
  icons: { icon: "/logo-construction.png", shortcut: "/logo-construction.png", apple: "/logo-construction.png" },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "SICA Construction",
    title: "SICA Construction",
    description:
      "L'exigence technique au service de vos constructions.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F9FD" },
    { media: "(prefers-color-scheme: dark)", color: "#031F68" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <head>
        <Script
          id="pageshow-reload"
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("pageshow", function(event) {
                if (event.persisted) {
                  window.location.reload();
                }
              });
            `,
          }}
        />
        {/* Hero — préchargement du premier visuel (LCP), prefetch des suivants */}
        <link rel="preload" as="image" href="/hero/chantier.jpg" fetchPriority="high" />
        <link rel="prefetch" as="image" href="/hero/ingenierie.jpg" />
        <link rel="prefetch" as="image" href="/hero/pilotage.jpg" />
      </head>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}

