"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { scholarshipDictionary } from "@/dictionaries/data";
import { 
  SCHOLARSHIP_VISIBILITY_FIELDS, 
  type UpdateScholarshipPayload, 
  type FieldVisibilityMap, 
  type CreateScholarshipPayload 
} from "@/types";
import SalmaButton from "../ui/SalmaButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  scholarshipId?: string | null;
}

type TabType = "info" | "visibility" | "options";

export default function AddScholarshipModal({ isOpen, onClose, onSave, scholarshipId }: Props) {
  const { dictionary } = useLanguage();
  const t = dictionary.admin.scholarships.modal;
  const common = dictionary.admin.common;

  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState<UpdateScholarshipPayload>({
    titre_fr: "", titre_en: "", organisme_fr: "", organisme_en: "",
    description_fr: "", description_en: "", pays_destination: "chine",
    niveau: "master", statut: "publie", type_couverture: "complete"
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
    setLoading(true);
    try {
      if (scholarshipId) {
        await scholarshipDictionary.admin.patch(scholarshipId, form);
        await scholarshipDictionary.admin.saveVisibility(scholarshipId, visibility);
      } else {
        await scholarshipDictionary.admin.create(form as CreateScholarshipPayload); 
      }
      onSave();
      onClose();
    } catch {
      alert(common.errorSave);
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
                <div className="grid grid-cols-2 gap-8">
                  {/* SECTION FRANÇAIS */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-salma-gold uppercase">{common.french}</h3>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-salma-text-muted uppercase">{t.fields.titleFr}</label>
                      <input 
                        value={form.titre_fr} 
                        onChange={e => setForm({...form, titre_fr: e.target.value})} 
                        placeholder={t.fields.titleFr} 
                        className="w-full p-4 rounded-xl border border-salma-border bg-salma-bg" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-salma-text-muted uppercase">{t.fields.descFr}</label>
                      <textarea 
                        value={form.description_fr} 
                        onChange={e => setForm({...form, description_fr: e.target.value})} 
                        placeholder={t.fields.descFr} 
                        rows={5} 
                        className="w-full p-4 rounded-xl border border-salma-border bg-salma-bg" 
                      />
                    </div>
                  </div>

                  {/* SECTION ANGLAIS */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-salma-gold uppercase">{common.english}</h3>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-salma-text-muted uppercase">{t.fields.titleEn}</label>
                      <input 
                        value={form.titre_en} 
                        onChange={e => setForm({...form, titre_en: e.target.value})} 
                        placeholder={t.fields.titleEn} 
                        className="w-full p-4 rounded-xl border border-salma-border bg-salma-bg" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-salma-text-muted uppercase">{t.fields.descEn}</label>
                      <textarea 
                        value={form.description_en} 
                        onChange={e => setForm({...form, description_en: e.target.value})} 
                        placeholder={t.fields.descEn} 
                        rows={5} 
                        className="w-full p-4 rounded-xl border border-salma-border bg-salma-bg" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "visibility" && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">
                    {t.visibilityNote}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {SCHOLARSHIP_VISIBILITY_FIELDS.map(field => (
                      <label key={field} className="flex items-center justify-between p-4 bg-salma-bg rounded-xl border border-salma-border cursor-pointer hover:border-salma-gold transition-colors">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-salma-primary">{field.replace(/_/g, ' ')}</span>
                          {(field === 'details_montant_fr' || field === 'details_montant_en') && (
                            <span className="text-[9px] text-red-500 font-medium">{t.visibilityWarning}</span>
                          )}
                        </div>
                        <input 
                          type="checkbox" 
                          checked={visibility[field] ?? true} 
                          onChange={e => setVisibility({...visibility, [field]: e.target.checked})}
                          className="w-5 h-5 accent-salma-gold"
                        />
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
                    <input 
                      type="checkbox" 
                      checked={form.est_mise_en_avant} 
                      onChange={e => setForm({...form, est_mise_en_avant: e.target.checked})}
                      className="w-6 h-6 accent-salma-gold"
                    />
                  </label>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-8 border-t border-salma-border flex justify-end gap-4 bg-salma-bg/30">
          <button onClick={onClose} className="px-8 py-3 text-salma-text-muted font-bold uppercase text-xs tracking-widest">
            {common.cancel}
          </button>
          <SalmaButton onClick={handleFinalSave} variant="primary" disabled={loading}>
            {loading ? t.saving : (scholarshipId ? t.btnUpdate : t.btnCreate)}
          </SalmaButton>
        </div>
      </div>
    </div>
  );
}