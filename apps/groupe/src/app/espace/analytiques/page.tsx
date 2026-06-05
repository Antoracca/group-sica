"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  PiggyBank, 
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Building,
  Users,
  Briefcase,
  Megaphone,
  Download,
  Filter
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
        <Icon size={24} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`flex items-center font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
        {trendValue}
      </span>
      <span className="text-gray-400 ml-2">vs mois précédent</span>
    </div>
  </div>
);

const ProgressBar = ({ label, percentage, color, icon: Icon, amount, total }: any) => (
  <div className="mb-6 last:mb-0">
    <div className="flex justify-between items-end mb-2">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color.bg} ${color.text}`}>
          <Icon size={18} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
          <p className="text-xs text-gray-500 font-medium mt-0.5">{amount} <span className="text-gray-400">/ {total}</span></p>
        </div>
      </div>
      <span className="text-sm font-bold text-gray-700">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className={`h-2 rounded-full ${color.fill} transition-all duration-1000 ease-out`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

export default function AnalytiquesPage() {
  const [timeRange, setTimeRange] = useState('Anné en cours');

  const transactions = [
    { id: 1, name: 'Transaction vide', category: 'N/A', date: '--', amount: '0 FCFA', status: 'En attente', isExpense: true },
    { id: 2, name: 'Transaction vide', category: 'N/A', date: '--', amount: '0 FCFA', status: 'En attente', isExpense: true },
    { id: 3, name: 'Transaction vide', category: 'N/A', date: '--', amount: '0 FCFA', status: 'En attente', isExpense: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      {/* Header section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Analytiques Financières</h1>
          <p className="text-sm text-gray-500 mt-1">Vue d'ensemble des budgets, dépenses et performances.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option>Ce mois</option>
              <option>Trimestre en cours</option>
              <option>Année en cours</option>
              <option>Année dernière</option>
            </select>
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Exporter</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Budget Total" 
          value="0 FCFA" 
          icon={Wallet} 
          trend="up" 
          trendValue="0%" 
        />
        <StatCard 
          title="Dépenses Actuelles" 
          value="0 FCFA" 
          icon={CreditCard} 
          trend="down" 
          trendValue="0%" 
        />
        <StatCard 
          title="Budget Restant" 
          value="0 FCFA" 
          icon={PiggyBank} 
          trend="up" 
          trendValue="0%" 
        />
        <StatCard 
          title="Taux de Consommation" 
          value="0%" 
          icon={Activity} 
          trend="up" 
          trendValue="0%" 
        />
      </div>

      <div className="mb-8">
        {/* Visualisation Simulation (Graphique CSS) */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Flux de Trésorerie (Annuel)</h3>
              <p className="text-sm text-gray-500 mt-1">Comparatif Entrées vs Sorties</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600">Revenus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-200"></div>
                <span className="text-gray-600">Dépenses</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-gray-100">
            {/* Simulated Bar Chart */}
            {[
              { month: 'Jan', rev: 0, exp: 0 },
              { month: 'Fév', rev: 0, exp: 0 },
              { month: 'Mar', rev: 0, exp: 0 },
              { month: 'Avr', rev: 0, exp: 0 },
              { month: 'Mai', rev: 0, exp: 0 },
              { month: 'Juin', rev: 0, exp: 0 },
              { month: 'Juil', rev: 0, exp: 0 },
              { month: 'Aoû', rev: 0, exp: 0 },
              { month: 'Sep', rev: 0, exp: 0 },
              { month: 'Oct', rev: 0, exp: 0 },
              { month: 'Nov', rev: 0, exp: 0 },
              { month: 'Déc', rev: 0, exp: 0 },
            ].map((data, i) => (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <div className="w-full flex justify-center gap-1 h-48 items-end relative">
                  <div 
                    className="w-full max-w-[12px] bg-blue-500 rounded-t-sm group-hover:bg-blue-600 transition-colors relative"
                    style={{ height: `${data.rev}%` }}
                  >
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity pointer-events-none z-10">
                       Rev: {data.rev} FCFA
                     </div>
                  </div>
                  <div 
                    className="w-full max-w-[12px] bg-indigo-200 rounded-t-sm group-hover:bg-indigo-300 transition-colors relative"
                    style={{ height: `${data.exp}%` }}
                  >
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity pointer-events-none z-10">
                       Dép: {data.exp} FCFA
                     </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400 mt-3 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Transactions Récentes</h3>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors">
            <Filter size={16} />
            Filtrer
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.isExpense ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {tx.isExpense ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                      </div>
                      <span className="font-medium text-gray-900">{tx.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">{tx.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${tx.status === 'Complété' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}
                    `}>
                      {tx.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${tx.isExpense ? 'text-gray-900' : 'text-emerald-600'}`}>
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50/30">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 w-full text-center transition-colors">
            Voir toutes les transactions
          </button>
        </div>
      </div>
    </div>
  );
}
