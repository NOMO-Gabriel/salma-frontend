// src/types/ui/newsletter-form.types.ts
// ==============================================================================
// Types pour le composant NewsletterForm — Formulaire d'inscription newsletter
// ==============================================================================

/**
 * État du formulaire d'inscription newsletter.
 *
 * - `idle`    : En attente de soumission
 * - `loading` : Requête en cours
 * - `success` : Inscription réussie
 * - `error`   : Échec de l'inscription
 */
export type NewsletterFormStatus = "idle" | "loading" | "success" | "error";

/**
 * Labels i18n requis par NewsletterForm.
 * Proviennent du dictionnaire `common.newsletter`.
 */
export interface NewsletterFormLabels {
  /** Placeholder du champ email */
  placeholder: string;

  /** Texte du bouton de soumission */
  submit: string;

  /** Texte affiché pendant le chargement */
  submitting: string;

  /** Message de succès après inscription */
  success: string;

  /** Message d'erreur en cas d'échec */
  error: string;
  subscribe_label?: string;
}

/**
 * Props du composant NewsletterForm.
 *
 * @remark Le composant appelle le dictionnaire de données pour l'inscription,
 * mais tous les textes visibles viennent de la prop `labels`.
 *
 * @example
 * <NewsletterForm labels={common.newsletter} />
 *
 * @example
 * // Variante inline (dans un Hero ou une bannière)
 * <NewsletterForm labels={common.newsletter} variant="inline" />
 */
export interface NewsletterFormProps {
  /** Labels i18n. */
  labels: NewsletterFormLabels;

  /**
   * Variante d'affichage.
   * - `stacked` : Input + bouton empilés (footer, sidebar)
   * - `inline`  : Input + bouton sur une ligne (bannières, hero)
   * @default "stacked"
   */
  variant?: "stacked" | "inline";

  /** Source de tracking pour l'analytics (ex: "footer", "hero", "popup"). @default "footer" */
  source?: string;

  /** Classes CSS additionnelles. */
  className?: string;
}