// src/config/i18n.ts
// ============================================================
//  SOURCE DE VÉRITÉ POUR L'INTERNATIONALISATION
//  Pour ajouter une nouvelle langue :
//    1. Ajouter son code dans le tableau `locales` ci-dessous
//    2. Créer le fichier src/dictionaries/{code}.ts
//    3. L'importer dans src/dictionaries/index.ts
//  C'est tout — aucun autre fichier à modifier.
// ============================================================

export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

/** Langue affichée par défaut si la détection système échoue */
export const defaultLocale: Locale = "en";

/** Noms affichables dans le sélecteur de langue */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/**
 * Détecte la langue préférée du navigateur.
 * Retourne une Locale supportée, ou defaultLocale en fallback.
 * Doit être appelée côté client uniquement.
 */
export function detectLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  // Cherche dans localStorage (préférence sauvegardée)
  try {
    const saved = localStorage.getItem("salma-locale") as Locale | null;
    if (saved && locales.includes(saved)) return saved;
  } catch {
    // localStorage indisponible
  }

  // Détecte la langue du navigateur
  const browserLang = navigator.language?.split("-")[0] as Locale;
  if (locales.includes(browserLang)) return browserLang;

  return defaultLocale;
}