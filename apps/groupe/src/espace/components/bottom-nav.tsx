"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@sica/ui";
import { NAV_ITEMS } from "@/espace/lib/nav";

function isActive(pathname: string, href: string) {
  return href === "/espace" ? pathname === "/espace" : pathname.startsWith(href);
}

export function BottomNav() {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((i) => i.mobile);

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.06] bg-background/90 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="flex min-h-[56px] flex-col items-center justify-center gap-1 px-1 pt-1.5"
              >
                <span
                  className={cn(
                    "flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                    active ? "bg-brand-royal/[0.12] text-brand-royal" : "text-slate",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span
                  className={cn(
                    "text-[0.62rem] font-medium leading-none",
                    active ? "text-brand-royal" : "text-slate",
                  )}
                >
                  {item.label.split(" ")[0]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
