// src/types/api/chatbot.types.ts
// ==============================================================================
//  Types TypeScript — Module Chatbot IA
//  Calque sur FaqEntry Django + ChatbotMessageSerializer + views
// ==============================================================================

// --- FaqEntry (admin CRUD) ---------------------------------------------------

export interface FaqEntry {
  id: string;
  question_fr: string;
  question_en: string;
  reponse_fr: string;
  reponse_en: string;
  categorie: string;
  ordre_affichage: number;
  est_actif: boolean;
}

export interface CreateFaqEntryPayload {
  question_fr: string;
  question_en: string;
  reponse_fr: string;
  reponse_en: string;
  categorie?: string;
  ordre_affichage?: number;
  est_actif?: boolean;
}

export type UpdateFaqEntryPayload = Partial<CreateFaqEntryPayload>;

// --- Chatbot message (public) ------------------------------------------------

/** POST /api/chatbot/message — payload */
export interface ChatbotMessagePayload {
  message: string;
  langue?: "fr" | "en";
}

/** Suggestion de question liée (cliquable) */
export interface ChatbotSuggestion {
  question: string;
  id: string;
}

/** CTA contextuel retourné par le backend */
export interface ChatbotCTA {
  /** Identifiant unique (ex: "rdv", "whatsapp", "bourses_chine") */
  id: string;
  /** Label localisé avec emoji (ex: "📅 Prendre rendez-vous") */
  label: string;
  /** URL de destination (route interne ou lien externe) */
  url: string;
  /** Type : "conversion" (RDV, WhatsApp, Newsletter) ou "navigation" (lien page) */
  type: "conversion" | "navigation";
}

/** Réponse complète du chatbot */
export interface ChatbotMessageResponse {
  /** Texte de la réponse Gemini */
  reponse: string;
  /** Source de la réponse */
  source: "gemini-ai" | "faq" | "fallback";
  /** Suggestions de questions liées (cliquables) */
  suggestions: ChatbotSuggestion[];
  /** 3 CTA contextuels (toujours exactement 3) */
  ctas: ChatbotCTA[];
}

// --- Réponse paginée admin ---------------------------------------------------

export interface PaginatedFaqResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: FaqEntry[];
}

// --- Filtres admin -----------------------------------------------------------

export interface FaqFilters {
  categorie?: string;
  est_actif?: boolean;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}