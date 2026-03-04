export const dynamic = "force-dynamic";
import { contactAdminRepository } from "@/repositories/contact.repository";
import AdminContactsClient from "@/components/admin/AdminContactsClient";

async function getContacts() {
  try {
    // On récupère la liste paginée
    return await contactAdminRepository.getList({ page: 1, page_size: 50 });
  } catch (error) {
    console.error("Erreur Contacts:", error);
    return { results: [], count: 0 };
  }
}

export default async function AdminContactsPage() {
  const data = await getContacts();
  return <AdminContactsClient initialContacts={data} />;
}