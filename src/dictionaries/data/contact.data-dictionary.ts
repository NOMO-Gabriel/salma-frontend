// src/dictionaries/data/contact.data-dictionary.ts
// ==============================================================================
//  Dictionnaire de données — Demandes de Contact
//
//  RÈGLE ARCHITECTURE :
//  Server Components → data-dictionary → repository → api-client → Django
//
//  Les composants ne connaissent QUE ce fichier.
// ==============================================================================

import {
  contactPublicRepository,
  contactAdminRepository,
} from "@/repositories/contact.repository";
import type {
  ContactRequest,
  CreateContactPayload,
  UpdateContactPayload,
  PaginatedContactResponse,
  ContactFilters,
} from "@/types/api/contact.types";

// ==============================================================================
//  VITRINE — Soumission de contact / rendez-vous
// ==============================================================================

export const contactDictionary = {
  /**
   * Soumettre une demande de contact depuis la vitrine.
   * Utilisé par : /contact (ContactForm)
   */
  submit: (payload: CreateContactPayload): Promise<ContactRequest> => {
    return contactPublicRepository.submit(payload);
  },

  /**
   * Soumettre une demande de rendez-vous.
   * Utilise le même endpoint que le contact, avec un message préfixé.
   * Utilisé par : formulaire de prise de RDV
   */
  submitAppointment: (payload: CreateContactPayload): Promise<ContactRequest> => {
    return contactPublicRepository.submit({
      ...payload,
      message: `[RENDEZ-VOUS] ${payload.message}`,
    });
  },

  // ==============================================================================
  //  ADMIN — Dashboard
  // ==============================================================================

  admin: {
    /**
     * Liste des demandes de contact.
     * Utilisé par : /admin/contacts (tableau)
     */
    getList: (filters?: ContactFilters): Promise<PaginatedContactResponse> => {
      return contactAdminRepository.getList(filters);
    },

    /**
     * Détail d'une demande avec bourses associées.
     * Utilisé par : /admin/contacts/[id]
     */
    getById: (id: string): Promise<ContactRequest> => {
      return contactAdminRepository.getById(id);
    },

    /**
     * Marquer comme lu.
     */
    markAsRead: (id: string): Promise<ContactRequest> => {
      return contactAdminRepository.patch(id, { est_lu: true });
    },

    /**
     * Ajouter une note admin.
     */
    addNote: (id: string, notes: string): Promise<ContactRequest> => {
      return contactAdminRepository.patch(id, { notes_admin: notes });
    },

    /**
     * Modifier partiellement (lu + notes).
     */
    patch: (id: string, payload: UpdateContactPayload): Promise<ContactRequest> => {
      return contactAdminRepository.patch(id, payload);
    },

    /**
     * Supprimer une demande.
     */
    delete: (id: string): Promise<void> => {
      return contactAdminRepository.delete(id);
    },

    /**
     * Compter les contacts non lus (pour badge notification).
     */
    getUnreadCount: async (): Promise<number> => {
      const response = await contactAdminRepository.getList({
        est_lu: false,
        page_size: 1,
      });
      return response.count;
    },
  },
};