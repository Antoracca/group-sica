import { type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "@/espace/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

/*
  Routes protégées (mono-langue, gérées par Supabase Auth) :
  - /espace, /espace/* → Espace client
  - /espace-client → Page de connexion client
  - /sica-panel-gestion, /sica-panel-gestion/* → Panel admin

  Tout le reste = pages publiques localisées (FR/EN) gérées par next-intl.
*/
const PROTECTED_ROUTES = [
  /^\/espace(\/.*)?$/,
  /^\/espace-client$/,
  /^\/sica-panel-gestion(\/.*)?$/,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PROTECTED_ROUTES.some((re) => re.test(pathname))) {
    try {
      return await updateSession(request);
    } catch (err: any) {
      return new Response(`Middleware Error: ${err.message}`, { status: 500 });
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Toutes les routes sauf API, internes Next et fichiers statiques.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
