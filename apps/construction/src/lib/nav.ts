import { getTopNav, type NavItem } from "@sica/ui";
import { links } from "@/lib/links";

export const constructionNav: NavItem[] = [
  {
    label: "Accueil",
    href: "/",
    tagline: "Vision chantier et execution",
    children: [
      {
        label: "Hero chantier",
        href: "/#hero",
        description: "Positionnement SICA Construction et lancement rapide du devis.",
      },
      {
        label: "Chiffres cle",
        href: "/#preuves",
        description: "Indicateurs de capacite, disponibilite et pilotage.",
      },
      {
        label: "Equipe projet",
        href: "/#equipe",
        description: "Direction chantier et organisation terrain.",
      },
    ],
  },
  {
    label: "Expertises",
    href: "/#expertises",
    tagline: "Etudes, execution, controle qualite",
    children: [
      {
        label: "Etudes & preconisations",
        href: "/#expertises",
        description: "Etude de sol, metres, planification des lots et methode.",
      },
      {
        label: "Geobeton & structure",
        href: "/#expertises",
        description: "Systeme constructif et adaptation aux contraintes terrain.",
      },
      {
        label: "Process chantier",
        href: "/#process",
        description: "Parcours de 01 Diagnostic a 05 Livraison.",
      },
    ],
  },
  {
    label: "Projets A-Z",
    href: "/#projets-az",
    tagline: "Portefeuille complet et panel detaille",
    children: [
      {
        label: "Vue A-Z",
        href: "/#projets-az",
        description: "Classement alphabetique des operations avec statuts.",
      },
      {
        label: "Realisations",
        href: "/realisations",
        description: "Galerie projet par projet avec visuels de reference.",
      },
    ],
  },
  {
    label: "Devis",
    href: "/devis",
    tagline: "Pre-cadrage budgetaire et lancement projet",
    children: [
      {
        label: "Demande de devis",
        href: "/devis",
        description: "Parametrer besoin, surface, localite et urgence.",
      },
      {
        label: "Parler a un expert",
        href: "tel:+2250709883293",
        description: "Echange direct avec un responsable chantier.",
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

