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
  try {
    return await updateSession(request);
  } catch (err: any) {
    return new Response(`Middleware Error: ${err.message}`, { status: 500 });
  }
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
