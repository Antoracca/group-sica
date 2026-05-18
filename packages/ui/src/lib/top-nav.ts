import type { TopNavItem } from "../components/site-header";

/* ════════════════════════════════════════════════════════════════════════
   TOP-NAV ADAPTATIF PAR SITE
   ────────────────────────────────────────────────────────────────────────
   Le top-nav (bandeau gris fin tout en haut du header) liste les LIENS
   CROSS-SITES et utilitaires. Règle :

   ● Sur le site Groupe        → afficher Construction + Assistance + utilitaires
   ● Sur le site Construction  → afficher Groupe + Assistance + utilitaires
   ● Sur le site Assistance    → afficher Groupe + Construction + utilitaires

   On n'affiche JAMAIS le lien du site sur lequel on se trouve déjà.
═══════════════════════════════════════════════════════════════════════ */

export type SiteBrand = "groupe" | "construction" | "assistance";

interface TopNavOptions {
  /** URLs externes des autres sites SICA — passées par l'app appelante */
  groupeUrl?: string;
  constructionUrl?: string;
  assistanceUrl?: string;
}

const DEFAULTS = {
  groupeUrl: "https://groupesica.ci",
  constructionUrl: "https://sicaconstruction.ci",
  assistanceUrl: "https://sicaassistance.ci",
} as const;

export function getTopNav(brand: SiteBrand, options: TopNavOptions = {}): TopNavItem[] {
  const groupeUrl = options.groupeUrl ?? DEFAULTS.groupeUrl;
  const constructionUrl = options.constructionUrl ?? DEFAULTS.constructionUrl;
  const assistanceUrl = options.assistanceUrl ?? DEFAULTS.assistanceUrl;

  /* ── Liens cross-sites (selon le site courant) ────────────────────── */
  const crossLinks: TopNavItem[] = [];

  if (brand !== "groupe") {
    crossLinks.push({
      label: "Groupe SICA",
      href: groupeUrl,
      external: true,
      icon: "building",
    });
  }
  if (brand !== "construction") {
    crossLinks.push({
      label: "Construction",
      href: constructionUrl,
      external: true,
      icon: "construction",
    });
  }
  if (brand !== "assistance") {
    crossLinks.push({
      label: "Assistance",
      href: assistanceUrl,
      external: true,
      icon: "assistance",
    });
  }

  /* ── Liens utilitaires (toujours présents) ─────────────────────────── */
  const utility: TopNavItem[] =
    brand === "groupe"
      ? [
          { label: "Carrières", href: "/carrieres", icon: "briefcase" },
          { label: "Partenaires", href: "/partenaires", icon: "users" },
          { label: "Contact", href: "/contact", icon: "phone" },
        ]
      : brand === "construction"
      ? [
          { label: "Carrières", href: `${groupeUrl}/carrieres`, external: true, icon: "briefcase" },
          { label: "Contact", href: "/contact", icon: "phone" },
        ]
      : [
          { label: "Carrières", href: `${groupeUrl}/carrieres`, external: true, icon: "briefcase" },
          { label: "Contact", href: "/contact", icon: "phone" },
        ];

  return [...crossLinks, ...utility];
}
