// src/repositories/service.repository.ts
// ==============================================================================
import { api as apiClient } from "@/lib/api-client";
import type { 
  ServicePublic, 
  ServiceAdmin, 
  CreateServicePayload, 
  UpdateServicePayload 
} from "@/types/api/service.types";

export const serviceRepository = {
  /** GET /api/services — liste publique des services actifs */
  getPublicList: (): Promise<ServicePublic[]> =>
    apiClient.get<ServicePublic[]>("/services", { revalidate: 300 }),

  /** GET /api/services/{slug} */
  getPublicBySlug: (slug: string): Promise<ServicePublic> =>
    apiClient.get<ServicePublic>(`/services/${slug}`, { revalidate: 300 }),

  /** GET /api/admin/services */
  adminGetList: (): Promise<ServiceAdmin[]> =>
    apiClient.get<ServiceAdmin[]>("/admin/services"),

  /** GET /api/admin/services/{id} */
  adminGetById: (id: string): Promise<ServiceAdmin> =>
    apiClient.get<ServiceAdmin>(`/admin/services/${id}`),

  /** POST /api/admin/services */
  adminCreate: (payload: CreateServicePayload): Promise<ServiceAdmin> =>
    apiClient.post<ServiceAdmin>("/admin/services", payload),

  /** PUT /api/admin/services/{id} */
  adminUpdate: (id: string, payload: CreateServicePayload): Promise<ServiceAdmin> =>
    apiClient.put<ServiceAdmin>(`/admin/services/${id}`, payload),

  /** PATCH /api/admin/services/{id} */
  adminPatch: (id: string, payload: UpdateServicePayload): Promise<ServiceAdmin> =>
    apiClient.patch<ServiceAdmin>(`/admin/services/${id}`, payload),

  /** DELETE /api/admin/services/{id} */
  adminDelete: (id: string): Promise<void> =>
    apiClient.delete(`/admin/services/${id}`),
};