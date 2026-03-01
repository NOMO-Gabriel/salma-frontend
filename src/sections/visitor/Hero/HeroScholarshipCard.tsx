"use client";
// src/sections/visitor/hero/HeroScholarshipCard.tsx
//
// Animation "Spotlight Reveal" :
//  1. Halo gold pulse derrière la carte
//  2. Carte entre depuis la droite (cardReveal)
//  3. Badge "Bourse disponible" en effet typing
//  4. Underline gold qui se trace sous le titre
//  5. Bouton CTA avec shimmer en boucle
//  6. 4 particules dorées qui flottent autour

import { useEffect, useState } from "react";
import Link from "next/link";
import type { HeroScholarship } from "@/types";

interface Props {
  data: HeroScholarship;
  slideId: string;
}

// =============================================================================
//  Positions fixes des particules (évite les diffs SSR/client)
// =============================================================================
const PARTICLES: { size: string; style: React.CSSProperties }[] = [
  { size: "w-2 h-2",     style: { top: "12px",   left: "12px",   animation: "particleFloat 3s ease-in-out 0s infinite"    } },
  { size: "w-1.5 h-1.5", style: { top: "28px",   right: "20px",  animation: "particleFloat 2.5s ease-in-out 0.8s infinite" } },
  { size: "w-1 h-1",     style: { bottom: "20px", left: "24px",   animation: "particleFloat 3.5s ease-in-out 1.2s infinite" } },
  { size: "w-2 h-2",     style: { bottom: "12px", right: "12px",  animation: "particleFloat 2.8s ease-in-out 0.4s infinite" } },
];

// =============================================================================
//  Hook : effet typing
// =============================================================================
function useTyping(text: string, slideId: string, delayMs = 500) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 45);
      return () => clearInterval(interval);
    }, delayMs);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideId]);

  return displayed;
}

// =============================================================================
//  Composant principal
// =============================================================================
export default function HeroScholarshipCard({ data, slideId }: Props) {
  const typedBadge = useTyping("Bourse disponible", slideId, 500);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    setLineVisible(false);
    const t = setTimeout(() => setLineVisible(true), 900);
    return () => clearTimeout(t);
  }, [slideId]);

  return (
    <div key={slideId} className="relative flex items-center justify-center w-full max-w-[340px]">

      {/* =================================================================
          HALO GOLD — projecteur derrière la carte
      ================================================================= */}
      <div
        className="absolute -inset-8 rounded-3xl blur-3xl opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.22) 0%, transparent 68%)",
          animation: "haloReveal 1s ease-out 0.3s forwards",
        }}
        aria-hidden="true"
      />

      {/* =================================================================
          PARTICULES DORÉES flottantes
      ================================================================= */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`absolute ${p.size} rounded-full bg-salma-gold/50 pointer-events-none`}
          style={p.style}
          aria-hidden="true"
        />
      ))}

      {/* =================================================================
          CARTE
      ================================================================= */}
      <div
        className="relative w-full bg-white rounded-3xl overflow-hidden
          border border-salma-border
          shadow-[0_24px_64px_rgba(27,54,93,0.13)]"
        style={{ animation: "cardReveal 0.6s cubic-bezier(0.22,1,0.36,1) forwards" }}
      >
        {/* Header navy */}
        <div className="bg-salma-primary px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{data.flag}</span>
            <div>
              {/* Typing badge */}
              <p className="text-[9px] font-bold uppercase tracking-widest text-salma-gold/80 flex items-center gap-0.5 h-3.5">
                <span>{typedBadge}</span>
                <span
                  className="inline-block w-px h-3 bg-salma-gold/70 ml-0.5"
                  style={{ animation: "blink 0.8s step-end infinite" }}
                  aria-hidden="true"
                />
              </p>
              <p className="text-sm font-bold text-white leading-tight mt-0.5">{data.country}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-salma-gold/20 border border-salma-gold/30
            text-[9px] font-bold text-salma-gold whitespace-nowrap">
            {data.coverage}
          </span>
        </div>

        {/* Corps */}
        <div className="px-5 py-5">

          {/* Titre + underline animé */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-salma-primary leading-snug mb-2">
              {data.title}
            </h3>
            <div className="h-0.5 bg-salma-border/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-salma-gold rounded-full transition-all duration-700 ease-out"
                style={{ width: lineVisible ? "100%" : "0%" }}
              />
            </div>
          </div>

          {/* Infos */}
          <div className="space-y-2 mb-5">
            <InfoRow icon="🎓" text={data.level} />
            <InfoRow icon="📅" text={data.deadline} urgent />
          </div>

          {/* CTA avec shimmer */}
          <Link
            href={data.href}
            className="relative w-full flex items-center justify-center gap-2
              px-5 py-3 rounded-2xl overflow-hidden
              bg-salma-gold text-salma-primary
              text-xs font-bold uppercase tracking-wider
              shadow-[0_4px_14px_rgba(201,168,76,0.35)]
              hover:shadow-[0_6px_22px_rgba(201,168,76,0.5)]
              transition-shadow duration-200 active:scale-[0.98]"
          >
            {/* Shimmer en boucle */}
            <span
              className="absolute inset-0 -translate-x-full pointer-events-none
                bg-gradient-to-r from-transparent via-white/35 to-transparent"
              style={{ animation: "shimmer 2.5s ease-in-out 1.8s infinite" }}
              aria-hidden="true"
            />
            <span className="relative">{data.cta}</span>
          </Link>

        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, text, urgent }: { icon: string; text: string; urgent?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm flex-shrink-0">{icon}</span>
      <span className={`text-xs leading-tight
        ${urgent ? "font-bold text-salma-primary" : "font-medium text-salma-text-muted"}
      `}>
        {text}
      </span>
    </div>
  );
}