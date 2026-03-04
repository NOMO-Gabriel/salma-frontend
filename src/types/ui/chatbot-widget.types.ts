// src/types/ui/chatbot-widget.types.ts
// ==============================================================================
// Types pour le composant ChatbotWidget — Widget chatbot IA SALMA
// ==============================================================================

import type { ChatbotCTA, ChatbotSuggestion } from "@/types/api/chatbot.types";

/**
 * Message dans la conversation du chatbot.
 */
export interface ChatbotMessage {
  /** Rôle de l'auteur du message */
  role: "user" | "bot";

  /** Contenu textuel du message */
  text: string;

  /** Afficher un bouton WhatsApp après ce message (fallback legacy) */
  showWhatsApp?: boolean;

  /** Suggestions de questions liées (affichées comme boutons cliquables) */
  suggestions?: ChatbotSuggestion[];

  /** CTA contextuels (toujours 3, affichés sous la réponse) */
  ctas?: ChatbotCTA[];
}

/**
 * Quick Action — bouton de suggestion rapide affiché au démarrage.
 */
export interface ChatbotQuickAction {
  /** Identifiant unique */
  id: string;

  /** Label affiché sur le bouton (i18n, avec emoji) */
  label: string;

  /** Question envoyée au chatbot quand l'utilisateur clique */
  query: string;
}

/**
 * Entrée dans la base de connaissances fallback.
 * Utilisée quand l'API Django/Gemini est indisponible.
 */
export interface ChatbotFallbackEntry {
  /** Identifiant unique */
  id: string;

  /** Mots-clés de recherche (lowercase, sans accents) */
  keywords: string[];

  /** Réponse FR */
  answer_fr: string;

  /** Réponse EN */
  answer_en: string;

  /**
   * IDs des CTA contextuels à afficher.
   * Référence le catalogue FALLBACK_CTA_CATALOG dans chatbot.fallback.ts.
   * Si absent → CTA de conversion par défaut (rdv, whatsapp, newsletter).
   */
  cta_ids?: string[];

  /** Suggestions de questions liées FR (max 2) */
  suggestions_fr?: string[];

  /** Suggestions de questions liées EN (max 2) */
  suggestions_en?: string[];
}

/**
 * Labels i18n requis par ChatbotWidget.
 */
export interface ChatbotWidgetLabels {
  title: string;
  welcomeMessage: string;
  inputPlaceholder: string;
  thinking: string;
  noAnswer: string;
  whatsappFallback: string;
  openAriaLabel: string;
  closeAriaLabel: string;
  sendAriaLabel: string;
  quickActions: ChatbotQuickAction[];
}

/**
 * Props du composant ChatbotWidget.
 */
export interface ChatbotWidgetProps {
  labels: ChatbotWidgetLabels;
  whatsappNumber?: string;
  className?: string;
}