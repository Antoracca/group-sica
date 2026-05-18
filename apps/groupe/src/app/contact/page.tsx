"use client";

import * as React from "react";
import { PageShell } from "@/components/page-shell";
import { Container } from "@sica/ui";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, Phone, Mail, Facebook, Send, CheckCircle2, AlertCircle,
} from "lucide-react";

const ADRESSES = [
  {
    ville: "Abidjan",
    role: "Siège social",
    adresse: "Cocody Mermoz",
    detail: "Derrière la Pharmacie Mermoz, après le terrain SOGEFIA/RTI",
    bp: "2100 BP 05 Abidjan / 01 BP 1203 Abidjan",
    tel: "+225 0709883293",
  },
  {
    ville: "Yamoussoukro",
    role: "Succursale",
    adresse: "Morofé · 24 ampoules",
    detail: "Rond-point route Daloa",
    bp: null,
    tel: "+225 2722247445",
  },
];

const POLES = [
  { value: "construction", label: "Construction · BTP" },
  { value: "assistance", label: "Assistance · Création & comptabilité" },
  { value: "partenariat", label: "Devenir partenaire" },
  { value: "carriere", label: "Candidature" },
  { value: "autre", label: "Autre demande" },
];

export default function ContactPage() {
  const [pole, setPole] = React.useState("construction");
  const [nom, setNom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !email || !message) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSent(true);
    /* Reset après 5 s */
    setTimeout(() => {
      setSent(false);
      setNom("");
      setEmail("");
      setTel("");
      setMessage("");
    }, 5000);
  };

  return (
    <PageShell>
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-32 pb-16 text-white sm:pt-40 sm:pb-20 lg:pt-44"
        style={{ background: "linear-gradient(155deg, #08112E 0%, #1E2F8A 60%, #0D1A4A 100%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><g stroke='white' stroke-width='0.5' fill='none'><path d='M48 0H0V48'/></g></svg>\")",
            backgroundSize: "48px 48px",
          }}
        />
        <Container className="relative">
          <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#F7A832" }}>
            Contact SICA
          </p>
          <h1 className="font-display max-w-3xl text-balance text-[2.25rem] font-bold leading-tight tracking-tight sm:text-[3rem] lg:text-[3.75rem]">
            Parlons de votre{" "}
            <span style={{ color: "#F39200" }}>projet.</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
            Décrivez-nous votre besoin — chantier, dossier administratif, partenariat. Nous revenons
            vers vous sous 24h ouvrées avec un référent dédié.
          </p>
        </Container>
      </section>

      {/* ── FORMULAIRE + COORDONNÉES ── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">

            {/* ─── FORMULAIRE ─── */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              noValidate
            >
              <div>
                <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
                  Formulaire de contact
                </p>
                <h2 className="font-display text-balance text-[1.5rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[2rem]">
                  Écrivez-nous.
                </h2>
              </div>

              {/* Pôle concerné */}
              <div>
                <label htmlFor="pole" className="mb-1.5 block text-[0.75rem] font-semibold uppercase tracking-wider text-neutral-600">
                  Type de demande
                </label>
                <select
                  id="pole"
                  value={pole}
                  onChange={(e) => setPole(e.target.value)}
                  className="w-full rounded-xl border-1.5 bg-neutral-50 px-4 py-3.5 text-[0.9375rem] outline-none transition-all focus:bg-white focus:ring-2"
                  style={{ borderColor: "#E4E7F0" }}
                >
                  {POLES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Nom */}
              <FormInput
                id="nom" label="Nom complet *" type="text"
                value={nom} onChange={setNom} required autoComplete="name"
              />

              {/* Email + téléphone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <FormInput
                  id="email" label="Email *" type="email"
                  value={email} onChange={setEmail} required autoComplete="email"
                />
                <FormInput
                  id="tel" label="Téléphone" type="tel"
                  value={tel} onChange={setTel} autoComplete="tel"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-1.5 block text-[0.75rem] font-semibold uppercase tracking-wider text-neutral-600">
                  Décrivez votre besoin *
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                  placeholder="Ex : Je souhaite construire une villa de 250 m² à Bingerville. Quel est le délai pour un devis ?"
                  className="w-full resize-none rounded-xl border-1.5 bg-neutral-50 px-4 py-3.5 text-[0.9375rem] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1E2F8A]/10"
                  style={{ borderColor: "#E4E7F0" }}
                />
              </div>

              {/* Confirmation */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-start gap-3 overflow-hidden rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(31,138,86,0.08)",
                      border: "1px solid rgba(31,138,86,0.22)",
                    }}
                  >
                    <CheckCircle2 size={18} strokeWidth={2.2} style={{ color: "#0B6E45" }} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[0.875rem] font-semibold" style={{ color: "#0B6E45" }}>
                        Message envoyé.
                      </p>
                      <p className="mt-0.5 text-[0.8125rem]" style={{ color: "#0B6E45" }}>
                        Nous revenons vers vous sous 24h ouvrées.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={submitting || sent}
                whileHover={submitting || sent ? {} : { scale: 1.012 }}
                whileTap={submitting || sent ? {} : { scale: 0.988 }}
                className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-4 text-[0.9375rem] font-semibold text-white transition-all duration-300 disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, #1E2F8A 0%, #2C47C5 100%)",
                  boxShadow: "0 4px 22px rgba(30,47,138,0.30)",
                }}
              >
                {submitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    Envoyer mon message
                    <Send size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </motion.button>

              <p className="text-[0.75rem] text-neutral-400">
                <AlertCircle size={11} strokeWidth={2} className="mr-1 inline" />
                Données traitées conformément à l'ARTCI. Voir notre{" "}
                <a href="/confidentialite" className="text-[#1E2F8A] underline hover:text-brand-amber">
                  politique de confidentialité
                </a>.
              </p>
            </form>

            {/* ─── COORDONNÉES ─── */}
            <aside className="flex flex-col gap-8">
              <div>
                <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-amber">
                  Coordonnées directes
                </p>
                <h2 className="font-display text-balance text-[1.5rem] font-bold leading-tight tracking-tight text-[#0D1A4A] sm:text-[2rem]">
                  Ou contactez-nous directement.
                </h2>
              </div>

              {/* Implantations */}
              {ADRESSES.map((a) => (
                <div
                  key={a.ville}
                  className="rounded-2xl border bg-white p-6"
                  style={{ borderColor: "#E4E7F0" }}
                >
                  <div className="flex items-start gap-3">
                    <MapPin size={18} strokeWidth={2} style={{ color: "#1E2F8A" }} className="mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-amber">
                        {a.role}
                      </p>
                      <h3 className="mt-0.5 font-display text-[1.25rem] font-bold leading-tight text-[#0D1A4A]">
                        {a.ville}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] font-medium text-neutral-700">
                        {a.adresse}
                      </p>
                      <p className="text-[0.8125rem] text-neutral-500">{a.detail}</p>
                      {a.bp && (
                        <p className="mt-1 text-[0.8125rem] text-neutral-500">{a.bp}</p>
                      )}
                      <a
                        href={`tel:${a.tel.replace(/\s/g, "")}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[#1E2F8A] transition-colors hover:text-brand-amber"
                      >
                        <Phone size={12} strokeWidth={2.2} />
                        {a.tel}
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Canaux digitaux */}
              <div className="rounded-2xl p-6" style={{ background: "#08112E", color: "white" }}>
                <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.22em]" style={{ color: "#F7A832" }}>
                  Autres canaux
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:groupesica@gmail.com"
                    className="inline-flex items-center gap-2.5 text-[0.9375rem] text-white/85 transition-colors hover:text-white"
                  >
                    <Mail size={15} strokeWidth={2} style={{ color: "#F7A832" }} />
                    groupesica@gmail.com
                  </a>
                  <a
                    href="https://facebook.com/SicaConstruction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-[0.9375rem] text-white/85 transition-colors hover:text-white"
                  >
                    <Facebook size={15} strokeWidth={2} style={{ color: "#F7A832" }} />
                    facebook.com/SicaConstruction
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

/* ──────────────────────────────────────────────────────────
   FormInput — champ texte avec label propre
────────────────────────────────────────────────────────── */
function FormInput({
  id, label, type, value, onChange, required, autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.75rem] font-semibold uppercase tracking-wider text-neutral-600">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border-1.5 bg-neutral-50 px-4 py-3.5 text-[0.9375rem] outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1E2F8A]/10"
        style={{ borderColor: "#E4E7F0" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#1E2F8A")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#E4E7F0")}
      />
    </div>
  );
}
