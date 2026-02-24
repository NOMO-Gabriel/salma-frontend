import { fr } from "./fr";
import { en } from "./en";
import type { Locale } from "@/config/i18n";

// Utilitaire pour transformer les types "littéraux" (as const) en type "string"
// Cela permet d'avoir des textes différents entre FR et EN tout en gardant la même structure
type DeepString<T> = {
  [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string;
};

// On définit le type global basé sur la structure de FR
export type DictionaryType = DeepString<typeof fr>;

// Registre des dictionnaires
// On utilise "as DictionaryType" pour assouplir la vérification des valeurs textuelles
const dictionaries: Record<Locale, DictionaryType> = {
  fr: fr as DictionaryType,
  en: en as DictionaryType,
};

export function getDictionary(locale: Locale): DictionaryType {
  return dictionaries[locale];
}