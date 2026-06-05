"use client";

import React from "react";
import Link from "next/link";
import {
  FolderKanban,
  Wallet,
  FileSignature,
  Ticket,
  TrendingUp,
  Briefcase,
  MapPin,
  ArrowRight,
  FileText,
  Plus,
  CheckCircle2,
  AlertCircle,
  Gavel,
  ShieldAlert,
  CalendarDays,
  Camera,
  MessageSquare,
  Users,
  PieChart,
  HardHat,
  Banknote,
  Activity
} from "lucide-react";
import { usePole, filterByPole } from "@/espace/lib/pole-context";
import { useData } from "@/espace/lib/data-context";
import { formatFcfaCompact } from "@/espace/lib/format";

export default function DashboardPage() {
  const { pole } = usePole();
  const data = useData();
  
  // Mapping the old types to the new conceptual model for the updated UI
  const projects: any[] = []; // Forced to 0 for demo purposes
  const documentsAndInvoices = filterByPole(data.documents, pole);
  const tickets = filterByPole(data.demandes, pole);

  const activeProjects = projects.filter((s) => s.statut === "En cours").length;
  const pendingDocs = documentsAndInvoices.filter((d) => d.statut === "a-signer").length;
  const openTickets = tickets.filter((d) => d.statut !== "traitee").length;
  const totalSpent = documentsAndInvoices.reduce((acc, d) => acc + d.montant, 0);

  const currentDate = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="space-y-12 pb-24">
      {/* Top Section: Beautiful Greeting (Fixed Contrast) */}
      <div className="relative overflow-hidden rounded-3xl bg-white px-8 py-14 shadow-sm border border-zinc-200">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-brand-royal/5 to-transparent" />
        
        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-sm uppercase tracking-widest text-brand-royal font-semibold">
              {currentDate}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Bonjour, {data.profile.prenom ?? "Bienvenue"}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-zinc-600 leading-relaxed">
              Voici votre espace ERP complet. Gérez vos projets, analysez vos finances, validez vos documents légaux et suivez l'avancement de vos équipes en temps réel.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
             <Link 
               href="/espace/demandes" 
               className="flex h-14 items-center gap-3 rounded-xl bg-zinc-900 px-6 text-base font-bold text-white shadow-md transition-all hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5"
             >
               <Ticket className="h-5 w-5" />
               Nouveau ticket
             </Link>
             <Link 
               href="/espace/chantiers/nouveau" 
               className="flex h-14 items-center gap-3 rounded-xl bg-brand-royal px-6 text-base font-bold text-white shadow-lg shadow-brand-royal/30 transition-all hover:bg-brand-royal-600 hover:shadow-brand-royal/40 hover:-translate-y-0.5"
             >
               <Plus className="h-5 w-5" />
               Nouveau projet
             </Link>
          </div>
        </div>
      </div>

      {/* Accordéon Récapitulatif (Remplacement des anciennes cartes) */}
      <SummaryAccordion 
        activeProjects={activeProjects} 
        totalSpent={totalSpent} 
        pendingDocs={pendingDocs} 
        openTickets={openTickets} 
      />

      {/* Main Content Grid 1: Projects & Docs */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
        
        {/* Left Column: Activité récente des projets */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
              <Activity className="h-6 w-6 text-brand-royal" /> 
              Vue détaillée des opérations
            </h2>
            <Link href="/espace/chantiers" className="text-base font-semibold text-brand-royal hover:text-brand-royal-700 hover:underline">
              Explorer les opérations
            </Link>
          </div>
          
          <div className="grid gap-5">
            {projects.length === 0 ? (
               <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
                 <FolderKanban className="mx-auto h-12 w-12 text-zinc-300" />
                 <h3 className="mt-4 text-lg font-bold text-zinc-900">Aucun projet</h3>
                 <p className="mt-2 text-zinc-500">Vous n'avez pas de projets en cours pour ce pôle.</p>
               </div>
            ) : projects.slice(0, 4).map((project) => (
              <div 
                key={project.id} 
                className="group relative flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-royal/5 hover:border-brand-royal/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-5">
                     <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zinc-50 text-zinc-600 ring-1 ring-zinc-200">
                       <Briefcase className="h-7 w-7" />
                     </div>
                     <div>
                       <h4 className="text-xl font-bold text-zinc-900 transition-colors group-hover:text-brand-royal">{project.titre}</h4>
                       <div className="mt-2 flex items-center gap-3 text-sm text-zinc-500">
                         <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {project.localisation}</span>
                         <span className="text-zinc-300">•</span>
                         <span className="font-mono">{project.reference}</span>
                       </div>
                     </div>
                  </div>
                  <ProjectStatusBadge status={project.statut} />
                </div>
                
                <div className="space-y-3">
                   <div className="flex justify-between text-base font-semibold">
                     <span className="text-zinc-600">Progression globale</span>
                     <span className="text-zinc-900">{project.avancement}%</span>
                   </div>
                   <div className="h-3.5 w-full overflow-hidden rounded-full bg-zinc-100 ring-1 ring-inset ring-zinc-200">
                     <div 
                       className="h-full rounded-full bg-gradient-to-r from-brand-royal to-blue-500 transition-all duration-1000 ease-out"
                       style={{ width: `${project.avancement}%` }}
                     />
                   </div>
                </div>
                
                <div className="mt-2 flex items-center justify-between border-t border-zinc-100 pt-5">
                   <div className="flex items-center gap-4">
                     <div className="flex -space-x-2">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-xs font-bold text-zinc-600 ring-1 ring-black/5">
                           T{i}
                         </div>
                       ))}
                     </div>
                     <span className="text-sm font-medium text-zinc-500">+ équipe SICA</span>
                   </div>
                   <Link 
                     href={`/espace/chantiers/${project.id}`} 
                     className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-2.5 text-sm font-bold text-zinc-700 ring-1 ring-inset ring-zinc-200 transition-all hover:bg-brand-royal/10 hover:text-brand-royal hover:ring-brand-royal/30"
                   >
                     Voir le dossier <ArrowRight className="h-4 w-4" />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Factures & Documents */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
              <Banknote className="h-6 w-6 text-brand-royal" />
              Comptabilité & Documents
            </h2>
            <Link href="/espace/documents" className="text-base font-semibold text-brand-royal hover:text-brand-royal-700 hover:underline">
              Tout voir
            </Link>
          </div>
          
          <div className="rounded-md bg-blue-50 p-3 border border-blue-100 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-800">
              <strong>Données d'exemple :</strong> Vos véritables GED et facturations s'afficheront normalement ici. Les éléments ci-dessous sont des exemples.
            </p>
          </div>
          
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
            {documentsAndInvoices.filter((d) => d.statut === "a-signer").length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-50 text-zinc-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <p className="text-lg font-bold text-zinc-900">Tout est à jour</p>
                <p className="mt-2 text-sm text-zinc-500">Aucune facture ni document en attente.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {documentsAndInvoices
                  .filter((d) => d.statut === "a-signer")
                  .map((doc) => (
                    <div 
                      key={doc.id} 
                      className="group flex items-center justify-between rounded-xl p-4 transition-all hover:bg-zinc-50"
                    >
                      <div className="flex items-center gap-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-200">
                          <FileSignature className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="line-clamp-1 text-base font-bold text-zinc-900">{doc.titre}</p>
                          <p className="mt-1 font-mono text-xs text-zinc-500">Réf: {doc.reference}</p>
                        </div>
                      </div>
                      <Link
                        href="/espace/documents"
                        className="ml-4 shrink-0 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-royal hover:shadow-md"
                      >
                        Signer
                      </Link>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Support & Tickets */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                 <Ticket className="h-5 w-5 text-brand-royal" />
                 Support & Tickets
               </h2>
               <Link href="/espace/demandes" className="text-sm font-semibold text-brand-royal hover:underline">Tout voir</Link>
             </div>

             {/* Banner removed since there are no examples anymore */}

             <div className="flex flex-col items-center justify-center py-10 text-center border-t border-zinc-100">
                <div className="flex size-12 items-center justify-center rounded-full bg-zinc-50 text-zinc-300 mb-3">
                  <Ticket className="size-6" />
                </div>
                <p className="text-sm font-bold text-zinc-900">Aucune demande en cours</p>
                <p className="text-xs text-zinc-500 mt-1 max-w-[200px] mx-auto">Vos tickets d'assistance s'afficheront ici.</p>
             </div>
          </div>
        </div>

      </div>

      {/* Massive Modules Grid (ERP Simulation) */}
      <div className="mt-16 space-y-6">
        <h3 className="text-2xl font-bold tracking-tight text-zinc-900">Explorez vos modules ERP</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ModuleAction 
            href="/espace/demandes"
            icon={Ticket}
            title="Support Technique"
            subtitle="Ouvrez un ticket d'assistance immédiat."
            colorClass="text-zinc-900 bg-zinc-50 ring-zinc-200"
          />
          <ModuleAction 
            href="/espace/carte"
            icon={MapPin}
            title="Cartographie GPS"
            subtitle="Suivi satellite de tous vos sites."
            colorClass="text-zinc-900 bg-zinc-50 ring-zinc-200"
          />
          <ModuleAction 
            href="/espace/documents"
            icon={FileText}
            title="GED Centrale"
            subtitle="Tous vos plans, factures et devis."
            colorClass="text-zinc-900 bg-zinc-50 ring-zinc-200"
          />
          <ModuleAction 
            href="/espace/planning"
            icon={CalendarDays}
            title="Planning Global"
            subtitle="Vue Gantt de toutes les interventions."
            colorClass="text-zinc-900 bg-zinc-50 ring-zinc-200"
          />
          <ModuleAction 
            href="/espace/equipes"
            icon={Users}
            title="Ressources Humaines"
            subtitle="Gestion des accès et intervenants."
            colorClass="text-zinc-900 bg-zinc-50 ring-zinc-200"
          />
          <ModuleAction 
            href="/espace/analytiques"
            icon={PieChart}
            title="Analytiques Financières"
            subtitle="Rapports de rentabilité et budgets."
            colorClass="text-zinc-900 bg-zinc-50 ring-zinc-200"
          />
          <ModuleAction 
            href="/espace/messagerie"
            icon={MessageSquare}
            title="Canaux de Communication"
            subtitle="Échanges sécurisés avec nos experts."
            colorClass="text-zinc-900 bg-zinc-50 ring-zinc-200"
          />
          <ModuleAction 
            href="/espace/galerie"
            icon={Camera}
            title="Galerie d'Inspection"
            subtitle="Photos HD des avancements de chantier."
            colorClass="text-zinc-900 bg-zinc-50 ring-zinc-200"
          />
        </div>
      </div>
    </div>
  );
}

// --- Local Components ---

function SummaryAccordion({ activeProjects, totalSpent, pendingDocs, openTickets }: any) {
  const [openSection, setOpenSection] = React.useState<string | null>("projets");

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "projets",
      title: "Projets en cours",
      value: activeProjects,
      icon: FolderKanban,
      desc: "Chantiers et dossiers d'assistance actuellement actifs.",
    },
    {
      id: "depenses",
      title: "Dépenses engagées",
      value: formatFcfaCompact(totalSpent),
      icon: Wallet,
      desc: "Total des factures et dépenses validées sur la période.",
    },
    {
      id: "documents",
      title: "Documents à signer",
      value: pendingDocs,
      icon: FileSignature,
      desc: "Contrats, devis ou plans en attente de votre validation numérique.",
    },
    {
      id: "tickets",
      title: "Tickets de support",
      value: openTickets,
      icon: Ticket,
      desc: "Demandes d'intervention, requêtes SAV et signalements ouverts.",
    }
  ];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-4">
        <h2 className="text-lg font-bold text-zinc-900">Aperçu de la situation</h2>
        <p className="text-sm text-zinc-500">Cliquez pour développer chaque indicateur clé</p>
      </div>
      <div className="divide-y divide-zinc-100">
        {sections.map((sec) => {
          const isOpen = openSection === sec.id;
          const Icon = sec.icon;
          return (
            <div key={sec.id} className="transition-colors hover:bg-zinc-50/50">
              <button
                onClick={() => toggle(sec.id)}
                className="flex w-full items-center justify-between px-6 py-4 focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-base font-semibold text-zinc-900">{sec.title}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xl font-extrabold text-zinc-900">{sec.value}</span>
                  <div className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-400">
                      <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 pl-20 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm text-zinc-600">{sec.desc}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProjectStatusBadge({ status }: { status: string }) {
  const getStyles = () => {
    switch (status?.toLowerCase()) {
      case "en cours":
        return "bg-blue-50 text-blue-700 ring-blue-600/30";
      case "terminé":
      case "livré":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/30";
      case "en pause":
      case "suspendu":
        return "bg-amber-50 text-amber-700 ring-amber-600/30";
      default:
        return "bg-zinc-50 text-zinc-700 ring-zinc-600/30";
    }
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-bold ring-1 ring-inset ${getStyles()}`}>
      {status}
    </span>
  );
}

function ModuleAction({ href, icon: Icon, title, subtitle, colorClass }: any) {
  return (
    <Link 
      href={href}
      className="group flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-brand-royal/50 hover:shadow-lg hover:-translate-y-1"
    >
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ring-1 ring-inset ${colorClass} transition-transform group-hover:scale-110`}>
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <p className="text-lg font-bold text-zinc-900">{title}</p>
        <p className="mt-1 text-sm font-medium text-zinc-500 leading-relaxed">{subtitle}</p>
      </div>
    </Link>
  );
}
