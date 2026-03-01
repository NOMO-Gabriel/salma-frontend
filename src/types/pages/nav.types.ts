// src/types/nav.types.ts
// Types calqués exactement sur frLayout / enLayout dans
// src/dictionaries/data/static/layout/fr.ts et en.ts

export interface NavServiceItem {
  id: string;
  label: string;
  desc: string;
  icon: string;
  href: string;
}

export interface NavBourses {
  title: string;
  china_label: string;
  china_desc: string;
  china_cta: string;
  germany_label: string;
  germany_desc: string;
  germany_cta: string;
}

export interface NavServices {
  title: string;
  items: NavServiceItem[];
}

export interface NavContact {
  title: string;
  rdv_label: string;
  rdv_desc: string;
  whatsapp_label: string;
  whatsapp_desc: string;
  newsletter_title: string;
  newsletter_desc: string;
  newsletter_placeholder: string;
  newsletter_btn: string;
}

export interface NavAbout {
  title: string;
  agency_label: string;
  agency_desc: string;
  mission_label: string;
  mission_desc: string;
  cta: string;
}

export interface NavContent {
  nav_bourses: NavBourses;
  nav_services: NavServices;
  nav_contact: NavContact;
  nav_about: NavAbout;
}

export interface NavHomeSection {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface NavHome {
  title: string;
  sections: NavHomeSection[];
}

// Et dans NavContent :
export interface NavContent {
  nav_home: NavHome;      // ← ajouter
  nav_bourses: NavBourses;
  nav_services: NavServices;
  nav_contact: NavContact;
  nav_about: NavAbout;
}