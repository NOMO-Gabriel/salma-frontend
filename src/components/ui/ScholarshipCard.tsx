"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import { getMediaUrl } from "@/lib/api-client";
import type { ScholarshipPublicListItem, BoursesTexts } from "@/types";
import SalmaButton from "./SalmaButton";

interface ScholarshipCardProps {
  scholarship: ScholarshipPublicListItem;
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const { locale } = useLanguage();
  const [texts, setTexts] = useState<BoursesTexts | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent("bourses", locale).then(data => {
      setTexts(data as BoursesTexts);
    });
  }, [locale]);

  if (!texts) return <div className="h-[400px] bg-salma-surface animate-pulse rounded-2xl" />;

  const title = locale === "fr" ? scholarship.titre_fr : scholarship.titre_en;
  const org = locale === "fr" ? scholarship.organisme_fr : scholarship.organisme_en;
  const langReq = locale === "fr" ? scholarship.exigence_langue_fr : scholarship.exigence_langue_en;
  const imageUrl = getMediaUrl(scholarship.image_principale?.url_fichier);

  return (
    <div className="group bg-white dark:bg-salma-surface rounded-2xl border border-salma-border overflow-hidden shadow-salma-sm hover:shadow-salma-md transition-all duration-500 flex flex-col h-full">
      <div className="relative h-52 w-full overflow-hidden">
        <Image src={imageUrl || "/image.jpg"} alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-salma-primary shadow-sm uppercase">
          {scholarship.pays_destination === 'chine' ? '🇨🇳 Chine' : '🇩🇪 Allemagne'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white mb-3 line-clamp-2">{title}</h3>
        <p className="text-sm text-salma-text-muted mb-6 line-clamp-2">{org}</p>

        <div className="mt-auto pt-4 border-t border-salma-border grid grid-cols-2 gap-4">
          <div>
            <span className="block text-[9px] text-salma-text-muted uppercase font-bold">{texts.scholarships.language}</span>
            <span className="text-xs font-bold text-salma-primary dark:text-salma-gold">{langReq}</span>
          </div>
          <div>
            <span className="block text-[9px] text-salma-text-muted uppercase font-bold">{texts.scholarships.deadline}</span>
            <span className="text-xs font-bold text-red-500">{scholarship.date_limite || "—"}</span>
          </div>
        </div>

        <Link href={`/bourses/${scholarship.id}`} className="w-full mt-6">
          <SalmaButton variant="outline" size="sm" className="w-full">{texts.scholarships.viewDetails}</SalmaButton>
        </Link>
      </div>
    </div>
  );
}