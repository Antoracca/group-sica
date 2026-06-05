import type { DevisState, Totals } from "./types";
import { COMPANY } from "./company";
import { UNIT_LABEL } from "./catalog";
import { formatFcfa, formatDateFr, lineQty, lineTotal } from "./pricing";

/*
  Export Word (.doc) — génère un document HTML autonome, stylé en CSS inline,
  qu'on emballe au format Word. Construit à partir des DONNÉES (pas du DOM),
  pour un rendu propre et structuré à l'ouverture dans Word.
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

function row(label: string, detail: string, unit: string, qty: number, pu: number, total: number) {
  return `
    <tr>
      <td style="padding:6px 8px;border-bottom:1px solid ${C.line};">
        <strong>${esc(label)}</strong>${detail ? `<br><span style="font-size:10px;color:${C.slate};">${esc(detail)}</span>` : ""}
      </td>
      <td style="padding:6px 8px;border-bottom:1px solid ${C.line};text-align:center;color:${C.slate};">${esc(unit)}</td>
      <td style="padding:6px 8px;border-bottom:1px solid ${C.line};text-align:right;">${qty}</td>
      <td style="padding:6px 8px;border-bottom:1px solid ${C.line};text-align:right;">${formatFcfa(pu)}</td>
      <td style="padding:6px 8px;border-bottom:1px solid ${C.line};text-align:right;font-weight:bold;">${formatFcfa(total)}</td>
    </tr>`;
}

function infoRow(label: string, value: string) {
  return `<tr>
    <td style="padding:4px 8px;color:${C.slate};font-size:11px;width:38%;">${esc(label)}</td>
    <td style="padding:4px 8px;font-weight:600;">${esc(value || "—")}</td>
  </tr>`;
}

export function buildDevisHtml(state: DevisState, totals: Totals): string {
  const surface = state.projet.surface;
  const c = state.client;
  const l = state.localisation;
  const pr = state.projet;

  const worksRows = state.works
    .filter((w) => w.enabled)
    .map((w) => row(w.label, w.detail, UNIT_LABEL[w.unit], lineQty(w, surface), w.pu, lineTotal(w, surface)))
    .join("");

  const optionRows = state.options
    .map((o) => row(o.label, "", UNIT_LABEL[o.unit], o.qty, o.pu, lineTotal(o, surface)))
    .join("");

  const tableHead = `
    <tr style="background:${C.royal};color:#fff;">
      <th style="padding:7px 8px;text-align:left;">Désignation</th>
      <th style="padding:7px 8px;text-align:center;">Unité</th>
      <th style="padding:7px 8px;text-align:right;">Qté</th>
      <th style="padding:7px 8px;text-align:right;">P.U. (FCFA)</th>
      <th style="padding:7px 8px;text-align:right;">Total (FCFA)</th>
    </tr>`;

  const clientName = [c.civilite, c.nom, c.prenom].filter(Boolean).join(" ");

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>${esc(state.ref)}</title></head>
<body style="font-family:Calibri,Arial,sans-serif;color:${C.ink};font-size:12px;">
  <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
    <tr>
      <td style="vertical-align:top;">
        <div style="font-size:18px;font-weight:bold;color:${C.royal};">${esc(COMPANY.marque)}</div>
        <div style="font-size:10px;color:${C.slate};letter-spacing:1px;">${esc(COMPANY.baseline)}</div>
      </td>
      <td style="vertical-align:top;text-align:right;">
        <div style="font-size:16px;font-weight:bold;">DEVIS ESTIMATIF</div>
        <div style="font-size:11px;color:${C.slate};">${esc(state.ref)}</div>
        <div style="font-size:11px;color:${C.slate};">${esc(formatDateFr(state.date))}</div>
      </td>
    </tr>
  </table>
  <div style="height:3px;background:${C.amber};margin-bottom:16px;"></div>

  <h3 style="color:${C.royal};font-size:13px;border-bottom:2px solid ${C.royal};padding-bottom:3px;">Client</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
    ${infoRow("Nom et prénom", clientName)}
    ${infoRow("Entreprise", c.entreprise)}
    ${infoRow("Téléphone", c.telephone)}
    ${infoRow("Adresse e-mail", c.email)}
  </table>

  <h3 style="color:${C.royal};font-size:13px;border-bottom:2px solid ${C.royal};padding-bottom:3px;">Projet</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
    ${infoRow("Type de chantier", pr.typeChantier)}
    ${infoRow("Nature des travaux", pr.natureTravaux)}
    ${infoRow("Surface", surface > 0 ? `${surface} m²` : "")}
    ${infoRow("Niveaux", pr.niveaux > 0 ? `R+${pr.niveaux}` : "")}
    ${infoRow("Localisation", [l.quartier, l.ville].filter(Boolean).join(", "))}
    ${infoRow("Adresse / repère", l.adresse)}
    ${infoRow("Délai souhaité", pr.delai)}
  </table>

  <h3 style="color:${C.royal};font-size:13px;">Corps d'état</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">${tableHead}${worksRows}</table>

  ${
    optionRows
      ? `<h3 style="color:${C.royal};font-size:13px;">Options supplémentaires</h3>
  <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">${tableHead}${optionRows}</table>`
      : ""
  }

  <table style="width:55%;border-collapse:collapse;margin-left:45%;margin-bottom:16px;">
    ${infoRow("Sous-total", `${formatFcfa(totals.sousTotal)} FCFA`)}
    ${totals.remise > 0 ? infoRow(`Remise (${state.finances.remisePct}%)`, `- ${formatFcfa(totals.remise)} FCFA`) : ""}
    ${state.finances.tva ? infoRow("Total HT", `${formatFcfa(totals.htNet)} FCFA`) : ""}
    ${state.finances.tva ? infoRow("TVA (18%)", `${formatFcfa(totals.tva)} FCFA`) : ""}
    <tr style="background:${C.royal};color:#fff;">
      <td style="padding:7px 8px;font-weight:bold;">Total ${state.finances.tva ? "TTC" : "estimatif"}</td>
      <td style="padding:7px 8px;text-align:right;font-weight:bold;">${formatFcfa(totals.ttc)} FCFA</td>
    </tr>
    ${infoRow(`Avance (${state.finances.avancePct}%)`, `${formatFcfa(totals.avance)} FCFA`)}
    ${infoRow("Solde à la livraison", `${formatFcfa(totals.solde)} FCFA`)}
  </table>

  <h3 style="color:${C.royal};font-size:13px;">Conditions</h3>
  <p style="font-size:11px;color:${C.slate};line-height:1.5;">
    Méthodologie : visite de site, étude de sol, conception et devis quantitatif, validation et démarches, exécution et livraison.<br>
    Paiement : ${esc(state.finances.modalite)} — ${esc(COMPANY.banque)}${COMPANY.iban ? ` (${esc(COMPANY.iban)})` : ""}.<br>
    Devis valable ${state.validiteJours} jours à compter de sa date d'émission.
  </p>

  <table style="width:100%;border-collapse:collapse;margin-top:24px;">
    <tr>
      <td style="width:50%;padding:8px;">
        <div style="font-size:11px;color:${C.royal};font-weight:bold;">Le client</div>
        <div style="font-size:10px;color:${C.slate};">Bon pour accord</div>
        <div style="height:60px;border:1px dashed ${C.line};margin-top:6px;"></div>
      </td>
      <td style="width:50%;padding:8px;">
        <div style="font-size:11px;color:${C.royal};font-weight:bold;">Pour ${esc(COMPANY.marque)}</div>
        <div style="font-size:10px;color:${C.slate};">${esc(COMPANY.directeur)}</div>
        <div style="height:60px;border:1px dashed ${C.line};margin-top:6px;"></div>
      </td>
    </tr>
  </table>

  <p style="margin-top:20px;font-size:9px;color:${C.slate};">
    ${esc(COMPANY.groupe)} · RCCM ${esc(COMPANY.rccm)} · Capital ${esc(COMPANY.capital)} · ${esc(COMPANY.siege)} · ${esc(COMPANY.telephones[0])} · ${esc(COMPANY.email)}
  </p>
</body>
</html>`;
}

export function exportDevisToWord(state: DevisState, totals: Totals) {
  const html = buildDevisHtml(state, totals);
  const blob = new Blob(["﻿", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${state.ref}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
