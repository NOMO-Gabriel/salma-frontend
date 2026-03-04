export const dynamic = "force-dynamic";
import { cmsAdminRepository } from "@/repositories/cms.repository";
import AdminCmsClient from "@/components/admin/AdminCmsClient";

async function getPages() {
  try {
    const data = await cmsAdminRepository.getPages();
    // On renvoie uniquement le tableau contenu dans 'results'
    return data.results || [];
  } catch (error) {
    console.error("Erreur CMS:", error);
    return [];
  }
}

export default async function AdminCmsPage() {
  const pages = await getPages();

  return <AdminCmsClient initialPages={pages} />;
}