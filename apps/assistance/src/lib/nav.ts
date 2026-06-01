import { getTopNav, type NavItem } from "@sica/ui";
import { links } from "@/lib/links";

/* Navigation interne SICA Assistance — V1 landing : ancres de la page. */
export const assistanceNav: NavItem[] = [
  {
    label: "Accueil",
    href: "/#hero",
    tagline: "Le pôle administratif et conseil du Groupe SICA",
    children: [
      {
        label: "Notre approche",
        href: "/#process",
        description: "Le parcours d'accompagnement, de la prise de contact au suivi.",
      },
      {
        label: "Pour qui",
        href: "/#segments",
        description: "Entrepreneurs, PME, associations et professions libérales.",
      },
    ],
  },
  {
    label: "Services",
    href: "/#services",
    tagline: "Création, comptabilité, fiscalité, conseil",
    children: [
      {
        label: "Création d'entreprise",
        href: "/#services",
        description: "Forme juridique, statuts, immatriculation RCCM.",
      },
      {
        label: "Comptabilité et fiscalité",
        href: "/#services",
        description: "Tenue comptable, états financiers, déclarations.",
      },
      {
        label: "Conseil et suivi",
        href: "/#services",
        description: "Gestion, suivi administratif, accompagnement.",
      },
    ],
  },
  {
    label: "Simulateur",
    href: "/#simulateur",
    tagline: "Estimez votre création d'entreprise",
  },
  {
    label: "Ressources",
    href: "/#ressources",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export const assistanceTopNav = getTopNav("assistance", {
  constructionUrl: links.construction.base,
  groupeUrl: links.groupe.base,
  assistanceUrl: links.assistance.base,
  landingUrl: links.landing.base,
});
