// src/sections/visitor/ContactForm.tsx
// ==============================================================================
//  Formulaire de Contact — envoi réel vers POST /api/contact
//  Validation côté client, tracking CONTACT_SOUMIS, état success
// ==============================================================================
"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { contactDictionary } from "@/dictionaries/data/contact.data-dictionary";
import { eventsRepository } from "@/repositories/events.repository";
import SalmaButton from "@/components/ui/SalmaButton";
import type { CreateContactPayload } from "@/types/api/contact.types";

// --- Validation simple (pas besoin de Zod en dépendance externe) -------------

interface FormErrors {
  nom_complet?: string;
  email?: string;
  message?: string;
}

function validateForm(
  data: CreateContactPayload,
  locale: "fr" | "en"
): FormErrors {
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

// --- Composant ---------------------------------------------------------------

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const { dictionary, locale } = useLanguage();

  const [formData, setFormData] = useState<CreateContactPayload>({
    nom_complet: "",
    email: "",
    telephone: "",
    whatsapp: "",
    message: "",
    accepte_newsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Effacer l'erreur de ce champ
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const validationErrors = validateForm(formData, locale);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});
    setErrorMessage("");

    try {
      await contactDictionary.submit(formData);

      // Tracking silencieux
      eventsRepository.trackContactSubmit();

      setStatus("success");
      // Reset form
      setFormData({
        nom_complet: "",
        email: "",
        telephone: "",
        whatsapp: "",
        message: "",
        accepte_newsletter: false,
      });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "";
      setErrorMessage(
        msg || (locale === "fr"
          ? "Une erreur est survenue. Veuillez réessayer."
          : "An error occurred. Please try again.")
      );
    }
  };

  // Labels i18n
  const t = {
    title: dictionary.contact.title,
    subtitle: dictionary.contact.subtitle,
    name: dictionary.contact.form.name,
    email: dictionary.contact.form.email,
    phone: dictionary.contact.form.phone,
    message: dictionary.contact.form.message,
    send: dictionary.contact.form.send,
    success: dictionary.contact.form.success,
    address: dictionary.contact.info.address,
    emailInfo: dictionary.contact.info.email,
    newsletter: locale === "fr"
      ? "Je souhaite recevoir les offres de bourses par email"
      : "I want to receive scholarship offers by email",
    whatsapp: locale === "fr" ? "Numéro WhatsApp" : "WhatsApp number",
    errorGeneric: locale === "fr"
      ? "Une erreur est survenue"
      : "An error occurred",
    sendAnother: locale === "fr"
      ? "Envoyer une autre demande"
      : "Send another request",
    successTitle: locale === "fr"
      ? "Demande envoyée !"
      : "Request sent!",
    successDesc: locale === "fr"
      ? "Notre équipe vous contactera dans les 24h. Vérifiez aussi votre WhatsApp !"
      : "Our team will contact you within 24h. Also check your WhatsApp!",
  };

  // Input style helper
  const inputClass = (field?: string) =>
    `w-full p-4 rounded-xl bg-salma-bg border outline-none transition-all text-sm text-salma-text placeholder:text-salma-text-muted/60 ${
      field && errors[field as keyof FormErrors]
        ? "border-red-400 focus:border-red-500"
        : "border-salma-border focus:border-salma-gold"
    }`;

  return (
    <section id="contact" className="py-24 bg-white dark:bg-salma-bg">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-salma-surface border border-salma-border rounded-[2rem] overflow-hidden shadow-salma-lg grid grid-cols-1 md:grid-cols-2">

          {/* ── Infos de contact ─────────────────────────────────── */}
          <div className="p-10 md:p-12 bg-salma-primary text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">{t.title}</h2>
              <p className="text-salma-gold-light text-sm mb-10">{t.subtitle}</p>

              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <span className="text-salma-gold text-lg mt-0.5">📍</span>
                  <p className="text-sm leading-relaxed">{t.address}</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-salma-gold text-lg mt-0.5">✉️</span>
                  <p className="text-sm">{t.emailInfo}</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-salma-gold text-lg mt-0.5">📞</span>
                  <p className="text-sm">+237 6 99 45 09 84 / 6 51 74 03 28</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-widest opacity-50">
                AG Technologies Group
              </p>
            </div>
          </div>

          {/* ── Formulaire ───────────────────────────────────────── */}
          <div className="p-10 md:p-12">

            {/* État succès */}
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-salma-primary">
                  {t.successTitle}
                </h3>
                <p className="text-sm text-salma-text-muted max-w-xs">
                  {t.successDesc}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm font-semibold text-salma-gold hover:text-salma-gold-dark transition-colors underline underline-offset-4"
                >
                  {t.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Nom */}
                <div>
                  <input
                    type="text"
                    name="nom_complet"
                    value={formData.nom_complet}
                    onChange={handleChange}
                    placeholder={t.name}
                    className={inputClass("nom_complet")}
                  />
                  {errors.nom_complet && (
                    <p className="mt-1 text-xs text-red-500">{errors.nom_complet}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.email}
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Téléphone + WhatsApp côte à côte */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder={t.phone}
                    className={inputClass()}
                  />
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder={t.whatsapp}
                    className={inputClass()}
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.message}
                    rows={4}
                    className={inputClass("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Checkbox newsletter */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="accepte_newsletter"
                    checked={formData.accepte_newsletter}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 rounded border-salma-border text-salma-gold focus:ring-salma-gold accent-salma-gold"
                  />
                  <span className="text-xs text-salma-text-muted group-hover:text-salma-text transition-colors leading-relaxed">
                    {t.newsletter}
                  </span>
                </label>

                {/* Erreur serveur */}
                {status === "error" && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
                    {errorMessage || t.errorGeneric}
                  </div>
                )}

                {/* Bouton submit */}
                <SalmaButton
                  type="submit"
                  variant="primary"
                  className="w-full py-4 shadow-xl"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {locale === "fr" ? "Envoi en cours..." : "Sending..."}
                    </span>
                  ) : (
                    t.send
                  )}
                </SalmaButton>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
