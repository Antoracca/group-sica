import type { Standing } from "./types";

/*
  Bibliothèque de prix unitaires (FCFA) et coefficients de quantité.
  Calibrés sur les 4 devis réels SICA (cf. SICA-DEVIS-IA-DATABASE.md).
  Tout est centralisé ici pour pouvoir ajuster sans toucher au moteur.
*/

/* ── Prix unitaires (FCFA) ─────────────────────────────────────────────────── */
export const PU = {
  fouilleRigole: 2_000, // m3
  remblaiDallage: 1_342, // m3
  remblaiFouilles: 1_477, // m3
  betonProprete: 70_000, // m3
  beton250: 85_000, // m3
  beton350: 90_000, // m3
  coffrage: 3_000, // m2
  acier: 950, // kg
  filmPolyane: 500, // m2
  aggloPlein: 11_000, // m2 (mur soubassement)
  aggloCreux: 8_000, // m2
  geobeton: 350, // U
  geobeton18: 375, // U
  montageGeobeton: 3_500, // m2
  charpente: 13_000, // m2
  fauxPlafondCP: 8_000, // m2
  fauxPlafondStaff: 20_000, // m2
  couvertureTole: 12_000, // m2
  couvertureTuile: 14_500, // m2
  chape: 5_000, // m2
  faience: 7_500, // m2
  gresCerame: 12_000, // m2
  crepissage: 1_400, // m2 (par face)
  masticage: 1_400, // m2 (par face)
  peintureVinyl: 1_100, // m2
  vernissage: 2_800, // m2
} as const;

/* Assainissement (fixe, varie au standing) — [fosse, puits] */
export const ASSAINISSEMENT: Record<Standing, { fosse: number; puits: number }> = {
  eco: { fosse: 600_000, puits: 400_000 },
  moyen: { fosse: 600_000, puits: 400_000 },
  haut: { fosse: 900_000, puits: 700_000 },
  premium: { fosse: 1_200_000, puits: 900_000 },
};

/* Menuiserie — PU moyen porte / fenêtre selon standing */
export const MENUISERIE: Record<Standing, { porte: number; fenetre: number; placard: number }> = {
  eco: { porte: 85_000, fenetre: 110_000, placard: 150_000 },
  moyen: { porte: 95_000, fenetre: 120_000, placard: 150_000 },
  haut: { porte: 125_000, fenetre: 140_000, placard: 180_000 },
  premium: { porte: 180_000, fenetre: 160_000, placard: 200_000 },
};

/* ── Multiplicateurs de standing (finitions) ───────────────────────────────── */
export const STANDING_MUL: Record<Standing, { elec: number; plomberie: number; peinture: number; fauxPlafondStaff: boolean }> = {
  eco: { elec: 1.0, plomberie: 1.0, peinture: 1.0, fauxPlafondStaff: false },
  moyen: { elec: 1.05, plomberie: 1.05, peinture: 1.05, fauxPlafondStaff: false },
  haut: { elec: 1.25, plomberie: 1.35, peinture: 1.45, fauxPlafondStaff: true },
  premium: { elec: 1.45, plomberie: 1.6, peinture: 1.7, fauxPlafondStaff: true },
};

/* ── Coefficients de quantité (dérivés de la surface S, m²) ─────────────────── */
export const COEF = {
  fouilleRigole: 0.45, // ×S (×0.75 si R+1)
  remblaiDallage: 0.2, // ×S (×0.6 si R+1)
  remblaiFouilles: 0.25, // ×S
  betonProprete: 0.026, // ×S
  semelleBeton250: 0.09, // ×S
  semelleCoffrage: 0.26, // ×S
  semelleAcier: 3.0, // kg ×S
  dallageBeton: 0.15, // ×S (×0.5 si R+1, dalle séparée)
  dallageAcier: 11, // kg ×S (×0.4 si R+1)
  murSoubassement: 0.5, // m² ×S
  chainage: 0.03, // ×S béton (×3 sous-lots : bas/haut/poteaux)
  chainageCoffrage: 0.35, // ×S
  chainageAcier: 2.2, // kg ×S
  poteauBeton: 0.03, // ×S
  poteauCoffrage: 0.5, // ×S
  poteauAcier: 2.0, // kg ×S
  geobetonBlocsParM2: 92, // U ×S
  murAggloFace: 2.4, // m² mur (une face) ×S
  dalleBetonR1: 0.2, // ×(emprise) si R+1
  dalleAcierR1: 15, // kg ×(emprise)
  charpenteFacteur: 1.15, // ×emprise toit
  crepissageFace: 1.33, // m² ×S (×2 faces)
  masticageFace: 2.2, // m² ×S (×2 faces)
  faienceParSdb: 16, // m² ×nb points d'eau
  elecParM2: 13_000, // FCFA ×S (×standing)
  plomberieParPointEau: 400_000, // FCFA ×nb points d'eau (×standing)
} as const;
