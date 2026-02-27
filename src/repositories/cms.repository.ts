// src/repositories/cms.repository.ts
// ==============================================================================
//  Repository — CMS (Pages, Blocs, Config, Vidéos)
//  20 endpoints : 4 publics + 16 admin
// ==============================================================================

import { api } from "@/lib/api-client";
import type {
  SitePagePublic,
  SitePageAdmin,
  CreateSitePagePayload,
  UpdateSitePagePayload,
  ContentBlock,
  CreateContentBlockPayload,
  UpdateContentBlockPayload,
  SiteConfig,
  CreateSiteConfigPayload,
  UpdateSiteConfigPayload,
  PitchVideo,
  CreatePitchVideoPayload,
  UpdatePitchVideoPayload,
} from "@/types/api/cms.types";

// ==============================================================================
//  Endpoints PUBLICS (vitrine)
// ==============================================================================

export const cmsPublicRepository = {
  /**
   * GET /api/pages
   * Liste des pages publiées
   */
  getPages: (): Promise<SitePagePublic[]> => {
    return api.get<SitePagePublic[]>("/pages", { revalidate: 120 });
  },

  /**
   * GET /api/pages/{slug}
   * Contenu complet d'une page (blocs visibles uniquement)
   */
  getPageBySlug: (slug: string): Promise<SitePagePublic> => {
    return api.get<SitePagePublic>(`/pages/${slug}`, { revalidate: 60 });
  },

  /**
   * GET /api/config
   * Configurations globales du site
   */
  getConfig: (): Promise<SiteConfig[]> => {
    return api.get<SiteConfig[]>("/config", { revalidate: 120 });
  },

  /**
   * GET /api/videos
   * Vidéos de pitch actives
   */
  getVideos: (): Promise<PitchVideo[]> => {
    return api.get<PitchVideo[]>("/videos", { revalidate: 120 });
  },
};

// ==============================================================================
//  Endpoints ADMIN (dashboard)
// ==============================================================================

export const cmsAdminRepository = {

  // --- Pages -----------------------------------------------------------------

  /**
   * GET /api/admin/pages
   * Liste de toutes les pages (publiées ou non)
   */
  getPages: (): Promise<SitePageAdmin[]> => {
    return api.get<SitePageAdmin[]>("/admin/pages");
  },

  /**
   * GET /api/admin/pages/{id}
   * Détail avec tous les blocs
   */
  getPageById: (id: string): Promise<SitePageAdmin> => {
    return api.get<SitePageAdmin>(`/admin/pages/${id}`);
  },

  /**
   * POST /api/admin/pages
   * Créer une page
   */
  createPage: (payload: CreateSitePagePayload): Promise<SitePageAdmin> => {
    return api.post<SitePageAdmin>("/admin/pages", payload);
  },

  /**
   * PUT /api/admin/pages/{id}
   * Modifier complètement une page
   */
  updatePage: (id: string, payload: CreateSitePagePayload): Promise<SitePageAdmin> => {
    return api.put<SitePageAdmin>(`/admin/pages/${id}`, payload);
  },

  /**
   * PATCH /api/admin/pages/{id}
   * Modifier partiellement
   */
  patchPage: (id: string, payload: UpdateSitePagePayload): Promise<SitePageAdmin> => {
    return api.patch<SitePageAdmin>(`/admin/pages/${id}`, payload);
  },

  /**
   * DELETE /api/admin/pages/{id}
   */
  deletePage: (id: string): Promise<void> => {
    return api.delete<void>(`/admin/pages/${id}`);
  },

  // --- Blocs de contenu (nested sous pages) ----------------------------------

  /**
   * POST /api/admin/pages/{pageId}/blocs
   * Ajouter un bloc à une page
   */
  createBlock: (pageId: string, payload: CreateContentBlockPayload): Promise<ContentBlock> => {
    return api.post<ContentBlock>(`/admin/pages/${pageId}/blocs`, payload);
  },

  /**
   * PUT /api/admin/pages/{pageId}/blocs/{blocId}
   * Modifier complètement un bloc
   */
  updateBlock: (pageId: string, blocId: string, payload: CreateContentBlockPayload): Promise<ContentBlock> => {
    return api.put<ContentBlock>(`/admin/pages/${pageId}/blocs/${blocId}`, payload);
  },

  /**
   * PATCH /api/admin/pages/{pageId}/blocs/{blocId}
   * Modifier partiellement un bloc
   */
  patchBlock: (pageId: string, blocId: string, payload: UpdateContentBlockPayload): Promise<ContentBlock> => {
    return api.patch<ContentBlock>(`/admin/pages/${pageId}/blocs/${blocId}`, payload);
  },

  /**
   * DELETE /api/admin/pages/{pageId}/blocs/{blocId}
   */
  deleteBlock: (pageId: string, blocId: string): Promise<void> => {
    return api.delete<void>(`/admin/pages/${pageId}/blocs/${blocId}`);
  },

  // --- Config globale --------------------------------------------------------

  /**
   * GET /api/admin/config
   * Liste de toutes les configs
   */
  getConfigs: (): Promise<SiteConfig[]> => {
    return api.get<SiteConfig[]>("/admin/config");
  },

  /**
   * POST /api/admin/config
   * Créer une config
   */
  createConfig: (payload: CreateSiteConfigPayload): Promise<SiteConfig> => {
    return api.post<SiteConfig>("/admin/config", payload);
  },

  /**
   * PUT /api/admin/config/{cle}
   * Modifier complètement
   */
  updateConfig: (cle: string, payload: CreateSiteConfigPayload): Promise<SiteConfig> => {
    return api.put<SiteConfig>(`/admin/config/${cle}`, payload);
  },

  /**
   * PATCH /api/admin/config/{cle}
   * Modifier partiellement
   */
  patchConfig: (cle: string, payload: UpdateSiteConfigPayload): Promise<SiteConfig> => {
    return api.patch<SiteConfig>(`/admin/config/${cle}`, payload);
  },

  /**
   * DELETE /api/admin/config/{cle}
   */
  deleteConfig: (cle: string): Promise<void> => {
    return api.delete<void>(`/admin/config/${cle}`);
  },

  // --- Vidéos de pitch -------------------------------------------------------

  /**
   * GET /api/admin/videos
   * Liste des vidéos
   */
  getVideos: (): Promise<PitchVideo[]> => {
    return api.get<PitchVideo[]>("/admin/videos");
  },

  /**
   * GET /api/admin/videos/{id}
   * Détail d'une vidéo
   */
  getVideoById: (id: string): Promise<PitchVideo> => {
    return api.get<PitchVideo>(`/admin/videos/${id}`);
  },

  /**
   * POST /api/admin/videos
   * Ajouter une vidéo
   */
  createVideo: (payload: CreatePitchVideoPayload): Promise<PitchVideo> => {
    return api.post<PitchVideo>("/admin/videos", payload);
  },

  /**
   * PUT /api/admin/videos/{id}
   * Modifier complètement
   */
  updateVideo: (id: string, payload: CreatePitchVideoPayload): Promise<PitchVideo> => {
    return api.put<PitchVideo>(`/admin/videos/${id}`, payload);
  },

  /**
   * PATCH /api/admin/videos/{id}
   * Modifier partiellement
   */
  patchVideo: (id: string, payload: UpdatePitchVideoPayload): Promise<PitchVideo> => {
    return api.patch<PitchVideo>(`/admin/videos/${id}`, payload);
  },

  /**
   * DELETE /api/admin/videos/{id}
   */
  deleteVideo: (id: string): Promise<void> => {
    return api.delete<void>(`/admin/videos/${id}`);
  },
};