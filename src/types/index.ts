// src/types/index.ts
// ==============================================================================
//  Barrel export — tous les types TypeScript du projet SALMA
//  Usage : import type { Scholarship, AdminUser, KpiRealtime } from "@/types"
// ==============================================================================

// --- Auth --------------------------------------------------------------------
export type * from "@/types/api/auth.types";

// --- Bourses -----------------------------------------------------------------
export type * from "@/typesapi/scholarship.types";

// --- Médias ------------------------------------------------------------------
export type * from "@/typesapi/media.types";

// --- CMS (Pages, Blocs, Config, Vidéos) -------------------------------------
export type * from "@/typesapi/cms.types";

// --- Contact -----------------------------------------------------------------
export type * from "@/typesapi/contact.types";

// --- Newsletter & Annonces ---------------------------------------------------
export type * from "@/typesapi/newsletter.types";

// --- Témoignages -------------------------------------------------------------
export type * from "@/typesapi/testimonial.types";

// --- Chatbot -----------------------------------------------------------------
export type * from "@/typesapi/chatbot.types";

// --- Services ----------------------------------------------------------------
export type * from "@/typesapi/service.types";

// --- KPI & Analytics ---------------------------------------------------------
export type * from "@/typesapi/kpi.types";

// Helper functions (non-type exports — à importer séparément si besoin)
// Ex: import { toFieldVisibilityMap } from "@/types/api/scholarship.types"