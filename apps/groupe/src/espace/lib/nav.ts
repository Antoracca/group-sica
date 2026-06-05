import {
  LayoutDashboard,
  FolderKanban,
  Map,
  Files,
  LifeBuoy,
  Settings,
  Users,
  Briefcase,
  Gavel,
  PieChart,
  CalendarDays,
  Camera,
  FolderLock,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

import type { PoleFilter } from "./brand";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  mobile?: boolean;
  poles?: PoleFilter[];
  badge?: string; // e.g., "3 Nouveaux"
}

export const ESPACE_BASE = "/espace";

export const NAV_ITEMS: NavItem[] = [
  { href: "/espace", label: "Tableau de bord", icon: LayoutDashboard, mobile: true },
  { href: "/espace/chantiers", label: "Projets & Chantiers", icon: FolderKanban, mobile: true, poles: ["all", "construction"] },
  { href: "/espace/carte", label: "Cartographie GPS", icon: Map, mobile: true },
  { href: "/espace/documents", label: "GED & Facturation", icon: Files, mobile: true },
  { href: "/espace/demandes", label: "Support & Tickets", icon: LifeBuoy, mobile: true },
  { href: "/espace/juridique", label: "Affaires Juridiques", icon: Gavel, poles: ["all", "assistance"] },
  { href: "/espace/equipes", label: "Équipes & Intervenants", icon: Users },
  { href: "/espace/planning", label: "Planning Global", icon: CalendarDays },
  { href: "/espace/galerie", label: "Galerie de Site", icon: Camera, poles: ["all", "construction"] },
  { href: "/espace/archives", label: "Archives Sécurisées", icon: FolderLock },
  { href: "/espace/messagerie", label: "Messagerie Interne", icon: MessageSquare, badge: "Nouveau" },
  { href: "/espace/analytiques", label: "Rapports Analytiques", icon: PieChart },
  { href: "/espace/parametres", label: "Paramètres Avancés", icon: Settings },
];
