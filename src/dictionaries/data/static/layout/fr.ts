// src/dictionaries/data/static/layout/fr.ts
// =============================================================================
//  Layout FR — Contenu de navigation + footer + cookies
//  Structure calquée EXACTEMENT sur NavContent (nav.types.ts)
// =============================================================================

export const frLayout = {
  // ── Clés simples (Footer, Cookies, nav basique) ──────────────────────────
  nav: {
    home: "Accueil",
    services: "Services",
    bourses: "Bourses",
    about: "À propos",
    contact: "Contact",
    admin: "Admin",
  },
  footer: {
    tagline:
      "Votre partenaire de confiance pour la mobilité internationale vers la Chine et l'Allemagne.",
    slogan: "Satisfait ou Remboursé — L'excellence au service de votre avenir.",
    links: {
      title: "Navigation",
      home: "Accueil",
      bourses: "Bourses",
      services: "Services",
      about: "À propos",
      contact: "Contact",
    },
    contact: {
      title: "Contactez-nous",
      address: "Montée Anne rouge, Immeuble Kadji, Yaoundé",
      phones: "+237 6 99 45 09 84 / 6 51 74 03 28",
      email: "secretariatagtechnologies@gmail.com",
    },
    rights: "© 2026 SALMA by AG Technologies. Tous droits réservés.",
  },
  cookies: {
    text: "Nous utilisons des cookies pour améliorer votre expérience. Consultez notre",
    link: "politique de confidentialité",
    accept: "Accepter",
    decline: "Refuser",
  },

  // ── Dropdowns de navigation (NavContent) ─────────────────────────────────

  /** Dropdown Bourses */
  nav_bourses: {
    title: "Bourses",
    china_label: "Bourses en Chine",
    china_desc:
      "Universités publiques chinoises, financement complet ou partiel. Filières : médecine, ingénierie, management.",
    china_cta: "Explorer les bourses Chine",
    germany_label: "Bourses en Allemagne",
    germany_desc:
      "Programmes DAAD, Master en anglais, frais de scolarité réduits. Idéal pour les profils scientifiques.",
    germany_cta: "Explorer les bourses Allemagne",
  },

  /** Dropdown Services */
  nav_services: {
    title: "Services",
    items: [
      {
        id: "visa-etude",
        label: "Visa Étude",
        desc: "Dossier complet, admission garantie.",
        icon: "🎓",
        href: "/services#visa-etude",
      },
      {
        id: "visa-touriste",
        label: "Visa Touriste",
        desc: "Départ en 3 semaines chrono.",
        icon: "✈️",
        href: "/services#visa-touriste",
      },
      {
        id: "visa-travail",
        label: "Visa Travail",
        desc: "Opportunités pro à l'étranger.",
        icon: "💼",
        href: "/services#visa-travail",
      },
      {
        id: "assurance",
        label: "Assurance Voyage",
        desc: "Couverture santé conforme aux consulats.",
        icon: "🛡️",
        href: "/services#assurance",
      },
    ],
  },

  /** Dropdown À propos */
  nav_about: {
    title: "À propos",
    agency_label: "AG Technologies",
    agency_desc:"Cabinet spécialisé en mobilité internationale depuis 2019, basé à Yaoundé.",
    mission_label: "Notre mission",
    mission_desc:
      "Rendre l'étude à l'étranger accessible à chaque étudiant camerounais.",
    privacy_label: "Confidentialité & RGPD", // Ajouté
    privacy_desc: "Comment nous protégeons vos données personnelles et académiques.", // Ajouté
    cta: "Découvrir notre histoire",
  },

  /** Dropdown Contact */
  nav_contact: {
    title: "Contact",
    rdv_label: "Prendre un rendez-vous",
    rdv_desc: "Consultation gratuite de 30 minutes avec un conseiller.",
    whatsapp_label: "WhatsApp",
    whatsapp_desc: "Réponse en moins de 2h · +237 699 450 984",
    newsletter_title: "Restez informé",
    newsletter_desc: "Nouvelles bourses, dates limites et conseils chaque semaine.",
    newsletter_placeholder: "votre@email.com",
    newsletter_btn: "S'abonner",
  },

  // fr.ts
nav_home: {
  title: "Accueil",
  sections: [
    { id: "hero",      label: "Présentation",      icon: "🏠", href: "/#hero"      },
    { id: "bourses",   label: "Bourses vedettes",   icon: "🎓", href: "/#bourses"   },
    { id: "stats",     label: "Nos chiffres",       icon: "📊", href: "/#stats"     },
    { id: "temoignages", label: "Témoignages",      icon: "⭐", href: "/#temoignages"},
    { id: "contact",   label: "Nous contacter",     icon: "✉️", href: "/#contact"   },
  ]
},


  hero_carousel: {
    slides: [
      {
        id: "slide-1",
        badge: "🎓 Bourses 2025 – 2026 ouvertes",
        title: "Réalisez vos rêves\nd'études en Chine\n& Allemagne",
        subtitle: "Accompagnement complet, visa en 3 semaines et garantie Satisfait ou Remboursé. Rejoignez +500 étudiants accompagnés.",
        ctas: [
          { label: "Trouver ma bourse", href: "/bourses", variant: "gold" },
          { label: "Prendre RDV",       href: "/contact", variant: "navy" },
        ],
        stats: [
          { value: "500+", label: "Étudiants" },
          { value: "3 sem", label: "Délai visa" },
          { value: "100%", label: "Réussite" },
        ],
        scholarship: {
          flag: "🇨🇳",
          country: "Chine",
          title: "Bourse CSC — Gouvernement Chinois",
          level: "Licence · Master · Doctorat",
          coverage: "Bourse complète",
          deadline: "Clôture : 31 mars 2026",
          href: "/bourses?pays=chine",
          cta: "Voir cette bourse →",
        },
      },
      {
        id: "slide-2",
        badge: "⭐ +500 étudiants nous font confiance",
        title: "Une équipe locale\nqui connaît\nvos démarches",
        subtitle: "Basés à Yaoundé, nous accompagnons chaque étudiant camerounais de A à Z : dossier, visa, logement, orientation.",
        ctas: [
          { label: "Voir les témoignages", href: "/#temoignages", variant: "gold" },
          { label: "Nos services",         href: "/services",     variant: "navy" },
        ],
        stats: [
          { value: "5+", label: "Ans d'expérience" },
          { value: "25+", label: "Universités" },
          { value: "2",   label: "Pays couverts" },
        ],
        scholarship: {
          flag: "🇩🇪",
          country: "Allemagne",
          title: "Bourse DAAD — Échanges Académiques",
          level: "Master · Doctorat",
          coverage: "Partielle + frais réduits",
          deadline: "Clôture : 15 avril 2026",
          href: "/bourses?pays=allemagne",
          cta: "Voir cette bourse →",
        },
      },
      {
        id: "slide-3",
        badge: "🚀 Places limitées — Dossiers en cours",
        title: "Les meilleures\nuniversités vous\nouvrent leurs portes",
        subtitle: "Chine : Top 10 mondial, médecine, ingénierie, management. Allemagne : DAAD, master en anglais, frais réduits.",
        ctas: [
          { label: "Bourses Chine 🇨🇳",    href: "/bourses?pays=chine",     variant: "gold" },
          { label: "Bourses Allemagne 🇩🇪", href: "/bourses?pays=allemagne", variant: "navy" },
        ],
        stats: [
          { value: "50+", label: "Bourses actives" },
          { value: "CSC", label: "Partenaire officiel" },
          { value: "DAAD", label: "Réseau Allemagne" },
        ],
        scholarship: {
          flag: "🌍",
          country: "Chine & Allemagne",
          title: "Nouvelles bourses disponibles",
          level: "Tous niveaux",
          coverage: "Complète ou partielle",
          deadline: "Candidatez maintenant",
          href: "/bourses",
          cta: "Voir toutes les bourses →",
        },
      },
    ],
  },
 // Dans src/dictionaries/data/static/layout/fr.ts
  errors: {
    notFound: {
      title: "Page introuvable",
      desc: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
      btn: "Retour à l'accueil"
    },
    global: {
      title: "Oups ! Quelque chose s'est mal passé",
      desc: "Une erreur inattendue est survenue. Notre équipe technique a été alertée.",
      btnReset: "Réessayer",
      btnHome: "Retour à l'accueil"
    }
  },
  widgets: {
    whatsapp: {
      helpText: "Besoin d'aide ?"
    }
  },
  common: {
  loading: "Chargement en cours...",
  error: "Une erreur est survenue",
},
};

