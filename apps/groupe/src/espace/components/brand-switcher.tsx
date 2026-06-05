"use client";

import { Layers } from "lucide-react";
import { cn } from "@sica/ui";
import { BRANDS, type PoleFilter } from "@/espace/lib/brand";
import { usePole } from "@/espace/lib/pole-context";

const OPTIONS: { id: PoleFilter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "construction", label: "Construction" },
  { id: "assistance", label: "Assistance" },
];

export function BrandSwitcher() {
  const { pole, setPole } = usePole();

  return (
    <div
      role="group"
      aria-label="Filtrer par pôle"
      className="flex items-center gap-0.5 rounded-full border border-black/[0.06] bg-mist/60 p-0.5"
    >
      {OPTIONS.map((opt) => {
        const active = pole === opt.id;
        const Icon = opt.id === "all" ? Layers : BRANDS[opt.id].icon;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => setPole(opt.id)}
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors",
              active ? "bg-white text-brand-royal shadow-sm" : "text-slate hover:text-ink",
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
