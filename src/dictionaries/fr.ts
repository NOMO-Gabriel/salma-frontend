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
    visa: "Visa",
    about: "À propos",
    contact: "Contact",
    getStarted: "Commencer",
    admin: "Admin",
  },

  // ── Hero ──
  hero: {
    tagline: "Agence professionnelle de voyage",
    title: "Votre visa Chine",
    titleHighlight: "en 3 semaines",
    description:
      "SALMA vous accompagne avec professionnalisme et transparence dans toutes vos démarches de voyage vers la Chine.",
    ctaPrimary: "Démarrer ma demande",
    ctaSecondary: "En savoir plus",
    guarantee: "Satisfait ou remboursé",
  },

  // ── Services ──
  services: {
    sectionTitle: "Nos services",
    sectionSubtitle: "Tout ce dont vous avez besoin pour votre voyage en Chine",
    "visa-etude": {
      name: "Visa Étude",
      description:
        "Obtenez votre visa étudiant pour intégrer les meilleures universités chinoises.",
    },
    "visa-touriste": {
      name: "Visa Touriste",
      description:
        "Explorez la Chine en toute sérénité avec un visa touriste obtenu rapidement.",
    },
    "visa-travail": {
      name: "Visa Travail",
      description:
        "Développez votre carrière en Chine avec un visa travail adapté à votre profil.",
    },
    "bourse-etude": {
      name: "Bourse d'Étude",
      description:
        "Nous vous accompagnons dans l'obtention de bourses d'étude complètes en Chine.",
    },
  },

  // ── À propos ──
  about: {
    sectionTitle: "À propos de SALMA",
    description:
      "SALMA est une agence professionnelle de voyage et tourisme basée à Yaoundé, Cameroun. Spécialisée dans les démarches de visa pour la Chine, nous accompagnons nos clients avec transparence et efficacité.",
    mission: "Notre mission",
    missionText:
      "Faciliter l'accès à la Chine pour tous les Camerounais, que ce soit pour étudier, travailler ou voyager.",
    values: "Nos valeurs",
    location: "Yaoundé, Cameroun",
  },

  // ── Contact ──
  contact: {
    sectionTitle: "Nous contacter",
    sectionSubtitle: "Notre équipe répond dans les 24h",
    name: "Nom complet",
    email: "Adresse email",
    phone: "Téléphone",
    message: "Votre message",
    subject: "Sujet",
    send: "Envoyer le message",
    sending: "Envoi en cours...",
    successMessage: "Message envoyé avec succès !",
    errorMessage: "Une erreur est survenue. Veuillez réessayer.",
    address: "Montée Anne Rouge, Immeuble Kadji, à côté de BGFI Bank, Yaoundé",
    whatsapp: "Contacter sur WhatsApp",
  },

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
    tagline: "Live your Travel Dream",
    rights: "Tous droits réservés.",
    followUs: "Suivez-nous",
  },

  // ── Admin ──
  admin: {
    sidebar: {
      dashboard: "Tableau de bord",
      scholarships: "Gestion des Bourses",
      applications: "Candidatures",
      settings: "Paramètres",
      logout: "Déconnexion",
    },
    scholarships: {
      title: "Bourses d'études",
      addBtn: "+ Ajouter une bourse",
      searchPlaceholder: "Rechercher une bourse...",
      table: {
        title: "Titre de la bourse",
        country: "Pays",
        level: "Niveau",
        deadline: "Date limite",
        status: "Statut",
        actions: "Actions",
        edit: "Éditer",
        delete: "Supprimer",
        deleteConfirm: "Voulez-vous vraiment supprimer cette bourse ?",
      },
      status: {
        open: "Ouvert",
        closed: "Fermé",
        pending: "En attente",
      },
      country: {
        chine: "Chine",
        allemagne: "Allemagne",
        both: "Chine & Allemagne",
      },
      form: {
        addTitle: "Ajouter une nouvelle bourse",
        editTitle: "Modifier la bourse",
        title: "Titre de la bourse",
        organization: "Organisme financeur",
        country: "Pays de destination",
        description: "Description",
        studyLevel: "Niveau d'études requis",
        fieldOfStudy: "Domaine d'études",
        ageLimit: "Âge limite",
        languageReq: "Score de langue (ex: HSK 4, IELTS)",
        status: "Statut de l'offre",
        deadline: "Date limite",
        coverageType: "Type de couverture",
        officialLink: "Lien officiel",
        cancel: "Annuler",
        save: "Enregistrer",
      }
    }
  }

} as const;