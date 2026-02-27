// src/types/api/testimonial.types.ts
// ==============================================================================
//  Types TypeScript — Module Témoignages
//  Calque sur Testimonial Django + serializers DRF
// ==============================================================================

import type { MediaAssetMinimal } from "./media.types";

// --- Énumérations ------------------------------------------------------------

export type SourceTemoignage = "SITE" | "WHATSAPP" | "EMAIL";

// --- Public (témoignages approuvés + affichés) -------------------------------

export interface TestimonialPublic {
  id: string;
  nom_auteur: string;
  pays_auteur: string;
  citation_fr: string;
  citation_en: string;
  note: number;                 // 1–5
  photo: MediaAssetMinimal | null;
  date_creation: string;
}

// --- Admin (CRUD complet) ----------------------------------------------------

export interface TestimonialAdmin {
  id: string;
  nom_auteur: string;
  pays_auteur: string;
  citation_fr: string;
  citation_en: string;
  note: number;
  source: SourceTemoignage;
  photo: MediaAssetMinimal | null;
  fichier_joint: MediaAssetMinimal | null;
  est_approuve: boolean;
  est_affiche_sur_site: boolean;
  ordre_affichage: number;
  date_creation: string;
}

// --- Payload soumission publique (POST /api/temoignages) ---------------------

export interface SubmitTestimonialPayload {
  nom_auteur: string;
  pays_auteur?: string;
  citation_fr: string;
  citation_en?: string;
  note?: number;
}

// --- Payload admin (POST/PUT/PATCH) ------------------------------------------

export interface CreateTestimonialPayload {
  nom_auteur: string;
  pays_auteur?: string;
  citation_fr: string;
  citation_en?: string;
  note?: number;
  source?: SourceTemoignage;
  photo_id?: string | null;
  fichier_joint_id?: string | null;
  est_approuve?: boolean;
  est_affiche_sur_site?: boolean;
  ordre_affichage?: number;
}

export type UpdateTestimonialPayload = Partial<CreateTestimonialPayload>;

// --- Réponse paginée ---------------------------------------------------------

export interface PaginatedTestimonialResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TestimonialAdmin[];
}

// --- Filtres admin -----------------------------------------------------------

export interface TestimonialFilters {
  est_approuve?: boolean;
  est_affiche_sur_site?: boolean;
  source?: SourceTemoignage;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}