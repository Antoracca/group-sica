import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Bell,
  Building2,
  LogOut,
  Search,
  ShieldCheck,
} from "lucide-react";
import { createClient } from "@/espace/lib/supabase/server";
import { createAdminClient } from "@/espace/lib/supabase/admin";
import { AdminModuleCatalog } from "./admin-module-catalog";
import { AdminMobileNav, AdminSidebarNav } from "./admin-nav";
import { adminSignOut } from "./actions";

export default async function PanelDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/sica-panel-gestion");

  const admin = createAdminClient();
  const { data: me } = await admin
    .from("profiles")
    .select("role, prenom, nom, email")
    .eq("id", auth.user.id)
    .single();

  if (!me || (me.role !== "staff" && me.role !== "admin")) {
    redirect("/sica-panel-gestion");
  }

  const displayName = [me.prenom, me.nom].filter(Boolean).join(" ") || "Personnel SICA";

  return (
    <div className="min-h-[100dvh] bg-[#F5F7FB] text-[#101828]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
          <Image src="/logo-groupe.png" alt="Groupe SICA" width={160} height={64} className="h-12 w-auto" priority />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-900">
              <ShieldCheck className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em]">SICA Admin</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Centre de supervision interne pour clients, projets, documents et demandes.
            </p>
          </div>

          <AdminSidebarNav className="mt-6" />
          <AdminModuleCatalog />
        </div>

        <div className="border-t border-slate-200 bg-white p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Profil connecté
          </p>
          <div className="flex items-center gap-3 rounded-md bg-slate-50 p-3 ring-1 ring-slate-200">
            <span className="flex size-9 items-center justify-center rounded-md bg-slate-950 text-sm font-bold text-white">
              {displayName.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
              <p className="truncate text-xs text-slate-500">{me.role}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <Image src="/logo-groupe.png" alt="Groupe SICA" width={128} height={52} className="h-9 w-auto" />
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                Admin
              </span>
            </div>

            <div className="relative ml-auto hidden w-full max-w-md sm:block lg:ml-0">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Rechercher un client, projet, document..."
                className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#1E2F8A] focus:bg-white focus:ring-4 focus:ring-[#1E2F8A]/10"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex size-10 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <Bell className="size-4" />
              </button>
              <a
                href="https://groupe-sica.com"
                className="hidden min-h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 sm:inline-flex"
              >
                <Building2 className="size-4" />
                Site groupe
              </a>
              <form action={adminSignOut}>
                <button
                  type="submit"
                  className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#101828] px-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-white lg:hidden">
          <AdminMobileNav />
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}


