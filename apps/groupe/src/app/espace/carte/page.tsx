import { createClient } from "@/espace/lib/supabase/server";
import { getSuivis } from "@/espace/lib/queries";
import { MapView } from "@/espace/components/map-view";

export const metadata = {
  title: "Carte des projets | SICA",
};

export default async function CartePage() {
  const supabase = await createClient();
  const suivis = await getSuivis(supabase);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl bg-white p-6 border border-zinc-200 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Carte des projets</h1>
        <p className="mt-2 text-lg text-zinc-500">
          Vue satellite interactive de l'ensemble de vos chantiers et sites d'intervention.
        </p>
      </div>

      <div className="w-full h-[800px] rounded-3xl overflow-hidden border-4 border-white shadow-xl ring-1 ring-zinc-200 relative">
        <MapView initialProjects={suivis} />
      </div>
    </div>
  );
}
