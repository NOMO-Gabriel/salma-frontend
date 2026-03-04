export const dynamic = "force-dynamic";
import { mediaRepository } from "@/repositories/media.repository";
import AdminMediaClient from "@/components/admin/AdminMediaClient";

async function getMedias() {
  try {
    return await mediaRepository.getList({ page_size: 50 });
  } catch (error) {
    console.error("Erreur Médiathèque:", error);
    return { results: [], count: 0, next: null, previous: null };
  }
}

export default async function AdminMediasPage() {
  const data = await getMedias();
  return <AdminMediaClient initialData={data} />;
}