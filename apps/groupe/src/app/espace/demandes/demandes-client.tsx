"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Clock, ArrowUpRight, CheckCircle2, Circle, Clock4 } from "lucide-react";
import { cn } from "@sica/ui";
import { Surface } from "@/espace/components/ui/primitives";
import { usePole } from "@/espace/lib/pole-context";
import { BRANDS } from "@/espace/lib/brand";
import type { Ticket, TicketStatus, TicketPriority, ProjectPole } from "@/espace/lib/types";

const MOCK_TICKETS: Ticket[] = [];

const PRIORITY_STYLES: Record<TicketPriority, string> = {
  urgente: "text-red-700 bg-red-500/10 border-red-500/20",
  haute: "text-amber-700 bg-amber-500/10 border-amber-500/20",
  moyenne: "text-blue-700 bg-blue-500/10 border-blue-500/20",
  basse: "text-slate-700 bg-slate-500/10 border-slate-500/20",
};

const STATUS_ICONS: Record<TicketStatus, React.ElementType> = {
  "nouvelle": Circle,
  "en-cours": Clock4,
  "en-attente-client": Clock,
  "traitee": CheckCircle2,
};

const STATUS_LABELS: Record<TicketStatus, string> = {
  "nouvelle": "Nouvelle",
  "en-cours": "En cours",
  "en-attente-client": "En attente",
  "traitee": "Traitée",
};

const STATUS_STYLES: Record<TicketStatus, string> = {
  "nouvelle": "text-brand-amber-600",
  "en-cours": "text-brand-royal",
  "en-attente-client": "text-orange-500",
  "traitee": "text-emerald-600",
};

export function DemandesClient() {
  const { pole } = usePole();
  const tickets = MOCK_TICKETS.filter((t) => pole === "all" || t.pole === pole);

  return (
    <div className="flex h-full flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">Demandes & Support</h1>
          <p className="mt-1 text-sm text-slate">
            Gérez vos tickets, suivez l'avancement de vos requêtes et communiquez avec votre équipe.
          </p>
        </div>
        <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-royal px-4 text-sm font-medium text-white transition-colors hover:bg-brand-royal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2">
          <Plus className="size-4" />
          Nouvelle Demande
        </button>
      </div>

      <Surface className="flex-1 overflow-hidden border border-black/5 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-4 border-b border-black/5 bg-white/50 px-4 py-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate" />
            <input
              type="text"
              placeholder="Rechercher un ticket..."
              className="h-9 w-full rounded-md border border-black/10 bg-white/50 pl-9 pr-4 text-sm text-ink placeholder:text-slate focus:border-brand-royal focus:outline-none focus:ring-1 focus:ring-brand-royal"
            />
          </div>
          <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-3 text-sm font-medium text-ink transition-colors hover:bg-black/[0.02]">
            <Filter className="size-4" />
            Filtrer
          </button>
        </div>

        {/* List Header */}
        <div className="grid grid-cols-[minmax(0,1fr)_120px_140px_120px_40px] items-center gap-4 border-b border-black/5 bg-black/[0.02] px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-slate">
          <div>Sujet</div>
          <div>Priorité</div>
          <div>Statut</div>
          <div>Créé le</div>
          <div></div>
        </div>

        {/* List Body */}
        <div className="divide-y divide-black/5 overflow-y-auto">
          {tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-slate/10 text-slate">
                <Search className="size-6" />
              </div>
              <p className="mt-4 text-sm font-medium text-ink">Aucun ticket trouvé</p>
              <p className="mt-1 text-sm text-slate">Il n'y a aucune demande pour ce pôle actuellement.</p>
            </div>
          ) : (
            tickets.map((ticket) => {
              const brand = BRANDS[ticket.pole]!;
              const BrandIcon = brand.icon;
              const StatusIcon = STATUS_ICONS[ticket.statut];

              return (
                <div
                  key={ticket.id}
                  className="group grid grid-cols-[minmax(0,1fr)_120px_140px_120px_40px] items-center gap-4 px-5 py-3 transition-colors hover:bg-black/[0.02]"
                >
                  <div className="flex items-start gap-3 overflow-hidden">
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-black/5 text-slate">
                      <BrandIcon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-medium text-slate">{ticket.id}</span>
                        <span className="truncate font-medium text-ink">{ticket.sujet}</span>
                      </div>
                      <p className="truncate text-sm text-slate">{ticket.description}</p>
                    </div>
                  </div>

                  <div>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                        PRIORITY_STYLES[ticket.priorite]
                      )}
                    >
                      {ticket.priorite}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <StatusIcon className={cn("size-4", STATUS_STYLES[ticket.statut])} />
                    <span className="text-sm font-medium text-ink/80">{STATUS_LABELS[ticket.statut]}</span>
                  </div>

                  <div className="text-sm text-slate">
                    {new Date(ticket.created_at).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>

                  <div className="flex items-center justify-end">
                    <button className="flex size-8 items-center justify-center rounded-md text-slate opacity-0 transition-all hover:bg-black/5 hover:text-ink group-hover:opacity-100">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Surface>
    </div>
  );
}
