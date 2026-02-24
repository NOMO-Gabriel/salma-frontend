// src/hooks/useLanguage.ts
"use client";

import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";

// ============================================================
//  HOOK useLanguage
//  Usage dans n'importe quel composant :
//
//  const { locale, dictionary, setLocale } = useLanguage();
//  <h1>{dictionary.hero.title}</h1>
//  <button onClick={() => setLocale("fr")}>FR</button>
// ============================================================
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé dans un <LanguageProvider>");
  }
  return context;
}