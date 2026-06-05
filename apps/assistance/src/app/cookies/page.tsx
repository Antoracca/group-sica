import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Gestion des cookies",
  robots: { index: true, follow: false },
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Cookies"
      title="Gestion des cookies"
      intro="Cette page explique l'usage des cookies sur le site SICA Assistance."
      updated="juin 2026"
      blocks={[
        {
          heading: "Qu'est-ce qu'un cookie",
          paragraphs: [
            "Un cookie est un petit fichier déposé sur votre appareil lors de votre visite. Il permet au site de fonctionner correctement et de mesurer son audience.",
          ],
        },
        {
          heading: "Cookies que nous utilisons",
          paragraphs: [
            "Cookies essentiels : nécessaires au fonctionnement du site, ils ne peuvent pas être désactivés.",
            "Cookies de mesure : ils nous aident à comprendre l'usage du site de façon anonyme afin de l'améliorer.",
          ],
        },
        {
          heading: "Votre choix",
          paragraphs: [
            "Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies ou être averti de leur dépôt.",
            "Le refus des cookies de mesure n'affecte pas l'accès aux contenus du site.",
          ],
        },
      ]}
    />
  );
}
