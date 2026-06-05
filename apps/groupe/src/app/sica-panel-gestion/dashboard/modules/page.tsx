import { CheckCircle2, Database, PlugZap, Rocket } from "lucide-react";
import { ADMIN_MODULES } from "../module-registry";

export const dynamic = "force-dynamic";

export default function AdminModulesPage() {
  const groups = Array.from(new Set(ADMIN_MODULES.map((module) => module.group)));
  const activeModules = ADMIN_MODULES.filter((module) => module.status === "Actif").length;
  const connectableModules = ADMIN_MODULES.filter((module) => module.status === "À connecter").length;
  const plannedModules = ADMIN_MODULES.filter((module) => module.status === "Prévu").length;

  const highlights = [
    {
      label: "Modules actifs",
      value: activeModules,
      hint: "déjà utiles dans l'admin",
      icon: CheckCircle2,
    },
    {
      label: "À connecter",
      value: connectableModules,
      hint: "tables ou workflows à brancher",
      icon: PlugZap,
    },
    {
      label: "Roadmap",
      value: plannedModules,
      hint: "valeur ERP future",
      icon: Rocket,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1E2F8A]">Architecture produit</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950">50 modules SICA Admin</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Une cartographie volontairement ambitieuse pour transformer l'admin en ERP interne: direction, clients,
              chantiers, documents, assistance et système.
            </p>
          </div>
          <div className="rounded-md bg-slate-50 px-4 py-3 text-slate-950 ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Total modules</p>
            <p className="font-display text-3xl font-bold">{ADMIN_MODULES.length}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <span className="flex size-11 items-center justify-center rounded-md bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                <Icon className="size-5" />
              </span>
              <p className="mt-4 font-display text-3xl font-bold tabular-nums text-slate-950">{item.value}</p>
              <p className="text-sm font-semibold text-slate-700">{item.label}</p>
              <p className="text-xs text-slate-500">{item.hint}</p>
            </article>
          );
        })}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-slate-950">Cartographie complète</h2>
          <Database className="size-5 text-slate-400" />
        </div>

        <div className="mt-6 space-y-7">
          {groups.map((group) => (
            <div key={group}>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200" />
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{group}</h3>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {ADMIN_MODULES.filter((module) => module.group === group).map((module) => {
                  const Icon = module.icon;
                  return (
                    <article
                      key={`${module.group}-${module.label}`}
                      className="group rounded-lg border border-slate-200 bg-slate-50/70 p-4 transition-colors hover:bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white text-slate-500 ring-1 ring-slate-200">
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold leading-snug text-slate-950">{module.label}</h4>
                          <p className="mt-2 text-xs leading-relaxed text-slate-500">{module.desc}</p>
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
    </div>
  );
}


