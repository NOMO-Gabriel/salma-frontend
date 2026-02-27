// src/dictionaries/data/index.ts
// ==============================================================================
//  Barrel export — Dictionnaires de données SALMA
//
//  RÈGLE : Les Server Components et Client Components importent UNIQUEMENT d'ici.
//  Jamais directement depuis les repositories.
//
//  Usage :
//    import { scholarshipDictionary } from "@/dictionaries/data"
//    const featured = await scholarshipDictionary.getFeatured()
// ==============================================================================

export { scholarshipDictionary } from "./scholarship.data-dictionary";
export { cmsDictionary } from "./cms.data-dictionary";
export { contactDictionary } from "./contact.data-dictionary";
export { newsletterDictionary } from "./newsletter.data-dictionary";
export { kpiDictionary } from "./kpi.data-dictionary";

// Les modules sans dictionnaire dédié sont accessibles via les repositories
// Usage : import { mediaRepository } from "@/repositories"