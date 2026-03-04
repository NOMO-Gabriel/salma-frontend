// src/lib/chatbot.fallback.ts
// ==============================================================================
// Chatbot Fallback — "Cerveau local" SALMA
//
// Base de connaissances statique utilisée quand :
//   1. NEXT_PUBLIC_STATIC_CONTENT=true (mode statique)
//   2. L'API Django/Gemini est indisponible (timeout, 500)
//
// Enrichi avec CTA contextuels et suggestions par catégorie.
// Recherche par mots-clés (insensible à la casse et aux accents).
// ==============================================================================

import type { ChatbotFallbackEntry } from "@/types/ui/chatbot-widget.types";
import type { ChatbotCTA } from "@/types/api/chatbot.types";

// — Catalogue CTA local (miroir du backend) ------------------------------------

const WHATSAPP_URL = "https://wa.me/237699450984";

/**
 * Catalogue complet des CTA disponibles en mode fallback.
 * Même structure que le backend pour cohérence.
 */
const FALLBACK_CTA_CATALOG: Record<string, { label_fr: string; label_en: string; url: string; type: "conversion" | "navigation" }> = {
  rdv:               { label_fr: "📅 Prendre rendez-vous",       label_en: "📅 Book an appointment",       url: "/contact",                    type: "conversion" },
  whatsapp:          { label_fr: "💬 Discuter sur WhatsApp",     label_en: "💬 Chat on WhatsApp",          url: WHATSAPP_URL,                  type: "conversion" },
  newsletter:        { label_fr: "📩 S'abonner à la newsletter", label_en: "📩 Subscribe to newsletter",   url: "#newsletter",                 type: "conversion" },
  bourses:           { label_fr: "🎓 Voir les bourses",          label_en: "🎓 Browse scholarships",       url: "/bourses",                    type: "navigation" },
  bourses_chine:     { label_fr: "🇨🇳 Bourses en Chine",         label_en: "🇨🇳 Scholarships in China",    url: "/bourses?pays=chine",         type: "navigation" },
  bourses_allemagne: { label_fr: "🇩🇪 Bourses en Allemagne",     label_en: "🇩🇪 Scholarships in Germany",  url: "/bourses?pays=allemagne",     type: "navigation" },
  services:          { label_fr: "🛠 Nos services",              label_en: "🛠 Our services",              url: "/services",                   type: "navigation" },
  a_propos:          { label_fr: "ℹ️ À propos de SALMA",         label_en: "ℹ️ About SALMA",              url: "/a-propos",                   type: "navigation" },
  contact:           { label_fr: "📝 Formulaire de contact",     label_en: "📝 Contact form",              url: "/contact",                    type: "navigation" },
};

const DEFAULT_CTA_IDS = ["rdv", "whatsapp", "newsletter"];

// — Base de connaissances -------------------------------------------------------

const FALLBACK_ENTRIES: ChatbotFallbackEntry[] = [
  // ── Bourses générales ─────────────────────────────────────────
  {
    id: "scholarships-general",
    keywords: ["bourse", "bourses", "scholarship", "scholarships", "disponible", "available", "liste", "list", "offre"],
    answer_fr:
      "Nous proposons des bourses complètes et partielles pour la Chine (programme CSC) et l'Allemagne (programme DAAD). " +
      "Les bourses couvrent les frais de scolarité, le logement et parfois une allocation mensuelle. " +
      "Consultez notre catalogue pour découvrir toutes les opportunités actuelles.",
    answer_en:
      "We offer full and partial scholarships for China (CSC program) and Germany (DAAD program). " +
      "Scholarships cover tuition, housing, and sometimes a monthly allowance. " +
      "Browse our catalog to discover all current opportunities.",
    cta_ids: ["bourses", "rdv", "whatsapp"],
    suggestions_fr: ["Comment postuler à une bourse ?", "Quelles bourses en Chine ?"],
    suggestions_en: ["How to apply for a scholarship?", "Which scholarships in China?"],
  },

  // ── Chine ─────────────────────────────────────────────────────
  {
    id: "china",
    keywords: ["chine", "china", "csc", "pekin", "beijing", "shanghai", "wuhan", "chinois", "chinese"],
    answer_fr:
      "La Chine offre d'excellentes opportunités via le programme CSC (China Scholarship Council). " +
      "Bourses disponibles du Bachelor au Doctorat, dans des universités classées parmi les meilleures au monde. " +
      "AG Technologies vous accompagne de A à Z dans votre candidature.",
    answer_en:
      "China offers excellent opportunities through the CSC (China Scholarship Council) program. " +
      "Scholarships available from Bachelor to PhD, at world-ranked universities. " +
      "AG Technologies supports you from A to Z in your application.",
    cta_ids: ["bourses_chine", "rdv", "whatsapp"],
    suggestions_fr: ["Quels documents pour la Chine ?", "Combien de temps pour le visa ?"],
    suggestions_en: ["What documents for China?", "How long for the visa?"],
  },

  // ── Allemagne ─────────────────────────────────────────────────
  {
    id: "germany",
    keywords: ["allemagne", "germany", "daad", "berlin", "munich", "allemand", "german", "deutschland"],
    answer_fr:
      "L'Allemagne propose des programmes d'excellence via le DAAD et d'autres organismes. " +
      "Beaucoup de Masters sont enseignés entièrement en anglais, pas besoin de parler allemand. " +
      "Nos conseillers peuvent vous orienter vers le programme idéal.",
    answer_en:
      "Germany offers excellence programs through DAAD and other organizations. " +
      "Many Master programs are taught entirely in English, no need to speak German. " +
      "Our advisors can guide you to the ideal program.",
    cta_ids: ["bourses_allemagne", "rdv", "whatsapp"],
    suggestions_fr: ["Puis-je étudier sans parler allemand ?", "Quelles bourses DAAD ?"],
    suggestions_en: ["Can I study without speaking German?", "Which DAAD scholarships?"],
  },

  // ── Visa ──────────────────────────────────────────────────────
  {
    id: "visa",
    keywords: ["visa", "passeport", "passport", "consulat", "ambassade", "embassy", "delai", "duree"],
    answer_fr:
      "AG Technologies vous accompagne dans tout le processus de visa étudiant. " +
      "Nous préparons votre dossier complet : lettre d'admission, justificatifs financiers, " +
      "formulaire de demande et préparation à l'entretien consulaire. " +
      "Le taux de réussite de nos dossiers est supérieur à 95%.",
    answer_en:
      "AG Technologies supports you through the entire student visa process. " +
      "We prepare your complete file: admission letter, financial documents, " +
      "application form, and consular interview preparation. " +
      "Our file success rate is over 95%.",
    cta_ids: ["services", "rdv", "whatsapp"],
    suggestions_fr: ["Quels documents pour le visa ?", "Combien coûte le service visa ?"],
    suggestions_en: ["What documents for the visa?", "How much does the visa service cost?"],
  },

  // ── Rendez-vous / Contact ─────────────────────────────────────
  {
    id: "rdv",
    keywords: ["rendez-vous", "rdv", "appointment", "rencontrer", "meet", "contacter", "contact", "parler", "appeler"],
    answer_fr:
      "Vous pouvez prendre rendez-vous avec un conseiller SALMA de plusieurs façons : " +
      "via notre formulaire de contact, par WhatsApp, ou directement à notre bureau à Yaoundé " +
      "(Montée Anne Rouge, Immeuble Kadji).",
    answer_en:
      "You can book an appointment with a SALMA advisor in several ways: " +
      "via our contact form, by WhatsApp, or directly at our office in Yaoundé " +
      "(Montée Anne Rouge, Kadji Building).",
    cta_ids: ["contact", "whatsapp", "rdv"],
    suggestions_fr: ["Où se trouve votre bureau ?", "Quels services proposez-vous ?"],
    suggestions_en: ["Where is your office?", "What services do you offer?"],
  },

  // ── Services ──────────────────────────────────────────────────
  {
    id: "services",
    keywords: ["service", "services", "accompagnement", "aide", "help", "support", "prestation"],
    answer_fr:
      "AG Technologies propose plusieurs services : recherche de bourses, montage de dossier, " +
      "assistance visa, préparation au départ, et suivi post-arrivée. " +
      "Chaque étudiant bénéficie d'un accompagnement personnalisé.",
    answer_en:
      "AG Technologies offers several services: scholarship search, file preparation, " +
      "visa assistance, departure preparation, and post-arrival support. " +
      "Each student benefits from personalized guidance.",
    cta_ids: ["services", "rdv", "newsletter"],
    suggestions_fr: ["Comment postuler à une bourse ?", "Quel est le taux de réussite ?"],
    suggestions_en: ["How to apply for a scholarship?", "What is the success rate?"],
  },

  // ── À propos / SALMA / AGT ───────────────────────────────────
  {
    id: "about",
    keywords: ["salma", "agt", "ag technologies", "agence", "agency", "qui", "who", "propos", "about"],
    answer_fr:
      "SALMA est la plateforme digitale d'AG Technologies, une agence camerounaise basée à Yaoundé " +
      "spécialisée dans l'accompagnement des étudiants africains pour les bourses d'études " +
      "en Chine et en Allemagne. Notre mission : rendre la mobilité internationale accessible.",
    answer_en:
      "SALMA is the digital platform of AG Technologies, a Cameroonian agency based in Yaoundé " +
      "specializing in supporting African students for scholarships " +
      "in China and Germany. Our mission: making international mobility accessible.",
    cta_ids: ["a_propos", "rdv", "whatsapp"],
    suggestions_fr: ["Quelles bourses proposez-vous ?", "Comment prendre rendez-vous ?"],
    suggestions_en: ["What scholarships do you offer?", "How to book an appointment?"],
  },

  // ── Prix / Tarifs (GARDE-FOU) ─────────────────────────────────
  {
    id: "pricing",
    keywords: ["prix", "price", "tarif", "cout", "cost", "combien", "how much", "frais", "fee", "payer", "pay", "argent", "money"],
    answer_fr:
      "Nos tarifs varient selon le service demandé. Nous proposons une consultation gratuite " +
      "pour évaluer votre profil et vous faire une proposition adaptée. " +
      "Prenez rendez-vous avec un conseiller pour en savoir plus !",
    answer_en:
      "Our fees vary depending on the service requested. We offer a free consultation " +
      "to evaluate your profile and make a tailored proposal. " +
      "Book an appointment with an advisor to learn more!",
    cta_ids: ["rdv", "whatsapp", "contact"],
    suggestions_fr: ["Quels services proposez-vous ?", "La consultation est gratuite ?"],
    suggestions_en: ["What services do you offer?", "Is the consultation free?"],
  },

  // ── Newsletter / Annonces ─────────────────────────────────────
  {
    id: "newsletter",
    keywords: ["newsletter", "email", "abonner", "subscribe", "annonce", "announcement", "alerte", "alert", "nouveau"],
    answer_fr:
      "Abonnez-vous à notre newsletter pour recevoir en priorité les nouvelles bourses, " +
      "les dates limites importantes et les conseils de nos experts. " +
      "C'est gratuit et vous pouvez vous désabonner à tout moment.",
    answer_en:
      "Subscribe to our newsletter to be the first to receive new scholarships, " +
      "important deadlines, and tips from our experts. " +
      "It's free and you can unsubscribe at any time.",
    cta_ids: ["newsletter", "bourses", "whatsapp"],
    suggestions_fr: ["Quelles bourses sont disponibles ?", "Comment postuler ?"],
    suggestions_en: ["What scholarships are available?", "How to apply?"],
  },

  // ── Documents / Dossier ───────────────────────────────────────
  {
    id: "documents",
    keywords: ["document", "documents", "dossier", "papier", "releve", "diplome", "lettre", "motivation", "certificat"],
    answer_fr:
      "Les documents courants sont : passeport valide, relevés de notes, diplômes, lettre de motivation, " +
      "plan d'étude, certificat médical, photos d'identité et le formulaire de candidature. " +
      "Chaque bourse a ses spécificités, contactez-nous pour une liste personnalisée.",
    answer_en:
      "Common documents include: valid passport, transcripts, diplomas, motivation letter, " +
      "study plan, medical certificate, ID photos, and the application form. " +
      "Each scholarship has its specifics, contact us for a personalized list.",
    cta_ids: ["rdv", "whatsapp", "bourses"],
    suggestions_fr: ["Comment postuler à une bourse ?", "Quel délai pour le visa ?"],
    suggestions_en: ["How to apply for a scholarship?", "How long for the visa?"],
  },

  // ── Garantie / Remboursement ──────────────────────────────────
  {
    id: "guarantee",
    keywords: ["garantie", "guarantee", "rembourse", "refund", "arnaque", "scam", "confiance", "trust", "fiable", "reliable"],
    answer_fr:
      "AG Technologies offre une garantie satisfait ou remboursé. Si nous ne parvenons pas " +
      "à obtenir votre visa ou votre admission, nous vous remboursons intégralement. " +
      "Nous sommes une vraie agence avec un bureau physique à Yaoundé.",
    answer_en:
      "AG Technologies offers a satisfaction guarantee. If we fail to obtain " +
      "your visa or admission, we refund you in full. " +
      "We are a real agency with a physical office in Yaoundé.",
    cta_ids: ["a_propos", "rdv", "whatsapp"],
    suggestions_fr: ["Où se trouve votre bureau ?", "Quels services proposez-vous ?"],
    suggestions_en: ["Where is your office?", "What services do you offer?"],
  },
];

// — Résolution CTA locale -------------------------------------------------------

/**
 * Résout une liste d'IDs CTA en objets ChatbotCTA complets.
 * Garantit toujours 3 CTA (complète avec les défauts si besoin).
 */
export function resolveFallbackCtas(ctaIds: string[] | undefined, locale: "fr" | "en"): ChatbotCTA[] {
  const ids = ctaIds && ctaIds.length > 0 ? ctaIds : DEFAULT_CTA_IDS;
  const resolved: ChatbotCTA[] = [];
  const seen = new Set<string>();

  for (const id of ids) {
    if (id in FALLBACK_CTA_CATALOG && !seen.has(id)) {
      const cta = FALLBACK_CTA_CATALOG[id];
      resolved.push({
        id,
        label: locale === "fr" ? cta.label_fr : cta.label_en,
        url: cta.url,
        type: cta.type,
      });
      seen.add(id);
    }
    if (resolved.length >= 3) break;
  }

  // Compléter avec les défauts
  for (const fallbackId of DEFAULT_CTA_IDS) {
    if (resolved.length >= 3) break;
    if (!seen.has(fallbackId)) {
      const cta = FALLBACK_CTA_CATALOG[fallbackId];
      resolved.push({
        id: fallbackId,
        label: locale === "fr" ? cta.label_fr : cta.label_en,
        url: cta.url,
        type: cta.type,
      });
      seen.add(fallbackId);
    }
  }

  return resolved.slice(0, 3);
}

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