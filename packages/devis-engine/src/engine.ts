import type {
  DevisLine,
  DevisResult,
  Lot,
  PlanInput,
  Standing,
  SubLot,
  Unit,
} from "./types";
import {
  ASSAINISSEMENT,
  COEF,
  MENUISERIE,
  PU,
  STANDING_MUL,
} from "./prices";

/* ── Helpers ───────────────────────────────────────────────────────────────── */
const r = (n: number) => Math.round(n);

function line(designation: string, unite: Unit, quantite: number, pu: number): DevisLine {
  const q = Math.round(quantite * 100) / 100;
  return { designation, unite, quantite: q, pu, montant: r(q * pu) };
}

function subLot(code: string, titre: string, lignes: DevisLine[]): SubLot {
  return { code, titre, lignes, sousTotal: lignes.reduce((a, l) => a + l.montant, 0) };
}

function lot(code: string, titre: string, sousLots: SubLot[]): Lot {
  return { code, titre, sousLots, total: sousLots.reduce((a, s) => a + s.sousTotal, 0) };
}

interface Counts {
  chambre: number;
  sejour: number;
  cuisine: number;
  sdb: number;
  wc: number;
  douche: number;
  pointsEau: number;
  piecesFermees: number;
  piecesEclairees: number;
}

function count(plan: PlanInput): Counts {
  const c = { chambre: 0, sejour: 0, cuisine: 0, sdb: 0, wc: 0, douche: 0 };
  for (const p of plan.pieces) {
    if (p.type in c) (c as Record<string, number>)[p.type] = ((c as Record<string, number>)[p.type] ?? 0) + 1;
  }
  const pointsEau = c.sdb + c.wc + c.douche;
  const piecesFermees = c.chambre + c.cuisine + pointsEau;
  const piecesEclairees = c.chambre + c.sejour + c.cuisine;
  return { ...c, pointsEau, piecesFermees, piecesEclairees };
}

/* ── Chaînage générique (béton + coffrage + acier) ─────────────────────────── */
function chainageLines(s: number, kBeton: number, kCoffrage: number, kAcier: number): DevisLine[] {
  return [
    line("Béton dosé à 350 kg/m³", "m3", kBeton * s, PU.beton350),
    line("Coffrage", "m2", kCoffrage * s, PU.coffrage),
    line("Acier", "kg", kAcier * s, PU.acier),
  ];
}

/* ── Moteur ────────────────────────────────────────────────────────────────── */
export function generateDevis(plan: PlanInput): DevisResult {
  const s = plan.surfaceHabitable_m2;
  const std: Standing = plan.standing;
  const mul = STANDING_MUL[std];
  const c = count(plan);

  const hsp = plan.hauteurSousPlafond_m ?? 3.0;
  const perimetre = plan.perimetre_m ?? Math.round(4 * Math.sqrt(s) * 1.05);

  /* ===================== A. GROS ŒUVRE ===================== */

  // 1. TERRASSEMENTS
  const terrassements = subLot("1", "Terrassements", [
    line("Fouille en rigole", "m3", COEF.fouilleRigole * s, PU.fouilleRigole),
    line("Remblai sous dallage", "m3", COEF.remblaiDallage * s, PU.remblaiDallage),
    line("Remblai des fouilles en rigole", "m3", COEF.remblaiFouilles * s, PU.remblaiFouilles),
  ]);

  // 2. INFRASTRUCTURE
  const infrastructure = subLot("2", "Infrastructure", [
    line("Béton de propreté", "m3", COEF.betonProprete * s, PU.betonProprete),
    // Semelle filante
    line("Semelle — Béton dosé à 250 kg/m³", "m3", COEF.semelleBeton250 * s, PU.beton250),
    line("Semelle — Coffrage", "m2", COEF.semelleCoffrage * s, PU.coffrage),
    line("Semelle — Acier", "kg", COEF.semelleAcier * s, PU.acier),
    // Dallage
    line("Dallage — Film polyane", "m2", s, PU.filmPolyane),
    line("Dallage — Béton dosé à 350 kg/m³", "m3", COEF.dallageBeton * s, PU.beton350),
    line("Dallage — Acier", "kg", COEF.dallageAcier * s, PU.acier),
    // Mur de soubassement
    line("Mur de soubassement — Agglos 15 pleins", "m2", COEF.murSoubassement * s, PU.aggloPlein),
    // Chaînages bas
    ...chainageLines(s, COEF.chainage, COEF.chainageCoffrage, COEF.chainageAcier).map((l) => ({
      ...l,
      designation: `Chaînage bas — ${l.designation}`,
    })),
  ]);

  // 3. SUPERSTRUCTURE
  const murLines: DevisLine[] = [];
  if (plan.materiauMur === "geobeton" || plan.materiauMur === "geobeton18") {
    const pu = plan.materiauMur === "geobeton18" ? PU.geobeton18 : PU.geobeton;
    murLines.push(line("Mur en géobéton (BTC)", "U", COEF.geobetonBlocsParM2 * s, pu));
  } else {
    const pu = plan.materiauMur === "agglo-plein" ? PU.aggloPlein : PU.aggloCreux;
    murLines.push(line("Mur en agglos 15", "m2", COEF.murAggloFace * s, pu));
  }
  const superstructure = subLot("3", "Superstructure", [
    ...murLines,
    ...chainageLines(s, COEF.chainage, COEF.chainageCoffrage, COEF.chainageAcier).map((l) => ({
      ...l,
      designation: `Chaînage haut — ${l.designation}`,
    })),
    line("Poteaux — Béton dosé à 350 kg/m³", "m3", COEF.poteauBeton * s, PU.beton350),
    line("Poteaux — Coffrage", "m2", COEF.poteauCoffrage * s, PU.coffrage),
    line("Poteaux — Acier", "kg", COEF.poteauAcier * s, PU.acier),
  ]);

  // 4. CHARPENTE – COUVERTURE
  const fpStaff = mul.fauxPlafondStaff;
  const puCouv = plan.toiture === "tuile" || plan.toiture === "tole-bac" ? PU.couvertureTuile : PU.couvertureTole;
  const charpente = subLot("4", "Charpente — Couverture", [
    line("Charpente bois assemblée", "m2", COEF.charpenteFacteur * s, PU.charpente),
    line(
      fpStaff ? "Faux-plafond en staff décoratif" : "Faux-plafond en contreplaqué 8 mm",
      "m2",
      s,
      fpStaff ? PU.fauxPlafondStaff : PU.fauxPlafondCP,
    ),
    line("Couverture", "m2", COEF.charpenteFacteur * s, puCouv),
  ]);

  // 5. ASSAINISSEMENT
  const ass = ASSAINISSEMENT[std];
  const assainissement = subLot("5", "Assainissement", [
    line("Fosse septique", "U", 1, ass.fosse),
    line("Puits perdu", "U", 1, ass.puits),
  ]);

  const grosOeuvre = lot("A", "Gros œuvre", [
    terrassements,
    infrastructure,
    superstructure,
    charpente,
    assainissement,
  ]);

  /* ===================== B. SECOND ŒUVRE ===================== */

  // 6. MENUISERIE
  const men = MENUISERIE[std];
  const nbPortes = c.piecesFermees + 2; // + entrée + service
  const nbFenetres = Math.max(1, Math.round(c.piecesEclairees * 1.3));
  const nbPlacards = Math.max(1, Math.round(c.chambre / 2));
  const menuiserie = subLot("6", "Menuiserie", [
    line("Portes (isoplane / âme pleine)", "U", nbPortes, men.porte),
    line("Fenêtres", "U", nbFenetres, men.fenetre),
    line("Placards / rangements", "U", nbPlacards, men.placard),
  ]);

  // 7. ELECTRICITE (forfaits par sous-poste, calibrés)
  const elecTotal = COEF.elecParM2 * s * mul.elec;
  const electricite = subLot("7", "Électricité", [
    line("Tuyauterie (gaines, boîtes)", "FFT", 1, r(elecTotal * 0.18)),
    line("Filerie (câbles, fils, terre)", "FFT", 1, r(elecTotal * 0.42)),
    line("Appareillage (prises, interrupteurs, protections, MO)", "FFT", 1, r(elecTotal * 0.4)),
  ]);

  // 8. PLOMBERIE (par point d'eau)
  const plombTotal = COEF.plomberieParPointEau * Math.max(1, c.pointsEau) * mul.plomberie;
  const plomberie = subLot("8", "Plomberie", [
    line("Appareillage sanitaire (WC, lavabo, douche, évier)", "FFT", 1, r(plombTotal * 0.42)),
    line("Tuyauterie d'évacuation (PVC)", "FFT", 1, r(plombTotal * 0.26)),
    line("Alimentation (PEX, nourrices, MO)", "FFT", 1, r(plombTotal * 0.32)),
  ]);

  // 9. CARRELAGE
  const carrelage = subLot("9", "Carrelage", [
    line("Chape", "m2", s, PU.chape),
    line("Revêtement faïence (murs pièces d'eau)", "m2", COEF.faienceParSdb * Math.max(1, c.pointsEau), PU.faience),
    line("Revêtement sol grès cérame", "m2", s, PU.gresCerame),
  ]);

  // 10. ENDUITS
  const enduits = subLot("10", "Enduits", [
    line("Crépissage extérieur", "m2", COEF.crepissageFace * s, PU.crepissage),
    line("Crépissage intérieur", "m2", COEF.crepissageFace * s, PU.crepissage),
    line("Masticage extérieur", "m2", COEF.masticageFace * s, PU.masticage),
    line("Masticage intérieur", "m2", COEF.masticageFace * s, PU.masticage),
  ]);

  // 11. PEINTURE
  const peintMul = mul.peinture;
  const peinture = subLot("11", "Peinture", [
    line("Peinture vinylique murs (ext.)", "m2", COEF.crepissageFace * s, r(PU.peintureVinyl * peintMul)),
    line("Peinture vinylique murs (int.)", "m2", COEF.crepissageFace * s, r(PU.peintureVinyl * peintMul)),
    line("Vernissage extérieur", "m2", COEF.masticageFace * s, r(PU.vernissage * peintMul)),
    line("Vernissage intérieur", "m2", COEF.masticageFace * s, r(PU.vernissage * peintMul)),
    line("Peinture vinylique faux-plafond", "m2", s, r(PU.peintureVinyl * peintMul)),
  ]);

  const secondOeuvre = lot("B", "Second œuvre", [
    menuiserie,
    electricite,
    plomberie,
    carrelage,
    enduits,
    peinture,
  ]);

  /* ===================== TOTAUX ===================== */
  const totalHT = grosOeuvre.total + secondOeuvre.total;

  return {
    lots: [grosOeuvre, secondOeuvre],
    totalGrosOeuvre: grosOeuvre.total,
    totalSecondOeuvre: secondOeuvre.total,
    totalHT,
    ratioFcfaM2: r(totalHT / s),
    meta: {
      surface_m2: s,
      niveaux: plan.niveaux,
      standing: std,
      compte: c as unknown as Record<string, number>,
      perimetre_m: perimetre,
    },
  };
}
