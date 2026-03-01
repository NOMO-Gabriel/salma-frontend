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
}
};