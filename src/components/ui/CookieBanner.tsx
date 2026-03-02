// src/components/ui/CookieBanner.tsx
// ==============================================================================
// Bannière de consentement cookies — Design System SALMA.
//
// Affichée en bas de page lors de la première visite. Le consentement
// est stocké dans localStorage. Gère les cas où localStorage est
// indisponible (navigation privée, SSR).
//
// RÈGLE : Zéro texte en dur — labels viennent de la prop `labels`.
// Les clés i18n sont celles de `layout.cookies` (déjà existantes).
// ==============================================================================

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import SalmaButton from "./SalmaButton";
import type { CookieBannerProps } from "@/types/ui/cookie-banner.types";

// — Constantes ------------------------------------------------------------------

/** Clé localStorage pour stocker le consentement */
const STORAGE_KEY = "salma-cookie-consent";

/** Valeurs possibles du consentement */
const CONSENT_ACCEPTED = "accepted";
const CONSENT_DECLINED = "declined";

// — Helpers ---------------------------------------------------------------------

/**
 * Lecture safe de localStorage (retourne null si indisponible).
 * Protège contre les erreurs en navigation privée ou SSR.
 */
function getConsent(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Écriture safe dans localStorage.
 * Échoue silencieusement si indisponible.
 */
function setConsent(value: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Navigation privée ou storage plein — on échoue silencieusement
  }
}

// — Composant principal ---------------------------------------------------------

/**
 * **CookieBanner** — Bannière de consentement cookies SALMA.
 *
 * Apparaît en bas de page si aucun consentement n'a été donné.
 * Propose "Accepter" (SalmaButton primary) et "Refuser" (SalmaButton ghost).
 * Le choix est persisté dans localStorage.
 *
 * @remark Les labels proviennent du dictionnaire `layout.cookies`
 * déjà existant — aucune nouvelle clé i18n à créer.
 *
 * @example
 * // Dans ConditionalLayout (usage actuel)
 * <CookieBanner labels={dictionary.cookies} />
 *
 * @example
 * // Avec lien custom vers la politique de confidentialité
 * <CookieBanner labels={dictionary.cookies} privacyHref="/privacy" />
 */
export default function CookieBanner({
  labels,
  privacyHref = "/confidentialite",
  className = "",
}: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  // — Vérification du consentement au montage -----------------------------------

  useEffect(() => {
    const consent = getConsent();
    if (!consent) setIsVisible(true);
  }, []);

  // — Handlers ------------------------------------------------------------------

  const handleAccept = useCallback(() => {
    setConsent(CONSENT_ACCEPTED);
    setIsVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    setConsent(CONSENT_DECLINED);
    setIsVisible(false);
  }, []);

  // — Rendu conditionnel --------------------------------------------------------

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[420px] bg-white dark:bg-surface border border-border shadow-salma-lg rounded-2xl p-6 z-[60] animate-fade-in ${className}`}
      role="dialog"
      aria-label="Cookie consent"
    >
      {/* Texte explicatif */}
      <p className="text-sm text-text-muted leading-relaxed mb-4">
        {labels.text}{" "}
        <Link
          href={privacyHref}
          className="text-salma-primary dark:text-salma-accent font-bold underline underline-offset-2 hover:text-salma-gold transition-colors"
        >
          {labels.link}
        </Link>
        .
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <SalmaButton
          onClick={handleAccept}
          variant="primary"
          size="sm"
          className="flex-1"
        >
          {labels.accept}
        </SalmaButton>

        <SalmaButton
          onClick={handleDecline}
          variant="ghost"
          size="sm"
        >
          {labels.decline}
        </SalmaButton>
      </div>
    </div>
  );
}