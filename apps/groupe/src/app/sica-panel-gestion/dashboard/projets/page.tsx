import { Building2, FolderKanban, HardHat, MapPin, TrendingUp, Users } from "lucide-react";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import { clientName, frDate, statusLabel, statusTone } from "../admin-utils";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const admin = createAdminClient();

  const [{ data: projects }, { data: clients }] = await Promise.all([
    admin
      .from("projects")
      .select("id, owner_id, pole, type, titre, reference, localisation, statut, avancement, updated_at")
      .order("updated_at", { ascending: false })
      .limit(200),
    admin.from("profiles").select("id, prenom, nom, email, entreprise").eq("role", "client").limit(500),
  ]);

  const projectList = projects ?? [];
  const clientMap = new Map((clients ?? []).map((client) => [client.id, client]));
  const activeProjects = projectList.filter((project) => String(project.statut ?? "").toLowerCase().includes("cours")).length;
  const constructionProjects = projectList.filter((project) => project.pole === "construction").length;
  const assistanceProjects = projectList.filter((project) => project.pole === "assistance").length;
  const averageProgress =
    projectList.length > 0
      ? Math.round(projectList.reduce((acc, project) => acc + Number(project.avancement ?? 0), 0) / projectList.length)
      : 0;

  const stats = [
    { label: "Projets", value: projectList.length, hint: "opérations suivies", icon: FolderKanban },
    { label: "En cours", value: activeProjects, hint: "statut actif", icon: HardHat },
    { label: "Construction", value: constructionProjects, hint: "pole travaux", icon: Building2 },
    { label: "Assistance", value: assistanceProjects, hint: "pôle conseil", icon: Users },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1E2F8A]">Opérations</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">Projets et chantiers</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Une lecture opérationnelle des dossiers en cours: qui porte le projet, où il se situe, quel est son statut
              et quel niveau d'avancement est visible.
            </p>
          </div>
          <div className="rounded-md bg-slate-950 px-4 py-3 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/60">Avancement moyen</p>
            <p className="font-display text-3xl font-bold">{averageProgress}%</p>
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
          <h2 className="font-display text-lg font-bold text-slate-950">Liste opérationnelle</h2>
          <FolderKanban className="size-5 text-slate-400" />
        </div>

        <div className="mt-5 grid gap-4">
          {projectList.length === 0 ? (
            <p className="rounded-md border border-slate-200 p-5 text-sm text-slate-500">Aucun projet enregistré.</p>
          ) : (
            projectList.map((project) => {
              const client = clientMap.get(project.owner_id);
              const progress = Math.max(0, Math.min(100, Number(project.avancement ?? 0)));

              return (
                <article
                  key={project.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:border-[#1E2F8A]/30 hover:bg-white"
                >
                  <div className="grid gap-4 lg:grid-cols-[1fr_260px] lg:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold uppercase tracking-[0.08em] text-slate-600">
                          {project.pole ?? "pole"}
                        </span>
                        <span className={`rounded-md px-2 py-1 text-xs font-semibold ring-1 ${statusTone(project.statut)}`}>
                          {statusLabel(project.statut)}
                        </span>
                      </div>
                      <h3 className="mt-3 truncate font-display text-xl font-bold text-slate-950">{project.titre}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {project.reference ?? project.type ?? "Référence à définir"} - mis à jour le {frDate(project.updated_at)}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Users className="size-3.5" />
                          {clientName(client)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {project.localisation ?? "Localisation à définir"}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-md bg-white p-3 ring-1 ring-slate-200">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>Progression</span>
                        <span className="text-slate-950">{progress}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-slate-950" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500">
                        <TrendingUp className="size-3.5" />
                        Suivi admin centralise
                      </p>
                    </div>
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


