// src/dictionaries/data/scholarship.data-dictionary.ts
import {
  scholarshipPublicRepository,
  scholarshipAdminRepository,
} from "@/repositories/scholarship.repository";
import type {
  ScholarshipPublicListItem,
  ScholarshipAdmin,
  ScholarshipListResponse,
  ScholarshipAdminListResponse,
  ScholarshipFilters,
  CreateScholarshipPayload,
  UpdateScholarshipPayload,
  FieldVisibilityMap,
} from "@/types/api/scholarship.types";
import { toFieldVisibilityMap } from "@/types/api/scholarship.types";

export const scholarshipDictionary = {
  /** Liste paginée pour le catalogue */
  getCatalog: (filters?: ScholarshipFilters): Promise<ScholarshipListResponse> => {
    return scholarshipPublicRepository.getList(filters);
  },

  /** Bourses vedettes pour la Home */
  getFeatured: (): Promise<ScholarshipPublicListItem[]> => {
    return scholarshipPublicRepository.getFeatured();
  },

  /** Détail d'une bourse avec map de visibilité */
  getDetail: async (id: string) => {
    const scholarship = await scholarshipPublicRepository.getById(id);
    const visibilityMap = toFieldVisibilityMap(scholarship.visibilites);
    return { scholarship, visibilityMap };
  },

  // --- Espace Admin ---
  admin: {
    getList: (filters?: ScholarshipFilters): Promise<ScholarshipAdminListResponse> => {
      return scholarshipAdminRepository.getList(filters);
    },
    getById: (id: string): Promise<ScholarshipAdmin> => {
      return scholarshipAdminRepository.getById(id);
    },
    create: (payload: CreateScholarshipPayload): Promise<ScholarshipAdmin> => {
      return scholarshipAdminRepository.create(payload);
    },
    patch: (id: string, payload: UpdateScholarshipPayload): Promise<ScholarshipAdmin> => {
      return scholarshipAdminRepository.patch(id, payload);
    },
    delete: (id: string): Promise<void> => {
      return scholarshipAdminRepository.delete(id);
    },
    saveVisibility: (bourseId: string, visibilityMap: FieldVisibilityMap): Promise<void> => {
      const payload = Object.entries(visibilityMap).map(([nom_du_champ, est_visible]) => ({
        nom_du_champ,
        est_visible,
      }));
      return scholarshipAdminRepository.bulkUpdateVisibility(bourseId, payload);
    },
  },
};