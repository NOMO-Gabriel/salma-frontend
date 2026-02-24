"use client";

import { useLanguage } from "@/hooks/useLanguage";

// Rappel : Un composant de section doit être autonome et utiliser le dictionnaire
export default function ExampleSection() {
  const { dictionary } = useLanguage();

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif text-salma-primary mb-4">
          {/* Utiliser toujours le dictionnaire */}
          {dictionary.services.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Le contenu viendra ici */}
          <div className="p-6 border border-salma-border rounded-xl">
             Modèle vide pour collaborateur A
          </div>
        </div>
      </div>
    </section>
  );
}