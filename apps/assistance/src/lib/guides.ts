import {
  BookOpen,
  CalendarClock,
  FileText,
  ListChecks,
  Scale,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { ContentBlock } from "@/components/content-blocks";

/*
  Contenu des guides Ressources de SICA Assistance.

  Source : dossier métier interne (création/modification d'entreprise, gestion
  comptable-fiscale-sociale, fiscalité et régimes d'imposition en Côte d'Ivoire).
  Le contenu est transcrit fidèlement ; seules la mise en forme et la
  ponctuation ont été normalisées (pas d'emojis, registre administratif).

  Les chiffres, seuils et taux proviennent du dossier source et doivent être
  revus à chaque nouvelle Annexe Fiscale (publiée en janvier).
*/

export interface Guide {
  slug: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; blocks: ContentBlock[] }[];
}

const CONTACT_BLOCK: ContentBlock = {
  type: "callout",
  title: "Se faire accompagner",
  text: "Pour être accompagné dans le choix de votre structure et l'ensemble des démarches, contactez nos services au +225 07 09 88 32 93 ou 27 22 24 74 45.",
};

export const GUIDES: Guide[] = [
  {
    slug: "creation-entreprise",
    icon: ListChecks,
    eyebrow: "Guide pratique",
    title: "Checklist de création d'entreprise",
    metaTitle: "Checklist de création d'entreprise en Côte d'Ivoire",
    metaDescription:
      "Les étapes et les pièces à réunir pour immatriculer votre société en Côte d'Ivoire : recueil des pièces, rédaction des actes, enregistrement, immatriculations, rattachement Impôts et CNPS.",
    intro:
      "SICA Assistance prend en charge l'ensemble des formalités administratives pour formaliser légalement votre activité, généralement sous 30 jours hors délais imputables à l'administration.",
    sections: [
      {
        heading: "Qu'est-ce que la création de société ?",
        blocks: [
          {
            type: "paragraph",
            text: "La création de société est l'acte juridique et administratif par lequel une ou plusieurs personnes, physiques ou morales, donnent naissance à une personne morale distincte, appelée entreprise ou société.",
          },
          {
            type: "deflist",
            items: [
              {
                term: "Personnalité juridique",
                def: "La société possède son propre nom (raison sociale), son propre patrimoine (argent et biens) et sa propre adresse (siège social).",
              },
              {
                term: "Séparation des patrimoines",
                def: "Elle protège les biens personnels des fondateurs en cas de dettes de l'entreprise, selon la forme juridique choisie.",
              },
              {
                term: "Capacité à agir",
                def: "La société peut signer des contrats, embaucher des salariés, posséder des biens ou agir en justice en son nom propre.",
              },
            ],
          },
        ],
      },
      {
        heading: "Les étapes de votre dossier",
        blocks: [
          {
            type: "steps",
            items: [
              {
                title: "Recueil des pièces et informations à fournir",
                points: [
                  "Raison sociale, nom commercial, sigle et enseigne de la société",
                  "Liste de l'ensemble des activités",
                  "Pièce d'identité et extrait de naissance de chaque associé",
                  "Casier judiciaire (moins de 3 mois) de chaque dirigeant",
                  "Répartition des 100 parts sociales entre associés",
                  "Siège social : ville, commune, quartier, lieu de référence, n° de lot ou d'îlot, facture SODECI ou CIE",
                  "Banque choisie, capital social, boîte postale, téléphone et e-mail",
                  "Chiffre d'affaires prévisionnel annuel",
                  "Nom, prénoms et téléphone du bailleur",
                ],
              },
              {
                title:
                  "Rédaction des actes juridiques, par notre notaire agréé ou sous seing privé",
                points: [
                  "Statuts",
                  "DSNV ou DSV (déclaration de souscription et de versement)",
                  "Contrat de bail",
                  "Procès-verbal (PV)",
                  "Règlement intérieur",
                  "Actes de la société",
                ],
              },
              {
                title: "Enregistrement des actes à la DGI",
                points: [
                  "Statuts, DSNV ou DSV, contrat de bail",
                  "PV et règlement intérieur",
                  "Actes de la société",
                ],
              },
              {
                title: "Immatriculations",
                points: [
                  "Registre du Commerce et du Crédit Mobilier (RCCM)",
                  "Procès-verbal (PV) de dépôt",
                  "Certificat d'Identifiant Unique (IDU) CEPICI",
                  "Annexe CEPICI",
                  "Avis de constitution CEPICI ou publication au Journal",
                ],
              },
              {
                title: "Rattachement au centre des impôts du siège social",
                points: [
                  "Visite du local par un agent du cadastre",
                  "Plan cadastral et rapport de localisation",
                  "Déclaration fiscale d'existence (DFE) signée et cachetée, en deux copies",
                  "Rattachement du Numéro de Compte Contribuable pour l'obtention de la DFE légale",
                  "Activation de la plateforme e-Impôts",
                  "Proposition de contrat de suivi comptable pour la gestion de vos déclarations mensuelles",
                ],
              },
              {
                title: "Rattachement au centre de la CNPS du siège social",
                points: [
                  "Visite du local par un agent de géolocalisation",
                  "Dépôt de chaque copie des documents légaux de la société",
                  "Remplissage des formulaires employeur et travailleurs signés et cachetés",
                  "Rattachement du Numéro CNPS légal",
                  "Activation de la plateforme e-CNPS",
                  "Déclaration d'au minimum deux salariés",
                  "Proposition de contrat de suivi comptable et fiscal pour la gestion de vos déclarations mensuelles",
                ],
              },
            ],
          },
          CONTACT_BLOCK,
        ],
      },
    ],
  },
  {
    slug: "formes-juridiques",
    icon: BookOpen,
    eyebrow: "Guide pratique",
    title: "Les formes juridiques en Côte d'Ivoire",
    metaTitle: "Formes juridiques en Côte d'Ivoire : EI, SARL, SA, SAS",
    metaDescription:
      "Comprendre les principales formes juridiques régies par l'OHADA : entreprise individuelle, SARL, SA, SAS, SNC et SCS. Associés, capital minimum et responsabilité.",
    intro:
      "En Côte d'Ivoire, les formes juridiques sont régies par l'espace OHADA. Les choix les plus courants vont de l'entreprise individuelle pour les activités en nom propre à la SA pour les grands projets, en passant par la SARL pour les PME et la SAS pour davantage de flexibilité.",
    sections: [
      {
        heading: "Les principales structures",
        blocks: [
          {
            type: "table",
            caption: "Comparatif des formes juridiques",
            head: ["Forme", "Associés", "Capital minimum", "Responsabilité"],
            rows: [
              [
                "Entreprise Individuelle (EI)",
                "1 personne physique",
                "Aucun",
                "Illimitée (patrimoine personnel engagé)",
              ],
              [
                "SARL / SARLU",
                "1 à 100 personnes",
                "100 000 FCFA",
                "Limitée aux apports",
              ],
              [
                "Société Anonyme (SA)",
                "1 (SA unipersonnelle) ou 2 et plus",
                "10 000 000 FCFA",
                "Limitée aux apports",
              ],
              [
                "SAS / SASU",
                "1 ou plusieurs",
                "Aucun",
                "Limitée aux apports",
              ],
            ],
          },
          {
            type: "deflist",
            items: [
              {
                term: "Entreprise Individuelle (EI)",
                def: "Idéale pour les petits commerces, les artisans et les consultants indépendants.",
              },
              {
                term: "SARL (et SARLU)",
                def: "Idéale pour la majorité des PME et des projets commerciaux classiques.",
              },
              {
                term: "Société Anonyme (SA)",
                def: "Idéale pour les très grandes entreprises, les banques ou les projets nécessitant d'importants financements.",
              },
              {
                term: "SAS (et SASU)",
                def: "Idéale pour les startups, l'innovation et les entreprises ayant besoin d'une grande souplesse statutaire ou de lever des fonds.",
              },
            ],
          },
        ],
      },
      {
        heading: "Autres formes juridiques",
        blocks: [
          {
            type: "deflist",
            items: [
              {
                term: "Société en Nom Collectif (SNC)",
                def: "Tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales.",
              },
              {
                term: "Société en Commandite Simple (SCS)",
                def: "Divisée entre associés commandités (responsables indéfiniment) et commanditaires (responsables à hauteur de leurs apports).",
              },
            ],
          },
          CONTACT_BLOCK,
        ],
      },
    ],
  },
  {
    slug: "pieces-a-fournir",
    icon: FileText,
    eyebrow: "Guide pratique",
    title: "Quelles pièces préparer ?",
    metaTitle: "Pièces à fournir pour créer son entreprise en Côte d'Ivoire",
    metaDescription:
      "La liste claire des documents et informations demandés pour constituer votre société : identité des associés, siège social, capital, activités et coordonnées.",
    intro:
      "Pour constituer votre dossier sans aller-retour inutile, voici l'ensemble des pièces et informations à réunir en amont.",
    sections: [
      {
        heading: "Informations sur la société",
        blocks: [
          {
            type: "list",
            items: [
              "Raison sociale, nom commercial, sigle et enseigne de la société",
              "Liste de l'ensemble des activités",
              "Répartition des 100 parts sociales entre associés",
              "Capital social et banque choisie",
              "Boîte postale, téléphone et e-mail",
              "Chiffre d'affaires prévisionnel annuel",
            ],
          },
        ],
      },
      {
        heading: "Pièces des associés et dirigeants",
        blocks: [
          {
            type: "list",
            items: [
              "Pièce d'identité de chaque associé",
              "Extrait de naissance de chaque associé",
              "Casier judiciaire de moins de 3 mois pour chaque dirigeant",
            ],
          },
        ],
      },
      {
        heading: "Siège social",
        blocks: [
          {
            type: "list",
            items: [
              "Ville, commune et quartier",
              "Lieu de référence et n° de lot ou d'îlot du local",
              "Facture SODECI ou CIE",
              "Nom, prénoms et téléphone du bailleur",
            ],
          },
          CONTACT_BLOCK,
        ],
      },
    ],
  },
  {
    slug: "calendrier-obligations",
    icon: CalendarClock,
    eyebrow: "Guide pratique",
    title: "Calendrier des obligations",
    metaTitle: "Calendrier des obligations fiscales et sociales",
    metaDescription:
      "Les principales échéances fiscales et sociales à garder en tête sur l'année : déclarations mensuelles, acomptes, liasse fiscale, patente et Annexe Fiscale.",
    intro:
      "La gestion d'une entreprise s'articule autour d'échéances régulières. Voici les principaux rendez-vous à anticiper sur l'année.",
    sections: [
      {
        heading: "Obligations mensuelles",
        blocks: [
          {
            type: "list",
            items: [
              "Télé-déclaration via e-Impôts de la TVA, de la TSE, des taxes sur les salaires (ITS), des taxes FDFP et des retenues à la source",
              "Versement mensuel pour les régimes concernés, équivalent à un douzième (1/12) de l'impôt annuel estimé",
              "Télé-déclaration des cotisations sociales à la CNPS, mensuelle ou trimestrielle selon votre situation",
            ],
          },
        ],
      },
      {
        heading: "Obligations annuelles",
        blocks: [
          {
            type: "list",
            items: [
              "Acomptes provisionnels de l'Impôt sur les Sociétés (IS) ou de l'impôt BIC au cours de l'année",
              "Inventaire physique des stocks en fin d'exercice",
              "Clôture des comptes et production des états financiers (bilan, compte de résultat, TFT, notes annexes)",
              "Dépôt de la liasse fiscale à la DGI, généralement avant le 30 avril ou le 30 mai",
              "Déclaration annuelle de la contribution des patentes et licences",
            ],
          },
          {
            type: "callout",
            title: "À retenir",
            text: "L'exercice comptable est calqué sur l'année civile, du 1er janvier au 31 décembre. Les règles fiscales évoluent chaque année via la nouvelle Annexe Fiscale, publiée en janvier : vérifiez les seuils et taux applicables à votre situation.",
          },
        ],
      },
    ],
  },
  {
    slug: "fiscalite",
    icon: Wallet,
    eyebrow: "Guide pratique",
    title: "Comprendre votre fiscalité",
    metaTitle: "Fiscalité et régimes d'imposition en Côte d'Ivoire",
    metaDescription:
      "Les impôts des particuliers et des entreprises, les régimes d'imposition (TEE, RME, RSI, RNI) et les cotisations sociales CNPS en Côte d'Ivoire, expliqués simplement.",
    intro:
      "Comprendre les impôts qui concernent votre activité et le régime dont vous relevez vous aide à anticiper vos obligations et à éviter les pénalités.",
    sections: [
      {
        heading: "Impôts des particuliers (salariés)",
        blocks: [
          {
            type: "paragraph",
            text: "Les retenues sont directement prélevées sur le salaire et comprennent trois prélèvements principaux.",
          },
          {
            type: "deflist",
            items: [
              {
                term: "ITS",
                def: "Impôt sur le Traitement et Salaire, calculé selon un barème progressif.",
              },
              {
                term: "Contribution Nationale (CN)",
                def: "Taxe prélevée pour l'effort de développement du pays.",
              },
              {
                term: "IGR",
                def: "Impôt Général sur le Revenu, progressif, calculé en fonction du revenu global et des charges familiales.",
              },
            ],
          },
        ],
      },
      {
        heading: "Impôts des entreprises",
        blocks: [
          {
            type: "deflist",
            items: [
              {
                term: "Impôt sur les Sociétés (IS)",
                def: "Taux de droit commun de 25 % sur les bénéfices réalisés, pour les régimes du réel.",
              },
              {
                term: "Impôt Minimum Forfaitaire (IMF)",
                def: "Pour les entreprises au réel, calculé sur le chiffre d'affaires de l'exercice précédent.",
              },
              {
                term: "TVA",
                def: "Taxe sur la Valeur Ajoutée, au taux normal de 18 %.",
              },
            ],
          },
        ],
      },
      {
        heading: "Les régimes d'imposition",
        blocks: [
          {
            type: "table",
            caption: "Régimes d'imposition selon le chiffre d'affaires",
            head: ["Régime", "Seuil de CA annuel TTC", "Imposition", "TVA"],
            rows: [
              [
                "TEE (Taxe d'État de l'Entreprenant)",
                "5 000 001 à 50 000 000 FCFA",
                "4 % (commerce) ou 5 % (services) ; réduit à 2 % / 2,5 % avec un CGA",
                "Non collectée",
              ],
              [
                "RME (Régime des Microentreprises)",
                "50 000 001 à 200 000 000 FCFA",
                "7 % du CA ; réduit à 5 ou 6 % avec un CGA ou un expert-comptable conventionné",
                "Non collectée",
              ],
              [
                "RSI (Régime Simplifié d'Imposition)",
                "50 à 200 millions FCFA",
                "IS de 25 % sur le bénéfice net (ou IMF)",
                "Trimestrielle",
              ],
              [
                "RNI (Régime du Réel Normal)",
                "Supérieur à 200 millions FCFA",
                "IS de 25 % sur le bénéfice réel",
                "Mensuelle",
              ],
            ],
          },
          {
            type: "callout",
            text: "En dessous de 5 millions FCFA de chiffre d'affaires, l'entreprise relève de la Taxe Communale de l'Entreprenant (TCE).",
          },
          {
            type: "paragraph",
            text: "Pour la TEE et le RME, l'impôt a un caractère libératoire : il englobe et remplace l'impôt sur le bénéfice et la patente. Le RNI dépend généralement de la Direction des Grandes Entreprises (DGE) ou de la Direction des Moyennes Entreprises (DME) de la DGI.",
          },
        ],
      },
      {
        heading: "Cotisations sociales (CNPS)",
        blocks: [
          {
            type: "table",
            caption: "Cotisations CNPS",
            head: ["Cotisation", "Taux", "À la charge de"],
            rows: [
              ["Pension (retraite)", "7,7 %", "Employeur"],
              ["Allocations familiales", "5,75 %", "Employeur"],
              [
                "Accidents du travail",
                "2 % à 5 % selon la branche",
                "Employeur",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "Au total, les charges sociales représentent environ 12 % à 14 % à la charge de l'employeur et 6,6 % à la charge du salarié.",
          },
        ],
      },
      {
        heading: "Impôts fonciers et locaux",
        blocks: [
          {
            type: "deflist",
            items: [
              {
                term: "Impôt sur le patrimoine foncier",
                def: "Payé par les propriétaires de biens immobiliers.",
              },
              {
                term: "Taxes communales et patentes",
                def: "Établies en fonction de la nature et de la localisation de votre activité professionnelle.",
              },
            ],
          },
          CONTACT_BLOCK,
        ],
      },
    ],
  },
  {
    slug: "obligations-juridiques",
    icon: Scale,
    eyebrow: "Guide pratique",
    title: "Vos obligations juridiques",
    metaTitle: "Obligations juridiques et modification de société",
    metaDescription:
      "Modification de société, mise en conformité et obligations comptables : ce qu'il faut tenir à jour pour rester en règle en Côte d'Ivoire.",
    intro:
      "Au-delà de la création, votre société doit rester conforme tout au long de sa vie. Statuts à jour, formalités de modification et comptabilité régulière en sont les piliers.",
    sections: [
      {
        heading: "Modifier votre société",
        blocks: [
          {
            type: "paragraph",
            text: "La modification de société est l'acte juridique et administratif par lequel une entreprise change l'une des caractéristiques de son identité ou de son fonctionnement inscrites dans ses statuts d'origine.",
          },
          {
            type: "deflist",
            items: [
              {
                term: "Mise à jour légale",
                def: "Adapter les statuts à l'évolution réelle de l'entreprise : croissance, nouveaux associés, déménagement.",
              },
              {
                term: "Information des tiers",
                def: "Informer légalement l'État (impôts, greffe), les banques et les partenaires des changements internes.",
              },
              {
                term: "Maintien de la conformité",
                def: "Éviter les sanctions juridiques ou fiscales en cas de décalage entre la réalité et les documents officiels.",
              },
            ],
          },
        ],
      },
      {
        heading: "Les motifs de modification les plus fréquents",
        blocks: [
          {
            type: "list",
            items: [
              "Changement de gérant ou de dirigeant : nomination d'un nouveau directeur ou départ d'un administrateur",
              "Transfert de siège social vers une autre commune ou ville",
              "Modification du capital social : augmentation (entrée d'investisseurs) ou réduction",
              "Changement de forme juridique, par exemple passer d'une SARL à une SAS",
              "Changement de dénomination ou de raison sociale",
              "Extension de l'objet social : ajout de nouvelles activités",
            ],
          },
        ],
      },
      {
        heading: "Obligations comptables",
        blocks: [
          {
            type: "list",
            items: [
              "Application stricte du référentiel SYSCOHADA Révisé",
              "Saisie chronologique des pièces (achats, ventes, banque, caisse) et rapprochements bancaires réguliers",
              "Suivi des immobilisations et calcul des amortissements annuels",
              "Inventaire annuel obligatoire des stocks en fin d'exercice",
              "Clôture des comptes et production des états financiers",
            ],
          },
          {
            type: "callout",
            title: "Force probante",
            text: "La comptabilité doit être régulière et sincère pour servir de preuve en justice ou face à l'administration fiscale.",
          },
          CONTACT_BLOCK,
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
