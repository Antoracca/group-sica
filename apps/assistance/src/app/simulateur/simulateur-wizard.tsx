"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  RotateCcw,
} from "lucide-react";
import {
  FORMES,
  PIECES_COMMUNES,
  SECTEURS,
  type FormeJuridique,
} from "@/lib/simulateur";

type Step = 0 | 1 | 2 | 3 | 4;
const STEP_LABELS = ["Forme", "Secteur", "Détails", "Coordonnées", "Récapitulatif"];

const fieldCls =
  "min-h-[44px] w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-base text-ink outline-none transition-colors focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/15";
const labelCls = "mb-1.5 block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate";

export function SimulateurWizard() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [forme, setForme] = useState<string | null>(null);
  const [secteur, setSecteur] = useState<string | null>(null);
  const [capital, setCapital] = useState("");
  const [associes, setAssocies] = useState(1);
  const [entreprise, setEntreprise] = useState("");
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedForme: FormeJuridique | undefined = FORMES.find((f) => f.id === forme);
  const selectedSecteur = SECTEURS.find((s) => s.id === secteur);

  const canNext =
    (step === 0 && !!forme) ||
    (step === 1 && !!secteur) ||
    step === 2 ||
    (step === 3 && nom.trim() !== "" && tel.trim() !== "") ||
    step === 4;

  const next = () => setStep((s) => Math.min(4, (s + 1)) as Step);
  const back = () => setStep((s) => Math.max(0, (s - 1)) as Step);

  const reset = () => {
    setStep(0);
    setForme(null);
    setSecteur(null);
    setCapital("");
    setAssocies(1);
    setEntreprise("");
    setNom("");
    setTel("");
    setEmail("");
    setSubmitted(false);
  };

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Indicateur d'étapes */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Progression">
        {STEP_LABELS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[0.65rem] font-bold transition-colors ${
                    done
                      ? "bg-brand-royal text-white"
                      : current
                        ? "bg-brand-amber text-brand-royal-900"
                        : "bg-mist text-slate"
                  }`}
                >
                  {done ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span
                  className={`hidden text-[0.7rem] font-semibold sm:inline ${
                    current ? "text-ink" : "text-slate"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 ? (
                <span className={`h-px flex-1 ${done ? "bg-brand-royal" : "bg-black/10"}`} />
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="rounded-2xl border border-brand-royal/10 bg-white p-5 sm:p-7">
        <AnimatePresence mode="wait">
          {/* Étape 0 — Forme juridique */}
          {step === 0 ? (
            <motion.div key="step0" {...motionProps}>
              <h2 className="font-display text-xl font-semibold text-ink">
                Quelle forme juridique ?
              </h2>
              <p className="mt-1 text-sm text-slate">
                Pas sûr de votre choix ? Nous vous conseillons après cette étape.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {FORMES.map((f) => {
                  const Icon = f.icon;
                  const selected = f.id === forme;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setForme(f.id)}
                      className={`flex flex-col gap-2 rounded-xl border p-4 text-left transition-colors ${
                        selected
                          ? "border-brand-royal bg-brand-royal/5"
                          : "border-black/10 bg-white hover:border-brand-royal/30 hover:bg-mist/40"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="size-5 shrink-0 text-brand-royal" aria-hidden />
                        <span className="font-display text-base font-semibold text-ink">
                          {f.label}
                        </span>
                      </span>
                      <span className="text-sm leading-snug text-slate">{f.description}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}

          {/* Étape 1 — Secteur */}
          {step === 1 ? (
            <motion.div key="step1" {...motionProps}>
              <h2 className="font-display text-xl font-semibold text-ink">
                Quel est votre secteur d&apos;activité ?
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SECTEURS.map((s) => {
                  const Icon = s.icon;
                  const selected = s.id === secteur;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSecteur(s.id)}
                      className={`flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-colors ${
                        selected
                          ? "border-brand-royal bg-brand-royal/5"
                          : "border-black/10 bg-white hover:border-brand-royal/30 hover:bg-mist/40"
                      }`}
                    >
                      <Icon className="size-5 text-brand-royal" aria-hidden />
                      <span className="text-sm font-semibold text-ink">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : null}

          {/* Étape 2 — Détails */}
          {step === 2 ? (
            <motion.div key="step2" {...motionProps}>
              <h2 className="font-display text-xl font-semibold text-ink">
                Quelques détails sur votre projet.
              </h2>
              {selectedForme ? (
                <p className="mt-1 text-sm text-slate">{selectedForme.capitalNote}</p>
              ) : null}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>Nom envisagé (optionnel)</span>
                  <input
                    value={entreprise}
                    onChange={(e) => setEntreprise(e.target.value)}
                    className={fieldCls}
                    placeholder="Nom de votre future structure"
                  />
                </label>
                <label className="block">
                  <span className={labelCls}>Capital envisagé (FCFA, optionnel)</span>
                  <input
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    inputMode="numeric"
                    className={fieldCls}
                    placeholder="Ex : 1 000 000"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelCls}>Nombre d&apos;associés : {associes}</span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={associes}
                    onChange={(e) => setAssocies(Number(e.target.value))}
                    className="w-full accent-brand-amber"
                    aria-label={`Nombre d'associés : ${associes}`}
                  />
                </label>
              </div>
            </motion.div>
          ) : null}

          {/* Étape 3 — Coordonnées */}
          {step === 3 ? (
            <motion.div key="step3" {...motionProps}>
              <h2 className="font-display text-xl font-semibold text-ink">
                Comment vous recontacter ?
              </h2>
              <p className="mt-1 text-sm text-slate">
                Nous préparons votre estimation et vous l&apos;expliquons.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>Nom et prénom</span>
                  <input value={nom} onChange={(e) => setNom(e.target.value)} required autoComplete="name" className={fieldCls} />
                </label>
                <label className="block">
                  <span className={labelCls}>Téléphone</span>
                  <input value={tel} onChange={(e) => setTel(e.target.value)} type="tel" required autoComplete="tel" placeholder="+225 ..." className={fieldCls} />
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelCls}>Adresse e-mail (optionnel)</span>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" className={fieldCls} />
                </label>
              </div>
            </motion.div>
          ) : null}

          {/* Étape 4 — Récapitulatif */}
          {step === 4 ? (
            <motion.div key="step4" {...motionProps}>
              {submitted ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="size-6" />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-semibold text-ink">
                    Votre demande est envoyée.
                  </h2>
                  <p className="mt-2 max-w-sm text-base leading-relaxed text-slate">
                    Un conseiller vous recontacte pour préciser votre estimation et
                    lancer les démarches.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-brand-royal/20 px-5 text-sm font-semibold text-brand-royal transition-colors hover:bg-brand-royal/5"
                  >
                    <RotateCcw className="size-4" />
                    Recommencer
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    Votre récapitulatif.
                  </h2>
                  <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-brand-royal/10 bg-brand-royal/10">
                    {[
                      { k: "Forme juridique", v: selectedForme?.label ?? "Non précisée" },
                      { k: "Associés", v: selectedForme?.id === "ei" ? "1 personne" : `${associes}` },
                      { k: "Secteur", v: selectedSecteur?.label ?? "Non précisé" },
                      { k: "Capital envisagé", v: capital ? `${capital} FCFA` : "À définir" },
                    ].map((row) => (
                      <div key={row.k} className="bg-white p-4">
                        <dt className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate">
                          {row.k}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold text-ink">{row.v}</dd>
                      </div>
                    ))}
                  </dl>

                  {selectedForme ? (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-amber">
                          Formalités à prévoir
                        </p>
                        <ul className="mt-3 space-y-2">
                          {selectedForme.formalites.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-slate">
                              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-royal" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-amber">
                          Pièces à préparer
                        </p>
                        <ul className="mt-3 space-y-2">
                          {PIECES_COMMUNES.map((p) => (
                            <li key={p} className="flex items-start gap-2.5 text-sm text-slate">
                              <FileText className="mt-0.5 size-4 shrink-0 text-brand-royal/60" aria-hidden />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}

                  <p className="mt-6 rounded-xl bg-mist/50 px-4 py-3 text-sm leading-relaxed text-slate">
                    L&apos;estimation chiffrée dépend de votre situation précise. Nous vous
                    la communiquons après un court échange, sans engagement.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-royal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
                  >
                    Envoyer ma demande
                    <ArrowRight className="size-4" aria-hidden />
                  </button>
                </>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Navigation */}
        {!submitted ? (
          <div className="mt-7 flex items-center justify-between gap-3 border-t border-black/5 pt-5">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold text-slate transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="size-4" />
              Retour
            </button>
            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                disabled={!canNext}
                className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-royal px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
