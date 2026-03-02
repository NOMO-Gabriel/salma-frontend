// src/types/pages/home.types.ts

export interface HomeHeroTexts {
  badge: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustIndicator: {
    count: string;
    text: string;
  };
  imageAlt: string;
  visaBadge: {
    number: string;
    label: string;
  };
}

export interface HomeTexts {
  hero: HomeHeroTexts;
  trust: {
    expertise: { title: string; desc: string };
    speed: { title: string; desc: string };
    guarantee: { title: string; desc: string };
  };
  stats: {
    visas: { value: string; label: string };
    partners: { value: string; label: string };
    experience: { value: string; label: string };
    satisfaction: { value: string; label: string };
  };
  featuredScholarships: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  successStories: {
    title: string;
    subtitle: string;
    description: string;
    trustBadge: string;
    verified: string;
  };
}