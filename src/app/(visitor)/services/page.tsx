"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SectionTitle from "@/components/ui/SectionTitle";
import type { ServicesTexts } from "@/types";

export default function ServicesPage() {
  const { locale } = useLanguage();
  const [content, setContent] = useState<ServicesTexts | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent<ServicesTexts>("services", locale).then(data => {
      setContent(data);
    });
  }, [locale]);

  if (!content) return <div className="py-20 bg-salma-bg min-h-screen animate-pulse" />;

  const s = content.servicesPage;
  const cards = [
    { title: s.items.study.title, desc: s.items.study.desc, icon: "🎓" },
    { title: s.items.tourist.title, desc: s.items.tourist.desc, icon: "✈️" },
    { title: s.items.work.title, desc: s.items.work.desc, icon: "💼" },
    { title: s.items.insurance.title, desc: s.items.insurance.desc, icon: "🛡️" },
  ];

  return (
    <div className="py-20 bg-salma-bg min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle title={s.title} subtitle={s.subtitle} align="center" />
        <p className="max-w-2xl mx-auto text-center text-salma-text-muted mb-16">{s.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="p-8 bg-white dark:bg-salma-surface border border-salma-border rounded-3xl shadow-salma-sm hover:shadow-salma-md transition-all">
              <span className="text-4xl mb-6 block">{card.icon}</span>
              <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-salma-gold mb-4">{card.title}</h3>
              <p className="text-sm text-salma-text-muted leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}