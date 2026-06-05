import type { SupabaseClient } from "@supabase/supabase-js";
import type { ActiviteItem, Demande, Document, Suivi } from "./types";
import { createAdminClient } from "./supabase/admin";

/* Couche de mapping : lignes Supabase → types de l'app. Aucune donnée mock. */

function frDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

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
  /* 1. Vérifier l'authentification */
  const { data: auth, error: authError } = await supabase.auth.getUser();
  console.log("[getProfile] auth.getUser →", auth.user?.id ?? "NO USER", authError?.message ?? "OK");
  if (!auth.user) return null;

  /* 2. Lire le profil via le client ADMIN (contourne la RLS) */
  const admin = createAdminClient();
  const { data, error: selectError } = await admin
    .from("profiles")
    .select("*")
    .eq("id", auth.user.id)
    .maybeSingle();

  console.log("[getProfile] SELECT profiles →", data ? `role=${data.role}` : "NULL", selectError?.message ?? "OK");

  if (data) return data as ProfileRow;

  /* 3. Auto-réparation : profil introuvable → on le crée via le client admin */
  console.log("[getProfile] Profile missing — attempting auto-repair upsert via admin client...");
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
  console.log("[getProfile] Upsert payload →", JSON.stringify(payload));

  const { data: created, error: upsertError } = await admin
    .from("profiles")
    .upsert(payload, { onConflict: "id" })
    .select("*")
    .maybeSingle();

  console.log("[getProfile] UPSERT result →", created ? `role=${created.role}` : "NULL", upsertError?.message ?? "OK");

  return (created as ProfileRow) ?? null;
}

export async function getSuivis(supabase: SupabaseClient): Promise<Suivi[]> {
  const { data } = await supabase
    .from("projects")
    .select("*, project_steps(*)")
    .order("updated_at", { ascending: false });
  return (data ?? []).map((p): Suivi => ({
    id: p.id,
    pole: p.pole,
    type: p.type,
    titre: p.titre,
    reference: p.reference ?? "",
    localisation: p.localisation ?? "",
    x: Number(p.pos_x ?? 52),
    y: Number(p.pos_y ?? 56),
    statut: p.statut,
    avancement: p.avancement ?? 0,
    prochaineEtape: p.prochaine_etape ?? "",
    miseAJour: frDate(p.updated_at),
    photos: p.photos_count ?? 0,
    rapports: p.rapports_count ?? 0,
    etapes: (p.project_steps ?? [])
      .slice()
      .sort((a: { ordre: number }, b: { ordre: number }) => a.ordre - b.ordre)
      .map((e: { label: string; statut: Suivi["etapes"][number]["statut"]; date_label: string | null }) => ({
        label: e.label,
        statut: e.statut,
        date: e.date_label ?? undefined,
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
    reference: d.reference ?? "",
    montant: Number(d.montant ?? 0),
    date: frDate(d.doc_date),
    statut: d.statut,
  }));
}

export async function getDemandes(supabase: SupabaseClient): Promise<Demande[]> {
  const { data } = await supabase.from("demandes").select("*").order("created_at", { ascending: false });
  return (data ?? []).map((d): Demande => ({
    id: d.id,
    pole: d.pole,
    objet: d.objet,
    budget: d.budget ?? "À cadrer",
    localisation: d.localisation ?? "",
    recu: frDate(d.created_at),
    statut: d.statut,
    canal: d.canal,
  }));
}

export async function getActivity(supabase: SupabaseClient): Promise<ActiviteItem[]> {
  const { data } = await supabase.from("activity").select("*").order("created_at", { ascending: false }).limit(8);
  return (data ?? []).map((a): ActiviteItem => ({
    id: a.id,
    icon: a.icon,
    texte: a.texte,
    quand: frDate(a.created_at),
    pole: a.pole,
  }));
}
