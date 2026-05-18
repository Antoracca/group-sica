import Image from "next/image";
import { Logo, SiteHeader, getTopNav } from "@sica/ui";
import { mainNav } from "@/lib/nav";
import { links } from "@/lib/links";
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
  const topNav = getTopNav("groupe", {
    constructionUrl: links.construction.base,
  });

  return (
    <>
      <SiteHeader
        brand="groupe"
        logo={
          <Logo
            brand="groupe"
            imgClassName="h-16 w-auto select-none sm:h-[4.5rem] lg:h-20 xl:h-24"
            imageRenderer={({ src, alt, width, height, className }) => (
              <Image src={src} alt={alt} width={width} height={height} className={className} />
            )}
          />
        }
        nav={mainNav}
        topNav={topNav}
        forceScrolled={headerSolid}
      />

      <main id="main-content">{children}</main>

      <Footer />
    </>
  );
}
