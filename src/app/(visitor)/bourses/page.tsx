"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { MOCK_SCHOLARSHIPS } from "@/data/mock-scholarships";
import ScholarshipCard from "@/components/ui/ScholarshipCard";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/sections/visitor/ContactForm";

export default function BoursesPage() {
  const { dictionary, locale } = useLanguage();

  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [selectedLevel, setSelectedLevel] = useState("ALL");

  // Logique de filtrage (useMemo pour la performance)
  const filteredScholarships = useMemo(() => {
    return MOCK_SCHOLARSHIPS.filter((s) => {
      const matchesSearch = s.title[locale].toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.organization[locale].toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === "ALL" || s.destinationCountry === selectedCountry;
      const matchesLevel = selectedLevel === "ALL" || s.level === selectedLevel;

      return matchesSearch && matchesCountry && matchesLevel;
    });
  }, [searchTerm, selectedCountry, selectedLevel, locale]);

  return (
    <div className="py-20 bg-salma-bg min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* En-tête de la page */}
        <div className="max-w-3xl mb-12">
          <SectionTitle 
            title={dictionary.catalog.title} 
            subtitle="Explorez vos opportunités"
          />
          <p className="text-salma-text-muted -mt-8">
            {dictionary.catalog.description}
          </p>
        </div>

        {/* --- BARRE DE FILTRES ET RECHERCHE --- */}
        <div className="bg-white dark:bg-salma-surface p-6 rounded-3xl border border-salma-border shadow-salma-sm mb-12 flex flex-col lg:flex-row gap-6 items-center">
          
          {/* Recherche */}
          <div className="relative w-full lg:flex-1">
            <input 
              type="text"
              placeholder={dictionary.catalog.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-salma-border bg-salma-bg focus:border-salma-gold focus:ring-1 focus:ring-salma-gold outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-salma-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filtre Pays */}
          <select 
            className="w-full lg:w-48 px-4 py-3 rounded-xl border border-salma-border bg-salma-bg outline-none focus:border-salma-gold"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="ALL">{dictionary.catalog.filterCountry}: {dictionary.catalog.filterAll}</option>
            <option value="CHINE">Chine</option>
            <option value="ALLEMAGNE">Allemagne</option>
          </select>

          {/* Filtre Niveau */}
          <select 
            className="w-full lg:w-48 px-4 py-3 rounded-xl border border-salma-border bg-salma-bg outline-none focus:border-salma-gold"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="ALL">{dictionary.catalog.filterLevel}: {dictionary.catalog.filterAll}</option>
            <option value="LICENCE">Licence</option>
            <option value="MASTER">Master</option>
            <option value="DOCTORAT">Doctorat</option>
          </select>
        </div>

        {/* --- RÉSULTATS --- */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-xs font-bold uppercase tracking-widest text-salma-text-muted">
            {filteredScholarships.length} {dictionary.catalog.found}
          </p>
        </div>

        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredScholarships.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-salma-text-muted italic">{dictionary.catalog.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
}