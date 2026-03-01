"use client";
// src/sections/visitor/hero/HeroCarousel.tsx
// Orchestrateur du carousel — branché sur cmsSwitcher

import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import HeroSlide from "./HeroSlide";
import HeroControls from "./HeroControls";
import HeroDecorations from "./HeroDecroration";
import type { HeroSlideData } from "@/types";

// Palettes de fond par index de slide — fixes, hors CMS (choix UI)
const GRADIENTS = [
  { gradient: "from-white via-white to-white",                         accent: "from-transparent to-transparent",     deco: "circle-top-right"   },
  { gradient: "from-[#EDF3FC] via-[#E5EEF9] to-[#DCE9F7]",            accent: "from-[#1B365D]/4 to-transparent",      deco: "circle-bottom-left" },
  { gradient: "from-[#CCDDF0] via-[#C2D5EC] to-[#B8CCE8]",            accent: "from-[#1B365D]/6 to-transparent",      deco: "circle-center"      },
];

export default function HeroCarousel() {
  const { locale } = useLanguage();
  const [slides, setSlides] = useState<HeroSlideData[]>([]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Chargement depuis cmsSwitcher
  useEffect(() => {
    cmsSwitcher.getScopeContent("layout", locale).then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = (data as any).hero_carousel?.slides ?? [];
      const enriched: HeroSlideData[] = raw.map((s: HeroSlideData, i: number) => ({
        ...s,
        ...GRADIENTS[i % GRADIENTS.length],
      }));
      setSlides(enriched);
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

  // Autoplay 10s
  useEffect(() => {
    if (paused || !slides.length) return;
    intervalRef.current = setInterval(next, 10000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next, slides.length]);

  if (!slides.length) return <div className="min-h-screen bg-white" />;

  const slide = slides[current];

  return (
    <section
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Présentation SALMA"
    >
      {/* Fond dégradé */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-700`} />
      <div className={`absolute inset-0 bg-gradient-to-tr ${slide.accent} opacity-60`} />
      <HeroDecorations type={slide.deco} />

      {/* Contenu du slide */}
      <div className="relative z-10 flex-1 flex items-center">
        <HeroSlide slide={slide} animating={animating} />
      </div>

      {/* Contrôles */}
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