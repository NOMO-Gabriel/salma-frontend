// src/types/ui/whatsapp-button.types.ts
// ==============================================================================
// Types pour le composant WhatsAppButton — Bouton flottant WhatsApp SALMA
// ==============================================================================

/**
 * Labels i18n requis par WhatsAppButton.
 * Proviennent des dictionnaires `layout` déjà existants.
 */
export interface WhatsAppButtonLabels {
  /** Tooltip affiché au hover (ex: "Besoin d'aide ?") */
  helpText: string;

  /** Message pré-rempli envoyé dans WhatsApp */
  prefillMessage: string;

  /** Aria-label pour l'accessibilité */
  ariaLabel: string;
}

/**
 * Props du composant WhatsAppButton.
 *
 * @example
 * <WhatsAppButton
 *   labels={{
 *     helpText: dictionary.widgets.whatsapp.helpText,
 *     prefillMessage: dictionary.nav_contact.whatsapp_desc,
 *     ariaLabel: common.whatsappButton.ariaLabel,
 *   }}
 * />
 */
export interface WhatsAppButtonProps {
  /** Labels i18n. */
  labels: WhatsAppButtonLabels;

  /** Numéro de téléphone WhatsApp (format international sans +). @default "237699450984" */
  phoneNumber?: string;

  /** Classes CSS additionnelles. */
  className?: string;
}