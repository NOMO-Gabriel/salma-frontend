// src/types/ui/footer.types.ts
// ==============================================================================
// Types pour le composant Footer — Footer global SALMA
// ==============================================================================

import type { NewsletterFormLabels } from "@/types/ui/newsletter-form.types";

/**
 * Textes du footer provenant du dictionnaire `layout.footer`.
 */
export interface FooterTexts {
  tagline: string;
  slogan: string;
  links: {
    title: string;
    home: string;
    bourses: string;
    services: string;
    about: string;
    contact: string;
  };
  contact: {
    title: string;
    address: string;
    phones: string;
    email: string;
  };
  rights: string;
}

/**
 * Labels supplémentaires du footer — clés qui étaient en dur.
 * Proviennent du dictionnaire `common.footer`.
 */
export interface FooterLabels {
  /** Sous-titre de la marque (ex: "Bourses & Mobilité") */
  brandSubtitle: string;

  /** Titre de la section newsletter */
  newsletterTitle: string;

  /** Description de la section newsletter */
  newsletterDesc: string;

  /** Lien "Confidentialité" en bas */
  privacyLink: string;

  /** Lien "Support" en bas */
  supportLink: string;
}

/**
 * Props du composant Footer.
 *
 * @example
 * <Footer
 *   content={layoutData.footer}
 *   footerLabels={common.footer}
 *   newsletterLabels={common.newsletter}
 * />
 */
export interface FooterProps {
  /** Textes du footer (provient de layout.footer via cmsSwitcher). */
  content: FooterTexts;

  /** Labels supplémentaires du footer (provient de common.footer). */
  footerLabels: FooterLabels;

  /** Labels pour le NewsletterForm (provient de common.newsletter). */
  newsletterLabels: NewsletterFormLabels;
}