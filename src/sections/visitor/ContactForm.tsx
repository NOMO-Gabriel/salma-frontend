"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactDictionary } from "@/dictionaries/data/contact.data-dictionary";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import { eventsRepository } from "@/repositories/events.repository";
import SalmaButton from "@/components/ui/SalmaButton";
import type { CreateContactPayload } from "@/types/api/contact.types";
import type { ContactPageContent } from "@/types"; // Import des nouveaux types

interface FormErrors {
  nom_complet?: string;
  email?: string;
  message?: string;
}

function validateForm(data: CreateContactPayload, locale: "fr" | "en"): FormErrors {
  const errors: FormErrors = {};
  const t = locale === "fr"
    ? { required: "Ce champ est requis", emailInvalid: "Email invalide", messageTooShort: "Message trop court (min. 10 caractères)" }
    : { required: "This field is required", emailInvalid: "Invalid email", messageTooShort: "Message too short (min. 10 characters)" };

  if (!data.nom_complet.trim()) errors.nom_complet = t.required;
  if (!data.email.trim()) {
    errors.email = t.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = t.emailInvalid;
  }
  if (!data.message.trim()) {
    errors.message = t.required;
  } else if (data.message.trim().length < 10) {
    errors.message = t.messageTooShort;
  }
  return errors;
}

export default function ContactForm() {
  const { locale, dictionary } = useLanguage();
  const [content, setContent] = useState<ContactPageContent | null>(null);
  
  const [formData, setFormData] = useState<CreateContactPayload>({
    nom_complet: "",
    email: "",
    telephone: "",
    whatsapp: "",
    message: "",
    accepte_newsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    cmsSwitcher.getScopeContent("contact", locale).then((data) => {
      setContent(data as ContactPageContent);
    });
  }, [locale]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, locale);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("submitting");
    try {
      await contactDictionary.submit(formData);
      eventsRepository.trackContactSubmit();
      setStatus("success");
      setFormData({ nom_complet: "", email: "", telephone: "", whatsapp: "", message: "", accepte_newsletter: false });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Erreur");
    }
  };

  if (!content) return <div className="h-96 animate-pulse bg-salma-surface rounded-[2rem]" />;

  const { contact: t } = content;
  const { footer } = dictionary; // Accès aux infos agence via le Layout

  return (
    <section id="contact" className="py-24 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-salma-surface border border-salma-border rounded-[2rem] overflow-hidden shadow-salma-lg grid grid-cols-1 md:grid-cols-2">
          
          <div className="p-10 md:p-12 bg-salma-primary text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">{t.title}</h2>
              <p className="text-salma-gold-light text-sm mb-10">{t.subtitle}</p>
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <span className="text-salma-gold text-lg mt-0.5">📍</span>
                  <p className="text-sm leading-relaxed">{footer.contact.address}</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-salma-gold text-lg mt-0.5">✉️</span>
                  <p className="text-sm">{footer.contact.email}</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-salma-gold text-lg mt-0.5">📞</span>
                  <p className="text-sm">{footer.contact.phones}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 md:p-12">
            {status === "success" ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-serif font-bold text-salma-primary mb-2">{t.form.success}</h3>
                <button onClick={() => setStatus("idle")} className="text-salma-gold font-bold underline">
                  {locale === "fr" ? "Envoyer une autre demande" : "Send another request"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="nom_complet" value={formData.nom_complet} onChange={handleChange} placeholder={t.form.name} className="w-full p-4 rounded-xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t.form.email} className="w-full p-4 rounded-xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="telephone" value={formData.telephone} onChange={handleChange} placeholder={t.form.phone} className="w-full p-4 rounded-xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold" />
                  <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp" className="w-full p-4 rounded-xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t.form.message} rows={4} className="w-full p-4 rounded-xl bg-salma-bg border border-salma-border outline-none focus:border-salma-gold" />
                {status === "error" && <p className="text-red-500 text-xs">{errorMessage}</p>}
                <SalmaButton type="submit" variant="primary" className="w-full py-4" disabled={status === "submitting"}>
                  {status === "submitting" ? "..." : t.form.send}
                </SalmaButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}