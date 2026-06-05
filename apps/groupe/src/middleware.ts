import { type NextRequest } from "next/server";
import { updateSession } from "@/espace/lib/supabase/middleware";

/*
  Routes protégées :
  - /espace, /espace/* → Espace client
  - /espace-client → Page de connexion client
  - /sica-panel-gestion → Login admin
  - /sica-panel-gestion/* → Dashboard admin
*/
export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/espace",
    "/espace/:path*",
    "/espace-client",
    "/sica-panel-gestion",
    "/sica-panel-gestion/:path*",
  ],
};
