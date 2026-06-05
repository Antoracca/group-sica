"use client";

import React, { useState } from 'react';
import { Search, Filter, Users } from 'lucide-react';

export default function EquipesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filters = [
    'Tous',
    'Ingénieurs',
    'Architectes',
    'Chefs de projet',
    'Support technique'
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Équipes & Intervenants
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Retrouvez l'ensemble de vos interlocuteurs SICA dédiés à vos projets.
            </p>
          </div>
        </div>

        {/* Toolbar: Search and Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative w-full lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un intervenant par nom, rôle..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
            <Filter className="h-4 w-4 text-gray-400 hidden sm:block mr-1" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? 'bg-blue-50 text-blue-700 border-blue-200 border'
                    : 'bg-white text-gray-600 border-gray-200 border hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-3">
            Aucun intervenant pour le moment
          </h3>
          <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
            Vos interlocuteurs SICA apparaîtront ici dès l'ouverture d'un projet. 
            Vous pourrez alors consulter leurs coordonnées et échanger avec eux directement.
          </p>
        </div>

      </div>
    </div>
  );
}
