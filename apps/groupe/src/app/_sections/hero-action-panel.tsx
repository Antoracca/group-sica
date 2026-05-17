"use client";

import * as React from "react";
import { MapPin, Briefcase, Search, User, Lock, Building2 } from "lucide-react";

/* ══ ICÔNES PREMIUM SICA ══ */

/* Construction — Immeuble architectural avec étages + fenêtres */
function IconConstruction({ className }: { className?: string }) {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="22" x2="21" y2="22" />
      <polyline points="4 22 4 8 12 3 20 8 20 22" />
      <rect x="8.5" y="10" width="2.5" height="2.5" rx="0.4" />
      <rect x="13"  y="10" width="2.5" height="2.5" rx="0.4" />
      <rect x="8.5" y="15" width="2.5" height="2.5" rx="0.4" />
      <rect x="13"  y="15" width="2.5" height="2.5" rx="0.4" />
      <path d="M10.5 22v-4h3v4" />
    </svg>
  );
}

/* Assistance — Document officiel avec validation checkmark */
function IconAssistance({ className }: { className?: string }) {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="10.5" x2="16" y2="10.5" />
      <polyline points="9 15 11 17 15 13" />
    </svg>
  );
}

/* Réalisations — Galerie portfolio 2×2 */
function IconRealisations({ className }: { className?: string }) {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2"  y="2"  width="9" height="9" rx="1.5" />
      <rect x="13" y="2"  width="9" height="9" rx="1.5" />
      <rect x="2"  y="13" width="9" height="9" rx="1.5" />
      <rect x="13" y="13" width="9" height="9" rx="1.5" />
    </svg>
  );
}

/* Espace Client — Bouclier sécurisé avec profil utilisateur */
function IconClient({ className }: { className?: string }) {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2L4 5.5V10c0 5.8 3.8 10.3 8 11.8 4.2-1.5 8-6 8-11.8V5.5L12 2z" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M7.5 18.5a4.8 4.8 0 0 1 9 0" />
    </svg>
  );
}

function LongArrow({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

/* ── Données ── */

type TabId = "construction" | "assistance" | "realisations" | "client";

/* labelShort : version mobile qui ne wrap pas sur les écrans étroits. */
const TABS: { id: TabId; label: string; labelShort: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: "client",       label: "Espace Client",      labelShort: "Client",       Icon: IconClient },
  { id: "construction", label: "Devis Construction", labelShort: "Devis",        Icon: IconConstruction },
  { id: "assistance",   label: "Conseil Assistance", labelShort: "Conseil",      Icon: IconAssistance },
  { id: "realisations", label: "Nos Réalisations",   labelShort: "Réalisations", Icon: IconRealisations },
];

const FORM_CFG: Record<TabId, {
  f1: { ph: string; Icon: React.FC<{ className?: string }>; type?: string };
  f2: { ph: string; Icon: React.FC<{ className?: string }>; type?: string };
  action: string;
}> = {
  construction: {
    f1: { ph: "Je veux construire...", Icon: Building2 },
    f2: { ph: "Dans la ville de...",   Icon: MapPin },
    action: "https://sicaconstruction.ci/devis",
  },
  assistance: {
    f1: { ph: "Mon besoin...",          Icon: Briefcase },
    f2: { ph: "Nom de l'entreprise",   Icon: User },
    action: "https://sicaassistance.ci/contact",
  },
  realisations: {
    f1: { ph: "Je cherche...",          Icon: Search },
    f2: { ph: "Par ville...",           Icon: MapPin },
    action: "/realisations",
  },
  client: {
    f1: { ph: "Identifiant / Email",   Icon: User },
    f2: { ph: "Mot de passe",          Icon: Lock, type: "password" },
    action: "/espace-client",
  },
};

/*
   ARCHITECTURE UNIFIÉE :
   Les deux couches (onglets + bandeau) partagent exactement la même couleur #2D9CDB.
   La carte d'onglets n'a PAS de bordure inférieure (border-b-0) ni d'ombre séparatrice
   → le bas de la carte se fond invisiblement dans le bandeau.
   On ne voit qu'une seule bordure extérieure (haut + côtés de la carte) côté vidéo.

   Onglet actif : bg-white/15 + text-[#1E2F8A] (bleu royal foncé)
   → fort contraste "éclat" sur fond bleu clair.
*/

export function HeroActionPanel() {
  const [active, setActive] = React.useState<TabId>("client");
  const cfg = FORM_CFG[active];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = cfg.action;
  };

  return (
    <div className="relative w-full">

      {/* ═══ COUCHE 1 : Bandeau bleu pleine largeur ═══ */}
      <div className="w-full bg-[#2D9CDB] pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="mx-auto max-w-[640px] px-4">
          <form
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row bg-white rounded-[2px] shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          >
            <div className="flex flex-1 items-center gap-3 px-4 py-3 sm:py-[14px]">
              <cfg.f1.Icon className="size-[16px] shrink-0 stroke-[1.4] text-gray-400" />
              <input
                type={cfg.f1.type ?? "text"}
                placeholder={cfg.f1.ph}
                className="w-full bg-transparent text-[13px] font-normal text-slate-700 placeholder:text-slate-400 outline-none"
              />
            </div>
            <div className="h-px w-full sm:h-auto sm:w-px bg-gray-200 sm:my-2" />
            <div className="flex flex-1 items-center gap-3 px-4 py-3 sm:py-[14px]">
              <cfg.f2.Icon className="size-[16px] shrink-0 stroke-[1.4] text-gray-400" />
              <input
                type={cfg.f2.type ?? "text"}
                placeholder={cfg.f2.ph}
                className="w-full bg-transparent text-[13px] font-normal text-slate-700 placeholder:text-slate-400 outline-none"
              />
            </div>
            <button
              type="submit"
              aria-label="Valider"
              className="flex h-[46px] sm:h-auto w-full sm:w-[60px] shrink-0 items-center justify-center bg-[#2C4373] text-white transition-colors duration-200 hover:bg-[#1E3054]"
            >
              <LongArrow />
            </button>
          </form>
        </div>
      </div>

      {/* ═══ COUCHE 2 : Carte des onglets — fusion visuelle avec le bandeau ═══
          • rounded-t-[10px]  → coins ronds uniquement en haut (flottant sur la vidéo)
          • border + border-b-0 → bordure visible côté vidéo (haut + côtés) UNIQUEMENT
          • bas ouvert (pas de border-bottom) → fusionne silencieusement avec le bandeau
          • Aucune ombre séparatrice → bloc unique parfaitement unifié               */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[780px] px-4">
        <div className="flex rounded-t-[10px] bg-[#2D9CDB] border border-b-0 border-white/25 overflow-hidden">
          {TABS.map((tab, i) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={[
                  "flex flex-1 flex-col items-center gap-1.5 py-4 sm:py-5 px-2",
                  "font-[Inter,Helvetica,sans-serif] transition-all duration-200",
                  isActive
                    ? "bg-white/15 text-[#1E2F8A]"
                    : "text-white/75 hover:text-white hover:bg-white/10",
                  i !== TABS.length - 1 ? "border-r border-white/20" : "",
                ].join(" ")}
              >
                <tab.Icon className="shrink-0" />
                <span className={[
                  "text-[10px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.1em] leading-tight whitespace-nowrap",
                  isActive ? "font-bold" : "font-semibold",
                ].join(" ")}>
                  {/* Mobile : label court — desktop : label complet */}
                  <span className="sm:hidden">{tab.labelShort}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
