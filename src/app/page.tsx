"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function Home() {
  const { dictionary, locale } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center">
      {/* Test de la police Serif (Cormorant) */}
      <h1 className="text-5xl md:text-7xl font-serif font-bold text-salma-primary mb-4">
        {dictionary.hero.title}
      </h1>
      
      {/* Test de la police Sans (Inter) et de la couleur Or */}
      <p className="text-xl md:text-2xl font-sans text-salma-gold font-medium mb-8 uppercase tracking-widest">
        {dictionary.hero.tagline}
      </p>

      {/* Test de la charte graphique et i18n */}
      <div className="max-w-2xl p-8 rounded-2xl border border-salma-border bg-salma-surface shadow-salma-md">
        <h2 className="text-2xl font-serif mb-4">
          {locale === "fr" ? "Test d'Intégration" : "Integration Test"}
        </h2>
        <p className="text-salma-text-muted mb-6">
          {dictionary.hero.description}
        </p>
        
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-salma-primary text-white rounded-lg font-bold hover:opacity-90 transition-all">
            {dictionary.hero.ctaPrimary}
          </button>
          <button className="px-6 py-3 border border-salma-gold text-salma-gold rounded-lg font-bold hover:bg-salma-gold hover:text-white transition-all">
            {dictionary.hero.ctaSecondary}
          </button>
        </div>
      </div>

      <p className="mt-12 text-xs font-mono text-salma-text-muted uppercase tracking-tighter">
        Stack: Next.js 15 + Tailwind v4 + Django REST
      </p>
    </div>
  );
}