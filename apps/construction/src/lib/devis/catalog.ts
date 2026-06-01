import type { Unit, WorkGroup } from "./types";

/*
  Catalogue SICA Construction — services réels du dossier technique,
  tarifs unitaires indicatifs (FCFA) destinés à un pré-cadrage estimatif.
  Tout reste ajustable après visite de site et étude technique.
*/

export const CIVILITES = ["M.", "Mme", "Société"] as const;

export const VILLES_CI = [
  "Abidjan",
  "Yamoussoukro",
  "Bouaké",
  "Daloa",
  "San-Pédro",
  "Korhogo",
  "Man",
  "Gagnoa",
  "Abengourou",
  "Soubré",
  "Agboville",
  "Grand-Bassam",
  "Jacqueville",
  "Bingerville",
  "Bondoukou",
  "Odienné",
  "Séguéla",
  "Autre localité",
] as const;

export const TYPES_CHANTIER = [
  { id: "neuve", label: "Construction neuve" },
  { id: "rehabilitation", label: "Réhabilitation" },
  { id: "extension", label: "Extension" },
  { id: "amenagement", label: "Aménagement intérieur" },
  { id: "genie-civil", label: "Génie civil" },
  { id: "industriel", label: "Bâtiment industriel" },
  { id: "commercial", label: "Bâtiment commercial" },
  { id: "infrastructure", label: "Infrastructure" },
] as const;

export const DELAIS = [
  "Dès que possible",
  "Sous 1 à 3 mois",
  "Sous 3 à 6 mois",
  "Sous 6 à 12 mois",
  "Non défini",
] as const;

export const MODALITES_PAIEMENT = [
  "Virement bancaire",
  "Chèque",
  "Espèces",
  "Échelonné par tranches",
] as const;

export interface WorkCatalogItem {
  id: string;
  label: string;
  detail: string;
  group: WorkGroup;
  unit: Unit;
  pu: number;
  surfaceDriven: boolean;
  /** Activé par défaut dans le devis. */
  defaultOn: boolean;
}

/* Corps d'état — base du devis. PU indicatifs FCFA. */
export const WORK_CATALOG: WorkCatalogItem[] = [
  {
    id: "etude-conception",
    label: "Études & conception",
    detail: "Relevé, plans d'architecture, note de calcul, devis quantitatif (DQE).",
    group: "etudes",
    unit: "forfait",
    pu: 1_500_000,
    surfaceDriven: false,
    defaultOn: true,
  },
  {
    id: "etude-sol",
    label: "Étude de sol",
    detail: "Sondages, essais pressiométriques, préconisations de fondation.",
    group: "etudes",
    unit: "forfait",
    pu: 850_000,
    surfaceDriven: false,
    defaultOn: false,
  },
  {
    id: "terrassement",
    label: "Terrassement & fondations",
    detail: "Implantation, fouilles, semelles, longrines, dallage.",
    group: "structure",
    unit: "m2",
    pu: 45_000,
    surfaceDriven: true,
    defaultOn: true,
  },
  {
    id: "gros-oeuvre",
    label: "Gros œuvre béton armé",
    detail: "Élévations, poteaux, poutres, planchers, escaliers.",
    group: "structure",
    unit: "m2",
    pu: 165_000,
    surfaceDriven: true,
    defaultOn: true,
  },
  {
    id: "geobeton",
    label: "Géobéton (BTC)",
    detail: "Briques de terre comprimée, matériau signature SICA.",
    group: "structure",
    unit: "m2",
    pu: 140_000,
    surfaceDriven: true,
    defaultOn: false,
  },
  {
    id: "charpente-metallique",
    label: "Charpente métallique",
    detail: "Ossature acier, hangars, combles, couverture.",
    group: "structure",
    unit: "m2",
    pu: 85_000,
    surfaceDriven: true,
    defaultOn: false,
  },
  {
    id: "plomberie",
    label: "Plomberie sanitaire",
    detail: "Alimentation, évacuation, appareils sanitaires.",
    group: "reseaux",
    unit: "m2",
    pu: 28_000,
    surfaceDriven: true,
    defaultOn: true,
  },
  {
    id: "electricite",
    label: "Électricité",
    detail: "Tableau, circuits, appareillage, mise à la terre.",
    group: "reseaux",
    unit: "m2",
    pu: 32_000,
    surfaceDriven: true,
    defaultOn: true,
  },
  {
    id: "vrd",
    label: "VRD & assainissement",
    detail: "Voirie, réseaux divers, drainage, fosse.",
    group: "reseaux",
    unit: "forfait",
    pu: 2_400_000,
    surfaceDriven: false,
    defaultOn: false,
  },
  {
    id: "menuiserie",
    label: "Menuiserie & fermetures",
    detail: "Portes, fenêtres, aluminium et bois.",
    group: "second-oeuvre",
    unit: "m2",
    pu: 38_000,
    surfaceDriven: true,
    defaultOn: true,
  },
  {
    id: "revetements",
    label: "Revêtements & carrelage",
    detail: "Chapes, faïence, carrelage sols et murs.",
    group: "finitions",
    unit: "m2",
    pu: 30_000,
    surfaceDriven: true,
    defaultOn: true,
  },
  {
    id: "peinture",
    label: "Peinture & finitions",
    detail: "Enduits, peinture intérieure et façade.",
    group: "finitions",
    unit: "m2",
    pu: 22_000,
    surfaceDriven: true,
    defaultOn: true,
  },
];

export interface OptionCatalogItem {
  id: string;
  label: string;
  detail: string;
  unit: Unit;
  pu: number;
  defaultQty: number;
}

/* Options supplémentaires — ajoutées à la demande. */
export const OPTION_CATALOG: OptionCatalogItem[] = [
  {
    id: "permis",
    label: "Permis de construire & démarches",
    detail: "Dossier d'urbanisme, certificat, dépôt administratif.",
    unit: "forfait",
    pu: 900_000,
    defaultQty: 1,
  },
  {
    id: "transport",
    label: "Transport & déplacement",
    detail: "Acheminement équipes et matériel hors zone Abidjan.",
    unit: "forfait",
    pu: 650_000,
    defaultQty: 1,
  },
  {
    id: "materiaux",
    label: "Approvisionnement matériaux",
    detail: "Achat et gestion des matériaux par SICA.",
    unit: "forfait",
    pu: 1_200_000,
    defaultQty: 1,
  },
  {
    id: "engins",
    label: "Location d'engins BTP",
    detail: "Pelle, chargeuse, bétonnière, avec opérateur.",
    unit: "jour",
    pu: 220_000,
    defaultQty: 5,
  },
  {
    id: "cloture",
    label: "Clôture & portail",
    detail: "Mur de clôture, portail métallique.",
    unit: "ml",
    pu: 65_000,
    defaultQty: 40,
  },
  {
    id: "paysagisme",
    label: "Paysagisme & extérieurs",
    detail: "Aménagement jardin, allées, espaces verts.",
    unit: "forfait",
    pu: 1_500_000,
    defaultQty: 1,
  },
  {
    id: "signalisation",
    label: "Signalisation & sécurité chantier",
    detail: "Balisage, équipements de protection, gardiennage.",
    unit: "forfait",
    pu: 480_000,
    defaultQty: 1,
  },
  {
    id: "piscine",
    label: "Piscine & ouvrage spécial",
    detail: "Bassin béton, étanchéité, local technique.",
    unit: "forfait",
    pu: 6_500_000,
    defaultQty: 1,
  },
];

export const UNIT_LABEL: Record<Unit, string> = {
  m2: "m²",
  forfait: "forfait",
  jour: "jour",
  ml: "ml",
  u: "u",
};
