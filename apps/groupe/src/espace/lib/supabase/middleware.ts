import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/*
  Rafraîchit la session Supabase à chaque requête et garde les routes privées.
  Gère deux espaces indépendants :
  - /espace (client) ↔ /espace-client (login client)
  - /sica-panel-gestion/dashboard (admin) ↔ /sica-panel-gestion (login admin)
*/
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  /* ── Espace client ── */
  const isClientLogin = path === "/espace-client";
  const isClientDashboard = path === "/espace" || path.startsWith("/espace/");

  if (!user && isClientDashboard) {
    const url = request.nextUrl.clone();
    url.pathname = "/espace-client";
    return NextResponse.redirect(url);
  }

  if (user && isClientLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/espace";
    return NextResponse.redirect(url);
  }

  /* ── Panel admin ── */
  const isAdminLogin = path === "/sica-panel-gestion";
  const isAdminDashboard = path.startsWith("/sica-panel-gestion/dashboard");

  // Dashboard admin privé : non connecté → login admin.
  if (!user && isAdminDashboard) {
    const url = request.nextUrl.clone();
    url.pathname = "/sica-panel-gestion";
    return NextResponse.redirect(url);
  }

  // Note : on ne redirige PAS automatiquement un user connecté sur /sica-panel-gestion
  // vers le dashboard, car la page de login admin vérifie le rôle côté client
  // avant de rediriger. Cela empêche un client normal d'être redirigé vers l'admin.

  return response;
}
