"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import { getMediaUrl } from "@/lib/api-client";
import { getMarketingTitle } from "@/lib/scholarship-utils";
import SalmaButton from "@/components/ui/SalmaButton";
import ConversionCTA from "@/components/ui/ConversionCTA";
import { eventsRepository } from "@/repositories/events.repository";
import type { ScholarshipPublicDetail, FieldVisibilityMap, BoursesTexts } from "@/types";

export default function ScholarshipDetailClient({ 
  scholarship: s, 
  visibilityMap 
}: { 
  scholarship: ScholarshipPublicDetail, 
  visibilityMap: FieldVisibilityMap 
}) {
  const { locale, dictionary: layoutDict } = useLanguage();
  const [content, setContent] = useState<BoursesTexts | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent<BoursesTexts>("bourses", locale).then(data => setContent(data));
    eventsRepository.trackScholarshipView(s.id);
  }, [locale, s.id]);

  if (!content) return <div className="min-h-screen bg-salma-bg animate-pulse" />;

  const t = content.scholarshipDetail;
  const marketingTitle = getMarketingTitle(s, locale);
  const desc = locale === "fr" ? s.description_fr : s.description_en;
  
  const mainImage = s.images.find(img => img.est_principale)?.media.url_fichier;
  const finalImgUrl = s.id.startsWith("static-") ? mainImage : getMediaUrl(mainImage);

  const waMessage = encodeURIComponent(`Bonjour SALMA, je suis intéressé par la ${marketingTitle}. Pouvez-vous m'aider ?`);
  const waLink = `https://wa.me/237699450984?text=${waMessage}`;

  const isVisible = (field: string) => visibilityMap[field] !== false;

  return (
    <main className="bg-salma-bg min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[50vh] min-h-[450px] w-full overflow-hidden bg-salma-primary">
        {finalImgUrl && (
          <Image 
            src={finalImgUrl}
            alt={marketingTitle} 
            fill 
            className="object-cover opacity-50" 
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-salma-bg via-salma-bg/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <Link href="/bourses" className="inline-flex items-center gap-2 !text-salma-gold font-bold text-xs uppercase tracking-widest mb-8 hover:-translate-x-1 transition-transform">
                ← {t.backToList}
              </Link>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-8">
                {marketingTitle}
              </h1>
              <div className="flex flex-wrap gap-4">
                <div className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span>{s.pays_destination === 'chine' ? '🇨🇳' : '🇩🇪'}</span>
                  {s.pays_destination}
                </div>
                <div className="px-5 py-2 bg-salma-gold text-salma-primary rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg">
                  {s.niveau}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRILLE DE DÉTAILS ── */}
      <div className="container mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-salma-surface p-8 rounded-[2.5rem] border-2 border-salma-gold/30 shadow-salma-lg flex items-center gap-6">
              <div className="w-16 h-16 bg-salma-gold/10 rounded-2xl flex items-center justify-center text-3xl">🔒</div>
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] !text-salma-gold mb-1">{t.organization}</h2>
                <p className="text-lg font-serif font-bold text-salma-primary dark:text-white italic">
                  {content.catalog.reservedInfo}
                </p>
              </div>
            </div>

            <section className="bg-white dark:bg-salma-surface p-10 rounded-[2.5rem] border border-salma-border shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-salma-primary dark:text-white mb-6 border-b border-salma-border pb-4">
                {t.presentationTitle}
              </h3>
              <div className="text-salma-text-muted leading-relaxed text-lg whitespace-pre-line">{desc}</div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-salma-surface p-8 rounded-[2.5rem] border border-salma-border shadow-sm">
                <h3 className="font-serif font-bold text-xl text-salma-primary dark:text-white mb-6">{t.studyFields}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.domaines.map(d => (
                    <span key={d.id} className="px-4 py-2 bg-salma-bg border border-salma-border rounded-xl text-xs font-bold text-salma-text-muted uppercase tracking-wider">
                      {locale === 'fr' ? d.nom_fr : d.nom_en}
                    </span>
                  ))}
                </div>
              </div>

              {isVisible('avantages') && s.avantages.length > 0 && (
                <div className="bg-white dark:bg-salma-surface p-8 rounded-[2.5rem] border border-salma-border shadow-sm">
                  <h3 className="font-serif font-bold text-xl text-salma-primary dark:text-white mb-6">{t.benefits}</h3>
                  <ul className="space-y-4">
                    {s.avantages.map(a => (
                      <li key={a.id} className="flex items-start gap-3 text-sm text-salma-text-muted font-medium">
                        <span className="!text-salma-gold text-lg">✓</span>
                        {locale === 'fr' ? a.libelle_fr : a.libelle_en}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-salma-primary text-white p-10 rounded-[3rem] shadow-2xl sticky top-28 border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-salma-gold/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h3 className="text-2xl font-serif font-bold mb-8 !text-salma-gold relative z-10">{t.eligibility}</h3>
              <div className="space-y-6 mb-12 relative z-10">
                {s.criteres.length > 0 ? s.criteres.map(c => (
                  <div key={c.id} className="flex items-center gap-4 group">
                    <span className="w-2 h-2 rounded-full bg-salma-gold group-hover:scale-150 transition-transform" />
                    <p className="text-sm font-medium text-white/90">{locale === 'fr' ? c.libelle_fr : c.libelle_en}</p>
                  </div>
                )) : (
                  <p className="text-xs text-white/50 italic">{t.noCriteriaMsg}</p>
                )}
              </div>
              <div className="space-y-4 relative z-10">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <SalmaButton variant="gold" fullWidth className="py-4 shadow-xl shadow-salma-gold/20">{t.btnApply}</SalmaButton>
                </a>
                <Link href="/contact" className="block w-full">
                  <SalmaButton variant="outline" fullWidth className="py-4 border-white text-white hover:bg-white hover:!text-salma-primary">{t.btnForm}</SalmaButton>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── SECTION CONVERSION AVEC ESPACE RÉEL (mt-32) ── */}
      <div className="mt-32">
        <ConversionCTA labels={layoutDict.nav_contact} />
      </div>
    </main>
  );
}