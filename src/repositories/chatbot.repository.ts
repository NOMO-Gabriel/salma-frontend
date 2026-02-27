
// src/repositories/chatbot.repository.ts
// ==============================================================================
import { api as apiClient } from "@/lib/api-client";
import type {
  FaqEntry,
  ChatbotQueryPayload,
  ChatbotResponse,
  CreateFaqPayload,
  UpdateFaqPayload,
} from "@/types/api/chatbot.types";

export const chatbotRepository = {
  /** POST /api/chatbot/query — interroger le chatbot (public) */
  query: (payload: ChatbotQueryPayload): Promise<ChatbotResponse> =>
    apiClient.post("/chatbot/query", payload),

  /** GET /api/admin/chatbot/questions */
  adminGetFaqs: (): Promise<FaqEntry[]> =>
    apiClient.get<FaqEntry[]>("/admin/chatbot/questions"),

  /** GET /api/admin/chatbot/questions/{id} */
  adminGetFaq: (id: string): Promise<FaqEntry> =>
    apiClient.get(`/admin/chatbot/questions/${id}`),

  /** POST /api/admin/chatbot/questions */
  adminCreateFaq: (payload: CreateFaqPayload): Promise<FaqEntry> =>
    apiClient.post("/admin/chatbot/questions", payload),

  /** PATCH /api/admin/chatbot/questions/{id} */
  adminUpdateFaq: (id: string, payload: UpdateFaqPayload): Promise<FaqEntry> =>
    apiClient.patch(`/admin/chatbot/questions/${id}`, payload),

  /** DELETE /api/admin/chatbot/questions/{id} */
  adminDeleteFaq: (id: string): Promise<void> =>
    apiClient.delete(`/admin/chatbot/questions/${id}`),
};
