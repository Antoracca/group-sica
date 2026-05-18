/* ════════════════════════════════════════════════════════════════════════
   ACTUALITÉS — données seed pour la V1
   ────────────────────────────────────────────────────────────────────────
   En production : remplacé par Supabase `blog_posts` (voir CONTEXTE §7).
   Pour la V1 démo, on garde un fichier statique typé en TS.
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
  {
    slug: "sgci-livraison-plateau-2024",
    titre: "Livraison du siège SGCI au Plateau — un jalon pour le géobéton ivoirien",
    chapo:
      "Inauguration du siège de la SGCI au Plateau d'Abidjan, premier immeuble institutionnel SICA entièrement réalisé en briques BTCS apparentes.",
    categorie: "Construction",
    date: "2024-11-18",
    auteur: "Équipe SICA Construction",
    lecture: "4 min",
    contenu: [
      "Le 18 novembre 2024, le Groupe SICA a remis officiellement les clés du siège de la SGCI au Plateau d'Abidjan. Conçu dès l'esquisse pour valoriser le géobéton — notre matériau signature — l'immeuble présente une façade en briques de terre comprimée à haute densité, laissées apparentes, à l'expression sobre et durable.",
      "Le chantier a mobilisé deux de nos cinq équipes terrain pendant onze mois, avec un suivi qualité matériaux serré : chaque lot de briques BTCS passe par notre process de validation pressiométrique avant intégration au gros œuvre.",
      "Cette livraison confirme une conviction : le géobéton n'est pas un effet de mode mais une réponse technique adaptée au climat ivoirien — inertie thermique élevée, faible empreinte carbone, esthétique tropicale assumée.",
    ],
  },
  {
    slug: "ngoran-ivan-meilleur-jeune-entrepreneur",
    titre: "Ngoran Ivan distingué Meilleur jeune entrepreneur ivoirien 2023",
    chapo:
      "Le fondateur du Groupe SICA reçoit la distinction nationale, saluant trois ans de structuration d'un acteur intégré BTP + Assistance entrepreneuriale.",
    categorie: "Groupe",
    date: "2023-12-08",
    auteur: "Communication SICA",
    lecture: "3 min",
    contenu: [
      "Lors de la cérémonie nationale organisée en décembre 2023, Ngoran Ivan, fondateur et directeur du Groupe SICA, a été distingué Meilleur jeune entrepreneur ivoirien de l'année.",
      "Cette reconnaissance vient saluer une approche singulière : avoir su rassembler sous une même bannière deux métiers traditionnellement séparés — la construction et l'assistance entrepreneuriale — pour offrir aux particuliers et aux PME un guichet unique.",
      "« Les deux mondes communiquent plus qu'on ne le pense, explique Ngoran Ivan. Une PME qui structure sa comptabilité finit souvent par investir dans ses locaux ; un particulier qui construit une villa pense très vite à monter une SCI. Notre rôle, c'est de simplifier cette continuité. »",
    ],
  },
  {
    slug: "espace-client-e-sica-lancement",
    titre: "Lancement de l'espace client e-SICA — votre chantier dans votre main",
    chapo:
      "Une plateforme web sécurisée donne désormais à chaque client SICA un accès en temps réel à l'avancement de son projet, ses documents et ses échanges.",
    categorie: "Groupe",
    date: "2026-05-15",
    auteur: "Équipe produit SICA",
    lecture: "5 min",
    contenu: [
      "À partir de mai 2026, tous les clients SICA Construction et SICA Assistance disposent d'un espace personnel — e-SICA — accessible 24/7 depuis ordinateur ou mobile.",
      "L'espace offre trois fonctions clés : (1) le suivi temps réel de l'avancement du chantier ou du dossier, mis à jour chaque semaine par l'équipe projet ; (2) la centralisation des documents — plans, devis, factures, comptes rendus de réunion — dans un coffre numérique sécurisé ; (3) un canal de communication direct avec le chef de projet référent.",
      "Conçu avec une exigence de sobriété — pas de notifications intempestives, pas de jeux de gamification, pas de publicité — e-SICA est pensé comme un outil professionnel, pas comme une application grand public.",
    ],
  },
  {
    slug: "etude-r3-bingerville-2025",
    titre: "Étude géotechnique R+3 Bingerville — sondages pressiométriques achevés",
    chapo:
      "Notre pôle études vient de livrer le rapport géotechnique préalable au programme résidentiel R+3 de Bingerville. Dimensionnement fondations validé.",
    categorie: "Construction",
    date: "2024-09-22",
    auteur: "Pôle Études SICA",
    lecture: "4 min",
    contenu: [
      "Le rapport géotechnique préalable au programme résidentiel R+3 de Bingerville est livré. Trois mois de travaux terrain, sondages pressiométriques et essais SPT à différentes profondeurs, complétés par une analyse en laboratoire.",
      "Les conclusions valident un dimensionnement classique pour les fondations — pas de pieux nécessaires, semelles isolées suffisantes — moyennant un remblai compacté en partie nord du terrain où la portance était plus faible.",
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
