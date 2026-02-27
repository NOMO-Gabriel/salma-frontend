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
export { kpiDictionary } from "./kpi.data-dictionary";

// Les autres dictionnaires de données peuvent être importés directement
// depuis leur fichier ou ajoutés ici au fur et à mesure
export {
  newsletterRepository as newsletterDictionary,
  testimonialRepository as testimonialDictionary,
  serviceRepository as serviceDictionary,
  chatbotRepository as chatbotDictionary,
  mediaRepository as mediaDictionary,
} from "@/repositories";