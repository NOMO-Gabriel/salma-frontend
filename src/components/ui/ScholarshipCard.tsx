"use client";

import Image from "next/image";
import { Scholarship } from "@/types/scholarship";
import { useLanguage } from "@/hooks/useLanguage";
import SalmaBadge from "./SalmaBadge";
import SalmaButton from "./SalmaButton";
import Link from "next/link";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const { locale, dictionary } = useLanguage();

  // Mapping des drapeaux selon le pays
  const countryFlags = {
    CHINE: "🇨🇳",
    ALLEMAGNE: "🇩🇪",
    BOTH: "🌍",
  };

  return (
    <div className="group bg-white dark:bg-salma-surface rounded-2xl border border-salma-border overflow-hidden shadow-salma-sm hover:shadow-salma-md transition-all duration-500 flex flex-col h-full">
      {/* --- HEADER : Image & Badges --- */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={scholarship.imageUrl || "/images/placeholder-scholarship.jpg"}
          alt={scholarship.title[locale]}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay dégradé pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-salma-primary/60 to-transparent opacity-60" />

        {/* Badge Pays (Top Right) */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-salma-primary flex items-center gap-2 shadow-sm">
          <span>{countryFlags[scholarship.destinationCountry]}</span>
          {scholarship.destinationCountry}
        </div>

        {/* Badge Statut (Bottom Left) */}
        <div className="absolute bottom-4 left-4">
          <SalmaBadge 
            status={scholarship.status === 'OUVERT' ? 'open' : scholarship.status === 'URGENT' ? 'urgent' : 'closed'} 
            label={scholarship.status} 
          />
        </div>
      </div>

      {/* --- BODY : Contenu textuel --- */}
      <div className="p-6 flex flex-col flex-1">
        {/* Niveau & Type de couverture */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-salma-gold text-[10px] font-bold uppercase tracking-widest">
            {dictionary.scholarships.levels[scholarship.level]}
          </span>
          <span className="text-salma-text-muted text-[10px]">•</span>
          <span className="text-salma-gold text-[10px] font-bold uppercase tracking-widest">
            {dictionary.scholarships.coverage[scholarship.coverageType]}
          </span>
        </div>

        {/* Titre (traduit) */}
        <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white leading-tight mb-3 line-clamp-2">
          {scholarship.title[locale]}
        </h3>

        {/* Description courte (traduite) */}
        <p className="text-sm text-salma-text-muted line-clamp-2 mb-6 font-sans">
          {scholarship.description[locale]}
        </p>

        {/* --- DETAILS : Langue & Deadline --- */}
        <div className="mt-auto pt-4 border-t border-salma-border grid grid-cols-2 gap-4">
          <div>
            <span className="block text-[9px] text-salma-text-muted uppercase font-bold tracking-tighter">
              {dictionary.scholarships.language}
            </span>
            <span className="text-xs font-bold text-salma-primary dark:text-salma-gold">
              {scholarship.languageRequirement[locale]}
            </span>
          </div>
          <div>
            <span className="block text-[9px] text-salma-text-muted uppercase font-bold tracking-tighter">
              {dictionary.scholarships.deadline}
            </span>
            <span className="text-xs font-bold text-red-500">
              {new Date(scholarship.deadline).toLocaleDateString(locale, {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Bouton d'action */}
       <Link href={`/bourses/${scholarship.id}`} className="w-full mt-6">
        <SalmaButton variant="outline" size="sm" className="w-full">
          {dictionary.scholarships.viewDetails}
        </SalmaButton>
      </Link>
      </div>
    </div>
  );
}