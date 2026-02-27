// src/repositories/testimonial.repository.ts
// ==============================================================================
//  Repository — Témoignages
//  8 endpoints : 2 publics + 6 admin
// ==============================================================================

import { api } from "@/lib/api-client";
import type {
  TestimonialPublic,
  TestimonialAdmin,
  SubmitTestimonialPayload,
  CreateTestimonialPayload,
  UpdateTestimonialPayload,
  PaginatedTestimonialResponse,
  TestimonialFilters,
} from "@/types/api/testimonial.types";

const PUBLIC = "/temoignages";
const ADMIN = "/admin/temoignages";

// ==============================================================================
//  Endpoints PUBLICS (vitrine)
// ==============================================================================

export const testimonialPublicRepository = {
  /**
   * GET /api/temoignages
   * Liste des témoignages approuvés et affichés
   */
  getList: (): Promise<TestimonialPublic[]> => {
    return api.get<TestimonialPublic[]>(PUBLIC, { revalidate: 300 });
  },

  /**
   * POST /api/temoignages
   * Soumettre un témoignage (formulaire site ou lien email)
   */
  submit: (payload: SubmitTestimonialPayload): Promise<{ detail: string }> => {
    return api.post<{ detail: string }>(PUBLIC, payload);
  },
};

// ==============================================================================
//  Endpoints ADMIN (dashboard)
// ==============================================================================

export const testimonialAdminRepository = {
  /**
   * GET /api/admin/temoignages
   * Liste complète (approuvés + en attente)
   */
  getList: (filters?: TestimonialFilters): Promise<PaginatedTestimonialResponse> => {
    const params: Record<string, string> = {};
    if (filters?.est_approuve !== undefined) params.est_approuve = String(filters.est_approuve);
    if (filters?.est_affiche_sur_site !== undefined) params.est_affiche_sur_site = String(filters.est_affiche_sur_site);
    if (filters?.source) params.source = filters.source;
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = String(filters.page);
    if (filters?.page_size) params.page_size = String(filters.page_size);
    if (filters?.ordering) params.ordering = filters.ordering;

    return api.get<PaginatedTestimonialResponse>(ADMIN, { params });
  },

  /**
   * GET /api/admin/temoignages/{id}
   * Détail d'un témoignage
   */
  getById: (id: string): Promise<TestimonialAdmin> => {
    return api.get<TestimonialAdmin>(`${ADMIN}/${id}`);
  },

  /**
   * POST /api/admin/temoignages
   * Créer manuellement (depuis WhatsApp/mail)
   */
  create: (payload: CreateTestimonialPayload): Promise<TestimonialAdmin> => {
    return api.post<TestimonialAdmin>(ADMIN, payload);
  },

  /**
   * PUT /api/admin/temoignages/{id}
   * Modifier complètement
   */
  update: (id: string, payload: CreateTestimonialPayload): Promise<TestimonialAdmin> => {
    return api.put<TestimonialAdmin>(`${ADMIN}/${id}`, payload);
  },

  /**
   * PATCH /api/admin/temoignages/{id}
   * Modifier partiellement (ex: approuver)
   */
  patch: (id: string, payload: UpdateTestimonialPayload): Promise<TestimonialAdmin> => {
    return api.patch<TestimonialAdmin>(`${ADMIN}/${id}`, payload);
  },

  /**
   * DELETE /api/admin/temoignages/{id}
   */
  delete: (id: string): Promise<void> => {
    return api.delete<void>(`${ADMIN}/${id}`);
  },
};