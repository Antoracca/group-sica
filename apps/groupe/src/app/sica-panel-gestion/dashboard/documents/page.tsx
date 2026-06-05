import { FileSignature, FileText, ReceiptText, ShieldCheck, Wallet } from "lucide-react";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import { clientName, fcfa, frDate, statusLabel, statusTone } from "../admin-utils";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
  const admin = createAdminClient();

  const [{ data: documents }, { data: clients }] = await Promise.all([
    admin
      .from("documents")
      .select("id, owner_id, pole, type, titre, reference, montant, statut, created_at")
      .order("created_at", { ascending: false })
      .limit(250),
    admin.from("profiles").select("id, prenom, nom, email, entreprise").eq("role", "client").limit(500),
  ]);

  const documentList = documents ?? [];
  const clientMap = new Map((clients ?? []).map((client) => [client.id, client]));
  const pendingDocs = documentList.filter((doc) => ["a-signer", "en-attente"].includes(String(doc.statut ?? ""))).length;
  const signedDocs = documentList.filter((doc) => String(doc.statut ?? "") === "signe").length;
  const totalAmount = documentList.reduce((acc, doc) => acc + Number(doc.montant ?? 0), 0);

  const stats = [
    { label: "Documents", value: documentList.length, hint: "pièces visibles", icon: FileText },
    { label: "À traiter", value: pendingDocs, hint: "signature ou attente", icon: FileSignature },
    { label: "Signés", value: signedDocs, hint: "validation client", icon: ShieldCheck },
    { label: "Montants", value: `${fcfa(totalAmount)}`, hint: "FCFA engagés", icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1E2F8A]">GED interne</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">Documents & signatures</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Un registre clair pour suivre les devis, contrats, factures et pieces sensibles. Le module Devis Construction
              pourra etre branche ici sans dupliquer le simulateur existant.
            </p>
          </div>
          <div className="rounded-md bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200">
            GED, signature et finance dans la même lecture.
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-md bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                <Icon className="size-4" />
              </span>
              <p className="mt-4 font-display text-2xl font-bold tabular-nums text-slate-950">{stat.value}</p>
              <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.hint}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-slate-950">Registre documentaire</h2>
          <ReceiptText className="size-5 text-slate-400" />
        </div>

        <div className="mt-5 overflow-hidden rounded-md border border-slate-200">
          {documentList.length === 0 ? (
            <p className="p-5 text-sm text-slate-500">Aucun document pour le moment.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {documentList.map((doc) => {
                const client = clientMap.get(doc.owner_id);
                return (
                  <li key={doc.id} className="grid gap-4 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-[0.08em] text-slate-600">
                          {doc.type ?? "document"}
                        </span>
                        <span className={`rounded-md px-2 py-1 text-xs font-semibold ring-1 ${statusTone(doc.statut)}`}>
                          {statusLabel(doc.statut)}
                        </span>
                      </div>
                      <h3 className="mt-3 truncate font-semibold text-slate-950">{doc.titre}</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {doc.reference ?? "Référence à définir"} - {clientName(client)} - {frDate(doc.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-md bg-slate-50 px-3 py-2 text-sm lg:min-w-[220px]">
                      <span className="text-slate-500">{doc.pole ?? "pole"}</span>
                      <span className="font-display font-bold text-slate-950">{fcfa(doc.montant)} FCFA</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}


