// src/types/api/service.types.ts
// ==============================================================================
//  Types TypeScript — Module Services
//  Calque sur Service, ServiceImage Django + serializers DRF
// ==============================================================================

import type { MediaAssetMinimal } from "./media.types";

// --- ServiceImage ------------------------------------------------------------

export interface ServiceImage {
  id: string;
  media: MediaAssetMinimal;
  est_principale: boolean;
  ordre: number;
}

// --- Service (public) --------------------------------------------------------

export interface ServicePublic {
  id: string;
  slug: string;
  nom_fr: string;
  nom_en: string;
  description_fr: string;
  description_en: string;
  icone: string;
  delai_traitement: string;
  images: ServiceImage[];
}

// --- Service (admin — champs supplémentaires) --------------------------------

export interface ServiceAdmin {
  id: string;
  slug: string;
  nom_fr: string;
  nom_en: string;
  description_fr: string;
  description_en: string;
  icone: string;
  delai_traitement: string;
  est_actif: boolean;
  ordre_affichage: number;
  images: ServiceImage[];
}

// --- Payloads CRUD -----------------------------------------------------------

export interface CreateServicePayload {
  slug: string;
  nom_fr: string;
  nom_en: string;
  description_fr: string;
  description_en: string;
  icone?: string;
  delai_traitement?: string;
  est_actif?: boolean;
  ordre_affichage?: number;
}

export type UpdateServicePayload = Partial<CreateServicePayload>;

/** POST /api/admin/services/{id}/images */
export interface AddServiceImagePayload {
  media_id: string;
  est_principale?: boolean;
}

// --- Réponses paginées -------------------------------------------------------

export interface PaginatedServiceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ServiceAdmin[];
}

// --- Filtres -----------------------------------------------------------------

export interface ServiceFilters {
  est_actif?: boolean;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}