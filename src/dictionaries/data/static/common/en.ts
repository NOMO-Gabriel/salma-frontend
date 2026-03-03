// src/dictionaries/data/static/common/en.ts
// ==============================================================================
//  Common EN — Shared i18n keys between storefront and admin
//  Contains reusable labels for atomic UI components
// ==============================================================================

export const enCommon = {
  /** Business status labels — SalmaBadge */
  statusLabels: {
    publie: "Published", brouillon: "Draft", archive: "Archived",
    expire: "Expired", ouvert: "Open", ferme: "Closed",
    urgent: "Urgent", en_attente: "Pending", nouveau: "New",
    en_cours: "In Progress", traite: "Processed",
  },

  /** Destination country labels — ScholarshipCard */
  countries: {
    chine: "China", allemagne: "Germany", france: "France",
    canada: "Canada", autre: "International",
  },

  /** Study level labels */
  levels: {
    licence: "Bachelor", master: "Master", doctorat: "PhD",
    postdoc: "Post-Doc", formation: "Training", autre: "Other",
  },

  /** Coverage type labels */
  coverages: {
    complete: "Full scholarship", partielle: "Partial",
    logement: "Housing included", transport: "Transport",
    autre: "Financial aid",
  },

  /** ScholarshipCard labels */
  scholarshipCard: {
    deadline: "Deadline", deadlineNone: "—",
    language: "Language required", viewDetails: "View Details",
    closedTag: "Closed", urgentTag: "Urgent", deadlinePrefix: "Deadline:",
  },

  /** NewsletterForm labels */
  newsletter: {
    placeholder: "your@email.com", submit: "Subscribe",
    submitting: "Sending…", success: "Subscribed successfully!",
    error: "Something went wrong. Please try again.",
    subscribe_label: "I'd like to receive scholarship offers by email"
  },

  /** ThemeSwitcher labels (accessibility) */
  themeSwitcher: {
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },

  /** LanguageSwitcher labels (accessibility) */
  languageSwitcher: {
    switchToEn: "Switch to English",
    switchToFr: "Passer en français",
  },

  /** MapPreview labels */
  mapPreview: {
    ctaLabel: "Open in Google Maps",
    badgeTitle: "Our Headquarters",
    badgeSubtitle: "Yaoundé, Kadji Building",
    imageAlt: "AG Technologies Headquarters — Yaoundé",
  },

  /** WhatsAppButton labels (accessibility) */
  whatsappButton: {
    ariaLabel: "Contact us on WhatsApp",
  },

  /** ChatbotWidget labels */
  chatbot: {
    title: "SALMA Assistant",
    welcomeMessage: "Hello! I am the SALMA assistant. How can I help you with your study project?",
    inputPlaceholder: "Ask your question…",
    thinking: "Thinking…",
    noAnswer: "I couldn't find a precise answer to your question. An advisor can help you better!",
    whatsappFallback: "Contact an advisor",
    openAriaLabel: "Open the SALMA chatbot",
    closeAriaLabel: "Close the chatbot",
    sendAriaLabel: "Send message",
    quickActions: [
      { id: "scholarships", label: "🎓 Available scholarships", query: "What scholarships are available?" },
      { id: "china",        label: "🇨🇳 Study in China",         query: "How to study in China?" },
      { id: "germany",      label: "🇩🇪 Study in Germany",       query: "How to study in Germany?" },
      { id: "rdv",          label: "📅 Book appointment",       query: "How to book an appointment?" },
    ],
  },
  conversionCTA: {
    title: "Ready to start your project?",
    subtitle: "Our advisors are here to guide you.",
    whatsapp_label: "Chat on WhatsApp",
    whatsapp_desc: "Instant response for your urgent questions.",
    appointment_label: "Book an appointment",
    appointment_desc: "A 30-min session to analyze your file.",
  },
  /** Footer labels (formerly hardcoded) */
  footer: {
    brandSubtitle: "Scholarships & Mobility",
    newsletterTitle: "Newsletter",
    newsletterDesc: "Get priority alerts on new scholarships.",
    privacyLink: "Privacy",
    supportLink: "Support",
  },
};