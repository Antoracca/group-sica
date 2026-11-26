import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/*
  Helpers de navigation conscients de la locale. Utiliser ces Link / redirect /
  usePathname / useRouter à la place de ceux de next/* pour que les liens
  internes conservent automatiquement la langue active (/fr, /en).
*/
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
