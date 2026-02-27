// src/types/api/scholarship.types.ts
// ==============================================================================
//  Types TypeScript — Module Bourses
//  Calque exact sur les modèles Django / sérialiseurs DRF
// ==============================================================================

// Imports
import type { MediaAssetMinimal } from "./media.types";
// --- Énumérations (correspondent aux choices Django) -------------------------

export type ScholarshipStatus = "brouillon" | "publie" | "expire" | "archive";
export type ScholarshipLevel = "licence" | "master" | "doctorat" | "postdoc" | "formation" | "autre";
export type ScholarshipCoverage = "complete" | "partielle" | "logement" | "transport" | "autre";
export type ScholarshipCountry = "chine" | "allemagne" | "france" | "canada" | "autre";

// --- Sous-modèles ------------------------------------------------------------

export interface ScholarshipField {
  id: string;
  nom_fr: string;
  nom_en: string;
  icone: string;
}

export interface ScholarshipBenefit {
  id: string;
  libelle_fr: string;
  libelle_en: string;
  icone: string;
}

export interface ScholarshipEligibility {
  id: string;
  libelle_fr: string;
  libelle_en: string;
  icone: string;
}

/** Visibilité d'un champ — contrôle ce que le public voit */
export interface FieldVisibility {
  id: string;
  nom_du_champ: string;
  est_visible: boolean;
}

/** Dictionnaire pratique : { nom_du_champ: est_visible } */
export type FieldVisibilityMap = Record<string, boolean>;


export interface ScholarshipImage {
  id: string;
  media: MediaAssetMinimal;
  est_principale: boolean;
  ordre: number;
}

// --- Modèle principal — Liste publique (infos minimales) --------------------

export interface ScholarshipPublicListItem {
  id: string;
  titre_fr: string;
  titre_en: string;
  organisme_fr: string;
  organisme_en: string;
  pays_destination: ScholarshipCountry;
  niveau: ScholarshipLevel;
  statut: ScholarshipStatus;
  type_couverture: ScholarshipCoverage;
  date_limite: string | null;          // ISO date string ou null
  exigence_langue_fr: string;
  exigence_langue_en: string;
  details_montant_fr: string;          // jamais affiché côté public (field_visibility)
  details_montant_en: string;
  est_mise_en_avant: boolean;
  domaines: ScholarshipField[];
  image_principale: MediaAssetMinimal | null;
}

// --- Modèle principal — Détail public (avec visibilité appliquée) -----------

export interface ScholarshipPublicDetail {
  id: string;
  titre_fr: string;
  titre_en: string;
  organisme_fr: string;
  organisme_en: string;
  description_fr: string;
  description_en: string;
  pays_destination: ScholarshipCountry;
  niveau: ScholarshipLevel;
  statut: ScholarshipStatus;
  type_couverture: ScholarshipCoverage;
  date_limite: string | null;
  limite_age: number | null;
  exigence_langue_fr: string;
  exigence_langue_en: string;
  details_montant_fr: string;
  details_montant_en: string;
  lien_officiel: string;
  est_mise_en_avant: boolean;
  ordre_affichage: number;
  domaines: ScholarshipField[];
  avantages: ScholarshipBenefit[];
  criteres: ScholarshipEligibility[];
  images: ScholarshipImage[];
  visibilites: FieldVisibility[];       // → utiliser toFieldVisibilityMap()
  date_creation: string;
  date_modification: string;
}

// --- Modèle principal — Admin complet (CRUD) --------------------------------

// FIX : Utilisation d'un type alias au lieu d'une interface vide pour ESLint
export type ScholarshipAdmin = ScholarshipPublicDetail;

// --- Payloads de création/modification (admin) ------------------------------

export interface CreateScholarshipPayload {
  titre_fr: string;
  titre_en: string;
  organisme_fr: string;
  organisme_en: string;
  description_fr: string;
  description_en: string;
  pays_destination: ScholarshipCountry;
  niveau: ScholarshipLevel;
  statut: ScholarshipStatus;
  type_couverture: ScholarshipCoverage;
  date_limite?: string | null;
  limite_age?: number | null;
  exigence_langue_fr?: string;
  exigence_langue_en?: string;
  details_montant_fr?: string;
  details_montant_en?: string;
  lien_officiel?: string;
  est_mise_en_avant?: boolean;
  ordre_affichage?: number;
}

export type UpdateScholarshipPayload = Partial<CreateScholarshipPayload>;

export interface UpdateFieldVisibilityPayload {
  nom_du_champ: string;
  est_visible: boolean;
}

export interface AddScholarshipImagePayload {
  media_id: string;
  est_principale?: boolean;
  ordre?: number;
}

// --- Réponses paginées -------------------------------------------------------

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type ScholarshipListResponse = PaginatedResponse<ScholarshipPublicListItem>;
export type ScholarshipAdminListResponse = PaginatedResponse<ScholarshipAdmin>;

// --- Filtres (query params) --------------------------------------------------

export interface ScholarshipFilters {
  pays_destination?: ScholarshipCountry;
  niveau?: ScholarshipLevel;
  statut?: ScholarshipStatus;
  type_couverture?: ScholarshipCoverage;
  est_mise_en_avant?: boolean;
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}

// --- Helper utilitaire -------------------------------------------------------

/**
 * Convertit le tableau FieldVisibility[] en dictionnaire pratique
 * Usage : const map = toFieldVisibilityMap(scholarship.visibilites)
 *         if (map['description_fr']) { ... }
 */
export function toFieldVisibilityMap(visibilites: FieldVisibility[]): FieldVisibilityMap {
  return visibilites.reduce<FieldVisibilityMap>((acc, v) => {
    acc[v.nom_du_champ] = v.est_visible;
    return acc;
  }, {});
}

/**
 * Liste de tous les champs d'une bourse soumis à la visibilité
 * Correspond aux champs que l'admin peut masquer/afficher
 */
export const SCHOLARSHIP_VISIBILITY_FIELDS = [
  "description_fr",
  "description_en",
  "date_limite",
  "limite_age",
  "exigence_langue_fr",
  "exigence_langue_en",
  "details_montant_fr",
  "details_montant_en",
  "lien_officiel",
  "avantages",
  "criteres",
  "images",
  "type_couverture",
] as const;

export type ScholarshipVisibilityField = (typeof SCHOLARSHIP_VISIBILITY_FIELDS)[number];