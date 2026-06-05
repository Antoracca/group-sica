"use client";

import React, { useState } from 'react';
import { 
  Scale, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  ShieldAlert,
  Gavel,
  Briefcase
} from 'lucide-react';

export default function JuridiquePage() {
  const [activeTab, setActiveTab] = useState<'affaires' | 'conformite'>('affaires');

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Scale className="w-7 h-7 text-indigo-600" />
              Affaires Juridiques
            </h1>
            <p className="text-gray-500 mt-1">
              Gestion des contentieux, contrats et conformité légale
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4" />
              Générer un rapport
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium shadow-sm">
              <Plus className="w-4 h-4" />
              Nouvelle affaire
            </button>
          </div>
        </div>

        {/* Stats / Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Affaires en cours</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Contentieux</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <Gavel className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Alertes conformité</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Contrats à réviser</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('affaires')}
            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'affaires'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dossiers & Contentieux
          </button>
          <button
            onClick={() => setActiveTab('conformite')}
            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'conformite'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Conformité & Contrats
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un dossier, une référence..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm">
              <Filter className="w-4 h-4" />
              Filtrer
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <Scale className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune affaire juridique en cours</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Il n'y a actuellement aucun dossier juridique, contentieux ou alerte de conformité nécessitant votre attention.
          </p>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium shadow-sm">
            <Plus className="w-5 h-5" />
            Créer un nouveau dossier
          </button>
        </div>
      </div>
    </div>
  );
}
