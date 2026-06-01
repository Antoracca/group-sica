import type { Metadata } from "next";
import { createInitialDevisState } from "@/lib/devis/state";
import { DevisSimulator } from "./devis-simulator";

export const metadata: Metadata = {
  title: "Simulateur de devis",
  description:
    "Constituez votre devis SICA Construction en temps réel : corps d'état, options, conditions, document prêt à imprimer.",
};

export default async function DevisPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; surface?: string; locality?: string }>;
}) {
  const { type, surface, locality } = await searchParams;
  const initialState = createInitialDevisState({ type, surface, locality });

  return (
    <main id="main-content">
      <DevisSimulator initialState={initialState} />
    </main>
  );
}
