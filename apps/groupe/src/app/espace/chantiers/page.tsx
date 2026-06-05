"use client";

import Link from "next/link";
import { Building2, FileText, MapPin, Target, Wallet, CalendarDays } from "lucide-react";
import { Surface, Progress, StatusPill } from "@/espace/components/ui/primitives";
import type { Project } from "@/espace/lib/types";
import { formatFcfa } from "@/espace/lib/format";

// Empty state for chantiers
const mockProjects: Project[] = [];

export default function ChantiersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-ink">Projets & Chantiers</h1>
          <p className="mt-1 text-base text-slate">
            Gérez vos opérations, chantiers et dossiers en toute simplicité.
          </p>
        </div>
        <Link 
          href="/espace/chantiers/nouveau" 
          className="inline-flex items-center gap-2 rounded-xl bg-brand-royal px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-royal/90"
        >
          Nouveau projet
        </Link>
      </div>

      <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-200 text-zinc-500 shadow-inner">
          <Building2 className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Vos projets s'afficheront ici</h2>
        <p className="mt-4 max-w-lg text-base text-zinc-500">
          Vous n'avez pas encore de chantiers actifs ou de projets enregistrés dans ce pôle. Commencez par créer une nouvelle demande de devis ou un nouveau dossier.
        </p>
        <div className="mt-8">
          <Link 
            href="/espace/chantiers/nouveau" 
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 hover:bg-zinc-50"
          >
            Créer un nouveau projet
          </Link>
        </div>
      </div>
    </div>
  );
}
