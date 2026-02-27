// src/sections/visitor/StatsCounter.tsx
"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { KpiRealtime } from "@/types/api/kpi.types";

interface Props {
  kpi?: KpiRealtime | null;
}

export default function StatsCounter({ kpi }: Props) {
  const { dictionary } = useLanguage();

  // On simplifie : on ne garde que value et label
  const stats = [
    {
      id: "visas",
      value: dictionary.stats.visas.value,
      label: dictionary.stats.visas.label,
    },
    {
      id: "partners",
      value: dictionary.stats.partners.value,
      label: dictionary.stats.partners.label,
    },
    {
      id: "experience",
      value: dictionary.stats.experience.value,
      label: dictionary.stats.experience.label,
    },
    {
      id: "satisfaction",
      value: kpi
        ? `${Math.round(kpi.taux_conversion_global * 100)}%`
        : dictionary.stats.satisfaction.value,
      label: dictionary.stats.satisfaction.label,
    },
  ];

  return (
    <section className="py-20 bg-salma-accent/5 dark:bg-salma-surface/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center group">
              <span className="text-4xl md:text-5xl font-serif font-bold text-salma-primary dark:text-salma-gold mb-2 transition-transform group-hover:scale-110 duration-300">
                {stat.value}
              </span>
              <div className="w-8 h-1 bg-salma-gold rounded-full mb-4 opacity-50" />
              <span className="text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-salma-text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}