// src/components/ui/SectionTitle.tsx
// ==============================================================================
// Composant titre de section du Design System SALMA.
//
// Utilisé sur toutes les sections de la vitrine et du dashboard admin.
// Gère le sur-titre doré, le heading SEO-friendly, le divider et la
// description optionnelle. Rétrocompatible avec tous les appels existants.
// ==============================================================================

import React from "react";
import type {
  SectionTitleProps,
  SectionTitleSize,
  SectionTitleTag,
} from "@/types/ui/section-title.types";

// — Map des tailles du heading --------------------------------------------------

const HEADING_SIZES: Record<SectionTitleSize, string> = {
  sm: "text-xl md:text-2xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl lg:text-5xl",
};

// — Map des tailles du sur-titre ------------------------------------------------

const SUBTITLE_SIZES: Record<SectionTitleSize, string> = {
  sm: "text-[10px] tracking-[0.2em] mb-1.5",
  md: "text-xs tracking-[0.3em] mb-2",
  lg: "text-sm tracking-[0.3em] mb-3",
};

// — Map des largeurs du divider -------------------------------------------------

const DIVIDER_SIZES: Record<SectionTitleSize, string> = {
  sm: "w-8",
  md: "w-12",
  lg: "w-14",
};

// — Map des marges basses du conteneur ------------------------------------------

const CONTAINER_MARGIN: Record<SectionTitleSize, string> = {
  sm: "mb-6",
  md: "mb-12",
  lg: "mb-16",
};

// — Composant principal ---------------------------------------------------------

/**
 * **SectionTitle** — Titre de section du Design System SALMA.
 *
 * Structure visuelle :
 * ```
 *   [SUBTITLE]        ← Sur-titre doré (optionnel)
 *   Titre Principal   ← Heading (h1-h4, configurable)
 *   ────────           ← Divider doré (optionnel)
 *   Description...    ← Paragraphe descriptif (optionnel)
 * ```
 *
 * @remark Tous les textes visibles (title, subtitle, description) doivent
 * provenir des dictionnaires i18n — aucun texte en dur.
 *
 * @example
 * // Rétrocompatible — aucun changement nécessaire dans le code existant
 * <SectionTitle title={t.title} subtitle={t.subtitle} />
 *
 * @example
 * // Hero centré avec grande taille et h1
 * <SectionTitle
 *   title={t.heroTitle}
 *   subtitle={t.heroSubtitle}
 *   description={t.heroDesc}
 *   as="h1"
 *   size="lg"
 *   align="center"
 * />
 *
 * @example
 * // Sous-section admin compacte sans divider
 * <SectionTitle title={t.sectionTitle} as="h3" size="sm" divider={false} />
 */
export default function SectionTitle({
  title,
  subtitle,
  description,
  align = "left",
  as = "h2",
  size = "md",
  divider = true,
  className = "",
}: SectionTitleProps) {
  /** Tag HTML dynamique pour le heading */
  const Heading = as as SectionTitleTag;

  /** Classes d'alignement du conteneur */
  const alignClasses =
    align === "center" ? "items-center text-center" : "items-start";

  return (
    <div
      className={`flex flex-col ${alignClasses} ${CONTAINER_MARGIN[size]} ${className}`}
    >
      {/* Sur-titre doré */}
      {subtitle && (
        <span
          className={`text-salma-gold font-sans font-bold uppercase ${SUBTITLE_SIZES[size]}`}
        >
          {subtitle}
        </span>
      )}

      {/* Heading principal (tag SEO dynamique) */}
      <Heading
        className={`font-serif text-heading dark:text-white leading-tight ${HEADING_SIZES[size]}`}
      >
        {title}
      </Heading>

      {/* Divider doré */}
      {divider && (
        <div
          className={`${DIVIDER_SIZES[size]} h-[3px] bg-salma-gold rounded-full mt-4`}
          aria-hidden="true"
        />
      )}

      {/* Description optionnelle */}
      {description && (
        <p
          className={`mt-4 text-text-muted dark:text-text-muted font-sans text-sm md:text-base leading-relaxed ${
            align === "center" ? "max-w-2xl" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}