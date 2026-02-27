/**
 * Données statiques pour le Layout (Navbar, Footer) - Français
 * Ce fichier sera utilisé si NEXT_PUBLIC_STATIC_CONTENT=true
 */
export const frLayout = {
  // Menu Bourses
  nav_bourses: {
    title: "Bourses",
    china_label: "Destination Chine",
    china_desc: "Accès aux 25 meilleures universités de l'Empire du Milieu.",
    china_cta: "Voir les opportunités",
    germany_label: "Destination Allemagne",
    germany_desc: "Expertise complète du système académique allemand.",
    germany_cta: "Explorer les bourses",
  },
  // Menu Services
  nav_services: {
    title: "Services",
    items: [
      { id: "s1", label: "Visa Étude", desc: "Admission garantie en 3 semaines", icon: "🎓", href: "/services/visa-etude" },
      { id: "s2", label: "Visa Touriste", desc: "Découvrez le monde sans stress", icon: "✈️", href: "/services/visa-touriste" },
      { id: "s3", label: "Visa Travail", desc: "Opportunités pro à l'international", icon: "💼", href: "/services/visa-travail" },
      { id: "s4", label: "Assurance", desc: "Protection voyage conforme", icon: "🛡️", href: "/services/assurance" },
    ]
  },
  // Menu Contact (Le bloc "Action" type Ecobank)
  nav_contact: {
    title: "Nous Contacter",
    rdv_label: "Prendre rendez-vous",
    rdv_desc: "Consultation gratuite en agence",
    whatsapp_label: "WhatsApp Direct",
    whatsapp_desc: "Réponse immédiate de nos experts",
    newsletter_title: "Alerte Bourses",
    newsletter_desc: "Ne ratez aucune opportunité.",
    newsletter_placeholder: "Votre email...",
    newsletter_btn: "S'abonner",
  }
  ,
  // Menu About 
  nav_about: {
    title: "À Propos",
    agency_label: "L'Agence",
    agency_desc: "AG Technologies : expert en mobilité académique depuis plus de 5 ans.",
    mission_label: "Notre Engagement",
    mission_desc: "Transparence totale et garantie de réussite pour votre projet.",
    cta: "Découvrir notre histoire",
  },
};