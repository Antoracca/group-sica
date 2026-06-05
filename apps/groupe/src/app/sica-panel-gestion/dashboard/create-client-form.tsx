"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, RefreshCw, UserPlus, Loader2 } from "lucide-react";
import { adminCreateClient } from "@/espace/lib/actions";

const labelCls =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500";
const fieldCls =
  "min-h-[44px] w-full rounded-md border border-slate-200 bg-slate-50 px-3.5 text-base text-slate-950 placeholder:text-slate-400 outline-none transition-colors focus:border-[#1E2F8A] focus:bg-white focus:ring-4 focus:ring-[#1E2F8A]/10";

function makePassword(): string {
  const a = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const b = "abcdefghijkmnpqrstuvwxyz";
  const n = "23456789";
  let out = "";
  for (let i = 0; i < 3; i++) out += a[Math.floor(Math.random() * a.length)];
  for (let i = 0; i < 4; i++) out += b[Math.floor(Math.random() * b.length)];
  for (let i = 0; i < 3; i++) out += n[Math.floor(Math.random() * n.length)];
  return out;
}

export function CreateClientForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ email: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function action(formData: FormData) {
    setStatus("loading");
    setError(null);
    const pwd = String(formData.get("password") ?? "");
    const res = await adminCreateClient(formData);
    if (res?.error) {
      setError(res.error);
      setStatus("idle");
      return;
    }
    setDone({ email: res!.email as string, password: pwd });
    setStatus("idle");
    setPassword("");
    router.refresh();
  }

  if (done) {
    const block = `Espace client SICA\nIdentifiant : ${done.email}\nMot de passe : ${done.password}\nhttps://espace.sica.ci`;
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center gap-2 text-slate-500">
          <Check className="size-5" />
          <p className="font-display text-lg font-semibold text-slate-950">Compte créé</p>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Transmettez ces identifiants au client avec le contrat signé. Le client devra changer son mot de
          passe à la première connexion.
        </p>
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-md border border-slate-200 bg-white p-4 font-mono text-sm text-slate-800">
{block}
        </pre>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(block);
              setCopied(true);
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            {copied ? <><Check className="size-4" /> Copié</> : <><Copy className="size-4" /> Copier</>}
          </button>
          <button
            type="button"
            onClick={() => { setDone(null); setCopied(false); }}
            className="inline-flex min-h-[44px] items-center rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            Créer un autre client
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className={labelCls}>Prénom</span>
          <input name="prenom" className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Nom</span>
          <input name="nom" className={fieldCls} />
        </label>
      </div>
      <label className="block">
        <span className={labelCls}>Entreprise</span>
        <input name="entreprise" className={fieldCls} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className={labelCls}>E-mail (identifiant)</span>
          <input name="email" type="email" required className={fieldCls} placeholder="client@entreprise.ci" />
        </label>
        <label className="block">
          <span className={labelCls}>Téléphone</span>
          <input name="telephone" type="tel" className={fieldCls} />
        </label>
      </div>
      <label className="block">
        <span className={labelCls}>Mot de passe provisoire</span>
        <span className="flex items-center gap-2">
          <input
            name="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldCls}
            placeholder="Au moins 8 caractères"
          />
          <button
            type="button"
            onClick={() => setPassword(makePassword())}
            aria-label="Générer un mot de passe"
            className="flex size-11 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#1E2F8A]"
          >
            <RefreshCw className="size-4" />
          </button>
        </span>
      </label>

      <label className="flex items-center gap-2.5 pt-1">
        <input name="seed" type="checkbox" defaultChecked className="size-4 accent-[#1E2F8A]" />
        <span className="text-sm text-slate-600">Pré-remplir l&apos;espace (2 projets, 1 devis, 1 demande)</span>
      </label>

      {error ? (
        <p role="alert" className="rounded-md bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-slate-950 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-70"
      >
        {status === "loading" ? (
          <><Loader2 className="size-4 animate-spin" /> Création...</>
        ) : (
          <><UserPlus className="size-4" /> Créer le compte client</>
        )}
      </button>
    </form>
  );
}


