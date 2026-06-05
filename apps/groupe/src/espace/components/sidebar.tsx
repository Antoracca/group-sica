"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@sica/ui";
import { NAV_ITEMS } from "@/espace/lib/nav";
import { useData } from "@/espace/lib/data-context";
import { signOut } from "@/espace/lib/actions";
import { usePole } from "@/espace/lib/pole-context";

function isActive(pathname: string, href: string) {
  return href === "/espace" ? pathname === "/espace" : pathname.startsWith(href);
}

function initials(prenom: string | null, nom: string | null) {
  return `${(prenom?.[0] ?? "").toUpperCase()}${(nom?.[0] ?? "").toUpperCase()}` || "SI";
}

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useData();
  const { pole } = usePole();

  // Filter based on selected pole in the navbar
  const filteredNav = NAV_ITEMS.filter((item) => !item.poles || item.poles.includes(pole));

  return (
    <aside className="hidden w-[320px] shrink-0 flex-col border-r border-zinc-200 bg-white lg:flex">
      {/* Header / Logo Huge */}
      <div className="flex h-20 items-center px-6">
        <Link href="/espace">
          <Image src="/logo-groupe.png" alt="Groupe SICA" width={220} height={60} className="h-10 w-auto object-contain" priority />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-4 pt-6 overflow-y-auto" aria-label="Navigation principale">
        {filteredNav.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex h-12 items-center justify-between rounded-lg px-4 text-base font-semibold transition-all duration-200",
                active 
                  ? "bg-brand-royal/10 text-brand-royal" 
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("size-5 shrink-0 transition-colors", active ? "text-brand-royal" : "text-zinc-400 group-hover:text-zinc-600")} aria-hidden />
                {item.label}
              </div>
              {item.badge && (
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide", active ? "bg-brand-royal text-white" : "bg-zinc-200 text-zinc-700")}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile Huge */}
      <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
        <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-royal/10 text-lg font-bold text-brand-royal border border-brand-royal/20">
            {initials(profile.prenom, profile.nom)}
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="truncate text-base font-bold text-zinc-900">
              {[profile.prenom, profile.nom].filter(Boolean).join(" ") || "Mon compte"}
            </p>
            <p className="truncate text-sm font-medium text-zinc-500">{profile.entreprise ?? profile.email}</p>
          </div>
          <form action={signOut} className="shrink-0">
            <button
              type="submit"
              aria-label="Se déconnecter"
              className="flex size-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:ring-4 focus:ring-red-500/20"
            >
              <LogOut className="size-5" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
