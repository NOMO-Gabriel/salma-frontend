"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import SalmaButton from "@/components/ui/SalmaButton";
import type { HomeTexts } from "@/types";

export default function Hero() {
  const { locale } = useLanguage();
  const [content, setContent] = useState<HomeTexts | null>(null);

  useEffect(() => {
    cmsSwitcher.getScopeContent<HomeTexts>("home", locale).then((data) => {
      setContent(data);
    });
  }, [locale]);

  if (!content) {
    return <div className="min-h-[85vh] bg-white animate-pulse" />;
  }

  const { hero: t } = content;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white dark:bg-salma-bg">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-salma-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="flex flex-col items-start space-y-6 animate-fade-in">
          <span className="px-4 py-1.5 rounded-full bg-salma-accent/10 text-salma-accent text-xs font-black uppercase tracking-widest border border-salma-accent/20">
            {t.badge}
          </span>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-salma-primary dark:text-white">
            {t.title}
          </h1>
          
          <p className="text-lg md:text-xl text-salma-text-muted max-w-lg leading-relaxed">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <SalmaButton variant="primary" size="lg">
              {t.ctaPrimary}
            </SalmaButton>
            <SalmaButton variant="outline" size="lg">
              {t.ctaSecondary}
            </SalmaButton>
          </div>

          <div className="pt-8 flex items-center gap-4 border-t border-salma-border w-full">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                   <Image src={`https://i.pravatar.cc/100?img=${i+10}`} fill alt="User" className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs text-salma-text-muted font-medium">
              <span className="text-salma-gold font-bold">{t.trustIndicator.count}</span> {t.trustIndicator.text}
            </p>
          </div>
        </div>

        <div className="relative hidden lg:block h-[600px] w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-salma-lg border-8 border-white dark:border-salma-surface transform rotate-2">
            <Image 
              src="/agt_home.jpg" 
              alt={t.imageAlt} 
              fill 
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw" 
            />
          </div>
          
          <div className="absolute -bottom-6 -left-6 bg-salma-gold p-6 rounded-2xl shadow-xl text-salma-primary max-w-[180px] -rotate-3">
            <span className="block text-4xl font-bold">{t.visaBadge.number}</span>
            <span className="text-xs font-black uppercase tracking-tight leading-none">
              {t.visaBadge.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}