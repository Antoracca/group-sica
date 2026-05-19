"use client";

import * as React from "react";
import { PageShell } from "@/components/page-shell";
import { Container } from "@sica/ui";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, Facebook, Send, CheckCircle2, MessageSquare, Clock } from "lucide-react";

/* ─── Données ─────────────────────────────────────────────────────────────── */
const ADRESSES = [
  {
    ville: "Abidjan",
    role: "Siège social",
    adresse: "Cocody Mermoz",
    detail: "Derrière la Pharmacie Mermoz, après le terrain SOGEFIA/RTI",
    bp: "01 BP 1203 Abidjan",
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

/* ─── Styles champs partagés ─────────────────────────────────────────────── */
const FIELD =
  "w-full rounded-xl border-2 border-neutral-200 bg-white px-4 py-3.5 text-[0.9375rem] text-neutral-800 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:border-[#1E2F8A] focus:shadow-[0_0_0_3px_rgba(30,47,138,0.08)]";

const LABEL =
  "mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.18em] text-neutral-500";

/* ─── Composant FormInput ─────────────────────────────────────────────────── */
function FormInput({
  id, label, type, value, onChange, required, autoComplete, placeholder,
}: {
  id: string; label: string; type: string; value: string;
  onChange: (v: string) => void; required?: boolean;
  autoComplete?: string; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={LABEL}>{label}</label>
      <input
        id={id} type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required} autoComplete={autoComplete}
        placeholder={placeholder}
        className={FIELD}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PAGE CONTACT
══════════════════════════════════════════════════════════════════════════ */
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
    await new Promise((r) => setTimeout(r, 1100));
    setSubmitting(false);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setNom(""); setEmail(""); setTel(""); setMessage("");
    }, 5500);
  };

  return (
    <PageShell>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden pt-36 pb-20 text-white sm:pt-44 sm:pb-28"
        style={{ background: "linear-gradient(155deg, #060D22 0%, #0F1C55 55%, #1E2F8A 100%)" }}
      >
        {/* Blueprint grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='52' height='52'><path d='M52 0H0V52' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
            backgroundSize: "52px 52px",
          }}
        />
        {/* Halo ambre */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(243,146,0,0.5) 0%, transparent 65%)" }}
        />

        <Container className="relative">
          <p className="mb-6 inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
            <span className="h-px w-7 bg-[#F39200]" aria-hidden />
            Contact SICA
          </p>
          <h1
            className="max-w-3xl text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.04] tracking-tight"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Parlons de votre{" "}
            <em className="not-italic" style={{ color: "#F39200" }}>projet.</em>
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-white/62">
            Décrivez votre besoin — chantier, dossier administratif, partenariat.
            Nous revenons vers vous sous 24h ouvrées avec un référent dédié.
          </p>

          {/* Filet décoratif */}
          <div
            className="mt-10 h-px w-full max-w-[480px]"
            style={{ background: "linear-gradient(to right, rgba(243,146,0,0.5), transparent)" }}
          />
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════
          FORMULAIRE + COORDONNÉES
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#F8F8F5] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">

            {/* ─── FORMULAIRE ──────────────────────────────── */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_2px_24px_rgba(0,0,0,0.05)] sm:p-10">
              <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
                Formulaire de contact
              </p>
              <h2
                className="mb-8 text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-[#0D1A4A]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Écrivez-nous.
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                {/* Pôle */}
                <div>
                  <label htmlFor="pole" className={LABEL}>Type de demande</label>
                  <select
                    id="pole"
                    value={pole}
                    onChange={(e) => setPole(e.target.value)}
                    className={FIELD}
                    style={{ appearance: "auto" }}
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
                  placeholder="Votre nom et prénom"
                />

                {/* Email + Tel */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput
                    id="email" label="Email *" type="email"
                    value={email} onChange={setEmail} required autoComplete="email"
                    placeholder="vous@exemple.com"
                  />
                  <FormInput
                    id="tel" label="Téléphone" type="tel"
                    value={tel} onChange={setTel} autoComplete="tel"
                    placeholder="+225 07 XX XX XX XX"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={LABEL}>Décrivez votre besoin *</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                    placeholder="Ex : Je souhaite construire une villa de 250 m² à Bingerville. Quel délai pour un devis ?"
                    className={`${FIELD} resize-none`}
                  />
                </div>

                {/* Toast succès */}
                <AnimatePresence>
                  {sent && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-600" />
                        <div>
                          <p className="text-[0.875rem] font-semibold text-emerald-700">
                            Message envoyé.
                          </p>
                          <p className="mt-0.5 text-[0.8125rem] text-emerald-600">
                            Nous revenons vers vous sous 24h ouvrées.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting || sent}
                  whileHover={submitting || sent ? {} : { scale: 1.012 }}
                  whileTap={submitting || sent ? {} : { scale: 0.986 }}
                  className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-xl py-4 text-[0.9375rem] font-semibold text-white transition-opacity disabled:opacity-65"
                  style={{
                    background: "linear-gradient(135deg, #1E2F8A 0%, #2C47C5 100%)",
                    boxShadow: "0 4px 20px rgba(30,47,138,0.28)",
                  }}
                >
                  {submitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Envoi en cours
                    </>
                  ) : (
                    <>
                      Envoyer mon message
                      <Send size={15} strokeWidth={2} />
                    </>
                  )}
                </motion.button>

                <p className="text-[0.72rem] leading-relaxed text-neutral-400">
                  Données traitées conformément à l'ARTCI.{" "}
                  <a href="/confidentialite" className="text-[#1E2F8A] underline underline-offset-2 hover:text-[#F39200]">
                    Politique de confidentialité
                  </a>
                </p>
              </form>
            </div>

            {/* ─── COORDONNÉES ─────────────────────────────── */}
            <div className="flex flex-col gap-6">

              <div>
                <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
                  Coordonnées directes
                </p>
                <h2
                  className="text-balance text-[1.375rem] font-bold leading-tight tracking-tight text-[#0D1A4A]"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Ou contactez-nous directement.
                </h2>
              </div>

              {/* Implantations */}
              {ADRESSES.map((a) => (
                <div
                  key={a.ville}
                  className="group rounded-2xl border-2 border-neutral-100 bg-white p-6 transition-all duration-300 hover:border-[#1E2F8A]/20 hover:shadow-[0_6px_28px_rgba(30,47,138,0.08)]"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#F39200]">
                      {a.role}
                    </span>
                  </div>
                  <h3
                    className="text-[1.375rem] font-bold tracking-tight text-[#0D1A4A]"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {a.ville}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] font-medium text-neutral-700">{a.adresse}</p>
                  <p className="text-[0.875rem] text-neutral-500">{a.detail}</p>
                  {a.bp && <p className="mt-1 text-[0.8125rem] text-neutral-400">{a.bp}</p>}
                  <a
                    href={`tel:${a.tel.replace(/\s/g, "")}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#1E2F8A]/15 bg-[#1E2F8A]/04 px-3.5 py-2 text-[0.875rem] font-semibold text-[#1E2F8A] transition-all hover:border-[#1E2F8A]/30 hover:bg-[#1E2F8A]/08"
                  >
                    <Phone size={13} strokeWidth={2.2} />
                    {a.tel}
                  </a>
                </div>
              ))}

              {/* Canaux numériques */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "linear-gradient(145deg, #060D22 0%, #0F1C55 100%)" }}
              >
                <p className="mb-5 text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[#F39200]">
                  Autres canaux
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:groupesica@gmail.com"
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "rgba(243,146,0,0.14)" }}
                    >
                      <Mail size={14} strokeWidth={2} style={{ color: "#F39200" }} />
                    </span>
                    groupesica@gmail.com
                  </a>
                  <a
                    href="https://facebook.com/SicaConstruction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-white/70 transition-colors hover:text-white"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "rgba(243,146,0,0.14)" }}
                    >
                      <Facebook size={14} strokeWidth={2} style={{ color: "#F39200" }} />
                    </span>
                    facebook.com/SicaConstruction
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════════
          DISCUTER AVEC UN AGENT COMMERCIAL — Placeholder premium
      ══════════════════════════════════════════════════════ */}
      <section className="border-t border-neutral-200 bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_480px] lg:gap-16">

            {/* Texte */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F39200]/30 bg-[#F39200]/08 px-3.5 py-1.5">
                <Clock size={11} strokeWidth={2.2} style={{ color: "#F39200" }} />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#F39200]">
                  Bientôt disponible
                </span>
              </div>

              <h2
                className="text-balance text-[clamp(1.875rem,3.5vw,2.875rem)] font-bold leading-[1.1] tracking-tight text-[#0D1A4A]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Discuter avec un agent commercial.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-[1.72] text-neutral-500">
                Notre équipe sera prochainement disponible en direct pour répondre à vos
                questions et vous accompagner en temps réel dans votre projet.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Réponse instantanée", "Agents certifiés", "Disponible 8h–18h"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-[0.75rem] font-medium text-neutral-500"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Aperçu chat — UI désactivée */}
            <div className="relative">
              {/* Overlay "coming soon" */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl backdrop-blur-[2px]"
                style={{ background: "rgba(248,248,245,0.82)" }}>
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: "linear-gradient(135deg, #1E2F8A 0%, #2C47C5 100%)", boxShadow: "0 4px 18px rgba(30,47,138,0.25)" }}
                >
                  <MessageSquare size={22} strokeWidth={1.6} className="text-white" />
                </div>
                <p className="text-[0.8125rem] font-semibold text-[#0D1A4A]">En développement</p>
                <p className="text-[0.75rem] text-neutral-400">Disponible prochainement</p>
              </div>

              {/* Chat mock désactivé */}
              <div className="rounded-2xl border-2 border-neutral-200 bg-[#F8F8F5] p-5" aria-hidden>
                {/* Header du chat */}
                <div className="mb-4 flex items-center gap-3 border-b border-neutral-200 pb-4">
                  <div className="h-8 w-8 rounded-full bg-[#1E2F8A]/15" />
                  <div>
                    <div className="h-2.5 w-28 rounded-full bg-neutral-200" />
                    <div className="mt-1.5 h-2 w-16 rounded-full bg-neutral-100" />
                  </div>
                  <div className="ml-auto h-2 w-2 rounded-full bg-neutral-300" />
                </div>
                {/* Bulles chat */}
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-neutral-200 px-4 py-2.5">
                      <div className="h-2 w-40 rounded-full bg-neutral-300" />
                      <div className="mt-1.5 h-2 w-28 rounded-full bg-neutral-300" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div
                      className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-2.5"
                      style={{ background: "#1E2F8A" }}
                    >
                      <div className="h-2 w-32 rounded-full bg-white/25" />
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-neutral-200 px-4 py-2.5">
                      <div className="h-2 w-36 rounded-full bg-neutral-300" />
                      <div className="mt-1.5 h-2 w-20 rounded-full bg-neutral-300" />
                      <div className="mt-1.5 h-2 w-44 rounded-full bg-neutral-300" />
                    </div>
                  </div>
                </div>
                {/* Input */}
                <div className="mt-4 flex items-center gap-2 rounded-xl border-2 border-neutral-200 bg-white px-3 py-2.5">
                  <div className="h-2 flex-1 rounded-full bg-neutral-100" />
                  <div className="h-6 w-6 rounded-lg bg-neutral-200" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </PageShell>
  );
}
