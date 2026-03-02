// src/dictionaries/data/static/common/fr.ts
// ==============================================================================
//  Common FR — Clés i18n partagées entre vitrine et admin
//  Contient les labels réutilisables par les composants UI atomiques
// ==============================================================================

export const frCommon = {
  /** Labels des statuts métier — SalmaBadge */
  statusLabels: {
    publie: "Publié", brouillon: "Brouillon", archive: "Archivé",
    expire: "Expiré", ouvert: "Ouvert", ferme: "Fermé",
    urgent: "Urgent", en_attente: "En attente", nouveau: "Nouveau",
    en_cours: "En cours", traite: "Traité",
  },

  /** Labels des pays — ScholarshipCard */
  countries: {
    chine: "Chine", allemagne: "Allemagne", france: "France",
    canada: "Canada", autre: "International",
  },

  /** Labels des niveaux d'études */
  levels: {
    licence: "Licence", master: "Master", doctorat: "Doctorat",
    postdoc: "Post-Doc", formation: "Formation", autre: "Autre",
  },

  /** Labels des types de couverture */
  coverages: {
    complete: "Bourse complète", partielle: "Partielle",
    logement: "Logement inclus", transport: "Transport",
    autre: "Aide financière",
  },

  /** Labels ScholarshipCard */
  scholarshipCard: {
    deadline: "Date limite", deadlineNone: "—",
    language: "Langue requise", viewDetails: "Consulter l'offre",
    closedTag: "Fermé", urgentTag: "Urgent", deadlinePrefix: "Limite :",
  },

  /** Labels NewsletterForm */
  newsletter: {
    placeholder: "votre@email.com", submit: "S'abonner",
    submitting: "Envoi…", success: "Inscription réussie !",
    error: "Une erreur est survenue. Veuillez réessayer.",
  },

  /** Labels ThemeSwitcher (accessibilité) */
  themeSwitcher: {
    switchToLight: "Passer en mode clair",
    switchToDark: "Passer en mode sombre",
  },

  /** Labels LanguageSwitcher (accessibilité) */
  languageSwitcher: {
    switchToEn: "Switch to English",
    switchToFr: "Passer en français",
  },

  /** Labels MapPreview */
  mapPreview: {
    ctaLabel: "Ouvrir dans Google Maps",
    badgeTitle: "Notre Siège",
    badgeSubtitle: "Yaoundé, Immeuble Kadji",
    imageAlt: "Siège AG Technologies — Yaoundé",
  },

  /** Labels WhatsAppButton (accessibilité) */
  whatsappButton: {
    ariaLabel: "Nous contacter sur WhatsApp",
  },

  /** Labels ChatbotWidget */
  chatbot: {
    title: "Assistant SALMA",
    welcomeMessage: "Bonjour ! Je suis l'assistant SALMA. Comment puis-je vous aider pour votre projet d'études ?",
    inputPlaceholder: "Posez votre question…",
    thinking: "Réfléchit…",
    noAnswer: "Je n'ai pas trouvé de réponse précise à votre question. Un conseiller pourra mieux vous aider !",
    whatsappFallback: "Contacter un conseiller",
    openAriaLabel: "Ouvrir le chatbot SALMA",
    closeAriaLabel: "Fermer le chatbot",
    sendAriaLabel: "Envoyer le message",
    quickActions: [
      { id: "scholarships", label: "🎓 Bourses disponibles", query: "Quelles bourses sont disponibles ?" },
      { id: "china",        label: "🇨🇳 Étudier en Chine",    query: "Comment étudier en Chine ?" },
      { id: "germany",      label: "🇩🇪 Étudier en Allemagne", query: "Comment étudier en Allemagne ?" },
      { id: "rdv",          label: "📅 Prendre RDV",          query: "Comment prendre rendez-vous ?" },
    ],
  },

  /** Labels Footer (textes qui étaient en dur) */
  footer: {
    brandSubtitle: "Bourses & Mobilité",
    newsletterTitle: "Newsletter",
    newsletterDesc: "Recevez les alertes bourses en priorité.",
    privacyLink: "Confidentialité",
    supportLink: "Support",
  },
};