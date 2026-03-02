// src/types/ui/section-title.types.ts
// ==============================================================================
// Types pour le composant SectionTitle — Titres de sections SALMA
// ==============================================================================

/**
 * Tag HTML du heading rendu par SectionTitle.
 * Permet un contrôle SEO précis de la hiérarchie des titres.
 *
 * - `h1` : Hero principal (1 seul par page)
 * - `h2` : Sections principales (défaut)
 * - `h3` : Sous-sections
 * - `h4` : Blocs internes
 */
export type SectionTitleTag = "h1" | "h2" | "h3" | "h4";

/**
 * Taille visuelle du SectionTitle.
 *
 * - `sm` : Sous-sections, blocs admin (text-xl / text-2xl)
 * - `md` : Sections standard (text-2xl / text-3xl)
 * - `lg` : Sections Hero, pages principales (text-3xl / text-4xl)
 */
export type SectionTitleSize = "sm" | "md" | "lg";

/**
 * Alignement horizontal du SectionTitle.
 *
 * - `left`   : Aligné à gauche (défaut — contenus éditoriaux)
 * - `center` : Centré (sections vitrine, landing)
 */
export type SectionTitleAlign = "left" | "center";

/**
 * Props du composant SectionTitle.
 *
 * @example
 * // Utilisation basique (rétrocompatible — identique à l'existant)
 * <SectionTitle title={t.title} subtitle={t.subtitle} />
 *
 * @example
 * // Section Hero avec h1 et grande taille
 * <SectionTitle title={t.heroTitle} subtitle={t.heroSubtitle} as="h1" size="lg" align="center" />
 *
 * @example
 * // Sous-section admin sans divider
 * <SectionTitle title={t.sectionTitle} as="h3" size="sm" divider={false} />
 *
 * @example
 * // Avec description longue
 * <SectionTitle title={t.title} subtitle={t.subtitle} description={t.desc} align="center" />
 */
export interface SectionTitleProps {
  /** Titre principal (i18n). */
  title: string;

  /** Sur-titre doré affiché au-dessus du titre (i18n). @default undefined */
  subtitle?: string;

  /** Paragraphe descriptif affiché sous le titre (i18n). @default undefined */
  description?: string;

  /** Alignement horizontal. @default "left" */
  align?: SectionTitleAlign;

  /** Tag HTML du heading pour le SEO. @default "h2" */
  as?: SectionTitleTag;

  /** Taille visuelle du titre. @default "md" */
  size?: SectionTitleSize;

  /** Affiche le trait doré sous le titre. @default true */
  divider?: boolean;

  /** Classes CSS additionnelles sur le conteneur. */
  className?: string;
}