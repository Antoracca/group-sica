"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView, animate } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   Typographies Google Fonts (injection directe — client component)
   DM Serif Display : grands chiffres éditoriaux, contraste fort
   Barlow Condensed : labels petites caps, technicité
   Barlow           : sub-labels, légèreté
───────────────────────────────────────────────────────────── */
const FONTS_CSS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400&display=swap');`;

/* ─────────────────────────────────────────────────────────────
   Constellation canvas — particules interconnectées, réactives
   au curseur sur desktop. Canvas 2D pur, zéro lib externe.
   z-[4] : au-dessus de l'overlay (z-[1]) et du watermark (z-[3])
           mais sous le contenu (z-10) et les rideaux (z-20).
───────────────────────────────────────────────────────────── */
interface ParticleFieldProps {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}

function ParticleField({ mouseRef }: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── Dimensions : parentElement.clientWidth est fiable après layout ── */
    const setSize = () => {
      const parent = canvas.parentElement;
      canvas.width  = parent ? parent.clientWidth  : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const isMobile = window.innerWidth < 768;
    const COUNT    = isMobile ? 36 : 70;
    const CONN     = isMobile ? 90 : 140;
    const MOUSE_R  = 120;
    const SPEED    = 0.25;

    /* ── Particules (initialisées après setSize pour avoir les bonnes dims) ── */
    type P = { x: number; y: number; vx: number; vy: number; r: number; amber: boolean };

    const mkParticles = (): P[] =>
      Array.from({ length: COUNT }, () => ({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * SPEED,
        vy:    (Math.random() - 0.5) * SPEED,
        r:     Math.random() * 1.4 + 0.6,
        amber: Math.random() < 0.13,
      }));

    let particles = mkParticles();

    /* Recréer les particules avec les nouvelles dimensions au resize */
    const onResize = () => { setSize(); particles = mkParticles(); };
    window.addEventListener("resize", onResize);

    /* ── Boucle rAF ── */
    let raf = 0;
    const CONN2 = CONN * CONN;

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mx = (mouseRef.current ?? { x: -9999, y: -9999 }).x;
      const my = (mouseRef.current ?? { x: -9999, y: -9999 }).y;

      for (const p of particles) {
        /* Répulsion curseur */
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_R * MOUSE_R && d2 > 0) {
          const d = Math.sqrt(d2);
          const f = ((MOUSE_R - d) / MOUSE_R) * 0.05;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        /* Amortissement */
        p.vx *= 0.990;
        p.vy *= 0.990;
        /* Plafond vitesse */
        const spd2 = p.vx * p.vx + p.vy * p.vy;
        if (spd2 > 1.6) { const s = Math.sqrt(spd2); p.vx = p.vx / s * 1.27; p.vy = p.vy / s * 1.27; }
        /* Bruit pour garder le mouvement vivant */
        if (spd2 < 0.012) { p.vx += (Math.random() - 0.5) * 0.015; p.vy += (Math.random() - 0.5) * 0.015; }
        /* Déplacement + wrap */
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
      }

      /* Lignes */
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]!;
          const d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
          if (d2 < CONN2) {
            ctx.globalAlpha = (1 - d2 / CONN2) * 0.22;
            ctx.strokeStyle = "#1E2F8A";
            ctx.lineWidth   = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      /* Points */
      for (const p of particles) {
        ctx.globalAlpha = p.amber ? 0.38 : 0.28;
        ctx.fillStyle   = p.amber ? "#F39200" : "#1E2F8A";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("resize", onResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Données
───────────────────────────────────────────────────────────── */
const STATS = [
  {
    value: 6,
    suffix: "",
    lines: ["ANNÉES", "D'EXPERTISE"],
    sub: "Fondé en 2020",
    delay: 1.05,
    /* Staircase desktop — ces classes Tailwind doivent rester en strings
       complètes pour que le scanner JIT les détecte */
    mtClass:    "lg:mt-0",
    itemsClass: "items-start",
    padClass:   "",
  },
  {
    value: 150,
    suffix: "+",
    lines: ["PROJETS", "LIVRÉS"],
    sub: "BTP · Génie civil · Géobéton",
    delay: 1.22,
    mtClass:    "lg:mt-20",
    itemsClass: "items-end lg:items-start",
    padClass:   "lg:pl-8",
  },
  {
    value: 2,
    suffix: "",
    lines: ["VILLES", "COUVERTES"],
    sub: "Abidjan · Yamoussoukro",
    delay: 1.38,
    mtClass:    "lg:mt-6",
    itemsClass: "items-start lg:items-end",
    padClass:   "lg:pr-8",
  },
  {
    value: 500,
    suffix: "+",
    lines: ["CLIENTS", "ACCOMPAGNÉS"],
    sub: "PME · Particuliers · Promoteurs",
    delay: 1.54,
    mtClass:    "lg:mt-28",
    itemsClass: "items-end",
    padClass:   "",
  },
] as const;

/* ─────────────────────────────────────────────────────────────
   Composant compteur — animate() de motion/react
───────────────────────────────────────────────────────────── */
function CountUp({
  value,
  active,
  delay,
}: {
  value: number;
  active: boolean;
  delay: number;
}) {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const ctrl = animate(0, value, {
      duration: 1.55,
      delay: Math.max(0, delay),
      ease: [0.16, 1, 0.3, 1], // expo-out custom
      onUpdate: (n) => {
        if (spanRef.current) spanRef.current.textContent = Math.round(n).toString();
      },
    });

    return () => ctrl.stop();
  }, [active, value, delay]);

  return <span ref={spanRef}>0</span>;
}

/* ─────────────────────────────────────────────────────────────
   Keyframes rideau — deux triangles qui se referment puis
   s'ouvrent en diagonale (sens opposés)
───────────────────────────────────────────────────────────── */
const CURTAIN_TIMES = [0, 0.36, 0.55, 1] as [number, number, number, number];

const CURTAIN_TL = {
  x: ["-101%", "0%", "0%", "-101%"],
  y: ["-101%", "0%", "0%", "-101%"],
};
const CURTAIN_BR = {
  x: ["101%", "0%", "0%", "101%"],
  y: ["101%", "0%", "0%", "101%"],
};
const CURTAIN_TRANSITION = {
  duration: 1.1,
  times: CURTAIN_TIMES,
  ease: "easeInOut" as const,
};

/* ─────────────────────────────────────────────────────────────
   Section Stats
───────────────────────────────────────────────────────────── */
export function Stats() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const mouseRef   = React.useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  /* Tracking souris sur la section — passé au canvas via ref (pas de re-render) */
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove  = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  /* margin: "-20%" → la section doit être à 20% à l'intérieur du viewport
     avant de déclencher — l'animation se lance quand on est vraiment dessus. */
  const inView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <>
      {/* Injection fonts */}
      <style dangerouslySetInnerHTML={{ __html: FONTS_CSS }} />

      <section
        ref={sectionRef}
        aria-label="Chiffres clés du Groupe SICA"
        className="relative isolate overflow-hidden pb-24 pt-20 sm:pb-32 sm:pt-28 lg:pb-44 lg:pt-32"
      >

        {/* Constellation canvas — z-[4], au-dessus overlay/watermark */}
        <ParticleField mouseRef={mouseRef} />

        {/* ═══════════════════════════════════════════════════
            FOND PHOTO — plans d'architecte + casque amber
            next/image gère AVIF → WebP → JPG selon navigateur
        ═══════════════════════════════════════════════════ */}
        <Image
          src="/plan-ouverture-architecte-recolte.avif"
          alt=""
          aria-hidden
          fill
          className="pointer-events-none object-cover object-center select-none"
          quality={85}
          priority={false}
        />

        {/* Overlay blanc nuancé bleu — 82% opacité
            Plans transparaissent à ~18% : texture blueprints subtile
            Le casque jaune en haut-droit = écho warm de l'amber SICA */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ backgroundColor: "#F4F7FF", opacity: 0.82 }}
        />

        {/* ═══════════════════════════════════════════════════
            FOND : courbes SVG + séparateurs (z-[2] au-dessus overlay)
        ═══════════════════════════════════════════════════ */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 600"
        >
          {/* Grande courbe royale */}
          <path
            d="M-80,520 C200,80 580,480 900,180 C1050,60 1250,320 1540,120"
            fill="none"
            stroke="#1E2F8A"
            strokeWidth="1.5"
            opacity="0.045"
          />
          {/* Courbe amber plus basse */}
          <path
            d="M-40,600 C260,380 660,120 1200,380 C1320,440 1420,380 1540,400"
            fill="none"
            stroke="#F39200"
            strokeWidth="1"
            opacity="0.065"
          />
          {/* Séparateurs obliques amber entre les stats (desktop) */}
          <line x1="372" y1="30"  x2="350" y2="570" stroke="#F39200" strokeWidth="0.8" opacity="0.20" />
          <line x1="738" y1="20"  x2="762" y2="580" stroke="#F39200" strokeWidth="0.8" opacity="0.16" />
          <line x1="1092" y1="40" x2="1070" y2="560" stroke="#F39200" strokeWidth="0.8" opacity="0.18" />
        </svg>

        {/* Watermark SICA — quasi invisible, donne de la profondeur */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center overflow-hidden select-none"
        >
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "22vw",
              color: "#1E2F8A",
              opacity: 0.016,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            SICA
          </span>
        </div>

        {/* ═══════════════════════════════════════════════════
            RIDEAU DIAGONAL — Triangle haut-gauche (#1E2F8A)
            clip-path + translate → la forme reste un triangle
            pendant tout le déplacement
        ═══════════════════════════════════════════════════ */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
            backgroundColor: "#1E2F8A",
          }}
          initial={{ x: "-101%", y: "-101%" }}
          animate={inView ? CURTAIN_TL : undefined}
          transition={CURTAIN_TRANSITION}
        />

        {/* Triangle bas-droite */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            backgroundColor: "#1E2F8A",
          }}
          initial={{ x: "101%", y: "101%" }}
          animate={inView ? CURTAIN_BR : undefined}
          transition={CURTAIN_TRANSITION}
        />

        {/* ═══════════════════════════════════════════════════
            CONTENU
        ═══════════════════════════════════════════════════ */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">

          {/* Eyebrow — amber, tracking extrême */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.08 }}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            className="mb-16 text-center text-[13px] font-semibold uppercase tracking-[0.32em] text-[#F39200] sm:mb-20 sm:text-[14px]"
          >
            Le Groupe SICA en chiffres
          </motion.p>

          {/* ── Grid staircase 2×2 mobile / 1×4 desktop ── */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: stat.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={[
                  "flex flex-col",
                  stat.mtClass,
                  stat.itemsClass,
                  stat.padClass,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {/* ── Chiffre monumental ── */}
                <div
                  aria-label={`${stat.value}${stat.suffix}`}
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(4rem, 8.5vw, 8.5rem)",
                    lineHeight: 0.88,
                    letterSpacing: "-0.03em",
                    color: "#1E2F8A",
                  }}
                >
                  <CountUp
                    value={stat.value}
                    active={inView}
                    delay={stat.delay - 0.88}
                  />
                  {stat.suffix && (
                    <sup
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.38em",
                        color: "#F39200",
                        verticalAlign: "super",
                        lineHeight: 1,
                        letterSpacing: "0em",
                      }}
                    >
                      {stat.suffix}
                    </sup>
                  )}
                </div>

                {/* ── Label petites caps ── */}
                <div
                  className="mt-4 flex flex-col gap-0.5"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {stat.lines.map((line, li) => (
                    <span
                      key={li}
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        letterSpacing: "0.24em",
                        textTransform: "uppercase" as const,
                        color: "#1E2F8A",
                        opacity: li === 0 ? 0.82 : 0.5,
                      }}
                    >
                      {line}
                    </span>
                  ))}
                </div>

                {/* ── Sub-label discret ── */}
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.6875rem",
                    fontWeight: 300,
                    color: "#1E2F8A",
                    opacity: 0.38,
                    letterSpacing: "0.03em",
                    lineHeight: 1.6,
                  }}
                >
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
