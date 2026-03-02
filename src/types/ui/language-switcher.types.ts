// src/types/ui/language-switcher.types.ts
// ==============================================================================
// Types pour le composant LanguageSwitcher — Bascule de langue SALMA
// ==============================================================================

/**
 * Labels i18n requis par LanguageSwitcher.
 * Proviennent du dictionnaire `common.languageSwitcher`.
 */
export interface LanguageSwitcherLabels {
  /** Aria-label quand la langue est FR (action: passer en EN) */
  switchToEn: string;

  /** Aria-label quand la langue est EN (action: passer en FR) */
  switchToFr: string;
}

/**
 * Props du composant LanguageSwitcher.
 *
 * @example
 * <LanguageSwitcher labels={common.languageSwitcher} />
 */
export interface LanguageSwitcherProps {
  /** Labels i18n pour l'accessibilité. */
  labels: LanguageSwitcherLabels;

  /**
   * Taille du bouton.
   * - `sm` : Compact (navbar mobile)
   * - `md` : Standard (navbar desktop)
   * @default "md"
   */
  size?: "sm" | "md";

  /** Classes CSS additionnelles. */
  className?: string;
}