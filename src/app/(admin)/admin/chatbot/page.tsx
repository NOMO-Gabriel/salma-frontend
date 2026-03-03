// src/app/(admin)/admin/chatbot/page.tsx
import { chatbotRepository } from "@/repositories/chatbot.repository";
import AdminChatbotClient from "@/components/admin/AdminChatbotClient";

async function getFaqs() {
  try {
    const data = await chatbotRepository.adminGetFaqs();
    
    /**
     * Le backend DRF avec DefaultRouter renvoie un objet paginé { results: [...] }
     * mais le repository est typé pour renvoyer directement le tableau.
     * On utilise @ts-expect-error pour gérer la structure réelle de l'API (results).
     */
    // @ts-expect-error - L'API renvoie { results: FaqEntry[] }
    return data.results || [];
  } catch (error) {
    console.error("Erreur Chatbot FAQ:", error);
    return [];
  }
}

export default async function AdminChatbotPage() {
  const faqs = await getFaqs();
  
  return <AdminChatbotClient initialFaqs={faqs} />;
}