"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/sections/services/ServiceCard";
import ConversionCTA from "@/components/ui/ConversionCTA";
import type { ServicesScope, ServicesPageContent } from "@/types";

export default function ServicesPage() {
  const { locale, dictionary } = useLanguage();
  const [content, setContent] = useState<ServicesPageContent | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent<ServicesScope>("services", locale).then((data) => {
      if (data?.servicesPage) setContent(data.servicesPage);
    });
  }, [locale]);

  if (!content) return null;

  const servicesList = [
    content.items.study,
    content.items.tourist,
    content.items.work,
    content.items.insurance
  ];

  return (
    <main className="bg-salma-bg min-h-screen">
      <section className="py-24 border-b border-salma-border/30">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title={content.hero.title} 
            subtitle={content.hero.subtitle} 
            description={content.hero.description}
            align="center"
            size="lg"
          />
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesList.map((service, i) => (
              <ServiceCard key={i} item={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ConversionCTA avec les labels du layout */}
      <ConversionCTA labels={dictionary.nav_contact} />
    </main>
  );
}