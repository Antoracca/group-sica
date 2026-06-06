import Link from "next/link";
import {
  Sparkles,
  ExternalLink,
  ChevronRight,
  Gauge,
  Layers,
  Inbox,
} from "lucide-react";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import { links } from "@/lib/links";

/*
  Console Devis IA — liste des générations + KPIs en temps réel.
  Lit la table devis_ai_generations. Si la table n'existe pas encore
  (schema non exécuté), affiche un message clair avec instructions.
*/

export const dynamic = "force-dynamic";

interface GenerationRow {
  id: string;
  reference: string;
  source: string;
  client_email: string | null;
  pdf_name: string | null;
  total_ht: number;
  ratio_fcfa_m2: number;
  surface_m2: number | null;
  standing: string | null;
  status: string;
  created_at: string;
}

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n));
}

function dateFr(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_PILL: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 ring-amber-200",
  reviewed: "bg-blue-100 text-blue-800 ring-blue-200",
  accepted: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  rejected: "bg-rose-100 text-rose-800 ring-rose-200",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "À relire",
  reviewed: "Relue",
  accepted: "Acceptée",
  rejected: "Rejetée",
};

export default async function DevisIaConsolePage() {
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("devis_ai_generations")
    .select("id, reference, source, client_email, pdf_name, total_ht, ratio_fcfa_m2, surface_m2, standing, status, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  // Si la table n'existe pas → message d'install
  const schemaMissing =
    !!error && /relation .* does not exist/i.test(error.message || "");

  if (schemaMissing) {
    return <SchemaMissing />;
  }

  const rows: GenerationRow[] = (data ?? []) as GenerationRow[];
  const total = rows.length;
  const pending = rows.filter((r) => r.status === "pending").length;
  const accepted = rows.filter((r) => r.status === "accepted").length;
  const acceptRate = total > 0 ? Math.round((accepted / total) * 100) : 0;
  const avgRatio = total > 0
    ? Math.round(rows.reduce((acc, r) => acc + (r.ratio_fcfa_m2 || 0), 0) / total)
    : 0;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#1E2F8A]">
              <Sparkles className="size-3.5" /> Outil signature
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">
              Devis IA — Console d&apos;apprentissage
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Chaque devis généré par les agents est listé ci-dessous. Ouvrez un devis pour
              relire ligne par ligne, corriger les écarts et entraîner le moteur SICA.
            </p>
          </div>
          <Link
            href={`${links.construction.base}/devis-auto`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Ouvrir l&apos;outil
            <ExternalLink className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* KPIs réels */}
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Kpi icon={Layers} label="Devis générés" value={String(total)} hint={`${pending} à relire`} />
        <Kpi icon={Inbox} label="Acceptés" value={String(accepted)} hint={`${acceptRate}% taux d'acceptation`} />
        <Kpi icon={Gauge} label="Ratio moyen" value={`${fmt(avgRatio)} F`} hint="FCFA / m²" />
        <Kpi icon={Sparkles} label="Précision interne" value="±7,7%" hint="benchmark 4 devis" />
      </section>

      {/* Liste des générations */}
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-slate-200 p-5">
          <h2 className="font-display text-lg font-bold text-slate-950">
            Dernières générations
          </h2>
          <p className="text-xs text-slate-500">{total} entrée(s)</p>
        </header>
        {total === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-slate-600">
              Aucune génération pour l&apos;instant. Ouvrez l&apos;outil et générez votre
              premier devis — il apparaîtra ici automatiquement.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {rows.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/sica-panel-gestion/dashboard/devis-ia/${r.id}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-[0.78rem] font-semibold text-slate-950">
                        {r.reference}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] ring-1 ${STATUS_PILL[r.status] ?? "bg-slate-100 text-slate-700 ring-slate-200"}`}
                      >
                        {STATUS_LABEL[r.status] ?? r.status}
                      </span>
                      {r.standing ? (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-slate-600">
                          {r.standing}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {r.pdf_name ?? "—"}
                      {r.surface_m2 ? ` · ${fmt(r.surface_m2)} m²` : ""}
                      {r.client_email ? ` · ${r.client_email}` : ""}
                      {" · "}
                      {dateFr(r.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-mono text-sm font-bold tabular-nums text-slate-950">
                        {fmt(r.total_ht)} FCFA
                      </p>
                      <p className="font-mono text-[0.65rem] uppercase tracking-wide text-slate-500">
                        {fmt(r.ratio_fcfa_m2)} F/m²
                      </p>
                    </div>
                    <ChevronRight className="size-4 text-slate-400" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <span className="flex size-10 items-center justify-center rounded-md bg-slate-100 text-slate-700 ring-1 ring-slate-200">
        <Icon className="size-4" />
      </span>
      <p className="mt-4 font-display text-3xl font-bold tabular-nums text-slate-950">{value}</p>
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <p className="text-xs text-slate-500">{hint}</p>
    </article>
  );
}

function SchemaMissing() {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <Sparkles className="size-5 shrink-0 text-amber-700" />
          <div>
            <h1 className="font-display text-xl font-bold text-amber-950">
              Table Supabase à créer
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-amber-900">
              La console Devis IA est prête, mais la table <code className="font-mono">devis_ai_generations</code> n&apos;existe
              pas encore dans Supabase. Pour l&apos;activer :
            </p>
            <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-amber-900">
              <li>Ouvrez Supabase → <em>SQL Editor</em></li>
              <li>Copiez le contenu du fichier <code className="font-mono">docs/supabase/devis-ai-schema.sql</code></li>
              <li>Exécutez le script (idempotent, sans risque)</li>
              <li>Rafraîchissez cette page</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
