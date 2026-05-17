"use client";

import * as React from "react";

/**
 * HeroVideo — Autoplay iOS Safari + Loading UX rapide.
 *
 * Optimisations chargement :
 *  - `poster` JPG 100 KB visible immédiatement (frame extraite à 1 s)
 *  - `preload="auto"` → le navigateur commence à download dès parse HTML
 *  - Vidéo réencodée en H.264 1080p sans audio, mux faststart
 *    (passe de 17 MB → ~3 MB)
 *  - Fade-in CSS quand la vidéo est prête (`canplay`)
 *
 * Règle WebKit officielle :
 *   "Video elements will be allowed to autoplay without a user gesture
 *    if their muted property is set to true."
 *
 * Problème React : le prop `muted` n'est pas toujours sérialisé comme
 * attribut HTML dans le DOM (bug historique React #6544).
 * Fix : forcer via setAttribute() dans useEffect.
 *
 * Low Power Mode iOS : Apple bloque TOUT autoplay.
 * Le poster reste affiché en permanence (fallback naturel).
 */
export function HeroVideo() {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    /* ── Forcer les attributs critiques dans le DOM ── */
    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    /* ── Tentative de lecture ── */
    const tryPlay = () => {
      if (video.paused) {
        video.play().catch(() => {
          /* Bloqué par Low Power Mode ou politique navigateur
             → le poster reste affiché à la place */
        });
      }
    };

    /* ── Marqueur "prêt à jouer" (fade-in) ── */
    const onCanPlay = () => {
      setReady(true);
      tryPlay();
    };

    tryPlay();
    video.addEventListener("loadedmetadata", tryPlay, { once: true });
    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", onCanPlay, { once: true });

    /* ── Redémarrage 10 s avant la fin ── */
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 10) {
        video.currentTime = 0;
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);

    /* ── Relance quand la vidéo revient dans le viewport ── */
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) tryPlay();
      },
      { threshold: 0.1 }
    );
    io.observe(video);

    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      src="/hero.mp4"
      poster="/hero-poster.jpg"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="h-full w-full object-cover transition-opacity duration-500"
      style={{ opacity: ready ? 1 : 1 /* poster visible avant ready */ }}
    />
  );
}
