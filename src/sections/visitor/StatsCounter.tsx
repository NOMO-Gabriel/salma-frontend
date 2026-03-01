"use client";
// src/sections/visitor/StatsCounter.tsx
// Fix : IntersectionObserver remplacé par écoute scroll + getBoundingClientRect
// car le LanguageContext wrape tout dans visibility:hidden jusqu'au montage,
// ce qui empêche l'IntersectionObserver de détecter l'élément.

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import type { KpiRealtime } from "@/types/api/kpi.types";

interface Props {
  kpi?: KpiRealtime | null;
}

interface StatItem {
  id: string;
  value: string;
  label: string;
}

// =============================================================================
//  Parse "500+" → { num: 500, suffix: "+" } / "100%" → { num: 100, suffix: "%" }
// =============================================================================
function parseValue(raw: string): { num: number; suffix: string; padded: boolean } {
  const suffix = raw.replace(/[0-9]/g, "");
  const digits = raw.replace(/[^0-9]/g, "");
  const padded = raw.startsWith("0") && digits.length > 1;
  return { num: parseInt(digits, 10) || 0, suffix, padded };
}

// =============================================================================
//  Hook compteur : 0 → target en duration ms, ease-out cubic
// =============================================================================
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || target === 0) return;

    // Reset avant de démarrer
    setCount(0);
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration]);

  return count;
}

// =============================================================================
//  Sous-composant StatCard — style 100% identique à l'original
// =============================================================================
function StatCard({ stat, active }: { stat: StatItem; active: boolean }) {
  const { num, suffix, padded } = parseValue(stat.value);
  const count = useCountUp(num, active);
  const display = padded && count < 10 ? `0${count}` : String(count);

  return (
    <div className="flex flex-col items-center text-center group">
      <span className="text-4xl md:text-5xl font-serif font-bold text-salma-primary dark:text-salma-gold mb-2 transition-transform group-hover:scale-110 duration-300">
        {display}{suffix}
      </span>
      <div className="w-8 h-1 bg-salma-gold rounded-full mb-4 opacity-50" />
      <span className="text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-salma-text-muted">
        {stat.label}
      </span>
    </div>
  );
}

// =============================================================================
//  Composant principal
// =============================================================================
export default function StatsCounter({ kpi }: Props) {
  const { locale } = useLanguage();
  const [stats, setStats] = useState<StatItem[]>([]);
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const triggeredRef = useRef(false);

  // Charge les textes via cmsSwitcher
  useEffect(() => {
    cmsSwitcher.getScopeContent("home", locale).then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = (data as any).stats;
      if (!s) return;
      setStats([
        { id: "visas",        value: s.visas.value,        label: s.visas.label },
        { id: "partners",     value: s.partners.value,     label: s.partners.label },
        { id: "experience",   value: s.experience.value,   label: s.experience.label },
        {
          id: "satisfaction",
          value: kpi ? `${Math.round(kpi.taux_conversion_global * 100)}%` : s.satisfaction.value,
          label: s.satisfaction.label,
        },
      ]);
    });
  }, [locale, kpi]);

  // Détection scroll robuste — fonctionne même avec visibility:hidden parent
  useEffect(() => {
    const checkVisibility = () => {
      if (triggeredRef.current) return;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Déclenche si au moins 30% de la section est visible
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const threshold = el.offsetHeight * 0.3;

      if (visibleHeight >= threshold) {
        triggeredRef.current = true;
        setActive(true);
        window.removeEventListener("scroll", checkVisibility);
      }
    };

    // Vérification initiale après montage (cas où la section est déjà visible)
    const timer = setTimeout(checkVisibility, 300);

    window.addEventListener("scroll", checkVisibility, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  if (!stats.length) return null;

  return (
    <section ref={sectionRef} className="py-20 bg-salma-accent/5 dark:bg-salma-surface/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}