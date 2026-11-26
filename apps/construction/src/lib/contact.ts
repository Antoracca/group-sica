/* Coordonnées officielles — uniformes sur toutes les pages
   (document « 12 améliorations » du 17/11/2026 et courrier du 11/11/2026). */

export const CONTACT = {
  societe: "GROUPE SICA – SARLU",
  marque: "SICA CONSTRUCTION",
  signature: "L'exigence technique au service de vos constructions.",
  devise: "ÉTUDIER • CONCEVOIR • CONSTRUIRE",
  email: "groupesica@gmail.com",
  telephones: [
    { label: "(+225) 07 09 88 32 93", href: "tel:+2250709883293" },
    { label: "(+225) 27 22 24 74 45", href: "tel:+2252722247445" },
    { label: "(+225) 01 02 44 28 94", href: "tel:+2250102442894" },
  ],
  rccm: "CI-ABJ-03-2020-B13-17592",
  cc: "2054314X",
  cnps: "378047",
} as const;

export const AGENCES = [
  {
    id: "abidjan",
    ville: "Abidjan",
    nom: "Agence d'Abidjan",
    adresse: "Cocody Centre / PMI, Abidjan",
    recherche: "Cocody Centre PMI, Abidjan, Côte d'Ivoire",
  },
  {
    id: "yamoussoukro",
    ville: "Yamoussoukro",
    nom: "Bureau de Yamoussoukro",
    adresse: "Morofé / 24 Ampoules, Yamoussoukro",
    recherche: "Morofé 24 Ampoules, Yamoussoukro, Côte d'Ivoire",
  },
] as const;
