// src/types/pages/hero.types.ts
// ==============================================================================
//  Types pour le Carousel Hero — SALMA
// ==============================================================================

/**
 * Données de la petite carte de bourse affichée dans le slide
 */
export interface HeroScholarship {
  flag: string;       // emoji drapeau
  country: string;    // "Chine" / "Allemagne"
  title: string;      // nom de la bourse
  level: string;      // "Master · Doctorat"
  coverage: string;   // "Bourse complète"
  deadline: string;   // "Clôture : 31 mars 2026"
  href: string;       // lien vers la page bourse
  cta: string;        // texte du bouton
}

/**
 * Structure du slide telle qu'elle est définie dans les dictionnaires (CMS)
 * Ne contient que le contenu textuel et les liens.
 */
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
  gradient: string; // Classe Tailwind pour le fond
  accent: string;   // Classe Tailwind pour l'accentuation
  deco: string;     // Type de décoration géométrique
}