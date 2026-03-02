"use client";

// src/components/ui/SalmaButton.tsx
// ==============================================================================
// Composant bouton principal du Design System SALMA.
// Rétrocompatible avec tous les appels existants — toutes les nouvelles props
// sont optionnelles avec des valeurs par défaut neutres.
// ==============================================================================

import React from "react";
import type {
  SalmaButtonProps,
  SalmaButtonVariant,
  SalmaButtonSize,
} from "@/types";

// — Map des styles par variante ------------------------------------------------

const VARIANT_STYLES: Record<SalmaButtonVariant, string> = {
  primary:
    "bg-salma-primary text-white hover:bg-salma-primary-light hover:shadow-salma-md active:bg-salma-primary-dark",
  accent:
    "bg-salma-accent text-white hover:brightness-110 hover:shadow-salma-md active:brightness-90",
  gold:
    "bg-salma-gold text-salma-primary hover:bg-salma-gold-light hover:shadow-salma-md active:bg-salma-gold-dark",
  outline:
    "border-2 border-salma-gold text-salma-gold hover:bg-salma-gold hover:text-white active:bg-salma-gold-dark",
  ghost:
    "bg-transparent text-salma-primary hover:bg-salma-primary/10 dark:text-text dark:hover:bg-white/10",
  danger:
    "bg-red-600 text-white hover:bg-red-700 hover:shadow-salma-md active:bg-red-800",
};

// — Map des styles par taille --------------------------------------------------

const SIZE_STYLES: Record<SalmaButtonSize, string> = {
  sm: "px-4 py-2 text-xs gap-1.5 rounded-md",
  md: "px-6 py-3 text-sm tracking-widest uppercase gap-2 rounded-lg",
  lg: "px-8 py-4 text-base tracking-widest uppercase gap-2.5 rounded-lg",
};

// — Styles de base communs -----------------------------------------------------

const BASE_STYLES = [
  "inline-flex items-center justify-center",
  "font-sans font-bold",
  "transition-all duration-300 ease-out",
  "active:scale-[0.97]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-salma-accent focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
].join(" ");

// — Spinner de chargement (SVG inline) -----------------------------------------

/** Spinner animé affiché quand `isLoading` est actif. */
function ButtonSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// — Composant principal --------------------------------------------------------

/**
 * **SalmaButton** — Bouton principal du Design System SALMA.
 *
 * Composant polymorphe et accessible, utilisé sur l'ensemble de la plateforme
 * (vitrine visiteur + dashboard admin). Supporte 6 variantes, 3 tailles,
 * les icônes, le loading state et le mode pleine largeur.
 *
 * @remark Tous les textes visibles (children) doivent provenir des
 * dictionnaires i18n — aucun texte en dur.
 *
 * @example
 * // CTA Hero (existant — aucun changement nécessaire)
 * <SalmaButton variant="primary" size="lg">{t.discoverBtn}</SalmaButton>
 *
 * @example
 * // Bouton formulaire avec loading
 * <SalmaButton variant="gold" isLoading={isSending} leftIcon={<Send size={16} />}>
 *   {t.send}
 * </SalmaButton>
 *
 * @example
 * // Pleine largeur sur mobile
 * <SalmaButton variant="accent" fullWidth>{t.applyNow}</SalmaButton>
 */
export default function SalmaButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  leftIcon,
  rightIcon,
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}: SalmaButtonProps) {
  /** Le bouton est désactivé si `disabled` OU `isLoading` */
  const isDisabled = disabled || isLoading;

  const classes = [
    BASE_STYLES,
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {/* Icône gauche OU spinner si loading */}
      {isLoading ? <ButtonSpinner /> : leftIcon}

      {/* Contenu principal (texte i18n) */}
      {children}

      {/* Icône droite (masquée pendant le loading pour éviter le décalage) */}
      {!isLoading && rightIcon}
    </button>
  );
}