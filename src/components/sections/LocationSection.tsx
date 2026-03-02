"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SectionTitle from "@/components/ui/SectionTitle";
import MapPreview from "@/components/ui/MapPreview";
import SalmaButton from "@/components/ui/SalmaButton";
import type { NavContent } from "@/types";

// --- Interfaces locales ---
interface LocationContent {
  title: string;
  subtitle: string;
  description: string;
  address_label: string;
  hours_label: string;
  hours_value: string;
  cta_maps: string;
  cta_call: string;
  cta_whatsapp: string;
}

interface AboutScope {
  aboutPage: {
    location: LocationContent;
  };
}

export default function LocationSection() {
  const { locale } = useLanguage();
  const [content, setContent] = useState<LocationContent | null>(null);
  const [layout, setLayout] = useState<NavContent | null>(null);

  useEffect(() => {
    Promise.all([
      cmsSwitcher.getScopeContent<AboutScope>("about", locale),
      cmsSwitcher.getScopeContent<NavContent>("layout", locale)
    ]).then(([aboutData, layoutData]) => {
      if (aboutData?.aboutPage?.location && layoutData?.footer?.contact) {
        setContent(aboutData.aboutPage.location);
        setLayout(layoutData);
      }
    });
  }, [locale]);

  if (!content || !layout) return null;

  const contact = layout.footer.contact;
  const firstPhone = contact.phones.split('/')[0].trim();

  return (
    <section className="py-24 bg-salma-surface/30 dark:bg-salma-surface/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <SectionTitle title={content.title} subtitle={content.subtitle} />
            <p className="text-lg text-salma-text-muted leading-relaxed">
              {content.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-salma-gold">
                  {content.address_label}
                </span>
                <p className="text-salma-primary dark:text-white font-serif font-bold text-lg">
                  {contact.address}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-salma-gold">
                  {content.hours_label}
                </span>
                <p className="text-salma-primary dark:text-white font-serif font-bold text-lg">
                  {content.hours_value}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <a href={`tel:${firstPhone}`}>
                <SalmaButton variant="primary" className="gap-2">
                  <span>📞</span> {content.cta_call}
                </SalmaButton>
              </a>
              <a href="https://wa.me/237699450984" target="_blank" rel="noopener noreferrer">
                <SalmaButton variant="outline" className="gap-2">
                  <span>💬</span> {content.cta_whatsapp}
                </SalmaButton>
              </a>
            </div>
          </div>

          {/* Utilisation des labels typés depuis le layout */}
          <MapPreview address={contact.address} labels={layout.widgets.mapPreview} />
        </div>
      </div>
    </section>
  );
}