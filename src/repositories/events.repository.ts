
// src/repositories/events.repository.ts
// ==============================================================================
//  Tracking silencieux des événements visiteurs (côté client uniquement)
// ==============================================================================
import { api as apiClient } from "@/lib/api-client";
import type { VisitorEventPayload } from "@/types/api/kpi.types";

const TRACKING_ENABLED = process.env.NEXT_PUBLIC_ENABLE_TRACKING === "true";

export const eventsRepository = {
  /**
   * POST /api/evenements — enregistrer un événement visiteur
   * Silencieux : ne throw jamais (échec ignoré pour ne pas impacter l'UX)
   */
  track: async (payload: VisitorEventPayload): Promise<void> => {
    if (!TRACKING_ENABLED) return;
    try {
      await apiClient.post("/evenements", payload);
    } catch {
      // Tracking silencieux — on n'impacte jamais l'UX en cas d'erreur
    }
  },

  /** Raccourcis pour les événements les plus fréquents */
  trackPageView: (page: string) =>
    eventsRepository.track({ type: "PAGE_VIEW", page }),

  trackScholarshipView: (bourseId: string, page?: string) =>
    eventsRepository.track({ type: "BOURSE_VUE", bourse_id: bourseId, page }),

  trackContactSubmit: (bourseId?: string) =>
    eventsRepository.track({ type: "CONTACT_SOUMIS", bourse_id: bourseId }),

  trackNewsletterSignup: () =>
    eventsRepository.track({ type: "NEWSLETTER_INSCRIPTION" }),

  trackWhatsappClick: (bourseId?: string) =>
    eventsRepository.track({ type: "WHATSAPP_CLIC", bourse_id: bourseId }),

  trackChatbotOpen: () =>
    eventsRepository.track({ type: "CHATBOT_OUVERT" }),

  trackAppointmentSubmit: () =>
    eventsRepository.track({ type: "RENDEZ_VOUS_SOUMIS" }),
};