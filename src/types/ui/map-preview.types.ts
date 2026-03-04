// src/types/ui/map-preview.types.ts
// ==============================================================================
// Types pour le composant MapPreview — Aperçu carte/localisation SALMA
// ==============================================================================

/**
 * Labels i18n requis par MapPreview.
 * Proviennent du dictionnaire `common.mapPreview`.
 */
export interface MapPreviewLabels {
  /** Texte du CTA overlay au hover (ex: "Ouvrir dans Google Maps") */
  ctaLabel: string;

  /** Sur-titre du badge permanent en bas (ex: "Notre Siège") */
  badgeTitle: string;

  /** Sous-titre du badge permanent (ex: "Yaoundé, Immeuble Kadji") */
  badgeSubtitle: string;

  /** Alt text de l'image (ex: "Siège AG Technologies — Yaoundé") */
  imageAlt: string;
}

/**
 * Props du composant MapPreview.
 *
 * @example
 * <MapPreview
 *   address={layout.address}
 *   labels={common.mapPreview}
 * />
 */
export interface MapPreviewProps {
  /** Adresse postale — utilisée pour construire le lien Google Maps. */
  address: string;

  /** Labels i18n. */
  labels: MapPreviewLabels;

  /** URL de l'image à afficher. @default "/images/agt_home.jpg" */
  imageSrc?: string;

  /** Hauteur du composant sur mobile. @default "h-[350px]" */
  mobileHeight?: string;

  /** Hauteur du composant sur desktop. @default "md:h-[450px]" */
  desktopHeight?: string;

  /** Classes CSS additionnelles. */
  className?: string;
}