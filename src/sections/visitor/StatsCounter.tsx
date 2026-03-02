"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsSwitcher } from "@/dictionaries/data/cms-switcher";
import type { KpiRealtime } from "@/types/api/kpi.types";
import type { HomeTexts } from "@/types";

interface Props {
  kpi?: KpiRealtime | null;
}

interface StatItem {
  id: string;
  value: string;
  label: string;
}

/**
 * Parse une chaîne comme "500+" en { num: 500, suffix: "+" }
 */
function parseValue(raw: string) {
  const suffix = raw.replace(/[0-9]/g, "");
  const digits = raw.replace(/[^0-9]/g, "");
  const padded = raw.startsWith("0") && digits.length > 1;
  return { num: parseInt(digits, 10) || 0, suffix, padded };
}

/**
 * Hook de compteur animé
 */
function useCountUp(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active || target === 0) return;

    setCount(0);
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Ease-out Quart
      setCount(Math.round(eased * target));
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, target, duration]);

  return count;
}

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

export default function StatsCounter({ kpi }: Props) {
  const { locale } = useLanguage();
  const [stats, setStats] = useState<StatItem[]>([]);
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const triggeredRef = useRef(false);

  // Récupération des textes i18n via le Switcher typé
  useEffect(() => {
    cmsSwitcher.getScopeContent<HomeTexts>("home", locale).then((data) => {
      const s = data.stats;
      if (!s) return;

      setStats([
        { id: "visas",        value: s.visas.value,        label: s.visas.label },
        { id: "partners",     value: s.partners.value,     label: s.partners.label },
        { id: "experience",   value: s.experience.value,   label: s.experience.label },
        {
          id: "satisfaction",
          // Priorité à la donnée KPI réelle si disponible
          value: kpi ? `${Math.round(kpi.taux_conversion_global * 100)}%` : s.satisfaction.value,
          label: s.satisfaction.label,
        },
      ]);
    });
  }, [locale, kpi]);

  // Détection du scroll pour lancer l'animation
  useEffect(() => {
    const handleScroll = () => {
      if (triggeredRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.8;

      if (isVisible) {
        triggeredRef.current = true;
        setActive(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check immédiat au montage
    return () => window.removeEventListener("scroll", handleScroll);
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