"use client";

import React, { useState } from 'react';

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const WEEKS_TOTAL = 24;

type TaskStatus = 'completed' | 'in-progress' | 'pending' | 'delayed';

interface Task {
  id: string;
  name: string;
  startWeek: number;
  endWeek: number;
  progress: number;
  status: TaskStatus;
  assignee: string;
}

interface Phase {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}

const planningData: Phase[] = [
  {
    id: 'p1',
    name: 'Préparation & Installation',
    color: 'bg-blue-500',
    tasks: [
      { id: 't1', name: 'Démarches administratives', startWeek: 1, endWeek: 3, progress: 0, status: 'pending', assignee: 'Jean D.' },
      { id: 't2', name: 'Installation de chantier', startWeek: 3, endWeek: 5, progress: 0, status: 'pending', assignee: 'Marc L.' },
      { id: 't3', name: 'Terrassement', startWeek: 4, endWeek: 7, progress: 0, status: 'pending', assignee: 'TP Services' },
    ]
  },
  {
    id: 'p2',
    name: 'Fondations',
    color: 'bg-indigo-500',
    tasks: [
      { id: 't4', name: 'Fouilles en rigoles', startWeek: 6, endWeek: 8, progress: 0, status: 'pending', assignee: 'Équipe A' },
      { id: 't5', name: 'Coulage du béton', startWeek: 8, endWeek: 9, progress: 0, status: 'pending', assignee: 'Équipe A' },
      { id: 't6', name: 'Séchage & Contrôle', startWeek: 9, endWeek: 11, progress: 0, status: 'pending', assignee: 'Bureau Contrôle' },
    ]
  },
  {
    id: 'p3',
    name: 'Gros Œuvre',
    color: 'bg-purple-500',
    tasks: [
      { id: 't7', name: 'Élévation des murs RDC', startWeek: 11, endWeek: 15, progress: 0, status: 'pending', assignee: 'Maçonnerie Pro' },
      { id: 't8', name: 'Plancher haut RDC', startWeek: 14, endWeek: 16, progress: 0, status: 'pending', assignee: 'Maçonnerie Pro' },
      { id: 't9', name: 'Élévation des murs R+1', startWeek: 16, endWeek: 20, progress: 0, status: 'pending', assignee: 'Maçonnerie Pro' },
    ]
  },
  {
    id: 'p4',
    name: 'Charpente & Couverture',
    color: 'bg-teal-500',
    tasks: [
      { id: 't10', name: 'Pose de la charpente', startWeek: 20, endWeek: 22, progress: 0, status: 'pending', assignee: 'Charpente Bois' },
      { id: 't11', name: 'Couverture tuiles', startWeek: 21, endWeek: 24, progress: 0, status: 'pending', assignee: 'Couvreur Sud' },
    ]
  }
];

const months = [
  { name: 'Janvier', weeks: 4 },
  { name: 'Février', weeks: 4 },
  { name: 'Mars', weeks: 5 },
  { name: 'Avril', weeks: 4 },
  { name: 'Mai', weeks: 4 },
  { name: 'Juin', weeks: 3 },
];

export default function PlanningPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Planning & Suivi</h1>
            <p className="text-sm text-gray-500 mt-1">Gantt interactif et suivi de l'avancement du projet</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200">
              <FilterIcon className="w-4 h-4" />
              Filtrer
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
              <DownloadIcon className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <CheckCircleIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Avancement global</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-900">0%</span>
              <span className="text-sm text-gray-500 font-medium mb-1">En attente</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4 overflow-hidden">
              <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <ClockIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Tâches en cours</span>
            </div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-bold text-gray-900">0</span>
              <span className="text-sm text-gray-500 font-medium mb-1">sur 11 tâches</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <div className="p-2 bg-red-50 rounded-lg text-red-600">
                <AlertCircleIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Retards signalés</span>
            </div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-bold text-gray-900">0</span>
              <span className="text-sm text-gray-500 font-medium mb-1">Tout est à l'heure</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Prochain jalon</span>
            </div>
            <div className="flex flex-col mt-1">
              <span className="text-lg font-bold text-gray-900 truncate">Fin Fondations</span>
              <span className="text-sm text-gray-500 font-medium mt-0.5">Semaine 11</span>
            </div>
          </div>
        </div>

        {/* Gantt Chart Container */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col relative z-0">
          {/* Controls */}
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50">
            <div className="flex items-center bg-gray-100/80 p-1 rounded-lg border border-gray-200/60">
              {['all', 'in-progress', 'delayed'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeFilter === filter
                      ? 'bg-white shadow-sm border border-gray-200/50 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                  }`}
                >
                  {filter === 'all' ? 'Tout voir' : filter === 'in-progress' ? 'En cours' : 'Retards'}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500">
              {planningData.map(phase => (
                <div key={phase.id} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${phase.color}`}></span>
                  {phase.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex overflow-x-auto custom-scrollbar">
            {/* Left Sidebar (Task List) */}
            <div className="w-72 sm:w-80 flex-shrink-0 border-r border-gray-200 bg-white z-20 sticky left-0 shadow-[4px_0_12px_rgba(0,0,0,0.02)]">
              {/* Header */}
              <div className="h-12 border-b border-gray-200 flex items-center px-5 bg-white">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phase / Tâche</span>
              </div>
              
              <div className="py-2">
                {planningData.map((phase) => (
                  <div key={phase.id} className="mb-2">
                    <div className="px-5 py-2.5 flex items-center gap-2 group cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className={`w-2 h-2 rounded-full ${phase.color}`} />
                      <span className="text-sm font-semibold text-gray-900">{phase.name}</span>
                    </div>
                    <div>
                      {phase.tasks.map((task) => (
                        <div key={task.id} className="px-5 py-2 pl-9 flex flex-col justify-center border-b border-gray-50/80 hover:bg-gray-50/80 transition-colors h-14">
                          <span className="text-sm text-gray-700 truncate font-medium">{task.name}</span>
                          <span className="text-[11px] text-gray-400 mt-0.5">{task.assignee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Timeline Area */}
            <div className="min-w-[800px] flex-grow bg-white">
              {/* Timeline Header */}
              <div className="h-12 border-b border-gray-200 flex flex-col bg-white">
                {/* Months */}
                <div className="flex border-b border-gray-100 h-6">
                  {months.map((month, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-center text-[11px] font-medium text-gray-500 border-r border-gray-100 last:border-r-0"
                      style={{ width: `${(month.weeks / WEEKS_TOTAL) * 100}%` }}
                    >
                      {month.name}
                    </div>
                  ))}
                </div>
                {/* Weeks Grid */}
                <div className="flex h-6">
                  {Array.from({ length: WEEKS_TOTAL }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className="flex-1 flex items-center justify-center text-[10px] font-medium text-gray-400 border-r border-gray-100 last:border-r-0"
                    >
                      S{idx + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline Body */}
              <div className="py-2 relative min-h-[400px]">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 flex pointer-events-none">
                  {Array.from({ length: WEEKS_TOTAL }).map((_, idx) => (
                    <div key={idx} className="flex-1 border-r border-gray-50 last:border-r-0" />
                  ))}
                </div>
                
                {/* Current Time Indicator (e.g. Week 1) */}
                <div className="absolute top-0 bottom-0 border-l-2 border-red-400/80 border-dashed z-10 pointer-events-none" style={{ left: `${(0.5 / WEEKS_TOTAL) * 100}%` }}>
                  <div className="absolute -top-3 -translate-x-1/2 bg-red-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                    Auj.
                  </div>
                </div>

                <div className="relative z-10">
                  {planningData.map((phase) => (
                    <div key={phase.id} className="mb-2">
                      {/* Phase Row Spacer */}
                      <div className="h-[36px]"></div>
                      
                      {phase.tasks.map((task) => {
                        const duration = task.endWeek - task.startWeek + 1; // Inclusive weeks logic
                        const left = ((task.startWeek - 1) / WEEKS_TOTAL) * 100;
                        const width = (duration / WEEKS_TOTAL) * 100;

                        return (
                          <div key={task.id} className="h-14 flex items-center group relative">
                            <div 
                              className={`absolute h-7 rounded-md shadow-sm overflow-hidden flex items-center transition-all duration-200 cursor-pointer hover:ring-2 hover:ring-offset-1 z-10 ${
                                task.status === 'completed' ? 'bg-gray-200 hover:ring-gray-300' :
                                task.status === 'in-progress' ? `${phase.color} hover:ring-blue-400 shadow-md` :
                                'bg-white border border-gray-200 hover:ring-gray-300'
                              }`}
                              style={{ left: `calc(${left}% + 4px)`, width: `calc(${width}% - 8px)` }}
                            >
                              {/* Progress Fill */}
                              {task.status !== 'completed' && task.progress > 0 && (
                                <div 
                                  className="absolute top-0 left-0 bottom-0 bg-black/10"
                                  style={{ width: `${task.progress}%` }}
                                />
                              )}
                              
                              <div className="px-2 w-full flex items-center justify-between relative z-10">
                                <span className={`text-[10px] font-bold truncate ${
                                  task.status === 'pending' ? 'text-gray-500' : 
                                  task.status === 'completed' ? 'text-gray-600' : 'text-white'
                                }`}>
                                  {task.progress}%
                                </span>
                              </div>
                            </div>
                            
                            {/* Hover Tooltip - Attached to the row, visible on hover */}
                            <div className="hidden group-hover:flex absolute z-50 bg-gray-900 text-white text-xs rounded-md py-1.5 px-3 -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap shadow-xl items-center gap-2 pointer-events-none">
                              <div className={`w-2 h-2 rounded-full ${phase.color}`}></div>
                              <span className="font-medium">{task.name}</span>
                              <span className="text-gray-400 mx-1">•</span>
                              <span className="text-gray-300">Sem {task.startWeek} - Sem {task.endWeek}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
