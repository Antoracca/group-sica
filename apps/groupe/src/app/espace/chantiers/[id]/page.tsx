"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Check,
  Clock,
  FileText,
  MapPin,
  Circle,
  Download,
  Wallet,
  Target,
  Users,
  Building2,
  CalendarDays,
  LayoutGrid
} from "lucide-react";
import { Surface, Progress, StatusPill } from "@/espace/components/ui/primitives";
import type { Project, ProjectStep } from "@/espace/lib/types";
import { formatFcfa } from "@/espace/lib/format";
import { cn } from "@sica/ui";

const ETAPE_ICON = {
  fait: Check,
  encours: Clock,
  avenir: Circle,
  retard: Circle,
} as const;

const mockProject: Project = {
  id: "proj-1",
  pole: "construction",
  type: "chantier",
  titre: "Résidence Les Alizés",
  reference: "PRJ-2024-001",
  localisation: "Abidjan, Cocody",
  pos_lat: 5.3599,
  pos_lng: -4.0083,
  statut: "En cours",
  avancement: 65,
  budget_prevu: 150000000,
  budget_depense: 95000000,
  date_debut: "2024-01-15",
  date_fin_prevue: "2024-12-30",
  prochaine_etape: "Coulage dalle R+2",
  updated_at: "2024-05-20T10:00:00Z",
  etapes: [
    { id: "e1", label: "Préparation du terrain", statut: "fait", date_realise: "2024-02-10" },
    { id: "e2", label: "Fondations", statut: "fait", date_realise: "2024-03-20" },
    { id: "e3", label: "Élévation RDC", statut: "fait", date_realise: "2024-04-15" },
    { id: "e4", label: "Coulage dalle R+2", statut: "encours", date_prevue: "2024-06-10" },
    { id: "e5", label: "Gros œuvre achevé", statut: "avenir", date_prevue: "2024-08-30" },
  ],
  team: [
    { id: "t1", user_id: "u1", role_projet: "Chef de projet", profile: { id: "u1", role: "staff", email: "", telephone: "", ville: "", adresse: "", pays: "", signature_url: "", preferences: { theme: "", language: "", notifications_email: true }, entreprise: null, prenom: "Jean", nom: "Kouadio", photo_url: null } },
    { id: "t2", user_id: "u2", role_projet: "Architecte", profile: { id: "u2", role: "staff", email: "", telephone: "", ville: "", adresse: "", pays: "", signature_url: "", preferences: { theme: "", language: "", notifications_email: true }, entreprise: null, prenom: "Marie", nom: "Sery", photo_url: null } },
  ]
};

export default function ChantierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = mockProject; // normally fetch by ID
  if (!project) notFound();

  const [activeTab, setActiveTab] = useState<"overview" | "team" | "docs">("overview");

  const budgetPercentage = project.budget_prevu > 0 ? (project.budget_depense / project.budget_prevu) * 100 : 0;

  return (
    <div className="space-y-8">
      <Link
        href="/espace/chantiers"
        className="inline-flex min-h-[40px] items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-slate transition-colors hover:text-brand-royal"
      >
        <ArrowLeft className="size-4" /> Projets & Chantiers
      </Link>

      {/* Massive Premium Header */}
      <Surface className="relative overflow-hidden p-8 sm:p-10">
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-brand-royal/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-emerald-500/5 blur-3xl" />
        
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <StatusPill kind={project.statut} label={project.statut} />
              <span className="rounded-full bg-black/5 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-slate">
                {project.reference}
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{project.titre}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate">
              {project.localisation && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-brand-royal" /> {project.localisation}
                </span>
              )}
              {project.date_debut && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-brand-royal" /> Début : {new Date(project.date_debut).toLocaleDateString("fr-FR")}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex shrink-0 items-center gap-6 rounded-2xl bg-white/60 p-5 shadow-sm backdrop-blur-md">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate">Avancement</p>
              <p className="mt-1 font-display text-3xl font-bold text-ink">{project.avancement}%</p>
            </div>
            <div className="h-10 w-px bg-black/10" />
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate">Budget</p>
              <p className="mt-1 font-display text-3xl font-bold text-ink">{budgetPercentage.toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative z-10 mt-10 flex items-center gap-2 border-b border-black/5 pb-px">
          {(
            [
              { id: "overview", label: "Vue d'ensemble", icon: LayoutGrid },
              { id: "team", label: "Équipe", icon: Users },
              { id: "docs", label: "Documents", icon: FileText },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors",
                  active
                    ? "border-brand-royal text-brand-royal"
                    : "border-transparent text-slate hover:text-ink"
                )}
              >
                <tab.icon className="size-4" /> {tab.label}
              </button>
            );
          })}
        </div>
      </Surface>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Surface className="p-6">
              <h2 className="font-display text-lg font-bold text-ink">Chronologie du projet</h2>
              <p className="mt-1 text-sm text-slate">Suivi des étapes clés et jalons.</p>
              
              <div className="mt-8">
                {project.etapes && project.etapes.length > 0 ? (
                  <ol className="relative space-y-6 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-24px)] before:w-px before:bg-black/10">
                    {project.etapes.map((e, i) => {
                      const Icon = ETAPE_ICON[e.statut] || Circle;
                      const activeColor =
                        e.statut === "fait"
                          ? "bg-emerald-500 text-white ring-emerald-500/20"
                          : e.statut === "encours"
                            ? "bg-brand-royal text-white ring-brand-royal/20"
                            : "bg-mist text-slate ring-slate/10";

                      return (
                        <li key={e.id} className="relative flex gap-6">
                          <div
                            className={cn(
                              "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4",
                              activeColor
                            )}
                          >
                            <Icon className="size-4" />
                          </div>
                          <div className="flex-1 pt-1.5">
                            <p className={cn("text-base font-semibold", e.statut === "avenir" ? "text-slate" : "text-ink")}>
                              {e.label}
                            </p>
                            {(e.date_realise || e.date_prevue) && (
                              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wide text-slate">
                                {e.date_realise ? `Réalisé le ${new Date(e.date_realise).toLocaleDateString("fr-FR")}` : `Prévu pour le ${new Date(e.date_prevue!).toLocaleDateString("fr-FR")}`}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                ) : (
                  <p className="rounded-xl bg-mist/50 p-4 text-sm text-slate">Aucune étape définie pour ce projet.</p>
                )}
              </div>
            </Surface>
          </div>

          <div className="space-y-6">
            <Surface className="p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-slate">Synthèse Financière</h3>
              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate">Budget consommé</span>
                    <span className="font-mono font-semibold text-ink">{budgetPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={budgetPercentage} className="bg-slate/10 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-emerald-600" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-mist/50 p-4">
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate">Dépenses</p>
                    <p className="mt-1 font-mono text-sm font-bold text-ink">{formatFcfa(project.budget_depense)}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate">Prévu</p>
                    <p className="mt-1 font-mono text-sm font-bold text-slate">{formatFcfa(project.budget_prevu)}</p>
                  </div>
                </div>
              </div>
            </Surface>

            <Surface className="p-6">
               <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-slate">Localisation</h3>
               <div className="mt-4 flex aspect-video items-center justify-center rounded-xl bg-mist/50">
                  <div className="text-center">
                    <MapPin className="mx-auto size-6 text-slate" />
                    <p className="mt-2 text-xs font-medium text-slate">{project.localisation || "Non définie"}</p>
                  </div>
               </div>
            </Surface>
          </div>
        </div>
      )}

      {activeTab === "team" && (
        <Surface className="p-6">
          <h2 className="font-display text-lg font-bold text-ink">Équipe projet</h2>
          <p className="mt-1 text-sm text-slate">Les intervenants SICA dédiés à ce dossier.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.team?.map((member) => (
              <div key={member.id} className="flex items-center gap-4 rounded-2xl border border-black/5 bg-mist/30 p-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-brand-royal/10 text-brand-royal">
                  <Users className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-ink">{member.profile?.prenom} {member.profile?.nom}</p>
                  <p className="text-xs font-medium text-brand-royal">{member.role_projet}</p>
                </div>
              </div>
            ))}
            {(!project.team || project.team.length === 0) && (
              <p className="text-sm text-slate">Aucun membre assigné.</p>
            )}
          </div>
        </Surface>
      )}

      {activeTab === "docs" && (
        <Surface className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-ink">Documents du projet</h2>
              <p className="mt-1 text-sm text-slate">Retrouvez tous les documents liés à ce projet.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-mist/30 py-12 text-center">
            <FileText className="mb-3 size-8 text-slate" />
            <p className="text-sm font-semibold text-ink">Aucun document</p>
            <p className="mt-1 text-xs text-slate">Les documents ajoutés apparaîtront ici.</p>
          </div>
        </Surface>
      )}
    </div>
  );
}
