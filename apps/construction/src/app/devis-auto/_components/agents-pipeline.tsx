"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/*
  Pipeline d'agents — Version professionnelle "Aperçu Global"
  - Utilise `agent.lottie` au centre pour simuler le traitement.
  - Vraie barre de progression fluide.
  - Estimation du temps restant.
  - Remplace les "cartes" trop high-tech par un design sobre.
*/

interface Agent {
  id: string;
  label: string;
  task: string;
  targetProgress: number; // Jusqu'à quel % cet agent gère la progression
  expectedDuration: number; // Durée estimée pour atteindre ce %
}

const AGENTS: Agent[] = [
  { id: "vision", label: "Agent Lecteur", task: "Extraction géométrique des plans", targetProgress: 35, expectedDuration: 6000 },
  { id: "metreur", label: "Agent Métreur", task: "Quantification (m³, m², ml)", targetProgress: 65, expectedDuration: 4000 },
  { id: "chiffreur", label: "Agent Chiffreur", task: "Application base de prix SICA", targetProgress: 85, expectedDuration: 3000 },
  { id: "controleur", label: "Agent Contrôleur", task: "Validation benchmark FCFA/m²", targetProgress: 99, expectedDuration: 3000 },
];

const TOTAL_EXPECTED_TIME = AGENTS.reduce((acc, curr) => acc + curr.expectedDuration, 0);

interface Props {
  finished: boolean;
}

export function AgentsPipeline({ finished }: Props) {
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(Math.round(TOTAL_EXPECTED_TIME / 1000));
  
  const startTime = useRef(Date.now());
  const rafRef = useRef<number>(null);

  useEffect(() => {
    startTime.current = Date.now();
    
    const updateProgress = () => {
      if (finished) {
        setProgress(100);
        setActiveIdx(AGENTS.length - 1);
        setTimeLeft(0);
        return;
      }

      const elapsed = Date.now() - startTime.current;
      
      // Mettre à jour le temps restant estimé
      const remainingMs = Math.max(TOTAL_EXPECTED_TIME - elapsed, 1000); // Ne jamais afficher 0 si pas fini
      setTimeLeft(Math.round(remainingMs / 1000));

      // Calculer l'état théorique basé sur le temps
      let currentAgentIdx = 0;
      let timeAccumulator = 0;
      
      for (let i = 0; i < AGENTS.length; i++) {
        timeAccumulator += AGENTS[i].expectedDuration;
        if (elapsed > timeAccumulator) {
          currentAgentIdx = i + 1;
        } else {
          break;
        }
      }

      // Si on dépasse le dernier agent, on le maintient actif
      if (currentAgentIdx >= AGENTS.length) {
        currentAgentIdx = AGENTS.length - 1;
      }
      
      setActiveIdx(currentAgentIdx);

      // Calcul progress fin
      const currentAgent = AGENTS[currentAgentIdx];
      const prevAgentTarget = currentAgentIdx > 0 ? AGENTS[currentAgentIdx - 1].targetProgress : 0;
      const prevAgentTime = timeAccumulator - currentAgent.expectedDuration;
      
      const timeInCurrentAgent = elapsed - prevAgentTime;
      const progressRatio = Math.min(Math.max(timeInCurrentAgent / currentAgent.expectedDuration, 0), 1);
      
      const newProgress = prevAgentTarget + (currentAgent.targetProgress - prevAgentTarget) * progressRatio;
      
      // Assurer qu'on ne dépasse jamais 99.5% tant que pas finished
      setProgress(Math.min(newProgress, 99.5));

      if (!finished) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [finished]);

  const currentAgent = AGENTS[Math.min(activeIdx, AGENTS.length - 1)];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 p-8 sm:p-12 backdrop-blur-xl shadow-2xl shadow-brand-royal/10 text-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-royal/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-lg">
        
        {/* Lottie global (L'IA qui scanne) */}
        <div className="mx-auto w-48 h-48 sm:w-64 sm:h-64 mb-6 opacity-90 drop-shadow-xl mix-blend-multiply pointer-events-none">
          <DotLottieReact src="/agent.lottie" loop autoplay />
        </div>

        {/* Textes de l'agent actif */}
        <div className="mb-8 min-h-[4rem]">
          <motion.h3 
            key={currentAgent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl font-bold tracking-tight text-ink"
          >
            {finished ? "Génération du devis..." : currentAgent.label}
          </motion.h3>
          <motion.p 
            key={`${currentAgent.id}-task`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-slate text-sm"
          >
            {finished ? "Finalisation du fichier prêt à l'export." : currentAgent.task}
          </motion.p>
        </div>

        {/* Real Progress Bar */}
        <div className="mb-4 relative h-3 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200/50">
          <motion.div
            className="absolute bottom-0 left-0 top-0 bg-brand-royal rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>

        {/* Infos de progression : Pourcentage et temps estimé */}
        <div className="flex justify-between items-center px-1">
          <p className="font-mono text-sm font-bold text-ink">
            {Math.floor(progress)}%
          </p>
          {!finished && (
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500 font-semibold">
              Temps restant estimé : ~{timeLeft} s
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
