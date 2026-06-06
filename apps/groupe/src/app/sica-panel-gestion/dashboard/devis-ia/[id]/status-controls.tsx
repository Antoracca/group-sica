"use client";

import { useTransition } from "react";
import { CheckCircle2, XCircle, Trash2, Loader2 } from "lucide-react";
import { setGenerationStatus, deleteGeneration } from "../actions";

interface Props {
  generationId: string;
  status: string;
}

export function StatusControls({ generationId, status }: Props) {
  const [pending, startTransition] = useTransition();

  const set = (next: "accepted" | "rejected") =>
    startTransition(async () => {
      await setGenerationStatus({ generationId, status: next });
    });

  const remove = () =>
    startTransition(async () => {
      if (!window.confirm("Supprimer définitivement cette génération ?")) return;
      await deleteGeneration(generationId);
    });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => set("accepted")}
        disabled={pending || status === "accepted"}
        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
        Accepter
      </button>
      <button
        type="button"
        onClick={() => set("rejected")}
        disabled={pending || status === "rejected"}
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100 disabled:opacity-50"
      >
        <XCircle className="size-4" />
        Rejeter
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={pending}
        className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
      >
        <Trash2 className="size-4" />
        Supprimer
      </button>
    </div>
  );
}
