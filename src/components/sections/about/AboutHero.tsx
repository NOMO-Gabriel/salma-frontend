import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { AboutHeroTexts } from "@/types";

interface AboutHeroProps {
  content: AboutHeroTexts;
}

export default function AboutHero({ content }: AboutHeroProps) {
  return (
    <section className="py-24 bg-white dark:bg-salma-bg overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* IMAGE À GAUCHE - EFFETS SPECTACULAIRES SANS BORDURES */}
          <div className="relative order-2 lg:order-1 group">
            
            {/* Décoration de fond (Halo Or) */}
            <div className="absolute -inset-10 rounded-full blur-3xl animate-pulse" />

            {/* Cadre de l'image : Bordures supprimées, Ombrage au toucher (hover) */}
            <div className="relative h-[500px] w-full rounded-[3rem] overflow-hidden z-10 transition-all duration-500 shadow-none group-hover:shadow-[0_32px_64px_-15px_rgba(27,54,93,0.3)]">
              
              <Image 
                src="/images/about-startup.jpg" 
                alt={content.title} 
                fill 
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                priority
              />

              {/* Effet de balayage de lumière (Shimmer) */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" 
                   style={{ transform: 'skewX(-20deg)' }} />

              {/* Overlay dégradé */}
              <div className="absolute inset-0 bg-gradient-to-t from-salma-primary/30 via-transparent to-transparent opacity-60" />
            </div>

            {/* Badge flottant (Glassmorphism) - 100% i18n */}
            <div className="absolute -bottom-6 -right-6 bg-white/80 dark:bg-salma-primary/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-salma-gold/30 animate-[slideUp_1s_ease-out] z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-salma-gold rounded-2xl flex items-center justify-center text-2xl">
                  🌍
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-salma-gold">
                    {content.badge_label}
                  </p>
                  <p className="text-salma-primary dark:text-white font-serif font-bold text-lg">
                    {content.badge_value}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TEXTE À DROITE */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="animate-[slideUp_0.6s_ease-out]">
              <SectionTitle 
                title={content.title} 
                subtitle={content.subtitle} 
                size="lg"
              />
            </div>
            
            <div className="relative animate-[slideUp_0.8s_ease-out]">
              <p className="text-xl text-salma-text-muted leading-relaxed font-medium first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-salma-gold first-letter:mr-4 first-letter:float-left">
                {content.description}
              </p>
            </div>

            {/* Label de confiance - 100% i18n */}
            <div className="flex items-center gap-6 pt-4 animate-[fadeIn_1.2s_ease-out]">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-salma-surface flex items-center justify-center text-[10px] font-bold text-salma-primary shadow-sm">
                      {i === 4 ? '✓' : '👤'}
                    </div>
                  ))}
               </div>
               <p className="text-xs font-bold text-salma-primary/60 uppercase tracking-widest">
                 {content.trust_label}
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}