import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
  Client Supabase service_role pour Construction (côté serveur uniquement).
  Utilisé pour persister les générations IA et leurs corrections.

  Renvoie null si les variables d'env ne sont pas configurées — la
  persistance devient alors silencieusement optionnelle (la génération
  fonctionne malgré tout).
*/
export function createAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
