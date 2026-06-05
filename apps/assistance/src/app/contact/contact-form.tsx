"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const SUJETS = [
  "Création d'entreprise",
  "Comptabilité et fiscalité",
  "Déclarations",
  "Conseil en gestion",
  "Suivi administratif",
  "Autre demande",
] as const;

const labelCls = "mb-1.5 block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate";
const fieldCls =
  "min-h-[44px] w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-base text-ink outline-none transition-colors focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/15";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    /* TODO : brancher sur Supabase / Resend en production. */
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center rounded-2xl border border-brand-royal/10 bg-white p-8 text-center"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
          <CheckCircle2 className="size-6" />
        </span>
        <h2 className="mt-4 font-display text-xl font-semibold text-ink">Demande envoyée.</h2>
        <p className="mt-2 max-w-sm text-base leading-relaxed text-slate">
          Merci. Un conseiller SICA Assistance vous recontacte rapidement pour cerner
          votre besoin et vous indiquer les prochaines étapes.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-brand-royal/10 bg-white p-6 sm:p-7"
      aria-label="Formulaire de contact"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Nom et prénom</span>
          <input name="nom" required autoComplete="name" className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Entreprise (optionnel)</span>
          <input name="entreprise" autoComplete="organization" className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Téléphone</span>
          <input name="tel" type="tel" required autoComplete="tel" placeholder="+225 ..." className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Adresse e-mail</span>
          <input name="email" type="email" required autoComplete="email" className={fieldCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelCls}>Votre besoin</span>
          <select name="sujet" className={fieldCls} defaultValue="">
            <option value="" disabled>
              Choisir un sujet
            </option>
            {SUJETS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className={labelCls}>Message</span>
          <textarea
            name="message"
            rows={4}
            className={`${fieldCls} min-h-[120px] resize-none`}
            placeholder="Décrivez votre projet ou votre demande en quelques lignes."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-royal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2 disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Envoi en cours
          </>
        ) : (
          <>
            <Send className="size-4" />
            Envoyer ma demande
          </>
        )}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-slate">
        Vos informations servent uniquement à traiter votre demande. Elles ne sont pas
        transmises à des tiers.
      </p>
    </form>
  );
}
