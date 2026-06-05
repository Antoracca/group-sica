"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { NAV_ITEMS } from "@/espace/lib/nav";
import { useData } from "@/espace/lib/data-context";
import { BrandSwitcher } from "./brand-switcher";

function currentTitle(pathname: string): string {
  if (pathname.startsWith("/espace/chantiers/")) return "Détail du chantier";
  const item = NAV_ITEMS.find((i) => (i.href === "/espace" ? pathname === "/espace" : pathname.startsWith(i.href)));
  return item?.label ?? "Espace client";
}

export function AppBar() {
  const pathname = usePathname();
  const title = currentTitle(pathname);
  const { profile } = useData();
  const ini = `${(profile.prenom?.[0] ?? "").toUpperCase()}${(profile.nom?.[0] ?? "").toUpperCase()}` || "SI";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-black/[0.06] bg-background/80 px-4 backdrop-blur-xl sm:px-6">
      {/* Logo mobile */}
      <Image
        src="/logo-groupe.png"
        alt="Groupe SICA"
        width={110}
        height={34}
        className="h-7 w-auto lg:hidden"
        priority
      />

      {/* Titre desktop */}
      <h1 className="hidden font-display text-lg font-semibold tracking-[-0.01em] text-ink lg:block">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* Recherche desktop */}
        <label className="hidden items-center gap-2 rounded-full border border-black/[0.06] bg-mist/60 px-3.5 md:flex">
          <Search className="size-4 text-slate" aria-hidden />
          <input
            type="search"
            placeholder="Rechercher…"
            aria-label="Rechercher"
            className="h-9 w-40 bg-transparent text-sm text-ink outline-none placeholder:text-slate lg:w-52"
          />
        </label>

        <BrandSwitcher />

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-9 items-center justify-center rounded-full border border-black/[0.06] bg-white/70 text-ink transition-colors hover:bg-white"
        >
          <Bell className="size-4.5" aria-hidden />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-brand-amber ring-2 ring-background" aria-hidden />
        </button>

        {/* Avatar */}
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-royal font-display text-sm font-bold text-white">
          {ini}
        </span>
      </div>
    </header>
  );
}
