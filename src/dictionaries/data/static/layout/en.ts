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
    privacy_label: "Privacy & GDPR", // Ajouté
    privacy_desc: "How we protect your personal and academic data.", // Ajouté
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
},


  hero_carousel: {
    slides: [
      {
        id: "slide-1",
        badge: "🎓 Scholarships 2025 – 2026 now open",
        title: "Achieve your dream\nof studying in China\n& Germany",
        subtitle: "Full support, visa in 3 weeks and Satisfaction Guaranteed. Join 500+ students we've helped succeed.",
        ctas: [
          { label: "Find my scholarship", href: "/bourses", variant: "gold" },
          { label: "Book a consultation", href: "/contact", variant: "navy" },
        ],
        stats: [
          { value: "500+", label: "Students" },
          { value: "3 wks", label: "Visa time" },
          { value: "100%", label: "Success rate" },
        ],
        scholarship: {
          flag: "🇨🇳",
          country: "China",
          title: "CSC Scholarship — Chinese Government",
          level: "Bachelor · Master · PhD",
          coverage: "Full scholarship",
          deadline: "Deadline: March 31, 2026",
          href: "/bourses?pays=chine",
          cta: "View this scholarship →",
        },
      },
      {
        id: "slide-2",
        badge: "⭐ 500+ students trust us",
        title: "A local team\nthat knows\nyour process",
        subtitle: "Based in Yaoundé, we guide every Cameroonian student from A to Z: application, visa, housing, orientation.",
        ctas: [
          { label: "See testimonials", href: "/#temoignages", variant: "gold" },
          { label: "Our services",    href: "/services",     variant: "navy" },
        ],
        stats: [
          { value: "5+", label: "Years of experience" },
          { value: "25+", label: "Universities" },
          { value: "2",   label: "Countries" },
        ],
        scholarship: {
          flag: "🇩🇪",
          country: "Germany",
          title: "DAAD Scholarship — Academic Exchange",
          level: "Master · PhD",
          coverage: "Partial + reduced fees",
          deadline: "Deadline: April 15, 2026",
          href: "/bourses?pays=allemagne",
          cta: "View this scholarship →",
        },
      },
      {
        id: "slide-3",
        badge: "🚀 Limited spots — Applications open",
        title: "The world's best\nuniversities are\nwaiting for you",
        subtitle: "China: Top 10 worldwide, medicine, engineering, management. Germany: DAAD, English Masters, reduced tuition.",
        ctas: [
          { label: "China scholarships 🇨🇳",   href: "/bourses?pays=chine",     variant: "gold" },
          { label: "Germany scholarships 🇩🇪",  href: "/bourses?pays=allemagne", variant: "navy" },
        ],
        stats: [
          { value: "50+", label: "Active scholarships" },
          { value: "CSC", label: "Official partner" },
          { value: "DAAD", label: "Germany network" },
        ],
        scholarship: {
          flag: "🌍",
          country: "China & Germany",
          title: "New scholarships available",
          level: "All levels",
          coverage: "Full or partial",
          deadline: "Apply now",
          href: "/bourses",
          cta: "View all scholarships →",
        },
      },
    ],
  },
};