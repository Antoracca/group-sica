/*
  @sica/devis-ai — Couche d'orchestration des agents IA.

  Phase 2 : 1 seul provider (Gemini). L'API publique `analyzePlan` est
  agnostique du provider : on pourra brancher Claude / OpenAI plus tard sans
  toucher le code appelant.
*/

import type { PlanInput } from "@sica/devis-engine";
import { analyzePlanWithGemini } from "./gemini";

export type AIProvider = "gemini" | "claude" | "openai";

export interface AnalyzePlanOptions {
  provider?: AIProvider;
  apiKey: string;
  model?: string;
}

/**
 * Agent « Lecteur de plan » : PDF → JSON pivot {pièces, surfaces, standing…}.
 * Le chiffrage est ensuite produit par @sica/devis-engine (déterministe).
 */
export async function analyzePlan(
  pdfBuffer: Buffer | Uint8Array,
  opts: AnalyzePlanOptions,
): Promise<PlanInput> {
  const provider = opts.provider ?? "gemini";

  if (provider === "gemini") {
    return analyzePlanWithGemini(pdfBuffer, { apiKey: opts.apiKey, model: opts.model });
  }

  throw new Error(`Provider AI non encore implémenté : ${provider}`);
}

export { analyzePlanWithGemini };
