// src/contexts/LanguageContext.tsx
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { type Locale, detectLocale } from "@/config/i18n";
import { getDictionary, type DictionaryType } from "@/dictionaries";

interface LanguageContextType {
  locale: Locale;
  dictionary: DictionaryType;
  setLocale: (locale: Locale) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // On initialise avec des valeurs par défaut pour le SSR (Serveur)
  const [locale, setLocaleState] = useState<Locale>("fr"); 
  const [dictionary, setDictionary] = useState<DictionaryType>(getDictionary("fr"));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const detected = detectLocale();
    setLocaleState(detected);
    setDictionary(getDictionary(detected));
    setMounted(true); 
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setDictionary(getDictionary(newLocale));
    try {
      localStorage.setItem("salma-locale", newLocale);
    } catch {}
  };

  // IMPORTANT : Le Provider doit TOUJOURS être présent dans l'arbre
  // On utilise la visibilité CSS pour éviter le flash de texte anglais/français
  return (
    <LanguageContext.Provider value={{ locale, dictionary, setLocale }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}