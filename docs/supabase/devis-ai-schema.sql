-- ============================================================================
--  DEVIS IA — Schéma Supabase (extension de schema.sql)
--  À exécuter dans Supabase → SQL Editor (idempotent).
--  Stocke chaque génération de devis IA + chaque correction faite par SICA.
--  Sert de boucle d'apprentissage pour calibrer le moteur déterministe.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ── GENERATIONS (un par exécution de l'agent vision) ───────────────────────
create table if not exists public.devis_ai_generations (
  id            uuid primary key default gen_random_uuid(),
  reference     text not null unique,
  -- Source
  source        text not null default 'public' check (source in ('public','staff','console')),
  client_email  text,                       -- e-mail laissé par l'utilisateur (optionnel)
  pdf_name      text,                       -- nom du PDF importé
  pdf_size      int,                        -- octets
  -- Payload
  plan          jsonb not null,             -- PlanInput (JSON pivot)
  devis         jsonb not null,             -- DevisResult complet
  -- Metrics
  total_ht      bigint not null default 0,
  ratio_fcfa_m2 int    not null default 0,
  surface_m2   numeric,
  standing      text,
  duration_ms   int,
  -- Cycle de vie
  status        text not null default 'pending'
                check (status in ('pending','reviewed','accepted','rejected')),
  created_at    timestamptz not null default now(),
  reviewed_at   timestamptz,
  reviewed_by   uuid references public.profiles(id) on delete set null
);

create index if not exists idx_devis_ai_created   on public.devis_ai_generations(created_at desc);
create index if not exists idx_devis_ai_status    on public.devis_ai_generations(status);

-- ── CORRECTIONS (granularité ligne — pour entraîner le KB) ─────────────────
create table if not exists public.devis_ai_corrections (
  id                uuid primary key default gen_random_uuid(),
  generation_id     uuid not null references public.devis_ai_generations(id) on delete cascade,
  lot_code          text not null,            -- ex : "A"
  sous_lot_code     text not null,            -- ex : "1"
  ligne_index       int  not null,            -- index dans sl.lignes
  field             text not null check (field in ('quantite','pu','montant','designation')),
  before_value      text not null,            -- string-encoded (uniforme JSON-friendly)
  after_value       text not null,
  note              text,
  created_at        timestamptz not null default now(),
  created_by        uuid references public.profiles(id) on delete set null
);

create index if not exists idx_devis_ai_corr_gen   on public.devis_ai_corrections(generation_id);
create index if not exists idx_devis_ai_corr_field on public.devis_ai_corrections(field);

-- ============================================================================
--  RLS
-- ============================================================================
alter table public.devis_ai_generations  enable row level security;
alter table public.devis_ai_corrections  enable row level security;

-- Lecture / écriture : staff & admin uniquement (utilise l'helper is_staff()).
drop policy if exists "devis_ai_gen_all" on public.devis_ai_generations;
create policy "devis_ai_gen_all" on public.devis_ai_generations for all
  using (public.is_staff()) with check (public.is_staff());

drop policy if exists "devis_ai_corr_all" on public.devis_ai_corrections;
create policy "devis_ai_corr_all" on public.devis_ai_corrections for all
  using (public.is_staff()) with check (public.is_staff());

-- Note : les insertions « public » (utilisateur anonyme depuis /devis-auto)
-- se font côté serveur via la clé service_role, qui contourne la RLS.
-- Aucun client navigateur ne peut donc écrire directement dans ces tables.
