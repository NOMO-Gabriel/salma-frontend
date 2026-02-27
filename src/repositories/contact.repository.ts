// src/repositories/contact.repository.ts
// ==============================================================================
//  Repository — Demandes de Contact
//  5 endpoints : 1 public + 4 admin
// ==============================================================================

import { api } from "@/lib/api-client";
import type {
  ContactRequest,
  CreateContactPayload,
  UpdateContactPayload,
  PaginatedContactResponse,
  ContactFilters,
} from "@/types/api/contact.types";

const PUBLIC = "/contact";
const ADMIN = "/admin/contacts";

// ==============================================================================
//  Endpoint PUBLIC (vitrine)
// ==============================================================================

export const contactPublicRepository = {
  /**
   * POST /api/contact
   * Soumettre une demande de contact (+ bourses optionnelles + newsletter)
   */
  submit: (payload: CreateContactPayload): Promise<ContactRequest> => {
    return api.post<ContactRequest>(PUBLIC, payload);
  },
};

// ==============================================================================
//  Endpoints ADMIN (dashboard)
// ==============================================================================

export const contactAdminRepository = {
  /**
   * GET /api/admin/contacts
   * Liste des demandes (filtres : lu/non lu)
   */
  getList: (filters?: ContactFilters): Promise<PaginatedContactResponse> => {
    const params: Record<string, string> = {};
    if (filters?.est_lu !== undefined) params.est_lu = String(filters.est_lu);
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = String(filters.page);
    if (filters?.page_size) params.page_size = String(filters.page_size);
    if (filters?.ordering) params.ordering = filters.ordering;

    return api.get<PaginatedContactResponse>(ADMIN, { params });
  },

  /**
   * GET /api/admin/contacts/{id}
   * Détail avec bourses associées
   */
  getById: (id: string): Promise<ContactRequest> => {
    return api.get<ContactRequest>(`${ADMIN}/${id}`);
  },

  /**
   * PATCH /api/admin/contacts/{id}
   * Marquer lu, ajouter notes
   */
  patch: (id: string, payload: UpdateContactPayload): Promise<ContactRequest> => {
    return api.patch<ContactRequest>(`${ADMIN}/${id}`, payload);
  },

  /**
   * DELETE /api/admin/contacts/{id}
   * Supprimer une demande
   */
  delete: (id: string): Promise<void> => {
    return api.delete<void>(`${ADMIN}/${id}`);
  },
};