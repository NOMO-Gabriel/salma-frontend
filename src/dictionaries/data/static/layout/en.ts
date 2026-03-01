// src/dictionaries/data/static/layout/en.ts
// =============================================================================
//  Layout EN — Navigation content + footer + cookies
//  Structure mirrors NavContent exactly (nav.types.ts)
// =============================================================================

export const enLayout = {
  // ── Simple keys (Footer, Cookies, basic nav) ─────────────────────────────
  nav: {
    home: "Home",
    services: "Services",
    bourses: "Scholarships",
    about: "About",
    contact: "Contact",
    admin: "Admin",
  },
  footer: {
    tagline:
      "Your trusted partner for international mobility to China and Germany.",
    slogan: "Satisfied or Refunded — Excellence serving your future.",
    links: {
      title: "Navigation",
      home: "Home",
      bourses: "Scholarships",
      services: "Services",
      about: "About",
      contact: "Contact",
    },
    contact: {
      title: "Contact Us",
      address: "Montée Anne rouge, Kadji Building, Yaoundé",
      phones: "+237 6 99 45 09 84 / 6 51 74 03 28",
      email: "secretariatagtechnologies@gmail.com",
    },
    rights: "© 2026 SALMA by AG Technologies. All rights reserved.",
  },
  cookies: {
    text: "We use cookies to improve your experience. Check our",
    link: "privacy policy",
    accept: "Accept",
    decline: "Decline",
  },

  // ── Navigation dropdowns (NavContent) ────────────────────────────────────

  /** Scholarships dropdown */
  nav_bourses: {
    title: "Scholarships",
    china_label: "Scholarships in China",
    china_desc:
      "Chinese public universities, full or partial funding. Fields: medicine, engineering, management.",
    china_cta: "Explore China scholarships",
    germany_label: "Scholarships in Germany",
    germany_desc:
      "DAAD programs, English-language Masters, reduced tuition. Ideal for scientific profiles.",
    germany_cta: "Explore Germany scholarships",
  },

  /** Services dropdown */
  nav_services: {
    title: "Services",
    items: [
      {
        id: "visa-etude",
        label: "Study Visa",
        desc: "Full application support, guaranteed admission.",
        icon: "🎓",
        href: "/services#visa-etude",
      },
      {
        id: "visa-touriste",
        label: "Tourist Visa",
        desc: "Departure in 3 weeks flat.",
        icon: "✈️",
        href: "/services#visa-touriste",
      },
      {
        id: "visa-travail",
        label: "Work Visa",
        desc: "Professional opportunities abroad.",
        icon: "💼",
        href: "/services#visa-travail",
      },
      {
        id: "assurance",
        label: "Travel Insurance",
        desc: "Health coverage compliant with consulates.",
        icon: "🛡️",
        href: "/services#assurance",
      },
    ],
  },

  /** About dropdown */
  nav_about: {
    title: "About",
    agency_label: "AG Technologies",
    agency_desc:
      "International mobility firm since 2019, based in Yaoundé, Cameroon.",
    mission_label: "Our mission",
    mission_desc:
      "Making studying abroad accessible to every Cameroonian student.",
    cta: "Discover our story",
  },

  /** Contact dropdown */
  nav_contact: {
    title: "Contact",
    rdv_label: "Book an appointment",
    rdv_desc: "Free 30-minute consultation with an advisor.",
    whatsapp_label: "WhatsApp",
    whatsapp_desc: "Reply within 2h · +237 699 450 984",
    newsletter_title: "Stay informed",
    newsletter_desc: "New scholarships, deadlines and weekly tips.",
    newsletter_placeholder: "your@email.com",
    newsletter_btn: "Subscribe",
  },
  // en.ts
nav_home: {
  title: "Home",
  sections: [
    { id: "hero",      label: "Overview",           icon: "🏠", href: "/#hero"      },
    { id: "bourses",   label: "Featured scholarships", icon: "🎓", href: "/#bourses" },
    { id: "stats",     label: "Our numbers",        icon: "📊", href: "/#stats"     },
    { id: "temoignages", label: "Testimonials",     icon: "⭐", href: "/#temoignages"},
    { id: "contact",   label: "Contact us",         icon: "✉️", href: "/#contact"   },
  ]
}
};