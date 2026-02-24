// src/types/index.ts
// Point d'entrée central des types TypeScript de SALMA
// Ajouter ici toutes les interfaces métier du projet

// ============================================================
//  TYPES MÉTIER SALMA
// ============================================================

/**
 * Langues supportées par l'application
 * Pour ajouter une langue : ajouter une entrée ici + dans src/config/i18n.ts
 */
export type Locale = "fr" | "en";

/**
 * Catégories de services proposés par SALMA
 */
export type ServiceCategory = "visa" | "bourse" | "hebergement" | "autre";

/**
 * Représente un service proposé par l'agence
 * Le contenu textuel est géré via i18n en utilisant l'id
 */
export interface Service {
  id: string;          // Clé unique, liée aux dictionnaires i18n
  category: ServiceCategory;
  icon: string;        // Nom d'icône
  isActive: boolean;   // Affichage conditionnel
}

/**
 * Représente un type de visa
 * Le contenu textuel (nom, description) est géré via i18n
 */
export interface VisaType {
  id: string;             // Clé unique, liée aux dictionnaires i18n
  processingTime: string; // ex: "3 semaines"
  price?: number;
  currency?: string;
  isActive: boolean;
}

/**
 * Représente un témoignage client
 */
export interface Testimonial {
  id: string;
  authorName: string;
  authorCountry: string;
  avatarUrl?: string;
  rating: number;      // 1 à 5
}

/**
 * Représente une FAQ
 * Le contenu (question, réponse) est géré via i18n
 */
export interface FaqItem {
  id: string;
  category: string;
}