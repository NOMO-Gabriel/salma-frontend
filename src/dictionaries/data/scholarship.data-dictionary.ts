// src/dictionaries/data/scholarship.data-dictionary.ts

import { 
  scholarshipPublicRepository, 
  scholarshipAdminRepository 
} from "@/repositories/scholarship.repository";
import { ALL_STATIC_SCHOLARSHIPS } from "./static/bourses/all-scholarships";
import { toFieldVisibilityMap } from "@/types"; 
import type { 
  ScholarshipPublicDetail, 
  ScholarshipFilters, 
  ScholarshipListResponse, 
  ScholarshipPublicListItem,
  ScholarshipAdmin,
  ScholarshipAdminListResponse,
  CreateScholarshipPayload,
  UpdateScholarshipPayload,
  FieldVisibilityMap,
  UpdateFieldVisibilityPayload
} from "@/types";

const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_CONTENT === "true";

export const scholarshipDictionary = {
  
  /** 1. CATALOGUE (Public) */
  getCatalog: async (filters?: ScholarshipFilters): Promise<ScholarshipListResponse> => {
    if (IS_STATIC) {
      return {
        count: ALL_STATIC_SCHOLARSHIPS.length,
        next: null,
        previous: null,
        results: ALL_STATIC_SCHOLARSHIPS
      };
    }
    return scholarshipPublicRepository.getList(filters);
  },

  /** 2. VEDETTES (Public) */
  getFeatured: async (): Promise<ScholarshipPublicListItem[]> => {
    if (IS_STATIC) {
      return ALL_STATIC_SCHOLARSHIPS.filter(s => s.est_mise_en_avant);
    }
    return scholarshipPublicRepository.getFeatured();
  },

 /** 3. DÉTAIL (Public - Hybride) */
  getDetail: async (id: string) => {
    let scholarship: ScholarshipPublicDetail;

    if (IS_STATIC || id.startsWith("static-")) {
      type StaticEntry = ScholarshipPublicListItem & Partial<ScholarshipPublicDetail>;
      
      const found = (ALL_STATIC_SCHOLARSHIPS as unknown as StaticEntry[]).find((s) => s.id === id);
      
      if (!found) throw new Error("Bourse statique introuvable");

      // On construit l'objet Detail complet en listant TOUS les champs obligatoires
      const fullScholarship: ScholarshipPublicDetail = {
        id: found.id,
        titre_fr: found.titre_fr,
        titre_en: found.titre_en,
        organisme_fr: found.organisme_fr,
        organisme_en: found.organisme_en,
        pays_destination: found.pays_destination,
        niveau: found.niveau,
        statut: found.statut,
        type_couverture: found.type_couverture,
        ordre_affichage: found.ordre_affichage,
        est_mise_en_avant: found.est_mise_en_avant,
        domaines: found.domaines || [],
        date_limite: found.date_limite || null, 
        image_principale: found.image_principale || null, 
        description_fr: found.description_fr || "Découvrez cette opportunité d'excellence pour votre mobilité internationale.",
        description_en: found.description_en || "Discover this excellence opportunity for your international mobility.",
        exigence_langue_fr: found.exigence_langue_fr || "",
        exigence_langue_en: found.exigence_langue_en || "",
        details_montant_fr: found.details_montant_fr || "",
        details_montant_en: found.details_montant_en || "",
        lien_officiel: found.lien_officiel || "",
        limite_age: found.limite_age ?? null,
        date_creation: found.date_creation || new Date().toISOString(),
        date_modification: found.date_modification || new Date().toISOString(),
        visibilites: found.visibilites || [],
        avantages: found.avantages || [],
        criteres: found.criteres || [],
        images: found.images || (found.image_principale 
          ? [{ id: '1', media: found.image_principale, est_principale: true, ordre: 0 }] 
          : []),
      };

      scholarship = fullScholarship;
    } else {
      scholarship = await scholarshipPublicRepository.getById(id);
    }

    const visibilityMap = toFieldVisibilityMap(scholarship.visibilites || []);
    return { scholarship, visibilityMap };
  },
  
  /** 4. ESPACE ADMIN (Dashboard) */
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
      const payload: UpdateFieldVisibilityPayload[] = Object.entries(visibilityMap).map(
        ([nom_du_champ, est_visible]) => ({
          nom_du_champ,
          est_visible,
        })
      );
      return scholarshipAdminRepository.bulkUpdateVisibility(bourseId, payload);
    },
  },
};