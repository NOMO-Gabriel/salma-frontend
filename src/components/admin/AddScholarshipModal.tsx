"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { scholarshipDictionary } from "@/dictionaries/data";
import SalmaBadge from "../ui/SalmaBadge";
import SalmaButton from "../ui/SalmaButton";
import { 
  SCHOLARSHIP_VISIBILITY_FIELDS, 
  type UpdateScholarshipPayload, 
  type FieldVisibilityMap, 
  type CreateScholarshipPayload,
  type ScholarshipLevel,
  type ScholarshipCountry,
  type ScholarshipStatus,
  type ScholarshipCoverage
} from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  scholarshipId?: string | null;
}

type TabType = "info" | "visibility" | "options";

export default function AddScholarshipModal({ isOpen, onClose, onSave, scholarshipId }: Props) {
  const { dictionary, locale } = useLanguage();
  const t = dictionary.admin.scholarships.modal;
  const common = dictionary.admin.common;

  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState<UpdateScholarshipPayload & { image_id?: string }>({
    titre_fr: "", titre_en: "", organisme_fr: "", organisme_en: "",
    description_fr: "", description_en: "", pays_destination: "chine",
    niveau: "master", statut: "brouillon", type_couverture: "complete",
    image_id: ""
  });
  const [visibility, setVisibility] = useState<FieldVisibilityMap>({});

  useEffect(() => {
    if (scholarshipId && isOpen) {
      setLoading(true);
      scholarshipDictionary.admin.getById(scholarshipId).then(data => {
        setForm(data);
        const vMap = data.visibilites.reduce((acc, v) => {
          acc[v.nom_du_champ] = v.est_visible;
          return acc;
        }, {} as FieldVisibilityMap);
        setVisibility(vMap);
        setLoading(false);
      });
    }
  }, [scholarshipId, isOpen]);

  const handleFinalSave = async () => {
    if (!form.titre_fr || !form.description_fr) {
      alert(locale === 'fr' ? "Veuillez remplir les champs obligatoires (*)" : "Please fill required fields (*)");
      return;
    }

    setLoading(true);
    try {
      let currentId = scholarshipId;

      if (currentId) {
        await scholarshipDictionary.admin.patch(currentId, form);
        await scholarshipDictionary.admin.saveVisibility(currentId, visibility);
      } else {
        const newBourse = await scholarshipDictionary.admin.create(form as CreateScholarshipPayload);
        currentId = newBourse.id;
      }

      if (form.image_id && currentId) {
        const { scholarshipAdminRepository } = await import("@/repositories/scholarship.repository");
        await scholarshipAdminRepository.addImage(currentId, {
          media_id: form.image_id,
          est_principale: true
        });
      }

      onSave();
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(common.errorSave);
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-salma-primary/40 backdrop-blur-md p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-salma-border">
        <div className="p-8 border-b border-salma-border bg-salma-bg/50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-salma-primary">
              {scholarshipId ? t.editTitle : t.newTitle}
            </h2>
            <button onClick={onClose} className="text-salma-text-muted hover:text-salma-primary text-2xl">✕</button>
          </div>
          
          <div className="flex gap-8">
            {(["info", "visibility", "options"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${
                  activeTab === tab ? "border-salma-gold text-salma-primary" : "border-transparent text-salma-text-muted"
                }`}
              >
                {t.tabs[tab]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex justify-center py-20 italic">{common.loading}</div>
          ) : (
            <>
              {activeTab === "info" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Colonne Gauche (FR) */}
                    <div className="space-y-4">
                      <SalmaBadge variant="info" label={common.french} size="sm" />
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{t.fields.titleFr}</label>
                        <input value={form.titre_fr} onChange={e => setForm({...form, titre_fr: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-salma-gold outline-none text-sm" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{t.fields.descFr}</label>
                        <textarea value={form.description_fr} onChange={e => setForm({...form, description_fr: e.target.value})} rows={4} className="w-full p-3 rounded-xl border border-slate-200 focus:border-salma-gold outline-none text-sm" />
                      </div>
                    </div>

                    {/* Colonne Droite (EN) */}
                    <div className="space-y-4">
                      <SalmaBadge variant="neutral" label={common.english} size="sm" />
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{t.fields.titleEn}</label>
                        <input value={form.titre_en} onChange={e => setForm({...form, titre_en: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 focus:border-salma-gold outline-none text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{t.fields.descEn}</label>
                        <textarea value={form.description_en} onChange={e => setForm({...form, description_en: e.target.value})} rows={4} className="w-full p-3 rounded-xl border border-slate-200 focus:border-salma-gold outline-none text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-salma-gold uppercase tracking-widest">{t.fields.image}</label>
                      <div className="flex gap-2">
                        <input value={form.image_id} onChange={e => setForm({...form, image_id: e.target.value})} placeholder="ID du média..." className="flex-1 p-3 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50" />
                        <Link href="/admin/medias" target="_blank">
                          <SalmaButton variant="outline" size="sm">Médiathèque ↗</SalmaButton>
                        </Link>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{t.fields.destination}</label>
                        <select value={form.pays_destination} onChange={e => setForm({...form, pays_destination: e.target.value as ScholarshipCountry})} className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white">
                          <option value="chine">🇨🇳 Chine</option>
                          <option value="allemagne">🇩🇪 Allemagne</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{t.fields.level}</label>
                        <select value={form.niveau} onChange={e => setForm({...form, niveau: e.target.value as ScholarshipLevel})} className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white">
                          <option value="licence">Licence</option>
                          <option value="master">Master</option>
                          <option value="doctorat">Doctorat</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "visibility" && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">{t.visibilityNote}</div>
                  <div className="grid grid-cols-2 gap-4">
                    {SCHOLARSHIP_VISIBILITY_FIELDS.map(field => (
                      <label key={field} className="flex items-center justify-between p-4 bg-salma-bg rounded-xl border border-salma-border cursor-pointer hover:border-salma-gold transition-colors">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-salma-primary">{field.replace(/_/g, ' ')}</span>
                        </div>
                        <input type="checkbox" checked={visibility[field] ?? true} onChange={e => setVisibility({...visibility, [field]: e.target.checked})} className="w-5 h-5 accent-salma-gold" />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "options" && (
                <div className="space-y-6 max-w-md">
                   <label className="flex items-center justify-between p-6 bg-salma-bg rounded-2xl border border-salma-border cursor-pointer">
                    <div>
                      <p className="font-bold text-salma-primary">{t.fields.isFeatured}</p>
                      <p className="text-xs text-salma-text-muted">{t.fields.isFeaturedDesc}</p>
                    </div>
                    <input type="checkbox" checked={form.est_mise_en_avant} onChange={e => setForm({...form, est_mise_en_avant: e.target.checked})} className="w-6 h-6 accent-salma-gold" />
                  </label>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{t.fields.status}</label>
                    <select value={form.statut} onChange={e => setForm({...form, statut: e.target.value as ScholarshipStatus})} className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white">
                      <option value="publie">Publié</option>
                      <option value="brouillon">Brouillon</option>
                      <option value="archive">Archivé</option>
                    </select>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-8 border-t border-salma-border flex justify-end gap-4 bg-salma-bg/30">
          <button onClick={onClose} className="px-8 py-3 text-salma-text-muted font-bold uppercase text-xs tracking-widest">{common.cancel}</button>
          <SalmaButton onClick={handleFinalSave} variant="primary" disabled={loading}>
            {loading ? t.saving : (scholarshipId ? t.btnUpdate : t.btnCreate)}
          </SalmaButton>
        </div>
      </div>
    </div>
  );
}