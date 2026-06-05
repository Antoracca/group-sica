import {
  Briefcase,
  Building2,
  Landmark,
  Store,
  Users,
  UserRound,
  type LucideIcon,
} from "lucide-react";

/*
  Données du simulateur de création d'entreprise. Les formes juridiques et
  les formalités correspondent aux usages OHADA / Côte d'Ivoire. Aucune somme
  officielle n'est inventée : l'estimation chiffrée est confirmée après échange.
*/

export interface FormeJuridique {
  id: string;
  label: string;
  short: string;
  description: string;
  capitalNote: string;
  associes: string;
  icon: LucideIcon;
  formalites: string[];
}

export const FORMES: FormeJuridique[] = [
  {
    id: "ei",
    label: "Entreprise individuelle",
    short: "EI",
    description: "L'activité est exercée en votre nom propre. La forme la plus simple pour démarrer seul.",
    capitalNote: "Aucun capital minimum requis.",
    associes: "1 personne",
    icon: UserRound,
    formalites: [
      "Déclaration d'activité et immatriculation au RCCM",
      "Obtention du compte contribuable (DGI)",
      "Affiliation aux organismes sociaux le cas échéant",
    ],
  },
  {
    id: "sarlu",
    label: "SARL unipersonnelle",
    short: "SARLU",
    description: "Une société à associé unique, avec une responsabilité limitée à vos apports.",
    capitalNote: "Capital librement fixé par l'associé unique.",
    associes: "1 associé",
    icon: Briefcase,
    formalites: [
      "Rédaction des statuts",
      "Dépôt du capital et attestation",
      "Immatriculation au RCCM et compte contribuable",
      "Publication de l'avis de constitution",
    ],
  },
  {
    id: "sarl",
    label: "SARL",
    short: "SARL",
    description: "La forme la plus courante pour les PME, avec plusieurs associés et une responsabilité limitée.",
    capitalNote: "Capital librement fixé par les associés.",
    associes: "2 associés ou plus",
    icon: Building2,
    formalites: [
      "Rédaction des statuts et pacte d'associés",
      "Dépôt du capital et attestation",
      "Immatriculation au RCCM et compte contribuable",
      "Publication de l'avis de constitution",
      "Désignation de la gérance",
    ],
  },
  {
    id: "sa",
    label: "Société anonyme",
    short: "SA",
    description: "Pour les structures plus importantes, ouvertes à plusieurs actionnaires.",
    capitalNote: "Capital social plus élevé, avec recours possible à un commissaire aux comptes.",
    associes: "Plusieurs actionnaires",
    icon: Landmark,
    formalites: [
      "Rédaction des statuts",
      "Dépôt du capital et attestation",
      "Désignation des organes de direction",
      "Immatriculation au RCCM et compte contribuable",
      "Publication de l'avis de constitution",
    ],
  },
  {
    id: "association",
    label: "Association",
    short: "Asso.",
    description: "Pour porter un projet à but non lucratif, associatif ou d'intérêt général.",
    capitalNote: "Pas de capital social.",
    associes: "Membres fondateurs",
    icon: Users,
    formalites: [
      "Rédaction des statuts et du règlement intérieur",
      "Tenue de l'assemblée constitutive",
      "Déclaration auprès de l'administration compétente",
    ],
  },
];

export const SECTEURS = [
  { id: "commerce", label: "Commerce", icon: Store },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "btp", label: "BTP et construction", icon: Building2 },
  { id: "agro", label: "Agro-alimentaire", icon: Store },
  { id: "tech", label: "Numérique et technologie", icon: Briefcase },
  { id: "transport", label: "Transport et logistique", icon: Store },
  { id: "autre", label: "Autre activité", icon: Briefcase },
] as const;

export const PIECES_COMMUNES = [
  "Pièce d'identité du dirigeant en cours de validité",
  "Justificatif pour l'adresse du siège",
  "Intitulé précis de l'activité",
  "Répartition du capital entre les associés",
];
