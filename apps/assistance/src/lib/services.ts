import {
  Buildings,
  Scales,
  Calculator,
  FileText,
  TrendUp,
  FolderStar,
  RocketLaunch,
  type Icon,
} from "@phosphor-icons/react";

export interface AssistanceService {
  id: string;
  num: string;
  label: string;
  short: string;
  description: string;
  icon: Icon;
  points: string[];
}

/*
  Les 7 services sont sourcés tels quels de docs/CONTEXTE.md (dossier technique).
  Les descriptions explicitent chaque intitulé en langage clair, sans inventer
  de chiffre ni de promesse non sourcée.
*/
export const ASSISTANCE_SERVICES: AssistanceService[] = [
  {
    id: "creation",
    num: "01",
    label: "Création et modification d'entreprises",
    short: "Création d'entreprise",
    description:
      "Nous montons votre société du début à la fin : choix de la forme juridique, rédaction des statuts, immatriculation au RCCM et obtention de vos identifiants fiscaux.",
    icon: Buildings,
    points: ["Choix de la forme juridique", "Rédaction des statuts", "Immatriculation RCCM"],
  },
  {
    id: "juridique",
    num: "02",
    label: "Assistance administrative et juridique",
    short: "Administratif et juridique",
    description:
      "Nous prenons en charge vos formalités auprès des administrations et nous sécurisons vos actes au quotidien, sans que vous ayez à courir les guichets.",
    icon: Scales,
    points: ["Formalités administratives", "Sécurisation des actes", "Démarches auprès des administrations"],
  },
  {
    id: "comptable",
    num: "03",
    label: "Gestion comptable et fiscale",
    short: "Comptabilité et fiscalité",
    description:
      "Tenue de votre comptabilité, établissement de vos états financiers et suivi de votre situation fiscale tout au long de l'année.",
    icon: Calculator,
    points: ["Tenue de comptabilité", "États financiers", "Suivi fiscal annuel"],
  },
  {
    id: "declarations",
    num: "04",
    label: "Déclarations fiscales et sociales",
    short: "Déclarations",
    description:
      "Préparation et dépôt de vos déclarations dans les délais, pour éviter les oublis et les pénalités liées au retard.",
    icon: FileText,
    points: ["Déclarations fiscales", "Déclarations sociales", "Respect des échéances"],
  },
  {
    id: "conseil",
    num: "05",
    label: "Conseil en gestion d'entreprise",
    short: "Conseil en gestion",
    description:
      "Un regard extérieur sur vos chiffres et votre organisation pour décider sereinement et faire grandir votre activité.",
    icon: TrendUp,
    points: ["Lecture des chiffres", "Organisation interne", "Aide à la décision"],
  },
  {
    id: "suivi",
    num: "06",
    label: "Suivi administratif des sociétés",
    short: "Suivi administratif",
    description:
      "Nous tenons votre dossier à jour : modifications statutaires, renouvellements, obligations annuelles et classement de vos pièces.",
    icon: FolderStar,
    points: ["Modifications statutaires", "Obligations annuelles", "Classement des pièces"],
  },
  {
    id: "accompagnement",
    num: "07",
    label: "Accompagnement des entrepreneurs et porteurs de projets",
    short: "Accompagnement",
    description:
      "De l'idée au lancement : étude de faisabilité, plan d'affaires et mise en relation pour concrétiser votre projet.",
    icon: RocketLaunch,
    points: ["Étude de faisabilité", "Plan d'affaires", "Mise en relation"],
  },
];
