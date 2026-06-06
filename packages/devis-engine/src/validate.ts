/*
  Script de calibration : rejoue les 4 devis réels de SICA et compare le total
  produit par le moteur déterministe au total réel facturé. Objectif Phase 1 :
  rester à ±15 % du total réel sur chaque projet (preuve que les règles tiennent
  AVANT de brancher l'agent vision).

  Usage : pnpm --filter @sica/devis-engine validate
*/

import { generateDevis } from "./engine";
import type { PlanInput } from "./types";

interface Bench {
  nom: string;
  total_reel: number;
  plan: PlanInput;
}

const BENCHES: Bench[] = [
  {
    // Devis n°274 — F3 villa basse Tiassalé (Lieutenant Kassi)
    nom: "F3 Tiassalé (Kassi, géobéton)",
    total_reel: 22_168_595,
    plan: {
      niveaux: 1,
      standing: "moyen",
      surfaceHabitable_m2: 84,
      materiauMur: "geobeton",
      toiture: "tole-ondulee",
      pieces: [
        { type: "chambre", surface_m2: 14 },
        { type: "chambre", surface_m2: 14 },
        { type: "chambre", surface_m2: 14 },
        { type: "sejour", surface_m2: 22 },
        { type: "cuisine", surface_m2: 8 },
        { type: "sdb", surface_m2: 4 },
        { type: "sdb", surface_m2: 4 },
        { type: "wc", surface_m2: 2 },
      ],
    },
  },
  {
    // Devis n°274 — F4 villa basse Ouellé (M. Mathieu)
    nom: "F4 Ouellé (Mathieu, géobéton)",
    total_reel: 27_134_202,
    plan: {
      niveaux: 1,
      standing: "moyen",
      surfaceHabitable_m2: 127,
      materiauMur: "geobeton",
      toiture: "tole-ondulee",
      pieces: [
        { type: "chambre", surface_m2: 14 },
        { type: "chambre", surface_m2: 14 },
        { type: "chambre", surface_m2: 14 },
        { type: "chambre", surface_m2: 14 },
        { type: "sejour", surface_m2: 30 },
        { type: "cuisine", surface_m2: 10 },
        { type: "sdb", surface_m2: 4 },
        { type: "sdb", surface_m2: 4 },
        { type: "wc", surface_m2: 2 },
      ],
    },
  },
  {
    // Devis — F4 + terrasse dalle Yamoussoukro (Dr Diarrassouba)
    nom: "F4 Yakro (Diarrassouba, haut standing)",
    total_reel: 44_182_136,
    plan: {
      niveaux: 1,
      standing: "haut",
      surfaceHabitable_m2: 160,
      materiauMur: "agglo-creux",
      toiture: "tuile",
      indicesStanding: ["faux-plafond staff", "terrasse dalle"],
      pieces: [
        { type: "chambre", surface_m2: 16 },
        { type: "chambre", surface_m2: 16 },
        { type: "chambre", surface_m2: 16 },
        { type: "chambre", surface_m2: 16 },
        { type: "sejour", surface_m2: 35 },
        { type: "cuisine", surface_m2: 10 },
        { type: "sdb", surface_m2: 5 },
        { type: "sdb", surface_m2: 5 },
        { type: "sdb", surface_m2: 5 },
        { type: "wc", surface_m2: 2 },
      ],
    },
  },
  {
    // Devis — F4 R+1 moderne Alépé (Assamoi)
    nom: "F4 R+1 Alépé (Assamoi, premium)",
    total_reel: 85_423_331,
    plan: {
      niveaux: 2,
      standing: "premium",
      surfaceHabitable_m2: 323,
      materiauMur: "geobeton18",
      toiture: "tole-bac",
      indicesStanding: ["dalle pleine", "staff", "vitrage grandes baies", "split", "inox"],
      pieces: [
        { type: "chambre", surface_m2: 20 },
        { type: "chambre", surface_m2: 20 },
        { type: "chambre", surface_m2: 20 },
        { type: "chambre", surface_m2: 20 },
        { type: "sejour", surface_m2: 60 },
        { type: "sejour", surface_m2: 30 },
        { type: "cuisine", surface_m2: 14 },
        { type: "sdb", surface_m2: 6 },
        { type: "sdb", surface_m2: 6 },
        { type: "sdb", surface_m2: 6 },
        { type: "sdb", surface_m2: 6 },
        { type: "terrasse", surface_m2: 30 },
      ],
    },
  },
];

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(Math.round(n));
}

function pct(n: number): string {
  const s = (n * 100).toFixed(1) + " %";
  return n >= 0 ? "+" + s : s;
}

console.log("\n╔════════════════════════════════════════════════════════════════╗");
console.log("║   SICA DEVIS ENGINE — VALIDATION SUR 4 DEVIS RÉELS             ║");
console.log("╚════════════════════════════════════════════════════════════════╝\n");

let totalEcart = 0;
const TARGET = 0.15;
let okCount = 0;

for (const b of BENCHES) {
  const res = generateDevis(b.plan);
  const ecart = (res.totalHT - b.total_reel) / b.total_reel;
  const absEcart = Math.abs(ecart);
  const ok = absEcart <= TARGET;
  if (ok) okCount++;
  totalEcart += absEcart;

  console.log(`── ${b.nom}`);
  console.log(`   Surface : ${b.plan.surfaceHabitable_m2} m²   Standing : ${b.plan.standing}   Niveaux : ${b.plan.niveaux}`);
  console.log(`   Réel   : ${fmt(b.total_reel).padStart(12)} FCFA  (${fmt(b.total_reel / b.plan.surfaceHabitable_m2)} /m²)`);
  console.log(`   Moteur : ${fmt(res.totalHT).padStart(12)} FCFA  (${fmt(res.ratioFcfaM2)} /m²)`);
  console.log(`   Écart  : ${pct(ecart).padStart(12)}        ${ok ? "✓ OK" : "✗ HORS CIBLE (±15 %)"}`);
  console.log(`     gros œuvre   ${fmt(res.totalGrosOeuvre).padStart(12)} FCFA`);
  console.log(`     second œuvre ${fmt(res.totalSecondOeuvre).padStart(12)} FCFA`);
  console.log("");
}

const moy = totalEcart / BENCHES.length;
console.log("────────────────────────────────────────────────────────────────");
console.log(`Précision moyenne : ${(moy * 100).toFixed(1)} %  (cible ≤ 15 %)`);
console.log(`Projets dans la cible : ${okCount} / ${BENCHES.length}`);
console.log("────────────────────────────────────────────────────────────────\n");

if (okCount < BENCHES.length) {
  console.log("→ Ajuster les coefficients dans packages/devis-engine/src/prices.ts");
  process.exit(1);
}
console.log("✓ Phase 1 validée — le moteur peut être branché à l'agent vision.\n");
