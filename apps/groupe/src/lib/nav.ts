import { type NavItem } from "@sica/ui";
import { links } from "@/lib/links";

/* ════════════════════════════════════════════════════════════════════════
   NAVIGATION GROUPE SICA — Source : docs/CONTEXTE.md §2 et §8
   ────────────────────────────────────────────────────────────────────────
   RÈGLES STRICTES (à respecter pour éviter les doublons) :

   1. SICA possède EXACTEMENT 2 pôles : Construction & Assistance.
   2. Sur le site Groupe, la navbar liste : Corporate, Construction (externe),
      Assistance (externe), Actualités (interne).

   2. Sur le site Groupe (groupe-sica.com), la navbar liste :
      - Le Groupe (pages institutionnelles internes)
      - Construction (lien externe vers sicaconstruction.com + preview menu)
      - Assistance (lien externe vers sicaassistance.com + preview menu)
      - Actualités (blog SEO interne)

   3. Le top-nav (haut de page) est ADAPTATIF — voir packages/ui/lib/top-nav.ts.
      Sur Groupe SICA → on n'affiche PAS "Groupe SICA" (on y est déjà).
═══════════════════════════════════════════════════════════════════════ */

type Translator = (key: string) => string;

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
        href: links.espace.base,
        description: "Suivi d'avancement, documents et points chantier.",
        external: true,
      },
    ],
  },
  {
    label: "Assistance",
    href: "https://www.sicaassistance.com",
    external: true,
    tagline: "Créer, gérer et sécuriser votre activité",
    children: [
      {
        label: "Accueil Assistance",
        href: "https://www.sicaassistance.com",
        description: "Création, comptabilité, juridique et conseil PME.",
        external: true,
      },
      {
        label: "Création d'entreprise",
        href: "https://www.sicaassistance.com/creation-entreprise",
        description: "Constitution légale, RCCM et formalités administratives.",
        external: true,
      },
      {
        label: "Comptabilité & fiscalité",
        href: "https://www.sicaassistance.com/comptabilite",
        description: "Tenue comptable, déclarations fiscales et sociales.",
        external: true,
      },
      {
        label: "Juridique",
        href: "https://www.sicaassistance.com/juridique",
        description: "Suivi administratif et sécurisation des actes.",
        external: true,
      },
      {
        label: "Conseil en gestion",
        href: "https://www.sicaassistance.com/conseil",
        description: "Structuration, pilotage et accompagnement des dirigeants.",
        external: true,
      },
      {
        label: "Espace client",
        href: links.espace.base,
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

  return [
    {
      label: t("corporate.label"),
      href: loc("/a-propos"),
      tagline: t("corporate.tagline"),
      children: [
        {
          label: t("corporate.about"),
          href: loc("/a-propos"),
          description: t("corporate.aboutDesc"),
        },
        {
          label: t("corporate.news"),
          href: loc("/actualites"),
          description: t("corporate.newsDesc"),
        },
        {
          label: t("corporate.careers"),
          href: loc("/carrieres"),
          description: t("corporate.careersDesc"),
        },
        {
          label: t("corporate.awards"),
          href: loc("/prix-recompenses"),
          description: t("corporate.awardsDesc"),
        },
        {
          label: t("corporate.partners"),
          href: loc("/partenaires"),
          description: t("corporate.partnersDesc"),
        },
        {
          label: t("corporate.contact"),
          href: loc("/contact"),
          description: t("corporate.contactDesc"),
        },
      ],
    },
    {
      label: t("construction.label"),
      href: links.construction.base,
      external: true,
      tagline: t("construction.tagline"),
      children: [
        {
          label: t("construction.home"),
          href: links.construction.base,
          description: t("construction.homeDesc"),
          external: true,
        },
        {
          label: t("construction.services"),
          href: `${links.construction.base}/services`,
          description: t("construction.servicesDesc"),
          external: true,
        },
        {
          label: t("construction.geobeton"),
          href: `${links.construction.base}/services/geobeton`,
          description: t("construction.geobetonDesc"),
          external: true,
        },
        {
          label: t("construction.soil"),
          href: `${links.construction.base}/services/etudes-sol`,
          description: t("construction.soilDesc"),
          external: true,
        },
        {
          label: t("construction.projects"),
          href: `${links.construction.base}/projets`,
          description: t("construction.projectsDesc"),
          external: true,
        },
        {
          label: t("construction.quote"),
          href: links.construction.devis,
          description: t("construction.quoteDesc"),
          external: true,
        },
        {
          label: t("construction.client"),
          href: links.espace.base,
          description: t("construction.clientDesc"),
          external: true,
        },
      ],
    },
    {
      label: t("assistance.label"),
      href: links.assistance.base,
      external: true,
      tagline: t("assistance.tagline"),
      children: [
        {
          label: t("assistance.home"),
          href: links.assistance.base,
          description: t("assistance.homeDesc"),
          external: true,
        },
        {
          label: t("assistance.creation"),
          href: `${links.assistance.base}/services/creation-et-modification-entreprise`,
          description: t("assistance.creationDesc"),
          external: true,
        },
        {
          label: t("assistance.accounting"),
          href: `${links.assistance.base}/services/gestion-comptable-fiscale-sociale`,
          description: t("assistance.accountingDesc"),
          external: true,
        },
        {
          label: t("assistance.legal"),
          href: `${links.assistance.base}/services#juridique`,
          description: t("assistance.legalDesc"),
          external: true,
        },
        {
          label: t("assistance.advice"),
          href: `${links.assistance.base}/services#conseil`,
          description: t("assistance.adviceDesc"),
          external: true,
        },
        {
          label: t("assistance.client"),
          href: links.espace.base,
          description: t("assistance.clientDesc"),
          external: true,
        },
      ],
    },
    {
      label: t("news.label"),
      href: loc("/actualites"),
      tagline: t("news.tagline"),
    },
  ];
}
