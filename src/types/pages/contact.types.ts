// src/types/pages/contact.types.ts

export interface ContactHeroTexts {
  title: string;
  subtitle: string;
  description: string;
}

export interface ContactFormLabels {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  message: string;
  submit: string;
  success_title: string;
  success_msg: string;
  send_another: string;
  error_msg: string;

  /** Mode statique — titre affiché quand l'API est indisponible */
  error_static_title: string;
  /** Mode statique — message explicatif */
  error_static_msg: string;
  /** Mode statique — label du bouton WhatsApp */
  error_static_whatsapp: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ContactPageContent {
  hero: ContactHeroTexts;
  form_section: ContactFormLabels;
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
}

export interface ContactScope {
  contactPage: ContactPageContent;
}