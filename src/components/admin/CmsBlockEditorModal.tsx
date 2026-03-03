"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { cmsAdminRepository } from "@/repositories/cms.repository";
import type { ContentBlock } from "@/types/api/cms.types";
import SalmaButton from "../ui/SalmaButton";

interface Props {
  pageId: string;
  block: ContentBlock;
  onClose: () => void;
  onSave: () => void;
}

export default function CmsBlockEditorModal({ pageId, block, onClose, onSave }: Props) {
  const { dictionary } = useLanguage();
  const t = dictionary.admin.cms.modal;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    contenu_fr: block.contenu_fr,
    contenu_en: block.contenu_en,
    est_visible: block.est_visible
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      await cmsAdminRepository.patchBlock(pageId, block.id, form);
      onSave();
      onClose();
    } catch {
      alert(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-salma-primary/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden border border-salma-border">
        <div className="p-8 border-b border-salma-border bg-salma-bg/50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-serif font-bold text-salma-primary">{t.title}</h2>
            <p className="text-xs text-salma-text-muted uppercase font-bold tracking-widest">{block.cle_bloc}</p>
          </div>
          <button onClick={onClose} className="text-2xl text-salma-text-muted hover:text-salma-primary">✕</button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-salma-gold">{t.labelFr}</label>
            <textarea 
              className="w-full p-4 rounded-xl border border-salma-border bg-salma-bg min-h-[120px]"
              value={form.contenu_fr}
              onChange={(e) => setForm({...form, contenu_fr: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-salma-gold">{t.labelEn}</label>
            <textarea 
              className="w-full p-4 rounded-xl border border-salma-border bg-salma-bg min-h-[120px]"
              value={form.contenu_en}
              onChange={(e) => setForm({...form, contenu_en: e.target.value})}
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={form.est_visible} 
              onChange={(e) => setForm({...form, est_visible: e.target.checked})}
              className="w-5 h-5 accent-salma-primary"
            />
            <span className="text-sm font-bold text-salma-primary">{t.labelVisible}</span>
          </label>
        </div>

        <div className="p-8 border-t border-salma-border bg-salma-bg/30 flex justify-end gap-4">
          <button onClick={onClose} className="text-xs font-bold uppercase text-salma-text-muted">{t.btnCancel}</button>
          <SalmaButton onClick={handleSave} disabled={loading}>
            {loading ? t.saving : t.btnSave}
          </SalmaButton>
        </div>
      </div>
    </div>
  );
}