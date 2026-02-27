// src/repositories/newsletter.repository.ts
// ==============================================================================
//  Repository — Newsletter & Annonces
//  12 endpoints : 2 publics + 10 admin
// ==============================================================================

import { api } from "@/lib/api-client";
import type {
  NewsletterSubscriber,
  NewsletterInscriptionPayload,
  NewsletterDesinscriptionPayload,
  Announcement,
  CreateAnnouncementPayload,
  UpdateAnnouncementPayload,
  SendAnnouncementResponse,
  PaginatedSubscriberResponse,
  PaginatedAnnouncementResponse,
  SubscriberFilters,
  AnnouncementFilters,
} from "@/types/api/newsletter.types";

// ==============================================================================
//  Endpoints PUBLICS (vitrine)
// ==============================================================================

export const newsletterRepository = {
  /**
   * POST /api/newsletter/inscription
   * S'inscrire à la newsletter
   */
  subscribe: (payload: NewsletterInscriptionPayload): Promise<{ detail: string }> => {
    return api.post<{ detail: string }>("/newsletter/inscription", payload);
  },

  /**
   * POST /api/newsletter/desinscription
   * Se désinscrire
   */
  unsubscribe: (payload: NewsletterDesinscriptionPayload): Promise<{ detail: string }> => {
    return api.post<{ detail: string }>("/newsletter/desinscription", payload);
  },

  // ==============================================================================
  //  Admin — Abonnés
  // ==============================================================================

  /**
   * GET /api/admin/newsletter/abonnes
   * Liste des abonnés (filtres : actif, pays, niveau)
   */
  adminGetSubscribers: (filters?: SubscriberFilters): Promise<PaginatedSubscriberResponse> => {
    const params: Record<string, string> = {};
    if (filters?.est_actif !== undefined) params.est_actif = String(filters.est_actif);
    if (filters?.pays) params.pays = filters.pays;
    if (filters?.niveau_etudes) params.niveau_etudes = filters.niveau_etudes;
    if (filters?.destination_souhaitee) params.destination_souhaitee = filters.destination_souhaitee;
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = String(filters.page);
    if (filters?.page_size) params.page_size = String(filters.page_size);
    if (filters?.ordering) params.ordering = filters.ordering;

    return api.get<PaginatedSubscriberResponse>("/admin/newsletter/abonnes", { params });
  },

  /**
   * GET /api/admin/newsletter/abonnes/{id}
   * Détail d'un abonné
   */
  adminGetSubscriberById: (id: string): Promise<NewsletterSubscriber> => {
    return api.get<NewsletterSubscriber>(`/admin/newsletter/abonnes/${id}`);
  },

  /**
   * DELETE /api/admin/newsletter/abonnes/{id}
   * Supprimer un abonné
   */
  adminDeleteSubscriber: (id: string): Promise<void> => {
    return api.delete<void>(`/admin/newsletter/abonnes/${id}`);
  },

  // ==============================================================================
  //  Admin — Annonces
  // ==============================================================================

  /**
   * GET /api/admin/annonces
   * Liste des annonces
   */
  adminGetAnnouncements: (filters?: AnnouncementFilters): Promise<PaginatedAnnouncementResponse> => {
    const params: Record<string, string> = {};
    if (filters?.statut) params.statut = filters.statut;
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = String(filters.page);
    if (filters?.page_size) params.page_size = String(filters.page_size);
    if (filters?.ordering) params.ordering = filters.ordering;

    return api.get<PaginatedAnnouncementResponse>("/admin/annonces", { params });
  },

  /**
   * GET /api/admin/annonces/{id}
   * Détail avec bourses liées
   */
  adminGetAnnouncementById: (id: string): Promise<Announcement> => {
    return api.get<Announcement>(`/admin/annonces/${id}`);
  },

  /**
   * POST /api/admin/annonces
   * Créer une annonce (brouillon)
   */
  adminCreateAnnouncement: (payload: CreateAnnouncementPayload): Promise<Announcement> => {
    return api.post<Announcement>("/admin/annonces", payload);
  },

  /**
   * PUT /api/admin/annonces/{id}
   * Modifier complètement
   */
  adminUpdateAnnouncement: (id: string, payload: CreateAnnouncementPayload): Promise<Announcement> => {
    return api.put<Announcement>(`/admin/annonces/${id}`, payload);
  },

  /**
   * PATCH /api/admin/annonces/{id}
   * Modifier partiellement
   */
  adminPatchAnnouncement: (id: string, payload: UpdateAnnouncementPayload): Promise<Announcement> => {
    return api.patch<Announcement>(`/admin/annonces/${id}`, payload);
  },

  /**
   * DELETE /api/admin/annonces/{id}
   * Supprimer
   */
  adminDeleteAnnouncement: (id: string): Promise<void> => {
    return api.delete<void>(`/admin/annonces/${id}`);
  },

  /**
   * POST /api/admin/annonces/{id}/envoyer
   * Envoyer à tous les abonnés actifs (simulé)
   */
  adminSendAnnouncement: (id: string): Promise<SendAnnouncementResponse> => {
    return api.post<SendAnnouncementResponse>(`/admin/annonces/${id}/envoyer`, {});
  },
};