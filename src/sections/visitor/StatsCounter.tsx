"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function StatsCounter() {
  const { dictionary } = useLanguage();

  const stats = [
    { id: "visas", ...dictionary.stats.visas },
    { id: "partners", ...dictionary.stats.partners },
    { id: "experience", ...dictionary.stats.experience },
    { id: "satisfaction", ...dictionary.stats.satisfaction },
  ];

  return (
    <section className="py-20 bg-salma-accent/5 dark:bg-salma-surface/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center text-center group">
              {/* Le Chiffre */}
              <span className="text-4xl md:text-5xl font-serif font-bold text-salma-primary dark:text-salma-gold mb-2 transition-transform group-hover:scale-110 duration-300">
                {stat.value}
              </span>
              
              {/* Le Petit Trait Décoratif Or */}
              <div className="w-8 h-1 bg-salma-gold rounded-full mb-4 opacity-50" />
              
              {/* Le Libellé */}
              <span className="text-xs md:text-sm font-sans font-bold uppercase tracking-[0.2em] text-salma-text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}