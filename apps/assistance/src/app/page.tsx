"use client";

import * as React from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────────────────
   SICA ASSISTANCE — Page "Bientôt disponible"
   Palette : Navy profond #0B1120 · Royal Blue #1E2F8A · Ambre #F39200 · Blanc
   Typographie : Sora (display) · Inter (body)
───────────────────────────────────────────────────────────────────────────── */

export default function AssistancePage() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    /* TODO: brancher sur Supabase / Resend en production */
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">

      {/* ── Halos d'ambiance ───────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Bleu royal — haut gauche */}
        <div
          className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30,47,138,0.55) 0%, transparent 65%)",
            filter: "blur(72px)",
          }}
        />
        {/* Ambre doux — bas droite */}
        <div
          className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(243,146,0,0.22) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        {/* Indigo centre */}
        <div
          className="absolute left-1/2 top-[30%] h-[420px] w-[420px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(44,71,197,0.18) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── Grille Blueprint légère ────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.028]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><path d='M60 0H0V60' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Header minimal ─────────────────────────────────────────────────── */}
      <header className="relative z-10 flex items-center justify-between px-6 py-7 sm:px-10 lg:px-14">
        <Image
          src="/logo-assistance.png"
          alt="SICA Assistance"
          width={220}
          height={88}
          className="h-12 w-auto sm:h-14"
          priority
        />
        <a
          href="https://groupesica.ci"
          className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:text-white"
        >
          Groupe SICA
          <span aria-hidden className="text-[#F39200]">↗</span>
        </a>
      </header>

      {/* ── Contenu principal ──────────────────────────────────────────────── */}
      <main
        id="main-content"
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-10"
      >
        {/* Badge statut */}
        <div
          className="mb-10 inline-flex items-center gap-2.5 rounded-full border px-4 py-2"
          style={{
            borderColor: "rgba(243,146,0,0.3)",
            background: "rgba(243,146,0,0.08)",
          }}
        >
          <span
            className="block h-2 w-2 rounded-full bg-[#F39200]"
            style={{ boxShadow: "0 0 8px rgba(243,146,0,0.7)" }}
          />
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#F39200]">
            En cours de déploiement
          </span>
        </div>

        {/* Titre principal */}
        <h1
          className="max-w-3xl text-balance font-display text-[clamp(2.4rem,6.5vw,5rem)] font-bold leading-[1.04] tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Notre pôle Assistance
          <br />
          <span style={{ color: "#F39200" }}>arrive très bientôt.</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-[52ch] text-pretty text-[1.05rem] leading-[1.75] text-white/52">
          Comptabilité, fiscalité, paie, création d'entreprise — notre équipe
          ivoirienne prépare une offre complète d'accompagnement pour les PME et
          entrepreneurs.
        </p>

        {/* Filet décoratif */}
        <div
          className="my-10 h-px w-24"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(243,146,0,0.6), transparent)",
          }}
        />

        {/* Formulaire e-mail */}
        {status === "done" ? (
          <div
            className="flex items-center gap-3 rounded-2xl border px-7 py-5"
            style={{
              borderColor: "rgba(243,146,0,0.25)",
              background: "rgba(243,146,0,0.07)",
            }}
          >
            {/* Coche minimaliste sans icône générique */}
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: "rgba(243,146,0,0.18)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M2.5 7.5L5.5 10.5L11.5 4"
                  stroke="#F39200"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[0.9rem] font-semibold text-white">
                Vous serez notifié.
              </p>
              <p className="mt-0.5 text-[0.82rem] text-white/45">
                Nous vous écrirons dès le lancement officiel.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[460px] flex-col gap-3 sm:flex-row"
            aria-label="Notification de lancement"
          >
            <input
              id="email-assistance"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              required
              autoComplete="email"
              className="flex-1 rounded-xl border px-5 py-3.5 text-[0.9rem] text-white outline-none transition-all placeholder:text-white/30 focus:border-[#F39200]/50 focus:shadow-[0_0_0_3px_rgba(243,146,0,0.10)]"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-xl px-6 py-3.5 text-[0.88rem] font-semibold text-[#0B1120] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              style={{
                background: "linear-gradient(135deg, #F39200 0%, #F7A832 100%)",
                boxShadow: "0 4px 20px rgba(243,146,0,0.32)",
              }}
            >
              {status === "loading" ? "Enregistrement…" : "Me notifier"}
            </button>
          </form>
        )}

        <p className="mt-5 text-[0.72rem] text-white/25">
          Aucun spam. Une seule notification au lancement.
        </p>

        {/* Contact direct */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <a
            href="tel:+2250709883293"
            className="text-[0.82rem] font-medium text-white/38 transition-colors hover:text-white/75"
          >
            +225 07 09 88 32 93
          </a>
          <span aria-hidden className="text-white/18">·</span>
          <a
            href="mailto:groupesica@gmail.com"
            className="text-[0.82rem] font-medium text-white/38 transition-colors hover:text-white/75"
          >
            groupesica@gmail.com
          </a>
          <span aria-hidden className="text-white/18">·</span>
          <span className="text-[0.82rem] text-white/28">Abidjan, Côte d'Ivoire</span>
        </div>
      </main>

      {/* ── Footer minimal ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-6 text-center sm:px-10">
        <p className="text-[0.68rem] text-white/20">
          © {new Date().getFullYear()} SICA Assistance · Groupe SICA · Côte d'Ivoire
        </p>
      </footer>
    </div>
  );
}
