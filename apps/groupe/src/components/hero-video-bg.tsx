"use client";

/**
 * YouTube iframe video background.
 * Positioned absolutely to cover the parent container (overflow-hidden required).
 * The video is 9:16 (Shorts) — scaling ensures full coverage on any aspect ratio.
 *
 * Layers expected from parent (bottom → top):
 *   z-0  this component
 *   z-10 dark overlay
 *   z-20 atmospheric effects
 *   z-30 content
 */
export function HeroVideoBg({ videoId }: { videoId: string }) {
  // vq=hd1080 demande la résolution maximale disponible dès le chargement
  const src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&mute=1&loop=1&playlist=${videoId}` +
    `&controls=0&showinfo=0&rel=0&iv_load_policy=3` +
    `&modestbranding=1&playsinline=1&disablekb=1&vq=hd1080`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <iframe
        src={src}
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        /* Cover any viewport regardless of video aspect ratio (9:16 Shorts).
           width: max(100%, calc(100svh * 9/16)) keeps correct ratio when tall.
           height: max(100%, calc(100vw * 16/9)) keeps correct ratio when wide. */
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "max(100%, calc(100svh * 0.5625))",
          height: "max(100%, calc(100vw * 1.7778))",
          minWidth: "100%",
          minHeight: "100%",
          border: 0,
          pointerEvents: "none",
          // Clarté et vivacité — compense la compression YouTube + scaling
          filter: "brightness(1.45) contrast(1.08) saturate(1.18)",
          // Force le rendu GPU pour éviter le flou de sous-pixel
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        title=""
        tabIndex={-1}
      />
    </div>
  );
}
