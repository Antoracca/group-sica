/*
  @sica/devis-engine — Types du moteur déterministe de devis.
  Entrée = "compréhension du plan" (JSON pivot). Sortie = DQE structuré (FCFA HT).
  Aucune dépendance IA : ce moteur chiffre, point.
*/

export type Unit = "m3" | "m2" | "kg" | "ml" | "U" | "m" | "FFT";

export type Standing = "eco" | "moyen" | "haut" | "premium";
export type WallMaterial = "geobeton" | "geobeton18" | "agglo-creux" | "agglo-plein";
export type Roof = "tole-ondulee" | "tole-bac" | "tuile" | "dalle";

export type PieceType =
  | "chambre"
  | "sejour"
  | "cuisine"
  | "sdb"
  | "wc"
  | "douche"
  | "terrasse"
  | "veranda"
  | "couloir"
  | "autre";

export interface PieceInput {
  nom?: string;
  type: PieceType;
  surface_m2: number;
}

/* ── JSON pivot : ce que l'agent-vision (plus tard) produira ───────────────── */
export interface PlanInput {
  /** 1 = plain-pied, 2 = R+1, etc. */
  niveaux: number;
  standing: Standing;
  /** Surface habitable totale (somme des pièces couvertes), m². */
  surfaceHabitable_m2: number;
  pieces: PieceInput[];
  /** Périmètre des murs (m). Estimé si absent. */
  perimetre_m?: number;
  /** Hauteur sous plafond (m). Défaut 3,0. */
  hauteurSousPlafond_m?: number;
  materiauMur: WallMaterial;
  toiture: Roof;
  /** Indices de standing détectés sur le plan (staff, vitrage, split…). */
  indicesStanding?: string[];
}

/* ── DQE de sortie ─────────────────────────────────────────────────────────── */
export interface DevisLine {
  designation: string;
  unite: Unit;
  quantite: number;
  pu: number;
  montant: number;
}

export interface SubLot {
  code: string;
  titre: string;
  lignes: DevisLine[];
  sousTotal: number;
}

export interface Lot {
  code: string;
  titre: string;
  sousLots: SubLot[];
  total: number;
}

export interface DevisResult {
  lots: Lot[];
  totalGrosOeuvre: number;
  totalSecondOeuvre: number;
  totalHT: number;
  ratioFcfaM2: number;
  meta: {
    surface_m2: number;
    niveaux: number;
    standing: Standing;
    compte: Record<string, number>;
    perimetre_m: number;
  };
}
