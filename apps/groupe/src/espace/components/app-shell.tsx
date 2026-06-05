"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { Search, Menu } from "lucide-react";
import { PoleProvider, usePole } from "@/espace/lib/pole-context";
import { DataProvider, type EspaceData } from "@/espace/lib/data-context";
import { Sidebar } from "./sidebar";
import { NotificationsPopover } from "./notifications-popover";
import type { PoleFilter } from "@/espace/lib/brand";
import { cn } from "@sica/ui";

import { Home, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const POLES: { id: PoleFilter; label: string; logo: string }[] = [
  { id: "all", label: "Groupe SICA", logo: "/logo-groupe.png" },
  { id: "construction", label: "Construction", logo: "/logo-construction.png" },
  { id: "assistance", label: "Assistance", logo: "/logo-assistance.png" },
];

import { links } from "@/lib/links";

function AccueilModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Retour à l'Accueil</h2>
            <p className="text-sm text-zinc-500 mt-1">Choisissez vers quel site vous souhaitez retourner.</p>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors">
            <X className="size-5" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          <a href={links.groupe.base} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 hover:border-brand-royal hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-100 rounded-lg group-hover:bg-brand-royal/10 transition-colors">
                <Home className="size-6 text-zinc-700 group-hover:text-brand-royal" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">Accueil Groupe SICA</h3>
                <p className="text-sm text-zinc-500">Le site institutionnel principal</p>
              </div>
            </div>
            <ExternalLink className="size-5 text-zinc-300 group-hover:text-brand-royal transition-colors" />
          </a>

          <a href={links.construction.base} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 hover:border-orange-500 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-100 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                <Image src="/logo-construction.png" alt="Construction" width={24} height={24} className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">SICA Construction</h3>
                <p className="text-sm text-zinc-500">Expertise BTP et Géobéton</p>
              </div>
            </div>
            <ExternalLink className="size-5 text-zinc-300 group-hover:text-orange-500 transition-colors" />
          </a>

          <a href={links.assistance.base} className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 hover:border-brand-royal hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-100 rounded-lg group-hover:bg-brand-royal/10 transition-colors">
                <Image src="/logo-assistance.png" alt="Assistance" width={24} height={24} className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">SICA Assistance</h3>
                <p className="text-sm text-zinc-500">Prestations et services</p>
              </div>
            </div>
            <ExternalLink className="size-5 text-zinc-300 group-hover:text-brand-royal transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}

function NavbarPoleSwitcher() {
  const { pole, setPole } = usePole();

  return (
    <div className="hidden lg:flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100/80 p-1 shadow-inner">
      {POLES.map((p) => {
        const isSelected = p.id === pole;
        return (
          <button
            key={p.id}
            onClick={() => setPole(p.id)}
            className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1.5 transition-all",
              isSelected 
                ? "bg-white text-zinc-900 shadow-md ring-1 ring-zinc-200" 
                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50"
            )}
          >
            <Image 
              src={p.logo} 
              alt={p.label} 
              width={100} 
              height={24} 
              className={cn("h-4 w-auto object-contain transition-opacity", !isSelected && "opacity-60")} 
            />
            <span className={cn("text-xs font-bold tracking-wide", isSelected ? "text-zinc-900" : "text-zinc-500")}>
              {p.label === "Groupe SICA" ? "Vue Globale" : `SICA ${p.label}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function AppShell({ data, children }: { data: EspaceData; children: ReactNode }) {
  const [isAccueilOpen, setIsAccueilOpen] = useState(false);

  return (
    <DataProvider value={data}>
      <PoleProvider>
        <div className="flex h-[100dvh] w-full overflow-hidden bg-white text-zinc-900 selection:bg-brand-royal/20">
          <Sidebar />
          
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Top Header */}
            <header className="flex h-16 shrink-0 items-center gap-6 border-b border-zinc-200 bg-white px-6 shadow-sm sm:px-8">
              <button type="button" className="lg:hidden text-zinc-500 hover:text-zinc-900">
                <Menu className="size-6" />
              </button>
              
              <div className="py-2">
                <NavbarPoleSwitcher />
              </div>

              <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
                <button 
                  onClick={() => setIsAccueilOpen(true)}
                  className="flex h-9 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:text-brand-royal transition-colors"
                >
                  <Home className="size-4" />
                  <span className="hidden sm:inline">Accueil</span>
                </button>
                <button 
                  className="hidden md:flex h-9 w-48 items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50/50 px-3 text-sm text-zinc-400 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-royal/20"
                >
                  <Search className="size-4" />
                  <span className="flex-1 text-left">Rechercher...</span>
                  <div className="flex items-center gap-1">
                    <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 shadow-sm">⌘</kbd>
                    <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 shadow-sm">K</kbd>
                  </div>
                </button>
                <NotificationsPopover />
              </div>
            </header>

            <main id="main-content" className="flex-1 overflow-y-auto bg-zinc-50 p-6 sm:p-8 lg:p-10 relative">
              <div className="mx-auto w-full max-w-[1600px]">{children}</div>
            </main>
          </div>
        </div>
        
        <AccueilModal isOpen={isAccueilOpen} onClose={() => setIsAccueilOpen(false)} />
      </PoleProvider>
    </DataProvider>
  );
}
