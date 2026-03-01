"use client";
// src/sections/visitor/hero/HeroSlide.tsx

import Link from "next/link";
import HeroScholarshipCard from "./HeroScholarshipCard";
import type { HeroSlideData } from "@/types";

interface Props {
  slide: HeroSlideData;
  animating: boolean;
}

export default function HeroSlide({ slide, animating }: Props) {
  const fade = animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0";

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-20 lg:py-0
      grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      {/* ── Colonne gauche : texte ── */}
      <div>
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full
          bg-salma-primary/8 border border-salma-primary/15
          text-salma-primary text-xs font-bold tracking-wide mb-8
          transition-all duration-500 ${fade}`}
        >
          {slide.badge}
        </div>

        {/* Titre */}
        <h1 className={`text-4xl lg:text-6xl font-serif font-bold text-salma-primary
          leading-tight mb-4 whitespace-pre-line
          transition-all duration-500 delay-75 ${fade}`}
        >
          {slide.title}
          <span className="block w-20 h-1.5 bg-salma-gold rounded-full mt-4" aria-hidden="true" />
        </h1>

        {/* Sous-titre */}
        <p className={`text-salma-text-muted text-base lg:text-lg leading-relaxed
          max-w-xl mb-8
          transition-all duration-500 delay-100 ${fade}`}
        >
          {slide.subtitle}
        </p>

        {/* CTAs */}
        <div className={`flex flex-wrap gap-3 mb-10
          transition-all duration-500 delay-150 ${fade}`}
        >
          {slide.ctas.map((cta) => (
            <Link key={cta.label} href={cta.href} className={`
              inline-flex items-center gap-2 px-6 py-3.5 rounded-full
              text-xs font-bold uppercase tracking-widest
              transition-all duration-200 active:scale-[0.97]
              ${cta.variant === "gold"
                ? "bg-salma-gold text-salma-primary shadow-[0_4px_16px_rgba(201,168,76,0.35)] hover:bg-salma-gold-light"
                : "bg-salma-primary text-white hover:bg-salma-primary-light"
              }`}
            >
              {cta.label}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className={`flex flex-wrap gap-8
          transition-all duration-500 delay-200 ${fade}`}
        >
          {slide.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-salma-gold leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-salma-text-muted mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Colonne droite : carte bourse ── */}
      <div className={`hidden lg:flex items-center justify-center
        transition-all duration-500 delay-100 ${fade}`}
      >
        <HeroScholarshipCard data={slide.scholarship} slideId={slide.id} />
      </div>
    </div>
  );
}