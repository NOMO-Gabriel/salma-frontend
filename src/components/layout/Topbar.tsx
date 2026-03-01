"use client";
// =============================================================================
//  Topbar.tsx — SALMA · Barre d'information pré-header
//
//  Comportement :
//    • Fond #0F172A (sombre profond) — contraste net avec la navbar blanche
//    • Disparaît en scrollant vers le bas, réapparaît vers le haut
//    • Desktop : adresse | téléphone · email · horaires | réseaux sociaux
//    • Mobile  : téléphone cliquable + lien WhatsApp uniquement
//    • Hauteur fixe 36px desktop / 32px mobile
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";

interface TopbarContent {
  footer: {
    contact: {
      address: string;
      phones: string;
      email: string;
    };
  };
}
// =============================================================================
//  Hook : détecte la direction du scroll (up / down)
// =============================================================================
function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY;
      // Cache après 80px de scroll vers le bas
      if (currentY > 80 && currentY > lastY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = currentY;
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return hidden;
}

// =============================================================================
//  Icônes SVG inline (pas de dépendance externe)
// =============================================================================
const Icons = {
  location: (
    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  phone: (
    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  mail: (
    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  clock: (
    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  whatsapp: (
    // WhatsApp brand icon simplifié
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.1 1.51 5.833L.057 23.25a.75.75 0 00.918.943l5.455-1.43A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.5-5.244-1.373l-.376-.217-3.89 1.02 1.04-3.796-.235-.389A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  ),
};

// =============================================================================
//  Liens réseaux sociaux
// =============================================================================
const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    letter: "f",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    letter: "in",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    letter: "ig",
  },
];


// =============================================================================
//  Composant principal
// =============================================================================
export default function Topbar() {
  const hidden = useScrollDirection();
  const { locale } = useLanguage();
const [topbarContent, setTopbarContent] = useState<TopbarContent | null>(null);

useEffect(() => {
  cmsSwitcher.getScopeContent("layout", locale)
    .then((data) => setTopbarContent(data as unknown as TopbarContent));
}, [locale]);

const address = topbarContent?.footer?.contact?.address ?? "";
const phones  = topbarContent?.footer?.contact?.phones  ?? "";
const email   = topbarContent?.footer?.contact?.email   ?? "";
const firstPhone = phones.split("/")[0].trim().replace(/\s/g, "");

  return (
    <div
      className={`
        w-full bg-[#0A0F1A] border-b border-white/5
        transition-all duration-300 ease-in-out overflow-hidden
        ${hidden ? "max-h-0 opacity-0" : "max-h-12 opacity-100"}
      `}
      aria-label="Informations de contact"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ── DESKTOP (≥1024px) ─────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center justify-between h-9 gap-4">

          {/* Gauche : adresse */}
          <div className="flex items-center gap-1.5 text-white/50 flex-shrink-0">
            {Icons.location}
            <span className="text-[10px] font-medium tracking-wide">
             {address}
            </span>
          </div>

          {/* Centre : contacts + horaires */}
          <div className="flex items-center gap-5">
            {/* Téléphone */}
            <a
              href="tel:+237699450984"
              className="flex items-center gap-1.5 text-white/60 hover:text-salma-gold transition-colors duration-150 group"
            >
              {Icons.phone}
              <span className="text-[10px] font-medium tracking-wide group-hover:underline underline-offset-2">
                {phones}
              </span>
            </a>

            {/* Séparateur */}
            <span className="w-px h-3 bg-white/10" aria-hidden="true" />

            {/* Email */}
            <a
              href="mailto:secretariatagtechnologies@gmail.com"
              className="flex items-center gap-1.5 text-white/60 hover:text-salma-gold transition-colors duration-150 group"
            >
              {Icons.mail}
              <span className="text-[10px] font-medium tracking-wide group-hover:underline underline-offset-2">
                {email}
              </span>
            </a>

            {/* Séparateur */}
            <span className="w-px h-3 bg-white/10" aria-hidden="true" />

            {/* Horaires */}
            <div className="flex items-center gap-1.5 text-white/40">
              {Icons.clock}
              <span className="text-[10px] font-medium tracking-wide">
                Lun – Sam · 8h – 18h
              </span>
            </div>
          </div>

          {/* Droite : réseaux sociaux */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {SOCIAL_LINKS.map(({ label, href, letter }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="
                  w-6 h-6 rounded-md
                  flex items-center justify-center
                  text-[9px] font-bold text-white/40
                  border border-white/10
                  hover:border-salma-gold hover:text-salma-gold
                  transition-all duration-150
                "
              >
                {letter}
              </a>
            ))}
          </div>
        </div>

        {/* ── MOBILE (< 1024px) ─────────────────────────────────────────── */}
        <div className="flex lg:hidden items-center justify-between h-8 gap-3">

          {/* Téléphone cliquable */}
          <a
            href="tel:+237699450984"
            className="flex items-center gap-1.5 text-white/60 hover:text-salma-gold transition-colors"
          >
            {Icons.phone}
            <span className="text-[10px] font-medium">{firstPhone}</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/237699450984"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-1.5
              px-3 py-1 rounded-full
              bg-green-500/15 text-green-400
              border border-green-500/20
              hover:bg-green-500/25
              transition-colors duration-150
            "
          >
            {Icons.whatsapp}
            <span className="text-[10px] font-bold">WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}