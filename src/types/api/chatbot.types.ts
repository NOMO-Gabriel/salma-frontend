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

/** Suggestion de FAQ liée */
export interface ChatbotSuggestion {
  question: string;
  id: string;
}

/** Réponse du chatbot */
export interface ChatbotMessageResponse {
  reponse: string;
  source: "faq" | "fallback";
  faq_id: string | null;
  suggestions: ChatbotSuggestion[];
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