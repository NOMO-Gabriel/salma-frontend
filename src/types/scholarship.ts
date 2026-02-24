/**
 * Type utilitaire pour les champs traduisibles
 */
export type I18nText = {
  fr: string;
  en: string;
};

/**
 * Enums basés sur les besoins envoyés par le collaborateur
 */
export type DestinationCountry = 'CHINE' | 'ALLEMAGNE' | 'BOTH';

export type StudyLevel = 'LICENCE' | 'MASTER' | 'DOCTORAT' | 'POST_DOC';

export type ScholarshipStatus = 'OUVERT' | 'FERMÉ' | 'URGENT' | 'EN_ATTENTE';

export type CoverageType = 'TOTALE' | 'PARTIELLE' | 'SCOLARITÉ' | 'ALLOCATION';

/**
 * Interface principale de la Bourse
 */
export interface Scholarship {
  id: string;
  
  // --- Informations Générales ---
  title: I18nText;
  organization: I18nText;
  description: I18nText; // Texte riche (HTML ou Markdown)
  destinationCountry: DestinationCountry;
  imageUrl?: string; // Ajouté pour le frontend
  
  // --- Critères d'Éligibilité ---
  level: StudyLevel;
  studyFields: I18nText[]; // Tableau de domaines traduits
  ageLimit?: number;
  languageRequirement: I18nText; // ex: { fr: "HSK 4 minimum", en: "HSK 4 minimum" }
  
  // --- Logistique et Disponibilité ---
  status: ScholarshipStatus;
  deadline: string; // Format ISO: "2026-03-30"
  coverageType: CoverageType;
  amountDetails: I18nText; // ex: { fr: "3000 RMB / mois", en: "3000 RMB / month" }
  
  // --- Gestion Admin & Liens ---
  officialLink?: string;
  createdAt: string;
  updatedAt: string;
}