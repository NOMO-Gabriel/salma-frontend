// src/components/ui/NewsletterForm.tsx
"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { newsletterDictionary } from "@/dictionaries/data";
import { eventsRepository } from "@/repositories/events.repository";

export default function NewsletterForm() {
  const {locale } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await newsletterDictionary.subscribe({ email, source: "footer" });
      eventsRepository.trackNewsletterSignup();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      {status === "success" ? (
        <p className="text-emerald-400 text-sm font-bold animate-fade-in">
          ✓ {locale === "fr" ? "Inscription réussie !" : "Subscribed successfully!"}
        </p>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm outline-none focus:border-salma-gold transition-all"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-salma-gold text-salma-primary font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-salma-gold-light transition-all disabled:opacity-50"
          >
            {status === "loading" ? "..." : (locale === "fr" ? "S'abonner" : "Subscribe")}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-[10px]">Erreur. Réessayez.</p>
          )}
        </form>
      )}
    </div>
  );
}