"use client";

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/contact";

const OBJETS = [
  { v: "devis", l: "Demander un devis" },
  { v: "etudes", l: "Étude de sol / étude de structure" },
  { v: "rendez-vous", l: "Prendre rendez-vous" },
  { v: "conseiller", l: "Parler à un conseiller" },
  { v: "autre", l: "Autre demande" },
] as const;

const field =
  "mt-1.5 block w-full rounded-[10px] border border-slate-200 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/20";

/* Formulaire de contact : prépare un e-mail adressé au Groupe
   (aucune donnée n'est stockée par le site). */
export function ContactForm() {
  const [objet, setObjet] = useState<string>("devis");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("objet");
    if (q && OBJETS.some((o) => o.v === q)) setObjet(q);
    if (window.location.hash === "#rendez-vous") setObjet("rendez-vous");
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const label = OBJETS.find((o) => o.v === objet)?.l ?? "Demande";
    const body = [
      `Nom : ${f.get("nom")}`,
      `Téléphone : ${f.get("tel")}`,
      `Localisation du projet : ${f.get("lieu") || "—"}`,
      "",
      String(f.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `[SICA CONSTRUCTION] ${label}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
      <label className="text-sm font-semibold text-ink">
        Objet
        <select name="objet" value={objet} onChange={(e) => setObjet(e.target.value)} className={field}>
          {OBJETS.map((o) => (
            <option key={o.v} value={o.v}>
              {o.l}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          Nom et prénom
          <input name="nom" required autoComplete="name" className={field} />
        </label>
        <label className="text-sm font-semibold text-ink">
          Téléphone
          <input name="tel" type="tel" required autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="text-sm font-semibold text-ink">
        Localisation du projet
        <input name="lieu" placeholder="Ville, commune, quartier" className={field} />
      </label>
      <label className="text-sm font-semibold text-ink">
        Votre message
        <textarea name="message" rows={5} required className={field} />
      </label>
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-[10px] bg-brand-amber px-7 text-sm font-semibold text-ink transition-colors hover:bg-brand-amber-600"
      >
        Envoyer ma demande
      </button>
      <p className="text-xs leading-relaxed text-slate">
        Votre messagerie s&apos;ouvre avec la demande pré-remplie, adressée à {CONTACT.email}. Pour joindre des plans
        PDF, utilisez le{" "}
        <a href="/devis-auto" className="font-semibold text-brand-royal hover:underline">
          devis à partir de plans
        </a>
        .
      </p>
    </form>
  );
}
