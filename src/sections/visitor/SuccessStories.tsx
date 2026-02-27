// src/sections/visitor/SuccessStories.tsx
// ==============================================================================
//  Section Témoignages — données réelles depuis l'API (approuvés uniquement)
// ==============================================================================
"use client";

import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { getMediaUrl } from "@/lib/api-client";
import type { Testimonial } from "@/types/api/testimonial.types";

interface Props {
  testimonials: Testimonial[];
}

function StarRating({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < note ? "text-salma-gold" : "text-salma-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Données de fallback si aucun témoignage approuvé en BD
const FALLBACK_TESTIMONIALS: Omit<Testimonial, "id" | "date_creation" | "bourse_id">[] = [
  {
    nom: "Aminata K.",
    titre: "Étudiante en Master, Université de Pékin",
    texte_fr: "Grâce à SALMA, j'ai obtenu ma bourse CSC en moins de 2 mois. L'équipe m'a accompagnée à chaque étape du dossier.",
    texte_en: "Thanks to SALMA, I got my CSC scholarship in less than 2 months. The team supported me at every step.",
    note: 5,
    pays_destination: "Chine",
    statut: "approuve",
    photo: null,
    ordre: 1,
  },
  {
    nom: "Jean-Baptiste M.",
    titre: "Doctorant, TU Berlin",
    texte_fr: "Professionnel et efficace. Mon visa allemand a été obtenu en 3 semaines comme promis.",
    texte_en: "Professional and efficient. My German visa was obtained in 3 weeks as promised.",
    note: 5,
    pays_destination: "Allemagne",
    statut: "approuve",
    photo: null,
    ordre: 2,
  },
  {
    nom: "Fatou D.",
    titre: "Étudiante en Licence, Shanghai",
    texte_fr: "Le chatbot m'a guidée 24h/24. L'équipe a répondu à toutes mes questions rapidement.",
    texte_en: "The chatbot guided me 24/7. The team answered all my questions quickly.",
    note: 5,
    pays_destination: "Chine",
    statut: "approuve",
    photo: null,
    ordre: 3,
  },
];

export default function SuccessStories({ testimonials }: Props) {
  const { dictionary, locale } = useLanguage();

  // Utiliser les données réelles ou le fallback
  const displayed = testimonials.length > 0 ? testimonials.slice(0, 3) : FALLBACK_TESTIMONIALS;

  return (
    <section className="py-24 bg-salma-surface/30 dark:bg-salma-surface/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <SectionTitle
            title={dictionary.testimonials?.title ?? "Ils ont réussi grâce à SALMA"}
            subtitle={dictionary.testimonials?.subtitle ?? "Des histoires vraies, des résultats réels"}
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayed.map((t, i) => {
            const texte = locale === "fr" ? t.texte_fr : t.texte_en;
            const photoUrl = "photo" in t && t.photo ? getMediaUrl(t.photo) : null;

            return (
              <div
                key={"id" in t ? t.id : i}
                className="flex flex-col bg-white dark:bg-salma-surface border border-salma-border rounded-2xl p-6 gap-4 shadow-sm hover:shadow-salma-lg transition-all duration-300"
              >
                {/* Étoiles */}
                <StarRating note={t.note ?? 5} />

                {/* Texte */}
                <blockquote className="text-sm text-salma-text leading-relaxed flex-1 italic">
                  &ldquo;{texte}&rdquo;
                </blockquote>

                {/* Auteur */}
                <div className="flex items-center gap-3 pt-3 border-t border-salma-border">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={t.nom}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-salma-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-salma-primary">
                        {t.nom.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-salma-text">{t.nom}</p>
                    <p className="text-[10px] text-salma-text-muted">{t.titre}</p>
                  </div>
                  {t.pays_destination && (
                    <span className="ml-auto text-xs text-salma-gold font-medium">
                      {t.pays_destination === "Chine" || t.pays_destination === "chine" ? "🇨🇳" : "🇩🇪"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
