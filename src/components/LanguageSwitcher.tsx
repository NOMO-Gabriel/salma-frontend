"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-salma-surface border border-salma-border hover:border-salma-gold transition-all group"
    >
      <span className="text-xs font-bold font-sans tracking-widest text-salma-text">
        {locale === "fr" ? "EN" : "FR"}
      </span>
      <svg className="w-4 h-4 text-salma-gold group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  );
}