import { type NavItem } from "@sica/ui";
import { links } from "@/lib/links";

/* ════════════════════════════════════════════════════════════════════════
   NAVIGATION GROUPE SICA — Source : docs/CONTEXTE.md §2 et §8
   ────────────────────────────────────────────────────────────────────────
   RÈGLES STRICTES (à respecter pour éviter les doublons) :

   1. SICA possède EXACTEMENT 2 pôles : Construction & Assistance.
   2. Sur le site Groupe, la navbar liste : Corporate, Construction (externe),
      Assistance (externe), Actualités (interne).

   Les libellés/descriptions sont traduits (namespace "Nav") et les liens
   INTERNES sont préfixés par la locale active. Construit dans GroupeHeader.
═══════════════════════════════════════════════════════════════════════ */

type Translator = (key: string) => string;

export function getMainNav(t: Translator, locale: string): NavItem[] {
  // Préfixe la locale sur les liens internes (les liens vers les autres sites
  // restent absolus).
  const loc = (path: string) => `/${locale}${path}`;

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
