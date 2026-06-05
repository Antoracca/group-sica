"use client";

import { useState } from "react";
import {
  FileText,
  ReceiptText,
  ScrollText,
  Download,
  Check,
  PenLine,
  ShieldCheck,
  X,
  UploadCloud,
  FileIcon,
  MoreVertical,
  Search,
  Filter
} from "lucide-react";
import { Surface, StatusPill } from "@/espace/components/ui/primitives";
import type { Document, DocumentType, DocumentStatus } from "@/espace/lib/types";
import { formatFcfa } from "@/espace/lib/format";
import { cn } from "@sica/ui";

const DOC_ICON: Record<DocumentType, typeof FileText> = {
  Devis: ReceiptText,
  Contrat: ScrollText,
  "Bon de commande": FileText,
  Facture: ReceiptText,
  Rapport: FileText,
  Plan: FileText,
  "Document Légal": ScrollText,
};

const STATUT_LABEL: Record<DocumentStatus, string> = {
  "a-signer": "À signer",
  signe: "Signé",
  "en-attente": "En attente",
  archive: "Archivé",
};

const mockDocs: Document[] = [
  {
    id: "doc-1",
    pole: "construction",
    type: "Contrat",
    titre: "Contrat de Maîtrise d'Œuvre",
    reference: "CNT-2024-001",
    montant: 15000000,
    file_url: "#",
    version: 1,
    statut: "a-signer",
    doc_date: "2024-05-10",
    signed_at: null,
  },
  {
    id: "doc-2",
    pole: "assistance",
    type: "Facture",
    titre: "Facture Acompte 30%",
    reference: "FAC-2024-089",
    montant: 4500000,
    file_url: "#",
    version: 1,
    statut: "en-attente",
    doc_date: "2024-05-12",
    signed_at: null,
  },
  {
    id: "doc-3",
    pole: "construction",
    type: "Devis",
    titre: "Devis Travaux Supplémentaires",
    reference: "DEV-2024-042",
    montant: 2500000,
    file_url: "#",
    version: 2,
    statut: "signe",
    doc_date: "2024-04-20",
    signed_at: "2024-04-25T14:30:00Z",
  }
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState(mockDocs);
  const [signed, setSigned] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<Document | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const statutOf = (d: Document): DocumentStatus => (signed[d.id] ? "signe" : d.statut);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">GED & Documents</h1>
          <p className="mt-1 text-sm text-slate">
            Gérez vos fichiers, contrats et factures en toute sécurité.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="h-10 w-full rounded-full border border-black/10 bg-white pl-10 pr-4 text-sm font-medium text-ink placeholder:text-slate focus:border-brand-royal focus:outline-none focus:ring-1 focus:ring-brand-royal sm:w-64"
            />
          </div>
          <button className="flex size-10 items-center justify-center rounded-full border border-black/10 bg-white text-slate transition-colors hover:bg-mist">
            <Filter className="size-4" />
          </button>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div 
        className={cn(
          "relative mt-6 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 text-center transition-all",
          isDragging ? "border-brand-royal bg-brand-royal/5" : "border-black/10 bg-mist/30 hover:bg-mist/50"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-sm">
          <UploadCloud className="size-8 text-brand-royal" />
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-ink">Importer de nouveaux documents</h3>
        <p className="mt-1 text-sm text-slate">Glissez-déposez vos fichiers ici ou <button className="font-semibold text-brand-royal hover:underline">parcourez votre appareil</button></p>
        <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-wide text-slate">PDF, DOCX, JPG, PNG (Max 50MB)</p>
      </div>

      {/* Table de documents (Notion/Google Drive style) */}
      <Surface className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 bg-mist/50 font-mono text-[0.65rem] uppercase tracking-wider text-slate">
              <tr>
                <th className="px-6 py-4 font-semibold">Nom</th>
                <th className="px-6 py-4 font-semibold">Référence</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Statut</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {docs.map((d) => {
                const st = statutOf(d);
                const Icon = DOC_ICON[d.type] || FileIcon;
                
                return (
                  <tr key={d.id} className="group transition-colors hover:bg-mist/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Icon className="size-5 text-brand-royal" />
                        <span className="font-semibold text-ink">{d.titre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-slate">{d.reference}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-mist px-2 py-1 text-xs font-medium text-slate">{d.type}</span>
                    </td>
                    <td className="px-6 py-4 text-slate">
                      {new Date(d.doc_date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill kind={st} label={STATUT_LABEL[st]} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {st === "a-signer" ? (
                          <button
                            type="button"
                            onClick={() => setActive(d)}
                            className="flex h-8 items-center gap-1.5 rounded-full bg-brand-royal px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-royal-700"
                          >
                            <PenLine className="size-3.5" /> Signer
                          </button>
                        ) : (
                          <button
                            type="button"
                            aria-label="Télécharger"
                            className="flex size-8 items-center justify-center rounded-lg text-slate opacity-0 transition-all hover:bg-black/5 hover:text-ink group-hover:opacity-100"
                          >
                            <Download className="size-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          className="flex size-8 items-center justify-center rounded-lg text-slate opacity-0 transition-all hover:bg-black/5 hover:text-ink group-hover:opacity-100"
                        >
                          <MoreVertical className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Surface>

      {/* Modale de signature */}
      {active ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-royal-900/55 p-0 backdrop-blur-sm sm:items-center sm:p-6">
          <Surface className="w-full max-w-md rounded-t-3xl bg-white p-6 sm:rounded-3xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-brand-royal" />
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-royal">Signature sécurisée</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Fermer"
                className="flex size-9 items-center justify-center rounded-full text-slate hover:bg-black/[0.04]"
              >
                <X className="size-5" />
              </button>
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-ink">{active.titre}</h2>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wide text-slate">{active.reference}</p>
            <div className="mt-6 rounded-2xl bg-mist/60 p-5 text-sm leading-relaxed text-slate">
              <p>
                En signant ce document, vous l&apos;acceptez formellement.
                {active.montant > 0 && (
                  <span> Cela engage un montant de <span className="font-bold text-ink">{formatFcfa(active.montant)}</span>.</span>
                )}
              </p>
              <p className="mt-2 text-xs">La signature est horodatée et conservée de façon sécurisée sur nos serveurs.</p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="min-h-[48px] flex-1 rounded-full border border-black/10 text-sm font-semibold text-slate transition-colors hover:bg-mist"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = active.id;
                  setSigned((s) => ({ ...s, [id]: true }));
                  setActive(null);
                }}
                className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-brand-royal text-sm font-semibold text-white shadow-lg shadow-brand-royal/20 transition-colors hover:bg-brand-royal-700"
              >
                <Check className="size-4" /> Signer
              </button>
            </div>
          </Surface>
        </div>
      ) : null}
    </div>
  );
}
