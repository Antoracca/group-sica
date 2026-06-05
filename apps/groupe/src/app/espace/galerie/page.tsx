"use client";

import React, { useState } from "react";
import { 
  Camera, 
  Image as ImageIcon, 
  Search, 
  Filter, 
  FileImage,
  ChevronDown,
  Calendar,
  CameraOff
} from "lucide-react";

export default function GaleriePage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Galerie d'Inspection</h1>
          <p className="text-gray-500 mt-1">Consultez et gérez les photos d'inspection de vos chantiers.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Tabs / Albums Filters */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-1 overflow-x-auto">
        <TabButton 
          icon={<ImageIcon className="w-4 h-4" />} 
          label="Toutes les photos" 
          isActive={activeTab === "all"} 
          onClick={() => setActiveTab("all")} 
        />
        <TabButton 
          icon={<FileImage className="w-4 h-4" />} 
          label="Albums" 
          isActive={activeTab === "albums"} 
          onClick={() => setActiveTab("albums")} 
        />
        <TabButton 
          icon={<Calendar className="w-4 h-4" />} 
          label="Récentes" 
          isActive={activeTab === "recent"} 
          onClick={() => setActiveTab("recent")} 
        />
      </div>

      {/* Content Area - Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 min-h-[400px]">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-6">
          <CameraOff className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune photo d'inspection disponible</h3>
        <p className="text-gray-500 text-center max-w-md mb-8">
          Il n'y a pas encore de photos ou d'albums d'inspection pour le moment. Les photos prises lors des inspections apparaîtront ici.
        </p>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
          <Camera className="w-5 h-5" />
          <span>Ajouter des photos</span>
        </button>
      </div>
    </div>
  );
}

function TabButton({ icon, label, isActive, onClick }: { icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
        isActive 
          ? "border-blue-600 text-blue-600" 
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
