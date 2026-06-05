import "server-only";
import { createClient } from "@supabase/supabase-js";

/*
  Client administrateur — clé SERVICE_ROLE. Contourne la RLS.
  À n'utiliser QUE dans des server actions / route handlers (jamais côté client).
  Sert à créer les comptes clients depuis l'espace administration.
*/
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
