"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SectionTitle from "@/components/ui/SectionTitle";

// --- Définition des types pour TypeScript ---
interface PrivacySection {
  id: string;
  title: string;
  content: string;
}

interface PrivacyContent {
  title: string;
  subtitle: string;
  lastUpdated: string;
  intro: string;
  sections: PrivacySection[];
}

export default function PrivacyPage() {
  const { locale } = useLanguage();
  // Utilisation du type PrivacyContent au lieu de any
  const [content, setContent] = useState<PrivacyContent | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent("privacy", locale).then((data) => {
      // On cast la réponse vers notre interface
      if (data && data.privacyPage) {
        setContent(data.privacyPage as PrivacyContent);
      }
    });
  }, [locale]);

  if (!content) {
    return (
      <div className="py-20 bg-salma-bg min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-salma-text-muted">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-salma-bg min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white dark:bg-salma-surface p-8 md:p-16 rounded-[2.5rem] border border-salma-border shadow-salma-sm">
          
          <header className="mb-12">
            <SectionTitle title={content.title} subtitle={content.subtitle} />
            <p className="text-xs font-bold text-salma-gold uppercase tracking-widest mb-6">
              {content.lastUpdated}
            </p>
            <p className="text-lg text-salma-primary dark:text-white font-medium leading-relaxed italic border-l-4 border-salma-gold pl-6">
              {content.intro}
            </p>
          </header>

          <div className="space-y-12">
            {content.sections.map((section: PrivacySection) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-salma-gold mb-4 flex items-center gap-3">
                  {section.title}
                </h3>
                <div className="text-salma-text-muted leading-relaxed whitespace-pre-line pl-0 md:pl-7">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <footer className="mt-16 pt-8 border-t border-salma-border text-center">
            <p className="text-sm text-salma-text-muted">
              Pour toute question relative à vos données : 
              <a href="mailto:secretariatagtechnologies@gmail.com" className="text-salma-primary dark:text-salma-gold font-bold ml-1 hover:underline">
                secretariatagtechnologies@gmail.com
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}