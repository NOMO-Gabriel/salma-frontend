// src/components/ui/WhatsAppButton.tsx
// ==============================================================================
// Bouton flottant WhatsApp — Design System SALMA.
//
// Fixé en bas à droite de l'écran, ouvre une conversation WhatsApp
// avec un message pré-rempli. Tooltip au hover pour guider l'utilisateur.
//
// RÈGLE : Zéro texte en dur — labels viennent de la prop `labels`.
// Le numéro de téléphone est configurable via prop (default AGT).
// ==============================================================================

"use client";

import React from "react";
import type { WhatsAppButtonProps } from "@/types/ui/whatsapp-button.types";

// — Numéro par défaut AGT -------------------------------------------------------

const DEFAULT_PHONE = "237699450984";

// — Composant principal ---------------------------------------------------------

/**
 * **WhatsAppButton** — Bouton flottant WhatsApp SALMA.
 *
 * Positionné en `fixed` en bas à droite (z-70). Affiche un tooltip
 * au hover et redirige vers WhatsApp avec un message pré-rempli.
 *
 * @remark Les labels proviennent d'un assemblage de clés existantes :
 * - `layout.widgets.whatsapp.helpText` → tooltip
 * - `layout.nav_contact.whatsapp_desc` → message pré-rempli
 * - `common.whatsappButton.ariaLabel` → accessibilité
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
export default function WhatsAppButton({
  labels,
  phoneNumber = DEFAULT_PHONE,
  className = "",
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(labels.prefillMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={labels.ariaLabel}
      className={`fixed bottom-8 right-6 z-[70] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 active:scale-95 group ${className}`}
    >
      {/* Tooltip au hover */}
      <div
        className="absolute -top-12 right-0 bg-white dark:bg-surface text-text dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
        aria-hidden="true"
      >
        {labels.helpText}
      </div>

      {/* Icône WhatsApp */}
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}