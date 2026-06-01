import { getTopNav, type NavItem } from "@sica/ui";
import { links } from "@/lib/links";

export const constructionNav: NavItem[] = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "Expertises",
    href: "/#expertises",
    tagline: "Nos domaines d'intervention",
    children: [
      {
        label: "Découvrir la méthode",
        href: "/#etudes",
        description: "Études et préconisations avant projet.",
      },
      {
        label: "Les normes appliquées",
        href: "/#structure",
        description: "Géobéton, structure et respect des normes.",
      },
      {
        label: "Comprendre le pilotage",
        href: "/#pilotage",
        description: "Ordonnancement, pilotage et coordination.",
      },
      {
        label: "Explorer nos outils",
        href: "/#metriques",
        description: "Contrôle des métriques et tableaux de bord.",
      },
      {
        label: "La charte qualité",
        href: "/#livraison",
        description: "Sécurité, OPR et livraison.",
      },
    ],
  },
  {
    label: "Projets de A à Z",
    href: "/#projets-az",
  },
  {
    label: "Réalisations",
    href: "/realisations",
  },
  {
    label: "Devis",
    href: "/devis",
    tagline: "Pré-cadrage et chiffrage",
    children: [
      {
        label: "Demander un devis",
        href: "/devis",
        description: "Accéder au simulateur en ligne.",
      },
      {
        label: "Parler à un expert",
        href: "tel:+2250709883293",
        description: "Échange direct avec un responsable.",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const constructionTopNav = getTopNav("construction", {
  constructionUrl: links.construction.base,
  groupeUrl: links.groupe.base,
  assistanceUrl: links.assistance.base,
  landingUrl: links.landing.base,
});

