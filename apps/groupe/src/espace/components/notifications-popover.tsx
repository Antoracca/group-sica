"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Activity, Folder, FileText, DollarSign, Ticket } from "lucide-react";
import { cn } from "@sica/ui";
import type { NotificationItem, NotificationType } from "@/espace/lib/types";

// Mock data pour les notifications
const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    type: "document",
    titre: "Nouveau contrat à signer",
    corps: "Le contrat pour le projet Résidence Les Cèdres est prêt.",
    action_url: "/espace/documents",
    is_read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    type: "ticket",
    titre: "Mise à jour de votre demande",
    corps: "Votre demande 'Modification de budget' est en cours de traitement.",
    action_url: "/espace/demandes",
    is_read: false,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    type: "finance",
    titre: "Facture émise",
    corps: "La facture F-2026-06 a été émise.",
    action_url: "/espace/finance",
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const ICONS: Record<NotificationType, React.ElementType> = {
  system: Activity,
  project: Folder,
  document: FileText,
  finance: DollarSign,
  ticket: Ticket,
};

const ICON_COLORS: Record<NotificationType, string> = {
  system: "text-zinc-600 bg-zinc-100",
  project: "text-brand-royal bg-brand-royal/10",
  document: "text-amber-600 bg-amber-100",
  finance: "text-emerald-600 bg-emerald-100",
  ticket: "text-purple-600 bg-purple-100",
};

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "À l'instant";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Il y a ${diffInHours} h`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `Il y a ${diffInDays} j`;
}

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function markAllAsRead() {
    setNotifications(notifications.map((n) => ({ ...n, is_read: true })));
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all hover:bg-zinc-50 focus:ring-4 focus:ring-brand-royal/10",
          isOpen && "bg-zinc-50 border-zinc-300"
        )}
        aria-label="Notifications"
      >
        <Bell className="size-5 text-zinc-600" />
        {unreadCount > 0 && (
          <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl z-50 animate-in fade-in zoom-in-95 origin-top-right">
          <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-5 py-4">
            <h3 className="font-bold text-zinc-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-bold text-brand-royal hover:underline"
              >
                Tout marquer comme lu
              </button>
            )}
          </div>
          <div className="max-h-[450px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-zinc-500">
                Aucune notification.
              </div>
            ) : (
              <div className="flex flex-col">
                {notifications.map((notification) => {
                  const Icon = ICONS[notification.type];
                  return (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-4 border-b border-zinc-100 p-5 transition-colors last:border-0 hover:bg-zinc-50",
                        !notification.is_read && "bg-brand-royal/[0.02]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-full",
                          ICON_COLORS[notification.type]
                        )}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn("text-sm font-bold", !notification.is_read ? "text-zinc-900" : "text-zinc-600")}>
                            {notification.titre}
                          </p>
                          <span className="shrink-0 text-xs font-medium text-zinc-500">
                            {formatTimeAgo(notification.created_at)}
                          </span>
                        </div>
                        {notification.corps && (
                          <p className="text-sm text-zinc-600 leading-relaxed">
                            {notification.corps}
                          </p>
                        )}
                      </div>
                      {!notification.is_read && (
                        <div className="mt-1.5 size-2.5 shrink-0 rounded-full bg-brand-royal shadow-sm" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
