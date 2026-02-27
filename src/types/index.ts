// src/types/index.ts
// ==============================================================================
//  Barrel export — tous les types TypeScript du projet SALMA
//  Usage : import type { Scholarship, AdminUser, KpiRealtime } from "@/types"
// ==============================================================================

export type * from "./api/auth.types";
export type * from "./api/scholarship.types";
export type * from "./api/media.types";
export type * from "./api/cms.types";
export type * from "./api/contact.types";
export type * from "./api/newsletter.types";
export type * from "./api/testimonial.types";
export type * from "./api/chatbot.types";
export type * from "./api/service.types";
export type * from "./api/kpi.types";

// Helper functions (non-type exports — à importer séparément si besoin)
// import { toFieldVisibilityMap, SCHOLARSHIP_VISIBILITY_FIELDS } from "@/types/api/scholarship.types"

// Re-export du type commun PaginatedResponse
export type { PaginatedResponse } from "./api/scholarship.types";