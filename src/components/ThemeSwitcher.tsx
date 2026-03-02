// src/components/ThemeSwitcher.tsx
// ==============================================================================
// Bascule thème clair/sombre — Design System SALMA.
//
// Utilise le hook custom useTheme (wrapper next-themes).
// Animation de rotation lors du toggle pour un feedback visuel élégant.
// Rendu SSR-safe grâce au placeholder avant hydratation.
//
// RÈGLE : Zéro texte en dur — aria-labels viennent de la prop `labels`.
// ==============================================================================

"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import type { ThemeSwitcherProps } from "@/types/ui/theme-switcher.types";

// — Map des tailles -------------------------------------------------------------

const SIZE_STYLES: Record<"sm" | "md", { button: string; icon: string }> = {
  sm: { button: "w-8 h-8", icon: "w-4 h-4" },
  md: { button: "w-9 h-9", icon: "w-5 h-5" },
};

// — Composant principal ---------------------------------------------------------

/**
 * **ThemeSwitcher** — Bouton de bascule thème clair/sombre SALMA.
 *
 * Affiche une icône soleil (en dark mode) ou lune (en light mode) avec
 * une animation de rotation lors du toggle. SSR-safe : affiche un
 * placeholder de même taille avant l'hydratation côté client.
 *
 * @remark Les aria-labels viennent des dictionnaires i18n via `labels`.
 *
 * @example
 * <ThemeSwitcher labels={common.themeSwitcher} />
 *
 * @example
 * <ThemeSwitcher labels={common.themeSwitcher} size="sm" />
 */
export default function ThemeSwitcher({
  labels,
  size = "md",
  className = "",
}: ThemeSwitcherProps) {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const styles = SIZE_STYLES[size];

  // — Placeholder SSR (évite le flash de layout) --------------------------------

  if (!mounted) {
    return (
      <div
        className={`${styles.button} rounded-lg ${className}`}
        aria-hidden="true"
      />
    );
  }

  // — Rendu hydraté -------------------------------------------------------------

  return (
    <button
      onClick={toggleTheme}
      className={`${styles.button} flex items-center justify-center rounded-lg border border-transparent hover:border-border hover:bg-surface dark:hover:bg-salma-primary-light transition-all duration-200 active:scale-90 ${className}`}
      aria-label={isDark ? labels.switchToLight : labels.switchToDark}
    >
      {isDark ? (
        /* Soleil — visible en dark mode, action: passer en clair */
        <svg
          className={`${styles.icon} text-salma-gold transition-transform duration-300`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        /* Lune — visible en light mode, action: passer en sombre */
        <svg
          className={`${styles.icon} text-salma-primary transition-transform duration-300`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}