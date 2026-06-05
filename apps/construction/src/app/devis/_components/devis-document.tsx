import type { ReactNode } from "react";
import type { Block, Page } from "@/lib/devis/pagination";
import { buildPages } from "@/lib/devis/pagination";
import type { DevisState, OptionLine, Totals, WorkLine } from "@/lib/devis/types";
import { STANDINGS, UNIT_LABEL } from "@/lib/devis/catalog";
import {
  formatFcfa,
  formatDateFr,
  lineQty,
  lineTotal,
} from "@/lib/devis/pricing";
import { COMPANY } from "@/lib/devis/company";
import { A4Sheet } from "./a4-sheet";
import { StampRenderer } from "./stamp-renderer";

/* ── Primitives ─────────────────────────────────────────────────────── */

function Field({
  label,
  value,
  wide,
}: {
  label: string;
  value?: string | number | null;
  wide?: boolean;
}) {
  const filled = value !== undefined && value !== null && String(value).trim() !== "";
  return (
    <div className={wide ? "col-span-2" : ""}>
      <span className="block font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate">
        {label}
      </span>
      {filled ? (
        <span className="mt-0.5 block text-[0.95rem] font-medium leading-snug text-ink">
          {value}
        </span>
      ) : (
        <span className="mt-1.5 block h-[0.7rem] border-b border-dotted border-slate/50" />
      )}
    </div>
  );
}

function SectionTitle({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span className="font-mono text-[0.72rem] font-bold text-brand-amber">{index}</span>
      <h2 className="font-display text-[1.12rem] font-semibold uppercase tracking-[0.06em] text-brand-royal">
        {children}
      </h2>
      <span className="h-px flex-1 bg-black/10" />
    </div>
  );
}

const COLS = "grid grid-cols-[1fr_3.5rem_4rem_7rem_8rem] gap-2";

function TableHead({ continued }: { continued: boolean }) {
  return (
    <div
      className={`${COLS} border-b-2 border-brand-royal/80 pb-1.5 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-brand-royal`}
    >
      <span>
        Désignation{continued ? " (suite)" : ""}
      </span>
      <span className="text-center">Unité</span>
      <span className="text-right">Qté</span>
      <span className="text-right">P.U.</span>
      <span className="text-right">Total</span>
    </div>
  );
}

function Row({
  label,
  detail,
  unit,
  qty,
  pu,
  total,
}: {
  label: string;
  detail?: string;
  unit: string;
  qty: number;
  pu: number;
  total: number;
}) {
  return (
    <div className={`${COLS} items-center border-b border-black/5 py-2.5 text-[0.88rem] text-ink`}>
      <span>
        <span className="font-medium">{label}</span>
        {detail ? (
          <span className="mt-0.5 block text-[0.7rem] leading-snug text-slate">{detail}</span>
        ) : null}
      </span>
      <span className="text-center text-slate">{unit}</span>
      <span className="text-right tabular-nums">{qty}</span>
      <span className="text-right tabular-nums">{formatFcfa(pu)}</span>
      <span className="text-right font-semibold tabular-nums">{formatFcfa(total)}</span>
    </div>
  );
}

/* ── Renderers de blocs ─────────────────────────────────────────────── */

function renderBlock(
  block: Block,
  state: DevisState,
  totals: Totals,
  key: string,
): ReactNode {
  const surface = state.projet.surface;
  const c = state.client;
  const l = state.localisation;
  const pr = state.projet;

  switch (block.kind) {
    case "intro":
      return (
        <div key={key} className="mb-5">
          <div className="grid grid-cols-3 gap-3 rounded-md bg-mist/60 p-3">
            <Field label="Date d'émission" value={formatDateFr(state.date)} />
            <Field label="Validité" value={`${state.validiteJours} jours`} />
            <Field label="Établi par" value={COMPANY.marque} />
          </div>
          <p className="mt-3 text-[0.86rem] leading-relaxed text-slate">
            Ce document présente une estimation des travaux sur la base des éléments
            communiqués. Les montants seront confirmés après visite de site et étude
            technique détaillée. SICA Construction intervient sur tout le territoire
            national ivoirien&nbsp;; toute visite de site et déplacement de nos
            techniciens fait l&apos;objet d&apos;une facturation.
          </p>
        </div>
      );

    case "client":
      return (
        <section key={key} className="mb-5">
          <SectionTitle index="01">Client</SectionTitle>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <Field
              label="Nom et prénom"
              value={[c.civilite, c.nom, c.prenom].filter(Boolean).join(" ")}
            />
            <Field label="Entreprise" value={c.entreprise} />
            <Field label="Téléphone" value={c.telephone} />
            <Field label="Adresse e-mail" value={c.email} />
          </div>
        </section>
      );

    case "projet":
      return (
        <section key={key} className="mb-5">
          <SectionTitle index="02">Projet</SectionTitle>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <Field label="Type de chantier" value={pr.typeChantier} />
            <Field label="Nature des travaux" value={pr.natureTravaux} />
            <Field
              label="Standing"
              value={STANDINGS.find((t) => t.id === pr.standing)?.label ?? ""}
            />
            <Field label="Surface" value={surface > 0 ? `${surface} m²` : ""} />
            <Field label="Niveaux" value={pr.niveaux > 0 ? `R+${pr.niveaux}` : ""} />
            <Field label="Ville" value={l.ville} />
            <Field label="Quartier" value={l.quartier} />
            <Field label="Adresse / repère" value={l.adresse} wide />
            <Field label="Délai souhaité" value={pr.delai} />
            <Field label="Précisions" value={pr.description} />
          </div>
        </section>
      );

    case "works-head":
      return (
        <div key={key} className="mt-1">
          {!block.continued ? <SectionTitle index="03">Corps d&apos;état</SectionTitle> : null}
          <TableHead continued={block.continued} />
        </div>
      );

    case "works-row": {
      const w: WorkLine = block.line;
      return (
        <Row
          key={key}
          label={w.label}
          detail={w.detail}
          unit={UNIT_LABEL[w.unit]}
          qty={lineQty(w, surface)}
          pu={w.pu}
          total={lineTotal(w, surface)}
        />
      );
    }

    case "options-head":
      return (
        <div key={key} className="mt-4">
          {!block.continued ? <SectionTitle index="04">Options supplémentaires</SectionTitle> : null}
          <TableHead continued={block.continued} />
        </div>
      );

    case "options-row": {
      const o: OptionLine = block.line;
      return (
        <Row
          key={key}
          label={o.label}
          unit={UNIT_LABEL[o.unit]}
          qty={o.qty}
          pu={o.pu}
          total={lineTotal(o, surface)}
        />
      );
    }

    case "totals":
      return (
        <section key={key} className="mt-5 flex justify-end">
          <div className="w-[22rem] text-[0.9rem]">
            <Total label="Sous-total" value={totals.sousTotal} />
            {state.finances.remisePct > 0 ? (
              <Total label={`Remise (${state.finances.remisePct}%)`} value={-totals.remise} />
            ) : null}
            {state.finances.tva ? (
              <>
                <Total label="Total HT" value={totals.htNet} />
                <Total label="TVA (18%)" value={totals.tva} />
              </>
            ) : null}
            <div className="mt-1.5 flex items-center justify-between rounded-md bg-brand-royal px-3 py-2 text-white">
              <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em]">
                Total {state.finances.tva ? "TTC" : "estimatif"}
              </span>
              <span className="font-display text-lg font-bold tabular-nums">
                {formatFcfa(totals.ttc)} FCFA
              </span>
            </div>
            <Total label={`Avance (${state.finances.avancePct}%)`} value={totals.avance} />
            <Total label="Solde à la livraison" value={totals.solde} strong />
          </div>
        </section>
      );

    case "conditions":
      return (
        <section key={key} className="mt-5">
          <SectionTitle index="05">Conditions</SectionTitle>
          <div className="grid grid-cols-2 gap-6 text-[0.82rem] leading-relaxed text-slate">
            <div>
              <p className="mb-1 font-semibold text-ink">Méthodologie</p>
              <ol className="list-inside list-decimal space-y-0.5">
                <li>Visite de site et relevé topographique</li>
                <li>Étude de sol et préconisations</li>
                <li>Conception, ingénierie et devis quantitatif</li>
                <li>Validation du devis et démarches administratives</li>
                <li>Exécution, contrôle qualité et livraison</li>
              </ol>
            </div>
            <div>
              <p className="mb-1 font-semibold text-ink">Modalités</p>
              <p>Paiement : {state.finances.modalite}.</p>
              <p>Règlement par {COMPANY.banque}.</p>
              {COMPANY.iban ? <p className="mt-1 break-words">{COMPANY.iban}</p> : null}
              <p className="mt-1">
                Devis valable {state.validiteJours} jours à compter de sa date d&apos;émission.
              </p>
              <p className="mt-1">
                Couverture nationale : nos techniciens interviennent sur tout le
                territoire ivoirien. Toute visite de site et déplacement sont facturés.
              </p>
            </div>
          </div>
        </section>
      );

    case "signature": {
      const isStaff = state.role === "staff";
      const showStampSig = isStaff && (state.signatureStaffUrl || state.stampConfig || state.importedStamp);
      return (
        <section key={key} className="mt-6">
          <p className="mb-3 text-[0.8rem] text-slate">
            Fait à {state.localisation.ville || "Abidjan"}, le {formatDateFr(state.date)}.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <SignatureBox title="Le client" subtitle="Bon pour accord" image={null} stamp={null} />
            <SignatureBox
              title={`Pour ${COMPANY.marque}`}
              subtitle={COMPANY.directeur}
              image={showStampSig ? state.signatureStaffUrl : null}
              stamp={showStampSig ? state : null}
            />
          </div>
        </section>
      );
    }

    case "annexes-head":
      return (
        <section key={key} className="mt-6">
          <SectionTitle index="06">Annexes</SectionTitle>
        </section>
      );

    case "annexes-row":
      return (
        <div key={key} className="mb-3 grid grid-cols-3 gap-3">
          {block.ids.map((id) => {
            const annex = state.annexes.find((a) => a.id === id);
            return (
              <figure
                key={id}
                className="aspect-[4/3] overflow-hidden rounded-md border border-black/10 bg-mist"
              >
                {annex ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={annex.url} alt={annex.name} className="h-full w-full object-cover" />
                ) : null}
              </figure>
            );
          })}
        </div>
      );

    default:
      return null;
  }
}

function Total({
  label,
  value,
  strong,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 py-1.5">
      <span className={strong ? "font-semibold text-ink" : "text-slate"}>{label}</span>
      <span className={`tabular-nums ${strong ? "font-bold text-ink" : "text-ink"}`}>
        {formatFcfa(value)} FCFA
      </span>
    </div>
  );
}

function SignatureBox({
  title,
  subtitle,
  image,
  stamp,
}: {
  title: string;
  subtitle: string;
  image: string | null;
  stamp: DevisState | null;
}) {
  const place = stamp?.stampPlacement;
  const transform = place
    ? `rotate(${place.rotation}deg) scale(${place.scale})`
    : undefined;

  return (
    <div>
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-brand-royal">
        {title}
      </p>
      <p className="text-[0.72rem] text-slate">{subtitle}</p>
      <div className="relative mt-2 flex h-24 items-center justify-center rounded-md border border-dashed border-slate/40 bg-mist/40">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt="Signature"
            className="relative z-10 max-h-20 w-auto object-contain"
          />
        ) : !stamp ? (
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate/60">
            Signature
          </span>
        ) : null}

        {/* Cachet — posé à droite, légèrement par dessus la signature */}
        {stamp && (stamp.importedStamp || stamp.stampConfig) ? (
          <div
            className="pointer-events-none absolute right-1 top-1 z-20"
            style={{ transform, transformOrigin: "center" }}
          >
            {stamp.importedStamp ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={stamp.importedStamp.url}
                alt=""
                className="h-20 w-auto object-contain opacity-90"
              />
            ) : stamp.stampConfig ? (
              <div className="opacity-90">
                <StampRenderer config={stamp.stampConfig} size={86} />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ── Document ───────────────────────────────────────────────────────── */

export function DevisDocument({
  state,
  totals,
}: {
  state: DevisState;
  totals: Totals;
}) {
  const pages: Page[] = buildPages(state);
  return (
    <>
      {pages.map((blocks, i) => (
        <A4Sheet key={i} page={i + 1} total={pages.length} reference={state.ref}>
          {blocks.map((block, j) => renderBlock(block, state, totals, `${i}-${j}`))}
        </A4Sheet>
      ))}
    </>
  );
}
