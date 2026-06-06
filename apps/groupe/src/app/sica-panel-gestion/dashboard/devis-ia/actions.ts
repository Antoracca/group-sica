"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import { createClient } from "@/espace/lib/supabase/server";

/*
  Server actions de la console Devis IA.
  Toutes les opérations passent par le client admin (service_role) côté serveur.
  L'identité du correcteur est lue depuis la session via createClient().
*/

async function currentStaffId(): Promise<string | null> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  return auth.user?.id ?? null;
}

/* ── Mise à jour d'une ligne du devis (édition inline) ───────────────────── */
export async function updateDevisLine(input: {
  generationId: string;
  lotCode: string;
  sousLotCode: string;
  ligneIndex: number;
  field: "quantite" | "pu" | "designation";
  value: string | number;
}) {
  const admin = createAdminClient();
  if (!admin) return { error: "Supabase non configuré." };
  const staffId = await currentStaffId();

  // Récupère le devis
  const { data: gen, error: fetchErr } = await admin
    .from("devis_ai_generations")
    .select("devis")
    .eq("id", input.generationId)
    .single();
  if (fetchErr || !gen) return { error: fetchErr?.message ?? "Devis introuvable." };

  // Clone + applique la modification
  const devis = JSON.parse(JSON.stringify(gen.devis)) as {
    lots: Array<{
      code: string;
      sousLots: Array<{
        code: string;
        lignes: Array<{ designation: string; quantite: number; pu: number; montant: number }>;
        sousTotal: number;
      }>;
      total: number;
    }>;
    totalGrosOeuvre: number;
    totalSecondOeuvre: number;
    totalHT: number;
    ratioFcfaM2: number;
    meta: { surface_m2: number };
  };

  const lot = devis.lots.find((l) => l.code === input.lotCode);
  const sl = lot?.sousLots.find((s) => s.code === input.sousLotCode);
  const ligne = sl?.lignes[input.ligneIndex];
  if (!lot || !sl || !ligne) return { error: "Ligne introuvable." };

  const before =
    input.field === "designation"
      ? String(ligne.designation)
      : String(ligne[input.field]);

  if (input.field === "designation") {
    ligne.designation = String(input.value);
  } else {
    const n = Number(input.value);
    if (!Number.isFinite(n) || n < 0) return { error: "Valeur invalide." };
    ligne[input.field] = n;
  }
  ligne.montant = Math.round(ligne.quantite * ligne.pu);

  // Re-calcule sous-totaux / totaux
  sl.sousTotal = sl.lignes.reduce((acc, l) => acc + l.montant, 0);
  lot.total = lot.sousLots.reduce((acc, s) => acc + s.sousTotal, 0);
  devis.totalGrosOeuvre = devis.lots.find((l) => l.code === "A")?.total ?? 0;
  devis.totalSecondOeuvre = devis.lots.find((l) => l.code === "B")?.total ?? 0;
  devis.totalHT = devis.totalGrosOeuvre + devis.totalSecondOeuvre;
  devis.ratioFcfaM2 = devis.meta.surface_m2 > 0
    ? Math.round(devis.totalHT / devis.meta.surface_m2)
    : 0;

  // Sauve la nouvelle version + la correction (audit)
  const { error: updErr } = await admin
    .from("devis_ai_generations")
    .update({
      devis,
      total_ht: devis.totalHT,
      ratio_fcfa_m2: devis.ratioFcfaM2,
      status: "reviewed",
      reviewed_at: new Date().toISOString(),
      reviewed_by: staffId,
    })
    .eq("id", input.generationId);
  if (updErr) return { error: updErr.message };

  await admin.from("devis_ai_corrections").insert({
    generation_id: input.generationId,
    lot_code: input.lotCode,
    sous_lot_code: input.sousLotCode,
    ligne_index: input.ligneIndex,
    field: input.field,
    before_value: before,
    after_value: String(input.value),
    created_by: staffId,
  });

  revalidatePath(`/sica-panel-gestion/dashboard/devis-ia/${input.generationId}`);
  revalidatePath(`/sica-panel-gestion/dashboard/devis-ia`);
  return { ok: true };
}

/* ── Change le statut d'une génération ──────────────────────────────────── */
export async function setGenerationStatus(input: {
  generationId: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}) {
  const admin = createAdminClient();
  if (!admin) return { error: "Supabase non configuré." };
  const staffId = await currentStaffId();

  const { error } = await admin
    .from("devis_ai_generations")
    .update({
      status: input.status,
      reviewed_at: new Date().toISOString(),
      reviewed_by: staffId,
    })
    .eq("id", input.generationId);
  if (error) return { error: error.message };

  revalidatePath(`/sica-panel-gestion/dashboard/devis-ia/${input.generationId}`);
  revalidatePath(`/sica-panel-gestion/dashboard/devis-ia`);
  return { ok: true };
}

/* ── Suppression d'une génération ───────────────────────────────────────── */
export async function deleteGeneration(generationId: string) {
  const admin = createAdminClient();
  if (!admin) return { error: "Supabase non configuré." };
  const { error } = await admin
    .from("devis_ai_generations")
    .delete()
    .eq("id", generationId);
  if (error) return { error: error.message };
  revalidatePath(`/sica-panel-gestion/dashboard/devis-ia`);
  redirect(`/sica-panel-gestion/dashboard/devis-ia`);
}
