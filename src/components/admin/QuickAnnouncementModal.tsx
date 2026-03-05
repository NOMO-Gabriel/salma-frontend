"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { ScholarshipAdmin } from "@/types";
import SalmaButton from "../ui/SalmaButton";
import { newsletterDictionary } from "@/dictionaries/data";

export default function QuickAnnouncementModal({ bourse, onClose }: { bourse: ScholarshipAdmin, onClose: () => void }) {
  const { dictionary, locale } = useLanguage();
  
  // HOOKS AU SOMMET (Obligatoire)
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    titre_fr: `Nouvelle opportunité : ${bourse.titre_fr}`,
    titre_en: `New Opportunity: ${bourse.titre_en}`,
    contenu_fr: `Nous sommes ravis de vous annoncer une nouvelle bourse pour la destination ${bourse.pays_destination}. \n\nConsultez les détails sur notre site !`,
    contenu_en: `We are pleased to announce a new scholarship for ${bourse.pays_destination}. \n\nCheck the details on our website!`,
  });

  const t = dictionary.admin.announcementModal;

  if (!t) return null;

  const handleSend = async () => {
    setLoading(true);
    try {
      const annonce = await newsletterDictionary.admin.createAnnouncement({
        ...form,
        bourses_ids: [bourse.id],
        statut: "BROUILLON"
      });
      
      await newsletterDictionary.admin.sendAnnouncement(annonce.id);
      
      alert(locale === 'fr' ? "Alerte diffusée avec succès !" : "Alert broadcasted successfully!");
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erreur lors de la diffusion";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-salma-primary/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-xl shadow-2xl border border-salma-border overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-2xl font-serif font-bold text-salma-primary">{t.title}</h2>
          <p className="text-sm text-slate-500">{t.subtitle}</p>
        </div>
        
        <div className="p-8 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-salma-gold">{t.labelSubject} (FR)</label>
            <input value={form.titre_fr} onChange={e => setForm({...form, titre_fr: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-salma-gold" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-salma-gold">{t.labelContent} (FR)</label>
            <textarea value={form.contenu_fr} onChange={e => setForm({...form, contenu_fr: e.target.value})} rows={4} className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-salma-gold" />
          </div>
        </div>

        <div className="p-8 bg-slate-50 flex justify-end gap-4">
          <button onClick={onClose} className="text-xs font-bold uppercase text-slate-400">Annuler</button>
          <SalmaButton onClick={handleSend} isLoading={loading} variant="gold">
            {t.btnSend}
          </SalmaButton>
        </div>
      </div>
    </div>
  );
}