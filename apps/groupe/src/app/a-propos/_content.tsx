"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Award, MapPin, Phone } from "lucide-react";
import { Container } from "@sica/ui";

/* ─── Easing curve premium ───────────────────────────────────────────────── */
const E = [0.16, 1, 0.3, 1] as const;

/* ─── Composant Reveal générique (scroll-triggered) ─────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.78, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. EN-TÊTE ÉDITORIAL
═══════════════════════════════════════════════════════════════════════════ */
function IntroSection() {
  return (
    <div className="relative overflow-hidden bg-white pt-40 pb-20 sm:pt-48 sm:pb-28">
      {/* Watermark logo en filigrane */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none opacity-[0.04]"
      >
        <Image
          src="/logo-groupe.png"
          alt=""
          width={560}
          height={220}
          className="h-auto w-[clamp(260px,38vw,540px)]"
          draggable={false}
        />
      </div>

      <Container className="relative">
        <Reveal>
          <p className="mb-7 inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
            <span className="block h-px w-8 bg-[#F39200]" aria-hidden />
            Corporate
          </p>
        </Reveal>

        <Reveal delay={0.07}>
          <h1
            className="max-w-4xl text-balance text-[clamp(2.75rem,6.5vw,5.25rem)] font-bold leading-[1.02] tracking-tight text-[#0D1A4A]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Qui nous sommes,
            <br />
            <em className="not-italic" style={{ color: "#F39200" }}>
              d'où nous venons.
            </em>
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-pretty text-[1.0625rem] leading-[1.7] text-neutral-500">
            Une SARL ivoirienne fondée en 2020 à Abidjan. Portée par une conviction simple:
            la rigueur n'est pas une option, ni sur les chantiers ni dans les dossiers.
          </p>
        </Reveal>
      </Container>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. QUI SOMMES-NOUS (photo équipe en cercle)
═══════════════════════════════════════════════════════════════════════════ */
function TeamSection() {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F8F8F5] py-24 sm:py-32">
      {/* Grille blueprint très légère */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><path d='M56 0H0V56' fill='none' stroke='%231E2F8A' stroke-width='0.6'/></svg>\")",
          backgroundSize: "56px 56px",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_420px] xl:gap-24">

          {/* Texte */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -18 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, ease: E }}
              className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]"
            >
              Notre équipe
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.78, delay: 0.07, ease: E }}
              className="text-balance text-[clamp(1.875rem,4.5vw,3.125rem)] font-bold leading-tight tracking-tight text-[#0D1A4A]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Une organisation bâtie
              <br />
              sur la compétence.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.17, ease: E }}
            >
              <p className="mt-7 text-[1.0625rem] leading-[1.72] text-neutral-600">
                Depuis 2020, nos équipes grandissent avec méthode. Ingénieurs génie civil,
                techniciens supérieurs, juristes, comptables, conseillers en gestion:
                chaque recrutement est un choix délibéré en faveur de l'excellence.
              </p>
              <p className="mt-4 text-[1.0625rem] leading-[1.72] text-neutral-600">
                Cinq équipes terrain actives en BTP, un bureau d'études permanent, un pôle
                assistance complet. Une structure pensée pour servir sans jamais déléguer
                la responsabilité.
              </p>

              {/* Chiffres clés */}
              <div className="mt-11 flex flex-wrap gap-x-10 gap-y-5">
                {[
                  { n: "2020", label: "Fondée à Abidjan" },
                  { n: "5", label: "Équipes terrain" },
                  { n: "11+", label: "Projets livrés" },
                  { n: "2", label: "Implantations" },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="text-[2.125rem] font-black leading-none text-[#1E2F8A]"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {s.n}
                    </p>
                    <p className="mt-1.5 text-[0.665rem] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Photo équipe en cercle avec anneau ambre */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.22, ease: E }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Anneau ambre lumineux */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 0 0 3px #F39200, 0 0 52px rgba(243,146,0,0.26), 0 0 100px rgba(243,146,0,0.09)",
                }}
              />

              {/* Photo dans le cercle */}
              <div className="relative h-[325px] w-[325px] overflow-hidden rounded-full sm:h-[390px] sm:w-[390px]">
                <Image
                  src="/EQUIPE.jpeg"
                  alt="Équipe Groupe SICA"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 325px, 390px"
                />
                {/* Vignette intérieure */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, transparent 52%, rgba(13,26,74,0.28) 100%)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. DG — PORTRAIT CINÉMATOGRAPHIQUE
═══════════════════════════════════════════════════════════════════════════ */
function DirecteurSection() {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.14 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#060D22]">
      <div className="flex min-h-[680px] flex-col lg:grid lg:min-h-[760px] lg:grid-cols-2">

        {/* Photo — dessus sur mobile, droite sur desktop */}
        <div className="relative h-[340px] lg:order-2 lg:h-auto">
          <Image
            src="/DG.jpeg"
            alt="Ngoran Ivan, Fondateur et Directeur Général du Groupe SICA"
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Dégradé cinématographique gauche → transparence (desktop) */}
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, #060D22 0%, rgba(6,13,34,0.92) 18%, rgba(6,13,34,0.55) 48%, rgba(6,13,34,0.08) 75%, transparent 100%)",
            }}
          />
          {/* Dégradé vertical bas → haut (mobile: pour fondre avec la section texte) */}
          <div
            aria-hidden
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(to top, #060D22 0%, rgba(6,13,34,0.7) 35%, rgba(6,13,34,0.0) 70%)",
            }}
          />
          {/* Dégradé vertical haut (desktop seulement, pour estomper le haut photo) */}
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,13,34,0.5) 0%, transparent 30%, transparent 70%, rgba(6,13,34,0.3) 100%)",
            }}
          />
        </div>

        {/* Texte */}
        <div className="relative flex flex-col justify-center px-6 py-16 lg:order-1 lg:py-24 lg:pl-16 xl:pl-24">
          {/* Blueprint grid subtil */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><path d='M56 0H0V56' fill='none' stroke='white' stroke-width='0.5'/></svg>\")",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative max-w-[520px]">
            {/* Badge prix */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: E }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F39200]/30 bg-[#F39200]/10 px-3.5 py-1.5 text-[0.63rem] font-bold uppercase tracking-[0.22em] text-[#F39200]">
                <Award size={12} strokeWidth={2.2} aria-hidden />
                Meilleur jeune entrepreneur ivoirien 2023
              </span>
            </motion.div>

            {/* Nom */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: E }}
              className="mt-6 text-[clamp(2.75rem,5.5vw,4.25rem)] font-bold leading-[0.98] tracking-tight text-white"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Ngoran
              <br />
              <span style={{ color: "#F39200" }}>Ivan.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-2 text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-white/38"
            >
              Fondateur & Directeur Général
            </motion.p>

            {/* Corps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.78, delay: 0.28, ease: E }}
            >
              <p className="mt-9 text-[1rem] leading-[1.74] text-white/65">
                Depuis la création du Groupe SICA en 2020, Ngoran Ivan porte une vision
                claire: offrir à la Côte d'Ivoire un acteur intégré, capable d'accompagner
                aussi bien le montage d'une PME que la livraison d'un siège institutionnel.
              </p>
              <p className="mt-4 text-[1rem] leading-[1.74] text-white/65">
                Distingué Meilleur jeune entrepreneur ivoirien en 2023, il dirige aujourd'hui
                une équipe pluridisciplinaire: cinq équipes terrain BTP, techniciens supérieurs,
                juristes, comptables et conseillers en gestion.
              </p>

              {/* Citation */}
              <blockquote className="mt-10 border-l-[2.5px] border-[#F39200] pl-6">
                <p
                  className="text-[1.175rem] italic leading-[1.6] text-white/88"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  "Vos défis sont les nôtres: lancez-vous."
                </p>
                <footer className="mt-2 text-[0.78rem] text-white/36">
                  Ngoran Ivan, fondateur du Groupe SICA
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. ORGANIGRAMME — arbre animé
═══════════════════════════════════════════════════════════════════════════ */
const POLES = [
  {
    key: "commercial",
    label: "Pôle Commercial",
    sub: ["Vente Construction", "Vente Assistance", "Prospection & Marketing"],
  },
  {
    key: "technique",
    label: "Pôle Technique",
    sub: ["Études & conception", "Production chantier", "Génie civil & Géobéton", "Contrôle qualité"],
  },
  {
    key: "administratif",
    label: "Pôle Administratif",
    sub: ["Comptabilité & Finance", "Ressources humaines", "Juridique & Conformité", "Achats & Logistique"],
  },
];

/* SVG arbre pour desktop */
function OrgSVG({ inView }: { inView: boolean }) {
  const vertAnim = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { duration: 0.45, delay, ease: "easeOut" as const },
  });

  /* Positions : cx = centre de chaque pôle dans un viewBox 1000×330 */
  const NODES = [
    {
      cx: 160, x: 35, w: 250, label: "COMMERCIAL",
      sub: ["Vente Construction", "Vente Assistance", "Prospection & Marketing"],
    },
    {
      cx: 500, x: 375, w: 250, label: "TECHNIQUE",
      sub: ["Études & conception", "Production chantier", "Génie civil · Géobéton"],
    },
    {
      cx: 840, x: 715, w: 250, label: "ADMINISTRATIF",
      sub: ["Comptabilité & Finance", "Ressources humaines", "Juridique & Conformité"],
    },
  ];

  return (
    <svg
      viewBox="0 0 1000 330"
      className="w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      style={{ overflow: "visible" }}
    >
      {/* ── Nœud racine : Direction ── */}
      <motion.g
        initial={{ opacity: 0, y: -8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <rect x="360" y="14" width="280" height="62" rx="10"
          stroke="#F39200" strokeWidth="1.5" fill="rgba(243,146,0,0.09)" />
        <text x="500" y="41" textAnchor="middle"
          fill="#F39200" fontSize="11" fontWeight="800" letterSpacing="3" fontFamily="sans-serif">
          DIRECTION
        </text>
        <text x="500" y="59" textAnchor="middle"
          fill="rgba(243,146,0,0.62)" fontSize="10" fontFamily="sans-serif">
          Ngoran Ivan
        </text>
      </motion.g>

      {/* ── Ligne verticale principale ── */}
      <motion.path d="M500,76 L500,124" stroke="#F39200" strokeWidth="1.5"
        fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke"
        {...vertAnim(0.38)} />

      {/* ── Ligne horizontale complète (opacité, pas pathLength) ── */}
      <motion.line
        x1="160" y1="124" x2="840" y2="124"
        stroke="rgba(243,146,0,0.45)" strokeWidth="1.2"
        strokeLinecap="round" vectorEffect="non-scaling-stroke"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.62 }}
      />

      {/* ── Descentes vers les pôles ── */}
      {NODES.map(({ cx }, i) => (
        <motion.path key={`drop-${cx}`}
          d={`M${cx},124 L${cx},180`}
          stroke="rgba(243,146,0,0.45)" strokeWidth="1.2"
          fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke"
          {...vertAnim(0.78 + i * 0.06)} />
      ))}

      {/* ── Nœuds pôles ── */}
      {NODES.map(({ cx, x, w, label }, i) => (
        <motion.g
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.92 + i * 0.07 }}
        >
          <rect x={x} y="180" width={w} height="54" rx="8"
            stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="rgba(30,47,138,0.42)" />
          <text x={cx} y="213" textAnchor="middle"
            fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="700"
            letterSpacing="2" fontFamily="sans-serif">
            {label}
          </text>
        </motion.g>
      ))}

      {/* ── Lignes sous-items ── */}
      {NODES.map(({ cx }, i) => (
        <motion.path key={`sub-line-${cx}`}
          d={`M${cx},234 L${cx},252`}
          stroke="rgba(255,255,255,0.14)" strokeWidth="1"
          fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke"
          {...vertAnim(1.18 + i * 0.05)} />
      ))}

      {/* ── Textes sous-items ── */}
      {NODES.map(({ cx, sub }, i) => (
        <motion.g key={`sub-text-${cx}`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.38, delay: 1.32 + i * 0.06 }}
        >
          {sub.map((line, j) => (
            <text key={j} x={cx} y={265 + j * 14} textAnchor="middle"
              fill={j === 0 ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.28)"}
              fontSize="8.5" fontFamily="sans-serif">
              {line}
            </text>
          ))}
        </motion.g>
      ))}
    </svg>
  );
}

/* Arbre vertical pour mobile */
function OrgMobile({ inView }: { inView: boolean }) {
  return (
    <div className="flex flex-col items-center">
      {/* Racine */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-[#F39200]/50 bg-[#F39200]/10 px-8 py-3.5 text-center"
      >
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#F39200]">Direction</p>
        <p className="mt-0.5 text-[0.72rem] text-white/50">Ngoran Ivan</p>
      </motion.div>

      {/* Ligne */}
      <motion.div
        className="h-8 w-px origin-top bg-[#F39200]/35"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.4 }}
      />

      {/* Pôles */}
      <div className="flex w-full flex-col items-center gap-0">
        {POLES.map((p, i) => (
          <React.Fragment key={p.key}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
              className="w-full max-w-[320px] rounded-xl border border-white/12 bg-[#1E2F8A]/40 px-5 py-3 text-center"
            >
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/78">
                {p.label}
              </p>
              <p className="mt-1 text-[0.65rem] text-white/38">
                {p.sub.join("  ·  ")}
              </p>
            </motion.div>
            {i < POLES.length - 1 && (
              <motion.div
                className="h-4 w-px bg-white/12"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.25, delay: 0.7 + i * 0.1 }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function OrgSection() {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "#0D1A4A" }}
    >
      {/* Grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.038]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* Halo ambre bas-droite */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(243,146,0,0.28) 0%, transparent 65%)",
        }}
      />

      <Container className="relative">
        <Reveal>
          <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
            Organisation
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="mb-14 max-w-xl text-balance text-[clamp(1.875rem,4vw,2.875rem)] font-bold leading-tight tracking-tight text-white"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Une structure pensée
            <br />
            pour la performance.
          </h2>
        </Reveal>

        {/* Desktop : SVG animé */}
        <div className="hidden lg:block">
          <OrgSVG inView={inView} />
        </div>

        {/* Mobile : flux vertical */}
        <div className="lg:hidden">
          <OrgMobile inView={inView} />
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. IMPLANTATIONS
═══════════════════════════════════════════════════════════════════════════ */
function LocationCard({
  ville,
  role,
  adresse,
  detail,
  tel,
}: {
  ville: string;
  role: string;
  adresse: string;
  detail: string;
  tel: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#E4E7F0] bg-white p-8 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(30,47,138,0.10)]">
      {/* Barre ambre au hover */}
      <div className="absolute inset-x-0 top-0 h-[2.5px] origin-left scale-x-0 bg-gradient-to-r from-[#F39200] to-[#F7A832] transition-transform duration-500 group-hover:scale-x-100" />

      <p className="mb-1.5 text-[0.63rem] font-bold uppercase tracking-[0.28em] text-[#F39200]">
        {role}
      </p>
      <h3
        className="text-[2rem] font-bold tracking-tight text-[#0D1A4A]"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {ville}
      </h3>

      <div className="mt-5 space-y-1">
        <p className="text-[0.9375rem] font-medium text-neutral-700">{adresse}</p>
        <p className="text-[0.875rem] text-neutral-500">{detail}</p>
      </div>

      <a
        href={`tel:${tel.replace(/\s/g, "")}`}
        className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-[#1E2F8A] transition-colors hover:text-[#F39200]"
      >
        <Phone size={14} strokeWidth={2.2} aria-hidden />
        {tel}
      </a>
    </div>
  );
}

function ImplantationsSection() {
  return (
    <section className="bg-[#F8F8F5] py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#F39200]">
            Implantations
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="mb-12 max-w-2xl text-balance text-[clamp(1.875rem,4vw,2.875rem)] font-bold leading-tight tracking-tight text-[#0D1A4A]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Présents là où vos projets prennent vie.
          </h2>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <LocationCard
              ville="Abidjan"
              role="Siège social"
              adresse="Cocody Mermoz, derrière la Pharmacie Mermoz"
              detail="Après le terrain SOGEFIA/RTI"
              tel="+225 0709 883 293"
            />
          </Reveal>
          <Reveal delay={0.18}>
            <LocationCard
              ville="Yamoussoukro"
              role="Succursale"
              adresse="Morofé, 24 ampoules"
              detail="Rond-point route Daloa"
              tel="+225 2722 247 445"
            />
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <p className="mt-8 text-[0.875rem] text-neutral-500">
            Équipes mobiles partout en Côte d'Ivoire. Devis sur site possibles.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════════════════════════════════ */
export function AProposContent() {
  return (
    <>
      <IntroSection />
      <TeamSection />
      <DirecteurSection />
      <OrgSection />
      <ImplantationsSection />
    </>
  );
}
