// src/types/ui/cookie-banner.types.ts
// ==============================================================================
// Types pour le composant CookieBanner — Bannière de consentement cookies SALMA
// ==============================================================================

/**
 * Labels i18n requis par CookieBanner.
 * Proviennent du dictionnaire `layout.cookies` (déjà existant).
 */
export interface CookieBannerLabels {
  /** Texte explicatif principal */
  text: string;

  /** Texte du lien vers la politique de confidentialité */
  link: string;

  /** Texte du bouton "Accepter" */
  accept: string;

  /** Texte du bouton "Refuser" */
  decline: string;
}

/**
 * Props du composant CookieBanner.
 *
 * @remark Les labels proviennent du dictionnaire `layout.cookies`
 * déjà existant — aucune nouvelle clé i18n nécessaire.
 *
 * @example
 * <CookieBanner labels={dictionary.cookies} />
 */
export interface CookieBannerProps {
  /** Labels i18n pour le texte et les boutons. */
  labels: CookieBannerLabels;

  /** URL de la page de politique de confidentialité. @default "/confidentialite" */
  privacyHref?: string;

  /** Classes CSS additionnelles. */
  className?: string;
}