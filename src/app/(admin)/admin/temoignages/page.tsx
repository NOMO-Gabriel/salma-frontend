export const dynamic = "force-dynamic";
import { testimonialAdminRepository } from "@/repositories/testimonial.repository";
import AdminTestimonialsClient from "@/components/admin/AdminTestimonialsClient";

async function getTestimonials() {
  try {
    return await testimonialAdminRepository.getList({ page_size: 50 });
  } catch (error) {
    console.error("Erreur Témoignages:", error);
    return { results: [], count: 0 };
  }
}

export default async function AdminTemoignagesPage() {
  const data = await getTestimonials();
  return <AdminTestimonialsClient initialData={data} />;
}