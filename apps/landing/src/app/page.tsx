"use client";

import * as React from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────────────────
   SICA (sica.ci) — Portail Principal / Bientôt disponible
   Palette : Navy ultra-profond #04060F · Royal Blue #1E2F8A · Ambre #F39200
   Typographie : Sora (display) · Inter (body)
───────────────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
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
        {/* Lueur ambre — haut centre */}
        <div
          className="absolute -top-64 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(243,146,0,0.12) 0%, transparent 60%)",
            filter: "blur(90px)",
          }}
        />
        {/* Lueur Royal Blue — bas gauche */}
        <div
          className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(30,47,138,0.4) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── Grille de fond (très subtile) ─────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><path d='M80 0H0V80' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Contenu principal ──────────────────────────────────────────────── */}
      <main
        id="main-content"
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-10"
      >
        <Image
          src="/logo-groupe.png"
          alt="Groupe SICA"
          width={280}
          height={110}
          className="mb-12 h-14 w-auto sm:h-16"
          priority
        />

        {/* Titre principal */}
        <h1
          className="max-w-4xl text-balance font-display text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[1.04] tracking-tight text-white"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          L'excellence ivoirienne
          <br />
          <span style={{ color: "#F39200" }}>en cours de construction.</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-[58ch] text-pretty text-[1.1rem] leading-[1.75] text-white/50">
          Le portail unifié du Groupe SICA est en préparation. Retrouvez
          prochainement l'intégralité de nos expertises en construction, ingénierie
          et assistance entrepreneuriale au même endroit.
        </p>

        {/* Pôles actifs actuels */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://groupesica.ci"
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-[0.82rem] font-semibold tracking-wide text-white transition-all hover:bg-white/[0.08]"
          >
            Aller sur le site Corporate
            <span aria-hidden className="text-[#F39200]">↗</span>
          </a>
          <a
            href="https://sicaconstruction.ci"
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-[0.82rem] font-semibold tracking-wide text-white transition-all hover:bg-white/[0.08]"
          >
            Pôle Construction
            <span aria-hidden className="text-[#F39200]">↗</span>
          </a>
        </div>

        {/* Filet décoratif */}
        <div
          className="my-12 h-px w-32"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />

        <p className="mb-4 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#F39200]">
          Soyez informé du lancement
        </p>

        {/* Formulaire e-mail */}
        {status === "done" ? (
          <div
            className="flex items-center gap-3 rounded-2xl border px-7 py-5"
            style={{
              borderColor: "rgba(243,146,0,0.25)",
              background: "rgba(243,146,0,0.07)",
            }}
          >
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
                C'est noté.
              </p>
              <p className="mt-0.5 text-[0.82rem] text-white/45">
                Nous vous écrirons dès l'ouverture du portail.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[480px] flex-col gap-3 sm:flex-row"
            aria-label="Notification de lancement"
          >
            <input
              id="email-sica"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              required
              autoComplete="email"
              className="flex-1 rounded-xl border px-5 py-3.5 text-[0.9rem] text-white outline-none transition-all placeholder:text-white/30 focus:border-[#1E2F8A] focus:shadow-[0_0_0_3px_rgba(30,47,138,0.25)]"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-xl border border-white/10 px-7 py-3.5 text-[0.88rem] font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98] disabled:opacity-60"
              style={{
                background: "rgba(255,255,255,0.05)",
              }}
            >
              {status === "loading" ? "Enregistrement…" : "M'avertir"}
            </button>
          </form>
        )}
      </main>

      {/* ── Footer minimal ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] px-6 py-6 sm:flex-row sm:px-10 lg:px-14">
        <p className="text-[0.7rem] text-white/25">
          © {new Date().getFullYear()} Groupe SICA · Abidjan, Côte d'Ivoire
        </p>
        <div className="flex gap-6">
          <a
            href="mailto:groupesica@gmail.com"
            className="text-[0.7rem] font-medium text-white/30 transition-colors hover:text-white/70"
          >
            Contactez-nous
          </a>
        </div>
      </footer>
    </div>
  );
}
