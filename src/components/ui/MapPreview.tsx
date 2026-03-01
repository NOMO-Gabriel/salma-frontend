"use client";

import Image from "next/image";

interface MapPreviewProps {
  address: string;
  label: string;
}

export default function MapPreview({ address, label }: MapPreviewProps) {
  // Lien de recherche Google Maps basé sur l'adresse
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <a 
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block group overflow-hidden rounded-[2.5rem] border border-salma-gold/10 hover:border-salma-gold/40 transition-all duration-500 shadow-salma-md"
    >
      {/* Container Image avec Filtres Premium */}
      <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden">
        <Image 
          src="/agt_home.jpg" // Utilisation de votre image réelle
          alt="Siège AG Technologies - Yaoundé"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale sepia brightness-[0.6] contrast-[1.2]"
        />
        
        {/* Calque de teinte Bordeaux (Identité visuelle) */}
        <div className="absolute inset-0 bg-salma-primary/40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-20" />
        
        {/* Dégradé de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-t from-salma-primary via-transparent to-transparent opacity-80" />

        {/* Overlay interactif au survol */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-salma-primary/30 backdrop-blur-[3px]">
          <div className="flex flex-col items-center gap-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <div className="w-16 h-16 rounded-full bg-salma-gold flex items-center justify-center text-salma-primary shadow-2xl">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
               </svg>
            </div>
            <span className="px-8 py-3 bg-white text-salma-primary font-black uppercase tracking-widest text-xs rounded-full shadow-2xl">
              {label}
            </span>
          </div>
        </div>

        {/* Badge permanent discret */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end group-hover:opacity-0 transition-opacity">
           <div className="bg-salma-gold/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
              <p className="text-[10px] font-black text-salma-primary uppercase tracking-tighter">Notre Siège</p>
              <p className="text-xs font-bold text-salma-primary">Yaoundé, Immeuble Kadji</p>
           </div>
        </div>
      </div>
    </a>
  );
}