"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Comment l'IA lit-elle mon plan ?",
    answer: "Nos agents utilisent un modèle de vision par ordinateur avancé (Gemini 2.5) spécifiquement entraîné sur des plans architecturaux. Il repère les cotations, identifie les pièces (salon, chambre, etc.) et extrait les surfaces annotées. Si aucune surface n'est écrite, l'agent métreur utilise les échelles du plan pour la calculer."
  },
  {
    question: "Quels types de fichiers sont acceptés ?",
    answer: "Nous acceptons uniquement les fichiers PDF. Pour de meilleurs résultats, nous recommandons des plans d'architecte avec des cotations claires et une légende. Les croquis à main levée scannés peuvent donner des résultats moins précis."
  },
  {
    question: "Comment le prix est-il calculé ?",
    answer: "Une fois les quantités extraites (m², ml, unités), notre Agent Chiffreur applique automatiquement la bibliothèque de prix officielle de SICA Construction. Ces prix incluent la main d'œuvre et les matériaux, selon les standards du marché ivoirien actuel."
  },
  {
    question: "Puis-je modifier le devis une fois généré ?",
    answer: "Absolument ! Le devis généré est une estimation de pré-cadrage (DQE). Vous pouvez l'exporter en Word ou le compléter manuellement via notre outil d'édition pour ajuster les quantités, ajouter des lots spécifiques, ou modifier les prix selon vos fournisseurs."
  }
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="mt-32 max-w-4xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-3 mb-10 justify-center">
        <div className="flex size-10 items-center justify-center rounded-xl bg-brand-royal/10 text-brand-royal">
          <HelpCircle className="size-5" />
        </div>
        <h2 className="font-display text-3xl font-bold text-ink">
          Questions fréquentes
        </h2>
      </div>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                backgroundColor: isOpen ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
                borderColor: isOpen ? "rgba(30,47,138,0.15)" : "rgba(15,23,42,0.05)"
              }}
              className="overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors hover:bg-white/80"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-display text-lg font-bold text-ink">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                >
                  <ChevronDown className="size-4" />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto", marginBottom: 20 },
                      collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                    }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 text-slate leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
