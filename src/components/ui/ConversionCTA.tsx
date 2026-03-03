// src/components/ui/ConversionCTA.tsx
// ==============================================================================
// CTA de Conversion — Design System SALMA
//
// Affiche un bloc d'appel à l'action avec 3 options de conversion :
//   1. WhatsApp (urgence — contact direct)
//   2. Rendez-vous (engagement — formulaire contact)
//   3. Newsletter (nurturing — inscription email)
//
// Utilisé sur : Services, Bourses (catalogue), Confidentialité, À propos.
// Reçoit tout par props (NavContact). Zéro texte en dur.
// ==============================================================================

"use client";

import Link from "next/link";
import { NavContact } from "@/types";
import SectionTitle from "./SectionTitle";
import NewsletterForm from "./NewsletterForm";
import type { NewsletterFormLabels } from "@/types/ui/newsletter-form.types";

// — Types internes --------------------------------------------------------------

interface Props {
  /** Labels de la section contact (provient de dictionary.nav_contact). */
  labels: NavContact;
}

// — Helpers ---------------------------------------------------------------------

/**
 * Construit les NewsletterFormLabels à partir des clés NavContact.
 * Les clés `submitting`, `success` et `error` sont optionnelles dans NavContact.
 * On fournit des fallbacks raisonnables pour ne pas casser le build.
 */
function buildNewsletterLabels(labels: NavContact): NewsletterFormLabels {
  return {
    placeholder: labels.newsletter_placeholder,
    submit: labels.newsletter_btn,
    submitting: labels.newsletter_btn ?? "…",
    success: labels.newsletter_placeholder ?? "✓",
    error: labels.newsletter_desc ?? "✗",
  };
}

// — Composant principal ---------------------------------------------------------

/**
 * **ConversionCTA** — Bloc de conversion tripartite SALMA.
 *
 * Layout :
 *   - Ligne 1 : Titre + sous-titre centré (SectionTitle)
 *   - Ligne 2 : WhatsApp (gauche) + RDV (droite) — grille 2 colonnes
 *   - Ligne 3 : Newsletter pleine largeur avec formulaire inline
 *
 * @example
 * <ConversionCTA labels={dictionary.nav_contact} />
 */
export default function ConversionCTA({ labels }: Props) {
  const newsletterLabels = buildNewsletterLabels(labels);

  return (
    <section className="py-24 bg-salma-bg border-t border-salma-border/20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            title={labels.title}
            subtitle={labels.subtitle}
            align="center"
          />

          {/* ── Ligne 1 : WhatsApp + Rendez-vous ───────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* WhatsApp */}
            <a
              href="https://wa.me/237699450984"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white dark:bg-salma-surface p-10 rounded-[2.5rem] border border-salma-border hover:border-green-500/50 transition-all duration-500 shadow-salma-sm hover:shadow-2xl"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  💬
                </div>
                <h3 className="text-2xl font-serif font-bold text-salma-primary dark:text-white mb-3">
                  {labels.whatsapp_label}
                </h3>
                <p className="text-sm text-salma-text-muted font-medium">
                  {labels.whatsapp_desc}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* Rendez-vous */}
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-salma-primary p-10 rounded-[2.5rem] border border-white/5 hover:border-salma-gold/50 transition-all duration-500 shadow-salma-sm hover:shadow-2xl"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-salma-gold/20 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  📅
                </div>
                <h3 className="text-2xl font-serif font-bold !text-salma-gold mb-3">
                  {labels.rdv_label}
                </h3>
                <p className="text-sm text-white/70 font-medium">
                  {labels.rdv_desc}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-salma-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* ── Ligne 2 : Newsletter pleine largeur ────────────────── */}
          <div className="mt-8 group relative overflow-hidden bg-white dark:bg-salma-surface p-10 rounded-[2.5rem] border border-salma-border hover:border-salma-accent/50 transition-all duration-500 shadow-salma-sm hover:shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Icône + texte */}
              <div className="flex items-center gap-6 md:flex-1">
                <div className="w-16 h-16 bg-salma-accent/10 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  ✉️
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white mb-1">
                    {labels.newsletter_title}
                  </h3>
                  <p className="text-sm text-salma-text-muted font-medium">
                    {labels.newsletter_desc}
                  </p>
                </div>
              </div>

              {/* Formulaire inline */}
              <div className="w-full md:w-auto md:min-w-[340px]">
                <NewsletterForm
                  labels={newsletterLabels}
                  variant="inline"
                  source="conversion-cta"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-salma-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </section>
  );
}