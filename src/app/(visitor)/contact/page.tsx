"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/sections/visitor/ContactForm";
import FaqAccordion from "@/components/sections/contact/FaqAccordion";
import LocationSection from "@/components/sections/LocationSection";
import SectionTitle from "@/components/ui/SectionTitle";
import type { ContactPageContent, ContactScope } from "@/types";

export default function ContactPage() {
  const { locale } = useLanguage();
  const [content, setContent] = useState<ContactPageContent | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent<ContactScope>("contact", locale).then((data) => {
      if (data?.contactPage) setContent(data.contactPage);
    });
  }, [locale]);

  if (!content) return <div className="min-h-screen bg-salma-bg animate-pulse" />;

  return (
    <main className="bg-salma-bg min-h-screen">
      {/* 1. Hero */}
      <ContactHero content={content.hero} />
      
      {/* 2. Formulaire avec labels injectés */}
      <ContactForm labels={content.form_section} />

      {/* 3. FAQ */}
      <section className="py-24 bg-white dark:bg-salma-bg">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title={content.faq.title} 
            subtitle={content.faq.subtitle} 
            align="center" 
          />
          <FaqAccordion items={content.faq.items} />
        </div>
      </section>

      {/* 4. Localisation */}
      <LocationSection />
    </main>
  );
}