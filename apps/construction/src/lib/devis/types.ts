/* Modèle de données du simulateur de devis SICA Construction. */

export type Unit = "m2" | "forfait" | "jour" | "ml" | "u";

export type WorkGroup =
  | "etudes"
  | "structure"
  | "second-oeuvre"
  | "reseaux"
  | "finitions";

export interface WorkLine {
  id: string;
  label: string;
  detail: string;
  group: WorkGroup;
  unit: Unit;
  pu: number;
  qty: number;
  /** true = utilise la surface du projet comme quantité par défaut. */
  surfaceDriven: boolean;
  enabled: boolean;
}

export interface OptionLine {
  id: string;
  catalogId: string;
  label: string;
  unit: Unit;
  pu: number;
  qty: number;
}

export interface ClientInfo {
  civilite: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  entreprise: string;
}

export interface LocationInfo {
  ville: string;
  quartier: string;
  adresse: string;
}

export interface ProjectInfo {
  typeChantier: string;
  natureTravaux: string;
  surface: number;
  niveaux: number;
  delai: string;
  description: string;
}

export interface FinanceInfo {
  remisePct: number;
  tva: boolean;
  avancePct: number;
  modalite: string;
  budget: number;
}

export interface AnnexImage {
  id: string;
  name: string;
  url: string;
}

/* ── Rôle de l'utilisateur qui constitue le devis ──
   Détermine l'accès aux fonctionnalités de signature & cachet. */
export type UserRole = "client" | "staff";

/* ── Cachet personnalisable ─────────────────────────────────────── */
export type StampShape = "circle" | "square" | "rectangle" | "oval";

export interface StampConfig {
  shape: StampShape;
  /** Largeur du cachet en px (la hauteur est calée sur la forme). */
  size: number;
  borderWidth: number;
  color: string;
  /** Lignes affichées dans le cachet, dans l'ordre de haut en bas. */
  lines: string[];
  /** Texte courbé pour les cachets ronds/ovales (optionnel). */
  curvedTop: string;
  curvedBottom: string;
}

/* Image de cachet importée (PNG/JPG) — alternative au cachet généré. */
export interface ImportedStamp {
  url: string;
  name: string;
}

export interface StampPlacement {
  rotation: number;
  scale: number;
}

export interface DevisState {
  ref: string;
  date: string;
  validiteJours: number;
  role: UserRole;
  client: ClientInfo;
  localisation: LocationInfo;
  projet: ProjectInfo;
  works: WorkLine[];
  options: OptionLine[];
  finances: FinanceInfo;
  annexes: AnnexImage[];
  /** Signature dessinée ou importée par le personnel (data URL PNG transparent). */
  signatureStaffUrl: string | null;
  /** Cachet généré (config) — utilisé si `importedStamp` est null. */
  stampConfig: StampConfig | null;
  /** Cachet importé par le personnel — prioritaire sur `stampConfig` si présent. */
  importedStamp: ImportedStamp | null;
  stampPlacement: StampPlacement;
}

export interface Totals {
  sousTotal: number;
  remise: number;
  htNet: number;
  tva: number;
  ttc: number;
  avance: number;
  solde: number;
}
