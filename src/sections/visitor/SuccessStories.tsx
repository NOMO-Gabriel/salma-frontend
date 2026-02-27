// src/sections/visitor/SuccessStories.tsx
// ==============================================================================
//  Section Témoignages — données réelles depuis l'API (approuvés uniquement)
//  Utilise TestimonialPublic (types corrects) + fallback si aucune donnée
// ==============================================================================
"use client";

import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { getMediaUrl } from "@/lib/api-client";
import type { TestimonialPublic } from "@/types/api/testimonial.types";

interface Props {
  testimonials: TestimonialPublic[];
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
const FALLBACK_TESTIMONIALS: TestimonialPublic[] = [
  {
    id: "fallback-1",
    nom_auteur: "Aminata K.",
    pays_auteur: "Cameroun",
    citation_fr:
      "Grâce à SALMA, j'ai obtenu ma bourse CSC en moins de 2 mois. L'équipe m'a accompagnée à chaque étape du dossier.",
    citation_en:
      "Thanks to SALMA, I got my CSC scholarship in less than 2 months. The team supported me at every step.",
    note: 5,
    photo: null,
    date_creation: "2025-09-15",
  },
  {
    id: "fallback-2",
    nom_auteur: "Jean-Baptiste M.",
    pays_auteur: "Cameroun",
    citation_fr:
      "Professionnel et efficace. Mon visa allemand a été obtenu en 3 semaines comme promis.",
    citation_en:
      "Professional and efficient. My German visa was obtained in 3 weeks as promised.",
    note: 5,
    photo: null,
    date_creation: "2025-10-20",
  },
  {
    id: "fallback-3",
    nom_auteur: "Fatou D.",
    pays_auteur: "Cameroun",
    citation_fr:
      "L'équipe a répondu à toutes mes questions rapidement. Je recommande vivement !",
    citation_en:
      "The team answered all my questions quickly. I highly recommend them!",
    note: 5,
    photo: null,
    date_creation: "2025-11-10",
  },
];

export default function SuccessStories({ testimonials }: Props) {
  const { dictionary, locale } = useLanguage();

  // Utiliser les données réelles ou le fallback
  const displayed =
    testimonials.length > 0 ? testimonials.slice(0, 3) : FALLBACK_TESTIMONIALS;

  return (
    <section className="py-24 bg-salma-surface/30 dark:bg-salma-surface/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <SectionTitle
            title={
              dictionary.successStories?.title ??
              (locale === "fr"
                ? "Ils ont réussi grâce à SALMA"
                : "They succeeded with SALMA")
            }
            subtitle={
              dictionary.successStories?.subtitle ??
              (locale === "fr"
                ? "Histoires de Succès"
                : "Success Stories")
            }
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayed.map((t) => {
            const citation =
              locale === "fr" ? t.citation_fr : (t.citation_en || t.citation_fr);
            const photoUrl = t.photo
              ? getMediaUrl(t.photo.url_fichier)
              : null;

            return (
              <div
                key={t.id}
                className="flex flex-col bg-white dark:bg-salma-surface border border-salma-border rounded-2xl p-6 gap-4 shadow-sm hover:shadow-salma-lg transition-all duration-300"
              >
                {/* Étoiles */}
                <StarRating note={t.note} />

                {/* Citation */}
                <blockquote className="text-sm text-salma-text leading-relaxed flex-1 italic">
                  &ldquo;{citation}&rdquo;
                </blockquote>

                {/* Auteur */}
                <div className="flex items-center gap-3 pt-3 border-t border-salma-border">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={t.nom_auteur}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-salma-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-salma-primary">
                        {t.nom_auteur.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-salma-text">
                      {t.nom_auteur}
                    </p>
                    {t.pays_auteur && (
                      <p className="text-[10px] text-salma-text-muted">
                        {t.pays_auteur}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
