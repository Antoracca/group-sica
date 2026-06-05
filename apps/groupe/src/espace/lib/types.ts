/* Modèle de données de l'espace client ERP SICA (V2). */

export type ProjectPole = "construction" | "assistance";
export type ProjectType = "chantier" | "dossier_juridique" | "dossier_comptable" | "creation_entreprise";
export type ProjectStatus = "En étude" | "En cours" | "Suspendu" | "Livré" | "Archivé";
export type DocumentType = "Devis" | "Contrat" | "Bon de commande" | "Facture" | "Rapport" | "Plan" | "Document Légal";
export type DocumentStatus = "a-signer" | "en-attente" | "signe" | "archive";
export type TicketStatus = "nouvelle" | "en-cours" | "en-attente-client" | "traitee";
export type TicketPriority = "basse" | "moyenne" | "haute" | "urgente";
export type NotificationType = "system" | "project" | "document" | "finance" | "ticket";

export interface Profile {
  id: string;
  role: "client" | "staff" | "admin";
  prenom: string | null;
  nom: string | null;
  entreprise: string | null;
  email: string | null;
  telephone: string | null;
  ville: string | null;
  adresse: string | null;
  pays: string | null;
  photo_url: string | null;
  signature_url: string | null;
  preferences: {
    theme: string;
    language: string;
    notifications_email: boolean;
  };
}

export interface ProjectStep {
  id: string;
  label: string;
  statut: "fait" | "encours" | "avenir" | "retard";
  date_prevue?: string;
  date_realise?: string;
}

export interface ProjectTeamMember {
  id: string;
  user_id: string;
  role_projet: string;
  profile?: Pick<Profile, "prenom" | "nom" | "photo_url">;
}

export interface Project {
  id: string;
  pole: ProjectPole;
  type: ProjectType;
  titre: string;
  reference: string | null;
  localisation: string | null;
  pos_lat: number | null;
  pos_lng: number | null;
  statut: ProjectStatus;
  avancement: number;
  budget_prevu: number;
  budget_depense: number;
  date_debut: string | null;
  date_fin_prevue: string | null;
  prochaine_etape: string | null;
  etapes?: ProjectStep[];
  team?: ProjectTeamMember[];
  updated_at: string;
}

export interface Document {
  id: string;
  pole: ProjectPole;
  type: DocumentType;
  titre: string;
  reference: string | null;
  montant: number;
  file_url: string;
  version: number;
  statut: DocumentStatus;
  doc_date: string;
  signed_at: string | null;
}

export interface Ticket {
  id: string;
  pole: ProjectPole;
  sujet: string;
  description: string;
  priorite: TicketPriority;
  statut: TicketStatus;
  created_at: string;
  updated_at: string;
}

export interface NotificationItem {
  id: string;
  type: NotificationType;
  titre: string;
  corps: string | null;
  action_url: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Invoice {
  id: string;
  reference: string;
  montant_ht: number;
  montant_ttc: number;
  date_emission: string;
  date_echeance: string;
  statut: "Brouillon" | "Envoyée" | "Payée partiellement" | "Payée" | "En retard";
  file_url: string | null;
}
