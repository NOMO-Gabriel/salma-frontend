// src/types/pages/contact.types.ts

export interface ContactFormTexts {
  name: string;
  email: string;
  phone: string;
  message: string;
  send: string;
  success: string;
}

export interface ContactTexts {
  title: string;
  subtitle: string;
  form: ContactFormTexts;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqTexts {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

/** Structure complète du scope "contact" dans cmsSwitcher */
export interface ContactPageContent {
  contact: ContactTexts;
  faq: FaqTexts;
}