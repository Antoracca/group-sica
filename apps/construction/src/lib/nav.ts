import { getTopNav, type NavItem } from "@sica/ui";
import { links } from "@/lib/links";

/* Menu imposé par le document « 12 améliorations » (17/11/2026), point 1. */
export const constructionNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous ?", href: "/qui-sommes-nous" },
  {
    label: "Nos expertises",
    href: "/expertises",
    tagline: "Trois domaines d'expertise",
    children: [
      { label: "A. Études & conception", href: "/expertises#etudes", description: "Étude de sol, structure, plans, métrés, devis." },
      { label: "B. Technique & réalisation", href: "/expertises#technique", description: "Villas, immeubles, gros et second œuvre, géobéton." },
      { label: "C. Suivi, contrôle & accompagnement", href: "/expertises#suivi", description: "Suivi de chantier, contrôle qualité, réception." },
    ],
  },
  { label: "Nos réalisations", href: "/realisations" },
  { label: "Nos services", href: "/solutions", tagline: "Solutions constructives" },
  { label: "Nos agences", href: "/agences" },
  { label: "Espace client E-SICA", href: links.espace.base },
  {
    label: "Contact / Devis",
    href: "/contact",
    tagline: "Demander un devis",
    children: [
      { label: "Demander un devis", href: "/devis", description: "Estimation indicative en ligne." },
      { label: "Devis à partir de plans", href: "/devis-auto", description: "Envoyez vos plans PDF." },
      { label: "Parler à un conseiller", href: "tel:+2250709883293", description: "(+225) 07 09 88 32 93" },
      { label: "Prendre rendez-vous", href: "/contact#rendez-vous", description: "Abidjan ou Yamoussoukro." },
    ],
  },
];

export const constructionTopNav = getTopNav("construction", {
  constructionUrl: links.construction.base,
  groupeUrl: links.groupe.base,
  assistanceUrl: links.assistance.base,
  landingUrl: links.landing.base,
});

