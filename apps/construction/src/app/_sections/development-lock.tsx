"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@sica/ui";

const INITIAL_SECONDS = 31 * 60 * 60;
const PROGRESS_VALUE = 45;

function formatCountdown(totalSeconds: number) {
  const clamped = Math.max(0, totalSeconds);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function DevelopmentLock({ children }: { children: ReactNode }) {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);

  useEffect(() => {
    const deadline = Date.now() + INITIAL_SECONDS * 1000;

    const tick = () => {
      const remaining = Math.ceil((deadline - Date.now()) / 1000);
      setSecondsLeft(Math.max(0, remaining));
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const finishEstimate = useMemo(() => {
    const estimate = new Date(Date.now() + secondsLeft * 1000);
    return estimate.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [secondsLeft]);

  return (
    <section className="relative overflow-hidden" aria-label="Contenu en developpement">
      <div aria-hidden className="pointer-events-none select-none blur-[8px] saturate-75 opacity-55">
        {children}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-royal-900/20 via-brand-royal-900/32 to-brand-royal-900/42"
      />

      <div className="absolute inset-0 z-10 flex items-start justify-center px-4 py-10 sm:items-center">
        <Container className="flex justify-center">
          <div className="w-full max-w-2xl rounded-[1.35rem] border border-white/40 bg-white/18 p-6 text-white shadow-[0_22px_80px_rgba(6,20,74,0.38)] backdrop-blur-2xl sm:p-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/80">
              Developpement en cours
            </p>

            <h2 className="mt-3 font-display text-[clamp(1.35rem,2.9vw,2.2rem)] font-semibold leading-tight tracking-tight">
              Les autres sections reviennent bientot
            </h2>

            <p className="mt-4 max-w-xl text-sm text-white/86 sm:text-base">
              Avancement actuel a 45%. Le reste du site est temporairement inaccessible pendant la
              finalisation.
            </p>

            <div className="mt-7 rounded-2xl border border-white/30 bg-white/14 p-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                <span>Chargement</span>
                <span>{PROGRESS_VALUE}%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-amber to-[#ffd27a] transition-all duration-700"
                  style={{ width: `${PROGRESS_VALUE}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-white/90 sm:grid-cols-2">
              <div className="rounded-xl border border-white/30 bg-white/12 p-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/75">
                  Mise en production estimee
                </p>
                <p className="mt-1 text-base font-semibold">{finishEstimate}</p>
              </div>
              <div className="rounded-xl border border-white/30 bg-white/12 p-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/75">
                  Decompte
                </p>
                <p className="mt-1 font-mono text-[1.05rem] font-semibold tracking-[0.08em]">
                  {formatCountdown(secondsLeft)}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
