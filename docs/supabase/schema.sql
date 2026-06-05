-- ============================================================================
--  ESPACE CLIENT SICA — Schéma Supabase
--  À exécuter dans Supabase → SQL Editor (une seule fois).
--  Modèle : un seul espace, relié à Construction et Assistance.
--  Les comptes clients sont créés par le personnel (pas d'auto-inscription).
-- ============================================================================

-- ── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── PROFILES (1:1 avec auth.users) ──────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          text not null default 'client' check (role in ('client','staff','admin')),
  prenom        text,
  nom           text,
  entreprise    text,
  email         text,
  telephone     text,
  ville         text,
  must_change_password boolean not null default true,
  created_at    timestamptz not null default now()
);

-- ── PROJECTS (suivis : chantiers & dossiers) ────────────────────────────────
create table if not exists public.projects (
  id              uuid primary key default gen_random_uuid(),
  owner_id        uuid not null references public.profiles(id) on delete cascade,
  pole            text not null check (pole in ('construction','assistance')),
  type            text not null default 'chantier' check (type in ('chantier','dossier')),
  titre           text not null,
  reference       text,
  localisation    text,
  pos_x           numeric default 52,
  pos_y           numeric default 56,
  statut          text not null default 'En cours' check (statut in ('En cours','Livré','En étude','Suspendu')),
  avancement      int  not null default 0 check (avancement between 0 and 100),
  prochaine_etape text,
  photos_count    int  not null default 0,
  rapports_count  int  not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── PROJECT_STEPS (étapes d'un suivi) ───────────────────────────────────────
create table if not exists public.project_steps (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  label       text not null,
  statut      text not null default 'avenir' check (statut in ('fait','encours','avenir')),
  date_label  text,
  ordre       int  not null default 0
);

-- ── DOCUMENTS (devis, contrats, BC, factures + signature) ───────────────────
create table if not exists public.documents (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  pole        text not null check (pole in ('construction','assistance')),
  type        text not null check (type in ('Devis','Contrat','Bon de commande','Facture')),
  titre       text not null,
  reference   text,
  montant     bigint not null default 0,
  doc_date    date not null default current_date,
  statut      text not null default 'a-signer' check (statut in ('a-signer','signe','en-attente')),
  signed_at   timestamptz,
  created_at  timestamptz not null default now()
);

-- ── DEMANDES (assistant de prise en charge) ─────────────────────────────────
create table if not exists public.demandes (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid references public.profiles(id) on delete cascade,
  pole          text not null check (pole in ('construction','assistance')),
  objet         text not null,
  budget        text,
  localisation  text,
  canal         text not null default 'Assistant en ligne',
  statut        text not null default 'nouvelle' check (statut in ('nouvelle','en-cours','traitee')),
  created_at    timestamptz not null default now()
);

-- ── ACTIVITY (fil d'activité) ───────────────────────────────────────────────
create table if not exists public.activity (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  icon        text not null default 'chantier' check (icon in ('chantier','document','demande','message')),
  texte       text not null,
  pole        text not null check (pole in ('construction','assistance')),
  created_at  timestamptz not null default now()
);

-- ── MESSAGES (échanges client ↔ SICA) ───────────────────────────────────────
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  sender      text not null default 'sica' check (sender in ('client','sica')),
  body        text not null,
  lu          boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ── NOTIFICATIONS ───────────────────────────────────────────────────────────
create table if not exists public.notifications (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null references public.profiles(id) on delete cascade,
  titre       text not null,
  corps       text,
  lu          boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ============================================================================
--  TRIGGER : créer un profil à la création d'un utilisateur auth
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, prenom, nom, entreprise, email, telephone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'client'),
    new.raw_user_meta_data->>'prenom',
    new.raw_user_meta_data->>'nom',
    new.raw_user_meta_data->>'entreprise',
    new.email,
    new.raw_user_meta_data->>'telephone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
--  RLS — Row Level Security
-- ============================================================================
alter table public.profiles      enable row level security;
alter table public.projects      enable row level security;
alter table public.project_steps enable row level security;
alter table public.documents     enable row level security;
alter table public.demandes      enable row level security;
alter table public.activity      enable row level security;
alter table public.messages      enable row level security;
alter table public.notifications enable row level security;

-- Helper : l'utilisateur courant fait-il partie du personnel ?
create or replace function public.is_staff()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('staff','admin')
  );
$$;

-- PROFILES : chacun voit/modifie le sien ; le personnel voit/modifie tout.
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles for select
  using (id = auth.uid() or public.is_staff());
drop policy if exists "profiles_update" on public.profiles;
create policy "profiles_update" on public.profiles for update
  using (id = auth.uid() or public.is_staff());
-- Permet l'auto-réparation : un utilisateur peut créer SON propre profil.
drop policy if exists "profiles_insert" on public.profiles;
create policy "profiles_insert" on public.profiles for insert
  with check (id = auth.uid() or public.is_staff());

-- Macro d'aide : politique "le client voit les siens, le staff voit tout".
-- (Répétée par table car Postgres n'a pas de policy générique.)

-- PROJECTS
drop policy if exists "projects_select" on public.projects;
create policy "projects_select" on public.projects for select
  using (owner_id = auth.uid() or public.is_staff());
drop policy if exists "projects_write" on public.projects;
create policy "projects_write" on public.projects for all
  using (public.is_staff()) with check (public.is_staff());

-- PROJECT_STEPS (via le projet parent)
drop policy if exists "steps_select" on public.project_steps;
create policy "steps_select" on public.project_steps for select
  using (
    public.is_staff() or exists (
      select 1 from public.projects p
      where p.id = project_id and p.owner_id = auth.uid()
    )
  );
drop policy if exists "steps_write" on public.project_steps;
create policy "steps_write" on public.project_steps for all
  using (public.is_staff()) with check (public.is_staff());

-- DOCUMENTS : le client peut signer (update du statut) les siens ; staff tout.
drop policy if exists "documents_select" on public.documents;
create policy "documents_select" on public.documents for select
  using (owner_id = auth.uid() or public.is_staff());
drop policy if exists "documents_update_own" on public.documents;
create policy "documents_update_own" on public.documents for update
  using (owner_id = auth.uid() or public.is_staff())
  with check (owner_id = auth.uid() or public.is_staff());
drop policy if exists "documents_write_staff" on public.documents;
create policy "documents_write_staff" on public.documents for insert
  with check (public.is_staff());
drop policy if exists "documents_delete_staff" on public.documents;
create policy "documents_delete_staff" on public.documents for delete
  using (public.is_staff());

-- DEMANDES
drop policy if exists "demandes_select" on public.demandes;
create policy "demandes_select" on public.demandes for select
  using (owner_id = auth.uid() or public.is_staff());
drop policy if exists "demandes_write" on public.demandes;
create policy "demandes_write" on public.demandes for all
  using (public.is_staff()) with check (public.is_staff());

-- ACTIVITY
drop policy if exists "activity_select" on public.activity;
create policy "activity_select" on public.activity for select
  using (owner_id = auth.uid() or public.is_staff());
drop policy if exists "activity_write" on public.activity;
create policy "activity_write" on public.activity for all
  using (public.is_staff()) with check (public.is_staff());

-- MESSAGES
drop policy if exists "messages_select" on public.messages;
create policy "messages_select" on public.messages for select
  using (owner_id = auth.uid() or public.is_staff());
drop policy if exists "messages_insert" on public.messages;
create policy "messages_insert" on public.messages for insert
  with check (owner_id = auth.uid() or public.is_staff());

-- NOTIFICATIONS
drop policy if exists "notifications_select" on public.notifications;
create policy "notifications_select" on public.notifications for select
  using (owner_id = auth.uid() or public.is_staff());
drop policy if exists "notifications_update" on public.notifications;
create policy "notifications_update" on public.notifications for update
  using (owner_id = auth.uid() or public.is_staff());
drop policy if exists "notifications_write_staff" on public.notifications;
create policy "notifications_write_staff" on public.notifications for insert
  with check (public.is_staff());

-- ── Index utiles ────────────────────────────────────────────────────────────
create index if not exists idx_projects_owner    on public.projects(owner_id);
create index if not exists idx_documents_owner    on public.documents(owner_id);
create index if not exists idx_demandes_owner     on public.demandes(owner_id);
create index if not exists idx_activity_owner     on public.activity(owner_id);
create index if not exists idx_steps_project      on public.project_steps(project_id);

-- ============================================================================
--  BACKFILL : crée un profil pour tout utilisateur auth déjà existant
--  (ceux créés avant l'installation du trigger).
-- ============================================================================
insert into public.profiles (id, email, role, prenom, nom, entreprise, telephone)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data->>'role', 'client'),
  u.raw_user_meta_data->>'prenom',
  u.raw_user_meta_data->>'nom',
  u.raw_user_meta_data->>'entreprise',
  u.raw_user_meta_data->>'telephone'
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null;

-- ============================================================================
--  FIN. Étape suivante : crée ton premier compte ADMIN.
--  1) Dans Supabase → Authentication → Users → Add user (email + mot de passe).
--  2) Récupère son UUID, puis exécute :
--       update public.profiles set role = 'admin' where id = '<UUID>';
--  Ce compte admin pourra ensuite créer les comptes clients depuis /admin.
-- ============================================================================
