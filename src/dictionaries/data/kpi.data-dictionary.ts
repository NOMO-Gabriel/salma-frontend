// src/dictionaries/data/kpi.data-dictionary.ts
// ==============================================================================
//  Dictionnaire de données — KPI & Analytics
//  Point d'entrée unique pour toutes les stats du dashboard
// ==============================================================================

import { kpiRepository, eventsRepository } from "@/repositories/others.repository";
import type {
  KpiRealtime,
  KpiSnapshot,
  ConversionRate,
  VisitorEvent,
  VisitorEventPayload,
  EventFilters,
  KpiSnapshotFilters,
} from "@/types/api/kpi.types";
import type { PaginatedResponse } from "@/types";

export const kpiDictionary = {
  // --- Tracking public (côté client, silencieux) ----------------------------

  track: (payload: VisitorEventPayload): Promise<void> =>
    eventsRepository.track(payload),

  trackPageView: (page: string): Promise<void> =>
    eventsRepository.trackPageView(page),

  trackScholarshipView: (bourseId: string): Promise<void> =>
    eventsRepository.trackScholarshipView(bourseId),

  trackContact: (bourseId?: string): Promise<void> =>
    eventsRepository.trackContactSubmit(bourseId),

  trackWhatsapp: (bourseId?: string): Promise<void> =>
    eventsRepository.trackWhatsappClick(bourseId),

  trackNewsletter: (): Promise<void> =>
    eventsRepository.trackNewsletterSignup(),

  // --- Dashboard admin -------------------------------------------------------

  admin: {
    /**
     * Stats en temps réel — widget principal du dashboard.
     * Appelé avec polling côté client (ex: toutes les 30s).
     */
    getRealtime: (): Promise<KpiRealtime> =>
      kpiRepository.adminGetRealtime(),

    /**
     * Snapshots historiques pour les graphiques.
     */
    getSnapshots: (filters?: KpiSnapshotFilters): Promise<KpiSnapshot[]> =>
      kpiRepository.adminGetSnapshots(filters),

    /**
     * Taux de conversion global + par bourse.
     */
    getConversion: (): Promise<ConversionRate> =>
      kpiRepository.adminGetConversion(),

    /**
     * Événements bruts filtrables (debug, analyse fine).
     */
    getEvents: (filters?: EventFilters): Promise<PaginatedResponse<VisitorEvent>> =>
      kpiRepository.adminGetEvents(filters),

    /**
     * Données pour le widget "Top bourses" du dashboard.
     * Retourne les 5 bourses avec le plus de vues.
     */
    getTopScholarships: async (limit = 5) => {
      const conversion = await kpiRepository.adminGetConversion();
      return conversion.par_bourse
        .sort((a, b) => b.nb_vues - a.nb_vues)
        .slice(0, limit);
    },
  },
};