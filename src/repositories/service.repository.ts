
// src/repositories/service.repository.ts
// ==============================================================================
import { api as apiClient } from "@/lib/api-client";
import type { Service, CreateServicePayload, UpdateServicePayload } from "@/types/api/service.types";

export const serviceRepository = {
  /** GET /api/services — liste publique des services actifs */
  getPublicList: (): Promise<Service[]> =>
    apiClient.get<Service[]>("/services", { revalidate: 300 }),

  /** GET /api/services/{slug} */
  getPublicBySlug: (slug: string): Promise<Service> =>
    apiClient.get<Service>(`/services/${slug}`, { revalidate: 300 }),

  /** GET /api/admin/services */
  adminGetList: (): Promise<Service[]> =>
    apiClient.get<Service[]>("/admin/services"),

  /** GET /api/admin/services/{id} */
  adminGetById: (id: string): Promise<Service> =>
    apiClient.get(`/admin/services/${id}`),

  /** POST /api/admin/services */
  adminCreate: (payload: CreateServicePayload): Promise<Service> =>
    apiClient.post("/admin/services", payload),

  /** PUT /api/admin/services/{id} */
  adminUpdate: (id: string, payload: CreateServicePayload): Promise<Service> =>
    apiClient.put(`/admin/services/${id}`, payload),

  /** PATCH /api/admin/services/{id} */
  adminPatch: (id: string, payload: UpdateServicePayload): Promise<Service> =>
    apiClient.patch(`/admin/services/${id}`, payload),

  /** DELETE /api/admin/services/{id} */
  adminDelete: (id: string): Promise<void> =>
    apiClient.delete(`/admin/services/${id}`),
};
