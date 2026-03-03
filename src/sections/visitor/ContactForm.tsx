"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactDictionary, newsletterDictionary } from "@/dictionaries/data";
import { eventsRepository } from "@/repositories/events.repository";
import SalmaButton from "@/components/ui/SalmaButton";
import type { ContactFormLabels, CreateContactPayload } from "@/types";

interface Props {
  labels: ContactFormLabels;
}

export default function ContactForm({ labels: t }: Props) {
  const { dictionary } = useLanguage();
  const [formData, setFormData] = useState<CreateContactPayload>({
    nom_complet: "", email: "", telephone: "", whatsapp: "", message: "", accepte_newsletter: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await contactDictionary.submit(formData);
      eventsRepository.trackContactSubmit();

      // Si newsletter cochée → requête subscribe en parallèle
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

  // Labels newsletter depuis le dictionnaire (spread au premier niveau)
  const nl = dictionary.newsletter;
  const inputCls = "w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-salma-bg dark:bg-salma-bg/50 border border-salma-border outline-none focus:border-salma-gold focus:ring-4 focus:ring-salma-gold/5 transition-all text-sm";

  return (
    <section id="contact-form" className="py-8 sm:py-12 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-4 sm:px-6">
        {/* rounded plus petit en mobile, grid empilé par défaut */}
        <div className="max-w-6xl mx-auto bg-white dark:bg-salma-surface border border-salma-border rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-salma-lg grid grid-cols-1 lg:grid-cols-5">
          
          {/* ── Colonne Info ────────────────────────────────────────── */}
          <div className="lg:col-span-2 p-6 sm:p-8 lg:p-12 bg-salma-primary text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4 !text-salma-gold">{t.title}</h2>
              <p className="text-white/70 text-sm mb-6 sm:mb-12">{t.subtitle}</p>
              
              <div className="flex flex-row lg:flex-col gap-4 sm:gap-6 lg:gap-8">
                <div className="flex gap-3 sm:gap-5 items-start">
                  <span className="text-xl sm:text-2xl flex-shrink-0">📍</span>
                  <p className="text-xs sm:text-sm leading-relaxed text-white/80">{dictionary.footer.contact.address}</p>
                </div>
                <div className="flex gap-3 sm:gap-5 items-start">
                  <span className="text-xl sm:text-2xl flex-shrink-0">✉️</span>
                  <p className="text-xs sm:text-sm text-white/80 break-all">{dictionary.footer.contact.email}</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-salma-gold/10 rounded-full blur-3xl" />
          </div>

          {/* ── Colonne Formulaire ──────────────────────────────────── */}
          <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12">
            {status === "success" ? (
              <div className="text-center py-8 sm:py-12 animate-[fadeIn_0.5s_ease-out]">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl">✓</div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-salma-primary dark:text-white mb-3 sm:mb-4">{t.success_title}</h3>
                <p className="text-salma-text-muted mb-6 sm:mb-8 text-sm">{t.success_msg}</p>
                <SalmaButton variant="outline" onClick={() => setStatus("idle")}>
                  {t.send_another}
                </SalmaButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* En mobile : inputs empilés, en sm+ : 2 colonnes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <input required placeholder={t.name} className={inputCls} onChange={e => setFormData({...formData, nom_complet: e.target.value})} />
                  <input required type="email" placeholder={t.email} className={inputCls} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  <input placeholder={t.phone} className={inputCls} onChange={e => setFormData({...formData, telephone: e.target.value})} />
                  <input placeholder={t.whatsapp} className={inputCls} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                </div>
                <textarea required placeholder={t.message} rows={4} className={inputCls} onChange={e => setFormData({...formData, message: e.target.value})} />
                
                {status === "error" && <p className="text-red-500 text-xs font-bold">{t.error_msg}</p>}

                {/* ── Newsletter opt-in ─────────────────────────────── */}
                <label className="flex items-start sm:items-center gap-3 cursor-pointer group py-1">
                  <input
                    type="checkbox"
                    checked={formData.accepte_newsletter}
                    onChange={e => setFormData({...formData, accepte_newsletter: e.target.checked})}
                    className="w-5 h-5 mt-0.5 sm:mt-0 rounded-md border-2 border-salma-border accent-salma-gold focus:ring-2 focus:ring-salma-gold/30 transition-all cursor-pointer flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-salma-text-muted group-hover:text-salma-primary dark:group-hover:text-white transition-colors leading-snug">
                    {nl?.subscribe_label ?? "Je souhaite recevoir les offres de bourses par email"}
                  </span>
                </label>

                <SalmaButton type="submit" variant="primary" size="lg" fullWidth isLoading={status === "submitting"}>
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