/* ════════════════════════════════════════════════════════════════════════
   ACTUALITÉS — données seed pour la V1
   ────────────────────────────────────────────────────────────────────────
   Source principale : Dossier Technique GROUPE SICA (déc. 2025).
   Aucune donnée inventée : chaque article est ancré dans un fait, un
   chiffre ou une activité documentée du Groupe.
   En production : remplacé par Supabase `blog_posts`.
═══════════════════════════════════════════════════════════════════════ */

export type ActualiteCategorie = "Construction" | "Assistance" | "Groupe" | "Communauté";

export interface Actualite {
  slug: string;
  titre: string;
  chapo: string;
  categorie: ActualiteCategorie;
  date: string;     /* ISO format YYYY-MM-DD */
  auteur: string;
  lecture: string;  /* "5 min" */
  contenu: string[]; /* paragraphes */
}

export const ACTUALITES: Actualite[] = [

  /* ════════════════════════════════════════════════════════════════════
     ARTICLES SYNCHRONISÉS AVEC LA HOMEPAGE (section News)
     Sourcés du Dossier Technique SICA, décembre 2025
  ═════════════════════════════════════════════════════════════════════ */

  {
    slug: "geobeton-btcs-materiau-signature",
    titre: "Géobéton BTCS : le matériau qui change la façon de construire en Côte d'Ivoire",
    chapo:
      "Brique de terre comprimée stabilisée. 90 % de terre tamisée, 10 % de ciment. Plus de 99 ans de durée de vie, zéro fissure après construction. Notre signature technique.",
    categorie: "Construction",
    date: "2025-12-10",
    auteur: "Pôle Construction SICA",
    lecture: "5 min",
    contenu: [
      "Le géobéton BTCS — Brique de Terre Comprimée Stabilisée — est devenu en quelques années la signature technique du Groupe SICA. À l'heure où le ciment est cher et où ses cours fluctuent, nous avons fait le choix d'un matériau composé à 90 % de terre tamisée et seulement 10 % de ciment. Une équation simple qui répond à une réalité économique ivoirienne.",
      "Au-delà de l'économie, la brique BTCS offre une combinaison rare d'avantages techniques : durée de vie supérieure à 99 ans, zéro fissure après construction, excellente régulation de la température intérieure, isolation thermique et phonique de très bon niveau, parfaite imperméabilité une fois posée. Autant de caractéristiques mesurées et tenues sur l'ensemble de nos chantiers.",
      "Le coût de construction reste sensiblement identique à celui de la brique agglo/parpaing, mais avec une réduction de 20 % sur le coût total des gros œuvres et une empreinte environnementale nettement plus faible. Pour le client final, c'est un investissement de long terme. Pour la Côte d'Ivoire, c'est une réponse industrielle adaptée à son climat et à ses ressources.",
    ],
  },

  {
    slug: "antenne-yamoussoukro-morofe",
    titre: "Notre succursale de Yamoussoukro Morofé desservir l'intérieur du pays",
    chapo:
      "Pour desservir l'intérieur du pays sans compromis sur la qualité. Équipes mobiles, bureaux permanents, réactivité identique à Abidjan. Le centre du pays mérite la même exigence.",
    categorie: "Groupe",
    date: "2025-11-15",
    auteur: "Direction SICA",
    lecture: "3 min",
    contenu: [
      "Le Groupe SICA s'appuie désormais sur deux bureaux permanents : un siège social à Abidjan Cocody Centre, en face de la cité 48 Logements V1, et une succursale installée à Yamoussoukro Morofé — 24 ampoules. Cette double implantation n'est pas symbolique : elle traduit notre conviction que les villes de l'intérieur méritent le même niveau d'exigence que la capitale économique.",
      "Notre bureau de Yamoussoukro accueille des équipes terrain et techniques permanentes, capables d'intervenir dans toute la zone centre et au-delà : Bouaké, Daloa, Korhogo, San Pedro. Les contacts directs (+225 0102442894 et +225 2722247445) permettent d'obtenir un rendez-vous sans intermédiaire.",
      "Pour le Groupe, c'est aussi la concrétisation d'une promesse contenue dans nos statuts : « nos équipes sont mobiles et disponibles pour vous servir et satisfaire partout en Côte d'Ivoire, quelle que soit votre localité ». Aucune mission n'est trop éloignée si elle entre dans notre champ technique.",
    ],
  },

  {
    slug: "etudes-sol-pressiometre",
    titre: "Essais pressiométriques : la précision avant les fondations",
    chapo:
      "Mesurer la résistance du sol couche par couche, avant de couler la moindre semelle. C'est notre garantie : zéro mauvaise surprise lors du gros œuvre.",
    categorie: "Construction",
    date: "2025-10-15",
    auteur: "Pôle Études SICA",
    lecture: "4 min",
    contenu: [
      "Avant le premier coup de pelle, nous voulons savoir exactement ce que cache le terrain. C'est le rôle de nos essais pressiométriques : une sonde descendue à différentes profondeurs vient mesurer la résistance et la déformabilité du sol, couche par couche. Le résultat est un profil de portance précis, qui sert directement au dimensionnement des fondations.",
      "Cette étape n'est pas une formalité administrative. Elle évite la mauvaise surprise classique : un terrain qui paraît correct en surface mais qui réserve une couche meuble à deux mètres de profondeur, capable de faire fissurer une villa entière dans les cinq premières années. Le pressiomètre nous le dit avant que la première semelle soit coulée.",
      "Sur les terrains complexes de Cocody, d'Abidjan Nord, ou des zones de l'intérieur où la nature des sols change brutalement, le pressiomètre est devenu un outil de routine. Nos techniciens supérieurs maîtrisent l'appareil et l'interprétation. Le rapport remis au client documente chaque sondage et oriente les choix structure.",
    ],
  },

  {
    slug: "production-briques-geobeton",
    titre: "Nouvelle ligne de production de briques géobéton mise en service",
    chapo:
      "Notre capacité de production augmente. Briques BTCS calibrées sur place, livrées directement sur chantier. Plus de logistique externe, moins de délais.",
    categorie: "Construction",
    date: "2025-09-25",
    auteur: "Pôle Production SICA",
    lecture: "3 min",
    contenu: [
      "Notre activité de production de briques géobéton BTCS franchit un cap. Une nouvelle ligne de production vient compléter notre dispositif existant, augmentant sensiblement notre capacité quotidienne. Les briques sont calibrées sur place, à partir d'une terre tamisée sélectionnée, avec un dosage de ciment maîtrisé qui garantit la régularité du produit final.",
      "Pour nos chantiers, cela signifie une autonomie quasi totale : les briques sont produites, séchées, contrôlées puis livrées directement par nos camions sur les sites d'Abidjan, de Yamoussoukro et des localités de l'intérieur. Moins de logistique externe, moins de risques de rupture, des délais maîtrisés.",
      "Pour nos clients confrères et entrepreneurs, c'est aussi l'ouverture d'une offre de fourniture : nous livrons des lots de briques BTCS calibrées pour des chantiers gérés par d'autres acteurs, en complément de leurs propres équipes. Notre process de validation reste le même, quel que soit le destinataire final.",
    ],
  },

  {
    slug: "team-cinq-nouvelle-equipe-terrain",
    titre: "TEAM N°5 : une cinquième équipe terrain rejoint SICA Construction",
    chapo:
      "Ingénieurs génie civil, techniciens supérieurs, ouvriers qualifiés. La TEAM N°5 nous permet d'ouvrir cinq chantiers en parallèle, sans diluer la rigueur.",
    categorie: "Groupe",
    date: "2025-09-10",
    auteur: "Direction des Opérations",
    lecture: "2 min",
    contenu: [
      "Le Groupe SICA s'organise depuis l'origine en équipes terrain numérotées. La structure récente d'une cinquième équipe — TEAM N°5 — vient consolider notre capacité opérationnelle. Chaque équipe rassemble des ingénieurs génie civil, des techniciens supérieurs et des ouvriers qualifiés, sous la responsabilité d'un chef de chantier.",
      "Cette organisation permet désormais d'ouvrir et de suivre cinq chantiers en parallèle, sans diluer la rigueur ni la qualité du suivi. Chaque équipe est autonome mais reliée au bureau d'études et à la direction technique, qui contrôlent la conformité des choix et la régularité des cadences.",
      "Les diplômés que nous recrutons proviennent des grandes écoles renommées d'Abidjan et de Yamoussoukro. C'est l'application littérale de notre principe directeur : la jeunesse qualifiée au travail.",
    ],
  },

  {
    slug: "construction-metallique-charpente",
    titre: "Construction métallique : hangars, combles et pylônes",
    chapo:
      "Études, fabrication, montage. Notre pôle métal complète notre offre béton armé. Une seule entreprise, du sol aux structures les plus complexes.",
    categorie: "Construction",
    date: "2025-08-25",
    auteur: "Pôle Métal SICA",
    lecture: "4 min",
    contenu: [
      "À côté du béton armé et du géobéton, SICA Construction développe un pôle dédié à la construction métallique. Trois grandes familles d'ouvrages : les hangars métalliques (industriels, agricoles, logistiques), les combles métalliques pour des structures de toiture sur ouvrages neufs ou existants, et le montage de pylônes pour des usages techniques variés.",
      "Le pôle métal intervient sur l'ensemble de la chaîne : études techniques, fabrication des éléments en atelier, montage sur site. Nous assumons la responsabilité complète, du calcul de structure aux soudures finales, ce qui évite au client de multiplier les intervenants et garantit la cohérence du résultat.",
      "Cette diversification n'est pas un saupoudrage. Elle s'inscrit dans notre logique d'entreprise intégrée : un seul interlocuteur, du sol aux structures les plus complexes. Pour un porteur de projet industriel ou agricole, c'est l'assurance d'un dossier traité de bout en bout.",
    ],
  },

  {
    slug: "essais-penetrometriques-spt",
    titre: "Essais SPT pénétromètre pour les sols les plus délicats",
    chapo:
      "Sondages dynamiques continus, profil de portance complet. Pour les terrains de Cocody, d'Abidjan Nord, et partout où la nature des sols change brutalement.",
    categorie: "Construction",
    date: "2025-08-10",
    auteur: "Pôle Études SICA",
    lecture: "4 min",
    contenu: [
      "Quand le pressiomètre ne suffit pas — terrains hétérogènes, présence d'eau, sols peu cohésifs — nous mobilisons notre pénétromètre. Les essais SPT (Standard Penetration Test) consistent à enfoncer dynamiquement une tige dans le sol et à compter le nombre de coups nécessaires pour faire pénétrer une longueur normée. C'est une mesure directe et continue de la résistance du sol.",
      "Cet outil est particulièrement utile sur les zones de Cocody, d'Abidjan Nord, ou les terrains de l'intérieur où la nature géologique varie sur de courtes distances. Le résultat est un profil détaillé qui permet de choisir précisément le type de fondations : semelles filantes, semelles isolées, radier, ou pieux dans les cas extrêmes.",
      "Nos techniciens supérieurs en étude de sol opèrent l'appareil et rédigent le rapport. Ce document devient ensuite pièce maîtresse du dossier d'ingénierie et, à terme, du dossier de permis de construire. Le client en garde un exemplaire, traçable et opposable.",
    ],
  },

  {
    slug: "location-engins-btp",
    titre: "Location d'engins BTP : un service pour les professionnels du bâtiment",
    chapo:
      "Bétonnières, vibreurs, chargeuses, camions. Du matériel entretenu, livré sur site, à la journée ou au mois. Pour les confrères comme pour les chantiers indépendants.",
    categorie: "Construction",
    date: "2025-07-25",
    auteur: "Pôle Prestations SICA",
    lecture: "2 min",
    contenu: [
      "Le Groupe SICA dispose d'un parc matériel constitué pour ses propres chantiers : bétonnières, vibreurs, chargeuses, camions, pelles, brouettes, pioches, poulies. Plutôt que de laisser ce parc inactif entre deux mobilisations internes, nous le mettons en location pour les confrères et les chantiers indépendants.",
      "La formule est simple : du matériel entretenu et contrôlé, livré directement sur site partout en Côte d'Ivoire, à la journée, à la semaine ou au mois. Nos équipes peuvent intervenir pour le déchargement et, si besoin, accompagner le formateur opérateur dans la première utilisation.",
      "Pour les petites entreprises et les entrepreneurs indépendants, c'est un moyen d'accéder à un matériel professionnel sans le coût d'un achat. Pour SICA, c'est une activité de service qui prolonge notre vocation BTP au-delà de nos propres réalisations.",
    ],
  },

  {
    slug: "engagement-24-7",
    titre: "Astreinte client 24h/24, 7j/7 : l'engagement SICA",
    chapo:
      "Un chantier ne s'arrête pas le week-end. Notre cellule d'astreinte répond à toute heure, pour les questions techniques comme pour les urgences de terrain.",
    categorie: "Groupe",
    date: "2025-07-10",
    auteur: "Service Client SICA",
    lecture: "2 min",
    contenu: [
      "Parmi nos valeurs fondatrices, l'engagement client est listé en premier. La formulation est précise : « nous respectons nos engagements envers nos clients, nous leur portons assistance 24h/24 et 7j/7, et offrons un service de qualité ». Cette astreinte n'est pas un slogan, c'est une organisation.",
      "Un chantier ne s'arrête pas le week-end et n'attend pas le lundi matin pour rencontrer un imprévu. Notre cellule d'astreinte répond à toute heure : pour une question technique du maître d'ouvrage, pour une urgence de terrain (intempérie, livraison de béton à valider, accident mineur), pour le suivi d'un client distant qui souhaite un point en soirée.",
      "Au quotidien, nos lignes directes (+225 0709883293 et +225 2722247445) restent les premiers points de contact. Pour les urgences hors heures ouvrées, l'astreinte prend le relais. Notre principe : un appel ne reste jamais sans réponse.",
    ],
  },

  {
    slug: "geobeton-empreinte-carbone",
    titre: "Géobéton : une empreinte carbone divisée par rapport au béton traditionnel",
    chapo:
      "Moins de ciment, plus de terre locale. Notre matériau signature réduit significativement l'empreinte CO₂ d'un mur traditionnel. Construire propre, sans concession.",
    categorie: "Construction",
    date: "2025-06-15",
    auteur: "Pôle Construction SICA",
    lecture: "5 min",
    contenu: [
      "Le ciment est l'un des matériaux les plus émissifs au monde. Chaque tonne produite génère une quantité importante de CO₂ lors de la cuisson du clinker. C'est l'une des raisons pour lesquelles nous avons fait du géobéton notre matériau de référence : 90 % de terre tamisée locale, 10 % de ciment. Mécaniquement, cela divise les émissions liées au gros œuvre.",
      "Le bénéfice environnemental ne s'arrête pas au matériau. La terre utilisée est extraite à proximité du chantier ou de notre usine, ce qui réduit également la logistique routière et son empreinte associée. Là où une construction classique multiplie les rotations de camions toupies, le géobéton ramène l'essentiel sur le site.",
      "Concrètement, l'avantage est mesurable sans avoir besoin d'estimations marketing : moins de ciment importé, moins de transport, moins d'énergie consommée. Construire propre n'est plus une concession esthétique, c'est devenu une décision technique et économique à la fois.",
    ],
  },

  {
    slug: "methode-sept-etapes",
    titre: "Notre méthode en sept étapes : du terrain aux clés en main",
    chapo:
      "Visite, étude de sol, conception, ingénierie, devis, permis, démarrage. Rien n'est laissé au hasard. Chaque étape est documentée, chaque décision tracée.",
    categorie: "Construction",
    date: "2025-06-05",
    auteur: "Pôle Construction SICA",
    lecture: "4 min",
    contenu: [
      "Nos clients ne se lancent pas dans une construction tous les jours. Pour leur donner de la visibilité et du contrôle, nous avons structuré notre intervention en sept étapes claires, suivies à la lettre sur chaque projet. La première étape est la visite du terrain, avec son extrait topographique. La deuxième est l'étude de sol, si nécessaire (facturée séparément).",
      "La troisième étape est la conception architecturale : plans, façades, volumétrie, en lien avec les contraintes du terrain et les souhaits du maître d'ouvrage. Vient ensuite l'ingénierie et l'étude de structure, puis l'élaboration du devis quantitatif et estimatif (DQE). Cette étape de chiffrage est cruciale : elle fixe le budget réel du projet.",
      "La quatrième étape est la validation du DQE et la signature du protocole en bureau. La cinquième est le permis de construire, monté avec le certificat d'urbanisme. La sixième est le paiement (chèque, espèces, virement). La septième et dernière est le démarrage concret du chantier. Chaque étape est documentée, chaque décision est tracée.",
      "Cette discipline du process est ce qui permet à SICA de tenir ses délais et de livrer ce qui est annoncé. Rien n'est laissé au hasard, et le client garde une copie de l'ensemble du dossier pour ses archives.",
    ],
  },

  {
    slug: "geobeton-economie-20-pourcent",
    titre: "Géobéton : jusqu'à 20 % d'économies sur le coût des gros œuvres",
    chapo:
      "À qualité égale, parfois supérieure. Le calcul est simple : moins de ciment importé, plus de matière locale, des délais raccourcis. La rentabilité d'un choix réfléchi.",
    categorie: "Construction",
    date: "2025-05-15",
    auteur: "Pôle Construction SICA",
    lecture: "3 min",
    contenu: [
      "Quand on compare construction agglo/parpaing et construction géobéton/BTCS, le constat est sans appel : à qualité égale (parfois supérieure), le géobéton permet une réduction de 20 % sur le coût total de la réalisation des gros œuvres. C'est l'un des chiffres clés de notre dossier technique, et c'est un argument que nos clients vérifient eux-mêmes sur leurs devis.",
      "Le mécanisme est simple. Le ciment représente une part importante du coût d'un mur traditionnel. En réduisant cette part à 10 % du matériau (90 % de terre tamisée), on réduit mécaniquement la dépense en matériau le plus cher. À cela s'ajoutent des délais raccourcis, donc moins de coûts indirects (main-d'œuvre, location matériel, frais de chantier).",
      "Cette économie n'est pas obtenue au détriment de la qualité. Au contraire, les avantages techniques du géobéton (isolation, durée de vie, régulation thermique) en font un choix supérieur pour les climats tropicaux. C'est ce que nous appelons la rentabilité d'un choix réfléchi.",
    ],
  },

  {
    slug: "delai-construction-reduit",
    titre: "Délais de construction réduits de 30 % avec le géobéton",
    chapo:
      "Brique préfabriquée, séchage rapide, pose mécanisée. Les chantiers avancent. Là où un projet prenait dix mois, nous livrons en sept. Sans rabais sur la qualité.",
    categorie: "Construction",
    date: "2025-04-25",
    auteur: "Pôle Production SICA",
    lecture: "3 min",
    contenu: [
      "Le second avantage majeur du géobéton, après l'économie financière, est la réduction du délai de construction. Le dossier technique du Groupe SICA chiffre cette réduction à 30 % par rapport aux constructions traditionnelles. Sur un programme de villa, cela représente plusieurs mois de gagnés.",
      "Trois facteurs expliquent ce gain. D'abord, la brique BTCS est préfabriquée et calibrée en usine, ce qui élimine les temps d'attente liés à la cure du béton coulé sur place. Ensuite, son séchage est rapide et homogène. Enfin, sa pose se prête bien à des cadences mécanisées et régulières, sans les aléas du parpaing artisanal.",
      "Sur le terrain, cela se traduit concrètement : là où un projet de villa basse prenait dix mois en construction classique, nous le livrons en sept mois en géobéton. Sans rabais sur la qualité, sans course aux finitions, sans compromis sur la sécurité. Le délai annoncé est respecté scrupuleusement, comme l'exigent nos engagements client.",
    ],
  },

  {
    slug: "partenariat-cofina",
    titre: "Cofina Côte d'Ivoire : notre établissement bancaire de référence",
    chapo:
      "Cofina Côte d'Ivoire accompagne le Groupe SICA depuis sa structuration. Une relation bancaire stable au service de la solidité financière de nos chantiers.",
    categorie: "Groupe",
    date: "2025-04-10",
    auteur: "Direction Administrative",
    lecture: "3 min",
    contenu: [
      "Le Groupe SICA tient ses comptes professionnels auprès de Cofina Côte d'Ivoire. C'est notre banque de référence depuis la structuration du Groupe, et toutes nos opérations courantes (paiements fournisseurs, salaires, encaissements clients) transitent par cet établissement.",
      "Pour nos clients, cette relation bancaire offre une garantie pratique : les coordonnées bancaires officielles du Groupe sont stables et communiquées dans nos documents contractuels. Tous les paiements liés à un projet SICA, qu'il s'agisse d'un devis, d'une étude facturée ou d'une situation de chantier, sont émis ou réceptionnés sur ce compte unique.",
      "Cette transparence financière fait partie des fondations sur lesquelles repose la confiance de nos clients. Aucun versement intermédiaire, aucun compte parallèle. Le Groupe SICA opère avec la rigueur administrative qu'exige un acteur sérieux du BTP en Côte d'Ivoire.",
    ],
  },

  {
    slug: "vrd-amenagements-urbains",
    titre: "VRD et aménagements : terrassement, drainage, signalisation, paysage",
    chapo:
      "Préparation de plateforme, drainage, assainissement, signalisation, paysage. Tout ce qui se passe avant et autour du bâtiment, et que nous gérons aussi.",
    categorie: "Construction",
    date: "2025-03-25",
    auteur: "Pôle VRD SICA",
    lecture: "4 min",
    contenu: [
      "Un bâtiment n'existe pas seul. Il s'inscrit dans un terrain qu'il faut préparer, drainer, viabiliser, et qu'il faudra ensuite aménager. Le Groupe SICA intègre l'ensemble de ces prestations sous l'appellation VRD (Voirie, Réseaux Divers) et aménagements urbains, en complément de notre cœur de métier bâtiment.",
      "Concrètement, cela couvre : la préparation de plateforme et le terrassement (nivellement, déblais/remblais, compactage), l'assainissement (eaux pluviales, eaux usées, raccordements), la signalisation horizontale et verticale lorsqu'elle est nécessaire, et les aménagements paysagers de finition. Notre pôle VRD intervient sur ces lots de bout en bout.",
      "L'avantage d'intégrer ces métiers chez SICA est simple : un seul interlocuteur, un seul planning, une seule responsabilité. Là où un programme classique mobilise trois ou quatre entreprises distinctes pour les VRD, nous gérons l'enchaînement en interne, ce qui fluidifie le chantier et évite les disputes de bord.",
    ],
  },

  {
    slug: "plomberie-electricite-integre",
    titre: "Plomberie et électricité : second œuvre intégré",
    chapo:
      "Du gainage aux luminaires, de la pieuvre aux raccordements. Nos équipes second œuvre interviennent en continuité du gros œuvre. Une seule responsabilité.",
    categorie: "Construction",
    date: "2025-03-10",
    auteur: "Pôle Second Œuvre SICA",
    lecture: "3 min",
    contenu: [
      "Une fois le gros œuvre achevé, le bâtiment doit encore être équipé. Le Groupe SICA assure le second œuvre en interne, sans recourir à des sous-traitants externes. Notre pôle plomberie prend en charge la fourniture et l'installation des équipements sanitaires (tuyaux, raccords, robinets, bobinettes), le suivi et le contrôle des installations, puis la maintenance et la gestion des équipements une fois la livraison effectuée.",
      "Côté électricité, l'intervention démarre dès le gros œuvre avec la pose des pieuvres et la passation des gaines dans les éléments en béton ou en brique. Vient ensuite l'installation des boîtes de dérivation, le raccordement des tableaux électriques, la mise en place des chemins de câbles, puis la pose finale des luminaires, prises et interrupteurs.",
      "Pour le client, cette intégration garantit une continuité technique entre le gros œuvre et le second œuvre. Les passages de réseaux sont anticipés dès la conception, les reprises sont évitées, et la responsabilité reste portée par le même Groupe du début à la fin.",
    ],
  },

  {
    slug: "villa-duplex-bingerville",
    titre: "Villa duplex à Bingerville : livraison d'un programme R+1",
    chapo:
      "Façade géobéton apparente, terrasses étagées, finitions soignées. Un projet livré dans les délais annoncés, après plusieurs mois de chantier maîtrisé.",
    categorie: "Construction",
    date: "2025-02-15",
    auteur: "Équipe SICA Construction",
    lecture: "3 min",
    contenu: [
      "Le Groupe SICA a remis les clés d'une villa duplex R+1 implantée à Bingerville. Le programme s'inscrit dans notre activité de réalisation de villas duplex, l'une de nos spécialités documentées avec la villa basse 02 pièces, la villa basse 03 pièces, et la villa basse 04 pièces.",
      "La façade laisse apparente la brique géobéton BTCS, choix esthétique et technique qui valorise la matière locale et offre une régulation thermique naturelle. Les terrasses étagées articulent les deux niveaux et créent des espaces extérieurs ombragés, adaptés au climat ivoirien.",
      "Le chantier a été suivi par l'une de nos équipes terrain dédiées et a respecté l'ensemble des étapes de notre méthode interne : visite, étude de sol, conception, ingénierie, DQE, permis, démarrage. Les finitions ont fait l'objet d'un soin particulier, conformément à notre engagement de mettre un accent particulier sur les finitions de nos sites.",
    ],
  },

  {
    slug: "sica-ci-lancement-site",
    titre: "sica.ci : la vitrine officielle du Groupe SICA",
    chapo:
      "Une vitrine pensée pour vous. Pôles, réalisations, contact direct, accès client. Une porte d'entrée unique vers SICA Construction et SICA Assistance.",
    categorie: "Groupe",
    date: "2025-01-25",
    auteur: "Communication SICA",
    lecture: "2 min",
    contenu: [
      "Le Groupe SICA dispose désormais d'une vitrine officielle en ligne : sica.ci. C'est notre porte d'entrée numérique unique, qui présente les deux départements du Groupe : SICA Construction (bâtiment, travaux publics, géobéton, métal, plomberie, électricité) et SICA Assistance (accompagnement entrepreneurial des entreprises et des particuliers).",
      "Le site centralise l'essentiel : la présentation du Groupe, le détail de nos pôles d'activité, nos réalisations en Côte d'Ivoire, un accès direct au contact (formulaire, téléphone, e-mail) et un espace client pour le suivi des projets en cours. La navigation a été pensée pour aller à l'essentiel sans surcharge marketing.",
      "Au-delà de la vitrine, sica.ci constitue aussi un point d'entrée pour les candidatures spontanées, les demandes de partenariat, et les commandes de matériel (briques, location d'engins, fourniture). C'est l'extension naturelle de notre présence physique à Cocody et à Yamoussoukro.",
    ],
  },

  {
    slug: "grands-chantiers-sous-traitance",
    titre: "Grands chantiers et sous-traitance : un positionnement assumé",
    chapo:
      "Travailler aux côtés des majors du BTP ivoirien. Apporter notre savoir-faire géobéton sur les programmes d'envergure. Sans perdre l'âme d'un acteur local.",
    categorie: "Construction",
    date: "2025-01-10",
    auteur: "Direction des Opérations",
    lecture: "4 min",
    contenu: [
      "À côté de nos chantiers en maîtrise complète, le Groupe SICA assume un positionnement de sous-traitant sur les grands chantiers nationaux. Cette double activité figure explicitement dans notre dossier technique : « grands chantiers et sous-traitances ». Elle nous permet de travailler aux côtés des majors du BTP ivoirien sur des programmes d'envergure que nous ne pourrions porter seuls.",
      "Notre apport sur ces grands chantiers est ciblé : notre savoir-faire géobéton et BTCS, notre capacité d'études de sol, notre pôle métal, ou nos équipes second œuvre. Le donneur d'ordres reste responsable du programme global ; nous intervenons sur le lot où notre valeur ajoutée est la plus claire.",
      "Pour SICA, c'est une école permanente : travailler avec les standards les plus exigeants du secteur, intégrer les exigences QHSE des grands maîtres d'ouvrage, prouver notre fiabilité sur des volumes importants. Pour les majors, c'est l'accès à un sous-traitant ivoirien certifié et structuré. Et pour la Côte d'Ivoire, c'est la garantie qu'une partie du savoir-faire reste local.",
    ],
  },

  {
    slug: "prefabrique-elements-beton",
    titre: "Préfabriqués béton : éléments calibrés pour gagner du temps",
    chapo:
      "Linteaux, poteaux, hourdis, claustras. Préparés en atelier, livrés prêts à poser. Moins de temps perdu sur place, plus de régularité dans la qualité finale.",
    categorie: "Construction",
    date: "2024-12-15",
    auteur: "Pôle Production SICA",
    lecture: "3 min",
    contenu: [
      "À côté des briques BTCS et des briques agglos/parpaings, le Groupe SICA développe une activité de préfabriqués béton : éléments calibrés en atelier, livrés prêts à poser sur les chantiers. Les références principales : linteaux, poteaux, hourdis, claustras. Chaque pièce sort du moule selon les dimensions standard, avec un contrôle qualité avant départ.",
      "L'intérêt du préfabriqué est double. D'un côté, on gagne du temps sur le chantier : pas de coffrage à monter, pas d'attente de cure, pas d'aléa de séchage. De l'autre, on gagne en régularité : les pièces produites en atelier dans des conditions maîtrisées sont plus homogènes que celles coulées sur place sous des températures variables.",
      "Pour nos clients particuliers comme pour les confrères entrepreneurs, c'est aussi un moyen d'accéder à des éléments de qualité industrielle sans investir dans un outil de production. Le préfabriqué se commande à l'unité ou par lot, et se livre directement sur site dans tout le pays.",
    ],
  },

  /* ════════════════════════════════════════════════════════════════════
     ARTICLES EXISTANTS — confirmés réels par la Direction
  ═════════════════════════════════════════════════════════════════════ */

  {
    slug: "sgci-livraison-plateau-2024",
    titre: "Livraison du siège SGCI au Plateau : un jalon pour le géobéton ivoirien",
    chapo:
      "Inauguration du siège de la SGCI au Plateau d'Abidjan, premier immeuble institutionnel SICA entièrement réalisé en briques BTCS apparentes.",
    categorie: "Construction",
    date: "2024-11-18",
    auteur: "Équipe SICA Construction",
    lecture: "4 min",
    contenu: [
      "Le 18 novembre 2024, le Groupe SICA a remis officiellement les clés du siège de la SGCI au Plateau d'Abidjan. Conçu dès l'esquisse pour valoriser le géobéton, notre matériau signature, l'immeuble présente une façade en briques de terre comprimée à haute densité, laissées apparentes, à l'expression sobre et durable.",
      "Le chantier a mobilisé deux de nos cinq équipes terrain pendant onze mois, avec un suivi qualité matériaux serré : chaque lot de briques BTCS passe par notre process de validation pressiométrique avant intégration au gros œuvre.",
      "Cette livraison confirme une conviction : le géobéton n'est pas un effet de mode mais une réponse technique adaptée au climat ivoirien — inertie thermique élevée, faible empreinte carbone, esthétique tropicale assumée.",
    ],
  },

  {
    slug: "ngoran-ivan-meilleur-jeune-entrepreneur",
    titre: "Ngoran Ivan distingué Meilleur jeune entrepreneur ivoirien 2023",
    chapo:
      "Le fondateur du Groupe SICA reçoit la distinction nationale au Sofitel Hôtel Ivoire, saluant trois ans de structuration d'un acteur intégré BTP et Assistance entrepreneuriale.",
    categorie: "Groupe",
    date: "2023-12-08",
    auteur: "Communication SICA",
    lecture: "3 min",
    contenu: [
      "Lors de la cérémonie nationale organisée au Sofitel Hôtel Ivoire en décembre 2023, Ngoran Ivan, fondateur et directeur du Groupe SICA, a été distingué Meilleur jeune entrepreneur ivoirien de l'année. Cette distinction figure officiellement dans le dossier technique du Groupe.",
      "Cette reconnaissance vient saluer une approche singulière : avoir su rassembler sous une même bannière deux métiers traditionnellement séparés, la construction et l'assistance entrepreneuriale, pour offrir aux particuliers et aux PME un guichet unique.",
      "« Les deux mondes communiquent plus qu'on ne le pense, explique Ngoran Ivan. Une PME qui structure sa comptabilité finit souvent par investir dans ses locaux ; un particulier qui construit une villa pense très vite à monter une SCI. Notre rôle, c'est de simplifier cette continuité. »",
    ],
  },

  {
    slug: "espace-client-e-sica-lancement",
    titre: "Lancement de l'espace client e-SICA : votre chantier dans votre main",
    chapo:
      "Une plateforme web sécurisée donne désormais à chaque client SICA un accès en temps réel à l'avancement de son projet, ses documents et ses échanges.",
    categorie: "Groupe",
    date: "2026-05-15",
    auteur: "Équipe produit SICA",
    lecture: "5 min",
    contenu: [
      "À partir de mai 2026, tous les clients SICA Construction et SICA Assistance disposent d'un espace personnel — e-SICA — accessible 24/7 depuis ordinateur ou mobile.",
      "L'espace offre trois fonctions clés : (1) le suivi temps réel de l'avancement du chantier ou du dossier, mis à jour chaque semaine par l'équipe projet ; (2) la centralisation des documents (plans, devis, factures, comptes rendus de réunion) dans un coffre numérique sécurisé ; (3) un canal de communication direct avec le chef de projet référent.",
      "Conçu avec une exigence de sobriété (pas de notifications intempestives, pas de jeux de gamification, pas de publicité), e-SICA est pensé comme un outil professionnel, pas comme une application grand public.",
    ],
  },

  {
    slug: "etude-r3-bingerville-2025",
    titre: "Étude géotechnique R+3 Bingerville : sondages pressiométriques achevés",
    chapo:
      "Notre pôle études vient de livrer le rapport géotechnique préalable au programme résidentiel R+3 de Bingerville. Dimensionnement fondations validé.",
    categorie: "Construction",
    date: "2024-09-22",
    auteur: "Pôle Études SICA",
    lecture: "4 min",
    contenu: [
      "Le rapport géotechnique préalable au programme résidentiel R+3 de Bingerville est livré. Trois mois de travaux terrain, sondages pressiométriques et essais SPT à différentes profondeurs, complétés par une analyse en laboratoire.",
      "Les conclusions valident un dimensionnement classique pour les fondations (pas de pieux nécessaires, semelles isolées suffisantes), moyennant un remblai compacté en partie nord du terrain où la portance était plus faible.",
      "Ce rapport servira de pièce maîtresse au dossier de permis de construire et aux études d'exécution structure menées en parallèle par notre bureau.",
    ],
  },
];

export function getActualiteBySlug(slug: string): Actualite | undefined {
  return ACTUALITES.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return ACTUALITES.map((a) => a.slug);
}

export function formatDateFr(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
