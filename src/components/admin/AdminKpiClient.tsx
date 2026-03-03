"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { KpiRealtime, ConversionRate, BourseKpi } from "@/types/api/kpi.types";

interface Props {
  realtime: KpiRealtime;
  conversion: ConversionRate;
}

export default function AdminKpiClient({ realtime, conversion }: Props) {
  const { dictionary } = useLanguage();
  const t = dictionary.admin.kpi;

  return (
    <div className="space-y-8 max-w-[1200px]">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[#0F1F3D]">{t.title}</h1>
        <p className="text-slate-500 text-sm mt-0.5">{t.subtitle}</p>
      </div>

      {/* COMPTEURS TEMPS RÉEL - Utilisation des clés exactes du type KpiRealtime */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label={t.cards.visitors} 
          value={realtime.visiteurs_aujourd_hui} 
          color="blue" 
        />
        <StatCard 
          label={t.cards.pageViews} 
          value={realtime.vues_bourses_aujourd_hui} 
          color="navy" 
        />
        <StatCard 
          label={t.cards.contacts} 
          value={realtime.contacts_aujourd_hui} 
          color="emerald" 
        />
        <StatCard 
          label={t.cards.conversion} 
          value={`${(conversion.global * 100).toFixed(1)}%`} 
          color="gold" 
        />
      </div>

      {/* PERFORMANCE PAR BOURSE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <h2 className="font-bold text-salma-primary">{t.table.title}</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">{t.table.thScholarship}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-center">{t.table.thViews}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-center">{t.table.thConversions}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400 text-right">{t.table.thEfficiency}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {conversion.par_bourse.map((b: BourseKpi) => {
              // Calcul du taux d'efficacité par bourse
              const rate = b.nb_vues > 0 ? ((b.nb_contacts / b.nb_vues) * 100).toFixed(1) : "0";
              return (
                <tr key={b.bourse_id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{b.titre}</td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600">{b.nb_vues}</td>
                  <td className="px-6 py-4 text-sm text-center text-slate-600">{b.nb_contacts}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      {rate}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Typage strict de la prop color pour éviter les erreurs d'indexation
function StatCard({ label, value, color }: { 
  label: string, 
  value: string | number, 
  color: "blue" | "navy" | "emerald" | "gold" 
}) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    navy: "text-[#1B365D] bg-slate-100",
    emerald: "text-emerald-600 bg-emerald-50",
    gold: "text-[#C9A84C] bg-amber-50"
  };
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{label}</p>
      <p className={`text-3xl font-serif font-bold ${colors[color].split(' ')[0]}`}>{value}</p>
      <div className={`h-1 w-8 rounded-full mt-4 ${colors[color].split(' ')[1]}`} />
    </div>
  );
}