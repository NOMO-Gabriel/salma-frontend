// src/dictionaries/data/cms.data-dictionary.ts
import { cmsPublicRepository, cmsAdminRepository } from "@/repositories/cms.repository";
import type { 
  SitePagePublic, 
  SitePageAdmin, 
  UpdateContentBlockPayload, 
  PitchVideo 
} from "@/types/api/cms.types";

export const cmsDictionary = {
  /** 
   * Récupère le contenu public d'une page par son slug 
   * Utilisé par la vitrine (ex: /a-propos)
   */
  getPage: (slug: string): Promise<SitePagePublic> =>
    cmsPublicRepository.getPageBySlug(slug), // Correction du nom ici

  /** 
   * Config globale sous forme de map clé/valeur 
   */
  getConfigMap: async (): Promise<Record<string, string>> => {
    const configs = await cmsPublicRepository.getConfig();
    return configs.reduce((acc, c) => {
      acc[c.cle_config] = c.valeur_fr;
      return acc;
    }, {} as Record<string, string>);
  },

  /** 
   * Vidéo de pitch active 
   */
  getActivePitchVideo: async (): Promise<PitchVideo | null> => {
    const videos = await cmsPublicRepository.getVideos();
    return videos.find((v) => v.est_active) ?? null;
  },

  // --- Espace Admin ---
  admin: {
    getPages: () => cmsAdminRepository.getPages(),
    getPage: (id: string): Promise<SitePageAdmin> => 
      cmsAdminRepository.getPageById(id),
    updateBloc: (pageId: string, blocId: string, payload: UpdateContentBlockPayload) => 
      cmsAdminRepository.patchBlock(pageId, blocId, payload),
  },
};