"use client";
// src/app/(visitor)/bourses/CatalogClient.tsx
// =============================================================================
//  Catalogue Bourses — Version Polie & Stabilisée (CMS Ready)
//  ✅ Piloté par cmsSwitcher (Scope: "bourses")
//  ✅ Filtrage Hybride (Statique / API)
//  ✅ Correction Build (Apostrophes & Typage Any)
// =============================================================================

import { useCallback, useTransition, useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SectionTitle from "@/components/ui/SectionTitle";
import SalmaButton from "@/components/ui/SalmaButton";
import { getMediaUrl } from "@/lib/api-client";
import { ALL_STATIC_SCHOLARSHIPS } from "@/dictionaries/data/static/bourses/all-scholarships";
import type {
  ScholarshipPublicListItem,
  ScholarshipFilters,
  PaginatedResponse,
} from "@/types/api/scholarship.types";

// --- Interface pour le contenu CMS ---
interface BoursesTexts {
  catalog: {
    title: string;
    subtitle: string;
    description: string;
    searchPlaceholder: string;
    noResults: string;
    found: string;
  };
  scholarships: {
    deadline: string;
    language: string;
    viewDetails: string;
  };
}

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

// =============================================================================
//  Composant Principal
// =============================================================================
interface Props {
  initialData: PaginatedResponse<ScholarshipPublicListItem>;
  initialFilters: ScholarshipFilters;
}

export default function CatalogClient({ initialData, initialFilters }: Props) {
  const { locale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [texts, setTexts] = useState<BoursesTexts | null>(null);
  const [localPays, setLocalPays] = useState(initialFilters.pays_destination ?? "");
  const [localNiveau, setLocalNiveau] = useState(initialFilters.niveau ?? "");
  const [localSearch, setLocalSearch] = useState(initialFilters.search ?? "");
  const [staticPage, setStaticPage] = useState(1);

  useEffect(() => {
    cmsSwitcher.getScopeContent("bourses", locale).then((data) => {
      setTexts(data as BoursesTexts);
    });
  }, [locale]);

  const filteredStatic = useMemo(() => {
    if (!IS_STATIC) return [];
    const q = localSearch.toLowerCase();
    return ALL_STATIC_SCHOLARSHIPS.filter((b) => {
      if (localPays && b.pays_destination !== localPays) return false;
      if (localNiveau && b.niveau !== localNiveau) return false;
      if (q && !b.titre_fr.toLowerCase().includes(q) && !b.titre_en.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [localPays, localNiveau, localSearch]);

  const staticTotalPages = Math.ceil(filteredStatic.length / STATIC_PAGE_SIZE);
  const staticPageData = filteredStatic.slice((staticPage - 1) * STATIC_PAGE_SIZE, staticPage * STATIC_PAGE_SIZE);

  const updateURL = useCallback(
    (updates: Record<string, string | undefined>) => {
      const current = new URLSearchParams();
      if (localPays) current.set("pays", localPays);
      if (localNiveau) current.set("niveau", localNiveau);
      if (localSearch) current.set("q", localSearch);
      
      Object.entries(updates).forEach(([key, val]) => {
        if (val) current.set(key, val); else current.delete(key);
      });

      startTransition(() => { router.push(`${pathname}?${current.toString()}`); });
    },
    [localPays, localNiveau, localSearch, pathname, router]
  );

  const handleFilterChange = (key: string, value: string) => {
    if (key === "pays") setLocalPays(value);
    if (key === "niveau") setLocalNiveau(value);
    if (key === "search") setLocalSearch(value);
    setStaticPage(1);

    if (!IS_STATIC) {
      updateURL({ [key]: value || undefined, page: "1" });
    }
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
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-salma-surface border border-salma-border rounded-3xl p-8 sticky top-28 space-y-8 shadow-sm">
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

          <div className="flex-1">
            {isPending ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                {[1,2,3,4].map(i => <div key={i} className="h-80 bg-white border border-salma-border rounded-3xl" />)}
              </div>
            ) : displayData.length === 0 ? (
              <div className="py-32 text-center bg-white dark:bg-salma-surface rounded-[3rem] border border-salma-border">
                <span className="text-6xl mb-6 block">🔍</span>
                <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white">{texts.catalog.noResults}</h3>
                <button onClick={() => { setLocalPays(""); setLocalNiveau(""); setLocalSearch(""); }} className="mt-4 text-salma-gold font-bold hover:underline">Réinitialiser les filtres</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {displayData.map((s) => (
                    <ScholarshipItem key={s.id} scholarship={s} locale={locale} labels={texts.scholarships} />
                  ))}
                </div>

                {IS_STATIC && staticTotalPages > 1 && (
                  <div className="mt-12 flex justify-center gap-2">
                    {[...Array(staticTotalPages)].map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setStaticPage(i + 1)}
                        className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${staticPage === i + 1 ? 'bg-salma-primary text-white' : 'bg-white border border-salma-border text-salma-text hover:border-salma-gold'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sous-Composant Carte Bourse (Typé) ---
interface ItemProps {
  scholarship: ScholarshipPublicListItem;
  locale: string;
  labels: BoursesTexts['scholarships'];
}

function ScholarshipItem({ scholarship, locale, labels }: ItemProps) {
  const title = locale === "fr" ? scholarship.titre_fr : scholarship.titre_en;
  const org = locale === "fr" ? scholarship.organisme_fr : scholarship.organisme_en;
  const imgUrl = scholarship.image_principale?.url_fichier;

  return (
    <div className="group bg-white dark:bg-salma-surface border border-salma-border rounded-[2.5rem] overflow-hidden hover:shadow-salma-lg transition-all duration-500 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={IS_STATIC ? (imgUrl || "/image.jpg") : (getMediaUrl(imgUrl) || "/image.jpg")} 
          alt={title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-salma-primary shadow-sm uppercase tracking-widest">
          {scholarship.pays_destination === 'chine' ? '🇨🇳 Chine' : '🇩🇪 Allemagne'}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex gap-2 mb-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-salma-gold">{scholarship.niveau}</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-salma-text-muted">•</span>
          <span className="text-[9px] font-black uppercase tracking-widest text-salma-gold">{scholarship.type_couverture}</span>
        </div>
        
        <h3 className="text-lg font-serif font-bold text-salma-primary dark:text-white leading-tight mb-3">
          {title}
        </h3>
        <p className="text-xs text-salma-text-muted line-clamp-2 mb-6">{org}</p>

        <div className="mt-auto pt-6 border-t border-salma-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase text-salma-text-muted tracking-tighter">{labels.deadline}</span>
            <span className="text-xs font-bold text-red-500">{scholarship.date_limite || "—"}</span>
          </div>
          <Link href={`/bourses/${scholarship.id}`}>
            <SalmaButton variant="outline" size="sm">{labels.viewDetails}</SalmaButton>
          </Link>
        </div>
      </div>
    </div>
  );
}