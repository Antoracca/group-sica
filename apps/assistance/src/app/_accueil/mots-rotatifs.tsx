"use client";

import { useEffect, useState } from "react";
import { cn } from "@sica/ui";

/* Fin de titre qui change toutes les 2,6 s. Chaque entrée arrive d'une direction différente :
   gauche → droite, droite → gauche, haut → bas, bas → haut (DESIGN.md §6).
   Toutes les variantes sont empilées dans la même cellule : la hauteur ne saute jamais. */

const ENTREES = ["sica-in-gauche", "sica-in-droite", "sica-in-haut", "sica-in-bas"] as const;

export function MotsRotatifs({ mots, intervalle = 2600 }: { mots: readonly string[]; intervalle?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % mots.length), intervalle);
    return () => window.clearInterval(t);
  }, [mots.length, intervalle]);

  return (
    <span className="relative inline-grid overflow-hidden pb-[0.12em] align-top">
      <span className="sr-only">{mots[0]}</span>
      {mots.map((m, n) => (
        <span
          key={n === i ? `${m}-actif-${i}` : m}
          aria-hidden
          className={cn(
            "f-accent text-[1.1em] text-brand-amber [grid-area:1/1]",
            n === i ? ENTREES[i % ENTREES.length] : "invisible",
          )}
        >
          {m}
        </span>
      ))}
    </span>
  );
}
