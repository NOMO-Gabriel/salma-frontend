"use client";
import { PrivacySection } from "@/types";

export default function PrivacySidebar({ sections }: { sections: PrivacySection[] }) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-32 space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-salma-gold mb-6">Sommaire</p>
        <nav className="flex flex-col gap-3">
          {sections.map((s) => (
            <a 
              key={s.id} 
              href={`#${s.id}`}
              className="text-xs font-bold text-salma-text-muted hover:text-salma-primary transition-colors border-l-2 border-transparent hover:border-salma-gold pl-4"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}