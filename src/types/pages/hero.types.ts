// src/sections/visitor/hero/hero.types.ts

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

export interface HeroSlideData {
  id: string;
  gradient: string;
  accent: string;
  badge: string;
  title: string;
  subtitle: string;
  ctas: { label: string; href: string; variant: "gold" | "navy" }[];
  stats: { value: string; label: string }[];
  deco: string;
  scholarship: HeroScholarship;
}