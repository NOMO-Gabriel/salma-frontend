// src/dictionaries/index.ts

import { frLayout } from "./data/static/layout/fr";
import { enLayout } from "./data/static/layout/en";
import { frCommon } from "./data/static/common/fr";
import { enCommon } from "./data/static/common/en";
import { adminFr } from "./data/admin/fr";
import { adminEn } from "./data/admin/en";
import type { Locale } from "@/config/i18n";

type DeepString<T> = {
  [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string;
};

// Définition du type global
export type DictionaryType = DeepString<typeof frLayout> & 
  DeepString<typeof frCommon> & {
    admin: DeepString<typeof adminFr>;
  };

const dictionaries: Record<Locale, DictionaryType> = {
  fr: {
    ...frLayout,
    ...frCommon,
    footer: {
      ...frLayout.footer,
      ...frCommon.footer,
    },
    admin: adminFr,
  } as unknown as DictionaryType, // Passage par unknown pour éviter l'erreur 'any'
  en: {
    ...enLayout,
    ...enCommon,
    footer: {
      ...enLayout.footer,
      ...enCommon.footer,
    },
    admin: adminEn,
  } as unknown as DictionaryType,
};

export function getDictionary(locale: Locale): DictionaryType {
  return dictionaries[locale] ?? dictionaries.fr;
}