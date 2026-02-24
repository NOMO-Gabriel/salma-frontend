// src/contexts/LanguageContext.tsx
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { type Locale, detectLocale } from "@/config/i18n";
import { getDictionary, type DictionaryType } from "@/dictionaries";

// ============================================================
//  TYPES
// ============================================================
interface LanguageContextType {
  locale: Locale;
  dictionary: DictionaryType;
  setLocale: (locale: Locale) => void;
}

// ============================================================
//  CONTEXTE
// ============================================================
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// ============================================================
//  PROVIDER
// ============================================================
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [dictionary, setDictionary] = useState<DictionaryType>(
    getDictionary("en")
  );

  // Détection de la langue au montage (côté client uniquement)
  useEffect(() => {
    const detected = detectLocale();
    setLocaleState(detected);
    setDictionary(getDictionary(detected));
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setDictionary(getDictionary(newLocale));
    try {
      localStorage.setItem("salma-locale", newLocale);
    } catch {
      // localStorage indisponible
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, dictionary, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}