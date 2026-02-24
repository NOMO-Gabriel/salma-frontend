// src/dictionaries/en.ts
// ============================================================
//  DICTIONNAIRE ANGLAIS
//  Miroir exact de fr.ts — toutes les clés doivent être présentes.
//  TypeScript signalera toute clé manquante à la compilation.
// ============================================================

export const en = {

  // ── Métadonnées SEO ──
  metadata: {
    title: "SALMA Travel Agency — Your China Visa in 3 Weeks",
    description:
      "SALMA is a professional agency specializing in China visa processing. Study, Tourist, Work Visas and Scholarships.",
  },

  // ── Navigation ──
  nav: {
    home: "Home",
    services: "Services",
    visa: "Visa",
    about: "About",
    contact: "Contact",
    getStarted: "Get Started",
    admin: "Admin",
  },

  // ── Hero ──
  hero: {
    tagline: "Professional Travel Agency",
    title: "Your China Visa",
    titleHighlight: "in 3 Weeks",
    description:
      "SALMA guides you with professionalism and transparency through every step of your journey to China.",
    ctaPrimary: "Start My Application",
    ctaSecondary: "Learn More",
    guarantee: "Satisfaction Guaranteed",
  },

  // ── Services ──
  services: {
    sectionTitle: "Our Services",
    sectionSubtitle: "Everything you need for your trip to China",
    "visa-etude": {
      name: "Study Visa",
      description:
        "Get your student visa to join the best Chinese universities.",
    },
    "visa-touriste": {
      name: "Tourist Visa",
      description:
        "Explore China with peace of mind with a tourist visa processed quickly.",
    },
    "visa-travail": {
      name: "Work Visa",
      description:
        "Grow your career in China with a work visa tailored to your profile.",
    },
    "bourse-etude": {
      name: "Study Scholarship",
      description:
        "We guide you through obtaining full scholarships to study in China.",
    },
  },

  // ── À propos ──
  about: {
    sectionTitle: "About SALMA",
    description:
      "SALMA is a professional travel and tourism agency based in Yaoundé, Cameroon. Specializing in China visa processing, we support our clients with transparency and efficiency.",
    mission: "Our Mission",
    missionText:
      "To make China accessible to all Cameroonians, whether to study, work or travel.",
    values: "Our Values",
    location: "Yaoundé, Cameroon",
  },

  // ── Contact ──
  contact: {
    sectionTitle: "Contact Us",
    sectionSubtitle: "Our team responds within 24 hours",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    message: "Your Message",
    subject: "Subject",
    send: "Send Message",
    sending: "Sending...",
    successMessage: "Message sent successfully!",
    errorMessage: "An error occurred. Please try again.",
    address: "Montée Anne Rouge, Immeuble Kadji, next to BGFI Bank, Yaoundé",
    whatsapp: "Contact on WhatsApp",
  },

  // ── Commun ──
  common: {
    loading: "Loading...",
    error: "An error occurred",
    retry: "Retry",
    learnMore: "Learn More",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",
    seeAll: "See All",
    processingTime: "Processing Time",
    weeks: "weeks",
    guarantee: "Satisfaction Guaranteed",
  },

  // ── Footer ──
  footer: {
    tagline: "Live your Travel Dream",
    rights: "All rights reserved.",
    followUs: "Follow Us",
  },
} as const;