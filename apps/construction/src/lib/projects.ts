export type ProjectItem = {
  id: string;
  letter: string;
  name: string;
  city: string;
  type: string;
  status: "Livré" | "En cours" | "Étude";
  summary: string;
  media?: string[];
};

export const constructionProjects: ProjectItem[] = [
  {
    id: "avagout-abidjan",
    letter: "A",
    name: "Projet AVAGOUT Jacques",
    city: "Abidjan",
    type: "Résidentiel",
    status: "Livré",
    summary: "Ouvrage résidentiel avec suivi technique, second oeuvre et finitions.",
  },
  {
    id: "bingerville-r3",
    letter: "B",
    name: "Étude de sol R+3 Bingerville",
    city: "Bingerville",
    type: "Ingénierie",
    status: "Étude",
    summary: "Reconnaissance de sol et préconisations structurelles pour un projet R+3.",
  },
  {
    id: "cocody-extension",
    letter: "C",
    name: "Projet Cocody Extension",
    city: "Abidjan",
    type: "Extension / Réhabilitation",
    status: "Livré",
    summary: "Extension d'ouvrage existant avec renforcement et optimisation des volumes.",
  },
  {
    id: "dabre-villa",
    letter: "D",
    name: "Projet DABRÉ - Villa basse avec sous-sol",
    city: "Abidjan",
    type: "Villa",
    status: "Livré",
    summary: "Étude de sol, terrassement, fondations, gros oeuvre et finition complète.",
    media: [
      "/media/projects/dabre/dabre-1.jpeg",
      "/media/projects/dabre/dabre-2.jpeg",
      "/media/projects/dabre/dabre-3.jpeg",
    ],
  },
  {
    id: "gbakayo-soubre",
    letter: "G",
    name: "Projet GBAKAYO",
    city: "Soubré",
    type: "Résidentiel",
    status: "Livré",
    summary: "Construction résidentielle avec pilotage de chantier et contrôle qualité.",
  },
  {
    id: "guessiguie-agboville",
    letter: "G",
    name: "Projet GUESSIGUIÉ",
    city: "Agboville",
    type: "Résidentiel",
    status: "Livré",
    summary: "Déploiement chantier avec planning de lots et coordination multi-corps d'état.",
  },
  {
    id: "jacqueville-villa-duplex",
    letter: "J",
    name: "Villa Duplex Jacqueville",
    city: "Jacqueville",
    type: "Villa Duplex",
    status: "Livré",
    summary: "Construction de villa duplex, gros oeuvre, réseaux techniques et aménagement.",
    media: [
      "/media/projects/villa-duplex/villa-1.jpeg",
      "/media/projects/villa-duplex/villa-2.jpeg",
      "/media/projects/villa-duplex/villa-3.jpeg",
    ],
  },
  {
    id: "ocalm-km53",
    letter: "O",
    name: "Projet O'CALM km53",
    city: "Abidjan",
    type: "Infrastructure",
    status: "En cours",
    summary: "Intervention chantier km53 avec suivi des lots, métrés et contrôles périodiques.",
  },
  {
    id: "sgci-plateau",
    letter: "S",
    name: "Siège SGCI Plateau (Géobéton)",
    city: "Abidjan",
    type: "Corporate / Géobéton",
    status: "Livré",
    summary: "Projet signature en géobéton, maîtrise des délais et des performances structurelles.",
    media: [
      "/media/projects/sgci/sgci-1.jpeg",
      "/media/projects/sgci/sgci-2.jpeg",
      "/media/projects/sgci/sgci-3.jpeg",
    ],
  },
  {
    id: "songon-abidjan",
    letter: "S",
    name: "Projet SONGON",
    city: "Abidjan",
    type: "Résidentiel",
    status: "Livré",
    summary: "Conception-réalisation d'ouvrage résidentiel avec contrôle qualité renforcé.",
  },
  {
    id: "y4-cocody",
    letter: "Y",
    name: "Projet Y4 Cocody",
    city: "Abidjan",
    type: "Résidentiel",
    status: "Livré",
    summary: "Projet urbain en zone dense, séquencement chantier et sécurité de site.",
  },
];

export const projectLetters = Array.from(
  new Set(constructionProjects.map((project) => project.letter)),
).sort();
