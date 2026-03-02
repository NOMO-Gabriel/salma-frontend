"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SectionTitle from "@/components/ui/SectionTitle";
import LocationSection from "@/components/sections/LocationSection";
import Image from "next/image";

interface ValueItem {
  title: string;
  desc: string;
  icon: string;
}

interface AboutContent {
  hero: { title: string; subtitle: string; description: string };
  values: { title: string; items: ValueItem[] };
}

interface AboutScope {
  aboutPage: AboutContent;
}

export default function AboutPage() {
  const { locale, dictionary } = useLanguage(); // On récupère dictionary pour le loading
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent<AboutScope>("about", locale).then((data) => {
      if (data?.aboutPage) {
        setContent(data.aboutPage);
      }
    });
  }, [locale]);

  // Utilisation du texte i18n pour le chargement
  if (!content) return (
    <div className="py-20 bg-salma-bg min-h-screen flex items-center justify-center animate-pulse text-salma-text-muted">
      {dictionary.common.loading}
    </div>
  );

  return (
    <main className="bg-white dark:bg-salma-bg">
      <section className="py-24 border-b border-salma-border/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-salma-lg border-8 border-salma-surface">
              <Image src="/agt_home.jpg" alt="AG Technologies" fill className="object-cover" />
            </div>
            <div className="space-y-6">
              <SectionTitle title={content.hero.title} subtitle={content.hero.subtitle} />
              <p className="text-xl text-salma-text-muted leading-relaxed font-medium">
                {content.hero.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-salma-primary text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">{content.values.title}</h2>
            <div className="w-24 h-1 bg-salma-gold mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {content.values.items.map((item, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-[2rem] border border-white/10 hover:border-salma-gold transition-colors group">
                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <h3 className="text-2xl font-serif font-bold text-salma-gold mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocationSection />
    </main>
  );
}