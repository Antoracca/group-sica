/*
  Contenus SICA ASSISTANCE — repris fidèlement du document du DG
  « Info à compléter site web » (docs/Info à completer site web.pdf, nov. 2026).
  Ne rien ajouter ici qui ne figure pas dans ce document ou dans INSTRUCTIONS.md §2.
*/

export const PROMESSE =
  "SICA ASSISTANCE gère l'ensemble des formalités administratives pour formaliser légalement votre activité sous 30 jours.";

/* ---------- 1. Création ---------- */

export const CREATION_DEFINITION =
  "La création de société est l'acte juridique et administratif par lequel une ou plusieurs personnes (physiques ou morales) donnent naissance à une personne morale distincte, appelée entreprise ou société.";

export const CREATION_BUTS = [
  {
    titre: "Personnalité juridique",
    texte:
      "La société possède son propre nom (raison sociale), son propre patrimoine (argent et biens) et sa propre adresse (siège social).",
  },
  {
    titre: "Séparation des patrimoines",
    texte:
      "Elle protège les biens personnels des fondateurs en cas de dettes de l'entreprise (selon la forme juridique choisie).",
  },
  {
    titre: "Capacité à agir",
    texte:
      "La société peut signer des contrats, embaucher des salariés, posséder des biens ou aller en justice en son nom propre.",
  },
] as const;

export const PIECES_A_FOURNIR = [
  "Raison sociale, nom commercial, sigle et enseigne de la société",
  "Liste de l'ensemble des activités",
  "Pièce d'identité de chaque associé",
  "Extrait de naissance de chaque associé",
  "Casier judiciaire (moins de 3 mois) de chaque dirigeant",
  "Répartition des 100 parts sociales entre associés",
  "Siège social : ville, commune, quartier, lieu de référence, n° de lot / îlot du local, facture SODECI / CIE",
  "Nom de la banque choisie, capital social, boîte postale, téléphone, e-mail",
  "Chiffre d'affaires prévisionnel annuel",
  "Nom, prénoms et téléphone du bailleur",
] as const;

export type Etape = { titre: string; texte: string };

export const ETAPES_FORMALITES: Etape[] = [
  {
    titre: "Recueil des pièces et informations",
    texte: "Nous rassemblons avec vous les pièces et les informations à fournir pour votre dossier.",
  },
  {
    titre: "Rédaction des actes juridiques",
    texte:
      "Par notre notaire agréé ou sous seing privé : statuts, DSNV ou DSV, contrat de bail, PV, règlement intérieur, actes de la société.",
  },
  {
    titre: "Enregistrement des actes à la DGI",
    texte: "Statuts, DSNV ou DSV, contrat de bail, PV, règlement intérieur, actes de la société.",
  },
  {
    titre: "Immatriculations",
    texte:
      "Registre du Commerce et du Crédit Mobilier (RCCM), procès-verbal (PV) de dépôt, Certificat d'Identifiant Unique (IDU) CEPICI, annexe CEPICI, avis de constitution CEPICI ou publication au journal.",
  },
  {
    titre: "Rattachement au centre des impôts",
    texte:
      "Du siège social et/ou de la succursale : visite du local par un agent du cadastre, plan cadastral, rapport de localisation, déclaration fiscale d'existence en deux copies signées et cachetées, rattachement du numéro de compte contribuable pour l'obtention de la DFE légale, activation de la plateforme e-Impôts.",
  },
  {
    titre: "Rattachement au centre de la CNPS",
    texte:
      "Du siège social et/ou de la succursale : visite du local par un agent de géolocalisation, dépôt de chaque copie des documents légaux de la société, formulaires employeur et travailleurs signés et cachetés, rattachement du numéro CNPS légal, activation de la plateforme e-CNPS, déclaration minimum de deux salariés.",
  },
];

export const SUITE_FORMALITES =
  "À l'issue des rattachements, nous vous proposons un contrat de suivi comptable et fiscal pour la gestion de vos déclarations mensuelles.";

/* ---------- Modification ---------- */

export const MODIFICATION_DEFINITION =
  "La modification de société est l'acte juridique et administratif par lequel une entreprise change l'une des caractéristiques de son identité ou de son fonctionnement inscrit dans ses statuts d'origine.";

export const MODIFICATION_BUTS = [
  {
    titre: "Mise à jour légale",
    texte:
      "Adapter les statuts à l'évolution réelle de l'entreprise (croissance, nouveaux associés, déménagement).",
  },
  {
    titre: "Information des tiers",
    texte:
      "Informer légalement l'État (impôts, greffe), les banques et les partenaires des changements internes.",
  },
  {
    titre: "Maintien de la conformité",
    texte:
      "Éviter les sanctions juridiques ou fiscales en cas de décalage entre la réalité et les documents officiels.",
  },
] as const;

export const MODIFICATION_MOTIFS = [
  { titre: "Changement de gérant / dirigeant", texte: "Nomination d'un nouveau directeur ou départ d'un administrateur." },
  { titre: "Transfert de siège social", texte: "Déménagement de l'adresse officielle de l'entreprise dans une autre commune ou ville." },
  { titre: "Modification du capital social", texte: "Augmentation (entrée de nouveaux investisseurs) ou réduction du capital." },
  { titre: "Changement de forme juridique", texte: "Transformation de la structure (par exemple, passer d'une SARL à une SAS)." },
  { titre: "Changement de dénomination", texte: "Modification du nom commercial ou de la raison sociale de l'entreprise." },
  { titre: "Extension de l'objet social", texte: "Ajout de nouvelles activités commerciales ou professionnelles." },
] as const;

/* ---------- Formes juridiques ---------- */

export const FORMES_INTRO =
  "En Côte d'Ivoire, les formes juridiques sont régies par l'espace OHADA. Les choix les plus courants comprennent l'Entreprise Individuelle (EI) pour les activités en nom propre, la SARL (et SARLU) pour les PME, la SA pour les grands projets, et la SAS (ou SASU) offrant une grande flexibilité.";

export type Forme = {
  sigle: string;
  nom: string;
  associes: string;
  capital: string;
  responsabilite: string;
  ideal: string;
};

export const FORMES: Forme[] = [
  {
    sigle: "EI",
    nom: "Entreprise Individuelle",
    associes: "1 personne physique.",
    capital: "Aucun.",
    responsabilite: "Illimitée (le patrimoine personnel de l'entrepreneur est engagé).",
    ideal: "Les petits commerces, artisans et consultants indépendants.",
  },
  {
    sigle: "SARL",
    nom: "Société à Responsabilité Limitée",
    associes: "De 1 à 100 personnes (version unipersonnelle : SARLU).",
    capital: "100 000 FCFA.",
    responsabilite: "Limitée aux apports.",
    ideal: "La majorité des PME et des projets commerciaux classiques.",
  },
  {
    sigle: "SA",
    nom: "Société Anonyme",
    associes: "Minimum 1 (SA unipersonnelle) ou 2 (ou plus selon le type).",
    capital: "10 000 000 FCFA.",
    responsabilite: "Limitée aux apports.",
    ideal: "Les très grandes entreprises, les banques ou les projets nécessitant d'importants financements.",
  },
  {
    sigle: "SAS",
    nom: "Société par Actions Simplifiée",
    associes: "1 ou plusieurs (version unipersonnelle : SASU).",
    capital: "Aucun.",
    responsabilite: "Limitée aux apports.",
    ideal: "Les startups, l'innovation et les entreprises ayant besoin d'une grande souplesse statutaire ou de lever des fonds.",
  },
  {
    sigle: "SCI",
    nom: "Société Civile Immobilière",
    associes: "Au moins 2 associés (personnes physiques ou morales).",
    capital: "Aucun.",
    responsabilite: "Indéfinie, non solidaire et subsidiaire.",
    ideal: "L'achat immobilier à plusieurs, la transmission de patrimoine, éviter l'indivision classique.",
  },
];

export const AUTRES_FORMES = [
  {
    sigle: "SNC",
    nom: "Société en Nom Collectif",
    texte: "Tous les associés sont commerçants et répondent indéfiniment et solidairement des dettes sociales.",
  },
  {
    sigle: "SCS",
    nom: "Société en Commandite Simple",
    texte:
      "Divisée entre associés commandités (responsables indéfiniment) et commanditaires (responsables à hauteur de leurs apports).",
  },
] as const;

/* ---------- 2. Gestion comptable, fiscale et sociale ---------- */

export const GESTION_INTRO =
  "La gestion d'une entreprise en Côte d'Ivoire repose sur le triptyque Comptabilité (normes SYSCOHADA), Fiscalité (Direction Générale des Impôts - DGI) et Social (CNPS et Inspection du Travail).";

export type Volet = {
  id: string;
  titre: string;
  intro: string;
  activites: { titre: string; texte: string }[];
  caracteristiques: { titre: string; texte: string }[];
};

export const GESTION_VOLETS: Volet[] = [
  {
    id: "comptable",
    titre: "La gestion comptable",
    intro:
      "La comptabilité ivoirienne traduit la vie de l'entreprise en chiffres selon le référentiel comptable révisé de l'espace OHADA.",
    activites: [
      { titre: "Saisie chronologique", texte: "Enregistrement quotidien des pièces (achats, ventes, banques, caisse)." },
      { titre: "Rapprochement bancaire", texte: "Pointage régulier des comptes banques avec les extraits bancaires." },
      { titre: "Gestion des immobilisations", texte: "Suivi des investissements et calcul des amortissements annuels." },
      { titre: "Inventaire annuel", texte: "Comptage physique obligatoire des stocks en fin d'exercice." },
      { titre: "Clôture des comptes", texte: "Production des états financiers (bilan, compte de résultat, TFT, notes annexes)." },
    ],
    caracteristiques: [
      { titre: "Référentiel unique", texte: "Application stricte du SYSCOHADA révisé." },
      {
        titre: "Deux systèmes de présentation",
        texte:
          "Le Système Normal (obligatoire pour les grandes entreprises) et le Système Minimal de Trésorerie / SMT (pour les petites structures).",
      },
      { titre: "Périodicité", texte: "Exercice comptable calqué sur l'année civile (du 1er janvier au 31 décembre)." },
      {
        titre: "Force probante",
        texte: "La comptabilité doit être régulière et sincère pour servir de preuve en justice ou face au fisc.",
      },
    ],
  },
  {
    id: "fiscale",
    titre: "La gestion fiscale",
    intro:
      "Elle consiste à calculer, déclarer et reverser les impôts dus par l'entreprise en fonction de son régime d'imposition.",
    activites: [
      {
        titre: "Déclarations mensuelles",
        texte:
          "Télé-déclaration (via e-Impôts) de la TVA, de la TSE, des taxes sur les salaires (ITS), des taxes FDFP et des retenues à la source.",
      },
      {
        titre: "Acomptes provisionnels",
        texte: "Paiement fractionné de l'Impôt sur les Sociétés (IS) ou de l'impôt BIC au cours de l'année.",
      },
      {
        titre: "Dépôt de la liasse fiscale",
        texte: "Transmission des états financiers certifiés à la DGI (généralement avant le 30 avril ou le 30 mai).",
      },
      {
        titre: "Suivi de la contribution des patentes",
        texte: "Déclaration annuelle de la contribution des patentes et licences.",
      },
    ],
    caracteristiques: [
      {
        titre: "Régimes fiscaux segmentés",
        texte:
          "Ils dépendent du chiffre d'affaires annuel : régime de l'Entreprenant, Régime Micro-Entreprise (RME), Régime Simplifié d'Imposition (RSI), Régime Réel Normal (RRN).",
      },
      {
        titre: "Digitalisation obligatoire",
        texte: "Utilisation de la plateforme e-Impôts pour les déclarations et les paiements.",
      },
      {
        titre: "Évolution annuelle",
        texte: "Les règles fiscales changent chaque année avec la publication de la nouvelle Annexe Fiscale (janvier).",
      },
    ],
  },
  {
    id: "sociale",
    titre: "La gestion sociale",
    intro:
      "Elle englobe la gestion administrative du personnel, le respect du Code du Travail ivoirien et les relations avec les organismes sociaux.",
    activites: [
      {
        titre: "Gestion des contrats",
        texte: "Rédaction des contrats de travail (CDD, CDI, stage) et déclaration d'embauche à la CNPS.",
      },
      {
        titre: "Traitement de la paie",
        texte: "Calcul des salaires, édition des bulletins de paie et tenue du livre de paie.",
      },
      {
        titre: "Déclarations sociales",
        texte: "Télé-déclaration mensuelle ou trimestrielle des cotisations à la CNPS.",
      },
      {
        titre: "Suivi de la médecine du travail",
        texte: "Organisation des visites médicales d'embauche et annuelles.",
      },
      {
        titre: "Gestion des fins de contrat",
        texte:
          "Calcul des indemnités de licenciement, de fin de contrat, et édition du certificat de travail.",
      },
    ],
    caracteristiques: [
      {
        titre: "Textes de référence",
        texte: "Encadrée par le Code du Travail ivoirien et la Convention Collective Interprofessionnelle.",
      },
      {
        titre: "Organisme pivot",
        texte:
          "La CNPS (Caisse Nationale de Prévoyance Sociale) gère les cotisations pour la retraite, les accidents du travail et les prestations familiales.",
      },
      {
        titre: "Taux de charges sociales",
        texte: "Environ 12 % à 14 % à la charge de l'employeur et 6,6 % à la charge du salarié.",
      },
      { titre: "Digitalisation", texte: "Déclarations obligatoires en ligne via le portail e-CNPS." },
    ],
  },
];

export const PRESTATIONS_CABINET = [
  {
    titre: "Tenue de comptabilité",
    texte: "Enregistrement de vos pièces comptables et saisie des opérations financières courantes.",
  },
  {
    titre: "États financiers",
    texte: "Élaboration de vos bilans de fin d'année conformes aux normes comptables en vigueur (SYSCOHADA).",
  },
  {
    titre: "Facture Normalisée Électronique (FNE)",
    texte:
      "Réforme de la DGI visant à moderniser l'économie ivoirienne, sécuriser les transactions et lutter contre la fraude (code QR).",
  },
  {
    titre: "Business plan",
    texte:
      "Rédaction et structuration de plans d'affaires complets pour vos demandes de financement ou levées de fonds.",
  },
  {
    titre: "Accompagnement entrepreneurial",
    texte:
      "Conseils personnalisés sur la gestion d'entreprise, la stratégie de développement et la gestion des risques juridiques.",
  },
] as const;

/* ---------- 3. Impôts et taxes ---------- */

export const IMPOTS_PARTICULIERS = [
  { sigle: "ITS", titre: "Impôt sur le Traitement et Salaire", texte: "Calculé selon un barème progressif." },
  { sigle: "CN", titre: "Contribution Nationale", texte: "Taxe prélevée pour l'effort de développement du pays." },
  {
    sigle: "IGR",
    titre: "Impôt Général sur le Revenu",
    texte: "Également progressif, calculé en fonction du revenu global et des charges familiales.",
  },
] as const;

export const IMPOTS_ENTREPRISES = [
  {
    sigle: "IS",
    valeur: "25 %",
    titre: "Impôt sur les Sociétés",
    texte: "Taux de droit commun de 25 % sur les bénéfices réalisés (pour les régimes du réel).",
  },
  {
    sigle: "IMF",
    valeur: "CA N-1",
    titre: "Impôt Minimum Forfaitaire",
    texte: "Pour les entreprises au réel, calculé sur le chiffre d'affaires de l'exercice précédent.",
  },
  { sigle: "TVA", valeur: "18 %", titre: "Taxe sur la Valeur Ajoutée", texte: "Taux normal de 18 %." },
] as const;

export type Regime = {
  sigle: string;
  nom: string;
  cible: string;
  seuil: string;
  points: { titre: string; texte: string }[];
};

export const REGIMES: Regime[] = [
  {
    sigle: "TEE",
    nom: "Taxe d'État de l'Entreprenant",
    cible: "Les très petites entreprises (TPE) et les commerçants indépendants en phase de lancement.",
    seuil:
      "CA annuel TTC compris entre 5 000 001 et 50 000 000 FCFA. En dessous de 5 millions FCFA, l'entreprise relève de la Taxe Communale de l'Entreprenant (TCE).",
    points: [
      {
        titre: "Taux",
        texte:
          "4 % pour le commerce, le négoce et la revente ; 5 % pour les prestations de services, l'artisanat et les activités industrielles. Réduction de 50 % (2 % et 2,5 %) en cas d'adhésion à un Centre de Gestion Agréé (CGA).",
      },
      { titre: "Caractère libératoire", texte: "Le paiement de la TEE exonère de l'IS, de la patente et de la TVA." },
      {
        titre: "Obligations comptables",
        texte:
          "Dispense de bilan complet : seule la tenue de deux registres chronologiques (achats/dépenses et ventes/prestations) selon le SMT du SYSCOHADA est requise.",
      },
      { titre: "TVA", texte: "L'entreprise ne facture pas la TVA et ne peut pas la récupérer sur ses achats." },
    ],
  },
  {
    sigle: "RME",
    nom: "Régime des Microentreprises",
    cible: "Les structures de taille intermédiaire, situées juste avant le Régime Simplifié d'Imposition.",
    seuil: "CA annuel TTC compris entre 50 000 001 et 200 000 000 FCFA.",
    points: [
      {
        titre: "Taux",
        texte:
          "Taux unique de 7 % sur le CA annuel TTC, abaissé à 5 % (ou 6 % selon l'encadrement technique) pour les adhérents d'un CGA ou les entreprises suivies par un expert-comptable conventionné par la DGI.",
      },
      {
        titre: "Paiement fractionné",
        texte: "Versement mensuel équivalent à un douzième (1/12) du montant total estimé.",
      },
      { titre: "Caractère libératoire", texte: "Cet impôt unique englobe et remplace l'impôt sur le bénéfice et la patente." },
      { titre: "TVA", texte: "Les entreprises au RME ne collectent pas la TVA." },
    ],
  },
  {
    sigle: "RSI",
    nom: "Régime Simplifié d'Imposition",
    cible: "Les moyennes entreprises, afin d'alléger leurs formalités administratives.",
    seuil: "CA annuel TTC compris entre 50 millions et 200 millions FCFA.",
    points: [
      { titre: "Comptabilité", texte: "Comptabilité allégée selon le Système Minimal de Trésorerie (SMT) du SYSCOHADA." },
      {
        titre: "Impôt sur les bénéfices",
        texte: "Impôt sur les Sociétés (IS) au taux de 25 % sur le bénéfice net (ou Impôt Minimum Forfaitaire).",
      },
      {
        titre: "TVA",
        texte: "Déclarations et paiements de la TVA (18 %) généralement trimestriels (sauf option pour le mensuel).",
      },
    ],
  },
  {
    sigle: "RNI",
    nom: "Régime du Réel Normal d'Imposition",
    cible: "Les grandes entreprises, avec les obligations comptables et fiscales les plus strictes.",
    seuil: "CA annuel TTC supérieur à 200 millions FCFA.",
    points: [
      {
        titre: "Comptabilité",
        texte: "Comptabilité complète selon le Système Normal du SYSCOHADA (bilan, compte de résultat, annexes).",
      },
      { titre: "Impôt sur les bénéfices", texte: "IS au taux de 25 % sur le bénéfice réel." },
      { titre: "TVA", texte: "Déclaration et paiement de la TVA obligatoirement mensuels." },
      {
        titre: "Suivi fiscal",
        texte:
          "Dépendance générale à la Direction des Grandes Entreprises (DGE) ou à la Direction des Moyennes Entreprises (DME) de la DGI.",
      },
    ],
  },
];

export const IMPOTS_LOCAUX = [
  { titre: "Impôt sur le patrimoine foncier", texte: "Payé par les propriétaires de biens immobiliers." },
  {
    titre: "Taxes communales et patentes",
    texte: "En fonction de la nature et de la localisation de votre activité professionnelle.",
  },
] as const;

export const COTISATIONS_CNPS = [
  { valeur: "7,7 %", titre: "Pension (retraite)", texte: "À la charge de l'employeur." },
  { valeur: "5,75 %", titre: "Allocations familiales", texte: "À la charge de l'employeur." },
  { valeur: "2 à 5 %", titre: "Accidents du travail", texte: "Taux variable selon la branche d'activité." },
] as const;

/* Repères du bandeau défilant — tous issus du document. */
export const REPERES = [
  "TVA · taux normal 18 %",
  "IS · 25 % sur les bénéfices",
  "TEE · 4 % commerce, 5 % services",
  "RME · taux unique 7 %",
  "SARL · capital minimum 100 000 FCFA",
  "SA · capital minimum 10 000 000 FCFA",
  "CNPS · pension 7,7 % employeur",
  "Allocations familiales · 5,75 %",
  "SYSCOHADA révisé",
  "Exercice du 1er janvier au 31 décembre",
] as const;

export const INTERLOCUTEURS = [
  "DGI · e-Impôts",
  "CEPICI",
  "Greffe · RCCM",
  "CNPS · e-CNPS",
  "Notaire agréé",
  "Cadastre",
] as const;
