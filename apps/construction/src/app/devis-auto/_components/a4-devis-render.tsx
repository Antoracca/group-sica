"use client";

import type { DevisResult, PlanInput, PieceType } from "@sica/devis-engine";
import { A4Sheet } from "@/app/devis/_components/a4-sheet";
import { COMPANY } from "@/lib/devis/company";

/*
  Rendu A4 paginé du devis IA — utilisé pour l'impression PDF.
  Réutilise la coquille A4Sheet (logo + en-tête + filet ambre + pied + n°page)
  du simulateur manuel, et découpe le DQE en pages selon une hauteur utile fixe.

  Stratégie de pagination déterministe (px ; A4 96 dpi = 794×1123) :
    - Page 1 : intro + plan compris
    - Pages 2..N : lots (un sous-lot ne peut pas être coupé au milieu d'une ligne)
    - Page finale : totaux + signature + mentions
*/

/* Hauteurs estimées (px) — majorants pour éviter tout débordement. */
const H = {
  intro: 180,
  planHeader: 50,
  planMetrics: 90,
  planPieceRow: 22,
  planFooter: 80,
  lotHeader: 56,
  sousLotHeader: 28,
  tableHead: 32,
  tableRow: 38,
  sousLotFooter: 32,
  totals: 240,
  signature: 180,
} as const;

const USABLE_HEIGHT = 880; // hauteur dispo dans A4Sheet (1123 - en-tête - pied)

const PIECE_LABEL: Record<PieceType, string> = {
  chambre: "Chambre",
  sejour: "Séjour / Salon",
  cuisine: "Cuisine",
  sdb: "Salle d'eau",
  wc: "WC",
  douche: "Douche",
  terrasse: "Terrasse",
  veranda: "Véranda",
  couloir: "Couloir",
  autre: "Autre",
};

const STANDING_LABEL = {
  eco: "Économique",
  moyen: "Standard",
  haut: "Haut standing",
  premium: "Premium",
} as const;

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n));
}

function fmtNum(n: number) {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
}

/* ── Blocs de contenu ──────────────────────────────────────────────────── */
type Block =
  | { kind: "intro"; plan: PlanInput; devis: DevisResult; reference: string }
  | { kind: "lot-header"; lotCode: string; lotTitre: string; lotTotal: number }
  | { kind: "sl-header"; code: string; titre: string; continued: boolean }
  | { kind: "sl-row"; line: DevisResult["lots"][number]["sousLots"][number]["lignes"][number] }
  | { kind: "sl-footer"; titre: string; sousTotal: number }
  | { kind: "totals"; devis: DevisResult }
  | { kind: "signature"; devis: DevisResult };

function heightOf(b: Block): number {
  switch (b.kind) {
    case "intro": return H.intro + H.planHeader + H.planMetrics + b.plan.pieces.length * H.planPieceRow + H.planFooter;
    case "lot-header": return H.lotHeader;
    case "sl-header": return H.sousLotHeader + H.tableHead;
    case "sl-row": return H.tableRow;
    case "sl-footer": return H.sousLotFooter;
    case "totals": return H.totals;
    case "signature": return H.signature;
  }
}

function paginate(blocks: Block[]): Block[][] {
  const pages: Block[][] = [[]];
  let used = 0;
  for (const b of blocks) {
    const h = heightOf(b);
    const current = pages[pages.length - 1]!;
    if (used + h > USABLE_HEIGHT && current.length > 0) {
      pages.push([]);
      used = 0;
    }
    pages[pages.length - 1]!.push(b);
    used += h;
  }
  return pages;
}

/* ── Composant principal ───────────────────────────────────────────────── */
interface Props {
  plan: PlanInput;
  devis: DevisResult;
  reference: string;
}

export function A4DevisRender({ plan, devis, reference }: Props) {
  // Construit la séquence de blocs
  const blocks: Block[] = [];
  blocks.push({ kind: "intro", plan, devis, reference });

  for (const lot of devis.lots) {
    blocks.push({ kind: "lot-header", lotCode: lot.code, lotTitre: lot.titre, lotTotal: lot.total });
    for (const sl of lot.sousLots) {
      blocks.push({ kind: "sl-header", code: sl.code, titre: sl.titre, continued: false });
      for (const ligne of sl.lignes) {
        blocks.push({ kind: "sl-row", line: ligne });
      }
      blocks.push({ kind: "sl-footer", titre: sl.titre, sousTotal: sl.sousTotal });
    }
  }

  blocks.push({ kind: "totals", devis });
  blocks.push({ kind: "signature", devis });

  const pages = paginate(blocks);

  return (
    <div className="flex flex-col items-center gap-6 bg-mist/30 py-8 print:gap-0 print:bg-white print:py-0">
      {pages.map((page, i) => (
        <A4Sheet key={i} page={i + 1} total={pages.length} reference={reference}>
          {page.map((b, j) => renderBlock(b, `${i}-${j}`))}
        </A4Sheet>
      ))}
    </div>
  );
}

/* ── Renderers ─────────────────────────────────────────────────────────── */
function renderBlock(b: Block, key: string): React.ReactNode {
  switch (b.kind) {
    case "intro": return <Intro key={key} plan={b.plan} devis={b.devis} reference={b.reference} />;
    case "lot-header":
      return (
        <div key={key} className="mt-4 mb-3 flex items-baseline gap-3 border-b-2 border-brand-royal/80 pb-1.5">
          <span className="font-mono text-[0.85rem] font-bold text-brand-amber">{b.lotCode}.</span>
          <h2 className="font-display text-[1.1rem] font-bold uppercase tracking-[0.06em] text-brand-royal">
            {b.lotTitre}
          </h2>
          <span className="ml-auto font-mono text-[0.85rem] font-semibold tabular-nums text-ink">
            {fmt(b.lotTotal)} FCFA
          </span>
        </div>
      );
    case "sl-header":
      return (
        <div key={key}>
          <p className="mt-3 mb-1.5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate">
            {b.code}. {b.titre}{b.continued ? " (suite)" : ""}
          </p>
          <div className="grid grid-cols-[1fr_3.5rem_4rem_7rem_8rem] gap-2 border-b-2 border-brand-royal/60 pb-1.5 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-brand-royal">
            <span>Désignation</span>
            <span className="text-center">Unité</span>
            <span className="text-right">Qté</span>
            <span className="text-right">P.U.</span>
            <span className="text-right">Total</span>
          </div>
        </div>
      );
    case "sl-row":
      return (
        <div key={key} className="grid grid-cols-[1fr_3.5rem_4rem_7rem_8rem] items-center gap-2 border-b border-black/5 py-2.5 text-[0.85rem]">
          <span className="text-ink">{b.line.designation}</span>
          <span className="text-center font-mono text-[0.7rem] text-slate">{b.line.unite}</span>
          <span className="text-right tabular-nums text-slate">{fmtNum(b.line.quantite)}</span>
          <span className="text-right tabular-nums text-slate">{fmt(b.line.pu)}</span>
          <span className="text-right font-semibold tabular-nums text-ink">{fmt(b.line.montant)}</span>
        </div>
      );
    case "sl-footer":
      return (
        <div key={key} className="grid grid-cols-[1fr_auto] gap-2 bg-brand-royal/[0.06] px-2 py-1.5 text-[0.78rem]">
          <span className="font-mono font-semibold uppercase tracking-[0.08em] text-brand-royal">
            Sous-total · {b.titre}
          </span>
          <span className="font-mono font-bold tabular-nums text-ink">{fmt(b.sousTotal)} FCFA</span>
        </div>
      );
    case "totals": return <Totals key={key} devis={b.devis} />;
    case "signature": return <Signature key={key} />;
  }
}

/* ── Sections ──────────────────────────────────────────────────────────── */
function Intro({ plan, devis, reference }: { plan: PlanInput; devis: DevisResult; reference: string }) {
  const niveaux = plan.niveaux === 1 ? "Plain-pied" : `R+${plan.niveaux - 1}`;
  return (
    <>
      <div className="mb-4 rounded-md bg-mist/60 p-3 grid grid-cols-3 gap-3 text-[0.78rem]">
        <Meta label="Référence" value={reference} />
        <Meta label="Date d'émission" value={new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })} />
        <Meta label="Établi par" value={COMPANY.marque} />
      </div>

      <p className="text-[0.82rem] leading-relaxed text-slate mb-5">
        Devis estimatif généré automatiquement par les agents SICA à partir du plan
        fourni. Les quantités et prix unitaires sont issus de la bibliothèque interne
        SICA Construction. Couverture nationale : nos techniciens interviennent sur tout
        le territoire ivoirien ; toute visite de site fait l&apos;objet d&apos;une facturation.
      </p>

      <div className="mb-3 flex items-center gap-2.5">
        <span className="font-mono text-[0.78rem] font-bold text-brand-amber">01.</span>
        <h3 className="font-display text-[1.05rem] font-semibold uppercase tracking-[0.06em] text-brand-royal">
          Compréhension du plan
        </h3>
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        <Meta label="Surface habitable" value={`${fmtNum(plan.surfaceHabitable_m2)} m²`} />
        <Meta label="Niveaux" value={niveaux} />
        <Meta label="Standing" value={STANDING_LABEL[plan.standing]} />
        <Meta label="Matériau mur" value={plan.materiauMur} />
      </div>

      <p className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-slate mb-1.5">
        Pièces identifiées ({plan.pieces.length})
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 text-[0.78rem]">
        {plan.pieces.map((p, i) => (
          <div key={i} className="flex items-baseline justify-between border-b border-dotted border-black/10 py-0.5">
            <span className="text-ink">{p.nom ?? PIECE_LABEL[p.type]}</span>
            <span className="font-mono tabular-nums text-slate">{fmtNum(p.surface_m2)} m²</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[0.8rem]">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate">
          Ratio FCFA / m²
        </span>{" "}
        <span className="ml-2 font-display font-bold text-brand-royal">
          {fmt(devis.ratioFcfaM2)}
        </span>
      </p>
    </>
  );
}

function Totals({ devis }: { devis: DevisResult }) {
  return (
    <section className="mt-5 flex justify-end">
      <div className="w-[22rem] text-[0.88rem]">
        <Row label="Total Gros œuvre" value={devis.totalGrosOeuvre} />
        <Row label="Total Second œuvre" value={devis.totalSecondOeuvre} />
        <div className="mt-2 flex items-center justify-between rounded-md bg-brand-royal px-3 py-2.5 text-white">
          <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em]">
            Total estimatif HT
          </span>
          <span className="font-display text-base font-bold tabular-nums">
            {fmt(devis.totalHT)} FCFA
          </span>
        </div>
        <p className="mt-2 text-right font-mono text-[0.7rem] text-slate">
          Ratio : {fmt(devis.ratioFcfaM2)} FCFA / m²
        </p>
      </div>
    </section>
  );
}

function Signature() {
  return (
    <section className="mt-6">
      <p className="mb-3 text-[0.78rem] text-slate">
        Fait à Abidjan, le {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}.
      </p>
      <div className="grid grid-cols-2 gap-8">
        <SignatureBox title="Le client" subtitle="Bon pour accord" />
        <SignatureBox title={`Pour ${COMPANY.marque}`} subtitle={COMPANY.directeur} />
      </div>
    </section>
  );
}

function SignatureBox({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <p className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-brand-royal">{title}</p>
      <p className="text-[0.7rem] text-slate">{subtitle}</p>
      <div className="mt-2 flex h-24 items-center justify-center rounded-md border border-dashed border-slate/40 bg-mist/40">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-slate/60">
          Signature
        </span>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-slate">
        {label}
      </span>
      <span className="mt-0.5 block text-[0.92rem] font-medium leading-snug text-ink">{value}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-black/[0.05] py-1.5">
      <span className="text-slate">{label}</span>
      <span className="font-mono tabular-nums text-ink">{fmt(value)} FCFA</span>
    </div>
  );
}
