// src/components/ui/MapPreview.tsx
// ==============================================================================
// Aperçu carte / localisation — Design System SALMA.
//
// Affiche une image du siège avec un overlay interactif qui redirige
// vers Google Maps. Badge permanent en bas avec infos du siège.
//
// RÈGLE : Zéro texte en dur — tous les labels viennent de la prop `labels`.
// ==============================================================================

"use client";

import React from "react";
import Image from "next/image";
import type { MapPreviewProps } from "@/types/ui/map-preview.types";

// — Composant principal ---------------------------------------------------------

/**
 * **MapPreview** — Aperçu localisation du Design System SALMA.
 *
 * Affiche une image stylisée du siège avec un overlay premium au hover
 * qui redirige vers Google Maps. Un badge permanent affiche l'adresse.
 *
 * @remark Tous les textes visibles viennent de la prop `labels` (i18n).
 *
 * @example
 * <MapPreview address={layout.address} labels={common.mapPreview} />
 *
 * @example
 * // Avec image custom et hauteur réduite
 * <MapPreview
 *   address={layout.address}
 *   labels={common.mapPreview}
 *   imageSrc="/bureau-douala.jpg"
 *   mobileHeight="h-[250px]"
 *   desktopHeight="md:h-[350px]"
 * />
 */
export default function MapPreview({
  address,
  labels,
  imageSrc = "/agt_home.jpg",
  mobileHeight = "h-[350px]",
  desktopHeight = "md:h-[450px]",
  className = "",
}: MapPreviewProps) {
  /** Lien Google Maps basé sur l'adresse */
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block group overflow-hidden rounded-[2.5rem] border border-salma-gold/10 hover:border-salma-gold/40 transition-all duration-500 shadow-salma-md ${className}`}
    >
      {/* Container image */}
      <div
        className={`relative ${mobileHeight} ${desktopHeight} w-full overflow-hidden`}
      >
        <Image
          src={imageSrc}
          alt={labels.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale sepia brightness-[0.6] contrast-[1.2]"
        />

        {/* Calque teinte Navy */}
        <div className="absolute inset-0 bg-salma-primary/40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-20" />

        {/* Dégradé de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-t from-salma-primary via-transparent to-transparent opacity-80" />

        {/* Overlay interactif au survol */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-salma-primary/30 backdrop-blur-[3px]">
          <div className="flex flex-col items-center gap-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            {/* Icône pin */}
            <div className="w-16 h-16 rounded-full bg-salma-gold flex items-center justify-center text-salma-primary shadow-2xl">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
            </div>

            {/* CTA label */}
            <span className="px-8 py-3 bg-white text-salma-primary font-black uppercase tracking-widest text-xs rounded-full shadow-2xl">
              {labels.ctaLabel}
            </span>
          </div>
        </div>

        {/* Badge permanent (masqué au hover) */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end group-hover:opacity-0 transition-opacity duration-300">
          <div className="bg-salma-gold/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
            <p className="text-[10px] font-black text-salma-primary uppercase tracking-tighter">
              {labels.badgeTitle}
            </p>
            <p className="text-xs font-bold text-salma-primary">
              {labels.badgeSubtitle}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}