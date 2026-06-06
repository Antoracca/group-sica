"use client";

import type { DevisResult, PlanInput } from "@sica/devis-engine";
import { COMPANY } from "@/lib/devis/company";

/*
  Export Word (.doc) du devis IA — Format HTML-Word autonome avec CSS inline.
  Construit à partir des données (pas du DOM). Inclut :
    - Logo SICA Construction embarqué en base64 (visible dans Word)
    - En-tête + filet ambre signature SICA
    - DQE structuré par lots avec page-break
    - Pied légal complet (RCCM, capital, siège, contact)
*/

const C = {
  royal: "#1E2F8A",
  amber: "#F39200",
  ink: "#0B1020",
  slate: "#475066",
  line: "#d9deea",
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function fmt(n: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n));
}

function fmtNum(n: number): string {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
}

/* Récupère le logo en base64 — utile pour Word qui ne charge pas les URLs
   relatives. Si le fetch échoue, on retourne null et l'export tourne sans logo. */
async function fetchLogoAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export function buildDevisHtml(
  plan: PlanInput,
  devis: DevisResult,
  reference: string,
  logoDataUrl: string | null,
): string {
  const dateStr = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const niveaux = plan.niveaux === 1 ? "Plain-pied" : `R+${plan.niveaux - 1}`;

  const piecesHtml = plan.pieces
    .map(
      (p) => `
    <tr>
      <td style="padding:4px 8px;font-size:11px;border-bottom:1px solid ${C.line};">${esc(p.nom ?? p.type)}</td>
      <td style="padding:4px 8px;color:${C.slate};font-size:11px;border-bottom:1px solid ${C.line};">${esc(p.type)}</td>
      <td style="padding:4px 8px;text-align:right;font-size:11px;border-bottom:1px solid ${C.line};">${fmtNum(p.surface_m2)} m²</td>
    </tr>
  `,
    )
    .join("");

  const lotsHtml = devis.lots
    .map(
      (lot, idx) => `
    <div style="page-break-inside:avoid;${idx > 0 ? "page-break-before:always;" : ""}">
      <h2 style="color:${C.royal};font-size:18px;border-bottom:2px solid ${C.royal};padding-bottom:5px;margin-top:18px;margin-bottom:12px;">
        <span style="color:${C.amber};">${esc(lot.code)}.</span>
        ${esc(lot.titre.toUpperCase())}
        <span style="float:right;font-size:14px;">${fmt(lot.total)} FCFA</span>
      </h2>
      ${lot.sousLots.map((sl) => `
        <h3 style="color:${C.royal};font-size:13px;margin-top:14px;margin-bottom:6px;">${esc(sl.code)}. ${esc(sl.titre)}</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
          <thead>
            <tr style="background:${C.royal};color:#fff;">
              <th style="padding:7px 8px;text-align:left;font-size:11px;">Désignation</th>
              <th style="padding:7px 8px;text-align:center;font-size:11px;width:50px;">Unité</th>
              <th style="padding:7px 8px;text-align:right;font-size:11px;width:70px;">Qté</th>
              <th style="padding:7px 8px;text-align:right;font-size:11px;width:90px;">P.U. (FCFA)</th>
              <th style="padding:7px 8px;text-align:right;font-size:11px;width:110px;">Montant (FCFA)</th>
            </tr>
          </thead>
          <tbody>
            ${sl.lignes.map((l) => `
              <tr>
                <td style="padding:6px 8px;border-bottom:1px solid ${C.line};font-size:12px;">${esc(l.designation)}</td>
                <td style="padding:6px 8px;border-bottom:1px solid ${C.line};text-align:center;color:${C.slate};font-size:11px;">${esc(l.unite)}</td>
                <td style="padding:6px 8px;border-bottom:1px solid ${C.line};text-align:right;font-size:12px;">${fmtNum(l.quantite)}</td>
                <td style="padding:6px 8px;border-bottom:1px solid ${C.line};text-align:right;font-size:12px;">${fmt(l.pu)}</td>
                <td style="padding:6px 8px;border-bottom:1px solid ${C.line};text-align:right;font-weight:bold;font-size:12px;">${fmt(l.montant)}</td>
              </tr>
            `).join("")}
            <tr style="background:#f3f5fb;">
              <td colspan="4" style="padding:7px 8px;font-weight:bold;font-size:12px;color:${C.royal};">
                Sous-total · ${esc(sl.titre)}
              </td>
              <td style="padding:7px 8px;text-align:right;font-weight:bold;font-size:12px;">${fmt(sl.sousTotal)} FCFA</td>
            </tr>
          </tbody>
        </table>
      `).join("")}
    </div>
  `,
    )
    .join("");

  const logoImg = logoDataUrl
    ? `<img src="${logoDataUrl}" alt="SICA Construction" style="height:60px;width:auto;display:block;" />`
    : "";

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${esc(reference)}</title>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotPromptForConvert/>
      <w:DoNotShowInsertionsAndDeletions/>
    </w:WordDocument>
  </xml>
  <style>
    @page { size: A4 portrait; margin: 2cm; }
    body { font-family: Calibri, Arial, sans-serif; color: ${C.ink}; font-size: 13px; line-height: 1.4; }
  </style>
</head>
<body>

  <!-- En-tête avec logo + identité + référence -->
  <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
    <tr>
      <td style="vertical-align:middle;width:80px;">${logoImg}</td>
      <td style="vertical-align:middle;padding-left:14px;">
        <div style="font-size:18px;font-weight:bold;color:${C.royal};">${esc(COMPANY.marque)}</div>
        <div style="font-size:10px;color:${C.slate};letter-spacing:1.5px;text-transform:uppercase;">${esc(COMPANY.baseline)}</div>
      </td>
      <td style="vertical-align:middle;text-align:right;">
        <div style="font-size:18px;font-weight:bold;">DEVIS ESTIMATIF</div>
        <div style="font-size:11px;color:${C.slate};">${esc(reference)}</div>
        <div style="font-size:11px;color:${C.slate};">${esc(dateStr)}</div>
      </td>
    </tr>
  </table>
  <div style="height:3px;background:${C.amber};margin-bottom:18px;"></div>

  <!-- Note explicative -->
  <p style="font-size:12px;color:${C.slate};line-height:1.5;margin-bottom:16px;">
    Devis estimatif généré automatiquement par les agents SICA à partir du plan fourni.
    Les quantités et prix unitaires sont issus de la bibliothèque interne SICA Construction
    et seront confirmés après visite de site et étude technique. Couverture nationale :
    nos techniciens interviennent sur tout le territoire ivoirien ; toute visite de site
    fait l'objet d'une facturation.
  </p>

  <!-- Plan compris -->
  <h2 style="color:${C.royal};font-size:16px;border-bottom:2px solid ${C.royal};padding-bottom:4px;">
    <span style="color:${C.amber};">01.</span> Compréhension du plan
  </h2>
  <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
    <tr>
      <td style="padding:5px 8px;color:${C.slate};font-size:12px;width:25%;">Surface habitable</td>
      <td style="padding:5px 8px;font-weight:600;">${fmtNum(plan.surfaceHabitable_m2)} m²</td>
      <td style="padding:5px 8px;color:${C.slate};font-size:12px;width:25%;">Niveaux</td>
      <td style="padding:5px 8px;font-weight:600;">${esc(niveaux)}</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;color:${C.slate};font-size:12px;">Standing détecté</td>
      <td style="padding:5px 8px;font-weight:600;">${esc(plan.standing)}</td>
      <td style="padding:5px 8px;color:${C.slate};font-size:12px;">Matériau mur</td>
      <td style="padding:5px 8px;font-weight:600;">${esc(plan.materiauMur)}</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;color:${C.slate};font-size:12px;">Toiture</td>
      <td style="padding:5px 8px;font-weight:600;">${esc(plan.toiture)}</td>
      <td style="padding:5px 8px;color:${C.slate};font-size:12px;">Pièces identifiées</td>
      <td style="padding:5px 8px;font-weight:600;">${plan.pieces.length}</td>
    </tr>
  </table>

  <h3 style="color:${C.royal};font-size:13px;margin-top:10px;margin-bottom:6px;">Détail des pièces</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:18px;">
    <thead>
      <tr style="background:#f3f5fb;">
        <th style="padding:6px 8px;text-align:left;font-size:11px;border-bottom:2px solid ${C.royal};">Nom</th>
        <th style="padding:6px 8px;text-align:left;font-size:11px;border-bottom:2px solid ${C.royal};">Type</th>
        <th style="padding:6px 8px;text-align:right;font-size:11px;border-bottom:2px solid ${C.royal};">Surface</th>
      </tr>
    </thead>
    <tbody>${piecesHtml}</tbody>
  </table>

  ${lotsHtml}

  <!-- Synthèse -->
  <div style="page-break-before:always;">
    <h2 style="color:${C.royal};font-size:18px;border-bottom:2px solid ${C.royal};padding-bottom:5px;margin-bottom:14px;">
      Synthèse
    </h2>
    <table style="width:55%;border-collapse:collapse;margin-left:45%;margin-bottom:24px;">
      <tr>
        <td style="padding:7px 8px;color:${C.slate};font-size:13px;">Total Gros œuvre</td>
        <td style="padding:7px 8px;text-align:right;font-weight:600;font-size:13px;">${fmt(devis.totalGrosOeuvre)} FCFA</td>
      </tr>
      <tr>
        <td style="padding:7px 8px;color:${C.slate};font-size:13px;">Total Second œuvre</td>
        <td style="padding:7px 8px;text-align:right;font-weight:600;font-size:13px;">${fmt(devis.totalSecondOeuvre)} FCFA</td>
      </tr>
      <tr style="background:${C.royal};color:#fff;">
        <td style="padding:10px;font-weight:bold;font-size:14px;">Total estimatif HT</td>
        <td style="padding:10px;text-align:right;font-weight:bold;font-size:16px;">${fmt(devis.totalHT)} FCFA</td>
      </tr>
      <tr>
        <td style="padding:5px 8px;color:${C.slate};font-size:11px;">Ratio</td>
        <td style="padding:5px 8px;text-align:right;font-size:11px;">${fmt(devis.ratioFcfaM2)} FCFA / m²</td>
      </tr>
    </table>

    <!-- Signature -->
    <p style="font-size:12px;color:${C.slate};margin-top:18px;">
      Fait à Abidjan, le ${esc(dateStr)}.
    </p>
    <table style="width:100%;border-collapse:collapse;margin-top:18px;">
      <tr>
        <td style="width:50%;padding:10px;vertical-align:top;">
          <div style="font-size:11px;color:${C.royal};font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Le client</div>
          <div style="font-size:10px;color:${C.slate};margin-top:2px;">Bon pour accord</div>
          <div style="height:80px;border:1px dashed ${C.line};margin-top:8px;border-radius:4px;"></div>
        </td>
        <td style="width:50%;padding:10px;vertical-align:top;">
          <div style="font-size:11px;color:${C.royal};font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Pour ${esc(COMPANY.marque)}</div>
          <div style="font-size:10px;color:${C.slate};margin-top:2px;">${esc(COMPANY.directeur)}</div>
          <div style="height:80px;border:1px dashed ${C.line};margin-top:8px;border-radius:4px;"></div>
        </td>
      </tr>
    </table>
  </div>

  <!-- Pied légal -->
  <p style="margin-top:30px;padding-top:8px;border-top:1px solid ${C.line};font-size:9px;color:${C.slate};line-height:1.5;text-align:center;">
    ${esc(COMPANY.groupe)} · RCCM ${esc(COMPANY.rccm)} · Capital ${esc(COMPANY.capital)} ·
    ${esc(COMPANY.siege)} · ${esc(COMPANY.telephones[0])} · ${esc(COMPANY.email)}
  </p>
</body>
</html>`;
}

export async function downloadDevisWord(
  plan: PlanInput,
  devis: DevisResult,
  reference: string,
) {
  // Récupère le logo en base64 pour qu'il s'affiche dans Word
  const logoDataUrl = await fetchLogoAsDataUrl(COMPANY.logo);
  const html = buildDevisHtml(plan, devis, reference, logoDataUrl);
  const blob = new Blob(["﻿", html], { type: "application/msword;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${reference}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
