"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";

// Import des sections modulaires
import AboutHero from "@/components/sections/about/AboutHero";
import AboutValues from "@/components/sections/about/AboutValues";
import TrustBar from "@/sections/visitor/TrustBar";
import StatsCounter from "@/sections/visitor/StatsCounter";
import LocationSection from "@/components/sections/LocationSection";

// Types
import type { AboutContent, AboutScope } from "@/types";
import ConversionCTA from "@/components/ui/ConversionCTA";

export default function AboutPage() {
  const { locale, dictionary } = useLanguage();
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent<AboutScope>("about", locale).then((data) => {
      if (data?.aboutPage) {
        setContent(data.aboutPage);
      }
    });
  }, [locale]);

  if (!content) return (
    <div className="py-20 bg-salma-bg min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-salma-gold border-t-transparent rounded-full animate-spin" />
        <p className="animate-pulse text-salma-text-muted font-bold tracking-widest uppercase text-xs">
          {dictionary.common.loading}
        </p>
      </div>
    </div>
  );

 return (
  <main className="bg-white dark:bg-salma-bg">
    <AboutHero content={content.hero} />
    
    <div className="pb-12">
      <TrustBar />
    </div>

    <StatsCounter />

    <AboutValues content={content.values} />

    <LocationSection />
    <ConversionCTA labels={dictionary.nav_contact} />
  </main>
);
}