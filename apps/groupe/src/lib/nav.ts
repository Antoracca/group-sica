import type { NavItem } from "@sica/ui";
import { links } from "@/lib/links";

export const mainNav: NavItem[] = [
  { label: "Le Groupe", href: "/groupe" },
  { label: "Construction", href: links.construction.base, external: true },
  { label: "Assistance", href: "https://sicaassistance.ci", external: true },
  { label: "Réalisations", href: "/realisations" },
  { label: "Actualités", href: "/actualites" },
  { label: "Carrières", href: "/carrieres" },
  { label: "Contact", href: "/contact" },
];
