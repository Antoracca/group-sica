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
    <section aria-label="Contenu en developpement">
      <div className="bg-white py-10 text-slate-900">
        <Container>
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Developpement en cours
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.4rem,3.1vw,2.5rem)] font-semibold leading-tight tracking-tight text-slate-900">
              Les sections suivantes sont temporairement inaccessibles
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Progression actuelle: 45%. Fin estimee dans 31 heures avec mise en production prevue
              le {finishEstimate}.
            </p>

            <div className="mt-7">
              <div className="text-sm font-semibold text-slate-700">Progression globale</div>
              <div className="relative mt-8 h-4 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-yellow-400 via-orange-500 to-emerald-500" />
                <div
                  className="absolute right-0 top-0 h-full bg-white/88"
                  style={{ width: `${100 - PROGRESS_VALUE}%` }}
                />
                <div
                  className="absolute -top-8 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[0.7rem] font-semibold text-white"
                  style={{ left: `${PROGRESS_VALUE}%` }}
                >
                  {PROGRESS_VALUE}%
                </div>
                <div
                  className="absolute top-[-4px] h-6 w-1.5 rounded-full bg-slate-900"
                  style={{ left: `calc(${PROGRESS_VALUE}% - 3px)` }}
                  aria-hidden
                />
              </div>
              <div className="mt-2 grid grid-cols-5 text-[0.72rem] font-semibold text-slate-600">
                <span>0</span>
                <span className="text-center">25</span>
                <span className="text-center">50</span>
                <span className="text-center">75</span>
                <span className="text-right">100</span>
              </div>
              <div className="mt-2 grid gap-2 text-xs font-medium sm:grid-cols-4">
                <p className="text-blue-600">Bleu: demarrage</p>
                <p className="text-yellow-600">Jaune: structuration</p>
                <p className="text-orange-600">Orange: finalisation</p>
                <p className="text-emerald-600">Vert: presque termine</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Estimation de fin
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900">{finishEstimate}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Decompte en cours
                </p>
                <p className="mt-1 font-mono text-[1.05rem] font-semibold tracking-[0.08em] text-slate-900">
                  {formatCountdown(secondsLeft)}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none select-none blur-[8px] saturate-75 opacity-55">
          {children}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-royal-900/14 via-brand-royal-900/22 to-brand-royal-900/30"
        />
      </div>
    </section>
  );
}
