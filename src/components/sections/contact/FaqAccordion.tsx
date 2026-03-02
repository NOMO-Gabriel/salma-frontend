"use client";
import { FaqItem } from "@/types";
import { useState } from "react";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, i) => (
        <div key={i} className="border border-salma-border rounded-2xl overflow-hidden bg-white dark:bg-salma-surface">
          <button 
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-salma-bg/50 transition-colors"
          >
            <span className="font-bold text-salma-primary dark:text-white">{item.q}</span>
            <span className={`text-salma-gold transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="p-6 pt-0 text-sm text-salma-text-muted leading-relaxed border-t border-salma-border/30">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}