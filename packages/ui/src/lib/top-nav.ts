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

  /* ── Site GROUPE — pas de duplication Construction/Assistance dans topNav ──
     Le mainNav contient déjà ces 2 pôles, on ne les répète PAS en haut.
     Items : Corporate (→ /a-propos) · Réalisations · Partenaires · Carrières · Contact */
  if (brand === "groupe") {
    return [
      { label: "Corporate", href: "/a-propos", icon: "building" },
      { label: "Réalisations", href: "/realisations", icon: "realisations" },
      { label: "Partenaires", href: "/partenaires", icon: "users" },
      { label: "Carrières", href: "/carrieres", icon: "briefcase" },
      { label: "Contact", href: "/contact", icon: "phone" },
    ];
  }

  /* ── Sites Construction / Assistance — cross-links + utilitaires ────── */
  const crossLinks: TopNavItem[] = [
    {
      label: "Groupe SICA",
      href: groupeUrl,
      external: true,
      icon: "building",
    },
  ];

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

  const utility: TopNavItem[] = [
    { label: "Carrières", href: `${groupeUrl}/carrieres`, external: true, icon: "briefcase" },
    { label: "Contact", href: "/contact", icon: "phone" },
  ];

  return [...crossLinks, ...utility];
}
