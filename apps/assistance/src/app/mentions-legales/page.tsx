import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: true, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage
      eyebrow="Informations légales"
      title="Mentions légales"
      updated="juin 2026"
      blocks={[
        {
          heading: "Éditeur du site",
          paragraphs: [
            "Le site www.sicaassistance.com est édité par GROUPE SICA – SARLU, société à responsabilité limitée unipersonnelle de droit ivoirien.",
            "RCCM : CI-ABJ-03-2020-B13-17592. Capital social : 2 500 000 FCFA. Compte contribuable : 2054314X.",
            "Siège social : Cocody Centre / PMI, Abidjan, Côte d'Ivoire. Succursale : Morofé / 24 Ampoules, Yamoussoukro.",
            "Directeur de la publication : Ngoran Ivan.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Téléphones : (+225) 07 09 88 32 93 · (+225) 27 22 24 74 45 · (+225) 01 02 44 28 94.",
            "Adresse e-mail : groupesica@gmail.com.",
          ],
        },
        {
          heading: "Hébergement",
          paragraphs: [
            "Le site est hébergé par un prestataire d'hébergement web. Les coordonnées de l'hébergeur sont communiquées sur simple demande à l'adresse e-mail ci-dessus.",
          ],
        },
        {
          heading: "Propriété intellectuelle",
          paragraphs: [
            "L'ensemble des contenus présents sur ce site, à savoir les textes, les logos, les visuels et la charte graphique, est la propriété du Groupe SICA, sauf mention contraire.",
            "Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.",
          ],
        },
        {
          heading: "Responsabilité",
          paragraphs: [
            "Les informations fournies sur ce site le sont à titre indicatif. Les estimations présentées, notamment dans le simulateur, ne constituent pas un engagement contractuel et sont confirmées après étude de votre dossier.",
          ],
        },
      ]}
    />
  );
}
