import type { ReactNode } from "react";
import { createClient } from "@/espace/lib/supabase/server";
import { signOut } from "@/espace/lib/actions";
import { getProfile, getSuivis, getDocuments, getDemandes, getActivity } from "@/espace/lib/queries";
import { AppShell } from "@/espace/components/app-shell";

export default async function AppGroupLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const profile = await getProfile(supabase);

  // Le middleware garantit qu'on est authentifié ici. Si le profil manque encore
  // (RLS non appliquée), on affiche un écran clair — JAMAIS de redirection en boucle.
  if (!profile) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-mist/40 px-6 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-xl font-bold text-ink">Compte en cours de configuration</h1>
          <p className="mt-2 text-sm text-slate">
            Votre profil n&apos;est pas encore initialisé. Exécutez le script Supabase
            (<code className="font-mono text-xs">docs/supabase/schema.sql</code>) puis reconnectez-vous,
            ou contactez votre interlocuteur SICA.
          </p>
          <form action={signOut} className="mt-5">
            <button className="min-h-[44px] rounded-full bg-brand-royal px-5 text-sm font-semibold text-white">
              Se déconnecter
            </button>
          </form>
        </div>
      </main>
    );
  }

  const [suivis, documents, demandes, activite] = await Promise.all([
    getSuivis(supabase),
    getDocuments(supabase),
    getDemandes(supabase),
    getActivity(supabase),
  ]);

  return (
    <AppShell data={{ profile, suivis, documents, demandes, activite }}>
      {children}
    </AppShell>
  );
}
