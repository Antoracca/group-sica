import type { NavItem } from "@sica/ui";
import { links } from "@/lib/links";

export const mainNav: NavItem[] = [
  {
    label: "Corporate",
    href: "/groupe",
    children: [
      {
        label: "Le Groupe",
        href: "/groupe",
        description: "Histoire, vision, positionnement et promesse SICA.",
      },
      {
        label: "Gouvernance",
        href: "/groupe#equipe",
        description: "Direction, organisation et pilotage des activites.",
      },
      {
        label: "Valeurs",
        href: "/groupe#valeurs",
        description: "Exigence technique, transparence et delai maitrise.",
      },
      {
        label: "Partenaires",
        href: "/partenaires",
        description: "Ecosysteme d'acteurs techniques et institutionnels.",
      },
    ],
  },
  {
    label: "Construction",
    href: links.construction.base,
    external: true,
    children: [
      {
        label: "Accueil Construction",
        href: links.construction.base,
        description: "Presentation du pole, expertises et methodologie chantier.",
        external: true,
      },
      {
        label: "Demander un devis",
        href: links.construction.devis,
        description: "Estimation rapide, cadrage budget et lancement du projet.",
        external: true,
      },
      {
        label: "Nos realisations",
        href: `${links.construction.base}/realisations`,
        description: "Villas, sieges et projets livres ou en cours.",
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
    children: [
      {
        label: "Creation d'entreprise",
        href: "https://sicaassistance.ci",
        description: "Constitution legale, RCCM et formalites administratives.",
        external: true,
      },
      {
        label: "Conseil en gestion",
        href: "https://sicaassistance.ci",
        description: "Structuration, pilotage et accompagnement des dirigeants.",
        external: true,
      },
      {
        label: "Comptabilite",
        href: "https://sicaassistance.ci",
        description: "Tenue comptable, fiscalite et reporting financier.",
        external: true,
      },
      {
        label: "Nous contacter",
        href: "https://sicaassistance.ci/contact",
        description: "Parler avec un conseiller en moins de 24h.",
        external: true,
      },
    ],
  },
  {
    label: "Réalisations",
    href: "/realisations",
    children: [
      {
        label: "Toutes les realisations",
        href: "/realisations",
        description: "Vue complete des projets SICA Construction.",
      },
      {
        label: "Villas & residences",
        href: "/realisations#villas",
        description: "Habitations premium, duplex et villas familiales.",
      },
      {
        label: "Programmes institutionnels",
        href: "/realisations#institutionnels",
        description: "Sieges, batiments et chantiers a forte exigence.",
      },
      {
        label: "Etudes techniques",
        href: "/realisations#etudes",
        description: "Geotechnique, dimensionnement et preconisations.",
      },
    ],
  },
  {
    label: "Comptable",
    href: "https://sicaassistance.ci",
    external: true,
    children: [
      {
        label: "Tenue comptable",
        href: "https://sicaassistance.ci",
        description: "Saisie, bilan et fiabilisation de la comptabilite.",
        external: true,
      },
      {
        label: "Fiscalite",
        href: "https://sicaassistance.ci",
        description: "Declarations fiscales et optimisation conforme.",
        external: true,
      },
      {
        label: "Paie & social",
        href: "https://sicaassistance.ci",
        description: "Gestion de la paie et obligations sociales.",
        external: true,
      },
    ],
  },
  { label: "Actualités", href: "/actualites" },
  { label: "Carrières", href: "/carrieres" },
  { label: "Contact", href: "/contact" },
];
