"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/espace/lib/supabase/client";

export default function PanelGestionLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !data.user) {
      setError("Identifiants incorrects.");
      setLoading(false);
      return;
    }

    /* Vérifier le rôle dans la table profiles */
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (!profile || (profile.role !== "staff" && profile.role !== "admin")) {
      await supabase.auth.signOut();
      setError("Accès refusé");
      setLoading(false);
      return;
    }

    router.push("/sica-panel-gestion/dashboard");
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/50">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-auto items-center justify-center">
            <Image 
              src="/logo-groupe.png" 
              alt="Groupe SICA" 
              width={160} 
              height={50} 
              className="object-contain"
            />
          </div>
          <div className="mt-10 flex items-center justify-center gap-2">
            <ShieldCheck className="size-5 text-brand-royal" />
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900">
              Gestion interne
            </h1>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Adresse e-mail
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="prenom@groupe-sica.com"
              className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-base text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/25"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Mot de passe
            </span>
            <span className="relative flex items-center">
              <input
                type={showPwd ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 pr-11 text-base text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/25"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 text-slate-400 transition-colors hover:text-slate-600"
                aria-label={showPwd ? "Masquer" : "Afficher"}
              >
                {showPwd ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
              </button>
            </span>
          </label>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600 border border-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-brand-royal text-sm font-semibold text-white transition-colors hover:bg-brand-royal-700 disabled:opacity-70 shadow-lg shadow-brand-royal/20"
          >
            {loading ? (
              <><Loader2 className="size-4 animate-spin" /> Connexion…</>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400">
          Accès réservé au personnel
        </p>
      </div>
    </div>
  );
}
