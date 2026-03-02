import { ScholarshipPublicListItem, ScholarshipPublicDetail } from "@/types";

/**
 * Génère un titre générique pour protéger l'information exclusive.
 * Retourne "Bourse d'études — Chine" ou "Bourse d'études — Allemagne"
 */
export function getMarketingTitle(s: ScholarshipPublicListItem | ScholarshipPublicDetail, locale: string) {
  const isChine = s.pays_destination === 'chine';
  if (locale === 'fr') {
    return isChine ? "Bourse d'études — Chine" : "Bourse d'études — Allemagne";
  }
  return isChine ? "Study Scholarship — China" : "Study Scholarship — Germany";
}