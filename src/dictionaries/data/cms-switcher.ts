import { frLayout } from "./static/layout/fr";
import { enLayout } from "./static/layout/en";
import { cmsPublicRepository } from "@/repositories/cms.repository";

/**
 * Switcher intelligent de contenu.
 * Permet de basculer entre les fichiers statiques (dev) et le backend (prod).
 */
export const cmsSwitcher = {
  /**
   * Récupère le contenu d'un scope spécifique (ex: layout)
   */
  getScopeContent: async (scope: "layout" | "home", locale: "fr" | "en") => {
    const isStatic = process.env.NEXT_PUBLIC_STATIC_CONTENT === 'true';

    if (isStatic) {
      // Chargement statique depuis le dossier /static
      if (scope === "layout") return locale === "fr" ? frLayout : enLayout;
      // Ajoutez d'autres scopes ici (home, bourses, etc.)
      return {};
    }

    // Sinon, appel au backend via le repository CMS existant
    // On suppose que le backend renvoie un objet structuré par scope
    try {
      const pageData = await cmsPublicRepository.getPageBySlug(scope);
      return pageData; 
    } catch (error) {
      console.error(`Erreur Switcher sur le scope ${scope}:`, error);
      return locale === "fr" ? frLayout : enLayout; // Fallback sécu
    }
  }
};