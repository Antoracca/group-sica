import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileSignature,
  FileText,
  FolderKanban,
  Inbox,
  ReceiptText,
  TrendingUp,
  Users,
} from "lucide-react";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import { CreateClientForm } from "./create-client-form";
import { ADMIN_MODULES } from "./module-registry";

export const dynamic = "force-dynamic";

function frDate(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function fcfa(value: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value);
}

function initials(prenom: string | null, nom: string | null, email: string | null): string {
  const base = `${prenom?.[0] ?? ""}${nom?.[0] ?? ""}` || email?.slice(0, 2) || "CL";
  return base.toUpperCase();
}

function toneForStatus(_status: string | null) {
  return "bg-white text-slate-600 ring-slate-200";
}

export default async function PanelDashboardPage() {
  const admin = createAdminClient();

  const [
    { data: clients },
    { data: projects, count: projectCount },
    { data: documents, count: documentCount },
    { data: demandes, count: demandeCount },
  ] = await Promise.all([
    admin
      .from("profiles")
      .select("id, prenom, nom, entreprise, email, telephone, role, created_at, must_change_password")
      .eq("role", "client")
      .order("created_at", { ascending: false }),
    admin
      .from("projects")
      .select("id, owner_id, pole, type, titre, reference, localisation, statut, avancement, updated_at", { count: "exact" })
      .order("updated_at", { ascending: false })
      .limit(8),
    admin
      .from("documents")
      .select("id, owner_id, pole, type, titre, reference, montant, statut, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(8),
    admin
      .from("demandes")
      .select("id, owner_id, pole, objet, budget, localisation, statut, created_at", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const clientList = clients ?? [];
  const projectList = projects ?? [];
  const documentList = documents ?? [];
  const demandeList = demandes ?? [];

  const activeProjects = projectList.filter((p) => p.statut === "En cours").length;
  const pendingDocs = documentList.filter((d) => d.statut === "a-signer" || d.statut === "en-attente").length;
  const openDemandes = demandeList.filter((d) => d.statut !== "traitee").length;
  const firstLogin = clientList.filter((c) => c.must_change_password).length;
  const documentAmount = documentList.reduce((acc, d) => acc + Number(d.montant ?? 0), 0);
  const averageProgress =
    projectList.length > 0
      ? Math.round(projectList.reduce((acc, p) => acc + Number(p.avancement ?? 0), 0) / projectList.length)
      : 0;
  const moduleGroups = Array.from(new Set(ADMIN_MODULES.map((module) => module.group)));
  const activeModules = ADMIN_MODULES.filter((module) => module.status === "Actif").length;
  const connectableModules = ADMIN_MODULES.filter((module) => module.status === "À connecter").length;
  const plannedModules = ADMIN_MODULES.filter((module) => module.status === "Prévu").length;

  const stats = [
    { icon: Users, label: "Clients", value: clientList.length, hint: `${firstLogin} à finaliser` },
    { icon: FolderKanban, label: "Projets", value: projectCount ?? 0, hint: `${activeProjects} actifs` },
    { icon: FileSignature, label: "Documents", value: documentCount ?? 0, hint: `${pendingDocs} en attente` },
    { icon: Inbox, label: "Demandes", value: demandeCount ?? 0, hint: `${openDemandes} ouvertes` },
  ];

  const operations = [
    {
      label: "Progression moyenne",
      value: `${averageProgress}%`,
      icon: TrendingUp,
      detail: "sur les derniers projets suivis",
    },
    {
      label: "Documents engagés",
      value: `${fcfa(documentAmount)} FCFA`,
      icon: ReceiptText,
      detail: "montants visibles dans la GED",
    },
    {
      label: "Comptes à activer",
      value: String(firstLogin),
      icon: AlertCircle,
      detail: "clients en première connexion",
    },
  ];

  return (
    <div className="space-y-8">
      <section id="pilotage" className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Centre de contrôle</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                SICA Admin
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Supervision des clients, projets, documents et demandes. Les données affichées viennent des tables existantes.
              </p>
            </div>
            <a
              href="#creation-client"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1E2F8A]"
            >
              <Users className="size-4" />
              Créer un client
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">État système</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-md bg-slate-100 text-slate-700 ring-1 ring-slate-200">
              <CheckCircle2 className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-slate-950">Admin opérationnel</p>
              <p className="text-sm text-slate-500">Connexion Supabase active</p>
            </div>
          </div>
        </div>
      </section>

      <section id="creation-client" className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Action prioritaire</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">
            Créer un nouveau client
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Le formulaire est maintenant au centre du pilotage pour ouvrir rapidement un accès client, générer les
            identifiants et préparer l'espace en une seule action.
          </p>
        </div>
        <CreateClientForm />
      </section>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-md bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                <Icon className="size-4" />
              </span>
              <p className="mt-4 font-display text-3xl font-bold tabular-nums text-slate-950">{stat.value}</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
                <p className="text-xs text-slate-500">{stat.hint}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section id="modules" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1E2F8A]">
              Architecture admin
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">
              50 modules pour piloter SICA sans angle mort.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Cette cartographie montre le potentiel complet du back-office: ce qui est déjà actif,
              ce qui peut être branché sur les tables existantes, et ce qui prépare l'ERP futur.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
              <p className="text-xl font-bold text-slate-950">{activeModules}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Actifs</p>
            </div>
            <div className="rounded-md bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
              <p className="text-xl font-bold text-slate-950">{connectableModules}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">À connecter</p>
            </div>
            <div className="rounded-md bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
              <p className="text-xl font-bold text-slate-950">{plannedModules}</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Prévus</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {moduleGroups.map((group) => (
            <div key={group}>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200" />
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{group}</h3>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {ADMIN_MODULES.filter((module) => module.group === group).map((module) => {
                  const Icon = module.icon;
                  return (
                    <article
                      key={`${module.group}-${module.label}`}
                      className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 transition-colors hover:bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white text-slate-500 ring-1 ring-slate-200">
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold leading-snug text-slate-950">{module.label}</h4>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500">{module.desc}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="operations" className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-950">Opérations</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Live</span>
          </div>
          <div className="mt-5 space-y-3">
            {operations.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-md border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                      <p className="mt-1 font-display text-xl font-bold text-slate-950">{item.value}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-950">Projets récents</h2>
            <FolderKanban className="size-5 text-slate-400" />
          </div>
          <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
            {projectList.length === 0 ? (
              <p className="p-5 text-sm text-slate-500">Aucun projet enregistré.</p>
            ) : (
              <ul className="divide-y divide-slate-200">
                {projectList.slice(0, 5).map((p) => (
                  <li key={p.id} className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-950">{p.titre}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-500">
                        {p.pole} · {p.localisation ?? "Localisation à définir"} · {frDate(p.updated_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-md px-2 py-1 text-xs font-semibold ring-1 ${toneForStatus(p.statut)}`}>
                        {p.statut ?? "Statut"}
                      </span>
                      <span className="min-w-12 text-right text-sm font-bold tabular-nums text-slate-900">
                        {Number(p.avancement ?? 0)}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section id="documents" className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-950">Documents à suivre</h2>
            <FileText className="size-5 text-slate-400" />
          </div>
          <div className="mt-4 space-y-3">
            {documentList.length === 0 ? (
              <p className="text-sm text-slate-500">Aucun document pour le moment.</p>
            ) : (
              documentList.slice(0, 5).map((d) => (
                <div key={d.id} className="flex items-center gap-3 rounded-md border border-slate-200 p-3">
                  <span className="flex size-9 items-center justify-center rounded-md bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                    <FileSignature className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-950">{d.titre}</p>
                    <p className="text-xs text-slate-500">{d.reference ?? d.type}</p>
                  </div>
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold ring-1 ${toneForStatus(d.statut)}`}>
                    {d.statut}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-950">Demandes ouvertes</h2>
            <ClipboardList className="size-5 text-slate-400" />
          </div>
          <div className="mt-4 space-y-3">
            {demandeList.length === 0 ? (
              <p className="text-sm text-slate-500">Aucune demande client ouverte.</p>
            ) : (
              demandeList.slice(0, 5).map((d) => (
                <div key={d.id} className="rounded-md border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{d.objet}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {d.pole} · {d.localisation ?? "Localisation à définir"} · {frDate(d.created_at)}
                      </p>
                    </div>
                    <span className={`rounded-md px-2 py-1 text-xs font-semibold ring-1 ${toneForStatus(d.statut)}`}>
                      {d.statut}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Budget: {d.budget ?? "A cadrer"}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="clients">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-950">
              Clients <span className="text-sm font-normal text-slate-400">({clientList.length})</span>
            </h2>
            <Users className="size-5 text-slate-400" />
          </div>
          <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
            {clientList.length === 0 ? (
              <p className="p-5 text-sm text-slate-500">Aucun client pour l'instant. Créez le premier compte avec le formulaire prioritaire.</p>
            ) : (
              <ul className="divide-y divide-slate-200">
                {clientList.slice(0, 10).map((c) => (
                  <li key={c.id} className="flex items-center gap-3 p-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#1E2F8A] font-display text-sm font-bold text-white">
                      {initials(c.prenom, c.nom, c.email)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-950">
                        {[c.prenom, c.nom].filter(Boolean).join(" ") || c.email}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {c.entreprise ? `${c.entreprise} · ` : ""}
                        {c.email}
                      </p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-xs text-slate-500">{frDate(c.created_at)}</p>
                      {c.must_change_password ? (
                        <span className="mt-1 inline-block rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                          1ère connexion
                        </span>
                      ) : (
                        <span className="mt-1 inline-block rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                          Actif
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section id="analytics" className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-slate-950">Lecture direction</h2>
          <Building2 className="size-5 text-slate-400" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Construction</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {projectList.filter((p) => p.pole === "construction").length}
            </p>
            <p className="text-xs text-slate-500">projets visibles</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Assistance</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {projectList.filter((p) => p.pole === "assistance").length}
            </p>
            <p className="text-xs text-slate-500">dossiers visibles</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Back-office</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{clientList.length + (projectCount ?? 0) + (documentCount ?? 0)}</p>
            <p className="text-xs text-slate-500">objets supervisés</p>
          </div>
        </div>
      </section>
    </div>
  );
}




