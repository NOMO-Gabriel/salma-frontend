
// src/repositories/kpi.repository.ts
// ==============================================================================
import { api as apiClient } from "@/lib/api-client";
import type {
  KpiSnapshot,
  KpiRealtime,
  ConversionRate,
  VisitorEvent,
  EventFilters,
  KpiSnapshotFilters,
} from "@/types/api/kpi.types";
import type { PaginatedResponse } from "@/types";

export const kpiRepository = {
  /** GET /api/admin/kpi/snapshots */
  adminGetSnapshots: (filters?: KpiSnapshotFilters): Promise<KpiSnapshot[]> => {
    const params: Record<string, string> = {};
    if (filters?.date_debut) params.date_debut = filters.date_debut;
    if (filters?.date_fin) params.date_fin = filters.date_fin;
    if (filters?.periode) params.periode = filters.periode;
    return apiClient.get("/admin/kpi/snapshots", { params });
  },

  /** GET /api/admin/kpi/snapshots/{date} */
  adminGetSnapshotByDate: (date: string): Promise<KpiSnapshot> =>
    apiClient.get(`/admin/kpi/snapshots/${date}`),

  /** GET /api/admin/kpi/temps-reel */
  adminGetRealtime: (): Promise<KpiRealtime> =>
    apiClient.get("/admin/kpi/temps-reel"),

  /** GET /api/admin/kpi/conversion */
  adminGetConversion: (): Promise<ConversionRate> =>
    apiClient.get("/admin/kpi/conversion"),

  /** GET /api/admin/kpi/evenements */
  adminGetEvents: (filters?: EventFilters): Promise<PaginatedResponse<VisitorEvent>> => {
    const params: Record<string, string> = {};
    if (filters?.type) params.type = filters.type;
    if (filters?.page) params.page = filters.page;
    if (filters?.bourse_id) params.bourse_id = filters.bourse_id;
    if (filters?.date_debut) params.date_debut = filters.date_debut;
    if (filters?.date_fin) params.date_fin = filters.date_fin;
    return apiClient.get("/admin/kpi/evenements", { params });
  },
};

