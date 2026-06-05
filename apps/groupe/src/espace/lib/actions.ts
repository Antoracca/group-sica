"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";
import { createAdminClient } from "./supabase/admin";

/* ── Déconnexion ─────────────────────────────────────────────────────────── */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/espace-client");
}

/* ── Signer un document (client, sur les siens) ──────────────────────────── */
export async function signDocument(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("documents")
    .update({ statut: "signe", signed_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/espace/documents");
  revalidatePath("/espace");
  return { ok: true };
}

/* ── Mettre à jour son profil ────────────────────────────────────────────── */
export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { error: "Non authentifié." };

  const patch = {
    prenom: String(formData.get("prenom") ?? ""),
    nom: String(formData.get("nom") ?? ""),
    telephone: String(formData.get("telephone") ?? ""),
    entreprise: String(formData.get("entreprise") ?? ""),
  };
  const { error } = await supabase.from("profiles").update(patch).eq("id", auth.user.id);
  if (error) return { error: error.message };
  revalidatePath("/espace/parametres");
  return { ok: true };
}

/* ── Changer son mot de passe ────────────────────────────────────────────── */
export async function changePassword(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (password.length < 8) return { error: "Le mot de passe doit faire au moins 8 caractères." };

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { error: "Non authentifié." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };
  await supabase.from("profiles").update({ must_change_password: false }).eq("id", auth.user.id);
  revalidatePath("/espace/parametres");
  return { ok: true };
}

/* ── ADMIN : créer un compte client ──────────────────────────────────────── */
export async function adminCreateClient(formData: FormData) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return { error: "Non authentifié." };

  const { data: me } = await supabase.from("profiles").select("role").eq("id", auth.user.id).single();
  if (!me || (me.role !== "staff" && me.role !== "admin")) {
    return { error: "Action réservée au personnel SICA." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const prenom = String(formData.get("prenom") ?? "");
  const nom = String(formData.get("nom") ?? "");
  const entreprise = String(formData.get("entreprise") ?? "");
  const telephone = String(formData.get("telephone") ?? "");
  const seed = formData.get("seed") === "on";

  if (!email || password.length < 8) {
    return { error: "Email requis et mot de passe d'au moins 8 caractères." };
  }

  const admin = createAdminClient();
  const { data: created, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "client", prenom, nom, entreprise, telephone },
  });
  if (error || !created.user) return { error: error?.message ?? "Création impossible." };

  const uid = created.user.id;

  if (seed) {
    await admin.from("projects").insert([
      {
        owner_id: uid, pole: "construction", type: "chantier",
        titre: "Villa — gros œuvre", reference: "SICA-CH-2026-001",
        localisation: "Cocody, Abidjan", statut: "En cours", avancement: 35,
        prochaine_etape: "Coulage des fondations", photos_count: 4, rapports_count: 1,
      },
      {
        owner_id: uid, pole: "assistance", type: "dossier",
        titre: "Création d'entreprise — SARL", reference: "SICA-AS-2026-001",
        localisation: "Abidjan", statut: "En cours", avancement: 60,
        prochaine_etape: "Dépôt au guichet RCCM", photos_count: 0, rapports_count: 2,
      },
    ]);
    await admin.from("documents").insert([
      {
        owner_id: uid, pole: "construction", type: "Devis",
        titre: "Devis estimatif — gros œuvre", reference: "SICA-DV-2026-001",
        montant: 24_000_000, statut: "a-signer",
      },
    ]);
    await admin.from("demandes").insert([
      {
        owner_id: uid, pole: "construction", objet: "Extension d'une villa",
        budget: "15 à 25 M FCFA", localisation: "Cocody", statut: "nouvelle",
      },
    ]);
    await admin.from("activity").insert([
      { owner_id: uid, icon: "document", texte: "Un devis attend votre signature", pole: "construction" },
      { owner_id: uid, icon: "chantier", texte: "Votre chantier a démarré", pole: "construction" },
    ]);
  }

  revalidatePath("/espace/admin");
  return { ok: true, email };
}
