// src/dictionaries/data/cms.data-dictionary.ts
// ==============================================================================
//  Dictionnaire de données — CMS
//  Gestion du contenu de toutes les pages (Server Components)
// ==============================================================================

import { cmsRepository } from "@/repositories/cms.repository";
import type {
  SitePage,
  ContentBlock,
  UpdateContentBlockPayload,
  SiteConfig,
  SiteConfigMap,
  UpdateSiteConfigPayload,
  PitchVideo,
  UpdatePitchVideoPayload,
} from "@/types/api/cms.types";

export const cmsDictionary = {
  // --- Vitrine (Server Components, ISR 300s) ---------------------------------

  /** Récupère tous les blocs d'une page spécifique pour le rendu SSR */
  getPage: (slug: string): Promise<SitePage> =>
    cmsRepository.getPage(slug),

  /** Config globale sous forme de map clé/valeur — pour le layout, footer, etc. */
  getConfigMap: async (): Promise<SiteConfigMap> => {
    const configs = await cmsRepository.getConfig();
    return configs.reduce<SiteConfigMap>((acc, c) => {
      acc[c.cle] = c.valeur;
      return acc;
    }, {});
  },

  /** Vidéo de pitch active pour la home page */
  getActivePitchVideo: async (): Promise<PitchVideo | null> => {
    const videos = await cmsRepository.getVideos();
    return videos.find((v) => v.est_actif) ?? null;
  },

  // --- Admin (données fraîches, pas d'ISR) ----------------------------------

  admin: {
    getPages: (): Promise<SitePage[]> =>
      cmsRepository.adminGetPages(),

    getPage: (id: string): Promise<SitePage> =>
      cmsRepository.adminGetPage(id),

    getBlocs: (pageSlug?: string): Promise<ContentBlock[]> =>
      cmsRepository.adminGetBlocs(pageSlug),

    updateBloc: (id: string, payload: UpdateContentBlockPayload): Promise<ContentBlock> =>
      cmsRepository.adminUpdateBloc(id, payload),

    createBloc: (payload: Omit<ContentBlock, "id" | "date_modification">): Promise<ContentBlock> =>
      cmsRepository.adminCreateBloc(payload),

    deleteBloc: (id: string): Promise<void> =>
      cmsRepository.adminDeleteBloc(id),

    getConfig: (): Promise<SiteConfig[]> =>
      cmsRepository.adminGetConfig(),

    updateConfig: (cle: string, payload: UpdateSiteConfigPayload): Promise<SiteConfig> =>
      cmsRepository.adminUpdateConfig(cle, payload),

    /** Sauvegarde plusieurs configs d'un coup (ex: formulaire de config globale) */
    saveConfigBatch: async (updates: Record<string, string>): Promise<void> => {
      await Promise.all(
        Object.entries(updates).map(([cle, valeur]) =>
          cmsRepository.adminUpdateConfig(cle, { valeur })
        )
      );
    },

    getVideos: (): Promise<PitchVideo[]> =>
      cmsRepository.adminGetVideos(),

    createVideo: (payload: UpdatePitchVideoPayload): Promise<PitchVideo> =>
      cmsRepository.adminCreateVideo(payload),

    updateVideo: (id: string, payload: UpdatePitchVideoPayload): Promise<PitchVideo> =>
      cmsRepository.adminUpdateVideo(id, payload),

    deleteVideo: (id: string): Promise<void> =>
      cmsRepository.adminDeleteVideo(id),
  },
};