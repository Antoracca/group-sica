import { GoogleGenAI, Type, type Schema } from "@google/genai";
import type { PlanInput, Standing, WallMaterial, Roof, PieceType } from "@sica/devis-engine";

/*
  Agent-vision « Lecteur de plan » — Gemini 2.5.
  Lit un plan d'architecture SICA (PDF), produit un PlanInput JSON typé via
  responseSchema (sortie structurée garantie). Aucun coût flottant ici : le
  chiffrage final reste à @sica/devis-engine.
*/

/*
  Schéma de sortie OpenAPI passé à Gemini. ResponseSchema force le modèle à
  rendre EXACTEMENT cette forme — la sortie est ensuite re-validée côté TS.
*/
const PIECE_TYPES: PieceType[] = [
  "chambre", "sejour", "cuisine", "sdb", "wc", "douche", "terrasse", "veranda", "couloir", "autre",
];

const PLAN_SCHEMA: Schema = {
  type: Type.OBJECT,
  required: [
    "niveaux", "standing", "surfaceHabitable_m2", "pieces",
    "materiauMur", "toiture",
  ],
  properties: {
    niveaux: {
      type: Type.INTEGER,
      description: "1 = plain-pied (RDC seul), 2 = R+1, 3 = R+2, etc.",
    },
    standing: {
      type: Type.STRING,
      enum: ["eco", "moyen", "haut", "premium"] as Standing[],
      description:
        "Niveau de standing déduit du plan : 'eco' (basique, tôle ondulée), 'moyen' (villa standard, faux-plafond CP), 'haut' (faux-plafond staff, tuile, finitions soignées), 'premium' (dalle pleine, vitrage, inox, split, étanchéité asphalte).",
    },
    surfaceHabitable_m2: {
      type: Type.NUMBER,
      description: "Somme des surfaces couvertes en m² (pièces fermées + sejour ; exclut cour, parking, terrasses non couvertes).",
    },
    pieces: {
      type: Type.ARRAY,
      description: "Liste de chaque pièce identifiée sur le plan avec son nom exact, son type et sa surface en m².",
      items: {
        type: Type.OBJECT,
        required: ["type", "surface_m2"],
        properties: {
          nom: { type: Type.STRING, description: "Nom tel qu'écrit sur le plan (ex: 'Chambre principale', 'Salon', 'Cuisine moderne')." },
          type: {
            type: Type.STRING,
            enum: PIECE_TYPES,
            description: "Type normalisé. 'sejour' = salon/salle à manger. 'sdb' = salle de bain. Une simple 'douche' isolée = 'douche'. Cour, parking, jardin = 'autre'.",
          },
          surface_m2: { type: Type.NUMBER, description: "Surface annotée sur le plan en m². Lire le chiffre exact." },
        },
      },
    },
    perimetre_m: {
      type: Type.NUMBER,
      description: "Périmètre approximatif des murs porteurs en mètres linéaires. Estimer si non coté.",
    },
    hauteurSousPlafond_m: { type: Type.NUMBER, description: "Hauteur sous plafond en mètres (3.0 si non indiquée)." },
    materiauMur: {
      type: Type.STRING,
      enum: ["geobeton", "geobeton18", "agglo-creux", "agglo-plein"] as WallMaterial[],
      description: "Géobéton (BTC, brique de terre comprimée — signature SICA) si le plan/légende l'indique ; sinon agglo creux par défaut.",
    },
    toiture: {
      type: Type.STRING,
      enum: ["tole-ondulee", "tole-bac", "tuile", "dalle"] as Roof[],
      description: "Type de couverture déduit du plan ou de la vue 3D associée (tuile = villa standing, dalle = toit-terrasse / R+1).",
    },
    indicesStanding: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Indices visuels relevés sur le plan justifiant le standing (ex: 'faux-plafond staff', 'vitrage grandes baies', 'split', 'inox', 'dalle pleine').",
    },
  },
};

const SYSTEM_INSTRUCTION = `Tu es l'agent « Lecteur de plan » de SICA Construction, expert en lecture de plans d'architecture en Côte d'Ivoire.

Tâche : à partir du plan PDF fourni, extraire un JSON strictement conforme au schéma demandé.

Règles strictes :
1. Lis les LABELS écrits sur le plan (CHAMBRE PRINCIPALE, SALON, CUISINE, SALLE D'EAU, WC, DOUCHE, TERRASSE, VÉRANDA, COUR, …) et les SURFACES annotées à côté (« 26,42 m² », « 8,10 m² », …).
2. Convertis chaque virgule décimale française en point (26,42 → 26.42).
3. La « surface habitable » = somme des surfaces des pièces couvertes (chambres + séjour/salon + cuisine + sanitaires + couloirs). Cour, parking, jardin et terrasses non couvertes ne comptent PAS.
4. Le standing se déduit visuellement :
   - eco : maison simple, tôle ondulée, peu de pièces, sans terrasse aménagée
   - moyen : villa F3/F4 standard, faux-plafond CP, tôle ou tuile
   - haut : faux-plafond staff visible, terrasse dalle, finitions cuisine soignées, baies vitrées
   - premium : R+1 ou dalle pleine, grandes baies vitrées, garde-corps inox, split clim, étanchéité toit-terrasse
5. Compte le nombre de niveaux (RDC = 1, R+1 = 2, etc.) en regardant la légende ou les escaliers.
6. Si une info n'est pas visible, donne une estimation raisonnable et signale-la dans indicesStanding.
7. NE PROPOSE PAS DE PRIX. Tu décris le plan, point.

Ta sortie sera utilisée par le moteur de chiffrage déterministe de SICA.`;

export interface GeminiAnalyzeOptions {
  apiKey: string;
  model?: string;
}

export async function analyzePlanWithGemini(
  pdfBuffer: Buffer | Uint8Array,
  opts: GeminiAnalyzeOptions,
): Promise<PlanInput> {
  const ai = new GoogleGenAI({ apiKey: opts.apiKey });
  const model = opts.model ?? "gemini-2.5-flash";

  const base64 = Buffer.from(pdfBuffer).toString("base64");

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType: "application/pdf", data: base64 } },
          { text: "Lis ce plan SICA et produis le JSON conforme au schéma." },
        ],
      },
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: PLAN_SCHEMA,
      temperature: 0.1,
    },
  });

  const text = response.text;
  if (!text) throw new Error("Gemini n'a renvoyé aucune réponse.");

  const parsed = JSON.parse(text) as PlanInput;
  return parsed;
}
