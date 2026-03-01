"use client";
// src/sections/visitor/FeaturedScholarships.tsx
// =============================================================================
//  Mécanisme static/prod :
//    NEXT_PUBLIC_STATIC_CONTENT=true  → STATIC_FEATURED_SCHOLARSHIPS (3 du client)
//    NEXT_PUBLIC_STATIC_CONTENT=false → props `scholarships` (API Django)
//    API vide (backend down)           → fallback silencieux sur le statique
//  Textes : cmsSwitcher (scope "home")
//  Style  : identique à l'original
// =============================================================================

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SectionTitle from "@/components/ui/SectionTitle";
import SalmaButton from "@/components/ui/SalmaButton";
import { STATIC_FEATURED_SCHOLARSHIPS } from "@/dictionaries/data/static/bourses/all-scholarships";
import type { ScholarshipPublicListItem } from "@/types/api/scholarship.types";

const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_CONTENT === "true";

// ── Helpers visuels ───────────────────────────────────────────────────────────
const COVERAGE: Record<string, { fr: string; en: string; color: string }> = {
  complete:  { fr: "Bourse complète",  en: "Full scholarship", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  partielle: { fr: "Partielle",        en: "Partial",          color: "bg-blue-50 text-blue-700 border-blue-200" },
  logement:  { fr: "Logement inclus",  en: "Housing included", color: "bg-purple-50 text-purple-700 border-purple-200" },
  transport: { fr: "Transport",        en: "Transport",        color: "bg-orange-50 text-orange-700 border-orange-200" },
  autre:     { fr: "Aide financière",  en: "Financial aid",    color: "bg-gray-50 text-gray-700 border-gray-200" },
};

const LEVEL: Record<string, { fr: string; en: string }> = {
  licence:   { fr: "Licence",   en: "Bachelor" },
  master:    { fr: "Master",    en: "Master"   },
  doctorat:  { fr: "Doctorat",  en: "PhD"      },
  postdoc:   { fr: "Post-Doc",  en: "Post-Doc" },
  formation: { fr: "Formation", en: "Training" },
  autre:     { fr: "Autre",     en: "Other"    },
};

const FLAG: Record<string, string> = {
  chine: "🇨🇳", allemagne: "🇩🇪", france: "🇫🇷", canada: "🇨🇦", autre: "🌍",
};

// ── Squelette ─────────────────────────────────────────────────────────────────
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

// ── Carte bourse ──────────────────────────────────────────────────────────────
function ScholarshipCard({
  s,
  locale,
}: {
  s: ScholarshipPublicListItem;
  locale: "fr" | "en";
}) {
  const title    = locale === "fr" ? s.titre_fr : s.titre_en;
  const org      = locale === "fr" ? s.organisme_fr : s.organisme_en;
  // En statique, url_fichier = chemin /public direct — pas besoin de getMediaUrl()
  const imgUrl   = s.image_principale?.url_fichier ?? null;
  const flag     = FLAG[s.pays_destination] ?? "🌍";
  const cov      = COVERAGE[s.type_couverture] ?? COVERAGE.autre;
  const lvl      = LEVEL[s.niveau] ?? { fr: s.niveau, en: s.niveau };

  const deadlineStr = s.date_limite
    ? new Date(s.date_limite).toLocaleDateString("fr-FR", {
        day: "2-digit", month: "short", year: "numeric",
      })
    : null;

  const isUrgent = s.date_limite
    ? new Date(s.date_limite).getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000
    : false;

  const isClosed = s.statut === "ferme";

  return (
    <Link
      href={`/bourses/${s.id}`}
      className="group flex flex-col bg-white border border-salma-border rounded-2xl overflow-hidden shadow-sm hover:shadow-salma-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-44 bg-salma-surface overflow-hidden flex-shrink-0">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-salma-primary/10 to-salma-accent/10 flex items-center justify-center">
            <span className="text-5xl">{flag}</span>
          </div>
        )}

        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className="px-2.5 py-1 text-[10px] font-bold bg-white/90 backdrop-blur-sm rounded-full text-salma-primary shadow-sm">
            {flag} {s.pays_destination.charAt(0).toUpperCase() + s.pays_destination.slice(1)}
          </span>
          {isClosed && (
            <span className="px-2.5 py-1 text-[10px] font-bold bg-red-500 text-white rounded-full">
              {locale === "fr" ? "Fermé" : "Closed"}
            </span>
          )}
          {isUrgent && !isClosed && (
            <span className="px-2.5 py-1 text-[10px] font-bold bg-orange-500 text-white rounded-full animate-pulse">
              ⚡ Urgent
            </span>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Niveau */}
        <div className="flex items-center gap-2">
          <span className="text-salma-gold text-[10px] font-bold uppercase tracking-widest">
            {locale === "fr" ? lvl.fr : lvl.en}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-sm font-bold text-salma-primary leading-snug group-hover:text-salma-gold transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Organisme */}
        <p className="text-xs text-salma-text-muted truncate">{org}</p>

        {/* Domaines */}
        {s.domaines.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {s.domaines.slice(0, 3).map((d) => (
              <span key={d.id} className="px-2 py-0.5 bg-salma-bg border border-salma-border rounded-full text-[10px] font-medium text-salma-text-muted">
                {locale === "fr" ? d.nom_fr : d.nom_en}
              </span>
            ))}
          </div>
        )}

        {/* Footer carte */}
        <div className="mt-auto pt-3 border-t border-salma-border flex items-center justify-between gap-2">
          <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border ${cov.color}`}>
            {locale === "fr" ? cov.fr : cov.en}
          </span>
          {deadlineStr && (
            <span className={`text-[10px] font-medium ${isUrgent ? "text-red-500 font-bold" : "text-salma-text-muted"}`}>
              {isUrgent ? "⚠ " : ""}Limite : {deadlineStr}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────
interface Props {
  scholarships: ScholarshipPublicListItem[];
}

export default function FeaturedScholarships({ scholarships }: Props) {
  const { locale } = useLanguage();
  const [texts, setTexts] = useState<{
    title: string; subtitle: string; viewAll: string;
  } | null>(null);

  // Textes dynamiques via cmsSwitcher
  useEffect(() => {
    cmsSwitcher.getScopeContent("home", locale).then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const f = (data as any).featuredScholarships;
      if (f) setTexts({ title: f.title, subtitle: f.subtitle, viewAll: f.viewAll });
    });
  }, [locale]);

  // ── Source de données ──────────────────────────────────────────────────────
  // Règle : statique si STATIC_CONTENT=true OU si l'API n'a rien retourné
  const data: ScholarshipPublicListItem[] =
    IS_STATIC || scholarships.length === 0
      ? STATIC_FEATURED_SCHOLARSHIPS
      : scholarships;

  // Textes avec fallback inline pendant le chargement cmsSwitcher
  const t = texts ?? {
    title:    locale === "fr" ? "Bourses à la une"            : "Featured Scholarships",
    subtitle: locale === "fr" ? "Opportunités Exceptionnelles" : "Exceptional Opportunities",
    viewAll:  locale === "fr" ? "Voir toutes les bourses"      : "View all scholarships",
  };

  return (
    <section className="py-24 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle title={t.title} subtitle={t.subtitle} align="left" />
          <Link href="/bourses" className="hidden md:block">
            <SalmaButton variant="outline">{t.viewAll}</SalmaButton>
          </Link>
        </div>

        {/* Grille */}
        {data.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((s) => (
              <ScholarshipCard key={s.id} s={s} locale={locale} />
            ))}
          </div>
        )}

        {/* CTA mobile */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/bourses" className="w-full">
            <SalmaButton variant="outline" className="w-full">{t.viewAll}</SalmaButton>
          </Link>
        </div>

      </div>
    </section>
  );
}