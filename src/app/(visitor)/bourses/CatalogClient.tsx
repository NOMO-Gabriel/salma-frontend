"use client";

import {  useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SectionTitle from "@/components/ui/SectionTitle";
import SalmaButton from "@/components/ui/SalmaButton";
import { getMediaUrl } from "@/lib/api-client";
import { getMarketingTitle } from "@/lib/scholarship-utils";
import { ALL_STATIC_SCHOLARSHIPS } from "@/dictionaries/data/static/bourses/all-scholarships";
import ConversionCTA from "@/components/ui/ConversionCTA";
import type {
  ScholarshipPublicListItem,
  ScholarshipFilters,
  PaginatedResponse,
  BoursesTexts
} from "@/types";

const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_CONTENT === "true";
const STATIC_PAGE_SIZE = 9;

const PAYS_OPTIONS = [
  { value: "", label: "🌍 Tous les pays" },
  { value: "chine", label: "🇨🇳 Chine" },
  { value: "allemagne", label: "🇩🇪 Allemagne" },
];

const NIVEAU_OPTIONS = [
  { value: "", label: "🎓 Tous les niveaux" },
  { value: "licence", label: "Licence" },
  { value: "master", label: "Master" },
  { value: "doctorat", label: "Doctorat" },
];

export default function CatalogClient({ initialData, initialFilters }: { initialData: PaginatedResponse<ScholarshipPublicListItem>, initialFilters: ScholarshipFilters }) {
  const { locale,dictionary } = useLanguage();


  const [texts, setTexts] = useState<BoursesTexts | null>(null);
  const [localPays, setLocalPays] = useState(initialFilters.pays_destination ?? "");
  const [localNiveau, setLocalNiveau] = useState(initialFilters.niveau ?? "");
  const [localSearch, setLocalSearch] = useState(initialFilters.search ?? "");
  const [localDomaine, setLocalDomaine] = useState(""); 
  const [staticPage, setStaticPage] = useState(1);

  useEffect(() => {
    cmsSwitcher.getScopeContent<BoursesTexts>("bourses", locale).then((data) => {
      setTexts(data);
    });
  }, [locale]);

  // 1. CHARGEMENT DYNAMIQUE DES DOMAINES (Basé sur les bourses présentes)
  const DOMAINE_OPTIONS = useMemo(() => {
    const source = IS_STATIC ? ALL_STATIC_SCHOLARSHIPS : initialData.results;
    const allFields = source.flatMap(s => s.domaines);
    const uniqueNames = Array.from(new Set(allFields.map(f => locale === 'fr' ? f.nom_fr : f.nom_en)));
    return uniqueNames.sort();
  }, [locale, initialData.results]);

  const filteredStatic = useMemo(() => {
    if (!IS_STATIC) return [];
    return ALL_STATIC_SCHOLARSHIPS.filter((b) => {
      if (localPays && b.pays_destination !== localPays) return false;
      if (localNiveau && b.niveau !== localNiveau) return false;
      if (localDomaine && !b.domaines.some(d => (locale === 'fr' ? d.nom_fr : d.nom_en) === localDomaine)) return false;
      if (localSearch) {
        const q = localSearch.toLowerCase();
        const matchTitle = b.titre_fr.toLowerCase().includes(q) || b.titre_en.toLowerCase().includes(q);
        const matchDomain = b.domaines.some(d => d.nom_fr.toLowerCase().includes(q));
        if (!matchTitle && !matchDomain) return false;
      }
      return true;
    });
  }, [localPays, localNiveau, localSearch, localDomaine, locale]);

  const staticPageData = filteredStatic.slice((staticPage - 1) * STATIC_PAGE_SIZE, staticPage * STATIC_PAGE_SIZE);

  const handleFilterChange = (key: string, value: string) => {
    if (key === "pays") setLocalPays(value);
    if (key === "niveau") setLocalNiveau(value);
    if (key === "search") setLocalSearch(value);
    if (key === "domaine") setLocalDomaine(value);
    setStaticPage(1);
  };

  if (!texts) return <div className="min-h-screen bg-salma-bg flex items-center justify-center animate-pulse text-salma-primary font-bold">Chargement...</div>;

  const displayData = IS_STATIC ? staticPageData : initialData.results;
  const totalCount = IS_STATIC ? filteredStatic.length : initialData.count;

  return (
    <div className="min-h-screen bg-salma-bg">
      <div className="container mx-auto px-6 py-20">
        <div className="mb-12">
          <SectionTitle title={texts.catalog.title} subtitle={texts.catalog.subtitle} />
          <p className="text-salma-text-muted text-sm mt-4">
            <span className="text-salma-primary font-bold">{totalCount}</span> {texts.catalog.found}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR - DESIGN ORIGINAL RESTAURÉ */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-salma-surface border border-salma-border rounded-3xl p-8 sticky top-28 space-y-8 shadow-sm">
              
              {/* Recherche */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-salma-text-muted mb-3 block">Recherche</label>
                <input 
                  type="text" 
                  value={localSearch}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  placeholder={texts.catalog.searchPlaceholder}
                  className="w-full p-4 rounded-2xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold text-sm"
                />
              </div>

              {/* Destination - RESTAURÉ */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-salma-text-muted mb-3 block">Destination</label>
                <div className="flex flex-col gap-2">
                  {PAYS_OPTIONS.map(opt => (
                    <button 
                      key={opt.value}
                      onClick={() => handleFilterChange("pays", opt.value)}
                      className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${localPays === opt.value ? 'bg-salma-primary text-white shadow-md' : 'hover:bg-salma-bg text-salma-text'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Domaine d'études - DYNAMIQUE */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-salma-text-muted mb-3 block">{texts.catalog.filterDomain}</label>
                <select 
                  value={localDomaine}
                  onChange={(e) => handleFilterChange("domaine", e.target.value)}
                  className="w-full p-4 rounded-2xl bg-salma-bg border border-salma-border outline-none text-sm font-bold appearance-none cursor-pointer"
                >
                  <option value="">{texts.catalog.allDomains}</option>
                  {DOMAINE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              {/* Niveau d'études - RESTAURÉ */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-salma-text-muted mb-3 block">Niveau d&apos;études</label>
                <select 
                  value={localNiveau}
                  onChange={(e) => handleFilterChange("niveau", e.target.value)}
                  className="w-full p-4 rounded-2xl bg-salma-bg border border-salma-border outline-none text-sm font-bold"
                >
                  {NIVEAU_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
          </aside>

          {/* GRILLE DE RÉSULTATS - DESIGN ORIGINAL RESTAURÉ */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayData.map((s) => (
                <ScholarshipItem key={s.id} scholarship={s} locale={locale as 'fr'|'en'} labels={texts} />
              ))}
            </div>
          </div>
        </div>
      </div>
       {/* ── SECTION CONVERSION AVEC ESPACE RÉEL (mt-32) ── */}
      {/* On le place à la fin du div principal, après le container du catalogue */}
      <div className="mt-32">
        <ConversionCTA labels={dictionary.nav_contact} />
      </div>
    </div>
  );
}

// --- ITEM BOURSE - DESIGN ORIGINAL + STRATÉGIE MARKETING ---
function ScholarshipItem({ scholarship: s, locale, labels }: { scholarship: ScholarshipPublicListItem, locale: 'fr'|'en', labels: BoursesTexts }) {
  const marketingTitle = getMarketingTitle(s, locale);
  const imgUrl = s.image_principale?.url_fichier;

  return (
    <div className="group bg-white dark:bg-salma-surface border border-salma-border rounded-[2.5rem] overflow-hidden hover:shadow-salma-lg transition-all duration-500 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={IS_STATIC ? (imgUrl || "/image.jpg") : (getMediaUrl(imgUrl) || "/image.jpg")} 
          alt={marketingTitle} fill className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-salma-primary shadow-sm uppercase tracking-widest">
          {s.pays_destination === 'chine' ? '🇨🇳 Chine' : '🇩🇪 Allemagne'}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex gap-2 mb-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-salma-gold">{s.niveau}</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-salma-text-muted">•</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-salma-gold">{s.type_couverture}</span>
        </div>
        
        {/* TITRE MARKETING */}
        <h3 className="text-lg font-serif font-bold text-salma-primary dark:text-white leading-tight mb-2">
          {marketingTitle}
        </h3>
        
        {/* INFO RÉSERVÉE */}
        <p className="text-[10px] font-bold text-salma-gold uppercase tracking-widest mb-6">
          {labels.catalog.reservedInfo}
        </p>

        <div className="mt-auto pt-6 border-t border-salma-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase text-salma-text-muted tracking-tighter">{labels.scholarships.deadline}</span>
            <span className="text-xs font-bold text-red-500">{s.date_limite || "—"}</span>
          </div>
          <Link href={`/bourses/${s.id}`}>
            <SalmaButton variant="outline" size="sm">{labels.scholarships.viewDetails}</SalmaButton>
          </Link>
        </div>
      </div>
    </div>
  );
}