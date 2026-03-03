"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { chatbotRepository } from "@/repositories/chatbot.repository";
import type { FaqEntry } from "@/types/api/chatbot.types";

interface Props {
  initialFaqs: FaqEntry[];
}

export default function AdminChatbotClient({ initialFaqs }: Props) {
  const { dictionary } = useLanguage();
  const t = dictionary.admin.chatbot;
  const [faqs, setFaqs] = useState<FaqEntry[]>(initialFaqs);

  const handleToggleStatus = async (id: string, currentVal: boolean) => {
    try {
      await chatbotRepository.adminUpdateFaq(id, { est_actif: !currentVal });
      setFaqs(faqs.map(f => f.id === id ? { ...f, est_actif: !currentVal } : f));
    } catch {
      alert(t.errorUpdate);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await chatbotRepository.adminDeleteFaq(id);
      setFaqs(faqs.filter(f => f.id !== id));
    } catch {
      alert(t.errorDelete);
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">{t.title}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{t.subtitle}</p>
        </div>
        <button className="px-6 py-2.5 bg-salma-primary text-white rounded-xl text-xs font-bold hover:bg-salma-primary-light transition-all shadow-md">
          {t.newQuestion}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq) => (
          <div key={faq.id} className={`bg-white p-6 rounded-2xl border transition-all ${faq.est_actif ? 'border-slate-100 shadow-sm' : 'border-slate-100 opacity-60 grayscale'}`}>
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-salma-bg border border-salma-border rounded text-[9px] font-black uppercase text-salma-gold tracking-widest">
                    {faq.categorie || t.categoryDefault}
                  </span>
                  {!faq.est_actif && <span className="text-[9px] font-bold text-red-500 uppercase">{t.statusDisabled}</span>}
                </div>
                <h3 className="font-bold text-salma-primary text-lg mb-2">Q: {faq.question_fr}</h3>
                <p className="text-sm text-salma-text-muted leading-relaxed bg-salma-bg/50 p-4 rounded-xl border border-salma-border/50">
                  <span className="font-bold text-salma-primary/40 mr-2">R:</span>
                  {faq.reponse_fr}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleToggleStatus(faq.id, faq.est_actif)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${faq.est_actif ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}
                >
                  {faq.est_actif ? t.btnDeactivate : t.btnActivate}
                </button>
                <button 
                  onClick={() => handleDelete(faq.id)}
                  className="px-4 py-2 bg-red-50 text-red-500 border border-red-100 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                >
                  {t.btnDelete}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}