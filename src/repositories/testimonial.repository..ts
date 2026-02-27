
// src/repositories/testimonial.repository.ts
// ==============================================================================
import { api as apiClient } from "@/lib/api-client";
import type {
  Testimonial,
  CreateTestimonialPayload,
  UpdateTestimonialPayload,
} from "@/types/api/testimonial.types";

export const testimonialRepository = {
  /** GET /api/temoignages — liste publique (approuvés seulement) */
  getPublicList: (): Promise<Testimonial[]> =>
    apiClient.get<Testimonial[]>("/temoignages", { revalidate: 300 }),

  /** POST /api/temoignages — soumettre un témoignage public */
  submit: (payload: CreateTestimonialPayload): Promise<{ detail: string }> =>
    apiClient.post("/temoignages", payload),

  /** GET /api/admin/temoignages */
  adminGetList: (): Promise<Testimonial[]> =>
    apiClient.get<Testimonial[]>("/admin/temoignages"),

  /** PATCH /api/admin/temoignages/{id} */
  adminUpdate: (id: string, payload: UpdateTestimonialPayload): Promise<Testimonial> =>
    apiClient.patch(`/admin/temoignages/${id}`, payload),

  /** DELETE /api/admin/temoignages/{id} */
  adminDelete: (id: string): Promise<void> =>
    apiClient.delete(`/admin/temoignages/${id}`),

  /** POST /api/admin/temoignages/{id}/approuver */
  adminApprove: (id: string): Promise<Testimonial> =>
    apiClient.post(`/admin/temoignages/${id}/approuver`, {}),

  /** POST /api/admin/temoignages/{id}/rejeter */
  adminReject: (id: string): Promise<Testimonial> =>
    apiClient.post(`/admin/temoignages/${id}/rejeter`, {}),
};



