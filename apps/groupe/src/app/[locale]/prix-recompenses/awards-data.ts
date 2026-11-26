/* ════════════════════════════════════════════════════════════════════════
   AWARDS — Distinctions et récompenses du Groupe SICA
   ────────────────────────────────────────────────────────────────────────
   Source : photos des diplômes / attestations / trophées du DG, M. N'GORAN
   KOFFI VICTOR IVAN. Chaque entrée porte un id stable utilisé comme clé de
   traduction (libellés FR/EN dans messages/{fr,en}.json sous "Awards.items").
═══════════════════════════════════════════════════════════════════════ */

export type AwardKind = "diploma" | "attestation" | "trophy" | "tribute" | "certificate";

export interface Award {
  id: string;
  image: string;
  /** Orientation native de la photo (utilisée pour calibrer le cadre) */
  orientation: "landscape" | "portrait";
  kind: AwardKind;
  /** Année — sert au timeline / ordre chronologique */
  year: number;
  /** Pays / contexte court (ex. "Abidjan · 22/01/2026") */
  context: string;
}

/* Ordre éditorial : on commence par les pièces les plus prestigieuses
   (diplôme Grand Prix, Éléphant d'Or) puis on alterne diplômes / trophées
   pour rythmer la galerie. */
export const AWARDS: Award[] = [
  {
    id: "grandPrixEmergence",
    image: "/awards/grand-prix-emergence-diplome.jpeg",
    orientation: "landscape",
    kind: "diploma",
    year: 2026,
    context: "Afrique Vérité · Côte d'Ivoire",
  },
  {
    id: "afriqueVeriteTrophy",
    image: "/awards/afrique-verite-trophee.jpeg",
    orientation: "portrait",
    kind: "trophy",
    year: 2026,
    context: "Afrique Vérité · Bonne Gouvernance",
  },
  {
    id: "superPrixElephantOr",
    image: "/awards/super-prix-elephant-or-diplome.jpeg",
    orientation: "landscape",
    kind: "diploma",
    year: 2026,
    context: "OPAJEF · Abidjan, 22/01/2026",
  },
  {
    id: "opajefAmbassadeur",
    image: "/awards/opajef-ambassadeur-attestation.jpeg",
    orientation: "landscape",
    kind: "attestation",
    year: 2026,
    context: "OPAJEF · Abidjan, 22/01/2026",
  },
  {
    id: "ipabCommandeur",
    image: "/awards/ipab-commandeur-attestation.jpeg",
    orientation: "landscape",
    kind: "attestation",
    year: 2026,
    context: "IPAB · Abidjan, 22/01/2026",
  },
  {
    id: "ipabTrophee",
    image: "/awards/ipab-trophee-grand-officier.jpeg",
    orientation: "portrait",
    kind: "trophy",
    year: 2026,
    context: "IPAB · Grand Officier",
  },
  {
    id: "meilleurJeuneEntrepreneur1",
    image: "/awards/meilleur-jeune-entrepreneur-1.jpeg",
    orientation: "portrait",
    kind: "trophy",
    year: 2025,
    context: "Industrie · Côte d'Ivoire",
  },
  {
    id: "meilleurJeuneEntrepreneur2",
    image: "/awards/meilleur-jeune-entrepreneur-2.jpeg",
    orientation: "portrait",
    kind: "trophy",
    year: 2025,
    context: "Industrie · Côte d'Ivoire",
  },
  {
    id: "hommagePublic",
    image: "/awards/hommage-acrostiche.jpeg",
    orientation: "portrait",
    kind: "tribute",
    year: 2025,
    context: "Acrostiche officiel",
  },
  {
    id: "ukamiFormation",
    image: "/awards/ukami-certificat-formation.jpeg",
    orientation: "landscape",
    kind: "certificate",
    year: 2025,
    context: "UKAMI · 19/07/2025",
  },
];
