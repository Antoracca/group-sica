import { BarChart3, Database, FolderKanban, Inbox, ReceiptText, TrendingUp, Users } from "lucide-react";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import { fcfa } from "../admin-utils";
import { ADMIN_MODULES } from "../module-registry";

export const dynamic = "force-dynamic";

function ratio(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}

function Bar({ label, value, total }: { label: string; value: number; total: number }) {
  const width = ratio(value, total);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-700">{label}</span>
        <span className="font-bold tabular-nums text-slate-950">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-slate-950" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default async function AdminAnalyticsPage() {
  const admin = createAdminClient();

  const [{ data: clients }, { data: projects }, { data: documents }, { data: demandes }] = await Promise.all([
    admin.from("profiles").select("id, role, must_change_password").eq("role", "client").limit(500),
    admin.from("projects").select("id, pole, statut, avancement").limit(500),
    admin.from("documents").select("id, pole, statut, montant").limit(500),
    admin.from("demandes").select("id, pole, statut").limit(500),
  ]);

  const clientList = clients ?? [];
  const projectList = projects ?? [];
  const documentList = documents ?? [];
  const demandeList = demandes ?? [];
  const openDemandes = demandeList.filter((demande) => demande.statut !== "traitee").length;
  const pendingDocs = documentList.filter((doc) => ["a-signer", "en-attente"].includes(String(doc.statut ?? ""))).length;
  const documentAmount = documentList.reduce((acc, doc) => acc + Number(doc.montant ?? 0), 0);
  const avgProgress =
    projectList.length > 0
      ? Math.round(projectList.reduce((acc, project) => acc + Number(project.avancement ?? 0), 0) / projectList.length)
      : 0;
  const constructionProjects = projectList.filter((project) => project.pole === "construction").length;
  const assistanceProjects = projectList.filter((project) => project.pole === "assistance").length;
  const constructionDemandes = demandeList.filter((demande) => demande.pole === "construction").length;
  const assistanceDemandes = demandeList.filter((demande) => demande.pole === "assistance").length;
  const activeModules = ADMIN_MODULES.filter((module) => module.status === "Actif").length;
  const connectableModules = ADMIN_MODULES.filter((module) => module.status === "À connecter").length;
  const plannedModules = ADMIN_MODULES.filter((module) => module.status === "Prévu").length;
  const maturity = ratio(activeModules + connectableModules, ADMIN_MODULES.length);

  const stats = [
    { label: "Clients", value: clientList.length, hint: "base client", icon: Users },
    { label: "Projets", value: projectList.length, hint: `${avgProgress}% moyen`, icon: FolderKanban },
    { label: "Documents", value: documentList.length, hint: `${pendingDocs} en attente`, icon: ReceiptText },
    { label: "Demandes", value: demandeList.length, hint: `${openDemandes} ouvertes`, icon: Inbox },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1E2F8A]">Lecture direction</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">Analytics admin</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Une synthèse courte pour comprendre la charge, les pôles actifs et le niveau de maturité du futur ERP SICA.
            </p>
          </div>
          <div className="rounded-md bg-slate-950 px-4 py-3 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/60">Maturité ERP</p>
            <p className="font-display text-3xl font-bold">{maturity}%</p>
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

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-950">Répartition par pôle</h2>
            <BarChart3 className="size-5 text-slate-400" />
          </div>
          <div className="mt-6 space-y-6">
            <Bar label="Projets construction" value={constructionProjects} total={projectList.length} />
            <Bar label="Projets assistance" value={assistanceProjects} total={projectList.length} />
            <Bar label="Demandes construction" value={constructionDemandes} total={demandeList.length} />
            <Bar label="Demandes assistance" value={assistanceDemandes} total={demandeList.length} />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-950">Maturité modules</h2>
            <Database className="size-5 text-slate-400" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="rounded-md bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-600">Actifs</p>
              <p className="mt-1 font-display text-3xl font-bold text-slate-950">{activeModules}</p>
            </div>
            <div className="rounded-md bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-600">À connecter</p>
              <p className="mt-1 font-display text-3xl font-bold text-slate-950">{connectableModules}</p>
            </div>
            <div className="rounded-md bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-600">Prévus</p>
              <p className="mt-1 font-display text-3xl font-bold text-slate-950">{plannedModules}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-slate-950">Signal direction</h2>
          <TrendingUp className="size-5 text-slate-400" />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Montants documentaires</p>
            <p className="mt-2 font-display text-2xl font-bold text-slate-950">{fcfa(documentAmount)} FCFA</p>
          </div>
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Comptes à finaliser</p>
            <p className="mt-2 font-display text-2xl font-bold text-slate-950">
              {clientList.filter((client) => client.must_change_password).length}
            </p>
          </div>
          <div className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-700">Objets supervisés</p>
            <p className="mt-2 font-display text-2xl font-bold text-slate-950">
              {clientList.length + projectList.length + documentList.length + demandeList.length}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


