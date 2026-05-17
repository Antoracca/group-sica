"use client";

import * as React from "react";

/**
 * HeroVideo — Autoplay iOS Safari.
 *
 * Règle WebKit officielle :
 *   "Video elements will be allowed to autoplay without a user gesture
 *    if their muted property is set to true."
 * → Le fichier peut avoir une piste audio, tant que l'attribut `muted`
 *   est présent dans le DOM, iOS Safari autorise l'autoplay.
 *
 * Problème React : le prop `muted` n'est pas toujours sérialisé comme
 * attribut HTML dans le DOM (bug historique React #6544).
 * Fix : forcer via setAttribute() dans useEffect.
 *
 * Low Power Mode (batterie jaune) : Apple bloque TOUT autoplay.
 * Aucun code ne peut contourner ça — c'est une politique Apple.
 * Le fond sombre du hero s'affiche à la place (fallback naturel).
 */
export function HeroVideo() {
  const ref = React.useRef<HTMLVideoElement>(null);

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
             → le poster / fond sombre s'affiche à la place */
        });
      }
    };

    tryPlay();
    video.addEventListener("loadedmetadata", tryPlay, { once: true });
    video.addEventListener("loadeddata",     tryPlay, { once: true });
    video.addEventListener("canplay",        tryPlay, { once: true });

    /* ── Redémarrage 10 s avant la fin ──
       À chaque tick timeupdate, si currentTime ≥ duration - 10s,
       on repart de 0 : les 10 dernières secondes sont sautées. */
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 10) {
        video.currentTime = 0;
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);

    /* ── Relance quand la vidéo revient dans le viewport ── */
    const io = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) tryPlay(); },
      { threshold: 0.1 }
    );
    io.observe(video);

    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("loadeddata",     tryPlay);
      video.removeEventListener("canplay",        tryPlay);
      video.removeEventListener("timeupdate",     handleTimeUpdate);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      src="/hero-original.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="h-full w-full object-cover"
    />
  );
}
