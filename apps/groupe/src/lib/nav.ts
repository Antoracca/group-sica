import { getTopNav, type NavItem } from "@sica/ui";
import { links } from "@/lib/links";

/* ════════════════════════════════════════════════════════════════════════
   NAVIGATION GROUPE SICA — Source : docs/CONTEXTE.md §2 et §8
   ────────────────────────────────────────────────────────────────────────
   RÈGLES STRICTES (à respecter pour éviter les doublons) :

   1. SICA possède EXACTEMENT 2 pôles : Construction & Assistance.
      → "Comptable" N'EST PAS un pôle — c'est une sous-section d'Assistance.
      → "Réalisations" N'EST PAS un pôle — c'est du contenu Construction.

   2. Sur le site Groupe (groupesica.ci), la navbar liste :
      - Le Groupe (pages institutionnelles internes)
      - Construction (lien externe vers sicaconstruction.ci + preview menu)
      - Assistance (lien externe vers sicaassistance.ci + preview menu)
      - Actualités (blog SEO interne)

   3. Le top-nav (haut de page) est ADAPTATIF — voir packages/ui/lib/top-nav.ts.
      Sur Groupe SICA → on n'affiche PAS "Groupe SICA" (on y est déjà).
═══════════════════════════════════════════════════════════════════════ */

/* ── Navigation principale — 4 entrées ─────────────────────────────────── */

export const mainNav: NavItem[] = [
  {
    label: "Corporate",
    href: "/a-propos",
    tagline: "Qui nous sommes, d'où nous venons",
    children: [
      {
        label: "À propos",
        href: "/a-propos",
        description: "Dirigeant, organigramme et implantations du Groupe SICA.",
      },
      {
        label: "Actualités",
        href: "/actualites",
        description: "Toute l'activité récente du Groupe et de ses pôles.",
      },
      {
        label: "Carrières",
        href: "/carrieres",
        description: "Rejoindre les équipes SICA en Côte d'Ivoire.",
      },
      {
        label: "Partenaires",
        href: "/partenaires",
        description: "Réseau d'entreprises et institutions associées.",
      },
      {
        label: "Contact",
        href: "/contact",
        description: "Nous joindre — Abidjan et Yamoussoukro.",
      },
    ],
  },
  {
    label: "Construction",
    href: links.construction.base,
    external: true,
    tagline: "Du sol au toit — BTP, géobéton, génie civil",
    children: [
      {
        label: "Accueil Construction",
        href: links.construction.base,
        description: "Présentation du pôle BTP — études, génie civil, géobéton.",
        external: true,
      },
      {
        label: "Services BTP",
        href: `${links.construction.base}/services`,
        description: "Études, terrassement, structure, charpente, plomberie, électricité, VRD.",
        external: true,
      },
      {
        label: "Géobéton",
        href: `${links.construction.base}/services/geobeton`,
        description: "Notre matériau signature — brique BTCS à haute densité.",
        external: true,
      },
      {
        label: "Études de sol",
        href: `${links.construction.base}/services/etudes-sol`,
        description: "Sondages pressiométriques et dimensionnement des fondations.",
        external: true,
      },
      {
        label: "Réalisations",
        href: `${links.construction.base}/projets`,
        description: "Villas, sièges institutionnels et chantiers en cours.",
        external: true,
      },
      {
        label: "Demander un devis",
        href: links.construction.devis,
        description: "Estimation rapide, cadrage du budget et lancement du projet.",
        external: true,
      },
      {
        label: "Espace client",
        href: `${links.construction.base}/espace-client`,
        description: "Suivi d'avancement, documents et points chantier.",
        external: true,
      },
    ],
  },
  {
    label: "Assistance",
    href: "https://sicaassistance.ci",
    external: true,
    tagline: "Créer, gérer et sécuriser votre activité",
    children: [
      {
        label: "Accueil Assistance",
        href: "https://sicaassistance.ci",
        description: "Création, comptabilité, juridique et conseil PME.",
        external: true,
      },
      {
        label: "Création d'entreprise",
        href: "https://sicaassistance.ci/creation-entreprise",
        description: "Constitution légale, RCCM et formalités administratives.",
        external: true,
      },
      {
        label: "Comptabilité & fiscalité",
        href: "https://sicaassistance.ci/comptabilite",
        description: "Tenue comptable, déclarations fiscales et sociales.",
        external: true,
      },
      {
        label: "Juridique",
        href: "https://sicaassistance.ci/juridique",
        description: "Suivi administratif et sécurisation des actes.",
        external: true,
      },
      {
        label: "Conseil en gestion",
        href: "https://sicaassistance.ci/conseil",
        description: "Structuration, pilotage et accompagnement des dirigeants.",
        external: true,
      },
      {
        label: "Espace client",
        href: "https://sicaassistance.ci/espace-client",
        description: "Suivi dossier, pièces attendues et factures.",
        external: true,
      },
    ],
  },
  {
    label: "Actualités",
    href: "/actualites",
    tagline: "Informations récentes du Groupe et des pôles",
  },
];

/* ════════════════════════════════════════════════════════════════════════
   TOP-NAV — version Groupe SICA
   Le top-nav du site Groupe NE contient PAS "Groupe SICA" — on y est déjà.
   Pour les autres sites (Construction / Assistance), utiliser le helper
   `getTopNav("construction" | "assistance")` exporté par @sica/ui.
═══════════════════════════════════════════════════════════════════════ */

/* Délégué à getTopNav pour rester synchronisé avec le shared package */
export const topNav = getTopNav("groupe", {
  constructionUrl: links.construction.base,
  assistanceUrl: links.assistance.base,
  groupeUrl: links.groupe.base,
  landingUrl: links.landing.base,
});
