// FILE: src/types/index.ts
// ==============================================================================

// --- Auth ---
export * from "@/types/api/auth.types"; // Retrait du mot-clé 'type' pour exporter les enums/consts si présents

// --- Bourses ---
export * from "@/types/api/scholarship.types"; // CRITIQUE : exporte toFieldVisibilityMap et SCHOLARSHIP_VISIBILITY_FIELDS

// --- Médias ---
export * from "@/types/api/media.types";

// --- CMS ---
export * from "@/types/api/cms.types";

// --- Contact ---
export * from "@/types/api/contact.types";

// --- Newsletter ---
export * from "@/types/api/newsletter.types";

// --- Témoignages ---
export * from "@/types/api/testimonial.types";

// --- Chatbot ---
export * from "@/types/api/chatbot.types";

// --- Services ---
export * from "@/types/api/service.types";

// --- KPI ---
export * from "@/types/api/kpi.types";


// pages
// --- Home ---
export * from "@/types/pages/home.types";

// navbar
export * from "@/types/pages/nav.types"

// HeroCaroussel
export * from "@/types/pages/hero.types"

// Contact
export * from "@/types/pages/contact.types"

// Services
export * from "@/types/pages/services.types"

// Bourses
export * from "@/types/pages/bourses.types"

//Footer
export * from "@/types/pages/footer.types";

// UI Components
export * from "@/types/ui/button.types";
export * from  "@/types/ui/badge.types";
export * from "@/types/ui/section-title.types";
export * from "@/types/ui/scholarship-card.types"
export * from "@/types/ui/newsletter-form.types";
export * from "@/types/ui/theme-switcher.types";
export * from "@/types/ui/language-switcher.types";
export * from "@/types/ui/cookie-banner.types";
export * from "@/types/ui/whatsapp-button.types";
export * from "@/types/ui/chatbot-widget.types";