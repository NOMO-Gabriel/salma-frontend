// src/app/(visitor)/bourses/[id]/ScholarshipDetailClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { getMediaUrl } from "@/lib/api-client";
import SalmaButton from "@/components/ui/SalmaButton";
import { eventsRepository } from "@/repositories/events.repository";
import { useEffect } from "react";
import type { ScholarshipPublicDetail, FieldVisibilityMap } from "@/types/api/scholarship.types";

interface Props {
  scholarship: ScholarshipPublicDetail;
  visibilityMap: FieldVisibilityMap;
}

export default function ScholarshipDetailClient({ scholarship, visibilityMap }: Props) {
  const { dictionary, locale } = useLanguage();
  const t = dictionary.scholarshipDetail;

  // Tracking automatique de la vue
  useEffect(() => {
    eventsRepository.trackScholarshipView(scholarship.id);
  }, [scholarship.id]);

  const title = locale === "fr" ? scholarship.titre_fr : scholarship.titre_en;
  const org = locale === "fr" ? scholarship.organisme_fr : scholarship.organisme_en;
  const desc = locale === "fr" ? scholarship.description_fr : scholarship.description_en;
  
  // Construction du lien WhatsApp contextuel
  const waMessage = encodeURIComponent(
    `Bonjour SALMA, je suis intéressé par la bourse : ${title}. Pouvez-vous m'aider pour le dossier ?`
  );
  const waLink = `https://wa.me/237699450984?text=${waMessage}`;

  // Helper pour vérifier la visibilité d'un champ
  const isVisible = (fieldName: string) => visibilityMap[fieldName] !== false;

  return (
    <div className="bg-salma-bg min-h-screen pb-20">
      {/* --- Fil d'ariane / Retour --- */}
      <div className="container mx-auto px-6 pt-8">
        <Link href="/bourses" className="text-salma-primary hover:text-salma-gold transition-colors text-sm font-bold flex items-center gap-2">
          ← {t.backToList}
        </Link>
      </div>

      <div className="container mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- COLONNE GAUCHE : Contenu Principal --- */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Image & Titre */}
          <div className="bg-white dark:bg-salma-surface rounded-3xl overflow-hidden border border-salma-border shadow-salma-md">
            <div className="relative h-[400px] w-full">
              <Image 
                src={getMediaUrl(scholarship.images.find(img => img.est_principale)?.media.url) || "/image.jpg"}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-salma-primary/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="px-3 py-1 bg-salma-gold text-salma-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                  {scholarship.pays_destination} • {scholarship.niveau}
                </span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mt-4 leading-tight">
                  {title}
                </h1>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-salma-gold mb-2">{t.organization}</h2>
              <p className="text-xl font-serif font-bold text-salma-primary dark:text-white">{org}</p>
            </div>
          </div>

          {/* Description (si visible) */}
          {isVisible('description_fr') && (
            <section className="bg-white dark:bg-salma-surface p-8 rounded-3xl border border-salma-border">
              <h3 className="text-xl font-serif font-bold text-salma-primary dark:text-white mb-6 border-b border-salma-border pb-4">
                Description
              </h3>
              <div className="prose prose-salma max-w-none text-salma-text-muted leading-relaxed">
                {desc}
              </div>
            </section>
          )}

          {/* Domaines d'études */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-salma-surface p-8 rounded-3xl border border-salma-border">
              <h3 className="font-serif font-bold text-salma-primary dark:text-white mb-6">{t.studyFields}</h3>
              <div className="flex flex-wrap gap-2">
                {scholarship.domaines.map(d => (
                  <span key={d.id} className="px-4 py-2 bg-salma-bg border border-salma-border rounded-xl text-sm font-medium">
                    {locale === 'fr' ? d.nom_fr : d.nom_en}
                  </span>
                ))}
              </div>
            </div>

            {/* Avantages (si visible) */}
            {isVisible('avantages') && (
              <div className="bg-white dark:bg-salma-surface p-8 rounded-3xl border border-salma-border">
                <h3 className="font-serif font-bold text-salma-primary dark:text-white mb-6">{t.benefits}</h3>
                <ul className="space-y-3">
                  {scholarship.avantages.map(a => (
                    <li key={a.id} className="flex items-start gap-3 text-sm text-salma-text-muted">
                      <span className="text-salma-gold">✔</span>
                      {locale === 'fr' ? a.libelle_fr : a.libelle_en}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        {/* --- COLONNE DROITE : Sidebar & Action --- */}
        <div className="space-y-6">
          <div className="bg-salma-primary text-white p-8 rounded-3xl shadow-salma-lg sticky top-24">
            <h3 className="text-xl font-serif font-bold mb-6 border-b border-white/10 pb-4">{t.eligibility}</h3>
            
            <div className="space-y-6 mb-10">
              {isVisible('date_limite') && scholarship.date_limite && (
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-salma-gold-light font-bold mb-1">{dictionary.scholarships.deadline}</span>
                  <span className="text-lg font-bold text-red-400">{new Date(scholarship.date_limite).toLocaleDateString()}</span>
                </div>
              )}

              {isVisible('exigence_langue_fr') && (
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-salma-gold-light font-bold mb-1">{dictionary.scholarships.language}</span>
                  <span className="text-lg font-bold">{locale === 'fr' ? scholarship.exigence_langue_fr : scholarship.exigence_langue_en}</span>
                </div>
              )}

              {isVisible('details_montant_fr') && (
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="block text-[10px] uppercase tracking-widest text-salma-gold-light font-bold mb-1">Financement</span>
                  <span className="text-sm italic">{locale === 'fr' ? scholarship.details_montant_fr : scholarship.details_montant_en}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                <SalmaButton variant="gold" className="w-full py-4">
                  {t.btnApply}
                </SalmaButton>
              </a>
              <Link href="/contact" className="block w-full">
                <SalmaButton variant="outline" className="w-full py-4 border-white text-white hover:bg-white hover:text-salma-primary">
                  {t.btnForm}
                </SalmaButton>
              </Link>
            </div>

            <p className="text-[10px] text-center mt-6 text-white/50 italic">
              {dictionary.footer.slogan}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}