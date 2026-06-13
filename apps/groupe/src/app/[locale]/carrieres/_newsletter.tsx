"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    /* Simulation — à remplacer par appel Supabase / Brevo / Mailchimp */
    setTimeout(() => setStatus("success"), 800);
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
        <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
        <p className="text-[0.9375rem] font-medium text-emerald-700">
          Parfait. Vous serez averti dès qu'une offre sera disponible.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre adresse email professionnelle"
        required
        disabled={status === "loading"}
        className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[0.9375rem] text-neutral-700 placeholder:text-neutral-400 outline-none transition-all focus:border-[#1E2F8A] focus:ring-2 focus:ring-[#1E2F8A]/10 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[0.875rem] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #1E2F8A 0%, #2C47C5 100%)",
          boxShadow: "0 2px 14px rgba(30,47,138,0.22)",
        }}
      >
        {status === "loading" ? "..." : "M'alerter"}
        {status !== "loading" && <ArrowRight size={14} />}
      </button>
    </form>
  );
}
