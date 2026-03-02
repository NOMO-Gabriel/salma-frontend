// src/types/pages/about.types.ts

export interface AboutHeroTexts {
  title: string;
  subtitle: string;
  description: string;
   badge_label: string; // ex: "Expertise"
  badge_value: string; // ex: "Depuis 2019"
  trust_label: string; // ex: "Confiance renouvelée"
}

export interface ValueItem {
  title: string;
  desc: string;
  icon: string;
}

export interface AboutValuesTexts {
  title: string;
  items: ValueItem[];
}

export interface AboutLocationTexts {
  title: string;
  subtitle: string;
  description: string;
  address_label: string;
  hours_label: string;
  hours_value: string;
  cta_maps: string;
  cta_call: string;
  cta_whatsapp: string;
}

/** Structure complète du contenu de la page À Propos */
export interface AboutContent {
  hero: AboutHeroTexts;
  values: AboutValuesTexts;
  location: AboutLocationTexts;
}

/** Structure du scope "about" utilisé par le cmsSwitcher */
export interface AboutScope {
  aboutPage: AboutContent;
}