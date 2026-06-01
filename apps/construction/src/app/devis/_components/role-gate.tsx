"use client";

import { UserRound, ArrowRight, FileSignature } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import type { UserRole } from "@/lib/devis/types";

export function RoleGate({ onChoose }: { onChoose: (role: UserRole) => void }) {
  const [hovered, setHovered] = useState<UserRole | null>(null);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center px-4"
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="px-7 pb-1 pt-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-royal/10">
              <FileSignature className="size-7 text-brand-royal" />
            </div>

            <h2 className="font-display text-xl font-bold text-ink">
              Qui constitue ce devis ?
            </h2>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-slate">
              Sélectionnez votre profil pour continuer.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 px-7 pb-7 pt-5">
            {/* Client */}
            <button
              type="button"
              onClick={() => onChoose("client")}
              onMouseEnter={() => setHovered("client")}
              onMouseLeave={() => setHovered(null)}
              className={`group flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                hovered === "client"
                  ? "border-brand-amber/60 bg-brand-amber/[0.06] shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                hovered === "client" ? "bg-brand-amber/15 text-brand-amber" : "bg-slate-100 text-slate-500"
              }`}>
                <UserRound className="size-5" />
              </div>
              <div className="flex-1">
                <span className="font-display text-[0.95rem] font-semibold text-ink">Client</span>
                <p className="mt-0.5 text-[0.78rem] leading-snug text-slate">
                  Je remplis ma demande de devis et je télécharge le document.
                </p>
              </div>
              <ArrowRight className={`size-4 shrink-0 text-brand-amber transition-all duration-200 ${
                hovered === "client" ? "translate-x-0.5 opacity-100" : "opacity-0"
              }`} />
            </button>

            {/* Personnel SICA */}
            <button
              type="button"
              onClick={() => onChoose("staff")}
              onMouseEnter={() => setHovered("staff")}
              onMouseLeave={() => setHovered(null)}
              className={`group flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                hovered === "staff"
                  ? "border-brand-royal/50 bg-brand-royal/[0.05] shadow-sm"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden transition-colors duration-200 ${
                hovered === "staff" ? "bg-brand-royal/10" : "bg-slate-100"
              }`}>
                <Image
                  src="/logo-construction.png"
                  alt="SICA Construction"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <span className="font-display text-[0.95rem] font-semibold text-ink">Personnel SICA</span>
                <p className="mt-0.5 text-[0.78rem] leading-snug text-slate">
                  J&apos;établis le devis pour un client.
                </p>
              </div>
              <ArrowRight className={`size-4 shrink-0 text-brand-royal transition-all duration-200 ${
                hovered === "staff" ? "translate-x-0.5 opacity-100" : "opacity-0"
              }`} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
