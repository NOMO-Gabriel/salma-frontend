// src/app/(visitor)/bourses/CatalogClient.tsx
// ==============================================================================
//  CatalogClient — Client Component
//  Gère les interactions filtres : met à jour l'URL → le Server Component refetch
//  Pattern : URL as source of truth (pas de state local pour les filtres)
// ==============================================================================
"use client";

import { useCallback, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import SectionTitle from "@/components/ui/SectionTitle";
import SalmaButton from "@/components/ui/SalmaButton";
import { getMediaUrl } from "@/lib/api-client";
import { eventsRepository } from "@/repositories/events.repository";
import type {
  ScholarshipPublicListItem,
  ScholarshipFilters,
  PaginatedResponse,
} from "@/types/api/scholarship.types";

// --- Constantes UI -----------------------------------------------------------

const PAYS_OPTIONS = [
  { value: "", label: "Tous les pays" },
  { value: "chine", label: "🇨🇳 Chine" },
  { value: "allemagne", label: "🇩🇪 Allemagne" },
];

const NIVEAU_OPTIONS = [
  { value: "", label: "Tous les niveaux" },
  { value: "licence", label: "Licence" },
  { value: "master", label: "Master" },
  { value: "doctorat", label: "Doctorat" },
  { value: "postdoc", label: "Post-Doc" },
  { value: "formation", label: "Formation" },
];

const COUVERTURE_OPTIONS = [
  { value: "", label: "Toute couverture" },
  { value: "complete", label: "Bourse complète" },
  { value: "partielle", label: "Partielle" },
  { value: "logement", label: "Logement inclus" },
];

const COVERAGE_STYLE: Record<string, string> = {
  complete:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  partielle: "bg-blue-50 text-blue-700 border-blue-200",
  logement:  "bg-purple-50 text-purple-700 border-purple-200",
  transport: "bg-orange-50 text-orange-700 border-orange-200",
  autre:     "bg-gray-50 text-gray-700 border-gray-200",
};

const COVERAGE_LABEL: Record<string, string> = {
  complete:  "Bourse complète",
  partielle: "Partielle",
  logement:  "Logement inclus",
  transport: "Transport",
  autre:     "Aide financière",
};

const LEVEL_LABEL: Record<string, string> = {
  licence: "Licence", master: "Master", doctorat: "Doctorat",
  postdoc: "Post-Doc", formation: "Formation", autre: "Autre",
};

const FLAG: Record<string, string> = {
  chine: "🇨🇳", allemagne: "🇩🇪", france: "🇫🇷", canada: "🇨🇦", autre: "🌍",
};

// --- Composant carte bourse --------------------------------------------------

function ScholarshipCard({
  scholarship,
  locale,
}: {
  scholarship: ScholarshipPublicListItem;
  locale: "fr" | "en";
}) {
  const title   = locale === "fr" ? scholarship.titre_fr : scholarship.titre_en;
  const org     = locale === "fr" ? scholarship.organisme_fr : scholarship.organisme_en;
  const imgUrl  = getMediaUrl(scholarship.image_principale?.url_fichier);
  const flag    = FLAG[scholarship.pays_destination] ?? "🌍";
  const covStyle = COVERAGE_STYLE[scholarship.type_couverture] ?? COVERAGE_STYLE.autre;
  const covLabel = COVERAGE_LABEL[scholarship.type_couverture] ?? "Aide financière";

  const deadline = scholarship.date_limite
    ? new Date(scholarship.date_limite).toLocaleDateString("fr-FR", {
        day: "2-digit", month: "short", year: "numeric",
      })
    : null;

  const isUrgent = scholarship.date_limite
    ? new Date(scholarship.date_limite).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000
    : false;

  return (
    <Link
      href={`/bourses/${scholarship.id}`}
      onClick={() => eventsRepository.trackScholarshipView(scholarship.id)}
      className="group flex flex-col bg-white border border-salma-border rounded-2xl overflow-hidden shadow-sm hover:shadow-salma-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-44 bg-salma-surface overflow-hidden flex-shrink-0">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-salma-primary/10 to-salma-gold/10">
            <span className="text-5xl">{flag}</span>
          </div>
        )}
        {isUrgent && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            ⚡ Urgent
          </span>
        )}
        {scholarship.est_mise_en_avant && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-salma-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            ⭐ Vedette
          </span>
        )}
      </div>

      {/* Corps */}
      <div className="flex flex-col flex-1 p-5 gap-2.5">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-salma-text-muted">
          <span>{flag} {scholarship.pays_destination.charAt(0).toUpperCase() + scholarship.pays_destination.slice(1)}</span>
          <span className="text-salma-border">·</span>
          <span>{LEVEL_LABEL[scholarship.niveau] ?? scholarship.niveau}</span>
        </div>

        <h3 className="text-sm font-bold text-salma-primary leading-snug group-hover:text-salma-gold transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-[11px] text-salma-text-muted truncate">{org}</p>

        {scholarship.domaines.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {scholarship.domaines.slice(0, 3).map((d) => (
              <span key={d.id} className="px-2 py-0.5 bg-salma-bg border border-salma-border rounded-full text-[10px] text-salma-text-muted">
                {locale === "fr" ? d.nom_fr : d.nom_en}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-salma-border flex items-center justify-between gap-2">
          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${covStyle}`}>
            {covLabel}
          </span>
          {deadline && (
            <span className={`text-[10px] font-medium flex-shrink-0 ${isUrgent ? "text-red-500 font-bold" : "text-salma-text-muted"}`}>
              {isUrgent ? "⚠ " : ""}Limite : {deadline}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// --- Squelettes de chargement ------------------------------------------------

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-salma-border rounded-2xl overflow-hidden animate-pulse">
          <div className="h-44 bg-salma-surface" />
          <div className="p-5 space-y-3">
            <div className="h-3 bg-salma-surface rounded w-1/3" />
            <div className="h-4 bg-salma-surface rounded w-5/6" />
            <div className="h-3 bg-salma-surface rounded w-2/3" />
            <div className="h-7 bg-salma-surface rounded-full w-1/2 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Composant principal -----------------------------------------------------

interface Props {
  initialData: PaginatedResponse<ScholarshipPublicListItem>;
  initialFilters: ScholarshipFilters;
}

export default function CatalogClient({ initialData, initialFilters }: Props) {
  const { dictionary, locale } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // --- Mise à jour de l'URL (source de vérité des filtres) ------------------
  const updateURL = useCallback(
    (updates: Record<string, string | undefined>) => {
      const current = new URLSearchParams();

      // Recopier les filtres existants
      if (initialFilters.pays_destination) current.set("pays", initialFilters.pays_destination);
      if (initialFilters.niveau) current.set("niveau", initialFilters.niveau);
      if (initialFilters.type_couverture) current.set("couverture", initialFilters.type_couverture);
      if (initialFilters.search) current.set("q", initialFilters.search);

      // Appliquer les mises à jour
      Object.entries(updates).forEach(([key, val]) => {
        if (val) current.set(key, val);
        else current.delete(key);
      });

      // Reset page lors d'un changement de filtre (sauf si c'est une page)
      if (!("page" in updates)) current.delete("page");

      startTransition(() => {
        router.push(`${pathname}?${current.toString()}`);
      });
    },
    [initialFilters, pathname, router]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      // Debounce léger via setTimeout natif
      const timer = setTimeout(() => updateURL({ q: val || undefined }), 400);
      return () => clearTimeout(timer);
    },
    [updateURL]
  );

  const activeFiltersCount = [
    initialFilters.pays_destination,
    initialFilters.niveau,
    initialFilters.type_couverture,
    initialFilters.search,
  ].filter(Boolean).length;

  const totalPages = Math.ceil(initialData.count / (initialFilters.page_size ?? 12));
  const currentPage = initialFilters.page ?? 1;

  return (
    <div className="min-h-screen bg-salma-bg">
      <div className="container mx-auto px-4 sm:px-6 py-16">

        {/* En-tête */}
        <div className="max-w-3xl mb-10">
          <SectionTitle
            title={dictionary.catalog?.title ?? "Catalogue des Bourses"}
            subtitle={dictionary.catalog?.subtitle ?? "Chine & Allemagne"}
            align="left"
          />
          <p className="text-salma-text-muted text-sm mt-2">
            {dictionary.catalog?.description ?? "Trouvez la bourse qui correspond à votre profil et lancez votre dossier avec SALMA."}
          </p>
        </div>

        {/* --- Barre de filtres --- */}
        <div className="bg-white border border-salma-border rounded-2xl p-4 sm:p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

            {/* Recherche textuelle */}
            <div className="relative lg:col-span-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-salma-text-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                defaultValue={initialFilters.search ?? ""}
                onChange={handleSearch}
                placeholder="Rechercher une bourse..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-salma-border rounded-xl bg-salma-bg outline-none focus:border-salma-primary focus:ring-2 focus:ring-salma-primary/10 transition-all"
              />
            </div>

            {/* Filtre Pays */}
            <select
              value={initialFilters.pays_destination ?? ""}
              onChange={(e) => updateURL({ pays: e.target.value || undefined })}
              className="px-4 py-2.5 text-sm border border-salma-border rounded-xl bg-salma-bg outline-none focus:border-salma-primary cursor-pointer"
            >
              {PAYS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Filtre Niveau */}
            <select
              value={initialFilters.niveau ?? ""}
              onChange={(e) => updateURL({ niveau: e.target.value || undefined })}
              className="px-4 py-2.5 text-sm border border-salma-border rounded-xl bg-salma-bg outline-none focus:border-salma-primary cursor-pointer"
            >
              {NIVEAU_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Filtre Couverture */}
            <select
              value={initialFilters.type_couverture ?? ""}
              onChange={(e) => updateURL({ couverture: e.target.value || undefined })}
              className="px-4 py-2.5 text-sm border border-salma-border rounded-xl bg-salma-bg outline-none focus:border-salma-primary cursor-pointer"
            >
              {COUVERTURE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Résumé + reset */}
          {(activeFiltersCount > 0 || isPending) && (
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-salma-text-muted">
                {isPending ? "Recherche en cours..." : `${initialData.count} bourse${initialData.count > 1 ? "s" : ""} trouvée${initialData.count > 1 ? "s" : ""}`}
              </p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => router.push(pathname)}
                  className="text-xs text-salma-primary hover:underline font-medium"
                >
                  Effacer les filtres ({activeFiltersCount})
                </button>
              )}
            </div>
          )}
        </div>

        {/* --- Scholarship Matcher (CTA conversion) --- */}
        {activeFiltersCount === 0 && (
          <div className="mb-8 p-5 bg-gradient-to-r from-salma-primary to-salma-primary/80 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-white">
            <div className="flex-1">
              <p className="font-serif font-bold text-lg">🎯 Trouvez votre bourse en 3 clics</p>
              <p className="text-sm text-white/80 mt-1">Utilisez les filtres ci-dessus ou contactez-nous — nos conseillers identifient votre bourse idéale gratuitement.</p>
            </div>
            <Link href="/contact">
              <SalmaButton variant="outline" className="border-white text-white hover:bg-white hover:text-salma-primary whitespace-nowrap">
                Consulter gratuitement
              </SalmaButton>
            </Link>
          </div>
        )}

        {/* --- Grille des bourses --- */}
        {isPending ? (
          <SkeletonGrid />
        ) : initialData.results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-6xl mb-4">🔍</span>
            <h3 className="text-xl font-serif font-bold text-salma-primary mb-2">
              Aucune bourse trouvée
            </h3>
            <p className="text-salma-text-muted text-sm max-w-md">
              Aucune bourse ne correspond à vos critères. Essayez d&apos;élargir votre recherche ou contactez-nous.
            </p>
            <button
              onClick={() => router.push(pathname)}
              className="mt-6 px-6 py-2.5 rounded-xl bg-salma-primary text-white text-sm font-medium hover:bg-salma-primary/90 transition-all"
            >
              Voir toutes les bourses
            </button>
          </div>
        ) : (
          <>
            {/* Compteur résultats */}
            <p className="text-xs text-salma-text-muted mb-4 font-medium">
              {initialData.count} bourse{initialData.count > 1 ? "s" : ""} disponible{initialData.count > 1 ? "s" : ""}
              {currentPage > 1 && ` — Page ${currentPage}/${totalPages}`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialData.results.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} locale={locale} />
              ))}
            </div>

            {/* --- Pagination --- */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {/* Précédent */}
                <button
                  onClick={() => updateURL({ page: String(currentPage - 1) })}
                  disabled={currentPage <= 1}
                  className="px-4 py-2 rounded-xl border border-salma-border text-sm font-medium text-salma-text-muted hover:bg-salma-surface disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  ← Précédent
                </button>

                {/* Pages numérotées */}
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => updateURL({ page: String(page) })}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                        page === currentPage
                          ? "bg-salma-primary text-white shadow-sm"
                          : "border border-salma-border text-salma-text-muted hover:bg-salma-surface"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Suivant */}
                <button
                  onClick={() => updateURL({ page: String(currentPage + 1) })}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 rounded-xl border border-salma-border text-sm font-medium text-salma-text-muted hover:bg-salma-surface disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Suivant →
                </button>
              </div>
            )}
          </>
        )}

        {/* --- CTA bas de page --- */}
        <div className="mt-20 text-center py-12 px-6 bg-white border border-salma-border rounded-2xl">
          <p className="text-xl font-serif font-bold text-salma-primary mb-2">
            Vous ne trouvez pas votre bourse ?
          </p>
          <p className="text-salma-text-muted text-sm mb-6 max-w-lg mx-auto">
            Nos conseillers connaissent des dizaines d&apos;opportunités non listées ici. Contactez-nous pour une consultation gratuite.
          </p>
          <Link href="/contact">
            <SalmaButton variant="primary" size="lg">
              Parler à un conseiller
            </SalmaButton>
          </Link>
        </div>

      </div>
    </div>
  );
}
