"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, AlertCircle, Sparkles, RotateCcw, FileDown, Printer, 
  Settings, History, HelpCircle, PanelLeft, ChevronRight, Zap,
  Eye, Ruler, Calculator, Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { PlanInput, DevisResult } from "@sica/devis-engine";
import { Dropzone } from "./_components/dropzone";
import { AgentsPipeline } from "./_components/agents-pipeline";
import { PlanSnapshot } from "./_components/plan-snapshot";
import { DevisRender } from "./_components/devis-render";
import { A4DevisRender } from "./_components/a4-devis-render";
import { downloadDevisWord } from "./_components/export-doc";
import { FAQ } from "./_components/faq";
import { getBrowserClient } from "@/lib/supabase-browser";

type Stage = "idle" | "processing" | "ready" | "error";

interface ApiResponse {
  plan: PlanInput;
  devis: DevisResult;
  durationMs: number;
  reference: string;
  error?: string;
}

export default function DevisAutoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [isApiDone, setIsApiDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanInput | null>(null);
  const [devis, setDevis] = useState<DevisResult | null>(null);
  const [ref, setRef] = useState<string>("");

  const reset = useCallback(() => {
    setFile(null);
    setPlan(null);
    setDevis(null);
    setError(null);
    setStage("idle");
    setIsApiDone(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!file) return;
    setStage("processing");
    setIsApiDone(false);
    setError(null);
    setPlan(null);
    setDevis(null);

    try {
      let res;
      const supabase = getBrowserClient();

      if (supabase) {
        // Envoi sécurisé via Supabase Storage pour éviter la limite Vercel
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filePath = `${Date.now()}-${cleanName}`;
        
        const { error: uploadError } = await supabase.storage
          .from("plans")
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(`Erreur d'envoi (vérifiez que le bucket "plans" existe) : ${uploadError.message}`);
        }

        res = await fetch("/api/devis-auto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filePath }),
        });
      } else {
        // Fallback si pas de Supabase côté client
        const form = new FormData();
        form.append("plan", file);
        res = await fetch("/api/devis-auto", { method: "POST", body: form });
      }
      
      if (!res.ok) {
        if (res.status === 413) {
          throw new Error("Fichier trop volumineux. La limite sur Vercel est de 4.5 Mo. Veuillez compresser votre PDF.");
        }
        const text = await res.text();
        let errorMsg = `Erreur serveur (${res.status})`;
        try {
          const errJson = JSON.parse(text);
          errorMsg = errJson.error || errorMsg;
        } catch {
          errorMsg = text.substring(0, 100);
        }
        throw new Error(errorMsg);
      }

      const json: ApiResponse = await res.json();
      setPlan(json.plan);
      setDevis(json.devis);
      setRef(json.reference);
      setIsApiDone(true); // Signal to pipeline that API is done
    } catch (e) {
      setError(e instanceof Error ? e.message : "Échec de la génération.");
      setStage("error");
      setIsApiDone(false);
    }
  }, [file]);

  const handlePipelineComplete = useCallback(() => {
    setStage("ready");
  }, []);

  const handleToolbarClick = () => {
    alert("Cette fonctionnalité sera disponible dans la prochaine mise à jour.");
  };

  return (
    <main className="relative min-h-[100dvh] overflow-hidden print:overflow-visible bg-[#FAFAFA] selection:bg-brand-royal/20">
      {/* Background Époustouflant : Gradient mesh et grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden print:hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-royal/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-amber/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='20' cy='20' r='1' fill='%231E2F8A'/></svg>\")",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-8">
        
        {/* Navigation Top */}
        <header className="flex items-center justify-between py-2">
          <Link
            href="/"
            className="group inline-flex h-10 items-center gap-2 rounded-full px-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-slate transition-all hover:bg-white hover:shadow-sm"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" strokeWidth={2} />
            SICA Construction
          </Link>

          {/* Toolbar "MacOS" style */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hidden sm:flex items-center gap-1 rounded-full border border-white/40 bg-white/60 p-1 backdrop-blur-xl shadow-sm"
          >
            <ToolbarButton icon={<PanelLeft className="size-4" />} tooltip="Menu" onClick={handleToolbarClick} />
            <div className="w-px h-4 bg-slate-200 mx-1" />
            <ToolbarButton icon={<History className="size-4" />} tooltip="Historique" onClick={handleToolbarClick} />
            <ToolbarButton icon={<Settings className="size-4" />} tooltip="Paramètres" onClick={handleToolbarClick} />
            <ToolbarButton icon={<HelpCircle className="size-4" />} tooltip="Aide" onClick={handleToolbarClick} />
            <div className="w-px h-4 bg-slate-200 mx-1" />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-royal/10 to-brand-royal/5">
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-brand-royal font-bold">
                Moteur SICA v2.0
              </span>
            </div>
          </motion.div>
        </header>

        {/* Hero Workspace */}
        <AnimatePresence mode="wait">
          {(stage === "idle" || stage === "error") && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="mt-16"
            >
              <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
                
                {/* Grand Lottie au-dessus */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", bounce: 0.4 }}
                  className="w-40 h-40 mb-2 opacity-90 drop-shadow-2xl mix-blend-multiply pointer-events-none"
                >
                  <DotLottieReact src="/ai.lottie" loop autoplay />
                </motion.div>

                {/* Titre sans fond jaune */}
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-royal mb-6 uppercase"
                >
                  Intelligence Artificielle
                </motion.h2>

                <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-[4rem]">
                  Votre devis estimatif <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-royal to-brand-amber">
                    en temps réel.
                  </span>
                </h1>
                <p className="mt-6 text-lg text-slate max-w-2xl mx-auto leading-relaxed">
                  Déposez un plan d'architecture. Notre pipeline de 4 agents spécialisés extrait les surfaces, structure les lots, et chiffre l'intégralité du projet selon la bibliothèque officielle SICA.
                </p>
              </div>

              {/* Workspace Area */}
              <div className="mx-auto max-w-4xl">
                <div className="relative rounded-[2rem] border border-white/40 bg-white/40 p-2 shadow-2xl shadow-brand-royal/5 backdrop-blur-2xl">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/60 to-white/20 pointer-events-none" />
                  
                  <div className="relative rounded-[1.5rem] bg-white border border-white/60 shadow-sm overflow-hidden p-6 sm:p-10">
                    <Dropzone file={file} onFile={setFile} onClear={reset} />

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 overflow-hidden"
                        >
                          <p role="alert" className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm">
                            <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
                            <span className="leading-relaxed">{error}</span>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-3">
                        <p className="font-mono text-sm uppercase tracking-widest text-brand-royal font-semibold">
                          4 agents travaillent pour vous
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!file}
                        className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:shadow-none overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Générer le devis
                          <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                        </span>
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-royal/0 via-white/20 to-brand-royal/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <FAQ />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing State */}
        <AnimatePresence mode="wait">
          {stage === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0 }}
              className="mt-16 mx-auto max-w-4xl"
            >
              <AgentsPipeline finished={isApiDone} onComplete={handlePipelineComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ready State */}
        <AnimatePresence mode="wait">
          {stage === "ready" && plan && devis && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 space-y-6"
            >
              {/* Bandeau d'actions premium */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/80 px-6 py-4 shadow-sm backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <Check className="size-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-emerald-600">
                      Analyse terminée
                    </p>
                    <p className="font-display text-lg font-bold text-ink">
                      {ref}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate transition-colors hover:bg-slate-50 hover:text-ink hover:border-slate-300 shadow-sm"
                  >
                    <RotateCcw className="size-4" strokeWidth={2} /> Nouveau
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-ink transition-colors hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                  >
                    <Printer className="size-4" strokeWidth={2} /> Imprimer
                  </button>
                  <button
                    type="button"
                    onClick={() => { void downloadDevisWord(plan, devis, ref); }}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-royal px-6 text-sm font-bold text-white shadow-lg shadow-brand-royal/25 transition-all hover:bg-brand-royal-700 hover:-translate-y-0.5"
                  >
                    <FileDown className="size-4" strokeWidth={2} /> Exporter Docx
                  </button>
                </div>
              </div>

              {/* Vue écran */}
              <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] print:hidden">
                <PlanSnapshot plan={plan} />
                <DevisRender devis={devis} reference={ref} />
              </div>

              {/* Vue impression */}
              <div className="hidden print:block" data-print="auto-devis" aria-hidden>
                <A4DevisRender plan={plan} devis={devis} reference={ref} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function ToolbarButton({ icon, tooltip, onClick }: { icon: React.ReactNode, tooltip: string, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="relative group p-2.5 rounded-full text-slate-400 hover:text-ink hover:bg-slate-100 transition-colors">
      {icon}
      {/* Tooltip simple */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-ink text-white text-[0.65rem] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {tooltip}
      </span>
    </button>
  );
}
