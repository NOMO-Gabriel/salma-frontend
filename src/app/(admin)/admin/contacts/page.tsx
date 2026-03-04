// src/app/(admin)/admin/contacts/page.tsx
import AdminContactsClient from "@/components/admin/AdminContactsClient";

/**
 * Page admin contacts — Server Component.
 * En SSR, le token JWT n'est pas disponible → le fetch échoue.
 * On charge la page à vide et le client rechargera les données.
 */
async function getContacts() {
  try {
    // Import dynamique pour éviter que l'erreur ne crash le build
    const { contactAdminRepository } = await import("@/repositories/contact.repository");
    return await contactAdminRepository.getList({ page: 1, page_size: 50 });
  } catch {
    // SSR sans token → on retourne un état vide
    return { results: [], count: 0 };
  }
}

export default async function AdminContactsPage() {
  const data = await getContacts();
  return <AdminContactsClient initialContacts={data} />;
}