import { NextResponse, type NextRequest } from "next/server";
import { analyzePlan } from "@sica/devis-ai";
import { generateDevis, type PlanInput } from "@sica/devis-engine";
import { createAdminClient } from "@/lib/supabase-admin";

/*
  POST /api/devis-auto
  Form-data : "plan" = fichier PDF (≤ 15 Mo) ; "email" (optionnel).
  Pipeline :
    1. Agent vision (Gemini) → JSON pivot.
    2. Moteur déterministe → DQE.
    3. Persistance dans devis_ai_generations (best-effort, ne bloque pas).
*/

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 15 * 1024 * 1024;

function makeRef(date: Date = new Date()): string {
  const y = date.getFullYear();
  const seq = String(Math.floor(date.getTime() / 1000) % 10000).padStart(4, "0");
  return `SICA-DVIA-${y}-${seq}`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Clé GEMINI_API_KEY manquante côté serveur." },
      { status: 500 },
    );
  }

  let buffer: Buffer;
  let fileName = "plan.pdf";
  let fileSize = 0;
  let email: string | null = null;
  let uploadedFilePath: string | null = null;

  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    // Nouveau flux : Le frontend a uploadé le fichier sur Supabase Storage
    try {
      const body = await req.json();
      if (!body.filePath) {
        return NextResponse.json({ error: 'Champ "filePath" requis en JSON.' }, { status: 400 });
      }
      uploadedFilePath = body.filePath;
      email = body.email || null;

      const admin = createAdminClient();
      if (!admin) {
        return NextResponse.json({ error: "Supabase non configuré côté serveur." }, { status: 500 });
      }

      const { data, error } = await admin.storage.from("plans").download(uploadedFilePath!);
      if (error || !data) {
        return NextResponse.json({ error: `Fichier introuvable sur Supabase: ${error?.message}` }, { status: 404 });
      }

      buffer = Buffer.from(await data.arrayBuffer());
      fileName = uploadedFilePath.split("/").pop() || "plan.pdf";
      fileSize = buffer.length;
    } catch (e) {
      return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
    }
  } else {
    // Ancien flux : FormData direct
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json({ error: "Form-data invalide." }, { status: 400 });
    }

    const file = form.get("plan");
    email = (form.get("email") as string | null)?.trim() || null;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Champ "plan" (PDF) requis.' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 15 Mo)." }, { status: 413 });
    }
    if (file.type && !file.type.includes("pdf")) {
      return NextResponse.json({ error: "Format non supporté. Veuillez fournir un PDF." }, { status: 415 });
    }

    buffer = Buffer.from(await file.arrayBuffer());
    fileName = file.name;
    fileSize = file.size;
  }

  const t0 = Date.now();

  let plan: PlanInput;
  try {
    plan = await analyzePlan(buffer, {
      provider: "gemini",
      apiKey,
      model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur de lecture du plan.";
    return NextResponse.json({ error: `Lecture du plan : ${message}` }, { status: 502 });
  }

  const devis = generateDevis(plan);
  const durationMs = Date.now() - t0;
  const reference = makeRef();

  const admin = createAdminClient();
  if (admin) {
    // Persistance best-effort dans Supabase
    const { error } = await admin.from("devis_ai_generations").insert({
      reference,
      source: "public",
      client_email: email,
      pdf_name: fileName,
      pdf_size: fileSize,
      plan,
      devis,
      total_ht: devis.totalHT,
      ratio_fcfa_m2: devis.ratioFcfaM2,
      surface_m2: devis.meta.surface_m2,
      standing: devis.meta.standing,
      duration_ms: durationMs,
    });
    if (error) {
      console.warn("[devis-auto] persistance Supabase échouée :", error.message);
    }

    // Nettoyage du fichier du bucket s'il venait de Supabase Storage
    if (uploadedFilePath) {
      const { error: rmError } = await admin.storage.from("plans").remove([uploadedFilePath]);
      if (rmError) {
        console.warn("[devis-auto] impossible de supprimer le fichier temporaire :", rmError.message);
      }
    }
  }

  return NextResponse.json({ plan, devis, durationMs, reference });
}
