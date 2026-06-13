import type { ContentBlock } from "@/components/content-blocks";

/*
  Pages services détaillées. Contenu cadré « ce que nous prenons en charge »,
  complémentaire des guides Ressources (qui restent la référence pédagogique).
  La clé correspond à l'id du service dans lib/services.ts.
*/

export interface ServiceDetail {
  slug: string;
  serviceId: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; blocks: ContentBlock[] }[];
  relatedGuides: { label: string; slug: string }[];
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "creation-et-modification-entreprise",
    serviceId: "creation",
    eyebrow: "Service",
    title: "Création et modification d'entreprises",
    metaTitle: "Création et modification d'entreprises | SICA Assistance",
    metaDescription:
      "Nous montons votre société de bout en bout : forme juridique, statuts, enregistrement, immatriculation RCCM et rattachement aux Impôts et à la CNPS. Modifications statutaires incluses.",
    intro:
      "Nous formalisons votre activité de bout en bout, de la rédaction des actes au rattachement aux administrations, et nous tenons vos statuts à jour tout au long de la vie de votre société.",
    sections: [
      {
        heading: "La création, étape par étape",
        blocks: [
          {
            type: "steps",
            items: [
              {
                title: "Recueil des pièces et des informations",
                points: [
                  "Identité de la société, des associés et du siège social",
                ],
              },
              {
                title: "Rédaction des actes juridiques",
                points: [
                  "Par notre notaire agréé ou sous seing privé : statuts, DSNV/DSV, bail, PV, règlement intérieur",
                ],
              },
              {
                title: "Enregistrement des actes à la DGI",
                points: [],
              },
              {
                title: "Immatriculations",
                points: [
                  "RCCM, IDU et annexe CEPICI, avis de constitution",
                ],
              },
              {
                title: "Rattachement au centre des impôts",
                points: [
                  "Déclaration fiscale d'existence, NCC et activation e-Impôts",
                ],
              },
              {
                title: "Rattachement à la CNPS",
                points: [
                  "Numéro CNPS, activation e-CNPS et déclaration des salariés",
                ],
              },
            ],
          },
          {
            type: "callout",
            text: "Le détail complet des pièces à réunir figure dans notre checklist de création. Délai indicatif : 30 jours, hors délais imputables à l'administration.",
          },
        ],
      },
      {
        heading: "Modifier une société existante",
        blocks: [
          {
            type: "paragraph",
            text: "Nous prenons aussi en charge les changements qui touchent l'identité ou le fonctionnement de votre société, et leur publication auprès des administrations.",
          },
          {
            type: "list",
            items: [
              "Changement de gérant ou de dirigeant",
              "Transfert de siège social",
              "Augmentation ou réduction du capital social",
              "Changement de forme juridique",
              "Changement de dénomination ou de raison sociale",
              "Extension de l'objet social",
            ],
          },
        ],
      },
    ],
    relatedGuides: [
      { label: "Checklist de création d'entreprise", slug: "creation-entreprise" },
      { label: "Les formes juridiques en Côte d'Ivoire", slug: "formes-juridiques" },
      { label: "Quelles pièces préparer ?", slug: "pieces-a-fournir" },
    ],
  },
  {
    slug: "gestion-comptable-fiscale-sociale",
    serviceId: "comptable",
    eyebrow: "Service",
    title: "Gestion comptable, fiscale et sociale",
    metaTitle: "Gestion comptable, fiscale et sociale | SICA Assistance",
    metaDescription:
      "Tenue comptable SYSCOHADA, déclarations fiscales DGI et gestion sociale CNPS. SICA Assistance assure le suivi quotidien et annuel de la santé de votre entreprise.",
    intro:
      "La gestion d'une entreprise repose sur trois piliers : la comptabilité (normes SYSCOHADA), la fiscalité (DGI) et le social (CNPS et inspection du travail). Nous en assurons le suivi quotidien et annuel.",
    sections: [
      {
        heading: "Gestion comptable",
        blocks: [
          {
            type: "list",
            items: [
              "Saisie chronologique des pièces : achats, ventes, banque, caisse",
              "Rapprochement bancaire régulier",
              "Gestion des immobilisations et calcul des amortissements",
              "Inventaire annuel des stocks en fin d'exercice",
              "Clôture des comptes et production des états financiers (bilan, compte de résultat, TFT, notes annexes)",
            ],
          },
        ],
      },
      {
        heading: "Gestion fiscale",
        blocks: [
          {
            type: "list",
            items: [
              "Déclarations mensuelles via e-Impôts : TVA, TSE, ITS, taxes FDFP, retenues à la source",
              "Acomptes provisionnels de l'IS ou de l'impôt BIC",
              "Dépôt de la liasse fiscale à la DGI",
              "Suivi de la contribution des patentes et licences",
            ],
          },
        ],
      },
      {
        heading: "Gestion sociale",
        blocks: [
          {
            type: "list",
            items: [
              "Rédaction des contrats de travail (CDD, CDI, stage) et déclaration d'embauche à la CNPS",
              "Traitement de la paie, bulletins et livre de paie",
              "Déclarations sociales mensuelles ou trimestrielles à la CNPS",
              "Suivi de la médecine du travail",
              "Gestion des fins de contrat et indemnités",
            ],
          },
        ],
      },
      {
        heading: "Un accompagnement complet",
        blocks: [
          {
            type: "deflist",
            items: [
              {
                term: "Facture Normalisée Électronique (FNE)",
                def: "Mise en conformité avec la réforme de la DGI : sécurisation des transactions et code QR.",
              },
              {
                term: "Business plan",
                def: "Rédaction et structuration de plans d'affaires pour vos demandes de financement ou levées de fonds.",
              },
              {
                term: "Accompagnement entrepreneurial",
                def: "Conseils sur la gestion, la stratégie de développement et la gestion des risques juridiques.",
              },
            ],
          },
        ],
      },
    ],
    relatedGuides: [
      { label: "Comprendre votre fiscalité", slug: "fiscalite" },
      { label: "Calendrier des obligations", slug: "calendrier-obligations" },
      { label: "Vos obligations juridiques", slug: "obligations-juridiques" },
    ],
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}

export function getServiceDetailByServiceId(
  serviceId: string,
): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.serviceId === serviceId);
}
