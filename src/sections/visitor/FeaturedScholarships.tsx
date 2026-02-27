// src/sections/visitor/FeaturedScholarships.tsx
// ==============================================================================
//  Section Bourses Vedette — reçoit les données réelles en props (Server Component)
//  Fallback propre si aucune bourse disponible
// ==============================================================================
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import SectionTitle from "@/components/ui/SectionTitle";
import SalmaButton from "@/components/ui/SalmaButton";
import { getMediaUrl } from "@/lib/api-client";
import type { ScholarshipPublicListItem } from "@/types/api/scholarship.types";

interface Props {
  scholarships: ScholarshipPublicListItem[];
}

// Labels d'affichage pour les énumérations Django
const LEVEL_LABELS: Record<string, string> = {
  licence: "Licence",
  master: "Master",
  doctorat: "Doctorat",
  postdoc: "Post-Doc",
  formation: "Formation",
  autre: "Autre",
};

const COVERAGE_LABELS: Record<string, { fr: string; color: string }> = {
  complete:   { fr: "Bourse complète",  color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  partielle:  { fr: "Partielle",        color: "bg-blue-50 text-blue-700 border-blue-200" },
  logement:   { fr: "Logement inclus",  color: "bg-purple-50 text-purple-700 border-purple-200" },
  transport:  { fr: "Transport",        color: "bg-orange-50 text-orange-700 border-orange-200" },
  autre:      { fr: "Aide financière",  color: "bg-gray-50 text-gray-700 border-gray-200" },
};

const COUNTRY_FLAGS: Record<string, string> = {
  chine:     "🇨🇳",
  allemagne: "🇩🇪",
  france:    "🇫🇷",
  canada:    "🇨🇦",
  autre:     "🌍",
};

function ScholarshipCard({ scholarship, locale }: { scholarship: ScholarshipPublicListItem; locale: "fr" | "en" }) {
  const title = locale === "fr" ? scholarship.titre_fr : scholarship.titre_en;
  const org   = locale === "fr" ? scholarship.organisme_fr : scholarship.organisme_en;
  const imageUrl = getMediaUrl(scholarship.image_principale?.url_fichier);
  const coverage = COVERAGE_LABELS[scholarship.type_couverture] ?? COVERAGE_LABELS.autre;
  const flag = COUNTRY_FLAGS[scholarship.pays_destination] ?? "🌍";

  const deadlineDate = scholarship.date_limite
    ? new Date(scholarship.date_limite).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })
    : null;

  const isUrgent = scholarship.date_limite
    ? new Date(scholarship.date_limite).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000
    : false;

  return (
    <Link
      href={`/bourses/${scholarship.id}`}
      className="group flex flex-col bg-white border border-salma-border rounded-2xl overflow-hidden shadow-sm hover:shadow-salma-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-44 bg-salma-surface overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-salma-primary/10 to-salma-gold/10">
            <span className="text-5xl">{flag}</span>
          </div>
        )}
        {/* Badge urgent */}
        {isUrgent && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow">
              Urgent
            </span>
          </div>
        )}
        {/* Badge vedette */}
        {scholarship.est_mise_en_avant && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-salma-gold text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow">
              ⭐ Vedette
            </span>
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Pays + Niveau */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-salma-text-muted flex items-center gap-1">
            {flag} {scholarship.pays_destination.charAt(0).toUpperCase() + scholarship.pays_destination.slice(1)}
          </span>
          <span className="text-salma-border">·</span>
          <span className="text-xs font-semibold text-salma-text-muted">
            {LEVEL_LABELS[scholarship.niveau] ?? scholarship.niveau}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-sm font-bold text-salma-primary leading-snug group-hover:text-salma-gold transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Organisme */}
        <p className="text-xs text-salma-text-muted truncate">{org}</p>

        {/* Domaines */}
        {scholarship.domaines.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {scholarship.domaines.slice(0, 3).map((d) => (
              <span key={d.id} className="px-2 py-0.5 bg-salma-bg border border-salma-border rounded-full text-[10px] font-medium text-salma-text-muted">
                {locale === "fr" ? d.nom_fr : d.nom_en}
              </span>
            ))}
          </div>
        )}

        {/* Footer de la carte */}
        <div className="mt-auto pt-3 border-t border-salma-border flex items-center justify-between">
          {/* Badge couverture */}
          <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border ${coverage.color}`}>
            {coverage.fr}
          </span>
          {/* Date limite */}
          {deadlineDate && (
            <span className={`text-[10px] font-medium ${isUrgent ? "text-red-500 font-bold" : "text-salma-text-muted"}`}>
              {isUrgent ? "⚠ " : ""}Limite : {deadlineDate}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// Carte squelette pendant le chargement
function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white border border-salma-border rounded-2xl overflow-hidden animate-pulse">
      <div className="h-44 bg-salma-surface" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-salma-surface rounded w-1/3" />
        <div className="h-4 bg-salma-surface rounded w-4/5" />
        <div className="h-3 bg-salma-surface rounded w-2/3" />
        <div className="h-8 bg-salma-surface rounded-full w-1/2 mt-auto" />
      </div>
    </div>
  );
}

export default function FeaturedScholarships({ scholarships }: Props) {
  const { dictionary, locale } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle
            title={dictionary.featuredScholarships.title}
            subtitle={dictionary.featuredScholarships.subtitle}
            align="left"
          />
          <Link href="/bourses">
            <SalmaButton variant="outline" className="hidden md:flex">
              {dictionary.featuredScholarships.viewAll}
            </SalmaButton>
          </Link>
        </div>

        {/* État vide */}
        {scholarships.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.slice(0, 3).map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} locale={locale} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/bourses" className="w-full">
            <SalmaButton variant="outline" className="w-full">
              {dictionary.featuredScholarships.viewAll}
            </SalmaButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
