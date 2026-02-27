"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { getMediaUrl } from "@/lib/api-client";
import type { ScholarshipPublicListItem } from "@/types"; // Import depuis le nouveau barrel
import SalmaBadge from "./SalmaBadge";
import SalmaButton from "./SalmaButton";

interface ScholarshipCardProps {
  scholarship: ScholarshipPublicListItem;
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const { locale, dictionary } = useLanguage();

  // Mapping des textes selon la langue
  const title = locale === "fr" ? scholarship.titre_fr : scholarship.titre_en;
  const org = locale === "fr" ? scholarship.organisme_fr : scholarship.organisme_en;
  const langReq = locale === "fr" ? scholarship.exigence_langue_fr : scholarship.exigence_langue_en;
  
  // URL de l'image via le helper
  const imageUrl = getMediaUrl(scholarship.image_principale?.url_fichier);

  // Mapping des drapeaux
  const countryFlags: Record<string, string> = {
    chine: "🇨🇳",
    allemagne: "🇩🇪",
    france: "🇫🇷",
    canada: "🇨🇦",
    autre: "🌍",
  };

  return (
    <div className="group bg-white dark:bg-salma-surface rounded-2xl border border-salma-border overflow-hidden shadow-salma-sm hover:shadow-salma-md transition-all duration-500 flex flex-col h-full">
      {/* --- HEADER : Image & Badges --- */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={imageUrl || "/image.jpg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-salma-primary/60 to-transparent opacity-60" />

        {/* Badge Pays */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-salma-primary flex items-center gap-2 shadow-sm uppercase">
          <span>{countryFlags[scholarship.pays_destination] || "🌍"}</span>
          {scholarship.pays_destination}
        </div>

        {/* Badge Statut */}
        <div className="absolute bottom-4 left-4">
          <SalmaBadge 
            status={scholarship.statut === 'publie' ? 'open' : scholarship.statut === 'expire' ? 'closed' : 'urgent'} 
            label={scholarship.statut} 
          />
        </div>
      </div>

      {/* --- BODY : Contenu --- */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-salma-gold text-[10px] font-bold uppercase tracking-widest">
            {scholarship.niveau}
          </span>
          <span className="text-salma-text-muted text-[10px]">•</span>
          <span className="text-salma-gold text-[10px] font-bold uppercase tracking-widest">
            {scholarship.type_couverture}
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white leading-tight mb-3 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-salma-text-muted line-clamp-2 mb-6 font-sans">
          {org}
        </p>

        {/* --- DETAILS --- */}
        <div className="mt-auto pt-4 border-t border-salma-border grid grid-cols-2 gap-4">
          <div>
            <span className="block text-[9px] text-salma-text-muted uppercase font-bold tracking-tighter">
              {dictionary.scholarships.language}
            </span>
            <span className="text-xs font-bold text-salma-primary dark:text-salma-gold">
              {langReq}
            </span>
          </div>
          <div>
            <span className="block text-[9px] text-salma-text-muted uppercase font-bold tracking-tighter">
              {dictionary.scholarships.deadline}
            </span>
            <span className="text-xs font-bold text-red-500">
              {scholarship.date_limite ? new Date(scholarship.date_limite).toLocaleDateString(locale) : "N/A"}
            </span>
          </div>
        </div>

        <Link href={`/bourses/${scholarship.id}`} className="w-full mt-6">
          <SalmaButton variant="outline" size="sm" className="w-full">
            {dictionary.scholarships.viewDetails}
          </SalmaButton>
        </Link>
      </div>
    </div>
  );
}