// src/types/api/newsletter.types.ts
// ==============================================================================
//  Types TypeScript — Module Newsletter & Annonces
//  Calque sur NewsletterSubscriber, Announcement Django + serializers DRF
// ==============================================================================

import type { ScholarshipLevel, ScholarshipCountry } from "./scholarship.types";

// --- Énumérations ------------------------------------------------------------

export type StatutAnnonce = "BROUILLON" | "PROGRAMME" | "ENVOYE";

// --- NewsletterSubscriber ----------------------------------------------------

export interface NewsletterSubscriber {
  id: string;
  email: string;
  nom_complet: string;
  telephone: string;
  pays: string;
  niveau_etudes: ScholarshipLevel | "";
  destination_souhaitee: ScholarshipCountry | "";
  source: string;
  est_actif: boolean;
  date_inscription: string;
  date_desinscription: string | null;
}

// --- Payloads publics --------------------------------------------------------

/** POST /api/newsletter/inscription */
export interface NewsletterInscriptionPayload {
  email: string;
  nom_complet?: string;
  telephone?: string;
  pays?: string;
  source?: string;
  niveau_etudes?: ScholarshipLevel | "";
  destination_souhaitee?: ScholarshipCountry | "";
}

/** POST /api/newsletter/desinscription */
export interface NewsletterDesinscriptionPayload {
  email: string;
}

// --- Bourse liée (vue légère dans Announcement) ------------------------------

export interface AnnouncementBourseLinked {
  id: string;
  titre_fr: string;
}

// --- Announcement ------------------------------------------------------------

export interface Announcement {
  id: string;
  titre_fr: string;
  titre_en: string;
  contenu_fr: string;
  contenu_en: string;
  image: string | null;         // ID du média (FK)
  statut: StatutAnnonce;
  date_envoi: string | null;
  date_creation: string;
  bourses_liees: AnnouncementBourseLinked[];
}

export interface CreateAnnouncementPayload {
  titre_fr: string;
  titre_en: string;
  contenu_fr: string;
  contenu_en: string;
  image?: string | null;
  statut?: StatutAnnonce;
  date_envoi?: string | null;
  bourses_ids?: string[];
}

export type UpdateAnnouncementPayload = Partial<CreateAnnouncementPayload>;

// --- Réponse envoi annonce ---------------------------------------------------

export interface SendAnnouncementResponse {
  detail: string;
  abonnes_count: number;
  statut: StatutAnnonce;
}

// --- Réponses paginées -------------------------------------------------------

export interface PaginatedSubscriberResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsletterSubscriber[];
}

export interface PaginatedAnnouncementResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Announcement[];
}

// --- Filtres -----------------------------------------------------------------

export interface SubscriberFilters {
  est_actif?: boolean;
  pays?: string;
  niveau_etudes?: ScholarshipLevel | "";
  destination_souhaitee?: ScholarshipCountry | "";
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}

export interface AnnouncementFilters {
  statut?: StatutAnnonce;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}