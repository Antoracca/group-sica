"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Database,
  FileText,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Users,
} from "lucide-react";

const ADMIN_NAV_ITEMS = [
  { href: "/sica-panel-gestion/dashboard", label: "Pilotage", icon: LayoutDashboard },
  { href: "/sica-panel-gestion/dashboard/clients", label: "Clients", icon: Users },
  { href: "/sica-panel-gestion/dashboard/projets", label: "Projets", icon: FolderKanban },
  { href: "/sica-panel-gestion/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/sica-panel-gestion/dashboard/demandes", label: "Demandes", icon: Inbox },
  { href: "/sica-panel-gestion/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/sica-panel-gestion/dashboard/modules", label: "Modules", icon: Database },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/sica-panel-gestion/dashboard") return pathname === href;
  return pathname.startsWith(href);
}

export function AdminSidebarNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigation admin" className={`space-y-1 ${className}`}>
      {ADMIN_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition-colors",
              active
                ? "bg-[#1E2F8A] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-[#1E2F8A]",
            ].join(" ")}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation admin mobile"
      className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
    >
      {ADMIN_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3 text-xs font-bold transition-colors",
              active
                ? "border-[#1E2F8A] bg-[#1E2F8A] text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-[#1E2F8A]/30 hover:text-[#1E2F8A]",
            ].join(" ")}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}


