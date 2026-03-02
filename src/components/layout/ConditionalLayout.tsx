// src/components/layout/ConditionalLayout.tsx
// ==============================================================================
// ConditionalLayout — Distributeur central des labels SALMA
//
// Rôle :
//   - Récupère les dictionnaires `common` et `layout` via cmsSwitcher
//   - Distribue les labels appropriés à chaque composant enfant
//   - Affiche Navbar + Footer + Widgets UNIQUEMENT sur les pages visiteur
//   - Les routes /admin/* ont leur propre layout
//
// C'est le SEUL composant layout qui fait useEffect + cmsSwitcher pour
// les dictionnaires partagés. Tous les enfants reçoivent par props.
// ==============================================================================

"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";

// Layout components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Widgets
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatbotWidget from "@/components/ui/ChatbotWidget";
import CookieBanner from "@/components/ui/CookieBanner";

// Types
import type { FooterTexts } from "@/types/pages/footer.types";

// — Types internes pour les dictionnaires bruts ---------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */
type DictCommon = Record<string, any>;
type DictLayout = Record<string, any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

// — Composant principal ---------------------------------------------------------

/**
 * **ConditionalLayout** — Orchestrateur du layout visiteur SALMA.
 *
 * Charge les dictionnaires `common` et `layout` au montage, puis
 * distribue les labels typés à chaque composant enfant.
 *
 * Les pages `/admin/*` reçoivent un rendu nu (sans Navbar/Footer/Widgets).
 *
 * @example
 * // Dans app/layout.tsx
 * <ConditionalLayout>{children}</ConditionalLayout>
 */
export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const isAdmin = pathname?.startsWith("/admin");

  const [common, setCommon] = useState<DictCommon | null>(null);
  const [layout, setLayout] = useState<DictLayout | null>(null);

  // — Chargement des dictionnaires -----------------------------------------------

  useEffect(() => {
    Promise.all([
      cmsSwitcher.getScopeContent("common", locale),
      cmsSwitcher.getScopeContent("layout", locale),
    ]).then(([commonData, layoutData]) => {
      if (commonData) setCommon(commonData);
      if (layoutData) setLayout(layoutData);
    });
  }, [locale]);

  // — Pages admin : rendu nu ----------------------------------------------------

  if (isAdmin) {
    return <>{children}</>;
  }

  // — Attente des dictionnaires --------------------------------------------------

  // On rend le contenu immédiatement (pour le SEO / first paint),
  // les widgets apparaissent une fois les dicts chargés.
  const dictsReady = common !== null && layout !== null;

  return (
    <>
      {/* Navbar — garde son propre chargement pour l'instant */}
      <Navbar />

      <main>{children}</main>

      {/* Footer + Widgets — rendus uniquement quand les dicts sont prêts */}
      {dictsReady && (
        <>
          <Footer
            content={layout.footer as FooterTexts}
            footerLabels={common.footer}
            newsletterLabels={common.newsletter}
          />

          <WhatsAppButton
            labels={{
              helpText: layout.widgets?.whatsapp?.helpText ?? "",
              prefillMessage: layout.nav_contact?.whatsapp_desc ?? "",
              ariaLabel: common.whatsappButton?.ariaLabel ?? "",
            }}
          />

          <ChatbotWidget labels={common.chatbot} />

          <CookieBanner labels={layout.cookies} />
        </>
      )}

      {/* Fallback footer pendant le chargement */}
      {!dictsReady && (
        <div className="h-64 bg-[#0B172A] animate-pulse" />
      )}
    </>
  );
}