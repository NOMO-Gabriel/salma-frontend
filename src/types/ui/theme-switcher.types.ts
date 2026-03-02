// src/types/ui/theme-switcher.types.ts
// ==============================================================================
// Types pour le composant ThemeSwitcher — Bascule thème clair/sombre SALMA
// ==============================================================================

/**
 * Labels i18n requis par ThemeSwitcher.
 * Proviennent du dictionnaire `common.themeSwitcher`.
 */
export interface ThemeSwitcherLabels {
  /** Aria-label quand le thème est sombre (action: passer en clair) */
  switchToLight: string;

  /** Aria-label quand le thème est clair (action: passer en sombre) */
  switchToDark: string;
}

/**
 * Props du composant ThemeSwitcher.
 *
 * @example
 * <ThemeSwitcher labels={common.themeSwitcher} />
 *
 * @example
 * // Taille compacte dans la navbar mobile
 * <ThemeSwitcher labels={common.themeSwitcher} size="sm" />
 */
export interface ThemeSwitcherProps {
  /** Labels i18n pour l'accessibilité. */
  labels: ThemeSwitcherLabels;

  /**
   * Taille du bouton.
   * - `sm` : Compact (navbar mobile, toolbar admin)
   * - `md` : Standard (navbar desktop)
   * @default "md"
   */
  size?: "sm" | "md";

  /** Classes CSS additionnelles. */
  className?: string;
}