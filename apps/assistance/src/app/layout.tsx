import type { Metadata, Viewport } from "next";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sicaassistance.ci"),
  title: {
    default: "SICA Assistance — Création d'entreprise, comptabilité, conseil en Côte d'Ivoire",
    template: "%s · SICA Assistance",
  },
  description:
    "SICA Assistance, pôle administratif du Groupe SICA : création et modification d'entreprises, comptabilité, fiscalité, déclarations, conseil en gestion et accompagnement des entrepreneurs et PME.",
  applicationName: "SICA Assistance",
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "SICA Assistance",
    title: "SICA Assistance — Pôle administratif et conseil du Groupe SICA",
    description:
      "Création d'entreprise, comptabilité, fiscalité, conseil. Nous structurons vos démarches administratives en Côte d'Ivoire.",
  },
  icons: { icon: "/logo-assistance.png", shortcut: "/logo-assistance.png", apple: "/logo-assistance.png" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
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
