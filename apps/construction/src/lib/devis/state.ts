import type { DevisState, StampConfig, WorkLine } from "./types";
import { TYPES_CHANTIER, VILLES_CI, WORK_CATALOG } from "./catalog";
import { COMPANY } from "./company";
import { generateRef } from "./pricing";

export const DEFAULT_STAMP: StampConfig = {
  shape: "circle",
  size: 180,
  borderWidth: 3,
  color: "#1E2F8A",
  lines: [COMPANY.marque, COMPANY.groupe, "Abidjan · Côte d'Ivoire"],
  curvedTop: COMPANY.marque,
  curvedBottom: `RCCM ${COMPANY.rccm}`,
};

export interface Prefill {
  type?: string;
  surface?: string;
  locality?: string;
}

const LOCALITY_TO_VILLE: Record<string, string> = {
  abidjan: "Abidjan",
  interieur: "Bouaké",
  "hors-ci": "Autre localité",
};

function worksFromCatalog(): WorkLine[] {
  return WORK_CATALOG.map((w) => ({
    id: w.id,
    label: w.label,
    detail: w.detail,
    group: w.group,
    unit: w.unit,
    pu: w.pu,
    qty: w.surfaceDriven ? 0 : 1,
    surfaceDriven: w.surfaceDriven,
    enabled: w.defaultOn,
  }));
}

export function createInitialDevisState(prefill: Prefill = {}): DevisState {
  const typeMatch = TYPES_CHANTIER.find((t) => t.id === prefill.type);
  const surface = prefill.surface ? Number(prefill.surface) : 0;
  const ville = (prefill.locality && LOCALITY_TO_VILLE[prefill.locality]) || "";

  return {
    ref: generateRef(),
    date: new Date().toISOString(),
    validiteJours: 30,
    role: "client",
    client: {
      civilite: "",
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      entreprise: "",
    },
    localisation: {
      ville: VILLES_CI.includes(ville as (typeof VILLES_CI)[number]) ? ville : "",
      quartier: "",
      adresse: "",
    },
    projet: {
      typeChantier: typeMatch ? typeMatch.label : "",
      natureTravaux: "",
      surface: Number.isFinite(surface) ? surface : 0,
      niveaux: 0,
      delai: "",
      description: "",
    },
    works: worksFromCatalog(),
    options: [],
    finances: {
      remisePct: 0,
      tva: true,
      avancePct: 40,
      modalite: "Virement bancaire",
      budget: 0,
    },
    annexes: [],
    signatureStaffUrl: null,
    stampConfig: null,
    importedStamp: null,
    stampPlacement: { rotation: -8, scale: 1 },
  };
}
