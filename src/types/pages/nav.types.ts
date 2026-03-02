// src/types/pages/nav.types.ts
import type { HeroSlideCMS } from "./hero.types";
import  type { FooterTexts }  from "./footer.types"


export interface NavHomeSection { id: string; label: string; icon: string; href: string; }
export interface NavHome { title: string; sections: NavHomeSection[]; }
export interface NavBourses { title: string; china_label: string; china_desc: string; china_cta: string; germany_label: string; germany_desc: string; germany_cta: string; }
export interface NavServiceItem { id: string; label: string; desc: string; icon: string; href: string; }
export interface NavServices { title: string; items: NavServiceItem[]; }
export interface NavAbout { title: string; agency_label: string; agency_desc: string; mission_label: string; mission_desc: string; privacy_label: string; privacy_desc: string; cta: string; }
export interface NavContact { title: string;  subtitle: string; rdv_label: string; rdv_desc: string; whatsapp_label: string; whatsapp_desc: string; newsletter_title: string; newsletter_desc: string; newsletter_placeholder: string; newsletter_btn: string; }


export interface ErrorTexts {
  notFound: { title: string; desc: string; btn: string; };
  global: { title: string; desc: string; btnReset: string; btnHome: string; };
}

export interface WidgetTexts {
  whatsapp: { helpText: string; };
  mapPreview: { ctaLabel: string; badgeTitle: string; badgeSubtitle: string; imageAlt: string; };
}

export interface NavContent {
  nav: Record<string, string>;
  footer: FooterTexts;
  cookies: { text: string; link: string; accept: string; decline: string; };
  common: { loading: string; error: string; };
  nav_home: NavHome;
  nav_bourses: NavBourses;
  nav_services: NavServices;
  nav_contact: NavContact;
  nav_about: NavAbout;
  errors: ErrorTexts;
  widgets: WidgetTexts;
 hero_carousel?: {
    slides: HeroSlideCMS[];
  };
}