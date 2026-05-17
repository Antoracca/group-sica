"use client";

import { cn } from "@sica/ui";
import { useEffect, useState } from "react";

const anchors = [
  { id: "hero", label: "Intro" },
  { id: "expertises", label: "Expertises" },
  { id: "projets-az", label: "Projets A-Z" },
  { id: "equipe", label: "Équipe" },
  { id: "process", label: "Méthode" },
];

export function SectionRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-20% 0px -35% 0px" },
    );

    anchors.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <nav aria-label="Navigation rapide sections">
        <ul className="space-y-2 rounded-2xl border border-brand-royal/10 bg-white/85 p-3 shadow-lg backdrop-blur">
          {anchors.map((anchor) => (
            <li key={anchor.id}>
              <a
                href={`#${anchor.id}`}
                className={cn(
                  "block rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors",
                  active === anchor.id
                    ? "bg-brand-royal text-white"
                    : "text-brand-royal/70 hover:bg-brand-royal/10 hover:text-brand-royal",
                )}
              >
                {anchor.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

