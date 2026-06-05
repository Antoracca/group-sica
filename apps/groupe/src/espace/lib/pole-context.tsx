"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { PoleFilter } from "./brand";

interface PoleCtx {
  pole: PoleFilter;
  setPole: (p: PoleFilter) => void;
}

const Ctx = createContext<PoleCtx | null>(null);

export function PoleProvider({ children }: { children: ReactNode }) {
  const [pole, setPole] = useState<PoleFilter>("all");
  return <Ctx.Provider value={{ pole, setPole }}>{children}</Ctx.Provider>;
}

export function usePole(): PoleCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePole must be used within PoleProvider");
  return ctx;
}

/** Filtre générique par pôle (vue holding = tout). */
export function filterByPole<T extends { pole: string }>(items: T[], pole: PoleFilter): T[] {
  return pole === "all" ? items : items.filter((i) => i.pole === pole);
}
