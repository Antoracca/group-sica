"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ActiviteItem, Demande, Document, Suivi } from "./types";
import type { ProfileRow } from "./queries";

export interface EspaceData {
  profile: ProfileRow;
  suivis: Suivi[];
  documents: Document[];
  demandes: Demande[];
  activite: ActiviteItem[];
}

const Ctx = createContext<EspaceData | null>(null);

export function DataProvider({ value, children }: { value: EspaceData; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useData(): EspaceData {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
