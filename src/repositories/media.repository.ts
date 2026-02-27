// src/repositories/media.repository.ts
// ==============================================================================
//  Repository — Médias (Bibliothèque de fichiers)
//  5 endpoints admin uniquement
// ==============================================================================

import { api } from "@/lib/api-client";
import type {
  MediaAsset,
  UploadMediaPayload,
  UpdateMediaPayload,
  PaginatedMediaResponse,
  MediaFilters,
} from "@/types/api/media.types";

const ADMIN = "/admin/medias";

export const mediaRepository = {
  /**
   * GET /api/admin/medias
   * Bibliothèque de fichiers
   */
  getList: (filters?: MediaFilters): Promise<PaginatedMediaResponse> => {
    const params: Record<string, string> = {};
    if (filters?.type_mime) params.type_mime = filters.type_mime;
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = String(filters.page);
    if (filters?.page_size) params.page_size = String(filters.page_size);
    if (filters?.ordering) params.ordering = filters.ordering;

    return api.get<PaginatedMediaResponse>(ADMIN, { params });
  },

  /**
   * GET /api/admin/medias/{id}
   * Détail d'un fichier
   */
  getById: (id: string): Promise<MediaAsset> => {
    return api.get<MediaAsset>(`${ADMIN}/${id}`);
  },

  /**
   * POST /api/admin/medias
   * Uploader un fichier (multipart/form-data)
   */
  upload: (payload: UploadMediaPayload): Promise<MediaAsset> => {
    const formData = new FormData();
    formData.append("fichier", payload.fichier);
    if (payload.nom_fichier) formData.append("nom_fichier", payload.nom_fichier);
    if (payload.texte_alt_fr) formData.append("texte_alt_fr", payload.texte_alt_fr);
    if (payload.texte_alt_en) formData.append("texte_alt_en", payload.texte_alt_en);

    return api.upload<MediaAsset>(ADMIN, formData);
  },

  /**
   * PATCH /api/admin/medias/{id}
   * Modifier les métadonnées (nom, texte alt)
   */
  update: (id: string, payload: UpdateMediaPayload): Promise<MediaAsset> => {
    return api.patch<MediaAsset>(`${ADMIN}/${id}`, payload);
  },

  /**
   * DELETE /api/admin/medias/{id}
   * Supprimer un fichier
   */
  delete: (id: string): Promise<void> => {
    return api.delete<void>(`${ADMIN}/${id}`);
  },
};