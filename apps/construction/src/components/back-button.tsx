"use client";

import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const handleBack = () => {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      window.location.href = "/realisations";
    }
  };

  return (
    <button
      onClick={handleBack}
      className="group fixed left-4 top-24 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-brand-royal/10 bg-white shadow-lg transition-all hover:scale-110 hover:border-brand-royal hover:bg-brand-royal hover:text-white sm:left-8 sm:top-32"
      aria-label="Retour en arrière"
      title="Retour"
    >
      <ArrowLeft size={24} className="text-brand-royal transition-colors group-hover:text-white" />
    </button>
  );
}
