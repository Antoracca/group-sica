import { GroupeHeader } from "@/components/groupe-header";
import { Footer } from "./footer";

/* ════════════════════════════════════════════════════════════════════════
   PAGE SHELL — wrapper standard pour les pages corporate du Groupe SICA
   ────────────────────────────────────────────────────────────────────────
   Évite de dupliquer SiteHeader + Footer sur chaque page institutionnelle.
   La homepage (page.tsx) garde sa propre composition pour son hero spécial,
   mais toutes les pages internes (/groupe, /actualites, /contact…) passent
   par ce shell pour une cohérence absolue.
═══════════════════════════════════════════════════════════════════════ */

interface PageShellProps {
  children: React.ReactNode;
  /** Désactive la transparence initiale du header — par défaut TRUE pour les
   *  pages internes (corporate, actualités, contact...) qui ont un fond blanc.
   *  À mettre à false UNIQUEMENT si la page a un hero vidéo plein écran. */
  headerSolid?: boolean;
}

export function PageShell({ children, headerSolid = true }: PageShellProps) {
  return (
    <>
      <GroupeHeader forceScrolled={headerSolid} />

      <main id="main-content">{children}</main>

      <Footer />
    </>
  );
}
