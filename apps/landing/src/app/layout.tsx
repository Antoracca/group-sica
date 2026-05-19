import type { Metadata, Viewport } from "next";
import { fontDisplay, fontBody } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sica.ci"),
  title: "SICA — Groupe SICA, Côte d'Ivoire",
  description:
    "Groupe SICA — Construction, Assistance, Conseil. La référence ivoirienne en BTP et accompagnement entrepreneurial.",
  applicationName: "SICA",
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "SICA",
    title: "SICA — Bientôt disponible",
    description:
      "La plateforme unifiée du Groupe SICA arrive. Retrouvez dès aujourd'hui nos pôles Construction et Assistance.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04060F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="min-h-screen bg-[#04060F] font-body text-white antialiased">
        {children}
      </body>
    </html>
  );
}
