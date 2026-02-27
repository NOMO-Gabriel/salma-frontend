// src/types/api/cms.types.ts
// ==============================================================================
//  Types TypeScript — Module CMS (Contenu du Site)
//  Calque sur SitePage, ContentBlock, SiteConfig, PitchVideo Django + serializers
// ==============================================================================

import type { MediaAssetMinimal } from "./media.types";

// --- Énumérations ------------------------------------------------------------

export type TypeBloc =
  | "HERO"
  | "TEXTE"
  | "IMAGE"
  | "CTA"
  | "STATS"
  | "BARRE_CONFIANCE"
  | "VIDEO"
  | "TEMOIGNAGES";

// --- ContentBlock ------------------------------------------------------------

export interface ContentBlock {
  id: string;
  cle_bloc: string;
  type_bloc: TypeBloc;
  contenu_fr: string;
  contenu_en: string;
  image: MediaAssetMinimal | null;
  lien_cta: string;
  est_visible: boolean;
  ordre_affichage: number;
  date_modification: string;
}

export interface CreateContentBlockPayload {
  cle_bloc: string;
  type_bloc: TypeBloc;
  contenu_fr?: string;
  contenu_en?: string;
  image_id?: string | null;
  lien_cta?: string;
  est_visible?: boolean;
  ordre_affichage?: number;
}

export type UpdateContentBlockPayload = Partial<CreateContentBlockPayload>;

// --- SitePage ----------------------------------------------------------------

/** Public : page + blocs visibles uniquement */
export interface SitePagePublic {
  id: string;
  slug: string;
  titre_fr: string;
  titre_en: string;
  blocs: ContentBlock[];
}

/** Admin : page + tous les blocs */
export interface SitePageAdmin {
  id: string;
  slug: string;
  titre_fr: string;
  titre_en: string;
  est_publiee: boolean;
  ordre_affichage: number;
  date_modification: string;
  blocs: ContentBlock[];
}

export interface CreateSitePagePayload {
  slug: string;
  titre_fr: string;
  titre_en: string;
  est_publiee?: boolean;
  ordre_affichage?: number;
}

export type UpdateSitePagePayload = Partial<CreateSitePagePayload>;

// --- SiteConfig --------------------------------------------------------------

export interface SiteConfig {
  id: string;
  cle_config: string;
  valeur_fr: string;
  valeur_en: string;
  date_modification: string;
}

export interface CreateSiteConfigPayload {
  cle_config: string;
  valeur_fr?: string;
  valeur_en?: string;
}

export type UpdateSiteConfigPayload = Partial<CreateSiteConfigPayload>;

// --- PitchVideo --------------------------------------------------------------

export interface PitchVideo {
  id: string;
  titre_fr: string;
  titre_en: string;
  url_video: string;
  thumbnail: MediaAssetMinimal | null;
  est_active: boolean;
  page_affichage: string;
  date_modification: string;
}

export interface CreatePitchVideoPayload {
  titre_fr: string;
  titre_en: string;
  url_video: string;
  thumbnail_id?: string | null;
  est_active?: boolean;
  page_affichage?: string;
}

export type UpdatePitchVideoPayload = Partial<CreatePitchVideoPayload>;