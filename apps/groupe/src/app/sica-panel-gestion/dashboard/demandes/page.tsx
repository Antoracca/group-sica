import { AlertCircle, CheckCircle2, Inbox, MapPin, MessageSquareText, Wallet } from "lucide-react";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import { clientName, frDate, statusLabel, statusTone } from "../admin-utils";

export const dynamic = "force-dynamic";

export default async function AdminDemandesPage() {
  const admin = createAdminClient();

  const [{ data: demandes }, { data: clients }] = await Promise.all([
    admin
      .from("demandes")
      .select("id, owner_id, pole, objet, budget, localisation, statut, created_at")
      .order("created_at", { ascending: false })
      .limit(250),
    admin.from("profiles").select("id, prenom, nom, email, entreprise").eq("role", "client").limit(500),
  ]);

  const demandeList = demandes ?? [];
  const clientMap = new Map((clients ?? []).map((client) => [client.id, client]));
  const newDemandes = demandeList.filter((demande) => demande.statut === "nouvelle").length;
  const activeDemandes = demandeList.filter((demande) => demande.statut !== "traitee").length;
  const doneDemandes = demandeList.filter((demande) => demande.statut === "traitee").length;
  const constructionDemandes = demandeList.filter((demande) => demande.pole === "construction").length;

  const stats = [
    { label: "Demandes", value: demandeList.length, hint: "tickets clients", icon: Inbox },
    { label: "Nouvelles", value: newDemandes, hint: "à qualifier", icon: AlertCircle },
    { label: "Ouvertes", value: activeDemandes, hint: "en traitement", icon: MessageSquareText },
    { label: "Traitées", value: doneDemandes, hint: "clôturées", icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1E2F8A]">Assistance & qualification</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">Demandes clients</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Les sollicitations client deviennent un vrai flux admin: qualification, budget, localisation et suivi du statut.
            </p>
          </div>
          <div className="rounded-md bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200">
            <span className="font-semibold text-slate-950">{constructionDemandes}</span> demande(s) liée(s) a la construction.
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
              <p className="mt-4 font-display text-3xl font-bold tabular-nums text-slate-950">{stat.value}</p>
              <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.hint}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-slate-950">Flux des demandes</h2>
          <Inbox className="size-5 text-slate-400" />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {demandeList.length === 0 ? (
            <p className="rounded-md border border-slate-200 p-5 text-sm text-slate-500 md:col-span-2">
              Aucune demande client ouverte.
            </p>
          ) : (
            demandeList.map((demande) => {
              const client = clientMap.get(demande.owner_id);
              return (
                <article key={demande.id} className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-[0.08em] text-slate-600">
                        {demande.pole ?? "pole"}
                      </span>
                      <h3 className="mt-3 font-semibold text-slate-950">{demande.objet}</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {clientName(client)} - {frDate(demande.created_at)}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold ring-1 ${statusTone(demande.statut)}`}>
                      {statusLabel(demande.statut)}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                    <span className="inline-flex items-center gap-2 rounded-md bg-white p-2 ring-1 ring-slate-200">
                      <MapPin className="size-3.5 text-slate-400" />
                      {demande.localisation ?? "Localisation à cadrer"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-md bg-white p-2 ring-1 ring-slate-200">
                      <Wallet className="size-3.5 text-slate-400" />
                      {demande.budget ?? "Budget à cadrer"}
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}


