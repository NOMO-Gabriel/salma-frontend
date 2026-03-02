// src/lib/chatbot.fallback.ts
// ==============================================================================
// Chatbot Fallback — "Cerveau local" SALMA
//
// Base de connaissances statique utilisée quand :
//   1. NEXT_PUBLIC_STATIC_CONTENT=true (mode statique)
//   2. L'API Django/Gemini est indisponible (timeout, 500)
//
// Recherche par mots-clés (insensible à la casse et aux accents).
// Retourne la meilleure correspondance ou null.
// ==============================================================================

import type { ChatbotFallbackEntry } from "@/types/ui/chatbot-widget.types";

// — Base de connaissances -------------------------------------------------------

/**
 * Entrées FAQ hardcodées — couvrent les 4 Quick Actions + questions fréquentes.
 * Les mots-clés sont en minuscules, sans accents.
 */
const FALLBACK_ENTRIES: ChatbotFallbackEntry[] = [
  {
    id: "scholarships-general",
    keywords: [
      "bourse", "bourses", "scholarship", "scholarships",
      "disponible", "available", "liste", "list", "offre",
    ],
    answer_fr:
      "Nous proposons des bourses complètes et partielles pour la Chine (programme CSC) et l'Allemagne (programme DAAD). " +
      "Les bourses couvrent les frais de scolarité, le logement et parfois une allocation mensuelle. " +
      "Consultez notre catalogue pour découvrir toutes les opportunités actuelles, ou prenez rendez-vous avec un conseiller pour un accompagnement personnalisé.",
    answer_en:
      "We offer full and partial scholarships for China (CSC program) and Germany (DAAD program). " +
      "Scholarships cover tuition fees, accommodation, and sometimes a monthly allowance. " +
      "Check our catalog to discover all current opportunities, or book an appointment with an advisor for personalized guidance.",
  },
  {
    id: "china",
    keywords: [
      "chine", "china", "csc", "chinois", "chinese",
      "pekin", "beijing", "shanghai", "wuhan",
      "medecine", "medicine", "mbbs", "ingenierie",
    ],
    answer_fr:
      "Étudier en Chine avec AG Technologies, c'est bénéficier du programme CSC (China Scholarship Council). " +
      "Délai moyen d'obtention : 3 semaines. Filières populaires : Médecine (MBBS), Ingénierie, Business, IT. " +
      "La bourse CSC couvre 100% des frais de scolarité, le logement sur campus et une allocation mensuelle. " +
      "Nous vous accompagnons de A à Z : dossier, visa, préparation au départ.",
    answer_en:
      "Studying in China with AG Technologies means benefiting from the CSC (China Scholarship Council) program. " +
      "Average processing time: 3 weeks. Popular fields: Medicine (MBBS), Engineering, Business, IT. " +
      "The CSC scholarship covers 100% tuition, on-campus housing, and a monthly allowance. " +
      "We support you from A to Z: application, visa, and departure preparation.",
  },
  {
    id: "germany",
    keywords: [
      "allemagne", "germany", "daad", "allemand", "german",
      "berlin", "munich", "master", "anglais", "english",
    ],
    answer_fr:
      "L'Allemagne offre des Masters en anglais avec le programme DAAD et des frais de scolarité très réduits. " +
      "Les universités publiques allemandes sont quasi-gratuites (environ 300€/semestre de frais administratifs). " +
      "Profils idéaux : scientifiques, ingénieurs, économistes. " +
      "AG Technologies vous aide avec la candidature, la lettre de motivation et le visa.",
    answer_en:
      "Germany offers English-taught Masters through the DAAD program with very low tuition fees. " +
      "German public universities are nearly free (around €300/semester administrative fees). " +
      "Ideal profiles: scientists, engineers, economists. " +
      "AG Technologies helps you with the application, motivation letter, and visa.",
  },
  {
    id: "rdv",
    keywords: [
      "rdv", "rendez-vous", "rendezvous", "appointment",
      "contact", "contacter", "appeler", "call",
      "conseiller", "advisor", "consultation",
    ],
    answer_fr:
      "Vous pouvez prendre rendez-vous avec un de nos conseillers de plusieurs façons : " +
      "par téléphone au +237 699 450 984, via WhatsApp, ou en remplissant le formulaire sur notre page Contact. " +
      "Nos conseillers sont disponibles du lundi au vendredi, de 8h à 18h. " +
      "La première consultation est gratuite et sans engagement !",
    answer_en:
      "You can book an appointment with one of our advisors in several ways: " +
      "by phone at +237 699 450 984, via WhatsApp, or by filling out the form on our Contact page. " +
      "Our advisors are available Monday to Friday, 8 AM to 6 PM. " +
      "The first consultation is free and with no obligation!",
  },
  {
    id: "prix",
    keywords: [
      "prix", "price", "cout", "cost", "tarif", "rate",
      "combien", "how much", "payer", "pay", "frais", "fees",
    ],
    answer_fr:
      "Nos tarifs dépendent du type de service et de la destination choisie. " +
      "Pour obtenir un devis personnalisé, je vous invite à prendre rendez-vous avec un conseiller. " +
      "La consultation initiale est gratuite !",
    answer_en:
      "Our rates depend on the type of service and chosen destination. " +
      "To get a personalized quote, I invite you to book an appointment with an advisor. " +
      "The initial consultation is free!",
  },
  {
    id: "visa",
    keywords: [
      "visa", "passeport", "passport", "document",
      "ambassade", "embassy", "procedure", "demarche",
    ],
    answer_fr:
      "AG Technologies vous accompagne dans toutes les démarches de visa d'études. " +
      "Nous préparons votre dossier complet : lettre d'admission, justificatifs financiers, " +
      "formulaire de demande et préparation à l'entretien consulaire. " +
      "Le taux de réussite de nos dossiers est supérieur à 95%.",
    answer_en:
      "AG Technologies supports you through the entire student visa process. " +
      "We prepare your complete file: admission letter, financial documents, " +
      "application form, and consular interview preparation. " +
      "Our file success rate is over 95%.",
  },
];

// — Moteur de recherche local ---------------------------------------------------

/**
 * Supprime les accents d'une chaîne pour la comparaison.
 */
function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Recherche la meilleure entrée fallback correspondant à la question.
 * Score = nombre de mots-clés trouvés dans la question.
 * Retourne null si aucun mot-clé ne matche.
 *
 * @param question - Question de l'utilisateur
 * @returns L'entrée avec le meilleur score, ou null
 */
export function searchFallback(question: string): ChatbotFallbackEntry | null {
  const normalized = removeAccents(question.toLowerCase());

  let bestEntry: ChatbotFallbackEntry | null = null;
  let bestScore = 0;

  for (const entry of FALLBACK_ENTRIES) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  return bestEntry;
}