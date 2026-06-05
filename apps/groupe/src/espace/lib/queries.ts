import type { SupabaseClient } from "@supabase/supabase-js";
import type { Project, Document, Ticket, NotificationItem } from "./types";
import { createAdminClient } from "./supabase/admin";

/* Couche de mapping : lignes Supabase → types de l'app. Aucune donnée mock. */

export interface ProfileRow {
  id: string;
  role: "client" | "staff" | "admin";
  prenom: string | null;
  nom: string | null;
  entreprise: string | null;
  email: string | null;
  telephone: string | null;
  ville: string | null;
  must_change_password: boolean;
}

export async function getProfile(supabase: SupabaseClient): Promise<ProfileRow | null> {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;

  const admin = createAdminClient();
  const { data } = await admin
    .from("profiles")
    .select("*")
    .eq("id", auth.user.id)
    .maybeSingle();

  if (data) return data as ProfileRow;

  const meta = (auth.user.user_metadata ?? {}) as Record<string, string | undefined>;
  const payload = {
    id: auth.user.id,
    email: auth.user.email ?? null,
    role: meta.role ?? "client",
    prenom: meta.prenom ?? null,
    nom: meta.nom ?? null,
    entreprise: meta.entreprise ?? null,
    telephone: meta.telephone ?? null,
  };

  const { data: created } = await admin
    .from("profiles")
    .upsert(payload, { onConflict: "id" })
    .select("*")
    .maybeSingle();

  return (created as ProfileRow) ?? null;
}

export async function getSuivis(supabase: SupabaseClient): Promise<Project[]> {
  const { data } = await supabase
    .from("projects")
    .select("*, project_steps(*)")
    .order("updated_at", { ascending: false });
  return (data ?? []).map((p): Project => ({
    id: p.id,
    pole: p.pole,
    type: p.type,
    titre: p.titre,
    reference: p.reference ?? null,
    localisation: p.localisation ?? null,
    pos_lat: p.pos_x ? Number(p.pos_x) : null,
    pos_lng: p.pos_y ? Number(p.pos_y) : null,
    statut: p.statut,
    avancement: p.avancement ?? 0,
    budget_prevu: p.budget_prevu ?? 0,
    budget_depense: p.budget_depense ?? 0,
    date_debut: p.date_debut ?? null,
    date_fin_prevue: p.date_fin_prevue ?? null,
    prochaine_etape: p.prochaine_etape ?? null,
    updated_at: p.updated_at,
    etapes: (p.project_steps ?? [])
      .slice()
      .sort((a: any, b: any) => a.ordre - b.ordre)
      .map((e: any) => ({
        id: e.id,
        label: e.label,
        statut: e.statut,
        date_prevue: e.date_prevue ?? undefined,
        date_realise: e.date_realise ?? undefined,
      })),
  }));
}

export async function getDocuments(supabase: SupabaseClient): Promise<Document[]> {
  const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
  return (data ?? []).map((d): Document => ({
    id: d.id,
    pole: d.pole,
    type: d.type,
    titre: d.titre,
    reference: d.reference ?? null,
    montant: Number(d.montant ?? 0),
    file_url: d.file_url ?? "",
    version: d.version ?? 1,
    statut: d.statut,
    doc_date: d.doc_date ?? d.created_at,
    signed_at: d.signed_at ?? null,
  }));
}

export async function getDemandes(supabase: SupabaseClient): Promise<Ticket[]> {
  const { data } = await supabase.from("tickets").select("*").order("created_at", { ascending: false });
  return (data ?? []).map((d): Ticket => ({
    id: d.id,
    pole: d.pole,
    sujet: d.sujet ?? d.objet ?? "Sans sujet",
    description: d.description ?? "",
    priorite: d.priorite ?? "moyenne",
    statut: d.statut ?? "nouvelle",
    created_at: d.created_at,
    updated_at: d.updated_at ?? d.created_at,
  }));
}

export async function getActivity(supabase: SupabaseClient): Promise<NotificationItem[]> {
  const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(8);
  return (data ?? []).map((a): NotificationItem => ({
    id: a.id,
    type: a.type ?? "system",
    titre: a.titre ?? "Notification",
    corps: a.corps ?? null,
    action_url: a.action_url ?? null,
    is_read: a.is_read ?? false,
    created_at: a.created_at,
  }));
}
