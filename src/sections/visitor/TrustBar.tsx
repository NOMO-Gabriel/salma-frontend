"use client";

import { useLanguage } from "@/hooks/useLanguage";

export default function TrustBar() {
  const { dictionary } = useLanguage();

  const trustItems = [
    {
      id: "expertise",
      title: dictionary.trust.expertise.title,
      desc: dictionary.trust.expertise.desc,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: "speed",
      title: dictionary.trust.speed.title,
      desc: dictionary.trust.speed.desc,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "guarantee",
      title: dictionary.trust.guarantee.title,
      desc: dictionary.trust.guarantee.desc,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative z-20 -mt-10 px-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-salma-surface border border-salma-border shadow-salma-lg rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-salma-border">
          {trustItems.map((item) => (
            <div 
              key={item.id} 
              className="p-8 flex items-start gap-6 hover:bg-salma-accent/5 transition-colors group"
            >
              <div className="text-salma-gold group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-salma-primary dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-salma-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}