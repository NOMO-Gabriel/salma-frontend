import { chatbotRepository } from "@/repositories/chatbot.repository";
import AdminChatbotClient from "@/components/admin/AdminChatbotClient";

async function getFaqs() {
  try {
    const data = await chatbotRepository.adminGetFaqs();
    // Le backend DRF avec DefaultRouter renvoie toujours un objet paginé { results: [...] }
    // @ts-ignore
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