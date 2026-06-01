"use client";

import { useRef, useState } from "react";
import { Eraser, ImagePlus, PenLine, RotateCcw, Save } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";

/*
  Composant de signature professionnel — souris, tactile, stylet.
  Utilise `react-signature-canvas` (basé sur signature_pad). Export PNG
  transparent prêt à être posé sur le document PDF.
*/

export function SignaturePad({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
}) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [drawing, setDrawing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    sigRef.current?.clear();
    onChange(null);
  };

  const save = () => {
    const ref = sigRef.current;
    if (!ref || ref.isEmpty()) return;
    /* getTrimmedCanvas → recadrée sur le tracé, fond transparent. */
    const dataUrl = ref.getTrimmedCanvas().toDataURL("image/png");
    onChange(dataUrl);
    setDrawing(false);
  };

  const importImage = (files: FileList | null) => {
    if (!files || !files[0]) return;
    const url = URL.createObjectURL(files[0]);
    onChange(url);
  };

  return (
    <div className="space-y-3">
      {value && !drawing ? (
        /* ── Aperçu de la signature actuelle ── */
        <div className="rounded-xl border border-black/10 bg-mist/30 p-4">
          <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-black/15 bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Signature"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setDrawing(true)}
              className="flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-royal px-3 text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700"
            >
              <PenLine className="size-4" />
              Redessiner
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-black/10 px-3 text-sm font-medium text-slate transition-colors hover:bg-mist"
            >
              <RotateCcw className="size-4" />
              Effacer
            </button>
          </div>
        </div>
      ) : (
        /* ── Zone de dessin ── */
        <div className="rounded-xl border border-black/10 bg-white p-2">
          <div className="overflow-hidden rounded-lg border border-dashed border-brand-royal/30 bg-[linear-gradient(180deg,#fafbff_0%,#f4f6fb_100%)]">
            <SignatureCanvas
              ref={sigRef}
              penColor="#0B1020"
              backgroundColor="rgba(0,0,0,0)"
              canvasProps={{
                width: 520,
                height: 180,
                className: "block w-full h-[180px] touch-none cursor-crosshair",
              }}
            />
          </div>
          <p className="mt-2 px-1 text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate">
            Signez avec la souris, le doigt ou un stylet
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={clear}
              className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-black/10 px-3 text-sm font-medium text-slate transition-colors hover:bg-mist"
            >
              <Eraser className="size-4" />
              Effacer
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-black/10 px-3 text-sm font-medium text-slate transition-colors hover:bg-mist"
            >
              <ImagePlus className="size-4" />
              Importer
            </button>
            <button
              type="button"
              onClick={save}
              className="flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg bg-brand-amber px-3 text-sm font-semibold text-brand-royal-900 transition-colors hover:bg-brand-amber-600 hover:text-white"
            >
              <Save className="size-4" />
              Valider
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => importImage(e.target.files)}
          />
        </div>
      )}
    </div>
  );
}
