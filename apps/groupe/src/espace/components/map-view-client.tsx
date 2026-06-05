"use client";

import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Building2, FileText, MapPin, X, ChevronRight } from "lucide-react";
import { cn } from "@sica/ui";
import { StatusPill, Progress } from "@/espace/components/ui/primitives";
import { usePole, filterByPole } from "@/espace/lib/pole-context";
import type { Project } from "@/espace/lib/types";

const { BaseLayer } = LayersControl;

const createCustomIcon = (type: string, active: boolean) => {
  const colorClass = active 
    ? "bg-brand-amber text-white ring-[4px] ring-brand-amber/30 scale-110" 
    : "bg-brand-royal text-white ring-[3px] ring-brand-royal/20 hover:scale-110";
  
  const html = `
    <div class="relative flex flex-col items-center group transition-all duration-300">
      <div class="flex items-center justify-center rounded-full ${colorClass} w-7 h-7 shadow-lg transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${type === 'chantier' 
            ? '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path>'
            : '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line>'}
        </svg>
      </div>
      <div class="w-1.5 h-1.5 bg-brand-royal/40 rounded-full mt-1 blur-[1px]"></div>
    </div>
  `;
  
  return L.divIcon({
    html,
    className: 'bg-transparent border-none',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
};

export default function MapViewClient({ initialProjects }: { initialProjects: Project[] }) {
  const { pole } = usePole();
  const suivis = useMemo(() => filterByPole(initialProjects, pole), [initialProjects, pole]);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const activeProject = useMemo(() => suivis.find((s: Project) => s.id === activeId) || null, [suivis, activeId]);

  const center: [number, number] = [7.54, -5.54]; // Centered on Ivory Coast
  const zoom = 6; // Adjusted zoom to fit the country nicely

  const getLatLng = (lat: number | null, lng: number | null): [number, number] => {
    if (lat !== null && lng !== null) return [lat, lng];
    return [7.54, -5.54];
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-sm border border-black/5 bg-slate/5">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Plan (OSM)">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
          </BaseLayer>
          <BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri"
            />
          </BaseLayer>
        </LayersControl>
        
        <ZoomControl position="bottomright" />
        
        {suivis.map((s: Project) => {
          const position = getLatLng(s.pos_lat, s.pos_lng);
          const isActive = activeId === s.id;
          return (
            <Marker 
              key={s.id} 
              position={position}
              icon={createCustomIcon(s.type, isActive)}
              eventHandlers={{
                click: () => setActiveId(s.id)
              }}
            />
          );
        })}
      </MapContainer>

      {/* Slide-over SidePanel for active project */}
      <div 
        className={cn(
          "absolute top-4 right-4 bottom-14 md:bottom-4 w-[calc(100%-2rem)] md:w-80 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 z-10 flex flex-col border border-black/5 overflow-hidden",
          activeProject ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0 pointer-events-none"
        )}
      >
        {activeProject && (
          <>
            <div className="p-5 border-b border-black/5 flex items-start justify-between bg-white">
              <div>
                <StatusPill kind={activeProject.statut} label={activeProject.statut} />
                <h3 className="mt-3 font-display text-lg font-bold leading-tight text-ink pr-4">
                  {activeProject.titre}
                </h3>
              </div>
              <button 
                onClick={() => setActiveId(null)}
                className="p-1.5 -mr-1.5 -mt-1.5 rounded-full hover:bg-slate-100 text-slate transition-colors"
                aria-label="Fermer"
              >
                <X className="size-5" />
              </button>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto space-y-6">
              <div className="space-y-2.5">
                <p className="flex items-start gap-2.5 text-sm font-medium text-slate">
                  <MapPin className="size-4.5 mt-0.5 text-brand-royal/60 shrink-0" /> 
                  <span className="leading-snug">{activeProject.localisation}</span>
                </p>
                <p className="flex items-center gap-2.5 text-sm font-medium text-slate">
                  {activeProject.type === "chantier" ? <Building2 className="size-4.5 text-brand-royal/60 shrink-0" /> : <FileText className="size-4.5 text-brand-royal/60 shrink-0" />}
                  {activeProject.reference}
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-ink">Avancement</span>
                  <span className="text-sm font-bold text-brand-royal">{activeProject.avancement}%</span>
                </div>
                <Progress value={activeProject.avancement} className="h-2" />
              </div>

              {activeProject.prochaine_etape && (
                <div className="rounded-xl bg-brand-amber/10 p-3.5 border border-brand-amber/20">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-amber-600 mb-1.5">
                    Prochaine Étape
                  </p>
                  <p className="text-sm font-medium text-ink leading-snug">
                    {activeProject.prochaine_etape}
                  </p>
                </div>
              )}

              {activeProject.etapes && activeProject.etapes.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate mb-4">
                    Jalons Clés
                  </h4>
                  <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[9px] before:w-[2px] before:bg-slate/15">
                    {activeProject.etapes.map((etape: any, i: number) => {
                      const done = etape.statut === "fait";
                      const current = etape.statut === "encours";
                      const dateLabel = etape.date_realise ? new Date(etape.date_realise).toLocaleDateString("fr-FR") : (etape.date_prevue ? new Date(etape.date_prevue).toLocaleDateString("fr-FR") : "");
                      return (
                        <div key={i} className="relative flex items-start gap-3.5">
                          <div className={cn(
                            "relative z-10 flex size-5 items-center justify-center rounded-full bg-white ring-[3px]",
                            done ? "ring-emerald-500" : current ? "ring-brand-royal" : "ring-slate/20"
                          )}>
                            <div className={cn(
                              "size-2.5 rounded-full",
                              done ? "bg-emerald-500" : current ? "bg-brand-royal" : "bg-transparent"
                            )} />
                          </div>
                          <div className="-mt-0.5">
                            <p className={cn("text-sm font-medium leading-snug", done || current ? "text-ink" : "text-slate")}>
                              {etape.label}
                            </p>
                            {dateLabel && (
                              <p className="mt-1 text-[0.7rem] uppercase tracking-wider font-semibold text-slate/70">{dateLabel}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-black/5 bg-slate/5">
              <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-royal py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-royal-600 hover:shadow-md active:scale-[0.98]">
                Voir les détails complets <ChevronRight className="size-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
