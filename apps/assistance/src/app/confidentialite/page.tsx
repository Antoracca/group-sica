import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: true, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Vos données"
      title="Politique de confidentialité"
      intro="Nous attachons de l'importance à la protection de vos données. Cette page explique quelles informations nous collectons et comment nous les utilisons."
      updated="juin 2026"
      blocks={[
        {
          heading: "Données que nous collectons",
          paragraphs: [
            "Lorsque vous nous contactez ou que vous remplissez un formulaire, nous collectons les informations que vous nous transmettez : nom, prénom, téléphone, adresse e-mail, nom de votre entreprise et description de votre besoin.",
          ],
        },
        {
          heading: "Utilisation de vos données",
          paragraphs: [
            "Vos données servent uniquement à traiter votre demande, à vous recontacter et à vous accompagner dans vos démarches.",
            "Elles ne sont ni vendues, ni louées, ni transmises à des tiers à des fins commerciales.",
          ],
        },
        {
          heading: "Conservation",
          paragraphs: [
            "Vos données sont conservées le temps nécessaire au traitement de votre demande et au suivi de votre dossier, puis archivées conformément à nos obligations.",
          ],
        },
        {
          heading: "Vos droits",
          paragraphs: [
            "Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à secretariat@groupe-sica.com.",
            "Nous traitons votre demande dans les meilleurs délais.",
          ],
        },
      ]}
    />
  );
}
