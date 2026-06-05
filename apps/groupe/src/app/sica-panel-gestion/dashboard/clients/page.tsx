import { AlertCircle, Building2, FileSignature, FolderKanban, Mail, Phone, UserPlus, Users } from "lucide-react";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import { countByOwner, frDate, initials } from "../admin-utils";
import { CreateClientForm } from "../create-client-form";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const admin = createAdminClient();

  const [{ data: clients }, { data: projects }, { data: documents }, { data: demandes }] = await Promise.all([
    admin
      .from("profiles")
      .select("id, prenom, nom, entreprise, email, telephone, role, created_at, must_change_password")
      .eq("role", "client")
      .order("created_at", { ascending: false }),
    admin.from("projects").select("id, owner_id, statut").limit(500),
    admin.from("documents").select("id, owner_id, statut").limit(500),
    admin.from("demandes").select("id, owner_id, statut").limit(500),
  ]);

  const clientList = clients ?? [];
  const projectCounts = countByOwner(projects ?? []);
  const documentCounts = countByOwner(documents ?? []);
  const demandeCounts = countByOwner(demandes ?? []);
  const firstLogin = clientList.filter((client) => client.must_change_password).length;
  const companies = clientList.filter((client) => Boolean(client.entreprise)).length;
  const now = new Date();
  const createdThisMonth = clientList.filter((client) => {
    const createdAt = new Date(client.created_at ?? "");
    return createdAt.getFullYear() === now.getFullYear() && createdAt.getMonth() === now.getMonth();
  }).length;

  const stats = [
    { label: "Clients", value: clientList.length, hint: "comptes rattachés", icon: Users },
    { label: "Entreprises", value: companies, hint: "profils avec société", icon: Building2 },
    { label: "Ce mois", value: createdThisMonth, hint: "nouveaux comptes", icon: UserPlus },
    { label: "À activer", value: firstLogin, hint: "première connexion", icon: AlertCircle },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1E2F8A]">Fichier clients</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">Clients SICA</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Création, rattachement et lecture rapide des comptes clients. L'objectif: savoir en dix secondes qui est suivi,
              ce qui est ouvert et ce qui attend une action.
            </p>
          </div>
          <div className="rounded-md bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200">
            <span className="font-semibold text-slate-950">Vision 360</span> active sur projets, documents et demandes.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Créer un client</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">
            Nouveau compte client
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Créez l’accès client, générez le mot de passe provisoire et préparez l’espace en une seule action.
          </p>
        </div>
        <CreateClientForm />
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

      <section className="grid gap-6 xl:grid-cols-[0.75fr_1.35fr]">
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-display text-lg font-bold text-slate-950">Parcours conseillé</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p className="rounded-md bg-slate-50 p-3">1. Créer le compte client avec un mot de passe provisoire.</p>
              <p className="rounded-md bg-slate-50 p-3">2. Rattacher son premier projet, document ou dossier assistance.</p>
              <p className="rounded-md bg-slate-50 p-3">3. Laisser le client changer son mot de passe à la première connexion.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-slate-950">Portefeuille clients</h2>
              <p className="mt-1 text-sm text-slate-500">{clientList.length} compte(s) dans la base.</p>
            </div>
            <Users className="size-5 text-slate-400" />
          </div>

          <div className="mt-5 overflow-hidden rounded-md border border-slate-200">
            {clientList.length === 0 ? (
              <p className="p-5 text-sm text-slate-500">Aucun client pour l'instant. Créez le premier compte avec le formulaire prioritaire.</p>
            ) : (
              <ul className="divide-y divide-slate-200">
                {clientList.map((client) => (
                  <li key={client.id} className="grid gap-4 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="flex min-w-0 gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-slate-950 font-display text-sm font-bold text-white">
                        {initials(client.prenom, client.nom, client.email)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-950">
                          {[client.prenom, client.nom].filter(Boolean).join(" ") || client.email}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">{client.entreprise || "Client particulier"}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                          {client.email ? (
                            <span className="inline-flex items-center gap-1">
                              <Mail className="size-3.5" />
                              {client.email}
                            </span>
                          ) : null}
                          {client.telephone ? (
                            <span className="inline-flex items-center gap-1">
                              <Phone className="size-3.5" />
                              {client.telephone}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs lg:min-w-[360px]">
                      <div className="rounded-md bg-slate-50 p-2">
                        <FolderKanban className="mx-auto size-4 text-slate-500" />
                        <p className="mt-1 font-bold text-slate-950">{projectCounts[client.id] ?? 0}</p>
                        <p className="text-slate-500">Projets</p>
                      </div>
                      <div className="rounded-md bg-slate-50 p-2">
                        <FileSignature className="mx-auto size-4 text-slate-500" />
                        <p className="mt-1 font-bold text-slate-950">{documentCounts[client.id] ?? 0}</p>
                        <p className="text-slate-500">Docs</p>
                      </div>
                      <div className="rounded-md bg-slate-50 p-2">
                        <AlertCircle className="mx-auto size-4 text-slate-700" />
                        <p className="mt-1 font-bold text-slate-950">{demandeCounts[client.id] ?? 0}</p>
                        <p className="text-slate-500">Demandes</p>
                      </div>
                      <div className="rounded-md bg-slate-50 p-2">
                        <p className="font-bold text-slate-950">{frDate(client.created_at)}</p>
                        <p className="text-slate-500">{client.must_change_password ? "À activer" : "Actif"}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


