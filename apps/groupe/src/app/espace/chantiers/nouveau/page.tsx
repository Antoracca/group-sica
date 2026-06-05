"use client";

import React, { useState } from 'react';
import { Building2, MapPin, Calculator, FileText, Paperclip, ArrowRight, Check, HardHat, Home, Warehouse } from 'lucide-react';

export default function DemandeDeDevisPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    budget: '',
    localisation: '',
    description: '',
    files: null as FileList | null,
  });

  const projectTypes = [
    { id: 'residential', label: 'Résidentiel', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building2 },
    { id: 'industrial', label: 'Industriel', icon: Warehouse },
    { id: 'renovation', label: 'Rénovation', icon: HardHat },
  ];

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // submit logic
    console.log("Form submitted", formData);
    alert("Demande de devis soumise avec succès!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Nouvelle Demande de Devis
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Détaillez votre projet en quelques étapes simples pour recevoir une estimation précise.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full" aria-hidden="true">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out" 
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
            
            {[1, 2, 3].map((stepNumber) => (
              <div 
                key={stepNumber}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 bg-white transition-colors duration-300 ${
                  step >= stepNumber ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-400'
                }`}
              >
                {step > stepNumber ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{stepNumber}</span>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium text-gray-500">
            <span>Type de projet</span>
            <span>Détails</span>
            <span>Confirmation</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quel est votre type de projet ?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectTypes.map((pt) => {
                    const Icon = pt.icon;
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: pt.id })}
                        className={`p-6 border-2 rounded-xl text-left transition-all duration-200 flex flex-col items-start gap-4 ${
                          formData.type === pt.id 
                            ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${formData.type === pt.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`text-lg font-semibold ${formData.type === pt.id ? 'text-blue-900' : 'text-gray-900'}`}>
                          {pt.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations générales</h2>
                
                <div className="space-y-5">
                  <div>
                    <label htmlFor="budget" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Calculator className="w-4 h-4 text-blue-600" />
                      Budget estimé (FCFA)
                    </label>
                    <input
                      type="text"
                      id="budget"
                      placeholder="Ex: 50 000 000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-shadow outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="localisation" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Localisation du chantier
                    </label>
                    <input
                      type="text"
                      id="localisation"
                      placeholder="Ville, Quartier..."
                      value={formData.localisation}
                      onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-shadow outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Détails et Documents</h2>
                
                <div className="space-y-5">
                  <div>
                    <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Description du projet
                    </label>
                    <textarea
                      id="description"
                      rows={5}
                      placeholder="Décrivez votre projet en détail..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-shadow outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Paperclip className="w-4 h-4 text-blue-600" />
                      Pièces jointes (Plans, photos...)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="space-y-1 text-center">
                        <Paperclip className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Téléverser des fichiers</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              className="sr-only" 
                              multiple
                              onChange={(e) => setFormData({ ...formData, files: e.target.files })}
                            />
                          </label>
                          <p className="pl-1">ou glisser-déposer</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, PNG, JPG, ZIP jusqu'à 10MB
                        </p>
                      </div>
                    </div>
                    {formData.files && formData.files.length > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-800">
                        {formData.files.length} fichier(s) sélectionné(s)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  step === 1 
                    ? 'text-gray-400 cursor-not-allowed opacity-50' 
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Précédent
              </button>
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={step === 1 && !formData.type}
                  className={`flex items-center gap-2 px-8 py-3 text-sm font-bold text-white rounded-xl shadow-md transition-all duration-200 ${
                    step === 1 && !formData.type
                      ? 'bg-blue-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Soumettre la demande
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
