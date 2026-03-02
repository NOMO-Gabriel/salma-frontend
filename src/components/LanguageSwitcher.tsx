// src/components/LanguageSwitcher.tsx
// ==============================================================================
// Bascule de langue FR/EN — Design System SALMA.
//
// Affiche le code de la langue cible (celle vers laquelle on va basculer).
// Utilise le hook useLanguage pour la gestion de la locale.
//
// RÈGLE : Zéro texte en dur — aria-labels viennent de la prop `labels`.
// Les codes "FR"/"EN" affichés sont des codes ISO, pas du texte à traduire.
// ==============================================================================

"use client";

import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { LanguageSwitcherProps } from "@/types/ui/language-switcher.types";

// — Map des tailles -------------------------------------------------------------

const SIZE_STYLES: Record<"sm" | "md", { button: string; text: string; icon: string }> = {
  sm: { button: "px-2 py-1.5 gap-1.5", text: "text-[10px]", icon: "w-3.5 h-3.5" },
  md: { button: "px-3 py-2 gap-2",     text: "text-xs",     icon: "w-4 h-4" },
};

// — Composant principal ---------------------------------------------------------

/**
 * **LanguageSwitcher** — Bascule de langue FR ↔ EN SALMA.
 *
 * Affiche le code de la langue cible avec une icône de rotation.
 * L'icône tourne au hover pour signaler visuellement l'action.
 *
 * @remark Les codes "FR" et "EN" sont des codes ISO standard et non
 * du texte à traduire — ils sont identiques dans les deux langues.
 *
 * @example
 * // Dans la navbar desktop
 * <LanguageSwitcher labels={common.languageSwitcher} />
 *
 * @example
 * // Dans le menu mobile
 * <LanguageSwitcher labels={common.languageSwitcher} size="sm" />
 */
export default function LanguageSwitcher({
  labels,
  size = "md",
  className = "",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  const isFr = locale === "fr";
  const targetLocale = isFr ? "en" : "fr";
  const targetCode = isFr ? "EN" : "FR";
  const ariaLabel = isFr ? labels.switchToEn : labels.switchToFr;
  const styles = SIZE_STYLES[size];

  return (
    <button
      onClick={() => setLocale(targetLocale)}
      className={`flex items-center ${styles.button} rounded-lg bg-surface border border-border hover:border-salma-gold transition-all duration-200 group active:scale-95 ${className}`}
      aria-label={ariaLabel}
    >
      {/* Code langue cible */}
      <span
        className={`${styles.text} font-bold font-sans tracking-widest text-text`}
      >
        {targetCode}
      </span>

      {/* Icône rotation */}
      <svg
        className={`${styles.icon} text-salma-gold group-hover:rotate-180 transition-transform duration-300`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  );
}