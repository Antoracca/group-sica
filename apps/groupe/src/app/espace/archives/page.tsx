"use client";

import React, { useState } from "react";
import { 
  Archive, 
  Search, 
  Filter, 
  Calendar,
  MoreVertical,
  Download,
  Eye,
  FolderClosed
} from "lucide-react";

interface ArchivedProject {
  id: string;
  name: string;
  client: string;
  closedDate: string;
  size: string;
  documentsCount: number;
}

export default function ArchivesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [archives, setArchives] = useState<ArchivedProject[]>([]);

  return (
    <div className="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Archive className="h-6 w-6 text-blue-600" />
            Archives Sécurisées
          </h1>
          <p className="text-gray-500 mt-1">
            Consultez les projets clôturés et les documents archivés.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Rechercher une archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filtrer
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px] flex flex-col">
        {archives.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de clôture
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taille
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {archives.map((archive) => (
                  <tr key={archive.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FolderClosed className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{archive.name}</div>
                          <div className="text-sm text-gray-500">{archive.documentsCount} documents</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{archive.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {archive.closedDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {archive.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Voir les détails">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Télécharger l'archive">
                          <Download className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-12 text-center">
            <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Archive className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune archive pour le moment
            </h3>
            <p className="text-gray-500 max-w-sm mb-6">
              Les projets clôturés et leurs documents apparaîtront ici. Vous pourrez les consulter ou les télécharger en toute sécurité.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
