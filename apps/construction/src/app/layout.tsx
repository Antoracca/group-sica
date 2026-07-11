import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sicaconstruction.com"),
  title: {
    default: "SICA Construction — BTP, Génie Civil, Géobéton",
    template: "%s · SICA Construction",
  },
  description:
    "SICA Construction pilote vos chantiers de A à Z : études, gros oeuvre, second oeuvre, géobéton, suivi qualité et livraison.",
  applicationName: "SICA Construction",
  icons: { icon: "/logo-construction.png", shortcut: "/logo-construction.png", apple: "/logo-construction.png" },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "SICA Construction",
    title: "SICA Construction",
    description:
      "BTP, génie civil, géobéton, pilotage chantier. Une exécution maîtrisée du sol à la livraison.",
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
    { media: "(prefers-color-scheme: light)", color: "#f8f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1956" },
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

