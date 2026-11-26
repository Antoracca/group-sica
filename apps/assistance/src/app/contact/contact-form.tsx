"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";

/* Formulaire de contact : ouvre la messagerie du visiteur avec un message pré-rempli
   vers groupesica@gmail.com (aucun envoi simulé). Le sujet peut être pré-sélectionné
   via ?objet=creation | modification | formes | gestion | impots | rendez-vous. */

const SUJETS = {
  creation: "Création d'entreprise",
  modification: "Modification d'entreprise",
  formes: "Choix de la forme juridique",
  gestion: "Gestion comptable, fiscale et sociale",
  impots: "Impôts et taxes",
  "rendez-vous": "Prise de rendez-vous",
  autre: "Autre demande",
} as const;

type Sujet = keyof typeof SUJETS;

const labelCls = "mb-1.5 block text-xs font-semibold text-ink";
const fieldCls =
  "min-h-[48px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink outline-none transition-colors focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/15";

export function ContactForm() {
  const [sujet, setSujet] = useState<Sujet | "">("");

  useEffect(() => {
    const objet = new URLSearchParams(window.location.search).get("objet");
    if (objet && objet in SUJETS) setSujet(objet as Sujet);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const titre = sujet ? SUJETS[sujet] : "Demande d'information";
    const corps = [
      `Nom et prénom : ${f.get("nom") ?? ""}`,
      `Entreprise : ${f.get("entreprise") || "-"}`,
      `Téléphone : ${f.get("tel") ?? ""}`,
      `E-mail : ${f.get("email") ?? ""}`,
      "",
      String(f.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:groupesica@gmail.com?subject=${encodeURIComponent(
      `SICA ASSISTANCE — ${titre}`,
    )}&body=${encodeURIComponent(corps)}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8"
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
          <select
            name="sujet"
            className={fieldCls}
            value={sujet}
            onChange={(e) => setSujet(e.target.value as Sujet)}
            required
          >
            <option value="" disabled>
              Choisir un sujet
            </option>
            {(Object.keys(SUJETS) as Sujet[]).map((k) => (
              <option key={k} value={k}>
                {SUJETS[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className={labelCls}>Message</span>
          <textarea
            name="message"
            rows={4}
            className={`${fieldCls} min-h-[130px] resize-none`}
            placeholder="Décrivez votre projet ou votre demande en quelques lignes."
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-amber px-7 text-sm font-semibold text-ink shadow-[0_10px_28px_-10px_rgba(247,127,0,0.7)] transition-colors hover:bg-brand-amber-600 sm:w-auto"
      >
        <Send aria-hidden className="size-4" />
        Préparer mon e-mail
      </button>
      <p className="mt-3 text-xs leading-relaxed text-slate">
        Le bouton ouvre votre messagerie avec un message pré-rempli adressé à groupesica@gmail.com. Vos informations
        servent uniquement à traiter votre demande.
      </p>
    </form>
  );
}
