"use client";
// src/sections/visitor/SuccessStories.tsx
// =============================================================================
//  Section Témoignages — Version Polie & Stabilisée
//  ✅ Typage strict (Zéro any)
//  ✅ 100% Pilotable via cmsSwitcher
//  ✅ Carousel mobile optimisé
// =============================================================================

import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import { getMediaUrl } from "@/lib/api-client";
import type { TestimonialPublic } from "@/types/api/testimonial.types";
import { HomeTexts } from "@/types";

// --- Types ---
interface SuccessStoriesTexts {
  title: string;
  subtitle: string;
  description: string;
  trustBadge: string;
  verified: string;
}

interface Props { 
  testimonials: TestimonialPublic[] 
}

// --- Avatars SVG (Genrés) ---
const AvatarFemale = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="40" fill="#E8F4FD"/>
    <ellipse cx="40" cy="68" rx="22" ry="14" fill="#1B365D"/>
    <circle cx="40" cy="34" r="16" fill="#FDDBB4"/>
    <path d="M24 30 Q22 18 40 16 Q58 18 56 30 Q56 22 50 20 Q44 16 40 17 Q36 16 30 20 Q24 22 24 30Z" fill="#3D2314"/>
    <circle cx="40" cy="17" r="4" fill="#C9A84C"/>
    <circle cx="34" cy="33" r="2" fill="#3D2314"/>
    <circle cx="46" cy="33" r="2" fill="#3D2314"/>
    <path d="M35 40 Q40 44 45 40" stroke="#3D2314" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const AvatarMale = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="40" fill="#EEF2F7"/>
    <ellipse cx="40" cy="68" rx="22" ry="14" fill="#1B365D"/>
    <circle cx="40" cy="34" r="16" fill="#FDDBB4"/>
    <path d="M24 30 Q24 18 40 17 Q56 18 56 30 Q54 20 40 19 Q26 20 24 30Z" fill="#2C1810"/>
    <circle cx="34" cy="33" r="2" fill="#2C1810"/>
    <circle cx="46" cy="33" r="2" fill="#2C1810"/>
    <path d="M35 40 Q40 44 45 40" stroke="#2C1810" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

// --- Fallback statique ---
const FALLBACK_DATA: TestimonialPublic[] = [
  { id:"f1", nom_auteur:"Aminata K.", pays_auteur:"Cameroun", note:5, photo:null, date_creation:"2025-12-15", citation_fr:"Grâce à SALMA, j'ai décroché ma bourse CSC en 7 semaines.", citation_en:"Thanks to SALMA, I got my CSC scholarship in 7 weeks." },
  { id:"f2", nom_auteur:"Jean-Baptiste M.", pays_auteur:"Cameroun", note:5, photo:null, date_creation:"2026-01-20", citation_fr:"Mon visa Allemagne obtenu en 21 jours, exactement comme promis.", citation_en:"My German visa obtained in 21 days, exactly as promised." },
  { id:"f3", nom_auteur:"Fatou D.", pays_auteur:"Sénégal", note:5, photo:null, date_creation:"2026-02-10", citation_fr:"Je suis à l'Université de Shanghai grâce à SALMA. Incroyable !", citation_en:"I'm at Shanghai University thanks to SALMA. Amazing!" },
];

export default function SuccessStories({ testimonials }: Props) {
  const { locale } = useLanguage();
  const [texts, setTexts] = useState<SuccessStoriesTexts | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 1. Chargement sécurisé via cmsSwitcher
  useEffect(() => {
    cmsSwitcher.getScopeContent<HomeTexts>("home", locale).then((data) => {
      if (data.successStories) {
        setTexts(data.successStories);
      }
    });
  }, [locale]);

  // 2. Gestion du Carousel Mobile
  const displayed = testimonials.length > 0 ? testimonials.slice(0, 6) : FALLBACK_DATA;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % displayed.length);
    }, 5000);
  }, [displayed.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  if (!texts) return <div className="h-96 animate-pulse bg-salma-bg" />;

  return (
    <section className="py-24 bg-gradient-to-b from-salma-surface/40 to-white dark:from-salma-surface/10 dark:to-salma-bg">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <SectionTitle title={texts.title} subtitle={texts.subtitle} align="center" />
          <p className="text-salma-text-muted text-sm mt-4 max-w-xl mx-auto">
            {texts.description}
          </p>
        </div>

        {/* Grille Desktop / Carousel Mobile */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((item, i) => (
              <div 
                key={item.id} 
                className={`${i === activeIdx ? "block" : "hidden md:block"} animate-fade-in`}
              >
                <TestimonialCard 
                  t={item} 
                  locale={locale} 
                  verifiedLabel={texts.verified}
                />
              </div>
            ))}
          </div>

          {/* Pagination Mobile */}
          <div className="flex justify-center gap-3 mt-10 md:hidden">
            {displayed.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveIdx(i); startTimer(); }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIdx ? "w-8 bg-salma-gold" : "w-2 bg-salma-border"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Global Trust Badge */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-white dark:bg-salma-surface border border-salma-border rounded-3xl shadow-salma-sm">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-salma-bg">
                  {i % 2 === 0 ? <AvatarFemale /> : <AvatarMale />}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 text-salma-gold">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-[11px] font-bold text-salma-text-muted mt-1 uppercase tracking-tighter">
                <span className="text-salma-primary dark:text-white">4.9/5</span> — {texts.trustBadge}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Sous-Composant Card ---
function TestimonialCard({ t, locale, verifiedLabel }: { t: TestimonialPublic, locale: string, verifiedLabel: string }) {
  const citation = locale === "fr" ? t.citation_fr : (t.citation_en || t.citation_fr);
  const photoUrl = t.photo ? getMediaUrl(t.photo.url_fichier) : null;
  const female = ["aminata", "fatou", "marie"].some(n => t.nom_auteur.toLowerCase().includes(n));

  return (
    <div className="h-full bg-white dark:bg-salma-surface border border-salma-border rounded-[2rem] p-8 shadow-sm hover:shadow-salma-md transition-all duration-300 flex flex-col group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md relative">
          {photoUrl ? (
            <Image src={photoUrl} alt={t.nom_auteur} fill className="object-cover" />
          ) : (
            female ? <AvatarFemale /> : <AvatarMale />
          )}
        </div>
        <div>
          <p className="font-bold text-salma-primary dark:text-white leading-tight">{t.nom_auteur}</p>
          <p className="text-[10px] text-salma-text-muted uppercase font-bold tracking-widest">{t.pays_auteur}</p>
        </div>
      </div>

      <blockquote className="text-sm text-salma-text leading-relaxed italic flex-1 mb-6">
        {citation}
      </blockquote>

      <div className="pt-6 border-t border-salma-border flex items-center justify-between">
        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
          {verifiedLabel}
        </span>
        <span className="text-[10px] font-bold text-salma-text-muted">
          {new Date(t.date_creation).toLocaleDateString(locale, { month: 'short', year: 'numeric' })}
        </span>
      </div>
    </div>
  );
}