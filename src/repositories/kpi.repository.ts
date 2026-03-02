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
  /** GET /api/admin/kpi/snapshots/ (Utilise le router -> slash requis) */
  adminGetSnapshots: (filters?: KpiSnapshotFilters): Promise<KpiSnapshot[]> => {
    const params: Record<string, string> = {};
    if (filters?.date_debut) params.date_debut = filters.date_debut;
    if (filters?.date_fin) params.date_fin = filters.date_fin;
    if (filters?.periode) params.periode = filters.periode;
    return apiClient.get("/admin/kpi/snapshots/", { params });
  },

  /** GET /api/admin/kpi/temps-reel (Manuel -> PAS de slash selon urls_admin.py) */
  adminGetRealtime: (): Promise<KpiRealtime> =>
    apiClient.get("/admin/kpi/temps-reel"),

  /** GET /api/admin/kpi/conversion (Manuel -> PAS de slash) */
  adminGetConversion: (): Promise<ConversionRate> =>
    apiClient.get("/admin/kpi/conversion"),

  /** GET /api/admin/kpi/evenements (Manuel -> PAS de slash) */
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