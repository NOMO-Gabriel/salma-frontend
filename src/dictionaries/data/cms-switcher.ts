// src/dictionaries/data/cms-switcher.ts
// ==============================================================================
//  Switcher intelligent de contenu avec Fallback de sécurité
//  Gère le basculement entre Fichiers Statiques et API Django
// ==============================================================================

import { cmsPublicRepository } from "@/repositories/cms.repository";
import { Locale } from "@/config/i18n";

// Imports des fichiers statiques (FR)
import { frLayout } from "./static/layout/fr";
import { frHome } from "./static/home/fr";
import { frBourses } from "./static/bourses/fr";
import { frServices } from "./static/services/fr";
import { frAbout } from "./static/about/fr";
import { frContact } from "./static/contact/fr";

// Imports des fichiers statiques (EN)
import { enLayout } from "./static/layout/en";
import { enHome } from "./static/home/en";
import { enBourses } from "./static/bourses/en";
import { enServices } from "./static/services/en";
import { enAbout } from "./static/about/en";
import { enContact } from "./static/contact/en";

// Types des scopes autorisés
export type CmsScope = "layout" | "home" | "bourses" | "services" | "contact" | "about";

// On définit un type générique pour le contenu pour éviter le "any"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DictionaryContent = Record<string, any>;

// Registre central des contenus statiques
const staticRegistry: Record<Locale, Record<CmsScope, DictionaryContent>> = {
  fr: {
    layout: frLayout,
    home: frHome,
    bourses: frBourses,
    services: frServices,
    about: frAbout,
    contact: frContact,
  },
  en: {
    layout: enLayout,
    home: enHome,
    bourses: enBourses,
    services: enServices,
    about: enAbout,
    contact: enContact,
  }
};

export const cmsSwitcher = {
  /**
   * Récupère le contenu d'un scope spécifique.
   * RÈGLE : Si NEXT_PUBLIC_STATIC_CONTENT=true ou si l'API échoue -> Retourne le statique.
   */
  getScopeContent: async (scope: CmsScope, locale: Locale): Promise<DictionaryContent> => {
    const isStaticMode = process.env.NEXT_PUBLIC_STATIC_CONTENT === 'true';
    const fallbackData = staticRegistry[locale][scope];

    // 1. Si on est en mode statique forcé
    if (isStaticMode) {
      return fallbackData;
    }

    // 2. Tentative de récupération via l'API (Prod)
    try {
      const pageData = await cmsPublicRepository.getPageBySlug(scope);
      
      if (!pageData || !pageData.blocs) {
        return fallbackData;
      }

      // TODO: Implémenter le mapping API -> Dictionnaire ici quand les clés seront synchronisées
      return fallbackData; 

    } catch (_error) {
      // 3. FALLBACK : On utilise le préfixe "_" pour indiquer à TS que la variable est ignorée
      console.warn(`[CMS Switcher] Serveur indisponible pour le scope "${scope}". Utilisation du fallback.`);
      return fallbackData;
    }
  }
};