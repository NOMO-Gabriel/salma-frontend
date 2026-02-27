// src/repositories/newsletter.repository.ts
// ==============================================================================
import { api } from "@/lib/api-client";
import type {
  NewsletterSubscriber,
  SubscribePayload,
  Announcement,
  CreateAnnouncementPayload,
  SubscriberListFilters,
} from "@/types/api/newsletter.types";
import type { PaginatedResponse } from "@/types";

export const newsletterRepository = {
  /** POST /api/newsletter/inscription — public */
  subscribe: (payload: SubscribePayload): Promise<{ detail: string }> =>
    api.post("/newsletter/inscription", payload),

  /** GET /api/admin/newsletter/abonnes */
  adminGetSubscribers: (filters?: SubscriberListFilters): Promise<PaginatedResponse<NewsletterSubscriber>> => {
    const params: Record<string, string> = {};
    if (filters?.statut) params.statut = filters.statut;
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = String(filters.page);
    return api.get("/admin/newsletter/abonnes", { params });
  },

  /** DELETE /api/admin/newsletter/abonnes/{id} */
  adminDeleteSubscriber: (id: string): Promise<void> =>
    api.delete(`/admin/newsletter/abonnes/${id}`),

  /** GET /api/admin/newsletter/annonces */
  adminGetAnnouncements: (): Promise<Announcement[]> =>
    api.get("/admin/newsletter/annonces"),

  /** POST /api/admin/newsletter/annonces */
  adminCreateAnnouncement: (payload: CreateAnnouncementPayload): Promise<Announcement> =>
    api.post("/admin/newsletter/annonces", payload),

  /** POST /api/admin/newsletter/annonces/{id}/envoyer */
  adminSendAnnouncement: (id: string): Promise<{ detail: string }> =>
    api.post(`/admin/newsletter/annonces/${id}/envoyer`, {}),

  /** DELETE /api/admin/newsletter/annonces/{id} */
  adminDeleteAnnouncement: (id: string): Promise<void> =>
    api.delete(`/admin/newsletter/annonces/${id}`),
};

