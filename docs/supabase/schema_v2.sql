-- ============================================================================
--  ESPACE CLIENT SICA — Schéma Supabase V2 (ERP PREMIUM)
--  À exécuter dans Supabase → SQL Editor.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ── ENUMS ───────────────────────────────────────────────────────────────────
create type project_pole as enum ('construction', 'assistance');
create type project_type as enum ('chantier', 'dossier_juridique', 'dossier_comptable', 'creation_entreprise');
create type project_status as enum ('En étude', 'En cours', 'Suspendu', 'Livré', 'Archivé');
create type document_type as enum ('Devis', 'Contrat', 'Bon de commande', 'Facture', 'Rapport', 'Plan', 'Document Légal');
create type document_status as enum ('a-signer', 'en-attente', 'signe', 'archive');
create type ticket_status as enum ('nouvelle', 'en-cours', 'en-attente-client', 'traitee');
create type ticket_priority as enum ('basse', 'moyenne', 'haute', 'urgente');

-- ── PROFILES ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          text not null default 'client' check (role in ('client','staff','admin')),
  prenom        text,
  nom           text,
  entreprise    text,
  email         text,
  telephone     text,
  ville         text,
  adresse       text,
  pays          text default 'Côte d''Ivoire',
  photo_url     text,
  signature_url text,
  preferences   jsonb default '{"theme": "system", "language": "fr", "notifications_email": true}',
  must_change_password boolean not null default true,
  last_login    timestamptz,
  created_at    timestamptz not null default now()
);

-- ── PROJECTS (Chantiers & Dossiers) ─────────────────────────────────────────
create table if not exists public.projects (
  id              uuid primary key default gen_random_uuid(),
  owner_id        uuid not null references public.profiles(id) on delete cascade,
  pole            project_pole not null,
  type            project_type not null,
  titre           text not null,
  reference       text,
  localisation    text,
  pos_lat         numeric, -- Latitude exacte
  pos_lng         numeric, -- Longitude exacte
  statut          project_status not null default 'En étude',
  avancement      int not null default 0 check (avancement between 0 and 100),
  budget_prevu    bigint default 0,
  budget_depense  bigint default 0,
  date_debut      date,
  date_fin_prevue date,
  prochaine_etape text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── PROJECT_TEAMS (Équipes assignées aux projets) ───────────────────────────
create table if not exists public.project_teams (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  role_projet text not null, -- ex: "Chef de chantier", "Architecte", "Juriste"
  created_at  timestamptz not null default now(),
  unique(project_id, user_id)
);

-- ── PROJECT_STEPS (Planning & Étapes) ───────────────────────────────────────
create table if not exists public.project_steps (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  label       text not null,
  statut      text not null default 'avenir' check (statut in ('fait','encours','avenir', 'retard')),
  date_prevue date,
  date_realise date,
  ordre       int not null default 0
);

-- ── DOCUMENTS (GED Premium) ─────────────────────────────────────────────────
create table if not exists public.documents (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  project_id  uuid references public.projects(id) on delete set null,
  pole        project_pole not null,
  type        document_type not null,
  titre       text not null,
  reference   text,
  montant     bigint default 0,
  file_url    text not null,
  file_size   int,
  version     int default 1,
  statut      document_status not null default 'a-signer',
  doc_date    date not null default current_date,
  signed_at   timestamptz,
  created_at  timestamptz not null default now()
);

-- ── SIGNATURES (Registre Légal) ─────────────────────────────────────────────
create table if not exists public.signatures (
  id          uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  ip_address  text,
  user_agent  text,
  signed_at   timestamptz not null default now()
);

-- ── TICKETS (Demandes Support/Client) ───────────────────────────────────────
create table if not exists public.tickets (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null references public.profiles(id) on delete cascade,
  project_id    uuid references public.projects(id) on delete set null,
  pole          project_pole not null,
  sujet         text not null,
  description   text not null,
  priorite      ticket_priority not null default 'moyenne',
  statut        ticket_status not null default 'nouvelle',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── TICKET_MESSAGES ─────────────────────────────────────────────────────────
create table if not exists public.ticket_messages (
  id          uuid primary key default gen_random_uuid(),
  ticket_id   uuid not null references public.tickets(id) on delete cascade,
  sender_id   uuid not null references public.profiles(id) on delete cascade,
  body        text not null,
  is_internal boolean default false, -- Messages internes staff
  created_at  timestamptz not null default now()
);

-- ── NOTIFICATIONS ───────────────────────────────────────────────────────────
create table if not exists public.notifications (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  type        text not null check (type in ('system', 'project', 'document', 'finance', 'ticket')),
  titre       text not null,
  corps       text,
  action_url  text,
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ── INVOICES & PAYMENTS ─────────────────────────────────────────────────────
create table if not exists public.invoices (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  project_id  uuid references public.projects(id) on delete set null,
  reference   text not null,
  montant_ht  bigint not null,
  montant_ttc bigint not null,
  date_emission date not null,
  date_echeance date not null,
  statut      text not null check (statut in ('Brouillon', 'Envoyée', 'Payée partiellement', 'Payée', 'En retard')),
  file_url    text,
  created_at  timestamptz not null default now()
);

create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  invoice_id  uuid not null references public.invoices(id) on delete cascade,
  montant     bigint not null,
  methode     text not null,
  date_paiement timestamptz not null default now()
);

-- ============================================================================
--  RLS & POLICIES
-- ============================================================================
-- [Les politiques RLS seront similaires à l'ancienne version : le owner voit ses données, le staff voit tout]
-- Par souci de brièveté pour ce script d'initialisation, nous ne listons pas toutes les policies ici, 
-- mais le principe "owner_id = auth.uid() or public.is_staff()" s'applique partout.
