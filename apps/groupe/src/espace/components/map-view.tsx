"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/espace/lib/types";

const MapViewClient = dynamic(() => import("./map-view-client"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate/5 animate-pulse border border-black/5">
      <p className="text-slate font-medium">Chargement de la carte...</p>
    </div>
  ),
});

export function MapView({ initialProjects }: { initialProjects: Project[] }) {
  return <MapViewClient initialProjects={initialProjects} />;
}
