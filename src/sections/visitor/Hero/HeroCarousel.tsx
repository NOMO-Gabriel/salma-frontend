"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import HeroSlide from "./HeroSlide";
import HeroControls from "./HeroControls";
import HeroDecorations from "./HeroDecroration";
import type { HeroSlideData, NavContent, HeroSlideCMS } from "@/types";

/**
 * Palettes de design pour les fonds de slides.
 * Ces données sont purement visuelles et ne sont pas gérées par le CMS.
 */
const SLIDE_DESIGN_CONFIG = [
  { gradient: "from-white via-white to-white", accent: "from-transparent to-transparent", deco: "circle-top-right" },
  { gradient: "from-[#EDF3FC] via-[#E5EEF9] to-[#DCE9F7]", accent: "from-[#1B365D]/4 to-transparent", deco: "circle-bottom-left" },
  { gradient: "from-[#CCDDF0] via-[#C2D5EC] to-[#B8CCE8]", accent: "from-[#1B365D]/6 to-transparent", deco: "circle-center" },
];

export default function HeroCarousel() {
  const { locale } = useLanguage();
  const [slides, setSlides] = useState<HeroSlideData[]>([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Chargement des données via le Switcher typé
  useEffect(() => {
    cmsSwitcher.getScopeContent<NavContent>("layout", locale).then((data) => {
      // On récupère les slides bruts du CMS
      const rawSlides = data.hero_carousel?.slides ?? [];
      
      // On les enrichit avec la config de design (gradient, deco, etc.)
      const enrichedSlides: HeroSlideData[] = rawSlides.map((s: HeroSlideCMS, i: number) => ({
        ...s,
        ...SLIDE_DESIGN_CONFIG[i % SLIDE_DESIGN_CONFIG.length],
      })) as HeroSlideData[];
      
      setSlides(enrichedSlides);
    });
  }, [locale]);

  const goTo = useCallback((index: number) => {
    if (animating || !slides.length) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 500);
  }, [animating, slides.length]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, slides.length, goTo]);

  // Autoplay (10 secondes par slide)
  useEffect(() => {
    if (paused || !slides.length) return;
    intervalRef.current = setInterval(next, 10000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next, slides.length]);

  if (!slides.length) {
    return <div className="min-h-screen bg-white flex items-center justify-center animate-pulse" />;
  }

  const activeSlide = slides[current];

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Présentation SALMA"
    >
      {/* Background dynamique */}
      <div className={`absolute inset-0 bg-gradient-to-br ${activeSlide.gradient} transition-all duration-700`} />
      <div className={`absolute inset-0 bg-gradient-to-tr ${activeSlide.accent} opacity-60`} />
      
      {/* Éléments décoratifs flottants */}
      <HeroDecorations type={activeSlide.deco} />

      {/* Contenu du slide actif */}
      <div className="relative z-10 flex-1 flex items-center">
        <HeroSlide slide={activeSlide} animating={animating} />
      </div>

      {/* Barre de navigation et progression */}
      <HeroControls
        total={slides.length}
        current={current}
        paused={paused}
        onPrev={prev}
        onNext={next}
        onGoTo={goTo}
      />
    </section>
  );
}