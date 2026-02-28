// src/types/api/kpi.types.ts
// ==============================================================================

export type EventType =
  | "PAGE_VIEW"
  | "BOURSE_VUE"
  | "BOURSE_CLIC_DETAIL"
  | "CONTACT_SOUMIS"
  | "NEWSLETTER_INSCRIPTION"
  | "CHATBOT_OUVERT"
  | "WHATSAPP_CLIC"
  | "RENDEZ_VOUS_SOUMIS";

// --- Tracking côté visiteur (public) -----------------------------------------

export interface VisitorEventPayload {
  type: EventType;
  page?: string;           // URL ou slug de page
  bourse_id?: string;      // si l'événement concerne une bourse
  metadata?: Record<string, string | number | boolean>;
}

// --- Snapshots KPI (admin) ---------------------------------------------------

export interface KpiSnapshot {
  id: string;
  date: string;            // "2026-02-27"
  total_visiteurs: number;
  total_vues_bourses: number;
  total_contacts: number;
  total_newsletter: number;
  taux_conversion: number; // 0.0 → 1.0 (ex: 0.035 = 3.5%)
  bourses_les_plus_vues: BourseKpi[];
}

export interface BourseKpi {
  bourse_id: string;
  titre: string;
  nb_vues: number;
  nb_contacts: number;
  taux_conversion: number;
}

// --- Stats temps réel --------------------------------------------------------

export interface KpiRealtime {
  total_visiteurs:number;
  visiteurs_aujourd_hui: number;
  vues_bourses_aujourd_hui: number;
  contacts_aujourd_hui: number;
  contacts_en_attente: number;
  abonnes_total: number;
  taux_conversion_global: number;
  evolution_7j: {
    visiteurs: number[];  // array de 7 valeurs (j-6 → aujourd'hui)
    contacts: number[];
  };
}

// --- Taux de conversion -------------------------------------------------------

export interface ConversionRate {
  global: number;
  par_bourse: BourseKpi[];
  par_page: { page: string; vues: number; conversions: number; taux: number }[];
}

// --- Événements bruts --------------------------------------------------------

export interface VisitorEvent {
  id: string;
  type: EventType;
  page: string;
  bourse_id: string | null;
  ip_hash: string;          // IP hashée (pas de données personnelles)
  user_agent: string;
  metadata: Record<string, unknown>;
  date_creation: string;
}

export interface EventFilters {
  type?: EventType;
  page?: string;
  bourse_id?: string;
  date_debut?: string;
  date_fin?: string;
  page_number?: number;
}

export interface KpiSnapshotFilters {
  date_debut?: string;
  date_fin?: string;
  periode?: "jour" | "semaine" | "mois";
}