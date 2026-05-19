import type { Metadata, Viewport } from "next";
import { fontDisplay, fontBody } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sicaassistance.ci"),
  title: "SICA Assistance — Comptabilité, Fiscalité, Conseil PME",
  description:
    "SICA Assistance accompagne les entrepreneurs et PME ivoiriennes : comptabilité, fiscalité, paie, création d'entreprise. Bientôt disponible.",
  applicationName: "SICA Assistance",
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "SICA Assistance",
    title: "SICA Assistance — Bientôt disponible",
    description:
      "Notre pôle Assistance déploie ses services. Laissez votre e-mail pour être informé en premier.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1120",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body className="min-h-screen bg-[#0B1120] font-body text-white antialiased">
        {children}
      </body>
    </html>
  );
}
