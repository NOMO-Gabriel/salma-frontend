// src/types/api/contact.types.ts
// ==============================================================================
//  Types TypeScript — Module Demandes de Contact
//  Calque sur ContactRequest Django + serializers DRF
// ==============================================================================

// --- Bourse associée (vue légère dans la réponse admin) ----------------------

export interface ContactBourseAssociee {
  id: string;
  titre_fr: string;
  titre_en: string;
}

// --- Modèle admin (lecture) --------------------------------------------------

export interface ContactRequest {
  statut: string;
  id: string;
  nom_complet: string;
  email: string;
  telephone: string;
  whatsapp: string;
  message: string;
  accepte_newsletter: boolean;
  est_lu: boolean;
  notes_admin: string;
  date_creation: string;
  bourses_associees: ContactBourseAssociee[];
}

// --- Payload soumission publique (POST /api/contact) -------------------------

export interface CreateContactPayload {
  nom_complet: string;
  email: string;
  telephone?: string;
  whatsapp?: string;
  message: string;
  accepte_newsletter?: boolean;
  bourses_ids?: string[];
}

// --- Payload admin (PATCH — marquer lu, ajouter notes) -----------------------

export interface UpdateContactPayload {
  est_lu?: boolean;
  notes_admin?: string;
}

// --- Réponse paginée ---------------------------------------------------------

export interface PaginatedContactResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ContactRequest[];
}

// --- Filtres admin -----------------------------------------------------------

export interface ContactFilters {
  est_lu?: boolean;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}