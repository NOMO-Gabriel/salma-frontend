// src/dictionaries/data/cms-switcher.ts
// ==============================================================================
//  Switcher intelligent de contenu avec Généricité TypeScript
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
import { frPrivacy } from "./static/privacy/fr";
import { frCommon } from "./static/common/fr"; // Ajouté

// Imports des fichiers statiques (EN)
import { enLayout } from "./static/layout/en";
import { enHome } from "./static/home/en";
import { enBourses } from "./static/bourses/en";
import { enServices } from "./static/services/en";
import { enAbout } from "./static/about/en";
import { enContact } from "./static/contact/en";
import { enPrivacy } from "./static/privacy/en";
import { enCommon } from "./static/common/en"; // Ajouté

// Ajout de "common" dans l'union CmsScope
export type CmsScope = "layout" | "home" | "bourses" | "services" | "contact" | "about" | "privacy" | "common";

const staticRegistry: Record<Locale, Record<CmsScope, unknown>> = {
  fr: {
    layout: frLayout,
    home: frHome,
    bourses: frBourses,
    services: frServices,
    about: frAbout,
    contact: frContact,
    privacy: frPrivacy,
    common: frCommon, // Enregistré
  },
  en: {
    layout: enLayout,
    home: enHome,
    bourses: enBourses,
    services: enServices,
    about: enAbout,
    contact: enContact,
    privacy: enPrivacy,
    common: enCommon, // Enregistré
  }
};

export const cmsSwitcher = {
  getScopeContent: async <T>(scope: CmsScope, locale: Locale): Promise<T> => {
    const isStaticMode = process.env.NEXT_PUBLIC_STATIC_CONTENT === 'true';
    const fallbackData = staticRegistry[locale][scope] as T;

    if (isStaticMode) return fallbackData;

    try {
      // Pour "common" et "layout", on utilise toujours le statique pour le moment
      // car ce sont des structures complexes non gérées par le CMS par blocs.
      if (scope === "common" || scope === "layout") return fallbackData;

      const pageData = await cmsPublicRepository.getPageBySlug(scope);
      if (!pageData || !pageData.blocs || pageData.blocs.length === 0) {
        return fallbackData;
      }
      return fallbackData; 
    } catch {
      return fallbackData;
    }
  }
};