// src/types/ui/chatbot-widget.types.ts
// ==============================================================================
// Types pour le composant ChatbotWidget — Widget chatbot IA SALMA
// ==============================================================================

/**
 * Message dans la conversation du chatbot.
 */
export interface ChatbotMessage {
  /** Rôle de l'auteur du message */
  role: "user" | "bot";

  /** Contenu textuel du message */
  text: string;

  /** Afficher un bouton WhatsApp après ce message (fallback conversion) */
  showWhatsApp?: boolean;
}

/**
 * Quick Action — bouton de suggestion rapide affiché au démarrage.
 * Augmente le taux de conversion en guidant l'utilisateur.
 */
export interface ChatbotQuickAction {
  /** Identifiant unique (ex: "scholarships", "china", "germany", "rdv") */
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

  /** Réponse à afficher (FR ou EN selon la locale) */
  answer_fr: string;
  answer_en: string;
}

/**
 * Labels i18n requis par ChatbotWidget.
 * Proviennent du dictionnaire `common.chatbot`.
 */
export interface ChatbotWidgetLabels {
  /** Nom affiché dans le header */
  title: string;

  /** Message de bienvenue lors de l'ouverture */
  welcomeMessage: string;

  /** Placeholder du champ de saisie */
  inputPlaceholder: string;

  /** Texte affiché pendant que le bot réfléchit */
  thinking: string;

  /** Message d'erreur quand aucune réponse n'est trouvée */
  noAnswer: string;

  /** Label du bouton WhatsApp fallback */
  whatsappFallback: string;

  /** Aria-label du bouton d'ouverture */
  openAriaLabel: string;

  /** Aria-label du bouton de fermeture */
  closeAriaLabel: string;

  /** Aria-label du bouton d'envoi */
  sendAriaLabel: string;

  /** Quick actions affichées au démarrage */
  quickActions: ChatbotQuickAction[];
}

/**
 * Props du composant ChatbotWidget.
 *
 * @example
 * <ChatbotWidget labels={common.chatbot} />
 */
export interface ChatbotWidgetProps {
  /** Labels i18n et quick actions. */
  labels: ChatbotWidgetLabels;

  /** Numéro WhatsApp pour le fallback conversion. @default "237699450984" */
  whatsappNumber?: string;

  /** Classes CSS additionnelles sur le conteneur fixe. */
  className?: string;
}