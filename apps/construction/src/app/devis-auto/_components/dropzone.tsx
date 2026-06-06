"use client";

import { useCallback, useRef, useState } from "react";
import { FileUp, FileText, X } from "lucide-react";

/*
  Zone d'upload — drag & drop + clic. Pas d'emoji, pas de fioritures.
  Le « state » se montre par 2 marqueurs SVG (croix d'angle façon viseur archi)
  et une typo monospace pour la métadonnée du fichier.
*/

interface Props {
  onFile: (file: File) => void;
  disabled?: boolean;
  file?: File | null;
  onClear?: () => void;
}

export function Dropzone({ onFile, disabled, file, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);

  const accept = useCallback(
    (f: File | undefined | null) => {
      if (!f) return;
      if (!f.type.includes("pdf")) return;
      onFile(f);
    },
    [onFile],
  );

  if (file) {
    return (
      <div className="relative flex items-center gap-4 rounded-2xl border border-brand-royal/20 bg-white p-5 shadow-[0_8px_30px_-15px_rgba(13,26,74,0.25)]">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-royal/8 text-brand-royal">
          <FileText className="size-6" strokeWidth={1.5} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-semibold text-ink">{file.name}</p>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-slate">
            {(file.size / 1024).toFixed(0)} ko · PDF · prêt à analyser
          </p>
        </div>
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Retirer le fichier"
            className="flex size-10 items-center justify-center rounded-xl text-slate transition-colors hover:bg-black/5 hover:text-ink"
          >
            <X className="size-5" />
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setHover(true); }}
      onDragLeave={() => setHover(false)}
      onDrop={(e) => {
        e.preventDefault();
        setHover(false);
        accept(e.dataTransfer.files?.[0]);
      }}
      disabled={disabled}
      className={[
        "group relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden",
        "rounded-2xl border border-dashed bg-paper px-6 py-14 text-center transition-all duration-300",
        hover
          ? "border-brand-amber bg-brand-amber/[0.04] scale-[1.005]"
          : "border-ink/15 hover:border-brand-royal/40 hover:bg-white",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      ].join(" ")}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M40 0H0V40' fill='none' stroke='%231E2F8A' stroke-width='0.4' opacity='0.07'/></svg>\")",
        backgroundSize: "40px 40px",
      }}
    >
      {/* Croix d'angle façon viseur architecte */}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <span className={"flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-105 " + (hover ? "ring-2 ring-brand-amber" : "ring-1 ring-ink/8")}>
        <FileUp className="size-6 text-brand-royal" strokeWidth={1.5} />
      </span>

      <div>
        <p className="font-display text-xl font-bold tracking-[-0.01em] text-ink">
          Déposez votre plan
        </p>
        <p className="mt-1.5 text-sm text-slate">
          ou <span className="font-semibold text-brand-royal underline decoration-brand-amber/60 underline-offset-4">parcourez vos fichiers</span>
        </p>
        <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-slate/70">
          PDF · jusqu&apos;à 15 Mo · multi-pages acceptées
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => accept(e.target.files?.[0])}
      />
    </button>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "left-3 top-3 border-l-2 border-t-2",
    tr: "right-3 top-3 border-r-2 border-t-2",
    bl: "left-3 bottom-3 border-l-2 border-b-2",
    br: "right-3 bottom-3 border-r-2 border-b-2",
  };
  return <span aria-hidden className={`pointer-events-none absolute size-5 border-brand-royal/35 ${map[pos]}`} />;
}
