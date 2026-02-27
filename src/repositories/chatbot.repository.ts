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
    apiClient.post("/chatbot/message", payload),

  /** GET /api/admin/chatbot/questions */
  adminGetFaqs: (): Promise<FaqEntry[]> =>
    apiClient.get<FaqEntry[]>("/admin/chatbot/questions"),

  /** GET /api/admin/chatbot/questions/{id} */
  adminGetFaq: (id: string): Promise<FaqEntry> =>
    apiClient.get(`/admin/chatbot/questions/${id}`),

  /** POST /api/admin/chatbot/questions */
  adminCreateFaq: (payload: CreateFaqEntryPayload): Promise<FaqEntry> =>
    apiClient.post("/admin/chatbot/questions", payload),

  /** PATCH /api/admin/chatbot/questions/{id} */
  adminUpdateFaq: (id: string, payload: UpdateFaqEntryPayload): Promise<FaqEntry> =>
    apiClient.patch(`/admin/chatbot/questions/${id}`, payload),

  /** DELETE /api/admin/chatbot/questions/{id} */
  adminDeleteFaq: (id: string): Promise<void> =>
    apiClient.delete(`/admin/chatbot/questions/${id}`),
};