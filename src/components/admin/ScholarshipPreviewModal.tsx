"use client";
import { ScholarshipAdmin } from "@/types";
import SalmaBadge from "../ui/SalmaBadge";
import Image from "next/image";
import { getMediaUrl } from "@/lib/api-client";

export default function ScholarshipPreviewModal({ bourse, onClose }: { bourse: ScholarshipAdmin, onClose: () => void }) {
  // Récupération de l'image principale
  const mainImage = bourse.images?.find(img => img.est_principale)?.media.url_fichier 
                 || bourse.image_principale?.url_fichier;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-salma-primary/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-salma-border">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <SalmaBadge status={bourse.statut as any} size="md" dot />
            <button onClick={onClose} className="text-2xl text-slate-300 hover:text-salma-primary">✕</button>
          </div>
          {mainImage && (
            <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden border border-slate-100">
              <Image src={getMediaUrl(mainImage) || ""} alt={bourse.titre_fr} fill className="object-cover" />
            </div>
          )}
          <h2 className="text-3xl font-serif font-bold text-salma-primary mb-2">{bourse.titre_fr}</h2>
          <p className="text-salma-gold font-bold text-sm mb-6">{bourse.organisme_fr}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] uppercase font-black text-slate-400">Destination</p>
              <p className="font-bold">{bourse.pays_destination === 'chine' ? '🇨🇳 Chine' : '🇩🇪 Allemagne'}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-[10px] uppercase font-black text-slate-400">Niveau</p>
              <p className="font-bold uppercase">{bourse.niveau}</p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none text-slate-600 mb-8">
            <h4 className="text-salma-primary font-bold">Description</h4>
            <p className="whitespace-pre-line">{bourse.description_fr}</p>
          </div>
        </div>
      </div>
    </div>
  );
}