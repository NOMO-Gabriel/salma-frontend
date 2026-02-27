// src/dictionaries/data/newsletter.data-dictionary.ts
// ==============================================================================
//  Dictionnaire de données — Newsletter & Annonces
//
//  RÈGLE ARCHITECTURE :
//  Server Components → data-dictionary → repository → api-client → Django
//
//  Les composants ne connaissent QUE ce fichier.
// ==============================================================================

import { newsletterRepository } from "@/repositories/newsletter.repository";
import type {
  NewsletterInscriptionPayload,
  NewsletterDesinscriptionPayload,
  NewsletterSubscriber,
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
//  VITRINE — Inscription / Désinscription
// ==============================================================================

export const newsletterDictionary = {
  /**
   * S'inscrire à la newsletter depuis la vitrine.
   * Utilisé par : footer, popup exit-intent
   */
  subscribe: (payload: NewsletterInscriptionPayload): Promise<{ detail: string }> => {
    return newsletterRepository.subscribe(payload);
  },

  /**
   * Se désinscrire.
   * Utilisé par : lien de désinscription
   */
  unsubscribe: (payload: NewsletterDesinscriptionPayload): Promise<{ detail: string }> => {
    return newsletterRepository.unsubscribe(payload);
  },

  // ==============================================================================
  //  ADMIN — Dashboard
  // ==============================================================================

  admin: {
    // --- Abonnés ---

    /**
     * Liste des abonnés.
     * Utilisé par : /admin/newsletter/abonnes
     */
    getSubscribers: (filters?: SubscriberFilters): Promise<PaginatedSubscriberResponse> => {
      return newsletterRepository.adminGetSubscribers(filters);
    },

    /**
     * Détail d'un abonné.
     */
    getSubscriberById: (id: string): Promise<NewsletterSubscriber> => {
      return newsletterRepository.adminGetSubscriberById(id);
    },

    /**
     * Supprimer un abonné.
     */
    deleteSubscriber: (id: string): Promise<void> => {
      return newsletterRepository.adminDeleteSubscriber(id);
    },

    // --- Annonces ---

    /**
     * Liste des annonces.
     * Utilisé par : /admin/newsletter/annonces
     */
    getAnnouncements: (filters?: AnnouncementFilters): Promise<PaginatedAnnouncementResponse> => {
      return newsletterRepository.adminGetAnnouncements(filters);
    },

    /**
     * Détail d'une annonce.
     */
    getAnnouncementById: (id: string): Promise<Announcement> => {
      return newsletterRepository.adminGetAnnouncementById(id);
    },

    /**
     * Créer une annonce (brouillon).
     */
    createAnnouncement: (payload: CreateAnnouncementPayload): Promise<Announcement> => {
      return newsletterRepository.adminCreateAnnouncement(payload);
    },

    /**
     * Modifier complètement une annonce.
     */
    updateAnnouncement: (id: string, payload: CreateAnnouncementPayload): Promise<Announcement> => {
      return newsletterRepository.adminUpdateAnnouncement(id, payload);
    },

    /**
     * Modifier partiellement.
     */
    patchAnnouncement: (id: string, payload: UpdateAnnouncementPayload): Promise<Announcement> => {
      return newsletterRepository.adminPatchAnnouncement(id, payload);
    },

    /**
     * Supprimer une annonce.
     */
    deleteAnnouncement: (id: string): Promise<void> => {
      return newsletterRepository.adminDeleteAnnouncement(id);
    },

    /**
     * Envoyer une annonce à tous les abonnés actifs (simulé).
     */
    sendAnnouncement: (id: string): Promise<SendAnnouncementResponse> => {
      return newsletterRepository.adminSendAnnouncement(id);
    },
  },
};