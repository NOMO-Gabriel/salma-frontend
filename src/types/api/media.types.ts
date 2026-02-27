// src/types/api/media.types.ts
// ==============================================================================
//  Types TypeScript — Module Médias
//  Calque sur MediaAsset Django + serializers DRF
// ==============================================================================

// --- Modèle complet (admin) --------------------------------------------------

export interface MediaAsset {
  id: string;
  nom_fichier: string;
  fichier: string;              // URL relative ou absolue du fichier uploadé
  url_fichier: string;          // URL complète auto-générée
  texte_alt_fr: string;
  texte_alt_en: string;
  type_mime: string;
  taille_octets: number;
  date_upload: string;          // ISO datetime
}

// --- Modèle minimal (inclusion dans d'autres modèles) -----------------------
//     Correspond à MediaAssetMinimalSerializer

export interface MediaAssetMinimal {
  id: string;
  url_fichier: string;
  texte_alt_fr: string;
  texte_alt_en: string;
}

// --- Payloads ----------------------------------------------------------------

/** Upload d'un fichier — FormData (multipart) */
export interface UploadMediaPayload {
  fichier: File;
  nom_fichier?: string;
  texte_alt_fr?: string;
  texte_alt_en?: string;
}

/** Modification métadonnées (PATCH) */
export interface UpdateMediaPayload {
  nom_fichier?: string;
  texte_alt_fr?: string;
  texte_alt_en?: string;
}

// --- Réponse paginée ---------------------------------------------------------

export interface PaginatedMediaResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: MediaAsset[];
}

// --- Filtres -----------------------------------------------------------------

export interface MediaFilters {
  type_mime?: string;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}