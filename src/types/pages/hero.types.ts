// src/types/pages/hero.types.ts

export interface HeroScholarship {
  flag: string;
  country: string;
  coverage: string;
  title: string;
  level: string;
  deadline: string;
  href: string;
  cta: string;
}

export interface HeroSlideCMS {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctas: { 
    label: string; 
    href: string; 
    variant: "gold" | "navy" 
  }[];
  stats: { 
    value: string; 
    label: string 
  }[];
  scholarship: HeroScholarship;
}

/**
 * Structure complète du slide utilisée par les composants UI.
 * Étend le contenu CMS avec les propriétés de design injectées par le Carousel.
 */
export interface HeroSlideData extends HeroSlideCMS {
  gradient: string;   // Classe Tailwind pour le fond
  accent: string;     // Classe Tailwind pour l'accentuation
  deco: string;       // Type de décoration géométrique
  bgImage?: string;   // Chemin vers l'image de fond (ex: "/images/hero/hero-slide-1.jpg")
}