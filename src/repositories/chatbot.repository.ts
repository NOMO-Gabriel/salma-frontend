// src/repositories/chatbot.repository.ts
import { api as apiClient } from "@/lib/api-client";
import type {
  FaqEntry,
  ChatbotMessagePayload,   // Au lieu de ChatbotQueryPayload
  ChatbotMessageResponse,  // Au lieu de ChatbotResponse
  CreateFaqEntryPayload,   // Au lieu de CreateFaqPayload
  UpdateFaqEntryPayload,   // Au lieu de UpdateFaqPayload
} from "@/types/api/chatbot.types";

export const chatbotRepository = {
  /** POST /api/chatbot/message — interroger le chatbot (public) */
  query: (payload: ChatbotMessagePayload): Promise<ChatbotMessageResponse> =>
    apiClient.post("/chatbot/message/", payload), // Ajout du slash final

  /** GET /api/admin/faq/ */
  adminGetFaqs: (): Promise<FaqEntry[]> =>
    apiClient.get<FaqEntry[]>("/admin/faq/"), // Changé chatbot/questions -> faq/

  /** GET /api/admin/faq/{id}/ */
  adminGetFaq: (id: string): Promise<FaqEntry> =>
    apiClient.get(`/admin/faq/${id}/`),

  /** POST /api/admin/faq/ */
  adminCreateFaq: (payload: CreateFaqEntryPayload): Promise<FaqEntry> =>
    apiClient.post("/admin/faq/", payload),

  /** PATCH /api/admin/faq/{id}/ */
  adminUpdateFaq: (id: string, payload: UpdateFaqEntryPayload): Promise<FaqEntry> =>
    apiClient.patch(`/admin/faq/${id}/`, payload),

  /** DELETE /api/admin/faq/{id}/ */
  adminDeleteFaq: (id: string): Promise<void> =>
    apiClient.delete(`/admin/faq/${id}/`),
};