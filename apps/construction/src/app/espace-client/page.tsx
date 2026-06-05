import { redirect } from "next/navigation";
import { links } from "@/lib/links";

/*
  L'espace client (connexion + tableau de bord) est servi par l'app dédiée
  « espace » (Supabase Auth). Cette ancienne route ne fait plus que rediriger.
*/
export default function EspaceClientRedirect() {
  redirect(links.espace.base);
}
