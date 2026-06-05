import { Building2, Briefcase, type LucideIcon } from "lucide-react";
import type { ProjectPole } from "./types";

export interface BrandInfo {
  id: ProjectPole;
  label: string;
  short: string;
  logo: string;
  icon: LucideIcon;
}

export const BRANDS: Record<ProjectPole, BrandInfo> = {
  construction: {
    id: "construction",
    label: "SICA Construction",
    short: "Construction",
    logo: "/logo-construction.png",
    icon: Building2,
  },
  assistance: {
    id: "assistance",
    label: "SICA Assistance",
    short: "Assistance",
    logo: "/logo-assistance.png",
    icon: Briefcase,
  },
};

/** Filtre actif : "all" = vue holding (Groupe). */
export type PoleFilter = ProjectPole | "all";
