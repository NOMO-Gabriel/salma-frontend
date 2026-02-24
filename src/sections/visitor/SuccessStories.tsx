"use client";

import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import SectionTitle from "@/components/ui/SectionTitle";

export default function SuccessStories() {
  const { dictionary } = useLanguage();

  return (
    <section className="py-24 bg-salma-surface dark:bg-salma-primary/5">
      <div className="container mx-auto px-6">
        
        <SectionTitle 
          title={dictionary.successStories.title}
          subtitle={dictionary.successStories.subtitle}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dictionary.successStories.stories.map((story, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-salma-surface p-8 rounded-3xl border border-salma-border shadow-salma-sm hover:shadow-salma-md transition-all relative overflow-hidden"
            >
              {/* Icône de citation décorative */}
              <div className="absolute -top-2 -right-2 opacity-10">
                <svg className="w-24 h-24 text-salma-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.01697 21L1.01697 18C1.01697 16.8954 1.9124 16 3.01697 16H6.01697C6.56925 16 7.01697 15.5523 7.01697 15V9C7.01697 8.44772 6.56925 8 6.01697 8H3.01697C1.9124 8 1.01697 7.10457 1.01697 6V5C1.01697 3.89543 1.9124 3 3.01697 3H6.01697C8.22611 3 10.017 4.79086 10.017 7V15C10.017 18.3137 7.33068 21 4.01697 21H1.01697Z" />
                </svg>
              </div>

              <div className="relative z-10">
                <p className="text-salma-text font-medium italic leading-relaxed mb-6">
                  "{story.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-salma-gold/30">
                    <Image 
                      src={`https://i.pravatar.cc/150?u=${story.name}`} 
                      alt={story.name} 
                      width={48} 
                      height={48} 
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-salma-primary dark:text-salma-gold">
                      {story.name}
                    </h4>
                    <p className="text-[10px] text-salma-text-muted uppercase tracking-wider">
                      {story.destination} • <span className="text-salma-accent font-bold">{story.program}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}