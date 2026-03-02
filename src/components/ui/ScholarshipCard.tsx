// src/components/ui/ScholarshipCard.tsx
// ==============================================================================
// Carte de bourse — composant unique du Design System SALMA.
//
// Fusionne les 3 implémentations dupliquées (ui/ScholarshipCard,
// CatalogClient/ScholarshipItem, FeaturedScholarships/ScholarshipCard)
// en un seul composant centralisé, i18n, dark-mode et accessible.
//
// RÈGLE : Ce composant ne fetch JAMAIS de données. Tout vient des props.
// ==============================================================================

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMediaUrl } from "@/lib/api-client";
import SalmaBadge from "./SalmaBadge";
import SalmaButton from "./SalmaButton";
import type {
  ScholarshipCardProps,
} from "@/types";

// — Drapeaux par pays -----------------------------------------------------------

const FLAG: Record<string, string> = {
  chine: "🇨🇳",
  allemagne: "🇩🇪",
  france: "🇫🇷",
  canada: "🇨🇦",
  autre: "🌍",
};

// — Couleurs des badges de couverture -------------------------------------------

const COVERAGE_COLORS: Record<string, string> = {
  complete:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  partielle:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  logement:
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
  transport:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
  autre:
    "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700",
};

// — Seuil d'urgence : 30 jours -------------------------------------------------

const URGENCY_THRESHOLD_MS = 30 * 24 * 60 * 60 * 1000;

// — Helpers internes ------------------------------------------------------------

/**
 * Résout un champ bilingue selon la locale.
 * Évite la répétition de `locale === "fr" ? x.champ_fr : x.champ_en`.
 */
function localized(fr: string, en: string, locale: "fr" | "en"): string {
  return locale === "fr" ? fr : en;
}

/**
 * Formate une date ISO en format local lisible.
 * Ex: "2026-06-15" → "15 juin 2026" (fr) ou "Jun 15, 2026" (en)
 */
function formatDeadline(isoDate: string, locale: "fr" | "en"): string {
  return new Date(isoDate).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { day: "2-digit", month: "short", year: "numeric" }
  );
}

// — Squelette de chargement (exporté) -------------------------------------------

/**
 * Squelette animé pour le chargement de la ScholarshipCard.
 * Utilisable dans les grilles en attendant les données API.
 *
 * @example
 * {isLoading && <ScholarshipCardSkeleton />}
 */
export function ScholarshipCardSkeleton() {
  return (
    <div className="flex flex-col bg-white dark:bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="h-44 bg-surface dark:bg-border" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-surface dark:bg-border rounded w-1/3" />
        <div className="h-4 bg-surface dark:bg-border rounded w-4/5" />
        <div className="h-3 bg-surface dark:bg-border rounded w-2/3" />
        <div className="h-8 bg-surface dark:bg-border rounded-full w-1/2 mt-4" />
      </div>
    </div>
  );
}

// — Composant principal ---------------------------------------------------------

/**
 * **ScholarshipCard** — Carte de bourse du Design System SALMA.
 *
 * Affiche les informations clés d'une bourse : image, pays, niveau,
 * couverture, domaines d'études, deadline et CTA. Supporte le dark mode,
 * les états fermé/urgent, et deux variantes d'affichage.
 *
 * @remark Aucun texte en dur — tous les labels viennent de la prop `labels`
 * (assemblée par le parent depuis les dictionnaires i18n `common`).
 *
 * @remark Ce composant ne fetch jamais de données. Il reçoit tout par props.
 *
 * @example
 * // Assemblage des labels dans le parent
 * const cardLabels: ScholarshipCardLabels = {
 *   countries: common.countries,
 *   levels: common.levels,
 *   coverages: common.coverages,
 *   statusLabels: common.statusLabels,
 *   card: common.scholarshipCard,
 * };
 *
 * // Utilisation
 * <ScholarshipCard scholarship={s} locale={locale} labels={cardLabels} />
 */
export default function ScholarshipCard({
  scholarship: s,
  locale,
  labels,
  variant = "default",
  className = "",
}: ScholarshipCardProps) {
  // — Résolution des champs bilingues -------------------------------------------

  const title = localized(s.titre_fr, s.titre_en, locale);
  const org = localized(s.organisme_fr, s.organisme_en, locale);

  // — Image ---------------------------------------------------------------------

  const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_CONTENT === "true";
  const rawUrl = s.image_principale?.url_fichier ?? null;
  const imgUrl = rawUrl
    ? IS_STATIC
      ? rawUrl
      : getMediaUrl(rawUrl)
    : null;

  // — Labels résolus ------------------------------------------------------------

  const flag = FLAG[s.pays_destination] ?? "🌍";
  const countryLabel = labels.countries[s.pays_destination] ?? s.pays_destination;
  const levelLabel = labels.levels[s.niveau] ?? s.niveau;
  const coverageLabel = labels.coverages[s.type_couverture] ?? s.type_couverture;
  const coverageColor =
    COVERAGE_COLORS[s.type_couverture] ?? COVERAGE_COLORS.autre;

  // — Deadline & urgence --------------------------------------------------------

  const isClosed = s.statut === "ferme";
  const isUrgent =
    !isClosed &&
    !!s.date_limite &&
    new Date(s.date_limite).getTime() - Date.now() < URGENCY_THRESHOLD_MS;
  const deadlineStr = s.date_limite
    ? formatDeadline(s.date_limite, locale)
    : null;

  // — Variante compacte ---------------------------------------------------------

  const isCompact: boolean = variant === "compact";

  return (
    <Link
      href={`/bourses/${s.id}`}
      className={`group flex flex-col bg-white dark:bg-surface border border-border rounded-2xl overflow-hidden shadow-salma-sm hover:shadow-salma-lg transition-all duration-300 hover:-translate-y-1 h-full ${className}`}
    >
      {/* ── Image ────────────────────────────────────────────────────────── */}
      <div
        className={`relative ${isCompact ? "h-36" : "h-44"} bg-surface dark:bg-border overflow-hidden flex-shrink-0`}
      >
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-salma-primary/10 to-salma-accent/10 flex items-center justify-center">
            <span className="text-5xl">{flag}</span>
          </div>
        )}

        {/* Badges en haut à gauche */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {/* Pays */}
          <span className="px-2.5 py-1 text-[10px] font-bold bg-white/90 backdrop-blur-sm rounded-full text-salma-primary shadow-sm">
            {flag} {countryLabel}
          </span>

          {/* Fermé */}
          {isClosed && (
            <SalmaBadge
              variant="danger"
              label={labels.card.closedTag}
              size="sm"
            />
          )}

          {/* Urgent */}
          {isUrgent && (
            <SalmaBadge
              variant="warning"
              label={`⚡ ${labels.card.urgentTag}`}
              size="sm"
              pulse
            />
          )}
        </div>
      </div>

      {/* ── Contenu ──────────────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Niveau */}
        <span className="text-salma-gold text-[10px] font-bold uppercase tracking-widest">
          {levelLabel}
        </span>

        {/* Titre */}
        <h3 className="text-sm font-bold text-salma-primary dark:text-white leading-snug group-hover:text-salma-gold transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Organisme */}
        <p className="text-xs text-text-muted truncate">{org}</p>

        {/* Domaines (variante default uniquement) */}
        {!isCompact && s.domaines && s.domaines.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {s.domaines.slice(0, 3).map((d) => (
              <span
                key={d.id}
                className="px-2 py-0.5 bg-bg dark:bg-border border border-border rounded-full text-[10px] font-medium text-text-muted"
              >
                {localized(d.nom_fr, d.nom_en, locale)}
              </span>
            ))}
          </div>
        )}

        {/* ── Footer carte ─────────────────────────────────────────────── */}
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2">
          {/* Badge couverture */}
          <span
            className={`px-2.5 py-1 text-[10px] font-semibold rounded-full border ${coverageColor}`}
          >
            {coverageLabel}
          </span>

          {/* Deadline */}
          {deadlineStr && (
            <span
              className={`text-[10px] font-medium ${
                isUrgent
                  ? "text-red-500 font-bold"
                  : "text-text-muted"
              }`}
            >
              {isUrgent ? "⚠ " : ""}
              {labels.card.deadlinePrefix} {deadlineStr}
            </span>
          )}

          {/* Pas de deadline */}
          {!deadlineStr && (
            <span className="text-[10px] text-text-muted">
              {labels.card.deadlineNone}
            </span>
          )}
        </div>

        {/* CTA (variante default uniquement) */}
        {!isCompact && (
          <div className="mt-3">
            <SalmaButton variant="outline" size="sm" fullWidth>
              {labels.card.viewDetails}
            </SalmaButton>
          </div>
        )}
      </div>
    </Link>
  );
}