// src/types/ui/button.types.ts
// ==============================================================================
// Types pour le composant SalmaButton — Système de boutons SALMA
// ==============================================================================

import React from "react";

/**
 * Variantes visuelles disponibles pour SalmaButton.
 *
 * - `primary`  : Navy (#1B365D) — CTA principal
 * - `accent`   : Azur (#00AEEF) — CTA secondaire
 * - `gold`     : Or (#C9A84C) — CTA premium / conversion
 * - `outline`  : Bordure dorée, fond transparent
 * - `ghost`    : Sans fond ni bordure, texte seul (navigation, admin)
 * - `danger`   : Rouge — actions destructives (admin : supprimer, annuler)
 */
export type SalmaButtonVariant =
  | "primary"
  | "accent"
  | "gold"
  | "outline"
  | "ghost"
  | "danger";

/**
 * Tailles disponibles pour SalmaButton.
 *
 * - `sm` : Compact (badges, tableaux admin)
 * - `md` : Standard (CTA, formulaires)
 * - `lg` : Grand (Hero, sections d'appel à l'action)
 */
export type SalmaButtonSize = "sm" | "md" | "lg";

/**
 * Props du composant SalmaButton.
 *
 * Étend les attributs HTML natifs de `<button>` pour garantir
 * la compatibilité totale (onClick, type, disabled, aria-*, etc.).
 *
 * @example
 * // Utilisation basique (rétrocompatible)
 * <SalmaButton variant="primary">{t.submit}</SalmaButton>
 *
 * @example
 * // Avec icône et loading
 * <SalmaButton variant="gold" leftIcon={<Send size={16} />} isLoading={isPending}>
 *   {t.send}
 * </SalmaButton>
 *
 * @example
 * // Pleine largeur mobile
 * <SalmaButton variant="accent" size="lg" fullWidth>
 *   {t.applyNow}
 * </SalmaButton>
 */
export interface SalmaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visuelle du bouton. @default "primary" */
  variant?: SalmaButtonVariant;

  /** Taille du bouton. @default "md" */
  size?: SalmaButtonSize;

  /** Contenu du bouton (texte i18n, icônes, etc.) */
  children: React.ReactNode;

  /** Icône affichée à gauche du texte. @default undefined */
  leftIcon?: React.ReactNode;

  /** Icône affichée à droite du texte. @default undefined */
  rightIcon?: React.ReactNode;

  /** Affiche un spinner et désactive le bouton. @default false */
  isLoading?: boolean;

  /** Étend le bouton à 100% de la largeur du parent. @default false */
  fullWidth?: boolean;
}