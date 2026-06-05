"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleDashed, Search, X } from "lucide-react";
import { ADMIN_MODULES } from "./module-registry";

type AdminModule = (typeof ADMIN_MODULES)[number];
type ModuleDecision = "validated" | "discussion" | "rejected";

const STORAGE_KEY = "sica-admin-module-decisions";

const decisionLabels: Record<ModuleDecision, string> = {
  validated: "Validé",
  discussion: "À discuter",
  rejected: "Non retenu",
};

const groupValue: Record<string, string[]> = {
  Direction: [
    "Donne une vision courte et exploitable à la direction.",
    "Aide à prioriser les urgences, les risques et les décisions de pilotage.",
  ],
  Clients: [
    "Améliore le suivi client et réduit les pertes d'information.",
    "Centralise les comptes, les relances et l'historique relationnel.",
  ],
  Chantiers: [
    "Structure le suivi terrain, les jalons, les équipes et les preuves visuelles.",
    "Rend les chantiers plus lisibles pour l'administration et le client.",
  ],
  Documents: [
    "Renforce la gestion des devis, contrats, factures et signatures.",
    "Prépare une GED interne cohérente avec le module devis existant.",
  ],
  Assistance: [
    "Transforme les demandes en dossiers suivis et qualifiés.",
    "Couvre les sujets administratifs, juridiques, fiscaux et comptables.",
  ],
  Systeme: [
    "Sécurise les accès, les rôles et la traçabilité des actions.",
    "Prépare le socle technique de l'ERP SICA.",
  ],
};

function moduleKey(module: AdminModule) {
  return `${module.group}:${module.label}`;
}

function statusExplanation(status: AdminModule["status"]) {
  if (status === "Actif") {
    return "Ce module est déjà représenté dans l'admin actuel ou s'appuie directement sur les tables existantes.";
  }

  if (status === "À connecter") {
    return "Le module est cadré, mais il doit encore être branché à un workflow, une table ou une automatisation dédiée.";
  }

  return "Le module est prévu dans la trajectoire ERP. Il peut être validé maintenant pour entrer dans la feuille de route.";
}

function statusNextStep(status: AdminModule["status"]) {
  if (status === "Actif") return "Valider le périmètre, puis améliorer l'expérience et les droits d'accès.";
  if (status === "À connecter") return "Confirmer la priorité, créer les données nécessaires, puis brancher l'écran.";
  return "Décider si ce module doit entrer dans la prochaine phase de développement.";
}

function decisionClasses(decision?: ModuleDecision) {
  if (decision === "validated") return "border-[#1E2F8A] bg-[#1E2F8A] text-white";
  if (decision === "discussion") return "border-slate-400 bg-slate-100 text-slate-900";
  if (decision === "rejected") return "border-slate-200 bg-white text-slate-400 line-through";
  return "border-slate-200 bg-white text-slate-700";
}

export function AdminModuleCatalog() {
  const [query, setQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState<AdminModule | null>(null);
  const [decisions, setDecisions] = useState<Record<string, ModuleDecision>>({});

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      setDecisions(JSON.parse(raw) as Record<string, ModuleDecision>);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const filteredModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return ADMIN_MODULES;

    return ADMIN_MODULES.filter((module) => {
      const haystack = `${module.group} ${module.label} ${module.desc} ${module.status}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  const groups = useMemo(() => Array.from(new Set(filteredModules.map((module) => module.group))), [filteredModules]);
  const selectedDecision = selectedModule ? decisions[moduleKey(selectedModule)] : undefined;

  function saveDecision(module: AdminModule, decision: ModuleDecision) {
    const next = { ...decisions, [moduleKey(module)]: decision };
    setDecisions(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return (
    <>
      <section className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Catalogue modules
            </p>
            <p className="mt-1 text-sm font-bold text-slate-950">{ADMIN_MODULES.length} modules disponibles</p>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
            ERP
          </span>
        </div>

        <label className="relative mt-4 block">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filtrer les modules..."
            className="h-9 w-full rounded-md border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
          />
        </label>

        <div className="mt-4 space-y-5">
          {groups.map((group) => (
            <div key={group}>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{group}</p>
              <div className="space-y-1">
                {filteredModules
                  .filter((module) => module.group === group)
                  .map((module) => {
                    const Icon = module.icon;
                    const decision = decisions[moduleKey(module)];

                    return (
                      <button
                        key={moduleKey(module)}
                        type="button"
                        onClick={() => setSelectedModule(module)}
                        className={`w-full rounded-md border px-2.5 py-2 text-left text-xs transition-colors hover:border-slate-400 ${decisionClasses(decision)}`}
                      >
                        <span className="flex items-start gap-2">
                          <Icon className="mt-0.5 size-3.5 shrink-0" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-semibold">{module.label}</span>
                            <span className="mt-0.5 block truncate opacity-70">
                              {decision ? decisionLabels[decision] : module.status}
                            </span>
                          </span>
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedModule ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm sm:items-center">
          <button
            type="button"
            aria-label="Fermer le détail du module"
            className="absolute inset-0 cursor-default"
            onClick={() => setSelectedModule(null)}
          />

          <article className="relative z-10 max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {selectedModule.group} · {selectedModule.status}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">{selectedModule.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{selectedModule.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModule(null)}
                className="flex size-9 shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950"
                aria-label="Fermer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm font-bold text-slate-950">État du module</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {statusExplanation(selectedModule.status)}
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">Valeur attendue</p>
                <div className="mt-3 space-y-2">
                  {((groupValue[selectedModule.group as keyof typeof groupValue] ?? groupValue.Systeme) || []).map((item) => (
                    <p key={item} className="flex gap-2 rounded-md bg-white text-sm leading-relaxed text-slate-600">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-slate-500" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="flex items-center gap-2 text-sm font-bold text-slate-950">
                  <CircleDashed className="size-4 text-slate-500" />
                  Prochaine étape
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{statusNextStep(selectedModule.status)}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">Décision client</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {(["validated", "discussion", "rejected"] as const).map((decision) => (
                    <button
                      key={decision}
                      type="button"
                      onClick={() => saveDecision(selectedModule, decision)}
                      className={[
                        "min-h-11 rounded-md border px-3 text-sm font-semibold transition-colors",
                        selectedDecision === decision
                          ? "border-[#1E2F8A] bg-[#1E2F8A] text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-400",
                      ].join(" ")}
                    >
                      {decisionLabels[decision]}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  Cette décision est conservée localement dans le navigateur pour préparer la validation avec le client.
                </p>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}

