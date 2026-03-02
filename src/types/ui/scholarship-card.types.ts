// src/types/ui/scholarship-card.types.ts
// ==============================================================================
// Types pour le composant ScholarshipCard — Carte de bourse SALMA
// ==============================================================================

import type { ScholarshipPublicListItem } from "@/types/api/scholarship.types";

/**
 * Labels i18n requis par ScholarshipCard.
 *
 * Proviennent du dictionnaire `common.scholarshipCard` + `common.countries`
 * + `common.levels` + `common.coverages` + `common.statusLabels`.
 * Le parent les assemble et les passe en une seule prop.
 */
export interface ScholarshipCardLabels {
  /** Labels des pays — clé = valeur de `pays_destination` */
  countries: Record<string, string>;

  /** Labels des niveaux — clé = valeur de `niveau` */
  levels: Record<string, string>;

  /** Labels des couvertures — clé = valeur de `type_couverture` */
  coverages: Record<string, string>;

  /** Labels de statut — clé = valeur de `statut` */
  statusLabels: Record<string, string>;

  /** Labels spécifiques à la carte */
  card: {
    deadline: string;
    deadlineNone: string;
    language: string;
    viewDetails: string;
    closedTag: string;
    urgentTag: string;
    deadlinePrefix: string;
  };
}

/**
 * Variante d'affichage de la ScholarshipCard.
 *
 * - `default`  : Carte complète avec image, badges, domaines, footer
 * - `compact`  : Carte condensée pour les grilles denses (catalogue filtré)
 */
export type ScholarshipCardVariant = "default" | "compact";

/**
 * Props du composant ScholarshipCard.
 *
 * @remark Le composant ne fetch JAMAIS de données lui-même.
 * Tout est passé par le parent : données bourse + labels i18n + locale.
 *
 * @example
 * <ScholarshipCard
 *   scholarship={s}
 *   locale={locale}
 *   labels={cardLabels}
 * />
 */
export interface ScholarshipCardProps {
  /** Données de la bourse (provient de l'API ou du dictionnaire statique). */
  scholarship: ScholarshipPublicListItem;

  /** Locale courante pour résoudre les champs bilingues (titre_fr / titre_en). */
  locale: "fr" | "en";

  /** Labels i18n assemblés par le parent. */
  labels: ScholarshipCardLabels;

  /** Variante d'affichage. @default "default" */
  variant?: ScholarshipCardVariant;

  /** Classes CSS additionnelles sur le conteneur. */
  className?: string;
}