// src/sections/visitor/ContactForm.tsx
// ==============================================================================
// ContactForm — Formulaire de contact SALMA
//
// Mode dynamique (NEXT_PUBLIC_STATIC_CONTENT=false) :
//   1. POST /api/contact → envoie la demande
//   2. Si accepte_newsletter → POST /api/newsletter/inscription
//
// Mode statique (NEXT_PUBLIC_STATIC_CONTENT=true) :
//   → Pas d'appel API, affiche un message invitant à contacter via WhatsApp
//
// RÈGLE : Zéro texte en dur — labels viennent de la prop `labels`.
// ==============================================================================

"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactDictionary, newsletterDictionary } from "@/dictionaries/data";
import { eventsRepository } from "@/repositories/events.repository";
import SalmaButton from "@/components/ui/SalmaButton";
import type { ContactFormLabels, CreateContactPayload } from "@/types";

// — Constantes ------------------------------------------------------------------

const ENABLE_DYNAMIC = process.env.NEXT_PUBLIC_ENABLE_DYNAMIC_ACTIONS === "true";
const WHATSAPP_URL = "https://wa.me/237699450984";

// — Composant principal ---------------------------------------------------------

interface Props {
  labels: ContactFormLabels;
}

export default function ContactForm({ labels: t }: Props) {
  const { dictionary } = useLanguage();
  const [formData, setFormData] = useState<CreateContactPayload>({
    nom_complet: "", email: "", telephone: "", whatsapp: "", message: "", accepte_newsletter: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "static_error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mode statique → pas d'appel API, message WhatsApp
    if (!ENABLE_DYNAMIC) {
      setStatus("static_error");
      return;
    }

    setStatus("submitting");
    try {
      // Appel 1 : envoyer la demande de contact
      await contactDictionary.submit(formData);
      eventsRepository.trackContactSubmit();

      // Appel 2 (conditionnel) : inscription newsletter si cochée
      if (formData.accepte_newsletter && formData.email) {
        try {
          await newsletterDictionary.subscribe({
            email: formData.email,
            source: "contact-form",
          });
          eventsRepository.trackNewsletterSignup();
        } catch {
          // Ne bloque pas le succès du contact
        }
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Labels newsletter depuis le dictionnaire
  const nl = dictionary.newsletter;
  const inputCls = "w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-salma-bg dark:bg-salma-bg/50 border border-salma-border outline-none focus:border-salma-gold focus:ring-4 focus:ring-salma-gold/5 transition-all text-sm";

  return (
    <section id="contact-form" className="py-8 sm:py-12 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-salma-surface rounded-2xl sm:rounded-[2rem] border border-salma-border shadow-salma-sm p-6 sm:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">

          {/* Colonne gauche : titre + description */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-salma-primary dark:text-white mb-3 sm:mb-4 leading-tight">
              {t.title}
            </h2>
            <p className="text-salma-text-muted text-sm sm:text-base leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Colonne droite : formulaire */}
          <div>
            {/* ── État succès ───────────────────────────────────── */}
            {status === "success" ? (
              <div className="text-center py-8 sm:py-12 animate-[fadeIn_0.5s_ease-out]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">✓</div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-salma-primary dark:text-white mb-3 sm:mb-4">{t.success_title}</h3>
                <p className="text-salma-text-muted mb-6 sm:mb-8 text-sm">{t.success_msg}</p>
                <SalmaButton variant="outline" onClick={() => setStatus("idle")}>
                  {t.send_another}
                </SalmaButton>
              </div>

            /* ── État erreur mode statique ──────────────────────── */
            ) : status === "static_error" ? (
              <div className="text-center py-8 sm:py-12 animate-[fadeIn_0.5s_ease-out]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">⚠</div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-salma-primary dark:text-white mb-3 sm:mb-4">
                  {t.error_static_title}
                </h3>
                <p className="text-salma-text-muted mb-6 sm:mb-8 text-sm leading-relaxed">
                  {t.error_static_msg}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  {t.error_static_whatsapp}
                </a>
                <button
                  onClick={() => setStatus("idle")}
                  className="block mx-auto mt-4 text-xs text-salma-text-muted hover:text-salma-primary transition-colors"
                >
                  {t.send_another}
                </button>
              </div>

            /* ── Formulaire ────────────────────────────────────── */
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <input required placeholder={t.name} className={inputCls} value={formData.nom_complet} onChange={e => setFormData({...formData, nom_complet: e.target.value})} />
                  <input required type="email" placeholder={t.email} className={inputCls} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <input placeholder={t.phone} className={inputCls} value={formData.telephone} onChange={e => setFormData({...formData, telephone: e.target.value})} />
                  <input placeholder={t.whatsapp} className={inputCls} value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                </div>
                <textarea required placeholder={t.message} rows={4} className={inputCls} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />

                {/* Erreur API */}
                {status === "error" && <p className="text-red-500 text-xs font-bold">{t.error_msg}</p>}

                {/* Newsletter opt-in */}
                <label className="flex items-start sm:items-center gap-3 cursor-pointer group py-1">
                  <input
                    type="checkbox"
                    checked={formData.accepte_newsletter}
                    onChange={e => setFormData({...formData, accepte_newsletter: e.target.checked})}
                    className="w-5 h-5 mt-0.5 sm:mt-0 rounded-md border-2 border-salma-border accent-salma-gold focus:ring-2 focus:ring-salma-gold/30 transition-all cursor-pointer flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-salma-text-muted group-hover:text-salma-primary dark:group-hover:text-white transition-colors leading-snug">
                    {nl?.subscribe_label ?? "S'abonner à la newsletter"}
                  </span>
                </label>

                {/* Bouton submit */}
                <SalmaButton
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={status === "submitting"}
                >
                  {t.submit}
                </SalmaButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}