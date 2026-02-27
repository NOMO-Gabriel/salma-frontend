// src/repositories/scholarship.repository.ts
// ==============================================================================
//  Repository — Bourses
//  25 endpoints : 3 publics + 22 admin
// ==============================================================================

import { api } from "@/lib/api-client";
import type {
  ScholarshipPublicListItem,
  ScholarshipPublicDetail,
  ScholarshipAdmin,
  ScholarshipListResponse,
  ScholarshipAdminListResponse,
  ScholarshipFilters,
  CreateScholarshipPayload,
  UpdateScholarshipPayload,
  UpdateFieldVisibilityPayload,
  AddScholarshipImagePayload,
  ScholarshipField,
  ScholarshipBenefit,
  ScholarshipEligibility,
  ScholarshipImage
} from "@/types/api/scholarship.types";

const PUBLIC = "/bourses";
const ADMIN = "/admin/bourses";

// ==============================================================================
//  Endpoints PUBLICS (vitrine)
// ==============================================================================

export const scholarshipPublicRepository = {
  /**
   * GET /api/bourses
   * Liste paginée des bourses publiées (infos minimales pour le catalogue)
   */
  getList: (filters?: ScholarshipFilters): Promise<ScholarshipListResponse> => {
    const params: Record<string, string> = {};
    if (filters?.pays_destination) params.pays_destination = filters.pays_destination;
    if (filters?.niveau) params.niveau = filters.niveau;
    if (filters?.type_couverture) params.type_couverture = filters.type_couverture;
    if (filters?.est_mise_en_avant !== undefined) params.est_mise_en_avant = String(filters.est_mise_en_avant);
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = String(filters.page);
    if (filters?.page_size) params.page_size = String(filters.page_size);
    if (filters?.ordering) params.ordering = filters.ordering;

    return api.get<ScholarshipListResponse>(PUBLIC, {
      params,
      revalidate: 60, // ISR : revalide toutes les 60 secondes
    });
  },

  /**
   * GET /api/bourses/{id}
   * Détail public avec field_visibility appliqué
   */
  getById: (id: string): Promise<ScholarshipPublicDetail> => {
    return api.get<ScholarshipPublicDetail>(`${PUBLIC}/${id}`, {
      revalidate: 60,
    });
  },

  /**
   * GET /api/bourses/vedette
   * Bourses mises en avant (pour la home page)
   */
  getFeatured: (): Promise<ScholarshipPublicListItem[]> => {
    return api.get<ScholarshipPublicListItem[]>(`${PUBLIC}/mise-en-avant`, {
      revalidate: 60,
    });
  },
};

// ==============================================================================
//  Endpoints ADMIN (dashboard)
// ==============================================================================

export const scholarshipAdminRepository = {
  /**
   * GET /api/admin/bourses
   * Liste complète (tous statuts, tous champs)
   */
  getList: (filters?: ScholarshipFilters): Promise<ScholarshipAdminListResponse> => {
    const params: Record<string, string> = {};
    if (filters?.pays_destination) params.pays_destination = filters.pays_destination;
    if (filters?.niveau) params.niveau = filters.niveau;
    if (filters?.statut) params.statut = filters.statut;
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = String(filters.page);
    if (filters?.ordering) params.ordering = filters.ordering;

    return api.get<ScholarshipAdminListResponse>(ADMIN, { params });
  },

  /**
   * GET /api/admin/bourses/{id}
   * Détail complet pour édition
   */
  getById: (id: string): Promise<ScholarshipAdmin> => {
    return api.get<ScholarshipAdmin>(`${ADMIN}/${id}`);
  },

  /**
   * POST /api/admin/bourses
   * Créer une nouvelle bourse
   */
  create: (payload: CreateScholarshipPayload): Promise<ScholarshipAdmin> => {
    return api.post<ScholarshipAdmin>(ADMIN, payload);
  },

  /**
   * PUT /api/admin/bourses/{id}
   * Modifier complètement une bourse
   */
  update: (id: string, payload: CreateScholarshipPayload): Promise<ScholarshipAdmin> => {
    return api.put<ScholarshipAdmin>(`${ADMIN}/${id}`, payload);
  },

  /**
   * PATCH /api/admin/bourses/{id}
   * Modifier partiellement (ex: juste le statut)
   */
  patch: (id: string, payload: UpdateScholarshipPayload): Promise<ScholarshipAdmin> => {
    return api.patch<ScholarshipAdmin>(`${ADMIN}/${id}`, payload);
  },

  /**
   * DELETE /api/admin/bourses/{id}
   */
  delete: (id: string): Promise<void> => {
    return api.delete<void>(`${ADMIN}/${id}`);
  },

  /**
   * POST /api/admin/bourses/{id}/dupliquer
   * Dupliquer une bourse (crée un brouillon)
   */
  duplicate: (id: string): Promise<ScholarshipAdmin> => {
    return api.post<ScholarshipAdmin>(`${ADMIN}/${id}/dupliquer`, {});
  },

  // --- Visibilité des champs ------------------------------------------------

  /**
   * GET /api/admin/bourses/{id}/visibilites
   * Récupérer la visibilité de tous les champs
   */
  getVisibility: (id: string) => {
    return api.get<{ nom_du_champ: string; est_visible: boolean }[]>(
      `${ADMIN}/${id}/visibilites`
    );
  },

  /**
   * PATCH /api/admin/bourses/{id}/visibilites/{champId}
   * Modifier la visibilité d'un champ
   */
  updateFieldVisibility: (
    bourseId: string,
    champId: string,
    payload: UpdateFieldVisibilityPayload
  ) => {
    return api.patch(`${ADMIN}/${bourseId}/visibilites/${champId}`, payload);
  },

  /**
   * POST /api/admin/bourses/{id}/visibilites/bulk
   * Mettre à jour plusieurs visibilités d'un coup
   */
 bulkUpdateVisibility: (
  bourseId: string,
  visibilities: UpdateFieldVisibilityPayload[]
): Promise<void> => { // Ajoute le type de retour ici
  return api.post<void>(`${ADMIN}/${bourseId}/visibilites/bulk`, { visibilities: visibilities });
},

  // --- Images ---------------------------------------------------------------

  /**
   * GET /api/admin/bourses/{id}/images
   */
  getImages: (id: string) => {
    return api.get(`${ADMIN}/${id}/images`);
  },

  /**
   * POST /api/admin/bourses/{id}/images
   * Ajouter une image à une bourse
   */
 // FIX : Typage ScholarshipImage au lieu de any
  addImage: (bourseId: string, payload: AddScholarshipImagePayload): Promise<ScholarshipImage> => {
    return api.post<ScholarshipImage>(`${ADMIN}/${bourseId}/images`, payload);
  },

  /**
   * DELETE /api/admin/bourses/{id}/images/{imgId}
   */
  removeImage: (bourseId: string, imgId: string): Promise<void> => {
    return api.delete(`${ADMIN}/${bourseId}/images/${imgId}`);
  },

  /**
   * PUT /api/admin/bourses/{id}/images/{imgId}/principale
   * Définir comme image principale
   */
  setMainImage: (bourseId: string, imgId: string) => {
    return api.put(`${ADMIN}/${bourseId}/images/${imgId}/principale`, {});
  },

  // --- Domaines, avantages, critères ----------------------------------------

  /** Domaines d'études */
  getFields: (): Promise<ScholarshipField[]> =>
    api.get<ScholarshipField[]>("/admin/domaines"),
  createField: (payload: Omit<ScholarshipField, "id">): Promise<ScholarshipField> =>
    api.post<ScholarshipField>("/admin/domaines", payload),
  deleteField: (id: string): Promise<void> =>
    api.delete(`/admin/domaines/${id}`),

  /** Avantages */
  getBenefits: (): Promise<ScholarshipBenefit[]> =>
    api.get<ScholarshipBenefit[]>("/admin/avantages"),
  createBenefit: (payload: Omit<ScholarshipBenefit, "id">): Promise<ScholarshipBenefit> =>
    api.post<ScholarshipBenefit>("/admin/avantages", payload),
  deleteBenefit: (id: string): Promise<void> =>
    api.delete(`/admin/avantages/${id}`),

  /** Critères d'éligibilité */
  getEligibilities: (): Promise<ScholarshipEligibility[]> =>
    api.get<ScholarshipEligibility[]>("/admin/criteres"),
  createEligibility: (payload: Omit<ScholarshipEligibility, "id">): Promise<ScholarshipEligibility> =>
    api.post<ScholarshipEligibility>("/admin/criteres", payload),
  deleteEligibility: (id: string): Promise<void> =>
    api.delete(`/admin/criteres/${id}`),
};