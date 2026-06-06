import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import type { DevisResult, PlanInput } from "@sica/devis-engine";
import { EditableCell } from "./edit-line";
import { StatusControls } from "./status-controls";

/*
  Détail d'une génération Devis IA — relecture & correction.
  Affiche le plan compris (gauche) + le DQE éditable (droite).
  Chaque cellule numérique est éditable inline ; chaque modification est
  enregistrée comme correction dans devis_ai_corrections.
*/

export const dynamic = "force-dynamic";

interface Generation {
  id: string;
  reference: string;
  status: string;
  source: string;
  client_email: string | null;
  pdf_name: string | null;
  plan: PlanInput;
  devis: DevisResult;
  total_ht: number;
  ratio_fcfa_m2: number;
  duration_ms: number | null;
  created_at: string;
}

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n));
}

function dateFr(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function GenerationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const admin = createAdminClient();

  const [{ data: gen }, { data: corrections }] = await Promise.all([
    admin.from("devis_ai_generations").select("*").eq("id", id).single(),
    admin
      .from("devis_ai_corrections")
      .select("id, lot_code, sous_lot_code, ligne_index, field, before_value, after_value, created_at")
      .eq("generation_id", id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  if (!gen) notFound();
  const g = gen as Generation;
  const corrs = corrections ?? [];

  return (
    <div className="space-y-6">
      {/* Retour */}
      <Link
        href="/sica-panel-gestion/dashboard/devis-ia"
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 hover:text-[#1E2F8A]"
      >
        <ArrowLeft className="size-4" />
        Toutes les générations
      </Link>

      {/* En-tête */}
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#1E2F8A]">
              Référence
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-slate-950">{g.reference}</h1>
            <p className="mt-2 text-xs text-slate-500">
              {g.pdf_name ?? "—"} · {dateFr(g.created_at)} · source : {g.source}
              {g.client_email ? ` · ${g.client_email}` : ""}
            </p>
          </div>
          <StatusControls generationId={g.id} status={g.status} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Plan */}
        <aside className="space-y-4">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-950">Plan compris</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Surface habitable" value={`${g.plan.surfaceHabitable_m2} m²`} />
              <Row label="Niveaux" value={g.plan.niveaux === 1 ? "Plain-pied" : `R+${g.plan.niveaux - 1}`} />
              <Row label="Standing" value={g.plan.standing} />
              <Row label="Matériau mur" value={g.plan.materiauMur} />
              <Row label="Toiture" value={g.plan.toiture} />
            </dl>

            <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Pièces ({g.plan.pieces.length})
            </h3>
            <ul className="mt-2 divide-y divide-slate-200 rounded-md border border-slate-200">
              {g.plan.pieces.map((p, i) => (
                <li key={i} className="grid grid-cols-[1fr_auto] gap-2 px-3 py-1.5 text-sm">
                  <span>{p.nom ?? p.type}</span>
                  <span className="font-mono text-xs tabular-nums text-slate-600">
                    {p.surface_m2} m²
                  </span>
                </li>
              ))}
            </ul>

            {g.plan.indicesStanding && g.plan.indicesStanding.length > 0 ? (
              <>
                <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Indices détectés
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {g.plan.indicesStanding.map((indice) => (
                    <span
                      key={indice}
                      className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-amber-800 ring-1 ring-amber-200"
                    >
                      {indice}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </section>

          {/* Historique des corrections */}
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-950">
              Corrections <span className="text-sm font-normal text-slate-500">({corrs.length})</span>
            </h2>
            {corrs.length === 0 ? (
              <p className="mt-3 text-sm text-slate-600">
                Aucune correction pour l&apos;instant.
              </p>
            ) : (
              <ul className="mt-3 max-h-96 space-y-2 overflow-y-auto">
                {corrs.map((c) => (
                  <li key={c.id} className="rounded-md bg-slate-50 p-2 ring-1 ring-slate-200">
                    <p className="font-mono text-[0.65rem] uppercase tracking-wide text-slate-600">
                      {c.lot_code}.{c.sous_lot_code} · ligne {c.ligne_index + 1} · {c.field}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-slate-700">
                      <span className="text-rose-600 line-through">{c.before_value}</span>
                      {" → "}
                      <span className="text-emerald-700">{c.after_value}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>

        {/* DQE éditable */}
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <header className="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-200 pb-3">
            <h2 className="font-display text-lg font-bold text-slate-950">Devis détaillé</h2>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Pencil className="size-3" />
              Survolez une cellule pour modifier
            </div>
          </header>

          <div className="space-y-7">
            {g.devis.lots.map((lot) => (
              <section key={lot.code}>
                <header className="mb-3 flex items-baseline gap-3">
                  <span className="font-mono text-sm font-bold text-amber-700">{lot.code}.</span>
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-[#1E2F8A]">
                    {lot.titre}
                  </h3>
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="font-mono text-sm font-semibold tabular-nums text-slate-950">
                    {fmt(lot.total)} FCFA
                  </span>
                </header>

                {lot.sousLots.map((sl) => (
                  <div key={sl.code} className="mb-4">
                    <p className="mb-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-slate-600">
                      {sl.code}. {sl.titre}
                    </p>
                    <div className="overflow-hidden rounded-md border border-slate-200">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                          <tr>
                            <th className="px-3 py-2 text-left font-semibold">Désignation</th>
                            <th className="px-3 py-2 text-center font-semibold">U</th>
                            <th className="px-3 py-2 text-right font-semibold">Qté</th>
                            <th className="px-3 py-2 text-right font-semibold">P.U.</th>
                            <th className="px-3 py-2 text-right font-semibold">Montant</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sl.lignes.map((l, i) => (
                            <tr key={i} className="bg-white">
                              <td className="px-3 py-2 text-left text-slate-900">
                                <EditableCell
                                  generationId={g.id}
                                  lotCode={lot.code}
                                  sousLotCode={sl.code}
                                  ligneIndex={i}
                                  field="designation"
                                  value={l.designation}
                                />
                              </td>
                              <td className="px-3 py-2 text-center font-mono text-xs text-slate-500">
                                {l.unite}
                              </td>
                              <td className="px-3 py-2 text-right font-mono tabular-nums text-slate-700">
                                <EditableCell
                                  generationId={g.id}
                                  lotCode={lot.code}
                                  sousLotCode={sl.code}
                                  ligneIndex={i}
                                  field="quantite"
                                  value={l.quantite}
                                  numeric
                                />
                              </td>
                              <td className="px-3 py-2 text-right font-mono tabular-nums text-slate-700">
                                <EditableCell
                                  generationId={g.id}
                                  lotCode={lot.code}
                                  sousLotCode={sl.code}
                                  ligneIndex={i}
                                  field="pu"
                                  value={l.pu}
                                  numeric
                                />
                              </td>
                              <td className="px-3 py-2 text-right font-mono font-semibold tabular-nums text-slate-950">
                                {fmt(l.montant)}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-slate-50">
                            <td colSpan={4} className="px-3 py-2 text-left font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-[#1E2F8A]">
                              Sous-total · {sl.titre}
                            </td>
                            <td className="px-3 py-2 text-right font-mono font-bold tabular-nums text-slate-950">
                              {fmt(sl.sousTotal)} FCFA
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>

          {/* Totaux */}
          <div className="mt-6 rounded-md bg-slate-50 p-4 ring-1 ring-slate-200">
            <Row label="Total Gros œuvre" value={`${fmt(g.devis.totalGrosOeuvre)} FCFA`} />
            <Row label="Total Second œuvre" value={`${fmt(g.devis.totalSecondOeuvre)} FCFA`} />
            <div className="mt-3 flex items-center justify-between rounded bg-slate-950 px-4 py-3 text-white">
              <span className="font-mono text-xs uppercase tracking-wider">Total estimatif HT</span>
              <span className="font-display text-lg font-bold tabular-nums">
                {fmt(g.devis.totalHT)} FCFA
              </span>
            </div>
            <p className="mt-2 text-right font-mono text-xs text-slate-600">
              Ratio : {fmt(g.devis.ratioFcfaM2)} FCFA / m²
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-slate-200 py-1.5 last:border-0 text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-mono font-semibold tabular-nums text-slate-950">{value}</span>
    </div>
  );
}
