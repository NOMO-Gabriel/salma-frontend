// src/dictionaries/index.ts
// ============================================================
//  COEUR DE L'INTERNATIONALISATION (V2 - CMS Switcher Ready)
//  Désormais basé sur les fichiers de layout statiques.
// ============================================================

import { frLayout } from "./data/static/layout/fr";
import { enLayout } from "./data/static/layout/en";
import type { Locale } from "@/config/i18n";

// Utilitaire pour transformer les types "littéraux" en type "string"
type DeepString<T> = {
  [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string;
};

// Le type global est désormais restreint au Layout (Navbar, Footer, etc.)
// Les contenus de pages spécifiques doivent passer par cmsSwitcher.getScopeContent()
export type DictionaryType = DeepString<typeof frLayout>;

const dictionaries: Record<Locale, DictionaryType> = {
  fr: frLayout as DictionaryType,
  en: enLayout as DictionaryType,
};

/**
 * Retourne le dictionnaire de base (Layout/Global) pour une langue donnée.
 */
export function getDictionary(locale: Locale): DictionaryType {
  return dictionaries[locale] ?? dictionaries.fr;
}