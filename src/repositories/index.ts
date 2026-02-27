// src/repositories/index.ts
// ==============================================================================
//  Barrel export — tous les repositories SALMA
//  Usage : import { scholarshipAdminRepository, authRepository } from "@/repositories"
// ==============================================================================

// --- Auth --------------------------------------------------------------------
export { authRepository } from "./auth.repository";

// --- Bourses -----------------------------------------------------------------
export { scholarshipPublicRepository, scholarshipAdminRepository } from "./scholarship.repository";

// --- Médias ------------------------------------------------------------------
export { mediaRepository } from "./media.repository";

// --- CMS (Pages, Blocs, Config, Vidéos) -------------------------------------
export { cmsPublicRepository, cmsAdminRepository } from "./cms.repository";

// --- Contact -----------------------------------------------------------------
export { contactPublicRepository, contactAdminRepository } from "./contact.repository";

// --- Newsletter & Annonces ---------------------------------------------------
export { newsletterRepository } from "./newsletter.repository";

// --- Témoignages -------------------------------------------------------------
export { testimonialPublicRepository, testimonialAdminRepository } from "./testimonial.repository";

// --- Chatbot -----------------------------------------------------------------
export { chatbotRepository } from "./chatbot.repository";

// --- Services ----------------------------------------------------------------
export { serviceRepository } from "./service.repository";

// --- KPI & Analytics ---------------------------------------------------------
export { kpiRepository } from "./kpi.repository";

// --- Tracking visiteurs ------------------------------------------------------
export { eventsRepository } from "./events.repository";