// src/dictionaries/index.ts
// ============================================================
//  CONTRAT TYPESCRIPT DES DICTIONNAIRES
//  DictionaryType est la source de vérité de la structure i18n.
//  Si une clé est ajoutée ici, TypeScript forcera son ajout
//  dans TOUS les fichiers de langue (fr.ts, en.ts, ...).
// ============================================================

import { fr } from "@/dictionaries/fr";
import { en } from "@/dictionaries/en";
import type { Locale } from "@/config/i18n";

// ── Le type est inféré depuis `fr` (référence de langue) ──
export type DictionaryType = typeof fr;

// ── Registre des dictionnaires disponibles ──
// Pour ajouter une langue : importer son fichier et l'ajouter ici
const dictionaries: Record<Locale, DictionaryType> = {
  fr,
  en,
};

export function getDictionary(locale: Locale): DictionaryType {
  return dictionaries[locale];
}