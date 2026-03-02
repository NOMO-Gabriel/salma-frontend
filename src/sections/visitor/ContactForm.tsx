"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactDictionary } from "@/dictionaries/data";
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
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputCls = "w-full p-4 rounded-2xl bg-salma-bg dark:bg-salma-bg/50 border border-salma-border outline-none focus:border-salma-gold focus:ring-4 focus:ring-salma-gold/5 transition-all text-sm";

  return (
    <section id="contact-form" className="py-12 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-white dark:bg-salma-surface border border-salma-border rounded-[3rem] overflow-hidden shadow-salma-lg grid grid-cols-1 lg:grid-cols-5">
          
          {/* Colonne Info */}
          <div className="lg:col-span-2 p-12 bg-salma-primary text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-serif font-bold mb-4 !text-salma-gold">{t.title}</h2>
              <p className="text-white/70 text-sm mb-12">{t.subtitle}</p>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <span className="text-2xl">📍</span>
                  <p className="text-sm leading-relaxed text-white/80">{dictionary.footer.contact.address}</p>
                </div>
                <div className="flex gap-5">
                  <span className="text-2xl">✉️</span>
                  <p className="text-sm text-white/80">{dictionary.footer.contact.email}</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-salma-gold/10 rounded-full blur-3xl" />
          </div>

          {/* Colonne Formulaire */}
          <div className="lg:col-span-3 p-12">
            {status === "success" ? (
              <div className="text-center py-12 animate-[fadeIn_0.5s_ease-out]">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
                <h3 className="text-2xl font-serif font-bold text-salma-primary dark:text-white mb-4">{t.success_title}</h3>
                <p className="text-salma-text-muted mb-8">{t.success_msg}</p>
                <SalmaButton variant="outline" onClick={() => setStatus("idle")}>
                  {t.send_another}
                </SalmaButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input required placeholder={t.name} className={inputCls} onChange={e => setFormData({...formData, nom_complet: e.target.value})} />
                  <input required type="email" placeholder={t.email} className={inputCls} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input placeholder={t.phone} className={inputCls} onChange={e => setFormData({...formData, telephone: e.target.value})} />
                  <input placeholder={t.whatsapp} className={inputCls} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
                </div>
                <textarea required placeholder={t.message} rows={5} className={inputCls} onChange={e => setFormData({...formData, message: e.target.value})} />
                
                {status === "error" && <p className="text-red-500 text-xs font-bold">{t.error_msg}</p>}
                
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