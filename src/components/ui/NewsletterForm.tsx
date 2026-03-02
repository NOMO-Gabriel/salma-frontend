// src/components/ui/NewsletterForm.tsx
// ==============================================================================
// Formulaire d'inscription newsletter — Design System SALMA.
//
// Utilisé dans le footer et potentiellement dans des bannières/popups.
// Gère l'inscription via le newsletterDictionary, le tracking KPI
// et les états loading/success/error avec feedback visuel.
//
// RÈGLE : Zéro texte en dur — tous les labels viennent de la prop `labels`.
// ==============================================================================

"use client";

import React, { useState } from "react";
import { newsletterDictionary } from "@/dictionaries/data";
import { eventsRepository } from "@/repositories/events.repository";
import SalmaButton from "./SalmaButton";
import type {
  NewsletterFormProps,
  NewsletterFormStatus,
} from "@/types";

// — Composant principal ---------------------------------------------------------

/**
 * **NewsletterForm** — Formulaire d'inscription newsletter SALMA.
 *
 * Gère la soumission, le tracking KPI et les retours visuels.
 * Deux variantes : `stacked` (footer) et `inline` (bannières).
 *
 * @remark Le composant appelle `newsletterDictionary.subscribe()` directement
 * car l'inscription est une action utilisateur (pas un fetch de données).
 * Cela respecte l'architecture : UI → Dictionnaire → Repository → API.
 *
 * @example
 * // Dans le footer (variante par défaut)
 * <NewsletterForm labels={common.newsletter} />
 *
 * @example
 * // Dans un Hero (variante inline)
 * <NewsletterForm labels={common.newsletter} variant="inline" source="hero" />
 */
export default function NewsletterForm({
  labels,
  variant = "stacked",
  source = "footer",
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterFormStatus>("idle");

  /** Gère la soumission du formulaire */
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      await newsletterDictionary.subscribe({ email, source });
      eventsRepository.trackNewsletterSignup();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  // — État succès ---------------------------------------------------------------

  if (status === "success") {
    return (
      <div className={`w-full ${className}`}>
        <p className="text-emerald-400 text-sm font-bold flex items-center gap-2">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {labels.success}
        </p>
      </div>
    );
  }

  // — Formulaire ----------------------------------------------------------------

  const isInline = variant === "inline";

  return (
    <div className={`w-full ${className}`}>
      <form
        onSubmit={handleSubscribe}
        className={`flex ${
          isInline
            ? "flex-row gap-2 items-stretch"
            : "flex-col gap-3"
        }`}
      >
        {/* Champ email */}
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Réinitialiser l'erreur quand l'utilisateur recommence à taper
            if (status === "error") setStatus("idle");
          }}
          placeholder={labels.placeholder}
          required
          aria-label={labels.placeholder}
          className={`px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm outline-none placeholder:text-white/40 focus:border-salma-gold focus:ring-1 focus:ring-salma-gold/30 transition-all ${
            isInline ? "flex-1 min-w-0" : "w-full"
          }`}
        />

        {/* Bouton submit */}
        <SalmaButton
          type="submit"
          variant="gold"
          size="sm"
          isLoading={status === "loading"}
          className={`tracking-widest uppercase ${
            isInline ? "flex-shrink-0 rounded-xl" : "w-full rounded-xl"
          }`}
        >
          {status === "loading" ? labels.submitting : labels.submit}
        </SalmaButton>
      </form>

      {/* Message d'erreur */}
      {status === "error" && (
        <p className="mt-2 text-red-400 text-[11px] font-medium" role="alert">
          {labels.error}
        </p>
      )}
    </div>
  );
}