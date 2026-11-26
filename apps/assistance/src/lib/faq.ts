export interface FaqItem {
  q: string;
  a: string;
}

/*
  FAQ — réponses tirées du document « Info à compléter site web » (nov. 2026).
  Aucun délai, prix ou chiffre qui ne figure pas dans ce document.
*/
export const ASSISTANCE_FAQ: FaqItem[] = [
  {
    q: "En combien de temps mon entreprise peut-elle être créée ?",
    a: "SICA ASSISTANCE gère l'ensemble des formalités administratives pour formaliser légalement votre activité sous 30 jours, une fois votre dossier complet.",
  },
  {
    q: "Quelles pièces dois-je fournir pour une création ?",
    a: "Raison sociale et activités, pièce d'identité et extrait de naissance de chaque associé, casier judiciaire de moins de 3 mois de chaque dirigeant, répartition des parts, informations sur le siège social (avec facture SODECI / CIE), banque, capital, chiffre d'affaires prévisionnel et coordonnées du bailleur.",
  },
  {
    q: "Qui rédige les statuts et les actes de la société ?",
    a: "Les actes juridiques sont rédigés soit par notre notaire agréé, soit sous seing privé : statuts, DSNV ou DSV, contrat de bail, PV, règlement intérieur et autres actes de la société.",
  },
  {
    q: "Quelle forme juridique choisir ?",
    a: "Cela dépend du nombre d'associés, du capital et de la responsabilité souhaitée : EI pour une activité en nom propre, SARL ou SARLU pour la majorité des PME, SA pour les grands projets, SAS ou SASU pour plus de souplesse, SCI pour l'immobilier. Un conseiller vous aide à trancher.",
  },
  {
    q: "Pouvez-vous modifier une société existante ?",
    a: "Oui : changement de gérant, transfert de siège, modification du capital, changement de forme juridique ou de dénomination, extension de l'objet social.",
  },
  {
    q: "Puis-je vous confier uniquement ma comptabilité ou mes déclarations ?",
    a: "Oui. Le cabinet propose un contrat de suivi comptable et fiscal pour vos déclarations mensuelles, ainsi que la tenue de comptabilité, les états financiers, la paie et les déclarations CNPS.",
  },
  {
    q: "Où se trouvent vos bureaux ?",
    a: "À Abidjan (Cocody Centre / PMI) et à Yamoussoukro (Morofé / 24 Ampoules). Vous pouvez nous joindre au (+225) 07 09 88 32 93 ou au (+225) 27 22 24 74 45.",
  },
];
