export type ProjectItem = {
  id: string;
  letter: string;
  name: string;
  city: string;
  type: string;
  status: "Livré" | "En cours" | "Étude";
  summary: string;
  durationMonths: number;
  
  // Fiche technique avancée
  client?: string;
  mission?: string;
  sector?: string;
  surface?: string;
  year?: string;
  team?: string;
  services?: string;
  tech?: string;
  referent?: string;

  media?: string[];
};

/* Règle DG (17/11/2026) : n'afficher que des informations vérifiables.
   Maître d'ouvrage, surface, année, équipe et mission exacte : à renseigner
   uniquement après validation de la Direction (champs optionnels ci-dessus). */
export const constructionProjects: ProjectItem[] = [
  {
    id: "avagout-abidjan",
    letter: "A",
    name: "Projet AVAGOUT Jacques",
    city: "Abidjan",
    type: "Résidentiel",
    status: "Livré",
    summary: "Ouvrage résidentiel avec suivi technique, second œuvre et finitions.",
    durationMonths: 18,
    media: [
      "/media/projects/avagout-abidjan/WhatsApp Image 2026-05-11 at 19.17.04 (1).jpeg",
      "/media/projects/avagout-abidjan/WhatsApp Image 2026-05-11 at 19.17.04 (2).jpeg",
      "/media/projects/avagout-abidjan/WhatsApp Image 2026-05-11 at 19.17.04 (3).jpeg",
      "/media/projects/avagout-abidjan/WhatsApp Image 2026-05-11 at 19.17.04 (4).jpeg",
      "/media/projects/avagout-abidjan/WhatsApp Image 2026-05-11 at 19.17.04 (5).jpeg",
      "/media/projects/avagout-abidjan/WhatsApp Image 2026-05-11 at 19.17.04 (6).jpeg",
      "/media/projects/avagout-abidjan/WhatsApp Image 2026-05-11 at 19.17.04 (7).jpeg",
      "/media/projects/avagout-abidjan/WhatsApp Image 2026-05-11 at 19.17.04.jpeg"
    ],
  },
  {
    id: "bingerville-r3",
    letter: "B",
    name: "Étude de sol R+3 Bingerville",
    city: "Bingerville",
    type: "Ingénierie",
    status: "Étude",
    summary: "Reconnaissance de sol et préconisations structurelles pour un projet R+3.",
    durationMonths: 6,
    media: [
      "/media/projects/bingerville-r3/WhatsApp Image 2026-05-11 at 19.32.08 (1).jpeg",
      "/media/projects/bingerville-r3/WhatsApp Image 2026-05-11 at 19.32.08 (2).jpeg",
      "/media/projects/bingerville-r3/WhatsApp Image 2026-05-11 at 19.32.08.jpeg",
      "/media/projects/bingerville-r3/WhatsApp Image 2026-05-11 at 19.32.09 (1).jpeg",
      "/media/projects/bingerville-r3/WhatsApp Image 2026-05-11 at 19.32.09 (2).jpeg",
      "/media/projects/bingerville-r3/WhatsApp Image 2026-05-11 at 19.32.09 (3).jpeg",
      "/media/projects/bingerville-r3/WhatsApp Image 2026-05-11 at 19.32.09.jpeg"
    ],
  },
  {
    id: "cocody-extension",
    letter: "C",
    name: "Projet Cocody Extension",
    city: "Abidjan",
    type: "Extension / Réhabilitation",
    status: "Livré",
    summary: "Extension d'ouvrage existant avec renforcement et optimisation des volumes.",
    durationMonths: 12,
    media: [
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.56 (1).jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.56.jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.57 (1).jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.57 (2).jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.57 (3).jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.57 (4).jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.57 (5).jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.57 (6).jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.57 (7).jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.57.jpeg",
      "/media/projects/cocody-extension/WhatsApp Image 2026-05-11 at 19.20.58.jpeg"
    ],
  },
  {
    id: "dabre-villa",
    letter: "D",
    name: "Projet DABRÉ - Villa basse",
    city: "Abidjan",
    type: "Villa",
    status: "Livré",
    summary: "Étude de sol, terrassement, fondations, gros œuvre et finition complète.",
    durationMonths: 24,
    media: [
      "/media/projects/dabre-villa/WhatsApp Image 2026-05-12 at 06.54.36 (1).jpeg",
      "/media/projects/dabre-villa/WhatsApp Image 2026-05-12 at 06.54.36 (2).jpeg",
      "/media/projects/dabre-villa/WhatsApp Image 2026-05-12 at 06.54.36 (3).jpeg",
      "/media/projects/dabre-villa/WhatsApp Image 2026-05-12 at 06.54.36.jpeg",
      "/media/projects/dabre-villa/WhatsApp Image 2026-05-12 at 06.54.37 (1).jpeg",
      "/media/projects/dabre-villa/WhatsApp Image 2026-05-12 at 06.54.37 (2).jpeg",
      "/media/projects/dabre-villa/WhatsApp Image 2026-05-12 at 06.54.37 (3).jpeg",
      "/media/projects/dabre-villa/WhatsApp Image 2026-05-12 at 06.54.37.jpeg"
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
    durationMonths: 18,
    media: [
      "/media/projects/gbakayo-soubre/WhatsApp Image 2026-05-11 at 19.39.29 (1).jpeg",
      "/media/projects/gbakayo-soubre/WhatsApp Image 2026-05-11 at 19.39.29 (2).jpeg",
      "/media/projects/gbakayo-soubre/WhatsApp Image 2026-05-11 at 19.39.29 (3).jpeg",
      "/media/projects/gbakayo-soubre/WhatsApp Image 2026-05-11 at 19.39.29.jpeg",
      "/media/projects/gbakayo-soubre/WhatsApp Image 2026-05-11 at 19.39.30.jpeg"
    ],
  },
  {
    id: "guessiguie-agboville",
    letter: "G",
    name: "Projet GUESSIGUIÉ",
    city: "Agboville",
    type: "Résidentiel",
    status: "Livré",
    summary: "Déploiement chantier avec planning de lots et coordination multi-corps d'état.",
    durationMonths: 20,
    media: [
      "/media/projects/guessiguie-agboville/WhatsApp Image 2026-05-12 at 06.49.18 (1).jpeg",
      "/media/projects/guessiguie-agboville/WhatsApp Image 2026-05-12 at 06.49.18 (2).jpeg",
      "/media/projects/guessiguie-agboville/WhatsApp Image 2026-05-12 at 06.49.18 (3).jpeg",
      "/media/projects/guessiguie-agboville/WhatsApp Image 2026-05-12 at 06.49.18 (4).jpeg",
      "/media/projects/guessiguie-agboville/WhatsApp Image 2026-05-12 at 06.49.18 (5).jpeg",
      "/media/projects/guessiguie-agboville/WhatsApp Image 2026-05-12 at 06.49.18.jpeg"
    ],
  },
  {
    id: "jacqueville-villa-duplex",
    letter: "J",
    name: "Villa Duplex Jacqueville",
    city: "Jacqueville",
    type: "Villa Duplex",
    status: "Livré",
    summary: "Construction de villa duplex, gros œuvre, réseaux techniques et aménagement.",
    durationMonths: 15,
    media: [
      "/media/projects/jacqueville-villa-duplex/WhatsApp Image 2026-05-11 at 19.29.47 (1).jpeg",
      "/media/projects/jacqueville-villa-duplex/WhatsApp Image 2026-05-11 at 19.29.47 (2).jpeg",
      "/media/projects/jacqueville-villa-duplex/WhatsApp Image 2026-05-11 at 19.29.47 (3).jpeg",
      "/media/projects/jacqueville-villa-duplex/WhatsApp Image 2026-05-11 at 19.29.47.jpeg",
      "/media/projects/jacqueville-villa-duplex/WhatsApp Image 2026-05-11 at 19.29.48.jpeg"
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
    durationMonths: 36,
    media: [
      "/media/projects/ocalm-km53/WhatsApp Image 2026-05-11 at 19.19.28 (1).jpeg",
      "/media/projects/ocalm-km53/WhatsApp Image 2026-05-11 at 19.19.28 (2).jpeg",
      "/media/projects/ocalm-km53/WhatsApp Image 2026-05-11 at 19.19.28.jpeg",
      "/media/projects/ocalm-km53/WhatsApp Image 2026-05-11 at 19.19.29 (1).jpeg",
      "/media/projects/ocalm-km53/WhatsApp Image 2026-05-11 at 19.19.29 (2).jpeg",
      "/media/projects/ocalm-km53/WhatsApp Image 2026-05-11 at 19.19.29 (3).jpeg",
      "/media/projects/ocalm-km53/WhatsApp Image 2026-05-11 at 19.19.29 (4).jpeg",
      "/media/projects/ocalm-km53/WhatsApp Image 2026-05-11 at 19.19.29.jpeg"
    ],
  },
  {
    id: "sgci-plateau",
    letter: "S",
    name: "Siège SGCI Plateau",
    city: "Abidjan",
    type: "Corporate / Géobéton",
    status: "Livré",
    summary: "Ouvrage tertiaire, intervention de SICA Construction à préciser par la Direction.",
    durationMonths: 48,
    media: [
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.32 (1).jpeg",
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.32.jpeg",
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.33 (1).jpeg",
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.33 (2).jpeg",
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.33 (3).jpeg",
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.33 (4).jpeg",
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.33 (5).jpeg",
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.33 (6).jpeg",
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.33 (7).jpeg",
      "/media/projects/sgci-plateau/WhatsApp Image 2026-05-11 at 19.15.33.jpeg"
    ],
  },
  {
    id: "songon-abidjan",
    letter: "S",
    name: "Projet SONGON",
    city: "Abidjan",
    type: "Résidentiel",
    status: "Livré",
    summary: "Ouvrage résidentiel avec suivi de chantier et contrôle qualité.",
    durationMonths: 14,
    media: [
      "/media/projects/songon-abidjan/WhatsApp Image 2026-05-11 at 19.34.03 (1).jpeg",
      "/media/projects/songon-abidjan/WhatsApp Image 2026-05-11 at 19.34.03.jpeg",
      "/media/projects/songon-abidjan/WhatsApp Image 2026-05-11 at 19.34.04 (1).jpeg",
      "/media/projects/songon-abidjan/WhatsApp Image 2026-05-11 at 19.34.04 (2).jpeg",
      "/media/projects/songon-abidjan/WhatsApp Image 2026-05-11 at 19.34.04.jpeg"
    ],
  },
  {
    id: "y4-cocody",
    letter: "Y",
    name: "Projet Y4 Cocody",
    city: "Abidjan",
    type: "Résidentiel",
    status: "Livré",
    summary: "Projet urbain en zone dense, séquencement chantier et sécurité de site.",
    durationMonths: 22,
    media: [
      "/media/projects/y4-cocody/WhatsApp Image 2026-05-11 at 19.40.51 (1).jpeg",
      "/media/projects/y4-cocody/WhatsApp Image 2026-05-11 at 19.40.51 (2).jpeg",
      "/media/projects/y4-cocody/WhatsApp Image 2026-05-11 at 19.40.51 (3).jpeg",
      "/media/projects/y4-cocody/WhatsApp Image 2026-05-11 at 19.40.51.jpeg",
      "/media/projects/y4-cocody/WhatsApp Image 2026-05-11 at 19.40.52 (1).jpeg",
      "/media/projects/y4-cocody/WhatsApp Image 2026-05-11 at 19.40.52 (2).jpeg",
      "/media/projects/y4-cocody/WhatsApp Image 2026-05-11 at 19.40.52.jpeg"
    ],
  },
];

export const projectLetters = Array.from(
  new Set(constructionProjects.map((project) => project.letter)),
).sort();
