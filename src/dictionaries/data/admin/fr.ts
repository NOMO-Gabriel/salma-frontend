export const adminFr = {
  common: {
    show: "Afficher",
    hide: "Masquer",
    actions: "Actions",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    search: "Rechercher...",
    filter: "Filtrer",
    all: "Tous",
    loading: "Chargement...",
    noData: "Aucune donnée trouvée.",
    confirmTitle: "Êtes-vous sûr ?",
    confirmDelete: "Cette action est irréversible.",
    success: "Opération réussie",
    error: "Une erreur est survenue",
    errorSave: "Erreur lors de la sauvegarde",
    status: "Statut",
    date: "Date",
    back: "Retour",
    next: "Suivant",
    prev: "Précédent",
    pageOf: "Page {current} sur {total}",
    results: "{count} résultats",
    french: "Français",
    english: "Anglais",
    underDevelopment: "En cours de développement",
    anonymous: "Anonyme",
  },
  countries: {
    chine: "Chine",
    allemagne: "Allemagne",
  },
  levels: {
    licence: "Licence",
    master: "Master",
    doctorat: "Doctorat",
    postdoc: "Post-Doc",
    formation: "Formation",
    autre: "Autre",
  },
  statusLabels: {
    publie: "Publié",
    brouillon: "Brouillon",
    archive: "Archivé",
    expire: "Expiré",
    ouvert: "Ouvert",
    ferme: "Fermé",
    urgent: "Urgent",
    en_attente: "En attente",
    nouveau: "Nouveau",
    en_cours: "En cours",
    traite: "Traité",
  },
  dashboard: {
    greetingMorning: "Bonjour",
    greetingAfternoon: "Bon après-midi",
    greetingEvening: "Bonsoir",
    subtitle: "Voici un aperçu de votre plateforme SALMA aujourd'hui.",
    newScholarship: "Nouvelle bourse",
    recentScholarships: {
      title: "Dernières bourses",
      viewAll: "Voir tout →",
      empty: "Aucune bourse pour le moment."
    },
    recentContacts: {
      title: "Dernières demandes",
      viewAll: "Voir tout →",
      empty: "Aucune demande pour le moment."
    },
    footer: {
      version: "SALMA Admin v1.0 — AG Technologies",
      backend: "Backend :"
    },
    cards: {
      totalVisitors: "Visiteurs totaux",
      activeScholarships: "Bourses actives",
      receivedRequests: "Demandes reçues",
      conversionRate: "Taux de conversion",
      visitorsMonth: "+12% ce mois",
      totalCount: "{count} au total",
      unreadCount: "dont non lues",
      conversionDesc: "visiteurs → contacts",
    },
    charts: {
      activityTitle: "Activité cette semaine",
      activitySubtitle: "Nombre de pages bourses vues par jour",
      viewsLabel: "Vues bourses",
    },
    distribution: {
      title: "Répartition",
      china: "Bourses Chine",
      germany: "Bourses Allemagne",
    },
    quickActions: {
      title: "Actions rapides",
      addScholarship: "+ Ajouter une bourse",
      viewContacts: "→ Voir les contacts",
      viewKpi: "📊 Voir les analytics",
    },
  },
  login: {
    brandName: "SALMA",
    brandCompany: "AG Technologies",
    logoInitial: "S",
    emailPlaceholder: "admin@salma.cm",
    passwordPlaceholder: "••••••••••",
    title: "Connexion Admin",
    subtitle: "Accédez au tableau de bord de gestion de la plateforme SALMA.",
    emailLabel: "Adresse e-mail",
    passwordLabel: "Mot de passe",
    forgotPassword: "Mot de passe oublié ?",
    submitBtn: "Accéder au tableau de bord",
    submitting: "Connexion en cours…",
    secureSystem: "Système sécurisé",
    protectedAccess: "Accès protégé — Réservé aux administrateurs AG Technologies",
    quote: "La passerelle entre l'Afrique et les meilleures universités du monde.",
    adminOnly: "Espace réservé aux administrateurs de la plateforme",
    copyright: "© 2026 SALMA · AG Technologies · Yaoundé, Cameroun",
    stats: {
      students: "Étudiants accompagnés",
      studentsValue: "500+",
      universities: "Universités partenaires",
      universitiesValue: "25+",
      visas: "Délai moyen visas",
      visasValue: "03 sem.",
      success: "Taux de réussite",
      successValue: "100%"
    }
  },
  scholarships: {
    title: "Gestion des bourses",
    addBtn: "Ajouter une bourse",
    table: {
      thScholarship: "Bourse",
      thCountry: "Pays",
      thLevel: "Niveau",
      thDeadline: "Deadline",
      thStatus: "Statut",
      thPublished: "Publié",
    },
    filters: {
      searchPlaceholder: "Rechercher une bourse...",
      allCountries: "Tous les pays",
      allStatus: "Tous les statuts",
      reset: "Réinitialiser"
    },
    modal: {
      editTitle: "Modifier la bourse",
      newTitle: "Nouvelle bourse",
      tabs: {
        info: "Informations",
        visibility: "Visibilité champs",
        options: "Options"
      },
      fields: {
        titleFr: "Titre (FR) *",
        titleEn: "Titre (EN)",
        orgFr: "Organisme (FR)",
        orgEn: "Organisme (EN)",
        destination: "Destination",
        level: "Niveau",
        coverage: "Couverture",
        status: "Statut",
        deadline: "Date limite",
        officialLink: "Lien officiel",
        descFr: "Description (FR)",
        descEn: "Description (EN)",
        langFr: "Exigence langue (FR)",
        langEn: "Exigence langue (EN)",
        isFeatured: "Mettre en avant",
        isFeaturedDesc: "Afficher en priorité sur la page d'accueil",
      },
      visibilityNote: "⚠️ Contrôlez ce que les visiteurs voient sur la vitrine.",
      visibilityWarning: "Recommandé : masqué sur la vitrine",
      btnUpdate: "Mettre à jour",
      btnCreate: "Créer la bourse",
      saving: "Enregistrement..."
    }
  },
  medias: {
    title: "Médiathèque",
    subtitle: "Gérez les images utilisées sur votre plateforme.",
    uploadBtn: "+ Uploader une image",
    uploading: "Upload en cours...",
    copyLink: "Lien copié !",
    confirmDelete: "Supprimer cette image définitivement ?",
    errorUpload: "Erreur lors de l'upload de l'image.",
    errorDelete: "Erreur lors de la suppression."
  },
  newsletter: {
    title: "Newsletter & Marketing",
    subtitle: "Gérez votre base de prospects et vos campagnes e-mail.",
    confirmDeleteSub: "Supprimer cet abonné ?",
    tabs: {
      subscribers: "Abonnés ({count})",
      announcements: "Annonces ({count})"
    },
    table: {
      thSubscriber: "Abonné",
      thDestination: "Destination",
      thSource: "Source",
    },
    announcements: {
      btnDetails: "Détails",
      statusSent: "ENVOYÉ",
      statusDraft: "BROUILLON"
    }
  },
  testimonials: {
    title: "Modération des Témoignages",
    subtitle: "Approuvez les avis clients pour les afficher sur la vitrine.",
    labelApproved: "Approuvé",
    labelVisible: "Visible Site",
    btnDelete: "Supprimer",
    confirmDelete: "Supprimer définitivement ce témoignage ?",
    errorStatus: "Erreur lors de la mise à jour du statut.",
    errorDelete: "Erreur lors de la suppression."
  },
  contacts: {
    title: "Contacts & Candidatures",
    subtitle: "Gérez les demandes reçues via le formulaire de contact.",
    table: {
      thDate: "Date",
      thName: "Nom",
      thMessage: "Message",
      thStatus: "Statut",
      btnMarkRead: "Marquer lu"
    }
  },
  layout: {
    adminTitle: "Administration SALMA",
    loadingAuth: "Vérification des accès…",
    viewSite: "Voir le site",
    logout: "Déconnexion",
    sections: {
      principal: "Principal",
      content: "Contenu",
      intelligence: "Intelligence"
    },
    menu: {
      dashboard: "Tableau de bord",
      scholarships: "Bourses",
      contacts: "Contacts & RDV",
      cms: "Pages & CMS",
      medias: "Médiathèque",
      testimonials: "Témoignages",
      newsletter: "Newsletter",
      chatbot: "Chatbot / FAQ",
      kpi: "KPI & Analytics"
    }
  },
  notifications: {
    title: "Notifications",
    newSingular: "1 nouveau",
    newPlural: "{count} nouveaux",
    viewAction: "Voir les {count} demandes non traitées",
    empty: "Aucune nouvelle notification",
  },
  chatbot: {
    title: "Intelligence du Chatbot (FAQ)",
    subtitle: "Gérez les réponses automatiques de votre assistant virtuel.",
    newQuestion: "+ Nouvelle Question",
    categoryDefault: "Général",
    statusDisabled: "Désactivé",
    btnDeactivate: "Désactiver",
    btnActivate: "Activer",
    btnDelete: "Supprimer",
    confirmDelete: "Supprimer cette question de la base de connaissances ?",
    errorUpdate: "Erreur lors de la mise à jour.",
    errorDelete: "Erreur lors de la suppression."
  },
  cms: {
    title: "Gestion du Contenu (CMS)",
    subtitle: "Sélectionnez une page pour modifier ses textes.",
    editTitle: "Édition : {name}",
    editSubtitle: "Modifiez les blocs de cette page",
    statusPublished: "Publiée",
    statusDraft: "Brouillon",
    blocksCount: "{count} Blocs",
    btnEdit: "Modifier →",
    btnEditBlock: "Éditer le texte",
    modal: {
      title: "Modifier le bloc",
      labelFr: "Contenu Français",
      labelEn: "Contenu Anglais",
      labelVisible: "Rendre ce bloc visible sur le site",
      btnCancel: "Annuler",
      btnSave: "Mettre à jour",
      saving: "Enregistrement...",
      error: "Erreur lors de la mise à jour du bloc."
    }
  },
  kpi: {
    title: "Analyses & Performances",
    subtitle: "Suivez l'efficacité de votre tunnel de conversion en temps réel.",
    cards: {
      visitors: "Visiteurs (Aujourd'hui)",
      pageViews: "Pages Vues",
      contacts: "Contacts Reçus",
      conversion: "Taux Conversion"
    },
    table: {
      title: "Performance par Bourse (Top 10)",
      thScholarship: "Bourse",
      thViews: "Vues",
      thConversions: "Conversions",
      thEfficiency: "Efficacité"
    }
  }
};