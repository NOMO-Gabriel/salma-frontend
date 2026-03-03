"use client";

import { useState } from "react";
import { testimonialAdminRepository } from "@/repositories/testimonial.repository";
import type { TestimonialAdmin } from "@/types/api/testimonial.types";

interface Props {
  initialData: { results: TestimonialAdmin[] };
}

export default function AdminTestimonialsClient({ initialData }: Props) {
  const [testimonials, setTestimonials] = useState(initialData.results);

  const handleToggleStatus = async (id: string, field: 'est_approuve' | 'est_affiche_sur_site', currentVal: boolean) => {
    try {
      await testimonialAdminRepository.patch(id, { [field]: !currentVal });
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: !currentVal } : t));
    } catch (error) {
      alert("Erreur lors de la mise à jour du statut.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer définitivement ce témoignage ?")) return;
    try {
      await testimonialAdminRepository.delete(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (error) {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">Modération des Témoignages</h1>
        <p className="text-slate-500 text-sm mt-0.5">Approuvez les avis clients pour les afficher sur la vitrine.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex text-salma-gold text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < t.note ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.source}</span>
              </div>
              <h3 className="font-bold text-salma-primary">{t.nom_auteur} <span className="text-slate-400 font-normal">({t.pays_auteur})</span></h3>
              <p className="text-sm text-salma-text-muted italic mt-2">"{t.citation_fr}"</p>
            </div>

            <div className="flex flex-wrap md:flex-col items-end justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-50 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Approuvé</span>
                <button 
                  onClick={() => handleToggleStatus(t.id, 'est_approuve', t.est_approuve)}
                  className={`w-10 h-5 rounded-full transition-all relative ${t.est_approuve ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${t.est_approuve ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Visible Site</span>
                <button 
                  onClick={() => handleToggleStatus(t.id, 'est_affiche_sur_site', t.est_affiche_sur_site)}
                  className={`w-10 h-5 rounded-full transition-all relative ${t.est_affiche_sur_site ? 'bg-salma-primary' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${t.est_affiche_sur_site ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
              <button onClick={() => handleDelete(t.id)} className="text-[10px] font-bold text-red-400 hover:text-red-600 uppercase mt-2">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}