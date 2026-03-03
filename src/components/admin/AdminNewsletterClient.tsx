"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { newsletterDictionary } from "@/dictionaries/data";
import type { NewsletterSubscriber, Announcement } from "@/types/api/newsletter.types";
import SalmaButton from "../ui/SalmaButton";

interface Props {
  initialSubscribers: NewsletterSubscriber[];
  initialAnnouncements: Announcement[];
}

export default function AdminNewsletterClient({ initialSubscribers, initialAnnouncements }: Props) {
  const { dictionary } = useLanguage();
  const t = dictionary.admin.newsletter;
  const common = dictionary.admin.common;

  const [activeTab, setActiveTab] = useState<"subscribers" | "announcements">("subscribers");
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [announcements] = useState(initialAnnouncements);

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm(t.confirmDeleteSub)) return;
    try {
      await newsletterDictionary.admin.deleteSubscriber(id);
      setSubscribers(subscribers.filter(s => s.id !== id));
    } catch {
      alert(common.error);
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">{t.title}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{t.subtitle}</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          <button 
            onClick={() => setActiveTab("subscribers")}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "subscribers" 
                ? "bg-salma-primary text-white shadow-md" 
                : "text-slate-400 hover:text-salma-primary"
            }`}
          >
            {t.tabs.subscribers.replace("{count}", subscribers.length.toString())}
          </button>
          <button 
            onClick={() => setActiveTab("announcements")}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "announcements" 
                ? "bg-salma-primary text-white shadow-md" 
                : "text-slate-400 hover:text-salma-primary"
            }`}
          >
            {t.tabs.announcements.replace("{count}", announcements.length.toString())}
          </button>
        </div>
      </div>

      {activeTab === "subscribers" ? (
        /* TABLEAU DES ABONNÉS */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">{t.table.thSubscriber}</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">{t.table.thDestination}</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">{t.table.thSource}</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-right">{common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{s.email}</p>
                    <p className="text-[10px] text-slate-400">{s.nom_complet || common.anonymous}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 uppercase">
                      {s.destination_souhaitee || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[9px] font-bold text-slate-500 uppercase">
                      {s.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteSubscriber(s.id)} 
                      className="text-red-400 hover:text-red-600 text-xs font-bold"
                    >
                      {common.delete}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* LISTE DES ANNONCES */
        <div className="grid grid-cols-1 gap-4">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    a.statut === 'ENVOYE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {a.statut === 'ENVOYE' ? t.announcements.statusSent : t.announcements.statusDraft}
                  </span>
                  <h3 className="font-bold text-salma-primary">{a.titre_fr}</h3>
                </div>
                <p className="text-xs text-salma-text-muted line-clamp-1">{a.contenu_fr}</p>
              </div>
              <SalmaButton variant="outline" size="sm">
                {t.announcements.btnDetails}
              </SalmaButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}