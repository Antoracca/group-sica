import type { Metadata, Viewport } from "next";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
