// src/dictionaries/fr.ts
// ============================================================
//  DICTIONNAIRE FRANÇAIS — RÉFÉRENCE
//  Ce fichier définit la structure de TOUS les dictionnaires.
//  Toute nouvelle clé ajoutée ici DOIT être ajoutée dans en.ts.
// ============================================================

export const fr = {

  // ── Métadonnées SEO ──
  metadata: {
    title: "SALMA Travel Agency — Votre visa Chine en 3 semaines",
    description:
      "SALMA est une agence professionnelle spécialisée dans l'obtention de visas pour la Chine. Visa Étude, Touriste, Travail et Bourse d'Étude.",
  },

  // ── Navigation ──
  nav: {
    home: "Accueil",
    services: "Services",
     bourses: "Bourses",
    visa: "Visa",
    about: "À propos",
    contact: "Contact",
    getStarted: "Commencer",
    admin: "Admin",
  },

 scholarships: {
  sectionTitle: "Bourses Disponibles",
  deadline: "Date limite",
  language: "Langue requise",
  viewDetails: "Consulter l'offre",
  // Toutes les clés de StudyLevel doivent être ici
  levels: { 
    LICENCE: "Licence",
    MASTER: "Master", 
    DOCTORAT: "Doctorat",
    POST_DOC: "Post-Doctorat"
  },
  // Toutes les clés de CoverageType doivent être ici
  coverage: { 
    TOTALE: "Bourse Complète", 
    PARTIELLE: "Partielle",
    SCOLARITÉ: "Frais de Scolarité",
    ALLOCATION: "Allocation Mensuelle"
  }
},
scholarshipDetail: {
  backToList: "Retour à la liste",
  organization: "Organisme financier",
  eligibility: "Critères d'éligibilité",
  benefits: "Ce que couvre la bourse",
  studyFields: "Domaines d'études",
  applyTitle: "Cette bourse vous intéresse ?",
  applyDesc: "Contactez nos conseillers pour monter votre dossier de candidature.",
  btnApply: "Postuler via WhatsApp",
  btnForm: "Remplir le formulaire"
},
  // ── Hero ──
  hero: {
  badge: "Expertise AG Technologies",
  title: "Réalisez votre rêve d'études en Chine & Allemagne",
  description: "Accompagnement complet, obtention de visa en 3 semaines et garantie satisfait ou remboursé. Rejoignez les meilleures universités mondiales.",
  ctaPrimary: "Trouver ma bourse",
  ctaSecondary: "Nos services de visa",
  trustIndicator: {
    count: "+500 étudiants",
    text: "déjà accompagnés cette année"
  },
  imageAlt: "Étudier en Chine avec SALMA",
  visaBadge: {
    number: "03",
    label: "Semaines pour votre Visa"
  }
},

trust: {
  expertise: {
    title: "Expertise AGT",
    desc: "Un accompagnement de A à Z par des professionnels."
  },
  speed: {
    title: "Visa en 3 semaines",
    desc: "Des procédures optimisées pour un départ rapide."
  },
  guarantee: {
    title: "Satisfait ou Remboursé",
    desc: "Votre réussite est notre priorité absolue."
  }
},
stats: {
  visas: { value: "500+", label: "Visas Obtenus" },
  partners: { value: "25+", label: "Universités Partenaires" },
  experience: { value: "05+", label: "Années d'Expérience" },
  satisfaction: { value: "100%", label: "Taux de Réussite" }
},
featuredScholarships: {
  title: "Bourses à la une",
  subtitle: "Opportunités Exceptionnelles",
  viewAll: "Voir toutes les bourses",
},
successStories: {
  title: "Ils ont réussi avec SALMA",
  subtitle: "Histoires de Succès",
  stories: [
    {
      name: "Marcelle T.",
      destination: "Université de Pékin, Chine",
      quote: "Grâce à l'accompagnement d'AGT, j'ai obtenu ma bourse complète en moins de deux mois. Une équipe professionnelle et à l'écoute !",
      program: "Master en IA"
    },
    {
      name: "Cédric M.",
      destination: "TU Berlin, Allemagne",
      quote: "Le processus de visa semblait complexe, mais SALMA a tout géré. Je recommande vivement pour ceux qui visent l'Allemagne.",
      program: "Licence en Mécanique"
    },
    {
      name: "Awa B.",
      destination: "Université de Fudan, Chine",
      quote: "Satisfaite ou remboursée n'est pas qu'un slogan, c'est une réalité. Mon rêve chinois est devenu possible grâce à eux.",
      program: "Master en Commerce"
    }
  ]
},
catalog: {
  title: "Toutes nos bourses",
  description: "Trouvez la bourse qui correspond à votre projet d'études en Chine ou en Allemagne.",
  searchPlaceholder: "Rechercher une bourse...",
  filterAll: "Tous",
  filterCountry: "Pays",
  filterLevel: "Niveau d'études",
  noResults: "Aucune bourse ne correspond à votre recherche.",
  found: "bourses trouvées"
},

 servicesPage: {
  title: "Nos Services de Mobilité",
  subtitle: "Une expertise complète pour votre voyage",
  description: "Que vous partiez pour étudier, travailler ou visiter, AG Technologies vous garantit une procédure simplifiée et sécurisée.",
  items: {
    study: { title: "Visa Étude", desc: "Admission garantie dans les meilleures universités de Chine et d'Allemagne." },
    tourist: { title: "Visa Touriste", desc: "Partez à la découverte du monde avec une procédure rapide en 3 semaines." },
    work: { title: "Visa Travail", desc: "Opportunités professionnelles et accompagnement administratif complet." },
    insurance: { title: "Assurance Voyage", desc: "Protection santé internationale conforme aux exigences consulaires." }
  }
},
aboutPage: {
  title: "À propos de SALMA",
  subtitle: "L'expertise d'AG Technologies",
  missionTitle: "Notre Mission",
  missionDesc: "Faciliter l'accès à l'éducation internationale et à la mobilité pour tous les talents camerounais. Nous servons de pont entre l'Afrique, la Chine et l'Allemagne.",
  visionTitle: "Pourquoi nous faire confiance ?",
  visionDesc: "Installés à Yaoundé, Immeuble Kadji, nous opérons avec une transparence totale. Notre slogan 'Satisfait ou Remboursé' n'est pas qu'une promesse, c'est notre éthique de travail.",
  partners: "Nos Partenariats Universitaires",
},
  // ── Contact ──
  // src/dictionaries/fr.ts

// ... (reste du fichier)
contact: {
  title: "Parlons de votre projet",
  subtitle: "Contactez-nous",
  form: {
    name: "Nom complet",
    email: "Adresse Email",
    phone: "Téléphone (WhatsApp)",
    subject: "Bourse souhaitée",
    message: "Votre message",
    send: "Envoyer ma demande",
    success: "Demande envoyée avec succès !"
  },
  info: {
    address: "Montée Anne rouge, Immeuble Kadji, Yaoundé",
    email: "secretariatagtechnologies@gmail.com",
    whatsappMsg: "Bonjour SALMA, je souhaiterais avoir des informations sur les bourses pour..."
  }
},
faq: {
  title: "Questions fréquentes",
  subtitle: "Tout savoir sur nos services",
  items: [
    { q: "Quels sont les délais pour le visa ?", a: "En moyenne 03 semaines pour la Chine." },
    { q: "La garantie remboursement est-elle réelle ?", a: "Oui, c'est un engagement contractuel d'AG Technologies." },
    { q: "Quels pays couvrez-vous ?", a: "Nous sommes spécialisés sur la Chine et l'Allemagne." }
  ]
},
// ...
  // ── Commun ──
  common: {
    loading: "Chargement...",
    error: "Une erreur est survenue",
    retry: "Réessayer",
    learnMore: "En savoir plus",
    close: "Fermer",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    seeAll: "Voir tout",
    processingTime: "Délai de traitement",
    weeks: "semaines",
    guarantee: "Satisfait ou remboursé",
  },

  // ── Footer ──
 footer: {
  tagline: "Votre partenaire de confiance pour la mobilité internationale vers la Chine et l'Allemagne.",
  slogan: "Satisfait ou Remboursé — L'excellence au service de votre avenir.",
  links: {
    title: "Navigation",
    home: "Accueil",
    bourses: "Bourses",
    services: "Services",
    about: "À propos",
    contact: "Contact"
  },
  contact: {
    title: "Contactez-nous",
    address: "Montée Anne rouge, Immeuble Kadji, Yaoundé",
    phones: "+237 6 99 45 09 84 / 6 51 74 03 28",
    email: "secretariatagtechnologies@gmail.com"
  },
  rights: "© 2026 SALMA by AG Technologies. Tous droits réservés."
},
} as const;