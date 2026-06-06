/*
  @sica/devis-engine — API publique.
  Phase 1 : moteur déterministe (zéro IA). À partir d'un JSON pivot décrivant
  un plan, génère un DQE structuré au format SICA, en FCFA HT.
*/

export { generateDevis } from "./engine";
export { PU, COEF, ASSAINISSEMENT, MENUISERIE, STANDING_MUL } from "./prices";
export type {
  DevisLine,
  DevisResult,
  Lot,
  PieceInput,
  PieceType,
  PlanInput,
  Roof,
  Standing,
  SubLot,
  Unit,
  WallMaterial,
} from "./types";
