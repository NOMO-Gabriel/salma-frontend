"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import ContactForm from "@/sections/visitor/ContactForm";
import SectionTitle from "@/components/ui/SectionTitle";
import type { ContactPageContent, FaqItem } from "@/types";

export default function ContactPage() {
  const { locale, dictionary } = useLanguage();
  const [content, setContent] = useState<ContactPageContent | null>(null);

  useEffect(() => {
    // Correction : Ajout du type générique <ContactPageContent>
    cmsSwitcher.getScopeContent<ContactPageContent>("contact", locale).then(data => {
      setContent(data);
    });
  }, [locale]);

  if (!content) return (
    <div className="min-h-screen bg-salma-bg flex items-center justify-center animate-pulse text-salma-text-muted">
      {dictionary.common.loading}
    </div>
  );

  return (
    <div className="bg-salma-bg min-h-screen">
      <div className="pt-20">
        <ContactForm />
      </div>
      
      <div className="container mx-auto px-6 pb-20">
        <SectionTitle 
          title={content.faq.title} 
          subtitle={content.faq.subtitle} 
          align="center" 
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {content.faq.items.map((item: FaqItem, i: number) => (
            <details key={i} className="group bg-white dark:bg-salma-surface border border-salma-border rounded-2xl p-6 cursor-pointer">
              <summary className="font-bold text-salma-primary dark:text-white flex justify-between items-center list-none">
                {item.q}
                <span className="text-salma-gold group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-salma-text-muted text-sm">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}