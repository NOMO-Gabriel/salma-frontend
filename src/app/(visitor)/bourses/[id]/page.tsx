"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_SCHOLARSHIPS } from "@/data/mock-scholarships";
import { useLanguage } from "@/hooks/useLanguage";
import SalmaButton from "@/components/ui/SalmaButton";
import SalmaBadge from "@/components/ui/SalmaBadge";

export default function ScholarshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { dictionary, locale } = useLanguage();

  // Recherche de la bourse correspondante
  const scholarship = MOCK_SCHOLARSHIPS.find((s) => s.id === id);

  if (!scholarship) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-2xl font-serif">Bourse non trouvée</h1>
        <Link href="/bourses" className="text-salma-gold underline mt-4 inline-block">
          {dictionary.scholarshipDetail.backToList}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-salma-bg min-h-screen pb-20">
      {/* --- BANNIÈRE / HERO DÉTAIL --- */}
      <div className="relative h-[40vh] w-full">
        <Image 
          src={scholarship.imageUrl || ""} 
          alt={scholarship.title[locale]} 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-salma-primary/60 backdrop-blur-[2px]" />
        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-end pb-12">
          <Link href="/bourses" className="text-white/80 hover:text-salma-gold mb-6 flex items-center gap-2 text-sm transition-colors">
            ← {dictionary.scholarshipDetail.backToList}
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <SalmaBadge status="open" label={scholarship.status} />
            <span className="bg-salma-gold text-salma-primary px-3 py-1 rounded-full text-[10px] font-black uppercase">
              {scholarship.destinationCountry}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white max-w-4xl">
            {scholarship.title[locale]}
          </h1>
        </div>
      </div>

      {/* --- CONTENU PRINCIPAL --- */}
      <div className="container mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Colonne Gauche : Détails techniques */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Description */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-salma-primary dark:text-white mb-6">
              Description
            </h2>
            <p className="text-salma-text-muted leading-relaxed whitespace-pre-line">
              {scholarship.description[locale]}
            </p>
          </section>

          {/* Éligibilité & Avantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-salma-accent/5 rounded-3xl border border-salma-border">
              <h3 className="font-bold uppercase tracking-widest text-xs text-salma-gold mb-4">
                {dictionary.scholarshipDetail.eligibility}
              </h3>
              <ul className="space-y-3">
                <li className="text-sm flex gap-3"><span className="text-salma-gold">✓</span> {dictionary.scholarships.levels[scholarship.level]}</li>
                <li className="text-sm flex gap-3"><span className="text-salma-gold">✓</span> {scholarship.languageRequirement[locale]}</li>
                {scholarship.ageLimit && <li className="text-sm flex gap-3"><span className="text-salma-gold">✓</span> Max {scholarship.ageLimit} ans</li>}
              </ul>
            </div>

            <div className="p-8 bg-salma-primary text-white rounded-3xl shadow-salma-md">
              <h3 className="font-bold uppercase tracking-widest text-xs text-salma-gold-light mb-4">
                {dictionary.scholarshipDetail.benefits}
              </h3>
              <p className="text-sm leading-relaxed">
                {scholarship.amountDetails[locale]}
              </p>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Sidebar d'action */}
        <div className="space-y-6">
          <div className="sticky top-24 p-8 bg-white dark:bg-salma-surface border border-salma-border rounded-3xl shadow-salma-lg">
            <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white mb-2">
              {dictionary.scholarshipDetail.applyTitle}
            </h3>
            <p className="text-xs text-salma-text-muted mb-8">
              {dictionary.scholarshipDetail.applyDesc}
            </p>
            
            <div className="space-y-4">
              <SalmaButton variant="primary" className="w-full flex gap-2">
                <span>💬</span> {dictionary.scholarshipDetail.btnApply}
              </SalmaButton>
              <SalmaButton variant="outline" className="w-full">
                {dictionary.scholarshipDetail.btnForm}
              </SalmaButton>
            </div>

            <div className="mt-8 pt-8 border-t border-salma-border">
              <span className="block text-[10px] text-salma-text-muted uppercase font-bold mb-2">{dictionary.scholarshipDetail.organization}</span>
              <p className="font-serif font-bold text-salma-primary dark:text-salma-gold">{scholarship.organization[locale]}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}