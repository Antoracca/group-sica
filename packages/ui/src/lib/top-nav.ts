import type { TopNavItem } from "../components/site-header";

/* ════════════════════════════════════════════════════════════════════════
   TOP-NAV ADAPTATIF PAR SITE
   ────────────────────────────────────────────────────────────────────────
   Règle :
   ● Sur le site Groupe        → Corporate + cross-links Construction / Assistance / SICA + Partenaires + Contact
   ● Sur le site Construction  → cross-links Groupe / Assistance / SICA + Contact
   ● Sur le site Assistance    → cross-links Groupe / Construction / SICA + Contact
   On n'affiche JAMAIS le lien du site courant dans le topNav.
═══════════════════════════════════════════════════════════════════════ */

export type SiteBrand = "groupe" | "construction" | "assistance";

interface TopNavOptions {
  groupeUrl?: string;
  constructionUrl?: string;
  assistanceUrl?: string;
  landingUrl?: string;
}

const DEFAULTS = {
  groupeUrl: "https://groupesica.ci",
  constructionUrl: "https://sicaconstruction.ci",
  assistanceUrl: "https://sicaassistance.ci",
  landingUrl: "https://sica.ci",
} as const;

export function getTopNav(brand: SiteBrand, options: TopNavOptions = {}): TopNavItem[] {
  const groupeUrl = options.groupeUrl ?? DEFAULTS.groupeUrl;
  const constructionUrl = options.constructionUrl ?? DEFAULTS.constructionUrl;
  const assistanceUrl = options.assistanceUrl ?? DEFAULTS.assistanceUrl;
  const landingUrl = options.landingUrl ?? DEFAULTS.landingUrl;

  /* ── Site GROUPE ───────────────────────────────────────────────────────
     Desktop : Corporate + cross-links + Partenaires + Contact.
     Mobile  : on garde UNIQUEMENT les passerelles vers les sites du Groupe
               (Construction, Assistance). Le reste passe en hideOnMobile
               et reste accessible dans le drawer hamburger / la nav principale.
  ───────────────────────────────────────────────────────────────────── */
  if (brand === "groupe") {
    return [
      {
        label: "Corporate",
        href: "/a-propos",
        logoSrc: "/logo-groupe.png",
        hideOnMobile: true,
      },
      {
        label: "Construction",
        href: constructionUrl,
        external: true,
        logoSrc: "/logo-construction.png",
      },
      {
        label: "SICA Assistance",
        href: assistanceUrl,
        external: true,
        logoSrc: "/logo-assistance.png",
      },
      {
        label: "SICA",
        href: landingUrl,
        external: true,
        icon: "compass",
        hideOnMobile: true,
      },
      {
        label: "Partenaires",
        href: "/partenaires",
        icon: "users",
        hideOnMobile: true,
      },
      {
        label: "Contact",
        href: "/contact",
        icon: "phone",
        hideOnMobile: true,
      },
    ];
  }

  /* ── Sites Construction / Assistance ──────────────────────────────────
     Desktop : cross-links Groupe + (autre site) + SICA + Contact.
     Mobile  : UNIQUEMENT les deux passerelles vers les sites du Groupe.
               (Contact + SICA landing → hideOnMobile, restent dans le
               drawer hamburger).
  ───────────────────────────────────────────────────────────────────── */
  const items: TopNavItem[] = [];

  // Toujours afficher le lien Groupe SICA avec son logo
  items.push({
    label: "Groupe SICA",
    href: groupeUrl,
    external: true,
    logoSrc: "/logo-groupe.png",
  });

  if (brand !== "construction") {
    items.push({
      label: "Construction",
      href: constructionUrl,
      external: true,
      logoSrc: "/logo-construction.png",
    });
  }

  if (brand !== "assistance") {
    items.push({
      label: "SICA Assistance",
      href: assistanceUrl,
      external: true,
      logoSrc: "/logo-assistance.png",
    });
  }

  // Lien SICA landing — toujours présent en desktop, hors bandeau mobile
  items.push({
    label: "SICA",
    href: landingUrl,
    external: true,
    icon: "compass",
    hideOnMobile: true,
  });

  items.push({
    label: "Contact",
    href: "/contact",
    icon: "phone",
    hideOnMobile: true,
  });

  return items;
}
