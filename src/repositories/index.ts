// src/repositories/index.ts
// ==============================================================================
//  Barrel export — tous les repositories SALMA
//  Usage : import { scholarshipAdminRepository, authRepository } from "@/repositories"
// ==============================================================================

export { authRepository } from "./auth.repository";
export { scholarshipPublicRepository, scholarshipAdminRepository } from "./scholarship.repository";
export { mediaRepository } from "./media.repository";
export { cmsRepository } from "./cms.repository";
export { contactRepository } from "./contact.repository";
export {
  newsletterRepository,
  testimonialRepository,
  chatbotRepository,
  serviceRepository,
  kpiRepository,
  eventsRepository,
} from "./others.repository";