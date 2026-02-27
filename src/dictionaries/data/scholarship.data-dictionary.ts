// src/dictionaries/data/scholarship.data-dictionary.ts
// ==============================================================================
//  Dictionnaire de données — Bourses
//
//  RÈGLE ARCHITECTURE :
//  Server Components → data-dictionary → repository → api-client → Django
//
//  Les composants ne connaissent QUE ce fichier.
//  Toute la logique de cache ISR et d'orchestration est ici.
// ==============================================================================

import {
  scholarshipPublicRepository,
  scholarshipAdminRepository,
} from "@/repositories/scholarship.repository";
import type {
  ScholarshipPublicListItem,
  ScholarshipPublicDetail,
  ScholarshipAdmin,
  ScholarshipListResponse,
  ScholarshipAdminListResponse,
  ScholarshipFilters,
  CreateScholarshipPayload,
  UpdateScholarshipPayload,
  FieldVisibilityMap,
} from "@/types/api/scholarship.types";
import { toFieldVisibilityMap } from "@/types/api/scholarship.types";

// ==============================================================================
//  VITRINE — Server Components (avec ISR)
// ==============================================================================

export const scholarshipDictionary = {
  /**
   * Liste paginée des bourses publiées pour le catalogue.
   * Utilisé par : /bourses (Server Component)
   * Cache ISR : 60s (configuré dans le repository)
   */
  getCatalog: (filters?: ScholarshipFilters): Promise<ScholarshipListResponse> => {
    return scholarshipPublicRepository.getList(filters);
  },

  /**
   * Bourses mises en avant pour la Home Page.
   * Utilisé par : / (Server Component)
   */
  getFeatured: (): Promise<ScholarshipPublicListItem[]> => {
    return scholarshipPublicRepository.getFeatured();
  },

  /**
   * Détail d'une bourse avec visibilité pré-calculée.
   * Utilisé par : /bourses/[id] (Server Component)
   * Retourne la bourse + un map de visibilité prêt à l'emploi
   */
  getDetail: async (
    id: string
  ): Promise<{
    scholarship: ScholarshipPublicDetail;
    visibilityMap: FieldVisibilityMap;
  }> => {
    const scholarship = await scholarshipPublicRepository.getById(id);
    const visibilityMap = toFieldVisibilityMap(scholarship.visibilites);
    return { scholarship, visibilityMap };
  },

  // ==============================================================================
  //  ADMIN — Dashboard (pas d'ISR, données fraîches)
  // ==============================================================================

  /**
   * Liste complète pour le tableau du dashboard admin.
   * Utilisé par : /admin/dashboard (Server Component ou Client fetch)
   */
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

    update: (id: string, payload: CreateScholarshipPayload): Promise<ScholarshipAdmin> => {
      return scholarshipAdminRepository.update(id, payload);
    },

    patch: (id: string, payload: UpdateScholarshipPayload): Promise<ScholarshipAdmin> => {
      return scholarshipAdminRepository.patch(id, payload);
    },

    delete: (id: string): Promise<void> => {
      return scholarshipAdminRepository.delete(id);
    },

    duplicate: (id: string): Promise<ScholarshipAdmin> => {
      return scholarshipAdminRepository.duplicate(id);
    },

    /**
     * Met à jour la visibilité de tous les champs d'un coup.
     * Utilisé par le panneau "Visibilité des champs" dans l'éditeur de bourse.
     */
    saveVisibility: (
      bourseId: string,
      visibilityMap: FieldVisibilityMap
    ): Promise<void> => {
      const payload = Object.entries(visibilityMap).map(([nom_du_champ, est_visible]) => ({
        nom_du_champ,
        est_visible,
      }));
      return scholarshipAdminRepository.bulkUpdateVisibility(bourseId, payload);
    },

    addImage: (bourseId: string, mediaId: string, isPrimary = false) => {
      return scholarshipAdminRepository.addImage(bourseId, {
        media_id: mediaId,
        est_principale: isPrimary,
      });
    },

    removeImage: (bourseId: string, imgId: string) => {
      return scholarshipAdminRepository.removeImage(bourseId, imgId);
    },

    setMainImage: (bourseId: string, imgId: string) => {
      return scholarshipAdminRepository.setMainImage(bourseId, imgId);
    },
  },
};