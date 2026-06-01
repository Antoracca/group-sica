"use client";

import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import {
  Stamp,
  PenLine,
  RotateCcw,
  RotateCw,
  Trash2,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { DevisState, StampConfig } from "@/lib/devis/types";
import { DEFAULT_STAMP } from "@/lib/devis/state";
import { SignaturePad } from "./signature-pad";
import { StampBuilder } from "./stamp-builder";
import { StampRenderer } from "./stamp-renderer";

type Tab = "signature" | "stamp";

/*
  Panneau « Signature & Cachet » — réservé au personnel SICA.
  Modal plein écran avec deux onglets : la signature manuscrite et le cachet
  officiel. Le cachet peut être généré (formes, couleur, lignes) ou importé
  (PNG/JPG), puis positionné via rotation + échelle.
*/

export function SignatureStampPanel({
  state,
  setState,
  onClose,
}: {
  state: DevisState;
  setState: Dispatch<SetStateAction<DevisState>>;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("signature");
  const fileRef = useRef<HTMLInputElement>(null);

  const stamp = state.stampConfig ?? DEFAULT_STAMP;

  const setSignature = (url: string | null) =>
    setState((s) => ({ ...s, signatureStaffUrl: url }));

  const setStamp = (next: StampConfig) =>
    setState((s) => ({ ...s, stampConfig: next, importedStamp: null }));

  const importStamp = (files: FileList | null) => {
    if (!files || !files[0]) return;
    const f = files[0];
    const url = URL.createObjectURL(f);
    setState((s) => ({
      ...s,
      importedStamp: { url, name: f.name },
    }));
  };

  const removeImportedStamp = () =>
    setState((s) => ({ ...s, importedStamp: null }));

  const rotate = (delta: number) =>
    setState((s) => ({
      ...s,
      stampPlacement: {
        ...s.stampPlacement,
        rotation: Math.max(-180, Math.min(180, s.stampPlacement.rotation + delta)),
      },
    }));

  const scale = (delta: number) =>
    setState((s) => ({
      ...s,
      stampPlacement: {
        ...s.stampPlacement,
        scale: Math.max(0.4, Math.min(2, +(s.stampPlacement.scale + delta).toFixed(2))),
      },
    }));

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-royal-900/70 backdrop-blur-sm">
      <div className="flex h-[min(92vh,820px)] w-[min(96vw,1100px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-black/10 px-6 py-4">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand-amber">
              Personnel SICA
            </p>
            <h2 className="font-display text-xl font-semibold text-ink">
              Signature &amp; Cachet
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex size-10 items-center justify-center rounded-full text-slate transition-colors hover:bg-mist"
          >
            <X className="size-5" />
          </button>
        </header>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-black/10 bg-mist/30 px-4 pt-2">
          <TabBtn active={tab === "signature"} onClick={() => setTab("signature")} icon={PenLine}>
            Signature
          </TabBtn>
          <TabBtn active={tab === "stamp"} onClick={() => setTab("stamp")} icon={Stamp}>
            Cachet
          </TabBtn>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto bg-mist/15 p-5">
          {tab === "signature" ? (
            <div className="mx-auto max-w-2xl">
              <SignaturePad value={state.signatureStaffUrl} onChange={setSignature} />
            </div>
          ) : (
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Colonne gauche : builder OU aperçu import */}
              <div>
                {state.importedStamp ? (
                  <div className="rounded-xl border border-black/10 bg-white p-4">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
                      Cachet importé
                    </p>
                    <div className="mt-3 flex h-56 items-center justify-center rounded-lg border border-dashed border-black/15 bg-mist/20 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={state.importedStamp.url}
                        alt={state.importedStamp.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImportedStamp}
                      className="mt-3 flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-lg border border-black/10 text-sm font-medium text-slate transition-colors hover:bg-mist"
                    >
                      <Trash2 className="size-4" />
                      Retirer et revenir au générateur
                    </button>
                  </div>
                ) : (
                  <StampBuilder config={stamp} onChange={setStamp} />
                )}
              </div>

              {/* Colonne droite : import + placement */}
              <div className="space-y-4">
                <div className="rounded-xl border border-black/10 bg-white p-4">
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
                    Ou importer un cachet existant
                  </p>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex min-h-[88px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-black/20 bg-mist/30 text-center transition-colors hover:border-brand-royal/40"
                  >
                    <Upload className="size-5 text-brand-royal" />
                    <span className="text-sm font-medium text-ink">
                      Importer une image (PNG / JPG)
                    </span>
                    <span className="text-xs text-slate">
                      La transparence PNG est préservée
                    </span>
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={(e) => importStamp(e.target.files)}
                  />
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-4">
                  <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
                    Placement sur le document
                  </p>

                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-black/15 bg-[radial-gradient(circle_at_center,#fff_0%,#eef1f7_100%)]">
                    <div
                      style={{
                        transform: `rotate(${state.stampPlacement.rotation}deg) scale(${state.stampPlacement.scale})`,
                        transformOrigin: "center",
                      }}
                    >
                      {state.importedStamp ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={state.importedStamp.url}
                          alt=""
                          className="max-h-32 object-contain"
                        />
                      ) : (
                        <StampRenderer config={stamp} size={120} />
                      )}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Control onClick={() => rotate(-10)} icon={RotateCcw}>
                      Tourner −10°
                    </Control>
                    <Control onClick={() => rotate(10)} icon={RotateCw}>
                      Tourner +10°
                    </Control>
                    <Control onClick={() => scale(-0.1)} icon={ZoomOut}>
                      Réduire
                    </Control>
                    <Control onClick={() => scale(0.1)} icon={ZoomIn}>
                      Agrandir
                    </Control>
                  </div>

                  <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] text-slate">
                    Rotation {state.stampPlacement.rotation}° · Échelle{" "}
                    {Math.round(state.stampPlacement.scale * 100)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-black/10 px-6 py-3">
          <p className="text-xs text-slate">
            Les éléments sont apposés automatiquement sur la page Signature du devis.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[40px] items-center justify-center rounded-lg bg-brand-royal px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700"
          >
            Terminé
          </button>
        </footer>
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof PenLine;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-selected={active}
      className={`flex h-10 items-center gap-2 rounded-t-lg px-4 text-sm font-semibold transition-colors ${
        active
          ? "bg-white text-brand-royal shadow-sm"
          : "text-slate hover:text-ink"
      }`}
    >
      <Icon className="size-4" />
      {children}
    </button>
  );
}

function Control({
  onClick,
  icon: Icon,
  children,
}: {
  onClick: () => void;
  icon: typeof RotateCcw;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-black/10 text-sm font-medium text-slate transition-colors hover:bg-mist"
    >
      <Icon className="size-4" />
      {children}
    </button>
  );
}
