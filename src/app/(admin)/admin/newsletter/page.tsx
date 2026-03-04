export const dynamic = "force-dynamic";
import { newsletterDictionary } from "@/dictionaries/data";
import AdminNewsletterClient from "@/components/admin/AdminNewsletterClient";

async function getNewsletterData() {
  try {
    const [subsResponse, annResponse] = await Promise.all([
      newsletterDictionary.admin.getSubscribers({ page_size: 100 }),
      newsletterDictionary.admin.getAnnouncements({ page_size: 50 })
    ]);

    return {
      subscribers: subsResponse.results || [],
      announcements: annResponse.results || []
    };
  } catch (error) {
    console.error("Erreur Newsletter:", error);
    return { subscribers: [], announcements: [] };
  }
}

export default async function AdminNewsletterPage() {
  const data = await getNewsletterData();
  return (
    <AdminNewsletterClient 
      initialSubscribers={data.subscribers} 
      initialAnnouncements={data.announcements} 
    />
  );
}