"use client";
import ContactForm from "@/sections/visitor/ContactForm";
import SectionTitle from "@/components/ui/SectionTitle";
import { useLanguage } from "@/hooks/useLanguage";

export default function ContactPage() {
  const { dictionary } = useLanguage();

  return (
    <div className="bg-salma-bg min-h-screen">
      {/* On peut ajouter une bannière ou une carte Google Maps ici plus tard */}
      <div className="pt-20">
        <ContactForm />
      </div>
      
      {/* Section FAQ intégrée pour réduire le nombre de pages */}
      <div className="container mx-auto px-6 pb-20">
        <SectionTitle title={dictionary.faq.title} subtitle={dictionary.faq.subtitle} align="center" />
        <div className="max-w-3xl mx-auto space-y-4">
          {dictionary.faq.items.map((item, i) => (
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