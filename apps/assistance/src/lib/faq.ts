export interface FaqItem {
  q: string;
  a: string;
}

/*
  FAQ administrative — réponses prudentes, sans chiffre inventé. Les délais
  précis renvoient vers un échange, car ils dépendent du dossier réel.
*/
export const ASSISTANCE_FAQ: FaqItem[] = [
  {
    q: "Combien de temps faut-il pour créer une entreprise ?",
    a: "Le délai dépend de la forme juridique choisie et de la complétude de votre dossier. Nous vous donnons une estimation précise dès le premier échange, puis nous tenons les échéances.",
  },
  {
    q: "Quels documents préparer pour une création ?",
    a: "En général, une pièce d'identité du dirigeant, un justificatif pour l'adresse du siège, l'intitulé de l'activité et la répartition du capital. Nous vous remettons la liste exacte selon votre cas.",
  },
  {
    q: "Travaillez-vous avec les petites structures ?",
    a: "Oui. Nous accompagnons aussi bien les entrepreneurs individuels que les PME et les associations. Chaque service est mobilisable seul ou dans un accompagnement complet.",
  },
  {
    q: "Intervenez-vous en dehors d'Abidjan ?",
    a: "Notre siège est à Abidjan et notre succursale à Yamoussoukro. Nous accompagnons nos clients partout en Côte d'Ivoire.",
  },
  {
    q: "Comment se passe le suivi de mon dossier ?",
    a: "Vous avez un interlocuteur dédié, des points réguliers et vos pièces centralisées. Vous savez à tout moment où en est votre démarche.",
  },
  {
    q: "Puis-je vous confier seulement ma comptabilité ?",
    a: "Oui. Vous pouvez nous confier un seul service, par exemple la comptabilité ou les déclarations, sans souscrire à l'ensemble de l'accompagnement.",
  },
];
