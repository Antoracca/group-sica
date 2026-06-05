"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, ArrowLeft, Lock, User, Shield, FileText, Wifi, ChevronRight, Mail } from "lucide-react";
import { createClient } from "@/espace/lib/supabase/client";

interface ParticlesDef {
  color?: string;
  opacity?: number;
  count?: number;
  speed?: number;
  maxDist?: number;
}

function Particles({
  color = "255,255,255",
  opacity = 0.55,
  count = 24,
  speed = 0.32,
  maxDist = 110,
}: ParticlesDef) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 0.5) * speed * 2,
      r: Math.random() * 1.6 + 0.7,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i]!.x - pts[j]!.x;
          const dy = pts[i]!.y - pts[j]!.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(pts[i]!.x, pts[i]!.y);
            ctx.lineTo(pts[j]!.x, pts[j]!.y);
            ctx.strokeStyle = `rgba(${color},${(opacity * (1 - d / maxDist) * 0.42).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [color, opacity, count, speed, maxDist]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />;
}

const FEATURES = [
  {
    Icon: Wifi,
    label: "Suivi en temps reel",
    desc: "Progression chantier mise a jour en continu.",
  },
  {
    Icon: FileText,
    label: "Documents centralises",
    desc: "Plans, devis, comptes rendus et pieces contractuelles.",
  },
  {
    Icon: Shield,
    label: "Echanges securises",
    desc: "Canal direct avec votre equipe projet SICA.",
  },
] as const;

export default function EspaceClientPage() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [resetEmail, setResetEmail] = React.useState("");
  const [showPwd, setShowPwd] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [resetLoading, setResetLoading] = React.useState(false);
  const [resetSent, setResetSent] = React.useState(false);
  const [error, setError] = React.useState("");
  const [panel, setPanel] = React.useState<"login" | "reset">("login");
  const [direction, setDirection] = React.useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: username.trim(),
      password,
    });
    if (error) {
      setLoading(false);
      setError("Identifiants incorrects. Verifiez vos informations puis reessayez.");
      return;
    }
    router.push("/espace");
    router.refresh();
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/espace/parametres` : undefined,
    });
    setResetLoading(false);
    setResetSent(true);
  };

  const openResetPanel = () => {
    setDirection(1);
    setPanel("reset");
  };

  const openLoginPanel = () => {
    setDirection(-1);
    setPanel("login");
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full overflow-hidden bg-white">
      <aside
        aria-hidden
        className="relative hidden overflow-hidden lg:flex lg:w-[40%]"
        style={{
          background: "linear-gradient(155deg, #08112E 0%, #1E2F8A 60%, #0E1D53 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44'><g stroke='white' stroke-width='0.45' fill='none' opacity='0.07'><path d='M44 0H0V44'/></g></svg>\")",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="pointer-events-none absolute inset-0">
          <Particles color="255,255,255" opacity={0.55} count={28} speed={0.28} />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col justify-between p-10 xl:p-12">
          <div className="pt-3" />

          <div>
            <h1 className="font-display text-[2.3rem] font-bold leading-[1.06] tracking-tight text-white xl:text-[2.8rem]">
              Espace client
              <br />
              chantier SICA.
            </h1>
            <p className="mt-5 max-w-[32ch] text-[0.95rem] leading-relaxed text-white/58">
              Accedez a vos donnees projet et suivez chaque etape de votre chantier en toute simplicite.
            </p>

            <div className="mt-9 flex flex-col gap-4">
              {FEATURES.map(({ Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/12 text-white/85">
                    <Icon size={15} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[0.9rem] font-semibold text-white/92">{label}</p>
                    <p className="text-[0.82rem] text-white/52">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[0.74rem] text-white/30">© {new Date().getFullYear()} Groupe SICA</p>
        </div>
      </aside>

      <main className="relative flex flex-1 flex-col bg-white px-4 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-6 lg:px-12 lg:pb-10 lg:pt-8">
        <a
          href="/"
          className="absolute left-4 top-3 z-20 inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-[#7E88A6] transition-colors hover:text-[#1E2F8A] sm:left-6 sm:top-5"
        >
          <ArrowLeft size={14} strokeWidth={2.2} />
          Retour au site
        </a>

        <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
          <Particles color="30,47,138" opacity={0.2} count={14} speed={0.2} maxDist={95} />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[520px] flex-1 flex-col justify-start pt-10 sm:pt-12 lg:pt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-7 text-center sm:mb-8"
          >
            <Image
              src="/logo-groupe.png"
              alt="Groupe SICA"
              width={420}
              height={180}
              unoptimized
              className="mx-auto h-[112px] w-auto sm:h-[120px] lg:h-[96px]"
            />
            <h2 className="mt-2 font-display text-[clamp(1.7rem,4.2vw,2.45rem)] font-bold leading-[1.06] tracking-tight text-[#0C1A4E]">
              SICA ESPACE CLIENT
            </h2>
            <p className="mx-auto mt-2 max-w-[38ch] text-[0.95rem] leading-relaxed text-[#687390]">
              Connectez-vous pour acceder a votre tableau de bord chantier.
            </p>
          </motion.div>

          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              {panel === "login" ? (
                <motion.form
                  key="login-panel"
                  custom={direction}
                  initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#9BA3C0]">
                      <User size={16} strokeWidth={2.05} />
                    </div>
                    <input
                      type="text"
                      placeholder="Identifiant ou adresse e-mail"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      required
                      className="w-full rounded-xl border border-[#E4E7F0] bg-[#F7F8FC] py-4 pl-11 pr-4 text-base text-[#08112E] outline-none transition-all duration-200 placeholder:text-[#9AA3BE] focus:border-[#1E2F8A] focus:bg-white focus:shadow-[0_0_0_3px_rgba(30,47,138,0.09)]"
                    />
                  </div>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#9BA3C0]">
                      <Lock size={16} strokeWidth={2.05} />
                    </div>
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="w-full rounded-xl border border-[#E4E7F0] bg-[#F7F8FC] py-4 pl-11 pr-12 text-base text-[#08112E] outline-none transition-all duration-200 placeholder:text-[#9AA3BE] focus:border-[#1E2F8A] focus:bg-white focus:shadow-[0_0_0_3px_rgba(30,47,138,0.09)]"
                    />
                    <button
                      type="button"
                      aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      onClick={() => setShowPwd((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9BA3C0] transition-colors hover:text-[#1E2F8A]"
                    >
                      {showPwd ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer select-none items-center gap-2 text-[0.84rem] text-[#6B7490]">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 rounded border"
                        style={{ accentColor: "#1E2F8A" }}
                      />
                      Se souvenir de moi
                    </label>
                    <button
                      type="button"
                      onClick={openResetPanel}
                      className="text-[0.84rem] font-semibold text-[#1E2F8A] transition-colors hover:text-[#0F1E5A]"
                    >
                      Reinitialiser le mot de passe
                    </button>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        transition={{ duration: 0.24 }}
                        className="overflow-hidden rounded-xl border border-red-300/50 bg-red-50 px-4 py-3 text-[0.84rem] text-red-700"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={loading ? {} : { scale: 1.01 }}
                    whileTap={loading ? {} : { scale: 0.99 }}
                    className="group relative mt-1 flex w-full items-center justify-center overflow-hidden rounded-xl py-4 text-[0.98rem] font-semibold text-white transition-all duration-300 disabled:opacity-75"
                    style={{
                      background: "linear-gradient(135deg, #1E2F8A 0%, #2C47C5 100%)",
                      boxShadow: "0 4px 22px rgba(30,47,138,0.28), 0 1px 0 rgba(255,255,255,0.12) inset",
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.09] to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    />

                    {loading ? (
                      <span className="flex items-center gap-2.5">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4Z" />
                        </svg>
                        Connexion en cours...
                      </span>
                    ) : (
                      <span className="relative flex items-center gap-2">
                        Se connecter
                        <ChevronRight size={16} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    )}
                  </motion.button>

                  <p className="mt-2 text-[0.82rem] leading-relaxed text-[#6F7895]">
                    Vos identifiants de connexion vous ont ete communiques lors de la signature du contrat.
                    En cas de perte, utilisez la procedure de reinitialisation du mot de passe ou contactez votre interlocuteur SICA.
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="reset-panel"
                  custom={direction}
                  initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={handleResetSubmit}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  <p className="text-[0.92rem] leading-relaxed text-[#687390]">
                    Entrez votre adresse e-mail de connexion. Nous vous enverrons les instructions de reinitialisation.
                  </p>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#9BA3C0]">
                      <Mail size={16} strokeWidth={2.05} />
                    </div>
                    <input
                      type="email"
                      placeholder="Adresse e-mail"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      autoComplete="email"
                      required
                      className="w-full rounded-xl border border-[#E4E7F0] bg-[#F7F8FC] py-4 pl-11 pr-4 text-base text-[#08112E] outline-none transition-all duration-200 placeholder:text-[#9AA3BE] focus:border-[#1E2F8A] focus:bg-white focus:shadow-[0_0_0_3px_rgba(30,47,138,0.09)]"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={resetLoading}
                    whileHover={resetLoading ? {} : { scale: 1.01 }}
                    whileTap={resetLoading ? {} : { scale: 0.99 }}
                    className="group relative mt-1 flex w-full items-center justify-center overflow-hidden rounded-xl py-4 text-[0.98rem] font-semibold text-white transition-all duration-300 disabled:opacity-75"
                    style={{
                      background: "linear-gradient(135deg, #1E2F8A 0%, #2C47C5 100%)",
                      boxShadow: "0 4px 22px rgba(30,47,138,0.28), 0 1px 0 rgba(255,255,255,0.12) inset",
                    }}
                  >
                    {resetLoading ? "Envoi en cours..." : "Envoyer le lien de reinitialisation"}
                  </motion.button>

                  {resetSent ? (
                    <div className="rounded-xl border border-emerald-300/60 bg-emerald-50 px-4 py-3 text-[0.84rem] text-emerald-700">
                      Si un compte existe avec cette adresse, vous recevrez un e-mail de reinitialisation.
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={openLoginPanel}
                    className="mt-1 inline-flex items-center justify-center gap-2 text-[0.84rem] font-semibold text-[#1E2F8A] transition-colors hover:text-[#0F1E5A]"
                  >
                    <ArrowLeft size={14} strokeWidth={2.1} />
                    Retour a la connexion
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="mt-auto pt-5 text-center text-[0.75rem] text-[#A3ADC7]"
          >
            <span className="inline-flex items-center gap-2">
              <Shield size={12} strokeWidth={2} />
              Connexion securisee - Donnees chiffrees TLS 1.3
            </span>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
