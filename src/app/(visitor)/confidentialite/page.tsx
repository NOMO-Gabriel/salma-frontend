"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SectionTitle from "@/components/ui/SectionTitle";
import PrivacySidebar from "@/components/sections/privacy/PrivacySidebar";
import PrivacyBody from "@/components/sections/privacy/PrivacyBody";
import ConversionCTA from "@/components/ui/ConversionCTA";
import type { PrivacyContent, PrivacyScope } from "@/types";

export default function PrivacyPage() {
  const { locale, dictionary } = useLanguage();
  const [content, setContent] = useState<PrivacyContent | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent<PrivacyScope>("privacy", locale).then((data) => {
      if (data?.privacyPage) {
        setContent(data.privacyPage);
      }
    });
  }, [locale]);

  if (!content) {
    return (
      <div className="py-20 bg-salma-bg min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-salma-text-muted">{dictionary.common.loading}</div>
      </div>
    );
  }

  return (
    <main className="bg-salma-bg min-h-screen">
      {/* Header de la page */}
      <section className="pt-24 pb-12 bg-white dark:bg-salma-bg border-b border-salma-border/30">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title={content.title} 
            subtitle={content.subtitle} 
            align="center"
            size="lg"
          />
        </div>
      </section>

      {/* Contenu avec Sidebar */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
            
            {/* Sommaire à gauche */}
            <PrivacySidebar sections={content.sections} />

            {/* Corps du texte à droite */}
            <div className="flex-1 bg-white dark:bg-salma-surface p-8 md:p-16 rounded-[3rem] border border-salma-border shadow-salma-sm">
              <PrivacyBody content={content} />
              
              {/* Footer spécifique à la page */}
              <footer className="mt-16 pt-8 border-t border-salma-border text-center">
                <p className="text-sm text-salma-text-muted">
                  {content.footer.text}
                  <a 
                    href={`mailto:${content.footer.email}`} 
                    className="text-salma-primary dark:text-salma-gold font-bold ml-1 hover:underline"
                  >
                    {content.footer.email}
                  </a>
                </p>
              </footer>
            </div>

          </div>
        </div>
      </section>

      {/* CTA de conversion final */}
      <ConversionCTA labels={dictionary.nav_contact} />
    </main>
  );
}